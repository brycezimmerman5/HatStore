import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { money, shippingFor } from "../catalog";
import { useCart } from "../cart";

export default function Checkout() {
  const cart = useCart();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const ship = shippingFor(cart.subtotal);
  const total = cart.subtotal + ship;

  useEffect(() => {
    document.title = "Checkout · Sterling Rose Millinery";
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const email = String(data.email || "").trim();
    const required = ["name", "address", "city", "region", "zip"];
    const missing = required.some((key) => !String(data[key] || "").trim());
    if (missing || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Add your name, a real email, and the full shipping address.");
      return;
    }
    if (cart.items.length === 0) {
      setError("Your bag is empty.");
      return;
    }
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.items.map((line) => ({ id: line.id, color: line.color, qty: line.qty })),
          customer: {
            name: String(data.name).trim(),
            email,
            phone: String(data.phone || "").trim(),
            address: String(data.address).trim(),
            city: String(data.city).trim(),
            region: String(data.region).trim(),
            zip: String(data.zip).trim(),
            note: String(data.note || "").trim(),
          },
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || !body.url) {
        throw new Error(body.error || "Payment could not be started.");
      }
      window.location.assign(body.url);
    } catch (err) {
      setError(err.message);
      setPending(false);
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="wrap missing">
        <p className="eyebrow">Checkout</p>
        <h1>Your bag is empty.</h1>
        <Link className="btn" to="/shop">
          Find a hat
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap checkout">
      <header className="shop-head">
        <p className="eyebrow">Checkout</p>
        <h1>Where should they go?</h1>
        <p className="lede">
          The card is taken on Stripe after this. Sterling Rose never sees the card number.
        </p>
      </header>
      <div className="check-grid">
        <form onSubmit={onSubmit} noValidate>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" autoComplete="name" required />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone, if you like</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="address">Street address</label>
            <input id="address" name="address" autoComplete="street-address" required />
          </div>
          <div className="field-row three">
            <div className="field">
              <label htmlFor="city">City</label>
              <input id="city" name="city" autoComplete="address-level2" required />
            </div>
            <div className="field">
              <label htmlFor="region">State</label>
              <input id="region" name="region" autoComplete="address-level1" required />
            </div>
            <div className="field">
              <label htmlFor="zip">ZIP</label>
              <input id="zip" name="zip" autoComplete="postal-code" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="note">Note for the box</label>
            <textarea id="note" name="note" rows="3" placeholder="A gift note, or a porch to leave it on." />
          </div>
          <button className="btn btn-full" type="submit" disabled={pending}>
            {pending ? "Opening Stripe…" : `Pay ${money(total)}`}
          </button>
          <p className="fine">You will finish the card on Stripe. The bag stays here if you come back without paying.</p>
        </form>
        <aside className="summary">
          <h2>In this order</h2>
          <ul>
            {cart.items.map((line) => (
              <li key={`${line.id}-${line.color}`}>
                <img src={line.image} alt="" />
                <div>
                  <strong>{line.name}</strong>
                  <p>
                    {line.color} · {line.qty}
                  </p>
                </div>
                <span>{money(line.price * line.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="sum-row">
            <span>Subtotal</span>
            <span>{money(cart.subtotal)}</span>
          </div>
          <div className="sum-row">
            <span>Shipping</span>
            <span>{ship === 0 ? "Free" : money(ship)}</span>
          </div>
          <div className="sum-row total">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function Confirmation() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const cart = useCart();
  const clearBag = useRef(cart.clear);
  clearBag.current = cart.clear;
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Order placed · Sterling Rose Millinery";
  }, []);

  useEffect(() => {
    if (!sessionId) {
      setError("This payment did not come back from Stripe.");
      return undefined;
    }
    let cancel = false;
    fetch(`/api/order?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (response) => {
        const body = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(body.error || "Could not load the payment.");
        return body;
      })
      .then((order) => {
        if (cancel) return;
        setSaved(order);
        clearBag.current();
      })
      .catch((err) => {
        if (!cancel) setError(err.message);
      });
    return () => {
      cancel = true;
    };
  }, [sessionId]);

  if (!saved) {
    return (
      <div className="wrap missing">
        <h1>{error || "Checking the payment…"}</h1>
        <Link className="btn" to="/shop">
          Visit the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap confirm">
      <p className="eyebrow">Order {saved.id}</p>
      <h1>It is paid.</h1>
      <p className="lede">
        {saved.customer.name}, the card went through.{" "}
        {saved.items.length === 1 ? "This hat is" : "These hats are"} headed for {saved.customer.address},{" "}
        {saved.customer.city}. Stripe sends the receipt to {saved.customer.email}.
      </p>
      <ul className="confirm-list">
        {saved.items.map((line) => (
          <li key={`${line.id}-${line.color}`}>
            <img src={line.image} alt="" />
            <div>
              <strong>{line.name}</strong>
              <p>
                {line.color} · Qty {line.qty}
              </p>
            </div>
            <span>{money(line.price * line.qty)}</span>
          </li>
        ))}
      </ul>
      <p className="confirm-total">Total {money(saved.total)}</p>
      <Link className="btn" to="/shop">
        Keep looking
      </Link>
    </div>
  );
}
