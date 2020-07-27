import React, {useState} from "react"
import { Link } from "react-router-dom"

const LogInUserNames = {name: "user", email: "user@gmail.com", password: "user123" }

 const LoginInitailValue = {
    LogInName: "",
    LogInEmail: "",
    LogInPassword: ""
 }

 const initialDisabled = true



export default function LogIn () {

    

    const [userLogin, setUserLogin] = useState(LoginInitailValue)
    const [disabled, setDisabled] = useState(initialDisabled)


    const validation = () => {
        if ( (userLogin.LogInName === LogInUserNames.name) && (userLogin.LogInEmail === LogInUserNames.email) && (userLogin.LogInPassword === LogInUserNames.password )) {
            setDisabled(false)
        }
    }

   

    const onChange = (event) => {
        const {name, value} = event.target
        setUserLogin({...userLogin, [name]: value})
        validation()
    }

  

    const onSubmit = (event) => {
        event.preventDefault()
    } 

    
  
    return(
        <form onSubmit={onSubmit} >
           <label htmlFor="LogInName">
               Username: 
               <input
                    type= "text"
                    name="LogInName"
                    id="LogInName"
                    placeholder="Enter Your UserName"
                    value={userLogin.LogInName}
                    onChange={onChange}
                />
           </label>

           <label htmlFor="LogInEmail">
           Email:
               <input
                type="email"
                name="LogInEmail"
                id="LogInEmail"
                placeholder="Enter Your Email"
                value={userLogin.LogInEmail}
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
           

           <Link to ="/Something"> <button disabled={disabled} >LogIn</button></Link>
           
       </form>
    )
}