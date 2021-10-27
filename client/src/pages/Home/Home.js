import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ItemsGrid from "../../components/ItemsGrid/ItemsGrid";
import Navbar from "../../components/Navbar/Navbar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiAddCircleFill } from "react-icons/ri";
import { BiCloudUpload } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import { uploadMemeFile } from "../../redux/meme/action";

import google from "../../assets/icons/google.png";

import "./style/home.scss";

function Home() {
  let history = useHistory();
  let dispatch = useDispatch();

  const [loged, setLoged] = useState(null);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [memeImage, setMemeImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [image, setImage] = useState("");

  const userStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (userStorage) {
      setLoged(true);
    }
  }, []);

  function uploadMeme(meme, title) {
    dispatch(uploadMemeFile(meme, title));
    setShow(!show);
  }

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      setImage(e.target.files[0]);
      reader.onload = function (e) {
        setMemeImage(e.target.result);
        setIsUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleShow = () => {
    setShow(!show);
  };

  const handleTitle = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  return (
    <>
      <Navbar />
      <ItemsGrid />
      {loged ? (
        <>
          <div className="upload-container">
            <form className="select-image" onSubmit={uploadMeme}>
              <div
                className="input-title"
                style={{
                  display: `${show ? "flex" : "none"}`,
                  zIndex: `${show ? "1" : "0"}`,
                }}
              >
                <div className="close-icon-container">
                  <RiCloseCircleLine
                    className="close-icon"
                    style={{
                      display: `${show ? "flex" : "none"}`,
                    }}
                    onClick={handleShow}
                  />
                </div>
                <h3 style={{ margin: "0px 0px 5px 0px" }}>Meme title</h3>
                <input
                  id="title-input"
                  type="text"
                  value={title}
                  onChange={handleTitle}
                  placeholder="Dance party"
                />
                <div className="upload-section">
                  <img
                    src={memeImage ? memeImage : null}
                    alt=""
                    className="prev-image"
                    onClick={() =>
                      memeImage ? uploadMeme(memeImage, title) : null
                    }
                  />
                </div>
              </div>
              <label
                htmlFor="upload-input"
                className="upload-button"
                style={{ zIndex: `${show ? "0" : "1"}` }}
              >
                <RiAddCircleFill className="upload-icon" onClick={handleShow} />
              </label>

              <input
                id="upload-input"
                className="input-upload"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              />
            </form>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Home;
