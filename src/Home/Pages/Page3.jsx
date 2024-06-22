import React, { useEffect, useRef, useState } from "react";
import Section from "./Section";
import { gsap } from "gsap";
import SplitType from "split-type";
import { useSnapshot } from "valtio";
import state from "../../state/state";

export default function Page3() {
  const snapshot = useSnapshot(state);
  const section3Ref = useRef(null);

  useEffect(() => {
    const splitText = (selector) => {
      const text = new SplitType(selector, { types: "chars" });
     
      return text.chars;
    };
    const chars = splitText(section3Ref.current.querySelectorAll(".target"));
    console.log(chars)
    const Section3In = () => {
      const tl = gsap.timeline({delay: 1,});
      setTimeout(() => {
        tl.to(".section2", { autoAlpha: 0, duration: 1 })
          .to(".section3", { autoAlpha: 1, duration: 1 })
          .from(chars, {
            y: 200,
            rotation: 10,
            duration: 1,
            stagger: 0.1,
            ease: "power3.inOut",
          });
      }, 2000); 

      return tl;
    };

    const Section3Out = () => {
      const chars = splitText(section3Ref.current.querySelectorAll('.target'));

      const tl = gsap.timeline();
      tl.to(chars, {
        y: -200,
        rotation: 10,
        duration: 1,
        stagger: 0.1,
        ease: "power3.inOut",
      })
        .to(".section3", { autoAlpha: 0, duration: 1 })
        .to(".section2", {
          autoAlpha: 1,
          duration: 1,
        });

      return tl;
    };

    const Section4In = () => {
      const tl = gsap.timeline();
      tl.staggerTo(chars, 0.7, {
        x: 50,
        alpha: 0,
        ease: "SlowMo.ease.config(0.1, 0.1, false)",
      })
        .to(".section3", { autoAlpha: 0, duration: 1 })
        .to(".section4", { autoAlpha: 1, duration: 0.1 })
        .staggerFrom(".text4", 0.7, {
          scale: 8,
          alpha: 0,
          ease: "SlowMo.ease.config(0.1, 0.1, false)",
        });

      return tl;
    };

    const Section4Out = () => {
      const tl = gsap.timeline();
      tl.to(".section4", { alpha: 0, ease: "Power1.easeOut", duration: 1 })
        .to(".section3", { autoAlpha: 1, duration: 1 })
        .staggerFrom(
          chars,
          0.4,
          { x: 50, alpha: 0, ease: "SlowMo.ease.config(0.1, 0.1, false)" },
          0.4
        );

      return tl;
    };

    let tl;

    if (snapshot.step === 2 && !snapshot.reverse) {
      tl = Section3In();
      console.log("Section3In");
    }

    if (snapshot.step === 1 && snapshot.reverse) {
      tl = Section3Out();
      console.log("Section3Out");
    }

    if (snapshot.step === 3 && !snapshot.reverse) {
      tl = Section4In();
      console.log("Section4In");
    }

    if (snapshot.step === 2 && snapshot.reverse) {
      tl = Section4Out();
      console.log("Section4Out");
    }

    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [snapshot.step, snapshot.reverse]);

  return (
    <Section>
      <div
        ref={section3Ref}
        className="section3 fontHorizon z-[2] lg:text-7xl text-2xl flex flex-col items-center justify-center pt-40 lg:pt-20 text-white leading-tight font-bold uppercase opacity-0 "
      >
        <div className="overflow-hidden text-center inline-block">
          <p className=" lg:text-8xl text-5xl target">ELEVATE</p>
          <p className="text-3xl lg:text-7xl ">YOUR BUSINESS</p>
        </div>
      </div>
    </Section>
  );
}
