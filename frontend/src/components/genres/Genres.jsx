import React from "react";
import "./style.scss";

const Genres = ({ data }) => {
  return (
    <div className="genres">
      {data?.map((g, i) => {
        const genre = g[0].toUpperCase() + g.slice(1);
        return (
          <div key={i} className="genre">
            {genre}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
