import React, { useState, useEffect } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import * as yup from "yup";

import "./App.css";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import formSchema from "./validation/formSchema";
import Dashboard from "./components/Dashboard Components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { logInAction } from "./components/Actions/spotifyActions";

const formInitialValue = {
  name: "",
  email: "",
  password: "",
  conPassword: "",
  terms: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  conPassword: "",
  terms: "",
};

const usersInitialValue = [];
const initialDisabled = true;

function App(props) {
  const [form, setForm] = useState(formInitialValue);
  const [users, setUsers] = useState(usersInitialValue);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const history = useHistory();

  const formValueHandler = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const postUsers = (newUser) => {
    axios
      .post("https://tjs-songsuggest.herokuapp.com/createnewuser", newUser)
      .then((res) => {
        console.log("sign up response:", res);
        window.localStorage.setItem("access_token", res.data.access_token);
        setForm(formInitialValue);
        props.logInAction(newUser.username);
        history.push("/dashboard");
        setUsers([...users, res.data]);
      })
      .catch((err) => console.log("axios.post err", err));
  };

  const submit = () => {
    const newUser = {
      username: form.name.trim(),
      password: form.password.trim(),
      primaryemail: form.email.trim(),
    };
    //send this information to the function that post to axios
    postUsers(newUser);
  };

  // validation

  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      //we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    formSchema.isValid(form).then((valid) => {
      setDisabled(!valid);
    });
  }, [form]);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>

        <Route path="/Register">
          <Register
            update={formValueHandler}
            values={form}
            submit={submit}
            disabled={disabled}
            errors={formErrors}
            inputChange={inputChange}
          />
        </Route>

        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps, { logInAction })(App);
