import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { MdOutlineImageSearch } from "react-icons/md";

import { logout } from "../../redux/auth/action";
import { resetUserData } from "../../redux/user/action";

import logo from "../../assets/icons/logo.png";
import "./style/navbar.scss";

function Navbar() {
  let history = useHistory();
  let dispatch = useDispatch();

  const [loged, setLoged] = useState(null);
  const { loading, accessToken, signOutSuccess, authObserverSuccess, user } =
    useSelector((state) => state.auth);

  const userStorage = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    setLoged(false);
    dispatch(logout());
    dispatch(resetUserData());
    window.location.href = "/";
  };

  const handleSingIn = () => {
    history.push("/login");
  };

  useEffect(() => {
    if (userStorage) {
      setLoged(true);
    }
  }, []);

  return (
    <>
      <div className="nav-container">
        <section className="logo-icon">
          <img src={logo} alt="" className="logo-image" />
        </section>
        <section className="search-bar">
          <MdOutlineImageSearch className="search-icon" />
          <form className="search-form">
            <input
              type="text"
              className="input-search"
              placeholder="Busca tu meme favorito"
            />
          </form>
        </section>
        <section className="logout-button-container">
          {loged ? (
            <button className="logout-button" onClick={() => handleLogout()}>
              Log Out
            </button>
          ) : (
            <button
              className="logout-button-sing"
              onClick={() => handleSingIn()}
            >
              Sing In
            </button>
          )}
        </section>
      </div>
    </>
  );
}

export default Navbar;
