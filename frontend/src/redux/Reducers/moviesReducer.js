import * as moviesConstant from "../Constants/moviesConstant";

//  GET ALL MOVIES
export const GetAllMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstant.MOVIES_LIST_REQUEST:
      return { isLoading: true };
    case moviesConstant.MOVIES_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.data,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case moviesConstant.MOVIES_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

export const searchKeyMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstant.MOVIES_LIST_SEARCH:
      return {
        category: action.payload.category,
        time: action.payload.time,
        language: action.payload.language,
        rate: action.payload.rate,
        year: action.payload.year,
      };
    default:
      return state;
  }
};
