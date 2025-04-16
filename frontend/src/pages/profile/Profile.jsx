import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./style.scss";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="profileContainer">
        <ul className="profileOptions">
          <li onClick={() => navigate("/bookings")}>Bookings</li>
          <li onClick={() => navigate("/editprofile")}>Edit Profile</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
