import { axiosWithAuth, axiosWithAuthSpotify } from "../utils/axiosWithAuth";

export const logInAction = (username) => (dispatch) => {
  dispatch({ type: "LOG_IN" });

  axiosWithAuth()
    .get("users/users")
    .then((res) => {
      console.log("USER LIST RESPONSE:", res.data);

      const userLoggingIn = res.data.filter(
        (user) => user.username === username
      );

      console.log("USER LOGGIN IN", userLoggingIn);

      dispatch({ type: "FETCH_USER", payload: userLoggingIn });
    })
    .catch((err) => {
      console.log("USER LIST ERR:", err);
    });
};

export const predictionsAction = (suggestions) => (dispatch) => {
  dispatch({ type: "CLEAR_RECOMMENDED" });

  suggestions.map((suggestion) => {
    axiosWithAuthSpotify()
      .get(suggestion)
      .then((res) => {
        console.log("SPOTIFY RESPONSE:", res);
        dispatch({ type: "STORE_PREDICTIONS", payload: res.data });
        // setSuggestionsData([suggestionsData.push(res.data)]);
        // console.log("Suggestions Data:", suggestionsData);
      })
      .catch((err) => {
        console.log("SPOTIFY ERROR:", err);
      });
  });
};
