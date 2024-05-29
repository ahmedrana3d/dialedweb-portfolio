import React from "react";
import Section from "./Section";

const Page2 = ({ sec2 }) => {
  return (
    <Section>
      <div
        ref={sec2}
        className="section2 fontHorizon z-[2] lg:text-7xl text-2xl flex flex-col items-center justify-center pt-20 text-white leading-tight font-bold uppercase opacity-0 "
      >
        <p className="">delve into the</p>
        <p className="text-3xl lg:text-9xl headline-orange">FUTURE</p>
      </div>
    </Section>
  );
};

export default Page2;
