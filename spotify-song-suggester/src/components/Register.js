import React from "react"
import { Link } from "react-router-dom"


export default function Register ({values, update, submit, disabled, errors, inputChange}) {
    

    const onChange = (event) => {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? update(name, checked) : update(name, value)
        type === "checkbox" ? inputChange(name, checked) : inputChange(name, value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        submit()
    }

    return (
       <form onSubmit={onSubmit}>
           <label htmlFor="name">
               Username: 
               <input
                    type= "text"
                    name="name"
                    id="name"
                    placeholder="Enter Your UserName"
                    value={values.name}
                    onChange={onChange}
                />
           </label>

           <label htmlFor="email">
           Email:
               <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                value={values.email}
                onChange={onChange}
                />
           </label>

           <label htmlFor="password">
           Password:
               <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={values.password}
                    onChange={onChange}

                 />
           </label>
           <label htmlFor="conPassword">
           Confirm Your Password:
                <input
                    type="password"
                    name="conPassword"
                    id="conPassword"
                    placeholder="Confirm Your Password"
                    value={values.conPassword}
                    onChange={onChange}

                 />
           </label>

           <label htmlFor="terms">
           Do you agree to the terms and conditions?
               <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={values.terms}
                    onChange={onChange}

                />
           </label> 
           <Link to ="/Something"> <button disabled={disabled} >Sing Up</button></Link>

           <div className='errors'>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.conPassword}</div>
                <div>{errors.terms}</div>
           </div>
           
       </form>
    )
}