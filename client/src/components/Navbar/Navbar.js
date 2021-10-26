import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { MdOutlineImageSearch } from "react-icons/md";
import logo from "../../assets/icons/logo.png";
import "./style/navbar.scss";

function Navbar() {
  let history = useHistory();
  const [loged, setLoged] = useState(false);

  const handleLogOut = () => {
    history.push("/login");
  };

  const handleSingIn = () => {
    history.push("/register");
  };
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
            <button className="logout-button" onClick={() => handleLogOut()}>
              Log Out
            </button>
          ) : (
            <button
              className="logout-button-sing"
              onClick={() => handleLogOut()}
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
