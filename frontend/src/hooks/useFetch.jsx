import { useContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/fetchApi";
import { searchContext } from "../context/searchContext";

const useFetch = (url, params) => {
  const [resData, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { query } = useContext(searchContext);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchDataFromApi(url, params)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url, query]);
  return { resData, loading, error };
};

export default useFetch;
