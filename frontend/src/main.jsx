import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import ThemeProvider from "./providers/themeProvider";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { SearchContextProvider } from "./context/searchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <ThemeProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </ThemeProvider>
  </ThemeContextProvider>
);
