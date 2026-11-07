import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./cart";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import About from "./pages/About";
import Checkout, { Confirmation } from "./pages/Checkout";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route
            path="*"
            element={
              <div className="wrap missing">
                <p className="eyebrow">404</p>
                <h1>That hat is not on the shelf.</h1>
                <Link className="btn" to="/shop">
                  Back to the shop
                </Link>
              </div>
            }
          />
        </Route>
      </Routes>
    </CartProvider>
  );
}
