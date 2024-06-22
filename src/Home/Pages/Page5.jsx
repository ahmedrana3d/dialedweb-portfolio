import React, { useEffect, useState } from "react";
import Section from "./Section";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import gsap from "gsap";
import SplitType from "split-type";

export default function Page5() {
  const snapshot = useSnapshot(state);

  const text = new SplitType(".target", { types: "chars" });
  const chars = text.chars;

  chars.forEach((char) => {
    char.style.display = "inline-block";
  });

  const Section5In = () => {
    const tl = gsap.timeline();
    tl.staggerTo(
      ".text4",
      0.5,
      { scale: 8, alpha: 0, ease: "SlowMo.ease.config(0.1, 0.1, false)" },
    )
      .to(".section4", { opacity: 0, duration: 1 })
      .to(".section5", { opacity: 1, duration: 1 })
      .from(chars, {
        y: 200,
        rotation: 10,
        duration: 1,
        stagger: 0.1,
        ease: "power3.inOut",
      });

    return tl;
  };

  const Section5Out = () => {
    const tl = gsap.timeline();
    tl
    .to(".section5", { opacity: 0, duration: 1 })
    .to(".section4", {
      opacity: 1,
      duration: 1,
    });

    return tl;
  };

  useEffect(() => {
    if (snapshot.step === 4 && !snapshot.reverse) {
      Section5In();
      console.log("Section5In");
    }
    if (snapshot.step === 3 && snapshot.reverse) {
      Section5Out();
      console.log("Section5Out");
    }
  }, [snapshot.step, snapshot.reverse]);

  return (
    <Section>
      <div className="section5 flex flex-col justify-end items-start  text-start h-[450px] ml-9 lg:ml-0 text-white opacity-0  animate-levitate ">
        <div className="overflow-hidden">
        <h1 className="target  font-horizon  lg:pl-96 text-6xl lg:text-9xl glow3d    ">
          94%
        </h1>
        <h3 className="target text-1xl lg:text-4xl font-Helvetic  lg:pl-96 ">
          Increase in Conversions after implementing{" "}
          <span className="target  glow3d">3D</span>{" "}
        </h3>
        </div>
      </div>
    </Section>
  );
}
