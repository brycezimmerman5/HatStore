import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SHIPPING_RATE, collections, money } from "../catalog";

export default function About() {
  useEffect(() => {
    document.title = "The story · Sterling Rose Millinery";
  }, []);

  return (
    <article className="about">
      <header className="wrap about-hero">
        <p className="eyebrow">The story</p>
        <h1>A family counter of hats worth keeping.</h1>
        <p className="lede">
          Sterling Rose Millinery is a small shop with a specific shelf: patch truckers that say something, western
          straws for festival season and the coast road, and sun hats in crochet, raffia, and canvas. The photographs
          on this site are the hats themselves — front, and where we had them, the other angles.
        </p>
      </header>

      <div className="wrap about-photos">
        <div className="shot">
          <img src="/hats/scallop-sage.webp" alt="Sage scalloped crochet sun hat" />
        </div>
        <div className="shot">
          <img src="/hats/cowboy-turquoise.webp" alt="Straw cowboy hat with a turquoise chip band" />
        </div>
        <div className="shot">
          <img src="/hats/salty-moms-pink.webp" alt="Hot pink Salty Moms Club trucker" />
        </div>
      </div>

      <div className="wrap about-grid">
        <section>
          <p className="eyebrow">01</p>
          <h2>The hats</h2>
          <p>
            Truckers are foam-front and mesh, patched rather than printed. Straws run from a plain raffia cowboy to
            conchos, turquoise, and a brim full of flowers. Sun hats split into scalloped crochet, packable raffia,
            and a rolled canvas brim in ten colors.
          </p>
        </section>
        <section>
          <p className="eyebrow">02</p>
          <h2>Ordering</h2>
          <p>
            Add what you want and leave a shipping address. The card is taken on Stripe before a hat goes into a
            box. Shipping inside the United States is {money(SHIPPING_RATE)}.
          </p>
        </section>
        <section>
          <p className="eyebrow">03</p>
          <h2>Care</h2>
          <p>
            Straw and raffia want to stay dry and out of a shut car. Canvas and truckers spot-clean. Every product
            page has the short version for that hat. Reshape a brim with your hands before you reach for steam.
          </p>
        </section>
      </div>

      <div className="wrap about-links">
        {collections.map((collection) => (
          <Link key={collection.id} to={`/shop?collection=${collection.id}`}>
            <span>{collection.eyebrow}</span>
            {collection.name}
          </Link>
        ))}
      </div>
    </article>
  );
}
