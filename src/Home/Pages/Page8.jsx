import React, { useState } from "react";
import Section from "./Section";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import AnimatedCounter from "./AnimatedNum";

function Page8() {
  const snapshot = useSnapshot(state);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    let timeout;
    if (snapshot.step === 7) {
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
      <div className="section8 h-screen w-full  fontHorizon flex flex-col justify-between items-center text-white opacity-0">
        <div className="flex h-[300px]  items-end">
          <div className="text-center leftCon">
            <p className="text-2xl leftText">
              A well-designed user interface (UI) could boost website
              conversions by:
            </p>
            <p className="leftText text-7xl headline-orange">
              {play ? <AnimatedCounter from={0} to={200} /> : "0"}%
            </p>
          </div>
          <div className="text-center rightCon">
            <p className="rightText text-2xl">
              Better user experience (UX) design could lead to an increase of:
            </p>
            <p className="rightText text-7xl headline-orange">
              {play ? <AnimatedCounter from={0} to={400} /> : "0"}%
            </p>
          </div>
        </div>

        <div className=" h-[350px] text-center">
          <p className="text-8xl headline-orange bigAmount">
            {play ? <AnimatedCounter from={0} to={252000} /> : "0"}%
          </p>
          <p className="pt-3 text-2xl bigText">
            New sites are created every day - make yours stand out{" "}
          </p>
        </div>
      </div>
    </Section>
  );
}

export default Page8;
