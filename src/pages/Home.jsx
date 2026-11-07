import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collections, findProduct, products, productsIn } from "../catalog";
import ProductCard from "../components/ProductCard";

const phrases = [
  "All Is Well",
  "Cool Your Jets",
  "Stay Wild",
  "Surf California",
  "Third Eye",
  "Sunshine and Sunsets",
  "Original Cotton",
  "Scalloped Cotton",
  "Fine Crochet Bucket",
  "Fine Crochet Sun Hat",
  "Shell Trim Raffia",
  "Encinitas Surf",
  "California Poppy",
  "Cardiff by the Sea",
  "Out of Office",
  "Born to Beach",
  "Salty Moms Club",
  "Local Legend",
  "Y'all",
  "Fiesta Floral",
  "Mother",
  "The Ocean Is Calling",
];

const featured = [
  "out-of-office",
  "scallop-crochet",
  "fiesta-floral",
  "canvas-sun",
  "local-legend",
  "raffia-boater",
  "mother",
  "turquoise-chip",
]
  .map((id) => findProduct(id))
  .filter(Boolean);

const inStock = productsIn("stock");
const pocketHats = inStock.filter((product) => product.pocket);
const shelfHats = inStock.filter((product) => !product.pocket);

export default function Home() {
  const canvas = findProduct("canvas-sun");
  const [colorName, setColorName] = useState(canvas.colors[0].name);
  const color = canvas.colors.find((item) => item.name === colorName) || canvas.colors[0];

  useEffect(() => {
    document.title = "Sterling Rose Millinery";
  }, []);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">A family millinery</p>
          <h1>
            Hats, cut for <em>real weather.</em>
          </h1>
          <p className="lede">
            Patch truckers with a point of view, western straws for the long weekend, and sun hats in crochet,
            raffia, and canvas. Gathered in one shop, priced to leave the house.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/shop">
              Shop the hats
            </Link>
            <Link className="btn btn-ghost" to="/shop?collection=straw">
              Western straw
            </Link>
          </div>
          <p className="hero-meta">
            {products.length} hats <span /> Four families <span /> Ships in a box
          </p>
        </div>
        <div className="hero-stage">
          <img
            className="hero-main"
            src="/hats/scallop-ivory.webp"
            alt="Ivory scalloped crochet sun hat"
            width="1400"
            height="1400"
          />
          <Link to="/product/fiesta-floral" className="hero-float">
            <img src="/hats/cowboy-floral.webp" alt="" />
            <span>Fiesta Floral</span>
          </Link>
          <p className="hero-caption">Scalloped Crochet · Ivory</p>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...phrases, ...phrases].map((phrase, index) => (
            <span key={`${phrase}-${index}`}>
              {phrase}
              <i />
            </span>
          ))}
        </div>
      </div>

      <section className="section wrap" id="in-stock">
        <header className="section-head">
          <div>
            <p className="eyebrow">Ready to ship</p>
            <h2>In stock.</h2>
          </div>
          <Link className="quiet-link" to="/shop?collection=stock">
            Shop in stock
          </Link>
        </header>
        <p className="lede stock-lede">
          These hats are on the shelf now. The rest of the shop is the lookbook.
        </p>
        <div className="product-grid">
          {shelfHats.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section wrap" id="pocket-hats">
        <header className="section-head">
          <div>
            <p className="eyebrow">Pocket hats</p>
            <h2>A place for the small things.</h2>
          </div>
        </header>
        <p className="lede stock-lede">
          These six are hand-sewn in the San Francisco Bay Area. The patch names a place. The pocket in front
          holds cash, an ID, cards, a license, or a room key, so your hands stay free.
        </p>
        <div className="product-grid">
          {pocketHats.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section wrap">
        <header className="section-head">
          <div>
            <p className="eyebrow">The shelf</p>
            <h2>Four families of hats.</h2>
          </div>
          <Link className="quiet-link" to="/shop">
            Shop all
          </Link>
        </header>
        <div className="collection-grid">
          {collections.map((collection) => (
            <Link key={collection.id} to={`/shop?collection=${collection.id}`} className="collection-card">
              <div className="shot">
                <img src={collection.image} alt="" />
              </div>
              <p className="eyebrow">{collection.eyebrow}</p>
              <h3>{collection.name}</h3>
              <p>{collection.line}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <header className="section-head">
          <div>
            <p className="eyebrow">The edit</p>
            <h2>Pulled to the front of the case.</h2>
          </div>
          <Link className="quiet-link" to="/shop">
            View the shop
          </Link>
        </header>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="studio">
        <div className="wrap studio-grid">
          <div className="studio-copy">
            <p className="eyebrow">Canvas</p>
            <h2>Ten colors. One good brim.</h2>
            <p>
              A deep crown, a self band, and a brim rolled under so the edge stays soft. Same hat from coral to
              cloud — pick the color the rest of the day has to live with.
            </p>
            <div className="studio-swatches" role="radiogroup" aria-label="Canvas colors">
              {canvas.colors.map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  role="radio"
                  aria-checked={swatch.name === color.name}
                  aria-label={swatch.name}
                  className={swatch.name === color.name ? "on" : ""}
                  style={{ background: swatch.swatch || swatch.hex }}
                  onClick={() => setColorName(swatch.name)}
                />
              ))}
            </div>
            <p className="studio-name">{color.name}</p>
            <Link className="btn" to={`/product/canvas-sun?color=${encodeURIComponent(color.name)}`}>
              Shop {color.name.toLowerCase()}
            </Link>
          </div>
          <div className="studio-photo">
            <img key={color.name} src={color.images[0]} alt={`Rolled brim canvas sun hat in ${color.name}`} />
          </div>
        </div>
      </section>

      <section className="section wrap story-split">
        <div className="shot story-photo">
          <img src="/hats/cowboy-concho.webp" alt="Natural straw cowboy hat with a sun concho" />
        </div>
        <div>
          <p className="eyebrow">The house</p>
          <h2>Brought home, then put on.</h2>
          <p className="lede">
            Sterling Rose is a family hat counter. The truckers are patched to be read. The straws are for dust,
            festival grass, and a long porch. The sun hats are the ones you forget you are wearing, which is the
            point.
          </p>
          <Link className="quiet-link" to="/about">
            Read the story
          </Link>
        </div>
      </section>

      <section className="quote-band">
        <div className="wrap">
          <p>Wear the one you will actually reach for.</p>
          <span>Sterling Rose</span>
        </div>
      </section>
    </>
  );
}
