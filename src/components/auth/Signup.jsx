import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebase from '../../firebase';
import {useHistory} from 'react-router-dom';


const Signup = () => {
  const history = useHistory();

    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .email("El email no es válido")
            .required("El Email es Obligatorio"),
          password: Yup.string().required("El password no puede ir vacio"),
        }),
        onSubmit: (data) => {
        //   console.log("enviando...");
            try {
              firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
              history.push('/dashboard');
            } catch (error) {
              console.error(error);
            }
        },
      });

  return (
    <form method="POST" onSubmit={formik.handleSubmit} className="form sign-up">
      <h2 className="h2" >Sign Up</h2>
      <label className="label">
        <span>Email</span>
        <input 
          className="input"
            type="email" 
            name="email"
            value={formik.values.email}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur} 
         />
      </label>
      <label className="label">
        <span>Password</span>
        <input 
          className="input"
            type="password" 
            name="password" 
            value={formik.values.password}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur} 
          />
      </label>
      <button type="submit" className="submit">
        Sign Up Now
      </button>
    </form>
  );
};

export default Signup;
