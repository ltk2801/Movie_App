import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../context/Functionalities";
const Movie = ({ movie, home }) => {
  const { isLoading } = useSelector((state) => state.userLikeFavoriteMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function kiểm tra nếu đã yêu thích rồi thì không cho add thêm và sẽ chuyển màu khác
  const isLiked = IfMovieLiked(movie);

  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie?._id}`} className="w-full">
          <img
            src={movie?.image ? movie?.image : "/images/imageMovie.jpg"}
            alt={movie?.name}
            className="w-full h-96 object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button
            onClick={() => LikeMovie(movie, dispatch, userInfo)}
            disabled={isLiked || isLoading}
            className={`h-9 w-9 text-sm flex-colo transitions ${
              isLiked ? "bg-subMain" : "bg-transparent"
            } hover:bg-transparent hover:text-subMain border-2 border-subMain rounded-md bg-subMain text-white`}
          >
            <FaHeart />
          </button>
        </div>
        {home && (
          <div className="absolute top-0 left-0 bg-subMain text-white flex-colo px-4 py-3 w-20 h-10 text-sm">
            <h4 className=" truncate">NỔI BẬT </h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Movie;
