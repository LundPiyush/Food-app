import React from "react";
import { useCart } from "../context/cart-context";
import { useState } from "react";

const Cart = () => {
  const { cart, totalCartPrice, totalDeliveryTime } = useCart();
  const [applyCoupon, setApplyCoupon] = useState(false);
  return (
    <div>
      <h3>Cart</h3>
      <h3>
        Total Cart Price - ₹{" "}
        {applyCoupon ? totalCartPrice() - 5 : totalCartPrice()}
      </h3>
      <h3>Total Delivery Time - {totalDeliveryTime()} minutes</h3>
      <button onClick={() => setApplyCoupon((prev) => !prev)}>
        {applyCoupon ? `Remove Applied Coupon` : `Apply Coupon`}
      </button>
      <div className="menu-list">
        {cart.map((item) => {
          return (
            <div key={item?.id} className="card">
              <img src={item?.image} />
              <h4>Name:{item.name}</h4>
              <p>description: {item?.description}</p>
              <p>Price : {item?.price}</p>
              <p>Delivery Time: {item?.delivery_time}</p>
              <p>Quantity - {item?.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
