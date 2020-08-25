import React from "react"
import { Link } from "react-router-dom"
import { Spring } from 'react-spring/renderprops'

export default function Register({
  values,
  update,
  submit,
  disabled,
  errors,
  inputChange,
}) {
  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    type === "checkbox" ? update(name, checked) : update(name, value);
    type === "checkbox" ? inputChange(name, checked) : inputChange(name, value);
  };

  const onSubmit = (event) => {
    console.log("submit reached");
    event.preventDefault();
    submit();
  };

  return (

    <Spring
     config={{mass:3, tension:300, friction:30}}
      from={{ opacity: 0, marginRight: 2000}}
      to={{ opacity: 1, marginRight: 0  }}
    >
      {props => (
        <div style={props}>
        <div className="margin2">
      <div className="ui placeholder segment bigBox">
        <div className="flexBox">
          <div className="formStyle">
            <form onSubmit={onSubmit}>
              <label htmlFor="name">
                <div className="labelName"> Username </div>
                <div className="ui input">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your UserName"
                    value={values.name}
                    onChange={onChange}
                  />
                </div>
              </label>
              <br />
              <label htmlFor="email">
                <div className="labelName">Email</div>
                <div className="ui input">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={values.email}
                    onChange={onChange}
                  />
                </div>
              </label>
              <br />
              <label htmlFor="password">
                <div className="labelName">Password</div>

                <div className="ui input">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={values.password}
                    onChange={onChange}
                  />
                </div>
              </label>
              <br />
              <label htmlFor="conPassword">
                <div className="labelName">Confirm Your Password</div>

                <div className="ui input">
                  <input
                    type="password"
                    name="conPassword"
                    id="conPassword"
                    placeholder="Confirm Your Password"
                    value={values.conPassword}
                    onChange={onChange}
                  />
                </div>
              </label>
              <br />
              <div className="labelName">
                <label htmlFor="terms">
                  <span className="termsLabel">
                    Do you agree to the terms and conditions?&nbsp;&nbsp;
                  </span>

                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={values.terms}
                    onChange={onChange}
                  />
                </label>
              </div>
              <br />
              {/* <Link to="/dashboard"> */}{" "}
              <button className="green" type="submit">
                Sign Up
              </button>
              {/* </Link> */}
              <div className="errors">
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>

                <div>
                  {values.conPassword === values.password
                    ? (errors.conPassword = "")
                    : errors.conPassword}
                </div>
                <div>{errors.terms}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
      Already have an Account?&nbsp;&nbsp;
      <Link to="/">Login</Link>
    </div>

        </div>
          
      )}
    </Spring>


    
  );
}
