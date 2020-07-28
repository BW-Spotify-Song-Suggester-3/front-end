import React, {useState} from "react"
import { Link } from "react-router-dom"


const LogInUserNames = {name: "user", password: "user123" }

 const loginInitailValue = {
    logInName: "",
   logInPassword: ""
 }

 const initialDisabled = true



export default function LogIn () {

    

    const [userLogin, setUserLogin] = useState(loginInitailValue)
    const [disabled, setDisabled] = useState(initialDisabled)
    

    const validation = () => {
        if ( (userLogin.logInName === LogInUserNames.name) &&  (userLogin.logInPassword === LogInUserNames.password )) {
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
        // console.log("hiiii")
    } 

    
  
    return(



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
        <button className="positive ui button">&nbsp;Login&nbsp;</button>
        
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
    )
}