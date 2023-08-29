import React, { useEffect } from "react";
import AOS from "aos";
import Layout from "./layout/Layout";
import { useDispatch } from "react-redux";
import { getAllCategoriesAction } from "./redux/Actions/categoryAction";

function App() {
  AOS.init();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  return <Layout />;
}

export default App;
