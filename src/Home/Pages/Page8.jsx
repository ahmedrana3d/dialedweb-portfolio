import React, { useEffect, useRef } from "react";
import Section from "./Section";
import state from "../../state/state";
import { useSnapshot } from "valtio";
import gsap from "gsap";

export default function Page8() {
  const snapshot = useSnapshot(state);

  const btn1 = useRef();
  const btn2 = useRef();

  const Section8In = () => {
    const tl = gsap.timeline();
    tl.to(".section7", {
      opacity: 0,
      duration: 1,
    }).to(".section8", {
      opacity: 1,
      duration: 1,
    })
    .fromTo(
      btn1.current,
      {
        opacity: 0,
        scale: 10,
        z: -200,
        rotation: -45,
      },
      {
        opacity: 1,
        scale: 1,
        z: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .fromTo(
      btn2.current,
      {
        opacity: 0,
        scale: 10,
        z: 200,
        rotation: 45,
      },
      {
        opacity: 1,
        scale: 1,
        z: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );
  };
  const Section8Out = () => {
    const tl = gsap.timeline();
    tl.to(".section8", {
      opacity: 0,
      duration: 1,
    }).to(".section7", {
      opacity: 1,
      duration: 1,
    });
  };
  

  useEffect(() => {
    if (snapshot.step === 8 && !snapshot.reverse) {
      Section8In();
      console.log("Section8In");
    }
    if (snapshot.step === 7 && snapshot.reverse) {
      Section8Out();
      console.log("Section8Out");
    }
  }, [snapshot.step, snapshot.reverse]);

  return (
    <Section>
      <div className="section8 w-full h-screen flex justify-center items-center lg:gap-56 gap-10 opacity-0">
        <button
          ref={btn1}
          className="cursor-pointer text-white font-bold relative lg:text-[30px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
        >
          PROJECTS
        </button>
        <button
          ref={btn2}
          className="cursor-pointer text-white font-bold relative lg:text-[30px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
        >
          GET IN TOUCH
        </button>
      </div>
    </Section>
  );
}
