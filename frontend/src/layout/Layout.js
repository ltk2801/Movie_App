import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Routers from "../router/Routers";

const Layout = () => {
  return (
    <div className="bg-main text-white">
      <Navbar />
      <Routers />
      <Footer />
    </div>
  );
};

export default Layout;
