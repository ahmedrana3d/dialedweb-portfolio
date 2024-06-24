import React, { useEffect, useRef } from "react";
import Section from "./Section";
import SplitType from "split-type";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import gsap from "gsap";

function Page4() {
  const snapshot = useSnapshot(state);

  const page4text = useRef();

  const mySplitText = new SplitType(page4text.current, { types: "chars" });
  const chars = mySplitText.chars;

  const Section4In = () => {
    gsap.set(page4text.current, {
      transformPerspective: 500,
      transformOrigin: "center bottom",
      rotationX: 70,
    });
    const tl = gsap.timeline();

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

  useEffect(() => {
    let tl;

    if (snapshot.step === 3 && !snapshot.reverse) {
      tl = Section4In();
    }

    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [snapshot.step, snapshot.enterClicked, snapshot.reverse]);

  return (
    <Section>
      <div className="section4 w-full h-36 flex items-center justify-center text-start gap-2 fontHorizon text-white  opacity-0">
        <div ref={page4text} className="">
          <h1 className="text-8xl text-[#AAA3FF]">90%</h1>
          <h1 className="w-[600px]">
            of users cite poor design as a primary reason for
            <span className="text-[#AAA3FF]">not</span> trusting a website{" "}
          </h1>
        </div>
      </div>
    </Section>
  );
}

export default Page4;
