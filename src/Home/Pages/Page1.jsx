import React, { useEffect } from "react";
import Section from "./Section";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import state from "../../state/state";

export default function Page1() {
  const snapshot = useSnapshot(state);

  const Section1In = () => {
    const tl = gsap.timeline({ delay: 2 });

    tl.to(".section1", { autoAlpha: 1 }).from(".anim", {
      y: -500,
      ease: "power4.out",
      duration: 3,
      stagger: { amount: 0.8, from: "start" },
    });
    return tl;
  };

  useEffect(() => {
    let tl;

    if (snapshot.step === 0 && snapshot.enterClicked && !snapshot.reverse) {
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
      <div className="section1 z-[1] absolute bottom-0 left-0  w-full opacity-0  flex flex-col gap-10 items-center justify-center pb-32 overflow-hidden">
        <h1 className="lg:text-6xl text-1xl flex lg:gap-3 gap-2 font-mono font-semibold text-white cursor-pointer ">
          <div className="anim">
            <span className="anim test ">BEGIN</span>
          </div>
          <div className="anim">
            <span className="anim test">YOUR</span>
          </div>
          <div className="anim">
            <span className="anim test headline-dark fontHorizon">
              EXPERIENCE
            </span>
          </div>
        </h1>
      </div>
    </Section>
  );
}
