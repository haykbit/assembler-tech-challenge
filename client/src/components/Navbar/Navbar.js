import { useEffect, useState } from "react";

import { MdOutlineImageSearch } from "react-icons/md";
import logo from "../../assets/icons/logo.png";
import "./style/navbar.scss";

function Navbar() {
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
      </div>
    </>
  );
}

export default Navbar;
