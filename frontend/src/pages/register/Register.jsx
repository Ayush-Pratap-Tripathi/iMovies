import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookie from "js-cookie";
import "../style.scss";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { render } from "../../host";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = userData;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error("Username should be greater than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 4) {
      toast.error("Password should be equal or greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = userData;

    if (handleValidation()) {
      const host = `${render}/api/auth/register`;

      const response = await axios.post(host, {
        name,
        password,
        email,
      });
      const { data } = response;

      if (data.status) {
        localStorage.setItem("user", JSON.stringify(data.userData));
        Cookie.set("jwtToken", data.jwtToken);
        setUserData({
          name: "",
          password: "",
          email: "",
          confirmPassword: "",
        });
        navigate("/");
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const onShowPass = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit} className="formContainer">
        <h1>
          <span>i</span>Movies
        </h1>
        <p className="loginTitle">Register</p>

        <div className="inputContainer">
          <label htmlFor="name">Username</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Enter Username"
            className="input"
            onChange={(e) => onChange(e)}
            value={userData.name}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            className="input"
            onChange={(e) => onChange(e)}
            value={userData.email}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="pass">Password</label>
          <input
            name="password"
            id="pass"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            className="input"
            onChange={(e) => onChange(e)}
            value={userData.password}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            name="confirmPassword"
            id="confirm"
            type={showPass ? "text" : "password"}
            placeholder="Confirm your password"
            className="input"
            onChange={(e) => onChange(e)}
            value={userData.confirmPassword}
          />
        </div>
        <div className="checkbox">
          <input onChange={onShowPass} id="check" type="checkbox" />
          <label htmlFor="check">Show Password</label>
        </div>

        <button type="submit">Submit</button>
        <p>
          Already have an account?
          <Link style={{ textDecoration: "none" }} to={"/login"}>
            <span>Login</span>
          </Link>
        </p>
        
        {/* Add the Register as Admin button here
        <div className="adminRegister">
          <Link to="/admin/register" style={{ textDecoration: "none" }}>
            <span>admin</span>
          </Link>
        </div> */}

         <p>
          Register as an
          <Link style={{ textDecoration: "none" }} to={"/admin/register"}>
            <span>Admin</span>
          </Link>
        </p>

      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
