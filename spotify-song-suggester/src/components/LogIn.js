import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import axios from "axios";

const LogInUserNames = {
  name: "user",
  email: "user@gmail.com",
  password: "user123",
};

const LoginInitailValue = {
  LogInName: "",
  LogInEmail: "",
  LogInPassword: "",
};

const initialDisabled = true;

export default function LogIn() {
  const [userLogin, setUserLogin] = useState(LoginInitailValue);
  const [disabled, setDisabled] = useState(initialDisabled);
  const history = useHistory();

  const postUser = () => {
    axios
      .post(
        "https://tjs-songsuggest.herokuapp.com/login",
        `grant_type=password&username=${userLogin.LogInName}&password=${userLogin.LogInPassword}`,
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
        history.push("/dashboard");
        console.log("API Response:", res);
      })
      .catch((err) => {
        console.log("Post error:", err);
      })
      .finally(() => {
        console.log("post request done");
      });
  };

  const validation = () => {
    if (
      userLogin.LogInName === LogInUserNames.name &&
      userLogin.LogInEmail === LogInUserNames.email &&
      userLogin.LogInPassword === LogInUserNames.password
    ) {
      setDisabled(false);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setUserLogin({ ...userLogin, [name]: value });
    validation();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    postUser();
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="LogInName">
        Username:
        <input
          type="text"
          name="LogInName"
          id="LogInName"
          placeholder="Enter Your UserName"
          value={userLogin.LogInName}
          onChange={onChange}
        />
      </label>

      <label htmlFor="LogInPassword">
        Password:
        <input
          type="password"
          name="LogInPassword"
          id="LogInPassword"
          placeholder="Enter Your Password"
          value={userLogin.LogInPassword}
          onChange={onChange}
        />
      </label>
      <button type="submit">LogIn</button>
    </form>
  );
}
