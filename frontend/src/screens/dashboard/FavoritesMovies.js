import React, { useEffect } from "react";
import Table from "../../components/Table";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavoriteMoviesAction,
  deleteFavoriteMoviesAction,
  deleteLikeMovieAction,
} from "../../redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../components/Notifications/Loader";
import { Empty } from "../../components/Notifications/Empty";

const FavoritesMovies = () => {
  const dispatch = useDispatch();

  // get Favorite Movies
  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );
  // delete
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMovies);

  const {
    isLoading: deleteMovieLoading,
    isError: deleteMovieError,
    isSuccess: deleteMovieSuccess,
  } = useSelector((state) => state.userDeleteLikeFavoriteMovie);

  // delete movies handler
  const deleteMoviesHandler = () => {
    window.confirm("Bạn thật sự muốn xóa toàn bộ danh sách phim yêu thích ?") &&
      dispatch(deleteFavoriteMoviesAction());
  };

  // delele movie handler
  const deleteFavoriteMovieHandler = (id) => {
    window.confirm(
      "Bạn thật sự muốn xóa bộ phim này khỏi danh sách yêu thích ?"
    ) && dispatch(deleteLikeMovieAction(id));
  };

  // useEffect
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "GET_FAVORITE_MOVIES_RESET"
          : "DELETE_FAVORITE_MOVIES_RESET",
      });
    }
    if (deleteMovieError) {
      toast.error(deleteMovieError);
      dispatch({
        type: "DELETE_LIKE_MOVIE_RESET",
      });
    }
    if (deleteMovieSuccess) {
      dispatch({ type: "DELETE_LIKE_MOVIE_RESET" });
    }
  }, [
    dispatch,
    isError,
    deleteError,
    deleteSuccess,
    deleteMovieError,
    deleteMovieSuccess,
  ]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Danh Sách Phim Yêu Thích</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {deleteLoading ? "Đang xóa...." : "Xóa Hết"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies.length > 0 ? (
          <Table
            data={likedMovies}
            admin={false}
            onDeleteFunction={deleteFavoriteMovieHandler}
            isLoading={deleteMovieLoading}
          />
        ) : (
          <Empty message="Danh sách những bộ phim yêu thích trống" />
        )}
      </div>
    </SideBar>
  );
};

export default FavoritesMovies;
