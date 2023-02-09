import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import logo from "../public/assets/logo.png";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="logo">
        <Link href="/">
          <img src={logo.src} alt="logo" />
        </Link>
      </div>

      <button
        type="button"
        className="cart-btn"
        onClick={() => setShowCart(true)}
      >
        <div className="cart-icon">
          <span className="cart-item-qty">{totalQuantities}</span>
          <span className="cart-background"></span>
        </div>
        <div className="cart-icon">
          <span></span>
          <span className="cart-text">Cart</span>
        </div>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
