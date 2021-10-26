import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ItemsGrid from "../../components/ItemsGrid/ItemsGrid";
import Navbar from "../../components/Navbar/Navbar";
import { IoIosAddCircleOutline } from "react-icons/io";

import "./style/home.scss";

function Home() {
  let history = useHistory();
  const [loged, setLoged] = useState(null);

  const { user, loading, authObserverSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!loading && authObserverSuccess) {
      setLoged(true);
    }
  }, [loading]);

  return (
    <>
      <Navbar />
      <ItemsGrid />
      {loged ? (
        <div className="upload-container">
          <button className="upload-button"></button>
        </div>
      ) : null}
    </>
  );
}

export default Home;
