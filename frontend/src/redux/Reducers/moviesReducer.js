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

// GET RANDOM MOVIE

export const GetRandomMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstant.MOVIES_RANDOM_REQUEST:
      return { isLoading: true };
    case moviesConstant.MOVIES_RANDOM_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload,
      };
    case moviesConstant.MOVIES_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};
// GET  MOVIE
export const GetMovieReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case moviesConstant.MOVIE_DETAILS_REQUEST:
      return { isLoading: true };
    case moviesConstant.MOVIE_DETAILS_SUCCESS:
      return {
        isLoading: false,
        movie: action.payload,
      };
    case moviesConstant.MOVIE_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstant.MOVIE_DETAILS_RESET:
      return { movie: {} };
    default:
      return state;
  }
};
// GET TOP RATED MOVIE
export const GetTopRatedMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstant.MOVIES_TOP_RATED_REQUEST:
      return { isLoading: true };
    case moviesConstant.MOVIES_TOP_RATED_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload,
      };
    case moviesConstant.MOVIES_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};
