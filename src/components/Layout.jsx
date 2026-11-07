import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SHIPPING_RATE, money, shippingFor } from "../catalog";
import { useCart } from "../cart";

const links = [
  { to: "/shop?collection=stock", label: "In stock", collection: "stock" },
  { to: "/shop", label: "Shop", collection: null },
  { to: "/shop?collection=truckers", label: "Truckers", collection: "truckers" },
  { to: "/shop?collection=straw", label: "Straw", collection: "straw" },
  { to: "/shop?collection=raffia", label: "Raffia", collection: "raffia" },
  { to: "/shop?collection=canvas", label: "Canvas", collection: "canvas" },
  { to: "/about", label: "Story", collection: undefined },
];

function Mark() {
  return <img className="brand-mark" src="/logo.png" alt="" />;
}

export default function Layout() {
  const cart = useCart();
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const params = new URLSearchParams(location.search);
  const currentCollection = params.get("collection");

  useEffect(() => {
    setMenu(false);
    cart.setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!cart.open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") cart.setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [cart.open]);

  const ship = shippingFor(cart.subtotal);

  return (
    <>
      <a className="skip" href="#main">
        Skip to the hats
      </a>
      <div className="announce">Small batches · Coastal truckers, western straw, and sun hats</div>
      <header className="topbar">
        <div className="wrap header">
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menu}
            aria-controls="mobile-nav"
            onClick={() => setMenu((value) => !value)}
          >
            {menu ? "Close" : "Menu"}
          </button>
          <Link to="/" className="brand" aria-label="Sterling Rose Millinery, home">
            <Mark />
            <span>
              <strong>Sterling Rose</strong>
              <small>Millinery</small>
            </span>
          </Link>
          <nav className="nav" aria-label="Primary">
            {links.map((link) => {
              const active =
                link.collection === undefined
                  ? location.pathname === link.to
                  : location.pathname === "/shop" && (currentCollection || null) === link.collection;
              return (
                <Link key={link.label} to={link.to} aria-current={active ? "page" : undefined}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button type="button" className="bag" onClick={() => cart.setOpen(true)}>
            Bag
            <span>{cart.count}</span>
          </button>
        </div>
        {menu ? (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
            {links.map((link) => (
              <Link key={link.label} to={link.to} onClick={() => setMenu(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <p className="brand footer-brand">
              <Mark />
              <span>
                <strong>Sterling Rose</strong>
                <small>Millinery</small>
              </span>
            </p>
            <p className="footer-note">
              A family hat shop. Patch truckers, western straws, and sun hats in crochet, raffia, and canvas.
            </p>
          </div>
          <div>
            <p className="eyebrow">Visit</p>
            <Link to="/shop?collection=stock">In stock</Link>
            <Link to="/shop">All hats</Link>
            <Link to="/shop?collection=truckers">Patch truckers</Link>
            <Link to="/shop?collection=straw">Western straw</Link>
            <Link to="/about">The story</Link>
          </div>
          <div>
            <p className="eyebrow">From the bench</p>
            <Link to="/shop?collection=raffia">Crochet & raffia</Link>
            <Link to="/shop?collection=canvas">Canvas sun hats</Link>
            <Link to="/checkout">Your bag</Link>
          </div>
          <div>
            <p className="eyebrow">Shipping</p>
            <p className="footer-note">
              {money(SHIPPING_RATE)} inside the United States. The card is taken on Stripe.
            </p>
          </div>
        </div>
        <div className="wrap footer-base">
          <span>© {new Date().getFullYear()} Sterling Rose Millinery</span>
          <span>Hats for sun, salt, and Saturday</span>
        </div>
      </footer>

      {cart.open ? (
        <div className="drawer-root">
          <button type="button" className="backdrop" aria-label="Close bag" onClick={() => cart.setOpen(false)} />
          <aside className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="bag-title">
            <header className="cart-head">
              <h2 id="bag-title">Your bag</h2>
              <button type="button" className="text-btn" onClick={() => cart.setOpen(false)}>
                Close
              </button>
            </header>
            {cart.items.length === 0 ? (
              <div className="cart-empty">
                <p>Nothing here yet. The shelf is the interesting part.</p>
                <Link className="btn" to="/shop" onClick={() => cart.setOpen(false)}>
                  Shop the hats
                </Link>
              </div>
            ) : (
              <>
                <div className="ship-note">
                  <p>Shipping inside the United States is {money(SHIPPING_RATE)}.</p>
                </div>
                <ul className="cart-lines">
                  {cart.items.map((line) => (
                    <li key={`${line.id}-${line.color}`}>
                      <img src={line.image} alt="" />
                      <div>
                        <Link to={`/product/${line.id}`} onClick={() => cart.setOpen(false)}>
                          {line.name}
                        </Link>
                        <p>{line.color}</p>
                        <div className="qty">
                          <button
                            type="button"
                            aria-label={`Decrease ${line.name}`}
                            onClick={() => cart.setQty(line.id, line.color, line.qty - 1)}
                          >
                            −
                          </button>
                          <span>{line.qty}</span>
                          <button
                            type="button"
                            aria-label={`Increase ${line.name}`}
                            onClick={() => cart.setQty(line.id, line.color, line.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button type="button" className="text-btn" onClick={() => cart.remove(line.id, line.color)}>
                          Remove
                        </button>
                      </div>
                      <strong>{money(line.price * line.qty)}</strong>
                    </li>
                  ))}
                </ul>
                <footer className="cart-foot">
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
                    <span>{money(cart.subtotal + ship)}</span>
                  </div>
                  <Link className="btn btn-full" to="/checkout" onClick={() => cart.setOpen(false)}>
                    Checkout
                  </Link>
                </footer>
              </>
            )}
          </aside>
        </div>
      ) : null}

      {cart.toast ? (
        <p className="toast" role="status">
          {cart.toast}
        </p>
      ) : null}
    </>
  );
}
