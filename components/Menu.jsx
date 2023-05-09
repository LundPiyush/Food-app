import React from "react";
import { useRestuarant } from "../context/restaurant-context";
import Shimmer from "./Shimmer";
import { useCart } from "../context/cart-context";

const Menu = () => {
  const {
    menuList,
    handleSearchText,
    handleCheckboxFilters,
    handleSortBy,
    sortedFilterData,
  } = useRestuarant();
  const { addItemToCart } = useCart();
  return menuList.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <h3 className="menu-heading">Filters</h3>
      <div className="menu-nav">
        <label>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => handleSearchText(e.target.value)}
          />
        </label>
        <label>
          <input
            type="checkbox"
            value="is_vegetarian"
            onChange={(e) => handleCheckboxFilters(e)}
          />
          Veg
        </label>
        <label>
          <input
            type="checkbox"
            value="is_spicy"
            onChange={(e) => handleCheckboxFilters(e)}
          />
          Spicy
        </label>
        <label>
          <input
            type="radio"
            name="radio"
            onChange={() => handleSortBy("low_to_high")}
          />
          Sort (price) Low to High
        </label>
        <label>
          <input
            type="radio"
            name="radio"
            onChange={() => handleSortBy("high_to_low")}
          />
          Sort (price) High to Low
        </label>
      </div>
      <div className="menu-list">
        {sortedFilterData.map((item) => {
          return (
            <div key={item?.id} className="card">
              <img src={item?.image} />
              <h4>Name:{item.name}</h4>
              <p>description: {item?.description}</p>
              <p>Price : {item?.price}</p>
              <p>Delivery Time: {item?.delivery_time}</p>
              <button onClick={() => addItemToCart(item)}>Add to cart</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Menu;
