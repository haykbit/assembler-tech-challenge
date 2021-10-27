import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { css } from "@emotion/react";
import { saveAs } from "file-saver";
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { dispatchMemesData } from "../../redux/meme/action";

import fondoHeader from "../../assets/images/fondo-header.png";
import loginMeme from "../../assets/images/login-meme.png";
import "./style/itemsgrid.scss";

function ItemsGrid() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [apiMemes, setApiMemes] = useState(null);
  const [userMemes, setUserMemes] = useState(null);

  const [copy, setCopy] = useState(false);
  const [loged, setLoged] = useState(null);
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(false);
  const notify = () => toast.dark("Link copied!📋");

  const userStorage = JSON.parse(localStorage.getItem("user"));

  const { user, loading, authObserverSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await dispatch(dispatchMemesData());
    setApiMemes(res.meme.data.data.memes);
  }

  useEffect(() => {
    if (userStorage) {
      setLoged(true);
    }
  }, [loading, loged]);

  const downloadImage = (url, name) => {
    saveAs(url, name);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    notify();
    setCopy(true);
  };

  const handleMemesPage = () => {
    setShow(!hide);
  };

  const handleExplorePage = () => {
    setShow(hide);
  };

  const override = css`
    margin-top: 100px;
  `;

  const handleSingIn = () => {
    history.push("/login");
  };

  const handleRegister = () => {
    history.push("/register");
  };
  return (
    <div className="items-container">
      <section
        className="header"
        style={{
          backgroundImage: `url(${fondoHeader})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="filter-header">
          {show ? <h1>All memes</h1> : <h1>Explore creator memes</h1>}
        </div>
      </section>
      <div className="filters-container">
        <label className="memespop">
          Memes pop
          <input type="checkbox" onClick={() => handleMemesPage()} />
          <span className="checkmark"></span>
        </label>

        <label className="explore">
          Explore
          <input type="checkbox" onClick={() => handleExplorePage()} />
          <span className="checkmark"></span>
        </label>
      </div>

      <section className="list-grid">
        {show ? (
          apiMemes ? (
            apiMemes.map((item, index) => {
              return (
                <>
                  <div className="item" key={index}>
                    <img
                      src={item.url}
                      alt=""
                      onClick={() => handleCopy(item.url)}
                    />
                  </div>
                </>
              );
            })
          ) : (
            <MoonLoader
              size="25px"
              color="#000"
              margin="100px"
              css={override}
            />
          )
        ) : loged ? (
          <div>
            <h1>🎈 Add some meme!</h1>
          </div>
        ) : (
          <div className="explore-container">
            <h1 style={{ width: "100%", textAlign: "center" }}>
              🚧 Restricted area
            </h1>
            <div className="explore-buttons">
              <button
                onClick={() => handleSingIn()}
                className="explore-login"
                style={{ marginRight: "20px" }}
              >
                Login
              </button>
              <h2 style={{ margin: "0" }}>Or</h2>
              <button
                onClick={() => handleRegister()}
                className="explore-register"
                style={{ marginLeft: "20px" }}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ItemsGrid;
