import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { v4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/loader/Loader";
import "./style.scss";
import Checkout from "../checkoutPage/Checkout";
import { render } from "../../host";
import useSWR from "swr";

const SeatsPage = () => {
  const { showId, theatreName } = useParams();
  const [payment, setPayment] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState({
    balcony: [],
    middle: [],
    lower: [],
  });

  const { resData, loading } = useFetch(
    `/api/theatre/gettheatre/${theatreName}`
  );

  const getSeatsData = async (url) => {
    console.log(url);
    const { data } = await axios.get(url);
    if (data?.status) {
      return data?.show?.tickets;
    }
    return [];
  };

  const {
    data: seatsData,
    loading: seatsLoading,
    error,
    mutate,
  } = useSWR(`${render}/api/shows/getshow/${showId}`, getSeatsData);

  let bookedBalconySeats;
  let bookedMiddleSeats;
  let bookedLowerSeats;
  if (seatsData?.balcony) {
    bookedBalconySeats = Object.keys(seatsData?.balcony);
  }
  if (seatsData?.middle) {
    bookedMiddleSeats = Object.keys(seatsData?.middle);
  }
  if (seatsData?.lower) {
    bookedLowerSeats = Object.keys(seatsData?.lower);
  }
  const bookedSeats = {
    balcony: bookedBalconySeats ? bookedBalconySeats : [],
    middle: bookedMiddleSeats ? bookedMiddleSeats : [],
    lower: bookedLowerSeats ? bookedLowerSeats : [],
  };

  const handleBalconySeats = (i) => {
    const isSeatSelected = selectedSeats?.balcony?.includes(i);

    if (isSeatSelected) {
      let newArray = selectedSeats?.balcony.filter(
        (element, idx) => element !== i
      );
      setSelectedSeats({
        ...selectedSeats,
        balcony: newArray,
      });
    } else {
      if (selectedSeats?.balcony.length < 5) {
        const balconyUpdate = [...selectedSeats.balcony];
        balconyUpdate.push(i);

        setSelectedSeats({
          ...selectedSeats,
          balcony: balconyUpdate,
        });
      }
    }
  };

  const handleMiddleSeats = (i) => {
    const isSeatSelected = selectedSeats?.middle?.includes(i);

    if (isSeatSelected) {
      let newArray = selectedSeats?.middle.filter(
        (element, idx) => element !== i
      );
      setSelectedSeats({
        ...selectedSeats,
        middle: newArray,
      });
    } else {
      if (selectedSeats?.middle.length < 5) {
        const middleUpdate = [...selectedSeats.middle];
        middleUpdate.push(i);

        setSelectedSeats({
          ...selectedSeats,
          middle: middleUpdate,
        });
      }
    }
  };

  const handleLowerSeats = (i) => {
    const isSeatSelected = selectedSeats?.lower?.includes(i);

    if (isSeatSelected) {
      let newArray = selectedSeats?.lower?.filter(
        (element, idx) => element !== i
      );
      setSelectedSeats({
        ...selectedSeats,
        lower: newArray,
      });
    } else {
      if (selectedSeats?.lower.length < 5) {
        const lowerUpdate = [...selectedSeats.lower];
        lowerUpdate.push(i);

        setSelectedSeats({
          ...selectedSeats,
          lower: lowerUpdate,
        });
      }
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  if (resData?.data?.status === false) {
    toast.error(resData?.data?.msg, toastOptions);
  }

  const theatreDetails = resData?.data?.theatre;

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/login");
    }
  }, []);

  const balconyLiTags = [];

  for (let i = 1; i < theatreDetails?.balconySeats + 1; i++) {
    balconyLiTags.push(
      <li
        className={bookedSeats.balcony.includes(String(i)) ? "disable" : ""}
        style={{
          backgroundColor: selectedSeats?.balcony.includes(i) && "crimson",
        }}
        onClick={() => handleBalconySeats(i)}
        key={i}
      ></li>
    );
  }

  const middleLiTags = [];

  for (let i = 1; i < theatreDetails?.middleSeats + 1; i++) {
    middleLiTags.push(
      <li
        className={bookedSeats.middle.includes(String(i)) ? "disable" : ""}
        style={{
          backgroundColor: selectedSeats?.middle.includes(i) && "crimson",
        }}
        onClick={() => handleMiddleSeats(i)}
        key={i}
      ></li>
    );
  }

  const lowerLiTags = [];

  for (let i = 1; i < theatreDetails?.lowerSeats + 1; i++) {
    lowerLiTags.push(
      <li
        className={bookedSeats.lower.includes(String(i)) ? "disable" : ""}
        style={{
          backgroundColor: selectedSeats?.lower.includes(i) && "crimson",
        }}
        onClick={() => handleLowerSeats(i)}
        key={i}
      ></li>
    );
  }

  const handleCheckout = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const { userDetails } = jwtDecode(jwtToken);

      const bookedSeatDetails = {
        balcony: {},
        middle: {},
        lower: {},
      };

      selectedSeats?.balcony.forEach((s) => {
        if (s == "0") {
          return;
        }
        bookedSeatDetails.balcony[s] = { userEmail: userDetails?.email };
      });

      selectedSeats?.middle.forEach((s) => {
        if (s == "0") {
          return;
        }
        bookedSeatDetails.middle[s] = { userEmail: userDetails?.email };
      });

      selectedSeats?.lower.forEach((s) => {
        if (s == "0") {
          return;
        }
        bookedSeatDetails.lower[s] = { userEmail: userDetails?.email };
      });

      bookedSeatDetails.lower["total"] =
        selectedSeats?.lower.length * theatreDetails?.lowerSeatPrice;
      bookedSeatDetails.middle["total"] =
        selectedSeats?.middle.length * theatreDetails?.middleSeatPrice;

      bookedSeatDetails.balcony["total"] =
        selectedSeats?.balcony.length * theatreDetails?.balconySeatPrice;

      const bookingApi = `${render}/api/bookings/addbooking`;
      const { data } = await axios.post(
        bookingApi,
        {
          showId,
          bookingId: v4(),
          ticketsData: bookedSeatDetails,
        },
        {
          headers: {
            "auth-token": jwtToken,
          },
        }
      );

      const host = `${render}/api/shows/updateshowtickets/${showId}`;
      delete bookedSeatDetails.balcony.total;
      delete bookedSeatDetails.middle.total;
      delete bookedSeatDetails.lower.total;
      const res = await axios.put(host, bookedSeatDetails);
      if (res?.data.status) {
        mutate();
        setPayment(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (payment) {
    return (
      <Checkout
        selectedSeats={selectedSeats}
        showId={showId}
        theatreName={theatreName}
      />
    );
  }

  return (
    <>
      <Header />
      {!loading && !seatsLoading ? (
        <div className="seatsPageContainer">
          <div className="wrapper">
            <p className="seatType">Balcony Seats</p>
            <ul className="seats">{balconyLiTags}</ul>
            <p className="seatType">Middle Class Seats</p>
            <ul className="seats">{middleLiTags}</ul>

            <p className="seatType">Lower Class Seats</p>
            <ul className="seats">{lowerLiTags}</ul>
            <div className="row">
              <div className="col">
                <p>Balcony Seats Price:</p>
                <span>
                  {selectedSeats.balcony.length *
                    theatreDetails?.balconySeatPrice}{" "}
                  ₹/-
                </span>
              </div>
              <div className="col">
                <p>Middle Seats Price:</p>
                <span>
                  {selectedSeats.middle.length *
                    theatreDetails?.middleSeatPrice}{" "}
                  ₹/-
                </span>
              </div>
              <div className="col">
                <p>Lower Seats Price:</p>
                <span>
                  {selectedSeats.lower.length * theatreDetails?.lowerSeatPrice}{" "}
                  ₹/-
                </span>
              </div>
            </div>

            <button
              className={
                selectedSeats.balcony.length === 0 &&
                selectedSeats.middle.length === 0 &&
                selectedSeats.lower.length === 0
                  ? "disable"
                  : ""
              }
              onClick={handleCheckout}
            >
              Pay{" "}
              {selectedSeats.lower.length * theatreDetails?.lowerSeatPrice +
                selectedSeats.middle.length * theatreDetails?.middleSeatPrice +
                selectedSeats.balcony.length *
                  theatreDetails?.balconySeatPrice}{" "}
              ₹/-
            </button>
          </div>
        </div>
      ) : (
        <div className="loadingContainer">
          <Loader />
        </div>
      )}
      <ToastContainer />

      <Footer />
    </>
  );
};

export default SeatsPage;
