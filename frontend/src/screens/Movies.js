import React, { useState } from "react";
import Filters from "../components/Filters";
import Movie from "../components/Movie";
import { Movies } from "../assets/data/MovieData";
import { CgSpinner } from "react-icons/cg";

const MoviesPage = () => {
  const maxPage = 4;
  const [page, setPage] = useState(maxPage);
  const handleLoadingMore = () => {
    setPage(page + maxPage);
  };

  const countMovie = Movies.length;

  console.log(page, countMovie);
  return (
    <div className="min-height-screen container mx-auto px-2 my-6">
      <Filters />
      <p className="text-lg font-medium my-6">
        Tổng cộng{" "}
        <span className="font-bold text-subMain">{Movies?.length}</span> bộ phim
        được tìm thấy
      </p>
      <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {Movies.slice(0, page)?.map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </div>
      {/* Loading More */}
      {page < countMovie && (
        <div className="w-full flex-colo md:my-20 my-10">
          <button
            onClick={handleLoadingMore}
            className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain"
          >
            Xem Thêm <CgSpinner className="animate-spin" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
