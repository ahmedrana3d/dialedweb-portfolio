import React, { useEffect } from "react";
import Section from "./Section";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import state from "../../state/state";

export default function Page1() {
  const snapshot = useSnapshot(state);
  // useEffect(() => {
  //   if (snapshot.step === 0) {
  //     const mouseMove = (e) => {
  //       gsap.to(".cursor", {
  //         opacity: 1,
  //       });
  //       gsap.to(".cursor", {
  //         x: e.clientX,
  //         y: e.clientY,
  //         duration: 1,
  //         ease: "back.out",
  //       });
  //     };
  //     const mouseLeave = () => {
  //       gsap.to(".cursor", {
  //         opacity: 0,
  //       });
  //     };

  //     window.addEventListener("mousemove", mouseMove);
  //     document.addEventListener("mouseleave", mouseLeave);

  //     return () => {
  //       window.removeEventListener("mousemove", mouseMove);
  //       document.removeEventListener("mouseleave", mouseLeave);
  //     };
  //   }
  //   if (snapshot.step === 1) {
  //     gsap.to(".cursor", {
  //       opacity: 0,
  //     });
  //   }
  // }, [snapshot.step]);
  return (
    <Section>
      {/* <div className="cursor hidden fixed top-0 left-0 w-20 h-20 z-20 rounded-full lg:flex justify-center items-center transition-opacity ">
        <div className="w-full h-full rounded-full flex flex-col bg-black justify-center items-center  ">
          <p className="text-white font-circular font-semibold">Scroll</p>
          <div className="mouse "></div>
        </div>
      </div> */}

      <div className="section1 z-[1] absolute bottom-0 left-0  w-full   flex flex-col gap-10 items-center justify-center pb-32 overflow-hidden">
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
