import product from "@/sanity/schemas/product";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [toggleSelectQuantity, setToggleSelectQuantity] = useState(false);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (element, value) => {
    
    setToggleSelectQuantity(false);

    if (value > 0) {
      foundProduct = cartItems.find((item) => item._id === element._id);
      index = cartItems.findIndex((product) => product._id === element._id);
      const newCartItems = cartItems.filter((item) => item._id !== element._id);

      if (foundProduct.quantity < value) {
        let toAdd = parseFloat(value - foundProduct.quantity);

        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + foundProduct.price * toAdd
        );
        setTotalQuantities(
          (prevTotalQuantities) => prevTotalQuantities + toAdd
        );
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: (foundProduct.quantity = value) },
        ]);
      } else if (foundProduct.quantity > value) {
        let toRemove = parseFloat(foundProduct.quantity - value);

        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: (foundProduct.quantity = value) },
        ]);
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - foundProduct.price * toRemove
        );
        setTotalQuantities(
          (prevTotalQuantities) => prevTotalQuantities - toRemove
        );
      }
    } else {
      foundProduct = cartItems.find((item) => item._id === element._id);
      const newCartItems = cartItems.filter((item) => item._id !== element._id);

      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.price * foundProduct.quantity
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
      );
      setCartItems(newCartItems);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        onAdd,
        toggleCartItemQuantity,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        toggleSelectQuantity,
        setToggleSelectQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
