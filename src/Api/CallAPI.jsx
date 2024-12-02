import axios from "axios";
import { store } from "../redux/store";
import { api, BASE_URL } from "./Enviornment";

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

export const callApi = async (url, method, data, formData) => {
  const accessToken = JSON.parse(localStorage?.getItem("accessToken"));
  console?.log("----------------------------------------_>", accessToken);
  const headers = { Accept: "application/json" };
  if (accessToken) {
    headers["Authorization"] = accessToken;
  }
  if (formData) {
    headers["Content-Type"] = "multipart/form-data";
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
    if (
      error?.response?.data?.message === "jwt expired" ||
      error?.response?.data?.message === "Token has expired."
    ) {
      try {
        const refreshedToken = await refreshAuthToken();
        console.log("New Token => ", refreshedToken);
        localStorage.setItem("accessToken", JSON.stringify(refreshedToken));
        // store.dispatch(setAccessToken(refreshedToken));
        headers["Authorization"] = refreshedToken;
        const refreshedResponse = await axios({
          method,
          url: BASE_URL + url,
          data,
          headers,
        });
        return refreshedResponse?.data;
      } catch (refreshError) {
        throw refreshError;
      }
    } else {
      console.log("eerorr => ", error?.response?.data);
      // throw error;
      return error?.response?.data;
    }
  }
};
const refreshAuthToken = async () => {
  const accessToken = JSON.parse(localStorage?.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage?.getItem("refreshToken"));
  console?.log("----------------->AccessRes", accessToken);
  let device = {};
  device["id"] = "deviceId";
  device["deviceToken"] = "deviceToken";
  console.log("device => ", device);
  try {
    const headerss = { Accept: "application/json" };
    headerss["Authorization"] = accessToken;
    const refreshedResponse = await axios({
      method: Method.POST,
      url: `${BASE_URL}${api.refreshToken}${refreshToken}`,
      data: { device },
      headers: headerss,
    });

    console.log("device => ", refreshedResponse.data?.data?.accessToken);
    return refreshedResponse.data?.data?.accessToken;
  } catch (error) {
    throw error;
  }
};
