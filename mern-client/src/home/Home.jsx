import React from "react";
import Banner from "../Components/Banner";
import FavBook from "./FavBook";
import PromoBanner from "./PromoBanner";
import Review from "./Review";

const Home = () => {
  return (
    <div>
      <Banner />
      <FavBook />
      <PromoBanner />
      <Review />
    </div>
  );
};

export default Home;
