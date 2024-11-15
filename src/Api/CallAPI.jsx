import axios from "axios";
import { store } from "../redux/store";
import { BASE_URL } from "./Enviornment";

export const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};
export const Status = {
  SUCCESS: 200,
  CREATE: 201,
  ERROR: 400,
  AUTHENTICATION_FAIL: 401,
  NOT_FOUND: 404,
  DELETE: 204,
};

export const callApi = async (url, method, data) => {
  const accessToken = JSON.parse(localStorage?.getItem("accessToken"));
  console?.log("----------------------------------------_>", accessToken);
  const headers = { Accept: "application/json" };
  if (accessToken) {
    headers["Authorization"] = accessToken;
  }
  try {
    console.log("accessToken => ", accessToken);
    const response = await axios({
      method,
      url: BASE_URL + url,
      data,
      headers,
    });
    return response?.data;
  } catch (error) {
    console.log("eerorr => ", error?.response?.data);
    // throw error;
    return error?.response?.data;
  }
};
