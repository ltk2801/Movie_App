import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import AboutUs from "../screens/AboutUs";
import ContactUs from "../screens/ContactUs";
import Policys from "../screens/Policys";
import NotFound from "../screens/NotFound";
import Complaint from "../screens/Complaint";
import MoviesPage from "../screens/Movies";
import SingleMovie from "../screens/SingleMovie";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/policys" element={<Policys />} />
      <Route path="/complaint" element={<Complaint />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movie/:id" element={<SingleMovie />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
