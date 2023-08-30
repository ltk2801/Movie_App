import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import AboutUs from "../screens/AboutUs";
import ContactUs from "../screens/ContactUs";
import Policys from "../screens/Policys";
import NotFound from "../screens/NotFound";
import Complaint from "../screens/Complaint";
import MoviesPage from "../screens/Movies";
import SingleMovie from "../screens/SingleMovie";
import WatchPage from "../screens/WatchPage";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/dashboard/Profile";
import Password from "../screens/dashboard/Password";
import FavoritesMovies from "../screens/dashboard/FavoritesMovies";
import MovieList from "../screens/dashboard/Admin/MovieList";
import Dashboard from "../screens/dashboard/Admin/Dashboard";
import Categories from "../screens/dashboard/Admin/Categories";
import Users from "../screens/dashboard/Admin/Users";
import AddMovie from "../screens/dashboard/Admin/AddMovie";
import ScrollOnTop from "../ScrollOnTop";
import ToastContainer from "../components/Notifications/ToastContainer";
import { AdminProtectedRouter, ProtectedRouter } from "../ProtectedRouter";

const Routers = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <ScrollOnTop>
        <Routes>
          {/* * ********** PUBLIC ROUTERS * ***************** */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/policys" element={<Policys />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:search" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* * ********** 404 ROUTERS * ***************** */}
          <Route path="*" element={<NotFound />} />
          {/* * ********** PRIVATE PUBLIC ROUTERS * ***************** */}
          <Route element={<ProtectedRouter />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<Password />} />
            <Route path="/favorites" element={<FavoritesMovies />} />

            {/* * ********** ADMIN ROUTERS * ***************** */}
            <Route element={<AdminProtectedRouter />}>
              <Route path="/movieslist" element={<MovieList />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/users" element={<Users />} />
              <Route path="/addmovie" element={<AddMovie />} />
            </Route>
          </Route>
        </Routes>
      </ScrollOnTop>
    </React.Fragment>
  );
};

export default Routers;
