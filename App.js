import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import { RestaurantProvider } from "./context/restaurant-context";
import { CartProvider, useCart } from "./context/cart-context";

function App() {
  const { cart } = useCart();
  return (
    <div>
      <nav style={{ textAlign: "center" }}>
        <NavLink to="/home"> Home </NavLink> ||
        <NavLink to="/menu"> Menu </NavLink>||
        <NavLink to="/cart"> Cart-({cart.length})</NavLink>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <RestaurantProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </RestaurantProvider>
);
export default App;
