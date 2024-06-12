import React, { useEffect, useState } from "react";
import Section from "./Section";
import AnimatedCounter from "./AnimatedNum";
import { useSnapshot } from "valtio";
import state from "../../state/state";

export default function Page5() {
  const snapshot = useSnapshot(state);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    let timeout;
    if (snapshot.step === 4) {
      timeout = setTimeout(() => {
        setPlay(true);
      }, 4000);
    } else {
      setPlay(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [snapshot.step]);
  return (
    <Section>
      <div className="section5 flex flex-col justify-end items-center text-start h-[350px] xl:my-6 text-white opacity-0 fontHorizon animate-levitate">
        <h1 className=" headline-orange lg:w-[500px] text-6xl lg:text-8xl glow3d   ">
          {play ? <AnimatedCounter from={0} to={94} /> : "0"}%
        </h1>
        <h3 className="text-1xl lg:text-4xl text-center">
          Increase in Conversions after implementing{" "}
          <span className="headline-orange glow3d">3D</span>{" "}
        </h3>
      </div>
    </Section>
  );
}
