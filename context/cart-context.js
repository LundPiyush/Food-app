import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItemToCart = (itemToBeAdded) => {
    const isItemPresent = cart.some(
      (item) => Number(item.id) === Number(itemToBeAdded.id)
    );
    if (!isItemPresent) {
      setCart([...cart, { ...itemToBeAdded, quantity: 1 }]);
    } else {
      setCart(
        cart.map((item) =>
          item.id === itemToBeAdded.id
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        )
      );
    }
  };

  const totalCartPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  const totalDeliveryTime = () => {
    return cart.reduce((acc, item) => acc + item.delivery_time, 0);
  };
  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, totalCartPrice, totalDeliveryTime }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
