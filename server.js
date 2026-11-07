import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createCheckout, loadPaidOrder, paymentError, siteOrigin } from "./src/payments.js";

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
    const { default: Stripe } = await import("stripe");
    const key = process.env.STRIPE_SECRET_KEY || process.env.S_STRIPE_SECRET_KEY;
    new Stripe(key).webhooks.constructEvent(req.body, signature, secret);
  } catch (error) {
    res.status(400).json({ error: "Webhook signature did not match." });
    return;
  }
  res.json({ received: true });
});

app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  try {
    const url = await createCheckout({
      items: req.body?.items,
      customer: req.body?.customer,
      origin: siteOrigin(req, port),
    });
    res.json({ url });
  } catch (error) {
    console.error(error.message);
    res.status(error.status || error.statusCode || 500).json({ error: paymentError(error) });
  }
});

app.get("/api/order", async (req, res) => {
  try {
    res.json(await loadPaidOrder(req.query.session_id));
  } catch (error) {
    console.error(error.message);
    res.status(error.status || error.statusCode || 500).json({ error: paymentError(error) });
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
