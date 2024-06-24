import React, { useEffect, useRef } from "react";
import Section from "./Section";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import SplitType from "split-type";
import "../page.css";

export default function Page1() {
  const snapshot = useSnapshot(state);

  const epRef = useRef();
  const page1Text = useRef();

  const mySplitText = new SplitType(page1Text.current, { types: "chars" });
  const chars = mySplitText.chars;

  const Section1In = () => {
    gsap.set(page1Text.current, {
      transformPerspective: 500,
      transformOrigin: "center bottom",
      rotationX: 70,
    });
    const tl = gsap.timeline();

    tl.to(".section1", { autoAlpha: 1, duration: 1 });

    tl.fromTo(
      page1Text.current,
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
        onComplete: () => {
          epRef.current.classList.add("baba");
        }
      },
      "<"
    );

  

    return tl;
  };

  useEffect(() => {
    let tl;


    if (snapshot.step === 0 && snapshot.enterClicked && !snapshot.reverse) {
      tl = Section1In();
    }
    if (snapshot.step === 0 && snapshot.reverse) {
      tl = Section1In();
    }
    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [snapshot.step, snapshot.enterClicked, snapshot.reverse]);

  return (
    <Section>
      <div className="section1 z-[1] absolute bottom-0 left-0  w-full flex flex-col gap-10 items-center justify-center pb-32 overflow-hidden">
        <div className="overflow-hidden p-10">
          <h1
            ref={page1Text}
            className="lg:text-7xl text-3xl  text-white font-horizon m-0  "
          >
            BEGIN YOUR{" "}
            <span ref={epRef} className="text-[#AAA3FF]">EXPERIENCE</span>
          </h1>
        </div>
      </div>
    </Section>
  );
}
