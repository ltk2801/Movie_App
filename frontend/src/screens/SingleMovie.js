import React, { useEffect, useState } from "react";
import { BsCollectionFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import MovieCasts from "../components/Single/MovieCasts";
import MovieInfo from "../components/Single/MovieInfo";
import MovieRates from "../components/Single/MovieRates";
import Titles from "../components/Titles";
import ShareMovieModal from "../components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesAction,
  getMovieByIdAction,
} from "../redux/Actions/movieAction";
import Loader from "../components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import MovieRelated from "../components/Single/MovieRelated";

const SingleMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  // use selector get movie
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  const { movies } = useSelector((state) => state.getAllMovie);

  // related movies
  const relatedMovies = movies?.filter(
    (m) => m.category === movie?.category && m._id !== movie._id
  );

  // useEffect
  useEffect(() => {
    // fetch movie
    dispatch(getMovieByIdAction(id));
    dispatch(getAllMoviesAction({ limit: 20 }));
  }, [dispatch, id]);

  return (
    <div>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">
            Đã có lỗi xảy ra ! Vui lòng thử lại
          </p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MovieInfo movie={movie} setModalOpen={setModalOpen} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            {/* RATE */}
            <MovieRates movie={movie} />
            {/* related */}
            <div className="my-16">
              <Titles
                title="Một số phim cùng thể loại"
                Icon={BsCollectionFill}
              />

              {/* <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                {relatedMovies?.map((movie, index) => (
                  <Movie key={index} movie={movie} />
                ))}
              </div> */}
              <MovieRelated movies={relatedMovies} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleMovie;
