import * as yup from "yup"

const  formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be valid")
      .required("Email is required"),
      
      name: yup
      .string()
      .min(5, "Username must be at least 5 characters")
      .required("Username is Required"),
    
      password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is Required"),

      
      conPassword: yup
       .string()
       .required('This field is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),

      terms: yup
      .boolean()
      .oneOf([true], "You must accept Terms and Conditions")
  })

  export default formSchema
  