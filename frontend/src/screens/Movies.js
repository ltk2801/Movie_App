import React, { useEffect } from "react";
import Filters from "../components/Filters";
import Movie from "../components/Movie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { getAllMoviesAction } from "../redux/Actions/movieAction";
import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const { search } = useParams();

  const dispatch = useDispatch();
  const sameClass =
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  // all movies
  const { isLoading, isError, movies, pages, page, totalMovies } = useSelector(
    (state) => state.getAllMovie
  );
  // key search movie
  const { category, time, language, rate, year } = useSelector(
    (state) => state.keySearchMovies
  );

  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [dispatch, isError]);

  // pagination next and pev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        category: category,
        time: time,
        language: language,
        rate: rate,
        year: year,
        search: search ? search : "",
        pageNumber: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        category: category,
        time: time,
        language: language,
        rate: rate,
        year: year,
        search: search ? search : "",
        pageNumber: page - 1,
      })
    );
  };

  return (
    <div className="min-height-screen container mx-auto px-2 my-6">
      <Filters categories={categories} search={search} />
      <p className="text-lg font-medium my-6">
        Tổng cộng{" "}
        <span className="font-bold text-subMain">
          {totalMovies ? totalMovies : 0}
        </span>{" "}
        bộ phim được tìm thấy {search && `liên quan tới "${search}"`}
      </p>
      {isLoading ? (
        <div className="w-full gap-6 flex-colo min-h-screen">
          <Loader />
        </div>
      ) : movies?.length > 0 ? (
        <>
          <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {movies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
          {/* Loading more */}
          <div className="w-full flex-rows gap-6 md:my-20 my-10">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className={sameClass}
            >
              <TbPlayerTrackPrev className="text-xl" />
            </button>
            <button
              onClick={nextPage}
              disabled={page === pages}
              className={sameClass}
            >
              <TbPlayerTrackNext className="text-xl" />
            </button>
          </div>
        </>
      ) : (
        <div className="w-full gap-6 flex-colo min-h-screen">
          <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo ">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">
            Xin lỗi, chúng tôi không tìm được bộ phim nào theo yêu cầu của bạn
          </p>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
