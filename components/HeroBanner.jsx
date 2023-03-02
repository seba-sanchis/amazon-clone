import React from "react";
import Link from "next/link";

import banner from "../public/assets/banner.jpg";

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <img src={banner.src} alt="headphones" className="hero-banner-image" />
    </div>
  );
};

export default HeroBanner;
