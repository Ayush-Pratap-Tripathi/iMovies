import axios from "axios";
import { render } from "../host";

const BASE_URL = render;

export const fetchDataFromApi = async (url, params) => {
  try {
    const res = await axios.get(BASE_URL + url, {
      params,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
