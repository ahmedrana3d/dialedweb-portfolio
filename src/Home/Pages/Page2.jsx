import React, { useEffect, useRef } from "react";
import Section from "./Section";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import gsap from "gsap";
import SplitType from "split-type";

const Page2 = ({ sec2 }) => {
  const snapshot = useSnapshot(state);

  const page2Text = useRef();

  const mySplitText = new SplitType(page2Text.current, { types: "chars" });
  const chars = mySplitText.chars;

  const Section2In = () => {
    gsap.set(page2Text.current, {
      transformPerspective: 500,
      transformOrigin: "center bottom",
      rotationX: 70,
    });

    const tl = gsap.timeline();
    tl.to(".section1", {
      autoAlpha: 0,
      duration: 1,
    }).to(".section2", { autoAlpha: 1, duration: 1 });

    tl.fromTo(
      page2Text.current,
      {
        rotationX: 70,
        opacity: 0,
      },
      {
        rotationX: 0,
        opacity: 1,
        duration: 1.5,
        ease: "back.out",
      }
    );

    tl.from(
      chars,
      {
        yPercent: 100,
        stagger: 0.04,
        opacity: 0,
        ease: "power1.out",
        duration: 1.5,
      },
      "<"
    );

    return tl;
  };

  const Section2Out = () => {
    const tl = gsap.timeline();
    tl.to(".section2", {
      autoAlpha: 0,
      duration: 1,
    }).to(".section1", { autoAlpha: 1 });
  };

  useEffect(() => {
    let tl;

    if (snapshot.step === 1 && !snapshot.reverse) {
      tl = Section2In();
      console.log("Section2In");
    }
    if (snapshot.step === 1 && snapshot.reverse) {
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
        className="section2 fontHorizon z-[2] lg:text-7xl text-3xl w-full pt-40 lg:pt-20 text-white  font-bold uppercase opacity-0 "
      >
        <div ref={page2Text} className=" text-center flex flex-col justify-center items-center">
          <h1>DElVE INTO THE</h1>
          <h1 className="text-[#AAA3FF]">FUTURE</h1>
        </div>
      </div>
    </Section>
  );
};

export default Page2;
