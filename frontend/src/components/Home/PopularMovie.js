import React from "react";

import { BsCollectionFill } from "react-icons/bs";
import Movie from "../Movie";
import Loader from "../Notifications/Loader";
import Titles from "../Titles";
import { Empty } from "../Notifications/Empty";

const PopularMovie = ({ isLoading, movies }) => {
  return (
    <div className="my-16">
      <Titles title="Những bộ phim nổi tiếng" Icon={BsCollectionFill} />

      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies.slice(0, 8).map((movie, index) => (
            <Movie key={index} movie={movie} home={true} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <Empty message=" Chúng tôi đã gặp một số vấn đề ! Hiện không có bộ phim nào cả" />
        </div>
      )}
    </div>
  );
};

export default PopularMovie;
