import React, { useEffect, useRef, useState } from "react";
import Section from "./Section";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import gsap from "gsap";
import SplitType from "split-type";

export default function Page5() {
  const snapshot = useSnapshot(state);

  const page5Text1 = useRef();
  const page5Text2 = useRef();

  const Section5In = () => {
    const tl = gsap.timeline();

    tl.to(".section4", {
      opacity: 0,
      duration: 1,
    });

    tl.to(".section5", {
      opacity: 1,
      duration: 1,
    });

    tl.from(".text5", {
      y: 200,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.3,
    });
  };
  const Section5Out = () => {
    const tl = gsap.timeline();

    tl.to(".section5", {
      opacity: 0,
      duration: 1,
    });
    tl.to(".section4", {
      opacity: 1,
      duration: 1,
    });
  };

  useEffect(() => {
    if (snapshot.step === 5 && !snapshot.reverse) {
      Section5In();
      console.log("Section5In");
    }
    if (snapshot.step === 4 && snapshot.reverse) {
      Section5Out();
      console.log("Section5Out");
    }

    if (snapshot.step === 5 && snapshot.reverse) {
      Section5In();
      console.log("Section6Out");
    }
  }, [snapshot.step, snapshot.reverse]);

  return (
    <Section>
      <div className="section5 flex flex-col justify-end lg:justify-center lg:ml-12 lg:pb-52 items-center lg:items-start text-center lg:text-start h-[400px] lg:h-full lg:w-[90vh] text-white fontHorizon opacity-0  ">
        <div className="overflow-hidden">
          <div className=" ">
          
          <h1
            ref={page5Text1}
            className="text-[#AAA3FF] text-start text5 text-6xl lg:text-9xl glow3d  "
          >
            89%
          </h1>
            </div>
        </div>
        <div className="overflow-hidden">
          <h3
            ref={page5Text2}
            className="text5 text-1xl lg:text-2xl text-center lg:text-start pt-6 lg:p-0 "
          >
            of consumers turn to a competitor after a poor user experience
          </h3>
        </div>
      </div>
    </Section>
  );
}
