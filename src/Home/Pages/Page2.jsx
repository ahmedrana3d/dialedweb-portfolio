import React, { useEffect } from "react";
import Section from "./Section";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import gsap from "gsap";

const Page2 = ({ sec2 }) => {
  const snapshot = useSnapshot(state);

  const Section2In = () => {
    const tl = gsap.timeline();
    tl.to(".section1", {
      autoAlpha: 0,
      duration: 1,
    })
      .to(".section2", { autoAlpha: 1, duration: 1 })
      .from(".text2", {
        y: -250,
        ease: "power1.inOut",
        duration: 1.5,
        delay: 1,
      })
      .from(".text22", {
        y: 250,
        ease: "power1.inOut",
        duration: 1,
        delay: 1,
      })

    return tl;
  };

  const Section2Out = () => {
    const tl = gsap.timeline();
    tl
    .to(".section2", {
      autoAlpha: 0,
      duration: 1,
    })
      .to(".section1", { autoAlpha: 1 })
      .from(".anim", {
        y: -500,
        ease: "power4.out",
        duration: 3,
        delay: 1,
        stagger: { amount: 0.8, from: "start" },
      });
  };

  useEffect(() => {
    let tl;

    if (snapshot.step === 1 && !snapshot.reverse) {
      tl = Section2In();
      console.log("Section2In");
    }
    if (snapshot.step === 0 && snapshot.reverse) {
      tl = Section2Out();
      console.log("Section2Out");
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
        ref={sec2}
        className="section2 fontHorizon z-[2] lg:text-7xl text-2xl flex flex-col items-center justify-center pt-40 lg:pt-20 text-white leading-tight font-bold uppercase opacity-0 animate-levitate"
      >
        <div className="overflow-hidden text-center">
        <p className="text2">delve into the</p>
        <p className="text22 text-3xl lg:text-9xl ">FUTURE</p>
        </div>
      </div>
    </Section>
  );
};

export default Page2;
