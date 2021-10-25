import React, { useState, useEffect } from "react";
import ItemsGrid from "../../components/ItemsGrid/ItemsGrid";
import Navbar from "../../components/Navbar/Navbar";

import "./style/home.scss";

function Home() {
  return (
    <>
      <Navbar />
      <ItemsGrid />
    </>
  );
}

export default Home;
