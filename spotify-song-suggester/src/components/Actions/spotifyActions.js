import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const logInAction = (logInData) => (dispatch) => {
  dispatch({ type: "LOG_IN_FETCH_USER" });
  axios
    .post(
      "https://tjs-songsuggest.herokuapp.com/login",
      `grant_type=password&username=${logInData.LogInName}&password=${logInData.LogInPassword}`,
      {
        headers: {
          // btoa is converting our client id/client secret into base64
          Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => {
      window.localStorage.setItem("access_token", res.data.access_token);
      console.log("Log in response:", res);

      axiosWithAuth()
        .get("users/users")
        .then((res) => {
          console.log("USER LIST RESPONSE:", res.data);
          dispatch({ type: "FETCH_USER", payload: res.data });
        })
        .catch((err) => {
          console.log("USER LIST ERR:", err);
        });
    })
    .catch((err) => {
      console.log("Log in error:", err);
    });
};
