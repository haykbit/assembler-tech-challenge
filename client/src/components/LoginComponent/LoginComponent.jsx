import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/shibadog.jpeg";
import google from "../../assets/icons/google.png";
import fondo from "../../assets/images/fondo.png";

import "./style/logincomponent.scss";

function LoginComponent() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const { email, password } = loginForm;

  const handleChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const handleLoginWithGoogle = async () => {};

  const handleLoginWithEmailAndPassword = (event) => {};

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="login-form-container">
        <form className="login-form">
          <h2>Hello! 👋</h2>
          <input
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <div className="button-center">
            <button className="login-btn">Login</button>
          </div>
        </form>

        <h3>Or</h3>
        <div className="buttons-container">
          <button className="login-gl-btn" onClick={handleLoginWithGoogle}>
            <img src={google} alt="" className="google-image" />
            Login with Google
          </button>
          <Link to="/register" className="registerLink">
            <button className="register-btn">
              {/* <img src={gmail} alt="" /> */}
              Register
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LoginComponent;
