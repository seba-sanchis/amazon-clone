import React from "react";
import { useRouter } from 'next/router'
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className={router.pathname === "/" ? "layout" : "product-bg"}>
      <Head>
        <title>e-commerce</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
