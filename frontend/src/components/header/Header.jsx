import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { LuSearch, LuShoppingCart } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFavorite } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoSunny } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { ThemeContext } from "../../context/themeContext";
import { searchContext } from "../../context/searchContext";

import Cookies from "js-cookie";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { toggle, theme } = useContext(ThemeContext);
  const { setQuery } = useContext(searchContext);

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/login");
    }
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuery(searchInput);
      setSearchInput("");
      navigate("/");
    }
  };
  const handleSearch = () => {
    setQuery(searchInput);
    setSearchInput("");
    navigate("/");
  };

  return (
    <>
      <nav className={`header`}>
        <h1
          onClick={() => {
            navigate("/");
            setQuery("");
          }}
        >
          <span>i</span>Movies
        </h1>

        <button onClick={() => setMenu(!menu)} className="menuButton">
          <RxHamburgerMenu />
        </button>

        {menu && (
          <ul className="menu">
            <li>
              {theme === "dark" ? (
                <IoSunny onClick={toggle} />
              ) : (
                <MdOutlineDarkMode onClick={toggle} />
              )}
            </li>
            <li
              onClick={() => {
                navigate("/");
                setQuery("");
              }}
            >
              <HiOutlineHome />
            </li>
            <li>
              <LuSearch onClick={() => setSearch(!search)} />
            </li>
            <li>
              <GrFavorite onClick={() => navigate("/savedmovies")} />
            </li>
            <li>
              <CgProfile onClick={() => navigate("/profile")} />
            </li>
          </ul>
        )}

        <div className="searchIconsContainer">
          <div className="searchContainer">
            <input
              onKeyUp={handleEnter}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
            />
            <button>
              <LuSearch />
            </button>
          </div>

          <ul className="menuItems">
            <li className="item">
              {theme === "dark" ? (
                <IoSunny onClick={toggle} />
              ) : (
                <MdOutlineDarkMode onClick={toggle} />
              )}
            </li>
            <li
              onClick={() => {
                navigate("/");
                setQuery("");
              }}
              className="item"
            >
              <HiOutlineHome />
            </li>
            <li className="item">
              <GrFavorite onClick={() => navigate("/savedmovies")} />
            </li>
            <li className="item">
              <CgProfile onClick={() => navigate("/profile")} />
            </li>
          </ul>
        </div>
      </nav>
      {search && (
        <div className="search">
          <input
            onKeyUp={handleEnter}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder=""
          />
          <button onClick={handleSearch}>
            <LuSearch />
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
