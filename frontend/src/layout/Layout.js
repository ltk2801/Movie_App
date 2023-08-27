import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Routers from "../router/Routers";
import MobileFooter from "./Footer/MobileFooter";

const Layout = () => {
  return (
    <div className="bg-main text-white">
      <Navbar />
      <Routers />
      <Footer />
      {/* mobile footer */}
      <MobileFooter />
    </div>
  );
};

export default Layout;
