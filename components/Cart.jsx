import React, { useRef } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <div className="cart-heading">
          <div className="cart-subtotal">
            <span className="heading">Cart subtotal </span>
            <span className="cart-num-items">({totalQuantities} items): </span>
            <span className="cart-price">${totalPrice}</span>
            <button
              type="button"
              className="cart-close"
              onClick={() => setShowCart(false)}
            >
              <AiOutlineClose size="2rem" />
            </button>
          </div>
          {cartItems.length >= 1 && (
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Proceed to checkout ({totalQuantities} items)
              </button>
            </div>
          )}
        </div>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <h1>Your shopping bag is empty</h1>
            <AiOutlineShopping size={150} />
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <div className="item-name">{item.name}</div>
                    <span className="item-text">Price: </span>
                    <span className="price-symbol">$</span>
                    <span className="item-price-whole">
                      {item.price.toString().split(".")[0]}
                    </span>
                    <span className="item-price-fraction">
                      {item.price.toString().split(".")[1]}
                    </span>
                  </div>
                  <div className="flex bottom">
                    <span className="quantity-desc">
                      <label for="quantity">Qty:</label>
                      <select
                        value={item.quantity}
                        onChange={(e) => {
                          toggleCartItemQuantity(item, e.target.value);
                        }}
                        name="quantity"
                        id="quantity"
                        className="num"
                      >
                        <option value="0">0 (Delete)</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                      </select>
                      <i className="icon-dropdown"></i>
                    </span>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => toggleCartItemQuantity(item, 0)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
