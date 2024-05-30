import React from "react";
import Section from "./Section";

export default function Page1() {
  return (
    <Section>
      <div className="section1 z-[1] absolute bottom-0 left-0  w-full   flex flex-col gap-10 items-center justify-center pb-32 overflow-hidden">
        <h1 className="lg:text-3xl text-xl flex lg:gap-3 gap-2 font-mono font-semibold text-[#8C52FF] cursor-pointer ">
          <div className="anim  h-auto">
            <span className="neonText anim main__scroll-text text-3xl ">
              start
            </span>
          </div>

          <div className="anim  h-auto">
            <span className="neonText anim main__scroll-text text-3xl    ">
              scrolling
            </span>
          </div>
        </h1>

        <h1 className="lg:text-6xl text-1xl flex lg:gap-3 gap-2 font-mono font-semibold text-white cursor-pointer ">
          <div className="anim">
            <span className="anim test ">BEGIN</span>
          </div>
          <div className="anim">
            <span className="anim test">YOUR</span>
          </div>
          <div className="anim">
            <span className="anim test headline-dark fontHorizon">
              EXPERINCE
            </span>
          </div>
        </h1>
        <div className="mouse opacity-0"></div>
      </div>
    </Section>
  );
}