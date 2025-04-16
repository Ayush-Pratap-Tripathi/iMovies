import React, { useEffect, useState } from "react";
import axios from "axios";
import { render } from "../../host";
import { toast } from "react-toastify";
import "./style.scss";
import Loader from "../../components/loader/Loader";
import { FaMasksTheater } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const Theatres = ({ setTheatreEdit, theatres, loading }) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const editEvent = (id) => {
    setTheatreEdit(id);
  };

  const Theatre = ({ data }) => {
    let { theatreId, theatreName, location } = data;
    theatreName = theatreName[0].toUpperCase() + theatreName.slice(1);
    return (
      <li className="theatre">
        <div className="left">
          <FaMasksTheater className="mask" />
        </div>

        <div className="right">
          <p>
            Theatre: <span>{theatreName}</span>
          </p>
          <p>
            Location: <span>{location}</span>
          </p>
          <div className="row">
            <MdModeEditOutline
              className="edit"
              onClick={() => editEvent(theatreId)}
            />
            <RxCross1 className="cancel" onClick={() => editEvent("")} />
          </div>
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
        <div className="theatresContainer">
          <h1
            style={{
              textAlign: "center",
              backgroundColor: "crimson",
              color: "white",
              marginBottom: "20px",
            }}
          >
            Available Theatres
          </h1>
          <ul className="theatres">
            {theatres?.map((t) => (
              <Theatre data={t} key={t.theatreId} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Theatres;
