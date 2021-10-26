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
import "./style/itemsgrid.scss";

function ItemsGrid() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [apiMemes, setApiMemes] = useState(null);
  const [userMemes, setUserMemes] = useState(null);

  const [copy, setCopy] = useState(false);
  const [loged, setLoged] = useState(null);
  const [pageResult, setPageResult] = useState(true);
  const notify = () => toast.dark("Link copied!📋");

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
    if (!loading && authObserverSuccess) {
      setLoged(true);
      console.log(true);
    }
  }, [loading]);

  const downloadImage = (url, name) => {
    saveAs(url, name);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    notify();
    setCopy(true);
  };

  const handleCheck = () => {
    setPageResult(!pageResult);
  };

  const override = css`
    margin-top: 100px;
  `;

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
          <h1>All memes</h1>{" "}
        </div>
      </section>
      <div className="filters-container">
        <label className="memespop">
          Memes pop
          <input type="checkbox" onClick={() => handleCheck()} />
          <span className="checkmark"></span>
        </label>

        <label className="explore">
          Explore
          <input type="checkbox" onClick={() => handleCheck()} />
          <span className="checkmark"></span>
        </label>
      </div>

      <section className="list-grid">
        {pageResult ? (
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
        ) : apiMemes ? (
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
          <MoonLoader size="25px" color="#000" margin="100px" css={override} />
        )}
      </section>
    </div>
  );
}

export default ItemsGrid;
