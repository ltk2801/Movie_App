import * as moviesConstant from "../Constants/moviesConstant";
import * as moviesAPIs from "../APIs/moviesService";
// import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// get all movies action
const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
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
        pageNumber
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

export { getAllMoviesAction };
