import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SHIPPING_RATE, categoryLabel, findProduct, money, relatedTo } from "../catalog";
import { useCart } from "../cart";
import ProductCard from "../components/ProductCard";

export default function Product() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const colorQuery = params.get("color");
  const product = findProduct(id);
  const cart = useCart();
  const navigate = useNavigate();
  const [colorIndex, setColorIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!product) return;
    const match = product.colors.findIndex((color) => color.name === colorQuery);
    setColorIndex(match >= 0 ? match : 0);
    setImageIndex(0);
    setQty(1);
    setZoom(false);
    document.title = `${product.name} · Sterling Rose Millinery`;
  }, [id, colorQuery, product]);

  useEffect(() => {
    if (!zoom) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setZoom(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom]);

  if (!product) {
    return (
      <div className="wrap missing">
        <p className="eyebrow">Missing</p>
        <h1>We cannot find that hat.</h1>
        <Link className="btn" to="/shop">
          Browse the shop
        </Link>
      </div>
    );
  }

  const color = product.colors[colorIndex] || product.colors[0];
  const image = color.images[imageIndex] || color.images[0];
  const view = color.views?.[imageIndex];
  const alt = `${product.name} in ${color.name}${view ? `, ${view}` : ""}`;
  const related = relatedTo(product);

  function addCurrent(openDrawer) {
    cart.add(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        color: color.name,
        image: color.images[0],
        qty,
      },
      { openDrawer }
    );
  }

  return (
    <div className="wrap product-page">
      <p className="crumbs">
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to={`/shop?collection=${product.category}`}>{categoryLabel(product.category)}</Link>
        <span>/</span>
        {product.name}
      </p>
      <div className="pdp">
        <div className="gallery">
          <button type="button" className="gallery-main" onClick={() => setZoom(true)}>
            <img src={image} alt={alt} />
          </button>
          {color.images.length > 1 ? (
            <div className="thumbs">
              {color.images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  aria-label={color.views?.[index] || `Photo ${index + 1}`}
                  aria-current={index === imageIndex ? "true" : undefined}
                  onClick={() => setImageIndex(index)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="pdp-info">
          <p className="eyebrow">{categoryLabel(product.category)}</p>
          <h1>{product.name}</h1>
          <p className="price">{money(product.price)}</p>
          {product.inStock ? <p className="stock-flag">In stock</p> : <p className="stock-flag out">Out of stock</p>}
          <p className="fit">{product.fit}</p>
          <p className="lede">{product.description}</p>

          <div className="option">
            <p>
              Color <strong>{color.name}</strong>
            </p>
            <div className="studio-swatches" role="radiogroup" aria-label="Color">
              {product.colors.map((swatch, index) => (
                <button
                  key={swatch.name}
                  type="button"
                  role="radio"
                  aria-checked={index === colorIndex}
                  aria-label={swatch.name}
                  className={index === colorIndex ? "on" : ""}
                  style={{ background: swatch.swatch || swatch.hex }}
                  onClick={() => {
                    setColorIndex(index);
                    setImageIndex(0);
                  }}
                />
              ))}
            </div>
          </div>

          {product.inStock ? (
            <>
              <div className="buy-row">
                <div className="qty">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQty((n) => Math.max(1, n - 1))}>
                    −
                  </button>
                  <span>{qty}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQty((n) => Math.min(8, n + 1))}>
                    +
                  </button>
                </div>
                <button type="button" className="btn" onClick={() => addCurrent(true)}>
                  Add to bag
                </button>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-full"
                onClick={() => {
                  addCurrent(false);
                  navigate("/checkout");
                }}
              >
                Buy now
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-full" disabled>
              Out of stock
            </button>
          )}

          <details open>
            <summary>Details</summary>
            <ul>
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Care</summary>
            <p>{product.care}</p>
          </details>
          <details>
            <summary>Shipping</summary>
            <p>
              Hats leave in a sturdy box. Shipping inside the United States is {money(SHIPPING_RATE)}. The card is
              taken on Stripe at checkout.
            </p>
          </details>
        </div>
      </div>

      <section className="related">
        <header className="section-head">
          <div>
            <p className="eyebrow">Alongside</p>
            <h2>You might set these out too.</h2>
          </div>
        </header>
        <div className="product-grid">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {zoom ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt}>
          <button type="button" className="backdrop" aria-label="Close photo" onClick={() => setZoom(false)} />
          <img src={image} alt={alt} />
        </div>
      ) : null}
    </div>
  );
}
