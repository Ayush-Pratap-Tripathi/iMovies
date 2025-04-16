import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Home = lazy(() => import("./pages/home/Home"));
const AddShow = lazy(() => import("./pages/addShow/AddShow"));
const SeatsPage = lazy(() => import("./pages/seatsPage/SeatsPage"));
const AdminLogin = lazy(() => import("./pages/login/AdminLogin"));
const MovieDetails = lazy(() => import("./pages/movieDetails/MovieDetails"));
const AddTheatre = lazy(() => import("./pages/addTheatre/AddTheatre"));
const MovieShows = lazy(() => import("./pages/movieShows/MovieShows"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const AddMovie = lazy(() => import("./pages/addMovie/AddMovie"));
const FavoriteShows = lazy(() => import("./pages/favoriteShows/FavoriteShows"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const AdminRegister = lazy(() => import("./pages/register/AdminRegister"));
const Bookings = lazy(() => import("./pages/bookings/Bookings"));
const EditUserDetails = lazy(() =>
  import("./pages/editUserDetails/EditUserDetails")
);

import Loader from "./components/loader/Loader";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="loadingContainer">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/addshow" element={<AddShow />} />
          <Route path="/showdetails/:movieId" element={<MovieDetails />} />
          <Route path="/admin/addtheatre" element={<AddTheatre />} />
          <Route path="/movieshows/:movieName" element={<MovieShows />} />
          <Route path="/seats/:theatreName/:showId" element={<SeatsPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/addmovie" element={<AddMovie />} />
          <Route path="/savedmovies" element={<FavoriteShows />} />
          <Route path="/editprofile" element={<EditUserDetails />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
