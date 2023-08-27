import React, { useState } from "react";
import { BsCollectionFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Movies } from "../assets/data/MovieData";
import MovieCasts from "../components/Single/MovieCasts";
import MovieInfo from "../components/Single/MovieInfo";
import MovieRates from "../components/Single/MovieRates";
import Titles from "../components/Titles";
import Movie from "../components/Movie";
import ShareMovieModal from "../components/Modals/ShareModal";

const SingleMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { id } = useParams();
  const movie = Movies.find((movie) => movie.name === id);

  const relatedMovies = Movies.filter((m) => m.category === movie.category);

  return (
    <div>
      <ShareMovieModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        movie={movie}
      />
      <MovieInfo movie={movie} setModalOpen={setModalOpen} />
      <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieCasts />
        {/* RATE */}
        <MovieRates movie={movie} />
        {/* related */}
        <div className="my-16">
          <Titles title="Phim liên quan" Icon={BsCollectionFill} />
          <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {relatedMovies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
