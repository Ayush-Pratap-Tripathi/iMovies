import React, { useContext, useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import "./style.scss";
import { ThemeContext } from "../../context/themeContext";

const Loader = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <InfinitySpin
        visible={true}
        width="200"
        color={theme === "dark" ? "#ffffff" : "#0f172a"}
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
