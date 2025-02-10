import React from "react";
import { Helmet } from 'react-helmet';
import FirstSection from "../components/HomePage/FirstSection";
import SecondSection from "../components/HomePage/SecondSection";
import ThirdSection from "../components/HomePage/ThirdSection";
import FourthSection from "../components/HomePage/FourthSection";

export default function HomePage() {
  return (
    <div>
      <Helmet>
        <title>Home Page - plantPeace</title>
      </Helmet>
      <FirstSection/>
      <SecondSection/>
      <ThirdSection/>
      <FourthSection/>
    </div>
  );
}