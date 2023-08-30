import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Home/Banner";
import PopularMovie from "../components/Home/PopularMovie";
import Promos from "../components/Home/Promos";
import TopRated from "../components/Home/TopRated";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMoviesAction,
} from "../redux/Actions/movieAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  // random movies
  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);

  // top rated movies
  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovie);

  // all movies
  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovie
  );

  // useEffect
  useEffect(() => {
    //get random movies
    dispatch(getRandomMoviesAction());
    // get all movies
    dispatch(getAllMoviesAction({}));
    // get top rated movies
    dispatch(getTopRatedMoviesAction());
    // errors
    if (isError || topError || randomError) {
      toast.error("Đã có lỗi xảy ra !");
    }
  }, [dispatch, isError, topError, randomError]);
  return (
    <div className="container mx-auto min-h-screen px-2 mb-6">
      <Banner movies={movies} isLoading={isLoading} />
      <PopularMovie movies={randomMovies} isLoading={randomLoading} />
      <Promos />
      <TopRated movies={topMovies} isLoading={topLoading} />
    </div>
  );
};

export default HomeScreen;
