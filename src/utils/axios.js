import axios from "axios";

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

export default customAxios;
