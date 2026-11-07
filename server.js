import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import Stripe from "stripe";
import { findProduct, shippingFor } from "./src/catalog.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const production = process.argv.includes("--production");
const port = Number(process.env.PORT) || 5173;

loadEnv(path.join(root, ".env"));

const app = express();

app.post("/api/stripe-webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    res.status(501).json({ error: "STRIPE_WEBHOOK_SECRET is not set." });
    return;
  }
  const signature = req.headers["stripe-signature"];
  try {
    getStripe().webhooks.constructEvent(req.body, signature, secret);
  } catch (error) {
    res.status(400).json({ error: "Webhook signature did not match." });
    return;
  }
  res.json({ received: true });
});

app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  try {
    const customer = readCustomer(req.body?.customer);
    const lines = priceLines(req.body?.items);
    const stripe = getStripe();
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
    const shipping = shippingFor(subtotal);
    const origin = (process.env.PUBLIC_URL || req.headers.origin || `http://localhost:${port}`).replace(/\/$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customer.email,
      success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: customer,
      payment_intent_data: {
        shipping: {
          name: customer.name,
          phone: customer.phone || undefined,
          address: {
            line1: customer.address,
            city: customer.city,
            state: customer.region,
            postal_code: customer.zip,
            country: "US",
          },
        },
        description: customer.note || undefined,
      },
      line_items: [
        ...lines.map((line) => ({
          quantity: line.qty,
          price_data: {
            currency: "usd",
            unit_amount: line.price * 100,
            product_data: {
              name: line.name,
              description: line.color,
              metadata: {
                id: line.id,
                color: line.color,
                image: line.image,
              },
            },
          },
        })),
        ...(shipping > 0
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: shipping * 100,
                  product_data: { name: "Shipping" },
                },
              },
            ]
          : []),
      ],
    });

    res.json({ url: session.url });
  } catch (error) {
    const status = error.status || error.statusCode || 500;
    console.error(error.message);
    res.status(status).json({ error: publicError(error) });
  }
});

app.get("/api/order", async (req, res) => {
  try {
    const sessionId = String(req.query.session_id || "");
    if (!/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
      res.status(400).json({ error: "That payment session is not valid." });
      return;
    }
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });
    if (session.payment_status !== "paid" && session.status !== "complete") {
      res.status(402).json({ error: "This payment is not complete." });
      return;
    }
    const rows = session.line_items?.data || [];
    const items = rows
      .map((row) => {
        const product = row.price?.product;
        const meta = product && typeof product === "object" ? product.metadata : null;
        if (!meta?.id) return null;
        return {
          id: meta.id,
          name: product.name,
          color: meta.color || product.description || "",
          image: meta.image || "",
          qty: row.quantity,
          price: (row.price.unit_amount || 0) / 100,
        };
      })
      .filter(Boolean);
    const shippingRow = rows.find((row) => {
      const product = row.price?.product;
      return product && typeof product === "object" && product.name === "Shipping";
    });
    const subtotal = items.reduce((sum, line) => sum + line.price * line.qty, 0);
    const shipping = shippingRow ? (shippingRow.amount_total || 0) / 100 : 0;
    const meta = session.metadata || {};
    res.json({
      id: `SR-${session.id.slice(-6).toUpperCase()}`,
      customer: {
        name: meta.name || session.customer_details?.name || "",
        email: meta.email || session.customer_details?.email || "",
        address: meta.address || "",
        city: meta.city || "",
        region: meta.region || "",
        zip: meta.zip || "",
      },
      items,
      subtotal,
      shipping,
      total: (session.amount_total || 0) / 100,
    });
  } catch (error) {
    console.error(error.message);
    res.status(error.status || 500).json({ error: publicError(error) });
  }
});

if (production) {
  const dist = path.join(root, "dist");
  app.use(express.static(dist));
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) {
      next();
      return;
    }
    res.sendFile(path.join(dist, "index.html"));
  });
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`Sterling Rose is at http://localhost:${port}`);
});

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    const error = new Error("Add STRIPE_SECRET_KEY to the .env file in the project folder.");
    error.status = 500;
    throw error;
  }
  return new Stripe(key);
}

function readCustomer(input) {
  const customer = {
    name: clean(input?.name, 200),
    email: clean(input?.email, 200),
    phone: clean(input?.phone, 40),
    address: clean(input?.address, 200),
    city: clean(input?.city, 80),
    region: clean(input?.region, 40),
    zip: clean(input?.zip, 20),
    note: clean(input?.note, 400),
  };
  if (!customer.name || !customer.address || !customer.city || !customer.region || !customer.zip) {
    const error = new Error("Add your name and the full shipping address.");
    error.status = 400;
    throw error;
  }
  if (!/^\S+@\S+\.\S+$/.test(customer.email)) {
    const error = new Error("Add a real email.");
    error.status = 400;
    throw error;
  }
  return customer;
}

function priceLines(input) {
  if (!Array.isArray(input) || input.length === 0) {
    const error = new Error("Your bag is empty.");
    error.status = 400;
    throw error;
  }
  const merged = new Map();
  for (const raw of input) {
    const id = clean(raw?.id, 80);
    const colorName = clean(raw?.color, 80);
    const qty = Number(raw?.qty);
    const product = findProduct(id);
    const color = product?.colors.find((item) => item.name === colorName);
    if (!product || !color || !Number.isInteger(qty) || qty < 1 || qty > 8) {
      const error = new Error("A hat in the bag could not be priced.");
      error.status = 400;
      throw error;
    }
    if (!product.inStock) {
      const error = new Error(`${product.name} is out of stock.`);
      error.status = 400;
      throw error;
    }
    const key = `${id}::${colorName}`;
    const previous = merged.get(key);
    const nextQty = Math.min(8, (previous?.qty || 0) + qty);
    merged.set(key, {
      id,
      name: product.name,
      color: color.name,
      image: color.images[0],
      price: product.price,
      qty: nextQty,
    });
  }
  return [...merged.values()];
}

function clean(value, max) {
  return String(value || "").trim().slice(0, max);
}

function publicError(error) {
  if (error.status === 400) return error.message;
  if (error.type === "StripeAuthenticationError") return "Stripe refused that secret key.";
  if (!process.env.STRIPE_SECRET_KEY) return "Add STRIPE_SECRET_KEY to the .env file in the project folder.";
  return error.status ? error.message : "Payment could not be started.";
}

function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const split = trimmed.indexOf("=");
    if (split === -1) continue;
    const key = trimmed.slice(0, split).trim();
    let value = trimmed.slice(split + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}
