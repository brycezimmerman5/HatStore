import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collectionById, productsIn } from "../catalog";
import ProductCard from "../components/ProductCard";

const chips = [
  { id: "stock", label: "In stock" },
  { id: "all", label: "All hats" },
  { id: "truckers", label: "Patch truckers" },
  { id: "straw", label: "Western straw" },
  { id: "raffia", label: "Crochet & raffia" },
  { id: "canvas", label: "Canvas" },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const collection = params.get("collection") || "all";
  const q = params.get("q") || "";
  const [sort, setSort] = useState("featured");
  const current = collectionById(collection);

  useEffect(() => {
    document.title = `${current?.name || "Shop"} · Sterling Rose Millinery`;
  }, [current]);

  function update(next) {
    const draft = new URLSearchParams(params);
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "all") draft.delete(key);
      else draft.set(key, value);
    });
    setParams(draft, { replace: true });
  }

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let next = productsIn(collection);
    if (needle) {
      next = next.filter((product) => {
        const haystack = [product.name, product.description, product.category, ...product.colors.map((c) => c.name)]
          .join(" ")
          .toLowerCase();
        return haystack.includes(needle);
      });
    }
    const ranked = [...next];
    ranked.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return 0;
    });
    return ranked;
  }, [collection, q, sort]);

  return (
    <div className="wrap shop">
      <header className="shop-head">
        <p className="eyebrow">{current ? current.eyebrow : "The shop"}</p>
        <h1>{current ? current.name : "All hats"}</h1>
        <p className="lede">
          {current
            ? current.line
            : "Patch truckers, western straw, crochet, raffia, and canvas. Every hat from the lookbook, in one place."}
        </p>
      </header>

      <div className="toolbar">
        <label className="search">
          <span className="visually-hidden">Search hats</span>
          <input
            value={q}
            placeholder="Search ocean, straw, pink…"
            onChange={(event) => update({ q: event.target.value })}
          />
        </label>
        <label className="sort">
          <span className="visually-hidden">Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <div className="chips" role="toolbar" aria-label="Collections">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            aria-pressed={collection === chip.id}
            onClick={() => update({ collection: chip.id })}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <p className="result-count">
        {list.length} {list.length === 1 ? "hat" : "hats"}
      </p>

      {list.length === 0 ? (
        <div className="empty-shop">
          <h2>No hats by that name.</h2>
          <p>Try ocean, floral, canvas, or pink.</p>
          <button type="button" className="btn" onClick={() => update({ q: "", collection: "all" })}>
            Clear the search
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
