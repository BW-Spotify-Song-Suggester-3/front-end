import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logInAction } from "./Actions/spotifyActions";
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

function LogIn(props) {
  const [userLogin, setUserLogin] = useState(LoginInitailValue);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [userId, setUserId] = useState("swag");
  const history = useHistory();

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
        console.log("Log in response:", res);
        history.push("/dashboard");
        props.logInAction();
      })
      .catch((err) => {
        console.log("Log in error:", err);
      });
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
      <button type="submit">Log In</button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps, { logInAction })(LogIn);
