import React, { useState } from "react";
import dayjs from "dayjs";
import { MdModeEditOutline } from "react-icons/md";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";

const Show = ({ data }) => {
  let { movieName, releaseDate, media, movieId } = data;
  const navigate = useNavigate();
  movieName = movieName[0].toUpperCase() + movieName.slice(1);

  return (
    <li onClick={() => navigate(`/showdetails/${movieId}`)} className="show">
      <div className="imageContainer">
        <img className="image" src={media} />
      </div>
      <div>
        <p className="name">{movieName}</p>
        <p>{dayjs(releaseDate).format("MMM D, YYYY")}</p>
      </div>
    </li>
  );
};

export default Show;
