import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logInAction } from "./Actions/spotifyActions";

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
    props.logInAction(userLogin);
    history.push("/dashboard");
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
