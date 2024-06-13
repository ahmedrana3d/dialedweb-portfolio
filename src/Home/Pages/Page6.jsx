import React, { useState } from "react";
import Section from "./Section";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import AnimatedCounter from "./AnimatedNum";

function Page6() {
 
  return (
    <Section>
      <div className="section6 flex flex-col justify-end items-center text-start lg:h-[250px] h-[190px] text-white fontHorizon opacity-0 ">
        <h1 className="animate-levitate headline-orange text-start lg:w-[500px] text-6xl lg:text-8xl glow3d   ">
          90%
        </h1>
        <h3 className="animate-levitate text-xs lg:text-2xl text-center text-wrap lg:w-[1000px] pt-5 pb-3">
          of users cite poor design as a primary reason for not trusting a
          website
        </h3>
      </div>
    </Section>
  );
}

export default Page6;
