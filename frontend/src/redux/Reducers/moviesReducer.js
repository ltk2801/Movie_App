import * as moviesConstant from "../Constants/moviesConstant";

//  GET ALL MOVIES
export const getAllMoviesReducer = (state = { movies: [] }, action) => {
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

export const getRandomMoviesReducer = (state = { movies: [] }, action) => {
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
export const getMovieReducer = (state = { movie: {} }, action) => {
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
export const getTopRatedMoviesReducer = (state = { movies: [] }, action) => {
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

// CREATE REVIEW
export const createReviewMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstant.CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case moviesConstant.CREATE_REVIEW_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case moviesConstant.CREATE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstant.CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// ************************* ADMIN *****************************
// DELETE MOVIE
export const deleteMovieRudecer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstant.DELETE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesConstant.DELETE_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case moviesConstant.DELETE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE MOVIE
export const createMovieRudecer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstant.CREATE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesConstant.CREATE_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case moviesConstant.CREATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstant.CREATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE MOVIE
export const updateMovieRudecer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstant.UPDATE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesConstant.UPDATE_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case moviesConstant.UPDATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstant.UPDATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// CASTS
export const castsRudecer = (state = { casts: [] }, action) => {
  switch (action.type) {
    case moviesConstant.ADD_CAST_MOVIE:
      return { casts: [...state.casts, action.payload] };
    case moviesConstant.EDIT_CAST_MOVIE:
      const updatedCasts = state.casts.map((cast) =>
        cast.id === action.payload.id ? action.payload : cast
      );
      return {
        casts: updatedCasts,
      };
    case moviesConstant.DELETE_CAST_MOVIE:
      return {
        ...state,
        casts: state.casts.filter((cast) => cast.id !== action.payload),
      };
    case moviesConstant.RESET_CAST_MOVIE:
      return { casts: [] };
    default:
      return state;
  }
};
