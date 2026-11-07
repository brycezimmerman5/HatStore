import { createCheckout, paymentError, siteOrigin } from "../src/payments.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST." });
    return;
  }
  try {
    const url = await createCheckout({
      items: req.body?.items,
      customer: req.body?.customer,
      origin: siteOrigin(req),
    });
    res.status(200).json({ url });
  } catch (error) {
    console.error(error.message);
    res.status(error.status || error.statusCode || 500).json({ error: paymentError(error) });
  }
}
