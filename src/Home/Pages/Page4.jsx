import React, { useEffect, useRef } from "react";
import Section from "./Section";
import SplitType from "split-type";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import gsap from "gsap";
// import { SplitText } from "gsap/all";

function Page4() {
  const snapshot = useSnapshot(state);

  // gsap.registerPlugin(SplitText);

  const page4text = useRef();

  const text90 = useRef();

  const mySplitText = new SplitType(page4text.current, { type: "chars" });
  const chars = mySplitText.chars;

  const mySplitText1 = new SplitType(text90.current, { types: "chars" });
  const chars1 = mySplitText1.chars;

  chars1.forEach((char) => {
    char.classList.add("headline-orange");
  });

  const Section4In = () => {
    gsap.set(page4text.current, {
      transformPerspective: 500,
      transformOrigin: "center bottom",
      rotationX: 70,
    });

    gsap.set(text90.current, {
      transformPerspective: 500,
      transformOrigin: "center bottom",
      rotationX: 70,
    });
    const tl = gsap.timeline({});

    tl.fromTo(
      ".section3",
      { scale: 1, opacity: 1 },
      { scale: 40, opacity: 0, duration: 1, ease: "power3.inOut" }
    );
    tl.to(".section3", { autoAlpha: 0 });
    tl.to(".section3", { scale: 1 }).to(".section4", {
      autoAlpha: 1,
    });

    tl.fromTo(
      text90.current,
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
      chars1,
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
      page4text.current,
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
      ,"-=1.5"
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

  const Section4Out = () => {
    const tl = gsap.timeline();
    tl.to(".section4", { opacity: 0, duration: 1 }).to(".section3", {
      opacity: 1,
      duration: 1,
    });

    return tl;
  };

  useEffect(() => {
    let tl;

    if (snapshot.step === 4) {
      gsap.set(".mainsection", {
        display: "none",
        delay: 2,
      });
    } else {
      gsap.set(".mainsection", {
        display: "block",
      });
    }

    if (snapshot.step === 4 && !snapshot.reverse) {
      tl = Section4In();
    }
    if (snapshot.step === 3 && snapshot.reverse) {
      tl = Section4Out();
    }

    if (snapshot.step === 4 && snapshot.reverse) {
      tl = Section4In();
      console.log("Section5Out");
    }

    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [snapshot.step, snapshot.reverse]);

  return (
    <div className=" absolute top-0 left-0 section4 w-full lg:h-36 h-64 flex items-center justify-center   gap-2 fontHorizon text-white  opacity-0">
      <div className="flex p-20 flex-col justify-center items-center text-center lg:flex-row lg:space-x-4">
        <div>
          <h1 ref={text90} className="lg:text-8xl text-4xl  ">
            90%
          </h1>
        </div>
        <div>
          <h1 ref={page4text} className="lg:max-w-[750px]  lg:text-3xl  ">
            <span className="mr-3">of</span>
            <span className="mr-3">users</span>
            <span className="mr-3">cite</span>
            <span className="mr-3">poor</span>
            <span className="mr-3">design</span>
            <span className="mr-3">as</span>
            <span className="mr-3">a</span>
            <span className="mr-3">primary</span>
            <span className="mr-3">reason</span>
            <span className="mr-3">for</span>
            <span className="text-[#AAA3FF] mr-10 ">not</span>
            <span className="mr-3">trusting</span>
            <span className="mr-3">a</span>
            <span className="mr-3">website</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Page4;
