import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { registerWithEmailAndPassword } from "../../redux/auth/action";

import image from "../../assets/images/shibadog.jpeg";
import google from "../../assets/icons/google.png";
import fondo from "../../assets/images/fondo.png";

import "./style/registercomponent.scss";

function RegisterComponent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    name: "",
    last: "",
  });
  const { email, password, name, surname } = registerForm;
  const registerState = useSelector((state) => state.auth.registerSuccess);

  const handleChange = (event) => {
    event.preventDefault();
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(
      registerWithEmailAndPassword(email, password, {
        firstName: name,
        lastName: surname,
      })
    );
  };

  useEffect(() => {
    if (registerState) {
      history.push("/login");
    }
  }, [registerState, history]);

  return (
    <div
      className="register-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="register-form-container">
        <h2>Welcome! Register to find the funniest memes 🤪</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            placeholder="Name"
            value={name}
            name="name"
            onChange={handleChange}
          />
          <input
            placeholder="Last Name"
            value={surname}
            name="lastname"
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          />
          <div className="register-center">
            <button className="register-btn" type="submit">
              Register
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default RegisterComponent;
