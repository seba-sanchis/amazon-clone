import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <div className="product-card">
        <p className="product-title">{name}</p>
        <div className="product-image-container">
          <Link href={`/product/${slug.current}`}>
            <img
              src={urlFor(image && image[0])}
              width={250}
              height={250}
              className="product-image"
            />
          </Link>
        </div>
        <div className="product-price">
          <span className="product-price-symbol">$</span>
          <span className="product-price-whole">{price}</span>
        </div>
        <Link href={`/product/${slug.current}`}>
          <div className="product-link">Show now</div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
