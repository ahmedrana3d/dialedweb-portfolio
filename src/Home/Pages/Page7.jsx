import React, { useState } from "react";
import Section from "./Section";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import AnimatedCounter from "./AnimatedNum";

function Page7() {
  const snapshot = useSnapshot(state);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    let timeout;
    if (snapshot.step === 6) {
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
      <div className="section7 flex flex-col justify-end lg:justify-center items-center text-start h-[400px] lg:h-full lg:w-[90vh] text-white fontHorizon opacity-0  ">
        <h1 className="animate-levitate headline-orange text-start lg:w-[500px] text-6xl lg:text-8xl glow3d   ">
          {play ? <AnimatedCounter from={0} to={89} /> : "0"}%
        </h1>
        <h3 className="animate-levitate text-1xl lg:text-2xl text-center pt-6 lg:p-0 ">
          of consumers turn to a competitor after a poor user experience
        </h3>
      </div>
    </Section>
  );
}

export default Page7;
