import React from "react";
import Aboutme from "../Components/Aboutme/Aboutme";
import Mystacks from "../Components/Mystacks/Mystacks";

const About = () => {
  return (
    <section className="bg-black text-white  h-[100%]">
      <Aboutme/>
      <Mystacks/>
    </section>
  );
};

export default About;
