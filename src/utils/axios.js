import axios from "axios";
import { toast } from "react-toastify";
import { disconnect } from "@wagmi/core";
import Router from "next/router";

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
const requestHandler = (request) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const config = {
      Authorization: "Bearer " + token,
      // domain_url: `https://${window.location.host}`,
      "ngrok-skip-browser-warning": true,
      ...request.headers,
    };
    request.headers = config;
  }
  return request;
};
customAxios.interceptors.request.use((request) => requestHandler(request));
customAxios.interceptors.response.use(
  (resp) => {
    return resp;
  },
  (err) => {
    if (
      err.response.data.error.stack.toLowerCase().includes("tokenexpirederror")
    ) {
      disconnect()
        .then((res) => {
          console.log("res", res);
          Router.push("/");
          window.localStorage.user_context = null;
          console.log("error data\n\n", err, "\n\n");
          toast.error("Please reconnect");
        })
        .catch((res) => console.log("res"));

      return err;
    }
    toast.error("Something went wrong");
    return err;
  }
);

export default customAxios;
