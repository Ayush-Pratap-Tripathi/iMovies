import React, { useEffect, useState } from "react";
import "./style.scss";
import { render } from ".././../host";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import dayjs from "dayjs";
import { MdModeEditOutline } from "react-icons/md";
import "./style.scss";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const toastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  closeOnClick: true,
};

const AdminMovies = ({ setEditMovie, movies, loading }) => {
  const Show = ({ data, setEditMovie }) => {
    var { movieName, releaseDate, media, movieId } = data;
    const navigate = useNavigate();
    movieName = movieName[0].toUpperCase() + movieName.slice(1);

    const editEvent = (e) => {
      setEditMovie(movieId);
      e.stopPropagation();
    };

    return (
      <li
        onClick={() => navigate(`/showdetails/${movieId}`)}
        className="adminShow"
      >
        <div className="imageContainer">
          <div onClick={editEvent} className="edit">
            <MdModeEditOutline />
          </div>
          <div
            onClick={(e) => {
              setEditMovie("");
              e.stopPropagation();
            }}
            className="cancel"
          >
            <RxCross1 />
          </div>
          <img className="image" src={media} />
        </div>
        <div>
          <p className="name">{movieName}</p>
          <p>{dayjs(releaseDate).format("MMM D, YYYY")}</p>
        </div>
      </li>
    );
  };

  return (
    <>
      {loading ? (
        <div className="loadingContainer">
          <Loader />
        </div>
      ) : (
        <ul className="adminMoviesContainer">
          {movies?.map((i) => {
            return <Show setEditMovie={setEditMovie} key={i._id} data={i} />;
          })}
        </ul>
      )}
    </>
  );
};

export default AdminMovies;
