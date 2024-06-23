import React, { useEffect, useRef, useState } from "react";
import Section from "./Section";
import { gsap } from "gsap";
import SplitType from "split-type";
import { useSnapshot } from "valtio";
import state from "../../state/state";

export default function Page3() {
  const snapshot = useSnapshot(state);
  const section3Ref = useRef(null);

  const page3Text1 = useRef();
  const page3Text2 = useRef();
  const page3Text3 = useRef();

  const mySplitText = new SplitType(page3Text1.current, { types: "chars" });
  const chars = mySplitText.chars;

  const mySplitText2 = new SplitType(page3Text2.current, { types: "chars" });
  const chars2 = mySplitText2.chars;

  

  const Section3In = () => {
    gsap.set(page3Text1.current, {
      transformPerspective: 500,
      transformOrigin: "center bottom",
      rotationX: 70,
    });
    gsap.set(page3Text2.current, {
      transformPerspective: 500,
      transformOrigin: "center bottom",
      rotationX: 70,
    });
    const tl = gsap.timeline();

    tl.to(".section2", { autoAlpha: 0, duration: 1 }).to(".section3", {
      autoAlpha: 1,
      duration: 1,
    });

    tl.fromTo(
      page3Text1.current,
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
    tl.fromTo(
      page3Text2.current,
      {
        rotationX: 70,
        opacity: 0,
      },
      {
        rotationX: 0,
        opacity: 1,
        duration: 1.5,
        ease: "back.out",
      },
      "-=2"
    );

    tl.from(
      chars2,
      {
        yPercent: 100,
        stagger: 0.04,
        opacity: 0,
        ease: "power1.out",
        duration: 1.5,
      },
      "<"
    );

    tl.from(
      ".text1",
      {
        x: -150,
        duration: 1,
        ease: "power3.out",
      },
      "cho"
    )
      .from(
        ".text2",
        {
          y: -100,
          duration: 1,
          ease: "power3.out",
        },
        "cho"
      )
      .from(
        ".text3",
        {
          y: 100,
          duration: 1,
          ease: "power3.out",
        },
        "cho"
      );

    return tl;
  };

  const Section3Out = () => {
    const tl = gsap.timeline();
    tl.to(".section3", { autoAlpha: 0, duration: 1 }).to(".section2", {
      autoAlpha: 1,
      duration: 1,
    });

    return tl;
  };

  useEffect(() => {
    let tl;

    if (snapshot.step === 2 && !snapshot.reverse) {
      tl = Section3In();
      console.log("Section3In");
    }

    if (snapshot.step === 1 && snapshot.reverse) {
      tl = Section3Out();
      console.log("Section3Out");
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
        className="section3 w-full h-screen font-horizon  flex flex-col justify-between items-center text-center  text-white opacity-0  "
      >
        <div className=" lg:text-6xl text-2xl mt-10 ">
          <h1 ref={page3Text1}>
            <span className="text-[#AAA3FF]">elevate</span> your business
          </h1>
        </div>

        <div
          ref={page3Text2}
          className=" lg:text-6xl text-2xl flex flex-col justify-center items-center text-center"
        >
          <h1 className="text-[#AAA3FF]">Outshine </h1>
          <h1>your competitors</h1>
        </div>

        <div className="overflow-hidden  flex justify-center items-center text-center ">
          <h1 className="text-8xl text1 font-Opti ">by:</h1>
          <div className=" mr-16 ">
            <h1 className="text-8xl text2 text-[#AAA3FF]">94%</h1>
            <h1 className="text-2xl mb-2 text3 ">
              Increase in Conversions after Implementing
              <span className="text-6xl text-[#AAA3FF]">3D</span>
            </h1>
          </div>
        </div>
      </div>
    </Section>
  );
}
