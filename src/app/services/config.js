// import baseAxios from "axios";

// const axios = baseAxios.create({
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// //todo: define interceptors and other configuration like baseURL, headers etc. here
// export default axios;

import axios from "axios";
import jwtAxios from "axios";
// import { Axios } from "index";

// const jwtAuthAxios = jwtAxios.create({
//   baseURL: "http://localhost:3080/api/v1/admin",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// jwtAuthAxios.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response && err.response.data.type === "token-invalid") {
//       //todo logout the user
//     }
//     return Promise.reject(err);
//   }
// );

// export default jwtAuthAxios;
export const Axios = axios.create({
    baseURL: process.env.REACT_APP_URL,
  });
  
  Axios.interceptors.request.use(function (request) {
    const token = localStorage.getItem("token");
  
    if (token) {
      request.headers.token = token;
      request.withCredentials = true;
    document.cookie = `token=${token}; path=/`;
    }
  
    return request;
  });

export const getCurrentUser = async () => {
  try {
    const { data } = await Axios.get("/auth/get-user");
    return data?.data;
  } catch (error) {
    return null;
  }
};

// export const setAuthToken = (token) => {
//   if (token) {
//     Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//     localStorage.setItem("token", token);
//   } else {
//     delete Axios.defaults.headers.common["Authorization"];
//     localStorage.removeItem("token");
//   }
// };

// export const getAuthToken = () => {
//   return localStorage.getItem("token");
// };

//todo: define interceptors and other configuration like baseURL, headers etc. here
