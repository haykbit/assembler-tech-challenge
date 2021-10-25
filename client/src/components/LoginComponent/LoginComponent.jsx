import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/shibadog.jpeg";
import "./style/logincomponent.scss";

function LoginComponent() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [recoverPass, setRecoverPass] = useState({ recover: false });
  const { email, password } = loginForm;

  const handleChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const handleLoginWithGoogle = async () => {};

  const handleLoginWithEmailAndPassword = (event) => {
    event.preventDefault();
  };

  const handleRecover = (event) => {
    setRecoverPass({ recover: true });
  };

  const recoverOff = () => {
    setRecoverPass({ recover: false });
  };
  return (
    <div className="login-container">
      <section className="login-form-container">
        <form className="login-form">
          <h2>Login</h2>
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
          <button className="login-btn">Login</button>
        </form>

        <h3>Or</h3>
        <button className="login-gl-btn" onClick={handleLoginWithGoogle}>
          {/* <img src={google} alt="" /> */}
          Login with Google
        </button>
        <Link to="/register" className="registerLink">
          <button className="register-btn">
            {/* <img src={gmail} alt="" /> */}
            Register
          </button>
        </Link>
      </section>
    </div>
  );
}

export default LoginComponent;
