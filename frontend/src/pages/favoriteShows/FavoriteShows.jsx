import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import Header from "../../components/header/Header";
import { TbMovieOff } from "react-icons/tb";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import Show from "../../components/show/Show";
import axios from "axios";
import "./style.scss";
import { render } from "../../host";

const FavoriteShows = () => {
  const [moviesData, setMoviesData] = useState([]);

  const [loading, setLoading] = useState(true);

  const getFavoriteMovies = async () => {
    try {
      const host = `${render}/api/favorite/getsavedmovies`;
      const jwtToken = Cookies.get("jwtToken");
      const { data } = await axios.get(host, {
        headers: {
          "auth-token": jwtToken,
        },
      });
      if (data?.status) {
        setMoviesData(data?.favoriteMoviesData);
        setLoading(false);
      } else {
        toast.error(data?.msg, toastOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavoriteMovies();
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  return (
    <>
      <Header />
      <div className="favoritesContainer">
        {loading ? (
          <div className="loadingContainer">
            <Loader />
          </div>
        ) : (
          <>
            {moviesData.length > 0 ? (
              <>
                <h1>
                  Saved <span>Movies</span>
                </h1>
                <ul className="favorites">
                  {moviesData.map((m) => {
                    return <Show key={m.movieId} data={m} />;
                  })}
                </ul>
              </>
            ) : (
              <div className="noShowsContainer">
                <TbMovieOff />
                <h1>No saved movies</h1>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FavoriteShows;
