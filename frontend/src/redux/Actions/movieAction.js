import * as moviesConstant from "../Constants/moviesConstant";
import * as moviesAPIs from "../APIs/moviesService";
// import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// get all movies action
export const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
    limit = "",
    sort = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: moviesConstant.MOVIES_LIST_REQUEST,
      });
      const response = await moviesAPIs.getMoviesService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber,
        limit,
        sort
      );
      dispatch({
        type: moviesConstant.MOVIES_LIST_SUCCESS,
        payload: response,
      });
      dispatch({
        type: moviesConstant.MOVIES_LIST_SEARCH,
        payload: { category, time, language, rate, year },
      });
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstant.MOVIES_LIST_FAIL);
    }
  };

// get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstant.MOVIES_RANDOM_REQUEST });
    const response = await moviesAPIs.getRandomMoviesService();
    dispatch({
      type: moviesConstant.MOVIES_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstant.MOVIES_RANDOM_FAIL);
  }
};

// get random movies action
export const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: moviesConstant.MOVIE_DETAILS_REQUEST });
    const response = await moviesAPIs.getMovieByIdService(id);
    dispatch({
      type: moviesConstant.MOVIE_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstant.MOVIE_DETAILS_FAIL);
  }
};

// get top rated movies action
export const getTopRatedMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstant.MOVIES_TOP_RATED_REQUEST });
    const response = await moviesAPIs.getTopRatedMovieService();
    dispatch({
      type: moviesConstant.MOVIES_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstant.MOVIES_TOP_RATED_FAIL);
  }
};

// review movie action

export const reviewMovieAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: moviesConstant.CREATE_REVIEW_REQUEST });
      const response = await moviesAPIs.reviewMovieService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: moviesConstant.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Đánh giá thành công");
      dispatch({ type: moviesConstant.CREATE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstant.CREATE_REVIEW_FAIL);
    }
  };

// delete movie action
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstant.DELETE_MOVIE_REQUEST });
    const response = await moviesAPIs.deleteMovieService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: moviesConstant.DELETE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Đã xóa thành công phim ");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstant.DELETE_MOVIE_FAIL);
  }
};

// create movie action
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstant.CREATE_MOVIE_REQUEST });
    const response = await moviesAPIs.createMovieService(
      tokenProtection(getState),
      movie
    );
    dispatch({
      type: moviesConstant.CREATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Đã thêm thành công phim ");
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstant.CREATE_MOVIE_FAIL);
  }
};

// create movie action
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstant.UPDATE_MOVIE_REQUEST });
    const response = await moviesAPIs.updateMovieService(
      tokenProtection(getState),
      id,
      movie
    );
    dispatch({
      type: moviesConstant.UPDATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Đã cập nhật thành công phim ");
    dispatch(getMovieByIdAction(id));
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstant.UPDATE_MOVIE_FAIL);
  }
};

// *********** CASTS ****************

// add cast
export const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstant.ADD_CAST_MOVIE, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// remove cast
export const removeCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: moviesConstant.DELETE_CAST_MOVIE, payload: id });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};
// update cast
export const updateCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstant.EDIT_CAST_MOVIE, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// delete all cast
export const deleteAllCastAction = () => async (dispatch) => {
  dispatch({ type: moviesConstant.RESET_CAST_MOVIE });
  localStorage.removeItem("casts");
};
