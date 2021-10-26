import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";

import { login, loginWithEmailAndPassword } from "../../redux/auth/action";

import image from "../../assets/images/shibadog.jpeg";
import google from "../../assets/icons/google.png";
import fondo from "../../assets/images/fondo.png";

import "./style/logincomponent.scss";

function LoginComponent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const { email, password } = loginForm;

  const { user, loading, authObserverSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!loading && authObserverSuccess) {
      history.push("/");
    }
  }, [loading]);

  const handleChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const handleLoginWithGoogle = async () => {
    dispatch(login());
  };

  const handleLoginWithEmailAndPassword = (event) => {
    event.preventDefault();
    dispatch(loginWithEmailAndPassword(email, password));
  };

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
        <form className="login-form" onSubmit={handleLoginWithEmailAndPassword}>
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
            <button className="login-btn" type="submit">
              Login
            </button>
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
