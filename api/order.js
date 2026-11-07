import { loadPaidOrder, paymentError } from "../src/payments.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Use GET." });
    return;
  }
  try {
    const order = await loadPaidOrder(req.query?.session_id);
    res.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(error.status || error.statusCode || 500).json({ error: paymentError(error) });
  }
}
