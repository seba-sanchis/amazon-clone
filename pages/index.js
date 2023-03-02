import React from "react";

import { client } from "../lib/client";
import { FooterBanner, HeroBanner, Product } from "../components/index";
import banner from "@/sanity/schemas/banner";

const Home = ({ products }) => {
  return (
    <>
      <HeroBanner />
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {/* <FooterBanner footerBanner={bannerData && bannerData[0]} /> */}
    </>
  );
};

export const getServerSideProps = async () => {
  const query = "*[_type == 'product']";
  const products = await client.fetch(query);

  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
