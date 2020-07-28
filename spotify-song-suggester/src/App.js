<<<<<<< HEAD
import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Something from "./components/Something";
import Dashboard from "./components/Dashboard Components/Dashboard";
=======
import React, {useState, useEffect} from 'react';
import {Link, Route} from "react-router-dom"
import axios from "axios"
import * as yup from "yup"

import './App.css';
import LogIn from "./components/LogIn"
import Register from "./components/Register"
import Something from "./components/Something"
import formSchema from "./validation/formSchema"
>>>>>>> b52280dec145ab7962b2b86527053eb6c6c2d109

const formInitialValue = {
  name: "",
  email: "",
  password: "",
  conPassword: "",
  terms: false,
};

<<<<<<< HEAD
const usersInitialValue = [];
=======
const initialFormErrors ={
  name: "",
  email: "",
  password: "",
  conPassword: "",
  terms: ""
}

const usersInitialValue = []
const initialDisabled = true
>>>>>>> b52280dec145ab7962b2b86527053eb6c6c2d109

function App() {
  const [form, setForm] = useState(formInitialValue);
  const [users, setUsers] = useState(usersInitialValue);

  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const formValueHandler = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const postUsers = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setForm(formInitialValue);
        setUsers([...users, res.data]);
      })
      .catch(() => console.log("axios.post err"));
  };

  const submit = () => {
    const newUser = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      terms: form.terms,
    };
    //send this information to the function that post to axios
<<<<<<< HEAD
    postUsers(newUser);
  };
=======
    postUsers(newUser)
  }


  // validation

  const inputChange = (name, value) => {
    
    yup
      .reach(formSchema, name)
      //we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setForm({
      ...form,
      [name]: value 
    })
  }
  
  useEffect(() => {
    
    formSchema.isValid(form).then(valid => {
      setDisabled(!valid)
    })
  }, [form])

>>>>>>> b52280dec145ab7962b2b86527053eb6c6c2d109

  return (
    <div>
      <Route exact path="/">
        Don't have an Acount?
        <Link to="/Register">Register</Link>
        <LogIn />
      </Route>

      <Route path="/Register">
<<<<<<< HEAD
        ALready have an Acout?
        <Link to="/">Login</Link>
        <Register update={formValueHandler} values={form} submit={submit} />
=======
      ALready have an Acout?
      <Link to="/">Login</Link>
        <Register 
          update={formValueHandler}
          values={form}
          submit={submit}
          disabled={disabled}
          errors={formErrors}
          inputChange={inputChange}
         />
>>>>>>> b52280dec145ab7962b2b86527053eb6c6c2d109
      </Route>

      <Link to="/dashboard">Dashboard</Link>

      <Route path="/Something">
        <Something />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </div>
  );
}

export default App;
