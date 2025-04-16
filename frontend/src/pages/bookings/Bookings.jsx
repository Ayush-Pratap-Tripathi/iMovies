import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "../../components/loader/Loader";
import dayjs from "dayjs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { v4 } from "uuid";
import { render } from "../../host";
import { useNavigate } from "react-router-dom";
import { LuHistory } from "react-icons/lu";
import useSWR from "swr";
import "./style.scss";

const Bookings = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      alert("Login is required");
      navigate("/login");
    }
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const getBookingsData = async (url) => {
    try {
      const jwtToken = Cookies.get("jwtToken");

      const { data } = await axios.get(url, {
        headers: {
          "auth-token": jwtToken,
        },
      });
      if (data.status) {
        return data.bookings;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data: bookings,
    loading,
    mutate,
  } = useSWR(`${render}/api/bookings/getbookings`, getBookingsData);

  const handleCancel = async (bookingId, balcony, middle, lower) => {
    try {
      const tickets = {
        balcony,
        middle,
        lower,
      };
      const host = `${render}/api/bookings/cancelbooking/${bookingId}`;

      const { data } = await axios.put(host, {
        tickets,
        bookingId,
      });
      if (data.status) {
        toast.success(data.msg, toastOptions);
        mutate();
      } else {
        toast.error(data.msg, toastOptions);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const renderEmptyBookings = () => (
    <div className="emptyBookings">
      <h1>
        No <span>Bookings</span>
      </h1>
      <LuHistory />
    </div>
  );

  return (
    <>
      <Header />
      {loading ? (
        <div className="loadingContainer">
          <Loader />
        </div>
      ) : (
        <div className="bookingsContainer">
          {bookings?.length == 0 ? (
            renderEmptyBookings()
          ) : (
            <>
              <h1>
                Your <span>Bookings</span>
              </h1>
              <ul className="bookings">
                {bookings?.map((b) => {
                  const {
                    bookingId,
                    media,
                    movieName,
                    showdate,
                    showtime,
                    theatreName,
                    ticketsData,
                  } = b;
                  let price = 0;
                  let { balcony, middle, lower } = ticketsData;
                  price += balcony.total + middle.total + lower.total;
                  const balconyKeys = Object.keys(balcony);
                  const middleKeys = Object.keys(middle);
                  const lowerKeys = Object.keys(lower);
                  function isNumber(str) {
                    // Using regular expression to check if the string consists only of digits or is a valid float
                    return /^\d+(\.\d+)?$/.test(str);
                  }

                  balcony = balconyKeys.filter((s) => isNumber(s) === true);
                  middle = middleKeys.filter((s) => isNumber(s) === true);
                  lower = lowerKeys.filter((s) => isNumber(s) === true);

                  const showCancelable = () => {
                    const today = new Date();
                    const showDay = new Date(showdate);

                    if (showDay.getDate() >= today.getDate()) {
                      return true;
                    } else {
                      return false;
                    }
                  };

                  return (
                    <li className="booking" key={bookingId}>
                      <div className="mediaImage">
                        <img src={media} />
                      </div>

                      <div className="col">
                        <div className="row">
                          <span>Movie:</span>
                          <p>{movieName}</p>
                        </div>
                        <div className="row">
                          <span>Theatre:</span>
                          <p>{theatreName}</p>
                        </div>
                        <div className="row">
                          <span>Showdate:</span>
                          <p>{dayjs(showdate).format("MMM D, YYYY")}</p>
                        </div>

                        <div className="row">
                          <span>showtime:</span>
                          <p>{showtime}</p>
                        </div>

                        <div className="ticketsContainer">
                          {balcony.length > 0 && (
                            <div className="tickets">
                              <span>Balcony Seats:</span>
                              <ul>
                                {balcony.map((e, index) => (
                                  <li key={v4()}>
                                    <p>{isNumber(e) && e}</p>
                                    {index !== balcony.length - 1 && <p>,</p>}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {middle.length > 0 && (
                            <div className="tickets">
                              <span>Middle Seats:</span>
                              <ul>
                                {middle.map((e, index) => (
                                  <li key={v4()}>
                                    <p>{isNumber(e) && e}</p>
                                    {index !== middle.length - 1 && <p>,</p>}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {lower.length > 0 && (
                            <div className="tickets">
                              <span>Lower Seats:</span>
                              <ul>
                                {lower.map((e, index) => (
                                  <li key={v4()}>
                                    <p>{isNumber(e) && e}</p>
                                    {index !== lower.length - 1 && <p>,</p>}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <span>Total Price:</span>
                          <p>{price}₹</p>
                        </div>
                        <button
                          onClick={() =>
                            handleCancel(bookingId, balcony, middle, lower)
                          }
                          className="cancel"
                          style={showCancelable() ? {} : { display: "none" }}
                          type="button"
                        >
                          Cancel
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Bookings;
