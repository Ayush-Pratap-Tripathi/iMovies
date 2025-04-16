import "./style.scss";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { MdOutlineDone } from "react-icons/md";
import axios from "axios";
import dayjs from "dayjs";
import { v4 } from "uuid";
import { render } from "../../host";

const Checkout = ({ selectedSeats, showId, theatreName }) => {
  const [modal, setModal] = useState(false);
  const [showDetails, setShowDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getShow = async () => {
    const host = `${render}/api/shows/getshow/${showId}`;
    const { data } = await axios.get(host);
    if (data.status) {
      const movieHost = `${render}/api/movie/getmoviedetails/${data?.show?.movieId}`;

      const res = await axios.get(movieHost);

      const movieDetails = res?.data?.movie;
      const { movieName, runtime, genres, media, certification } = movieDetails;
      const { showdate, showtime } = data?.show;

      const details = {
        movieName,
        runtime,
        genres,
        media,
        certification,
        showdate,
        showtime,
      };

      setShowDetails(details);
      setLoading(false);
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <Header />
      <div className="checkoutContainer">
        <div className="checkout">
          {!modal ? (
            <div className="confirmation">
              <div className="success">
                <MdOutlineDone />
              </div>
              <p>Payment Successful</p>
              <span onClick={openModal}>Claim your tickets</span>
            </div>
          ) : (
            <>
              <h1>
                <span style={{ color: "crimson" }}>Thanks</span> for booking
                tickets
              </h1>
              <div className="modal">
                <h1>Your Tickets 🎉</h1>

                <div className="imageDetailsContainer">
                  <div className="mediaImage">
                    <img src={showDetails?.media} />
                  </div>

                  <div className="col">
                    <div className="row">
                      <span>Movie:</span>
                      <p>{showDetails?.movieName}</p>
                    </div>
                    <div className="row">
                      <span>Theatre:</span>
                      <p>{theatreName}</p>
                    </div>
                    <div className="row">
                      <span>Showdate:</span>
                      <p>
                        {dayjs(showDetails?.showdate).format("MMM D, YYYY")}
                      </p>
                    </div>

                    <div className="row">
                      <span>showtime:</span>
                      <p>{showDetails?.showtime}</p>
                    </div>
                    <h4>Seats:</h4>
                    <div className="ticketsContainer">
                      {selectedSeats?.balcony.length > 0 && (
                        <div className="tickets">
                          <span>Balcony Seats</span>
                          <ul>
                            {selectedSeats?.balcony.map((e, index) => (
                              <li key={v4()}>
                                <p>{e}</p>
                                {index !==
                                  selectedSeats?.balcony.length - 1 && <p>,</p>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedSeats?.middle.length > 0 && (
                        <div className="tickets">
                          <span>Middle Seats:</span>
                          <ul>
                            {selectedSeats?.middle.map((e, index) => (
                              <li key={v4()}>
                                <p>{e}</p>
                                {index !== selectedSeats?.middle.length - 1 && (
                                  <p>,</p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedSeats?.lower.length > 0 && (
                        <div className="tickets">
                          <span>Lower Seats:</span>
                          <ul>
                            {selectedSeats?.lower.map((e, index) => (
                              <li key={v4()}>
                                <p>{e}</p>
                                {index !== selectedSeats?.lower.length - 1 && (
                                  <p>,</p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button className="close" onClick={closeModal}>
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
