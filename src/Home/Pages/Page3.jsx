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

  const byRef = useRef();

  const mySplitText = new SplitType(page3Text1.current, { types: "chars" });
  const chars = mySplitText.chars;

  const mySplitText2 = new SplitType(page3Text2.current, { types: "chars" });
  const chars2 = mySplitText2.chars;

  const mySplitText3 = new SplitType(page3Text3.current, { types: "chars" });
  const chars3 = mySplitText3.chars;

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
    gsap.set(page3Text3.current, {
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
    tl.fromTo(
      byRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" },
      "-=2"
    );
    tl.fromTo(
      page3Text3.current,
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
      chars3,
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

  const Section3Out = () => {
    const tl = gsap.timeline();
    tl.to(".section3", { autoAlpha: 0, duration: 1 }).to(".section2", {
      autoAlpha: 1,
      duration: 1,
    });

    return tl;
  };

  const Section4In = () => {
    const tl = gsap.timeline();

    tl.to(section3Ref.current, {
      scale: 8,
      duration: 2,
      ease: "power3.out",
    });

    tl.to(".section3", {
      autoAlpha: 0,
      duration: 1,
    });

    tl.to(".section4", {
      autoAlpha: 1,
      duration: 1,
      onComplete: () => {
        gsap.to(section3Ref.current, {
          clearProps: "scale",
          duration: 0,
        });
      },
    });

    return tl;
  };

  const Section4Out = () => {
    const tl = gsap.timeline();
    tl.to(".section3", { autoAlpha: 1, duration: 1 }).to(
      ".section4",
      {
        autoAlpha: 0,
        duration: 1,
      },
      "-=.5"
    );
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

    if (snapshot.step === 3 && !snapshot.reverse) {
      tl = Section4In();
      console.log("Section4In");
    }

    if (snapshot.step === 2 && snapshot.reverse) {
      tl = Section4Out();
      tl = Section3In();
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
        className="section3 w-full h-screen font-horizon  flex flex-col justify-between items-center text-center  text-white opacity-0"
      >
        <div className=" lg:text-6xl text-4xl mt-10 ">
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

        <h1
          ref={byRef}
          className="lg:text-8xl text-6xl absolute bottom-[25%] lg:left-[2%] left-0  font-Opti opacity-0 "
        >
          by:
        </h1>
        <div
          ref={page3Text3}
          className="flex flex-col justify-center items-center p-20"
        >
          <h1 className="lg:text-8xl text-4xl text-[#AAA3FF]">94%</h1>
          <h1 className="text-3xl  ">
            Increase in Conversions after Implementing
            <span className="lg:text-6xl text-[#AAA3FF]">3D</span>
          </h1>
        </div>
      </div>
    </Section>
  );
}
