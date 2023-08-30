import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

import { Link } from "react-router-dom";
import Rating from "../Stars";
import { Empty } from "../Notifications/Empty";
import { useDispatch, useSelector } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../../context/Functionalities";

const SwiperTop = ({ prevEl, nextEl, movies }) => {
  const { isLoading } = useSelector((state) => state.userLikeFavoriteMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function kiểm tra nếu đã yêu thích rồi thì không cho add thêm và sẽ chuyển màu khác
  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };

  return (
    <Swiper
      navigation={{ nextEl, prevEl }}
      autoplay={true}
      // loop={true}
      speed={1000}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        758: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
            <img
              src={movie?.titleImage ? movie?.titleImage : "/images/movie.jpg"}
              alt={movie?.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
              <button
                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || isLoading}
                className={`w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full 
              ${
                isLiked(movie) ? "bg-subMain" : "bg-white bg-opacity-30"
              }  text-white`}
              >
                <FaHeart />
              </button>
              <Link
                className="font-semibold text-xl trancuted line-clamp-2"
                to={`/movie/${movie?._id}`}
              >
                {movie?.name}
              </Link>
              <div className="flex gap-2 text-star">
                <Rating value={movie?.rate} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const MovieRelated = ({ movies }) => {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);

  const classNames =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";

  return (
    <div className="my-16">
      <div className="mt-10">
        {movies?.length > 0 ? (
          <>
            <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies} />
            <div className="w-full px-1 flex-rows gap-6 pt-12">
              <button className={classNames} ref={(node) => setPrevEl(node)}>
                <BsCaretLeftFill />
              </button>
              <button className={classNames} ref={(node) => setNextEl(node)}>
                <BsCaretRightFill />
              </button>
            </div>
          </>
        ) : (
          <Empty message="Hiện không có bộ phim nào cùng thể loại" />
        )}
      </div>
    </div>
  );
};

export default MovieRelated;
