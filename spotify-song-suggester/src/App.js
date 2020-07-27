import React, {useState} from 'react';
import {Link, Route} from "react-router-dom"
import axios from "axios"

import './App.css';
import LogIn from "./components/LogIn"
import Register from "./components/Register"
import Something from "./components/Something"

const formInitialValue = {
  name: "",
  email: "",
  password: "",
  conPassword: "",
  terms: false
}


const usersInitialValue = []

function App() {
  const [form, setForm] = useState(formInitialValue)
  const [ users, setUsers] = useState(usersInitialValue)

  const formValueHandler = (name, value) => {
    setForm({...form, [name]: value})
  }



  const postUsers = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(res=>{
      setForm(formInitialValue)
      setUsers([...users, res.data])
      
    })
    .catch(()=> console.log('axios.post err'))
  }
  

  const submit = () => {
    const newUser ={
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      terms: form.terms
    }
    //send this information to the function that post to axios
    postUsers(newUser)
  }
  
  return (
    <div>
      <Route exact path="/">
      Don't have an Acount?
      <Link to="/Register">Register</Link>
        <LogIn />
      </Route>

      <Route path="/Register">
      ALready have an Acout?
      <Link to="/">Login</Link>
        <Register 
          update={formValueHandler}
          values={form}
          submit={submit}
         />
      </Route>


      <Route path="/Something">
          <Something />
      </Route>
    </div>
  );
}

export default App;
