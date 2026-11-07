import Stripe from "stripe";
import { findProduct, shippingFor } from "./catalog.js";

export async function createCheckout({ items, customer, origin }) {
  const buyer = readCustomer(customer);
  const lines = priceLines(items);
  const stripe = getStripe();
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const shipping = shippingFor(subtotal);
  const site = String(origin || "").replace(/\/$/, "");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: buyer.email,
    success_url: `${site}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}/checkout`,
    metadata: buyer,
    payment_intent_data: {
      shipping: {
        name: buyer.name,
        phone: buyer.phone || undefined,
        address: {
          line1: buyer.address,
          city: buyer.city,
          state: buyer.region,
          postal_code: buyer.zip,
          country: "US",
        },
      },
      description: buyer.note || undefined,
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

  return session.url;
}

export async function loadPaidOrder(sessionId) {
  const id = String(sessionId || "");
  if (!/^cs_[a-zA-Z0-9_]+$/.test(id)) {
    const error = new Error("That payment session is not valid.");
    error.status = 400;
    throw error;
  }
  const session = await getStripe().checkout.sessions.retrieve(id, {
    expand: ["line_items.data.price.product"],
  });
  if (session.payment_status !== "paid" && session.status !== "complete") {
    const error = new Error("This payment is not complete.");
    error.status = 402;
    throw error;
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
  return {
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
  };
}

export function siteOrigin(req, fallbackPort = 5173) {
  const configured = process.env.PUBLIC_URL;
  if (configured) return configured.replace(/\/$/, "");
  if (req.headers?.origin) return String(req.headers.origin).replace(/\/$/, "");
  const host = req.headers?.["x-forwarded-host"] || req.headers?.host;
  if (host) {
    const proto = req.headers?.["x-forwarded-proto"] || "https";
    return `${proto}://${host}`.replace(/\/$/, "");
  }
  return `http://localhost:${fallbackPort}`;
}

export function paymentError(error) {
  if (error.status === 400) return error.message;
  if (error.type === "StripeAuthenticationError") return "Stripe refused that secret key.";
  if (!stripeSecret()) return "Add STRIPE_SECRET_KEY to the .env file, or to the Vercel project settings.";
  return error.status ? error.message : "Payment could not be started.";
}

function getStripe() {
  const key = stripeSecret();
  if (!key) {
    const error = new Error("Add STRIPE_SECRET_KEY to the .env file, or to the Vercel project settings.");
    error.status = 500;
    throw error;
  }
  return new Stripe(key);
}

function stripeSecret() {
  return process.env.STRIPE_SECRET_KEY || process.env.S_STRIPE_SECRET_KEY || "";
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
