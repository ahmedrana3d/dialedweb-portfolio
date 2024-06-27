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

  const elecRef = useRef();
  const shineRef = useRef();
  const text90 = useRef();

  const mySplitText4 = new SplitType(elecRef.current, { types: "chars" });
  const chars4 = mySplitText4.chars;

  const mySplitText5 = new SplitType(shineRef.current, { types: "chars" });
  const chars5 = mySplitText5.chars;

  const mySplitText6 = new SplitType(text90.current, { types: "chars" });
  const chars6 = mySplitText6.chars;

  chars4.forEach((char) => {
    char.classList.add("headline-orange");
  });
  chars5.forEach((char) => {
    char.classList.add("headline-orange");
  });
  chars6.forEach((char) => {
    char.classList.add("headline-orange");
  });

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

    gsap.set(elecRef.current, {
      transformPerspective: 500,
      transformOrigin: "center bottom",
      rotationX: 70,
    });
    gsap.set(shineRef.current, {
      transformPerspective: 500,
      transformOrigin: "center bottom",
      rotationX: 70,
    });
    gsap.set(text90.current, {
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
      [page3Text1.current,elecRef.current],
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
      [chars,chars4],
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
      [page3Text2.current,shineRef.current],
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
      [chars2,chars5],
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

    tl.to(".section3", { autoAlpha: 1, duration: 1 });
    // tl.fromTo(
    //   page3Text1.current,
    //   { autoAlpha: 0, duration: 1 },
    //   { autoAlpha: 1, duration: 1, ease: "power3.out" },

    //   "baby"
    // );
    // tl.fromTo(
    //   page3Text2.current,
    //   { autoAlpha: 0, duration: 1 },
    //   { autoAlpha: 1, duration: 1, ease: "power3.out" },

    //   "baby"
    // );
    tl.fromTo(
      ".baba",
      { opacity: 0 },
      { opacity: 1, duration: .5, ease: "power3.out" }
    );

    tl.fromTo(
      byRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power3.out" }
    );
    tl.fromTo(
      text90.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power3.out" }
    );
    tl.fromTo(
      [page3Text3.current,text90.current],
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
      "-=3"
    );

    tl.from(
      [chars3,chars6],
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
      "-=3"
    );

    tl.from(
      chars6,
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
    tl.to(".baba",{opacity: 0, duration: 1},"baby")
    tl.to(byRef.current, { opacity: 0, duration: 1 }, "baby");
    // tl.to(text90.current, { opacity: 0,  duration: 1 }, "baby");
    // tl.to(page3Text3.current, { opacity: 0, duration: 0.3 }, "baby");
    tl.to(".section3", { autoAlpha: 1, duration: 2 }, "baby");

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
      tl = Section3In().delay(1);
      console.log("Section4Out");
    }

    if (snapshot.step === 3 && snapshot.reverse) {
      tl = Section4In();
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
        <div className=" lg:text-6xl text-3xl  mt-32 lg:mt-10">
          <h1 ref={elecRef} className="text-[#AAA3FF] ">
            elevate
          </h1>{" "}
          <h1 ref={page3Text1}>
            <span className="">your</span> <span>business</span>
          </h1>
        </div>

        <div className=" lg:text-6xl text-2xl flex flex-col justify-center items-center text-center">
          <h1 ref={shineRef} className="text-[#AAA3FF]">
            Outshine{" "}
          </h1>
          <h1 ref={page3Text2}>your competitors</h1>
        </div>

        <h1
          ref={byRef}
          className="lg:text-8xl text-6xl absolute bottom-[25%] lg:left-[2%] left-0  font-Opti opacity-0 "
        >
          by:
        </h1>
        <div className="baba flex flex-col justify-center items-center p-10  ">
          <h1 ref={text90} className="lg:text-8xl text-3xl text-[#AAA3FF] opacity-0 ">
            94%
          </h1>
          <h1 ref={page3Text3} className="text-2xl opacity-0 text-white">
            <span className="mr-2">Increase</span>
            <span className="lg:mr-3">in</span>
            <span className="lg:mr-3">Conversions</span>
            <span className="lg:mr-3">after</span>
            <span className="lg:mr-3">Implementing</span>
            <span className="lg:text-6xl text-[#AAA3FF]">3D</span>
          </h1>
        </div>
      </div>
    </Section>
  );
}
