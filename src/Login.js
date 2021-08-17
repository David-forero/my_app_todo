import React from "react";
import './Login.css';
import facebook from "./images/facebook.png"
import twitter from "./images/twitter.png"
import linkedin from "./images/linkedin.png"
import instagram from "./images/instagram.png"
import { useFormik } from "formik";
import * as Yup from "yup";
import Signup from './components/auth/Signup';
import firebase from './firebase';
import {useHistory} from 'react-router-dom';

const Login = () => {
    // Formulario y validación con formik y Yup
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
      try {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        history.push('/dashboard');
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="body">
        <div className="cont">
      <form method="POST" onSubmit={formik.handleSubmit} className="form sign-in">
        <h2 className="h2" >Sign In</h2>
        <label className="label">
          <span>Email Address</span>
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
        <button className="submit" type="submit">
          Sign In
        </button>
        <p className="forgot-pass">Forgot Password ?</p>
        <div className="social-media">
          <ul>
            <li>
              <img src={facebook} />
            </li>
            <li>
              <img src={twitter} />
            </li>
            <li>
              <img src={linkedin} />
            </li>
            <li>
              <img src={instagram} />
            </li>
          </ul>
        </div>
      </form>
      <div className="sub-cont">
        <div className="img">
          <div className="img-text m-up">
            <h2 className="h2" >New here?</h2>
            <p>Sign up and discover great amount of new opportunities!</p>
          </div>
          <div className="img-text m-in">
            <h2 className="h2" >One of us?</h2>
            <p>
              If you already has an account, just sign in. We've missed you!
            </p>
          </div>
          <div className="img-btn">
            <span className="m-up">Sign Up</span>
            <span className="m-in">Sign In</span>
          </div>
        </div>
        <Signup/>
      </div>
    </div>
    </div>
  );
};

export default Login;
