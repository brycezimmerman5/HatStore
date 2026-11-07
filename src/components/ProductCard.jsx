import { Link } from "react-router-dom";
import { categoryLabel, money } from "../catalog";
import { useCart } from "../cart";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const color = product.colors[0];
  const image = color.images[0];
  const hover = color.images[1] || product.colors[1]?.images[0];

  function quickAdd(event) {
    event.preventDefault();
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      color: color.name,
      image,
      qty: 1,
    });
  }

  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card-media">
        <img src={image} alt={`${product.name} in ${color.name}`} />
        {hover ? <img className="hover" src={hover} alt="" /> : null}
      </Link>
      <div className="card-body">
        <p className={product.inStock ? "stock-flag" : "stock-flag out"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </p>
        <p className="eyebrow">{categoryLabel(product.category)}</p>
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="card-row">
          <p className="price">{money(product.price)}</p>
          {product.colors.length > 1 ? (
            <span className="swatch-row" aria-hidden="true">
              {product.colors.slice(0, 6).map((swatch) => (
                <i key={swatch.name} style={{ background: swatch.swatch || swatch.hex }} />
              ))}
              {product.colors.length > 6 ? <em>+{product.colors.length - 6}</em> : null}
            </span>
          ) : product.inStock ? (
            <button type="button" className="text-btn" onClick={quickAdd}>
              Add
            </button>
          ) : null}
        </div>
        {product.colors.length > 1 ? (
          <Link className="text-btn" to={`/product/${product.id}`}>
            {product.colors.length} colors
          </Link>
        ) : null}
      </div>
    </article>
  );
}
