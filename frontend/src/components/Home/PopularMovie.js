import React from "react";

import { BsCollectionFill } from "react-icons/bs";
import { Movies } from "../../assets/data/MovieData";
import Movie from "../Movie";
import Titles from "../Titles";

const PopularMovie = () => {
  return (
    <div className="my-16">
      <Titles title="Những bộ phim nổi tiếng" Icon={BsCollectionFill} />
      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {Movies.slice(0, 8).map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovie;
