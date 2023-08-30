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
        limit
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
