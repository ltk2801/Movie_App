import React from "react";
import AOS from "aos";
import Layout from "./layout/Layout";

function App() {
  AOS.init();
  return <Layout />;
}

export default App;
