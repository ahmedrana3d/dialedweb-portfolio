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
      <div className="section5 flex flex-col justify-end items-center text-start h-[350px] text-white opacity-0 font-Helvetic">
        <h1 className="percentage glow3d lg:w-[500px] text-8xl lg:text-8xl text-green-400  ">
          {play ? <AnimatedCounter from={0} to={99} /> : null}%
        </h1>
        <h3 className="text-2xl lg:text-4xl text-center">
          Increase in Conversions after implementing{" "}
          <span className="text-green-400 glow3d">3D</span>{" "}
        </h3>
      </div>
    </Section>
  );
}
