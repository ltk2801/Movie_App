import React from "react";
import Banner from "../components/Home/Banner";
import PopularMovie from "../components/Home/PopularMovie";
import Promos from "../components/Home/Promos";
import TopRated from "../components/Home/TopRated";

const HomeScreen = () => {
  return (
    <div className="container mx-auto min-h-screen px-2 mb-6">
      <Banner />
      <PopularMovie />
      <Promos />
      <TopRated />
    </div>
  );
};

export default HomeScreen;
