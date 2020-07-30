import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
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
    <div className="margin">
    <div className="ui placeholder segment">
  <div className="ui two column very relaxed stackable grid">

    <div className="column">
      <div className="ui form">

      <form onSubmit={onSubmit}>  {/* form starts here */}
            
        <div className="field">

          <label htmlFor="logInName">Username</label>

          <div className="ui left icon input">

          {/* input name starts here */}
            <input
             type="text"
              placeholder="Username"
              name="logInName"
              id="logInName"

              value={userLogin.logInName}
              onChange={onChange}
              /> 
            
            <i className="user icon"></i>
          </div>
        </div>
        <div className="field">

          <label htmlFor="logInPassword" >Password</label>

          <div className="ui left icon input">

            {/* input password starts here */}
            <input
             type="password"
             name="logInPassword"
             id="logInPassword"
             
             value={userLogin.logInPassword}
             onChange={onChange}
             />

            <i className="lock icon"></i>
          </div>
        </div>
        <button className="positive ui button" type="submit">&nbsp;Login&nbsp;</button>
        
        </form>
      </div>
    </div>
    
    <div className="middle aligned column">
    <Link to="/Register">
      <div className="ui big button">
        <i className="signup icon"></i>
        Sign Up
      </div>
      </Link>
    </div>
  </div>
  <div className="ui vertical divider">
    Or


  </div>
</div>
</div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps, { logInAction })(LogIn);


 
// this is the old form code,  delete it when your done
{/* <form onSubmit={onSubmit}>
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
</form> */} 
