import { axiosWithAuth } from "../utils/axiosWithAuth";

export const logInAction = () => (dispatch) => {
  dispatch({ type: "LOG_IN" });

  axiosWithAuth()
    .get("users/users")
    .then((res) => {
      console.log("USER LIST RESPONSE:", res.data);
      dispatch({ type: "FETCH_USER", payload: res.data });
    })
    .catch((err) => {
      console.log("USER LIST ERR:", err);
    });
};
