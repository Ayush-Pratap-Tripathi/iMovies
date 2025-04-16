import React from "react";
import dayjs from "dayjs";
import "./style.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import useFetch from "../../hooks/useFetch";
import { BiCameraMovie } from "react-icons/bi";
import { TbMovieOff } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

const MovieShows = () => {
  const navigate = useNavigate();
  const { movieName } = useParams();
  const { resData, loading, error } = useFetch(
    `/api/shows/getmovieshows/${movieName}`
  );

  const showsData = resData?.data?.showData;
  showsData?.sort(function (a, b) {
    // Concatenate date and time strings for comparison
    var datetimeA = new Date(a.showdate + "T" + a.showtime + "Z");
    var datetimeB = new Date(b.showdate + "T" + b.showtime + "Z");

    return datetimeA - datetimeB;
  });

  function convertTo12HourFormat(time24) {
    // Split the time string into hours and minutes
    var [hours, minutes] = time24.split(":");

    // Convert hours to integer
    hours = parseInt(hours);

    // Determine AM or PM
    var meridiem = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Format the time string in 12-hour format
    var time12 = hours + ":" + minutes + " " + meridiem;

    return time12;
  }

  return (
    <>
      <Header />
      {!loading ? (
        <div className="movieShowsContainer">
          <div className="wrapper">
            {showsData?.length > 0 ? (
              <>
                <h1>Available Shows</h1>
                <ul className="showsContainer">
                  {showsData?.map((s, i) => {
                    const lowerCaseTheatre = s?.theatre.toLowerCase();
                    return (
                      <li key={i}>
                        <BiCameraMovie />
                        <div className="right">
                          <div>
                            <span>Theatre:</span>
                            <p>{s?.theatre}</p>
                          </div>
                          <div>
                            <span>Showdate:</span>
                            <p>{dayjs(s?.showdate).format("MMM D, YYYY")}</p>
                          </div>
                          <div>
                            <span>Showtime:</span>
                            <p>{convertTo12HourFormat(s?.showtime)}</p>
                          </div>

                          <button
                            onClick={() =>
                              navigate(
                                `/seats/${lowerCaseTheatre}/${s?.showId}`
                              )
                            }
                          >
                            Buy Tickets
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <div className="noShowsContainer">
                <TbMovieOff />
                <h1>No Shows are available</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loadingContainer">
          <Loader />
        </div>
      )}
      <Footer />
    </>
  );
};

export default MovieShows;
