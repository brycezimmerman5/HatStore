import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const KEY = "srm-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const api = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

    function add(item, { openDrawer = true } = {}) {
      setItems((prev) => {
        const index = prev.findIndex((line) => line.id === item.id && line.color === item.color);
        if (index === -1) return [...prev, { ...item, qty: item.qty || 1 }];
        return prev.map((line, i) =>
          i === index ? { ...line, qty: Math.min(8, line.qty + (item.qty || 1)) } : line
        );
      });
      setToast(`${item.name} added to your bag`);
      if (openDrawer) setOpen(true);
    }

    function setQty(id, color, qty) {
      setItems((prev) =>
        prev.flatMap((line) => {
          if (line.id !== id || line.color !== color) return [line];
          if (qty <= 0) return [];
          return [{ ...line, qty: Math.min(8, qty) }];
        })
      );
    }

    function remove(id, color) {
      setItems((prev) => prev.filter((line) => !(line.id === id && line.color === color)));
    }

    function clear() {
      setItems([]);
    }

    return { items, count, subtotal, open, setOpen, toast, add, setQty, remove, clear };
  }, [items, open, toast]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
