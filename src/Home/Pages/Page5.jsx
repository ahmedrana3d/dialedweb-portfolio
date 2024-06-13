import React, { useEffect, useState } from "react";
import Section from "./Section";
import AnimatedCounter from "./AnimatedNum";
import { useSnapshot } from "valtio";
import state from "../../state/state";

export default function Page5() {
 
  return (
    <Section>
      <div className="section5 flex flex-col justify-end items-start  text-start h-[450px] ml-9 lg:ml-0 text-white opacity-0  animate-levitate ">
        <h1 className="headline-orange font-horizon  lg:pl-96 text-6xl lg:text-9xl glow3d    ">
          94%
        </h1>
        <h3 className=" text-1xl lg:text-4xl font-Helvetic  lg:pl-96 ">
          Increase in Conversions after implementing{" "}
          <span className="headline-orange glow3d">3D</span>{" "}
        </h3>
      </div>
    </Section>
  );
}
