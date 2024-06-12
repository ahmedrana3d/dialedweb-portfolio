import React, { useState } from "react";
import Section from "./Section";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import AnimatedCounter from "./AnimatedNum";

function Page6() {
  const snapshot = useSnapshot(state);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    let timeout;
    if (snapshot.step === 5) {
      timeout = setTimeout(() => {
        setPlay(true);
      }, 2000);
    } else {
      setPlay(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [snapshot.step]);
  return (
    <Section>
      <div className="section6 flex flex-col justify-end items-center text-start lg:h-[250px] h-[190px] text-white fontHorizon opacity-0 ">
        <h1 className="animate-levitate headline-orange text-start lg:w-[500px] text-6xl lg:text-8xl glow3d   ">
          {play ? <AnimatedCounter from={0} to={90} /> : "0"}%
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
