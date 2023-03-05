import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const {
    qty,
    setQty,
    onAdd,
    setShowCart,
    toggleSelectQuantity,
    setToggleSelectQuantity,
    quantityPerProduct,
  } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div className="images-container">
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
          <div className="big-image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
        </div>
        <div className="product-detail-desc">
          <span className="product-name">{name}</span>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <span class="">15 customer reviews</span>
          </div>

          <hr class="divider"></hr>

          <div>
            <span className="product-tag">Price:</span>
            <span className="price">${price}</span>
          </div>

          <span>
            <span
              onClick={() => setToggleSelectQuantity((state) => !state)}
              className="quantity-desc space"
            >
              <span>Qty:</span>
              <span>{qty}</span>
              <i className="icon-dropdown"></i>
            </span>
            {toggleSelectQuantity && (
              <div className="dropdown">
                <ul>
                  {quantityPerProduct.map((element, index) => (
                    <li
                      key={index}
                      onClick={() => setQty(index)}
                      className={qty === index ? "qty select" : "qty"}
                    >
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </span>

          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy now
            </button>
          </div>

          <hr class="divider"></hr>

          <h1>Details</h1>
          <p>{details}</p>
        </div>
      </div>

      <hr class="divider"></hr>

      <div className="maylike-products-wrapper">
        <h2>Customers also search</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == 'product' {
        slug {
            current
        }
    }]`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
  const productsQuery = "*[_type == 'product']";

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
