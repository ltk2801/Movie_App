import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeFavoriteMovieAction } from "../redux/Actions/userActions";

// check if movie is added to favorites
const IfMovieLiked = (movie) => {
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
};

// like movie functionalty
const LikeMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Vui lòng đăng nhập để sử dụng chức năng này")
    : dispatch(likeFavoriteMovieAction({ movieId: movie._id }));
};

export { LikeMovie, IfMovieLiked };
