import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Category from "./Reducers/categoriesReducer";
import * as Movie from "./Reducers/moviesReducer";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
  userDeleteFavoriteMovies: User.userDeleteFavoriteMoviesReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userLikeFavoriteMovie: User.userLikeFavoriteMovieReducer,
  userDeleteLikeFavoriteMovie: User.userDeleteLikeFavoriteMovieReducer,
  // Category reducers
  categoryGetAll: Category.GetAllCategoriesReducer,
  categoryCreate: Category.CreateCategoryReducer,
  categoryUpdate: Category.UpdateCategoryReducer,
  categoryDelete: Category.DeleteCategoryReducer,

  // movie reducers
  getAllMovie: Movie.getAllMoviesReducer,
  keySearchMovies: Movie.searchKeyMoviesReducer,
  getRandomMovies: Movie.getRandomMoviesReducer,
  getMovieById: Movie.getMovieReducer,
  getTopRatedMovie: Movie.getTopRatedMoviesReducer,
  reviewMovie: Movie.createReviewMovieReducer,
  adminDeleteMovie: Movie.deleteMovieRudecer,
  adminCreateMovie: Movie.createMovieRudecer,
  casts: Movie.castsRudecer,
  adminUpdateMovie: Movie.updateMovieRudecer,
  castsUpdate: Movie.castsRudecerUpdate,
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
