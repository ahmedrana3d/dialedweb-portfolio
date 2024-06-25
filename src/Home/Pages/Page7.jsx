import React, { useEffect, useState } from "react";
import Section from "./Section";
import state from "../../state/state";
import { useSnapshot } from "valtio";
import gsap from "gsap";
import AnimatedCounter from "./AnimatedNum";

export default function Page7() {
  const snapshot = useSnapshot(state);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    let timeout;
    if (snapshot.step === 7) {
      timeout = setTimeout(() => {
        setPlay(true);
      }, 3000);
    } else {
      setPlay(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [snapshot.step]);

  const Section7In = () => {
    const tl = gsap.timeline();
    tl.to(".section6", {
      opacity: 0,
      duration: 1,
    }).to(".section7", {
      opacity: 1,
      duration: 1,
    });
  };
  const Section7Out = () => {
    const tl = gsap.timeline();
    tl.to(".section7", {
      opacity: 0,
      duration: 1,
    }).to(".section6", {
      opacity: 1,
      duration: 1,
    });
    tl.fromTo(
      ".text6",
      {
        y: 200,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.3,
      },
      {
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.3,
        delay: 2.5,
      }
    );
  };

  useEffect(() => {
    if (snapshot.step === 7 && !snapshot.reverse) {
      Section7In();
      console.log("Section7In");
    }
    if (snapshot.step === 6 && snapshot.reverse) {
      Section7Out();
      console.log("Section7Out");
    }
  }, [snapshot.step, snapshot.reverse]);

  return (
    <Section>
      <div className="section7 w-full h-screen flex lg:flex-row flex-col justify-between items-center font-horizon  text-white opacity-0">
        <div className=" h-full lg:w-1/2 flex flex-col justify-center items-center px-3 mt-10 lg:mt-0">
          <h1 className=" lg:text-3xl text-center mb-10 lg:mb-0 ">
            Impact of UI and UX Design on Website Conversions
          </h1>
          <img className="" src="/meteor.png" alt="" />
        </div>

        <div className=" h-full lg:w-1/2 flex flex-col justify-center items-center px-3 lg:gap-20 gap-10">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="lg:text-2xl">
              A well-designed user interface (UI) could boost website
              conversions by:
            </h1>
            <h2 className="lg:text-5xl text-3xl text-[#AAA3FF]">
              {" "}
              {play ? <AnimatedCounter from={0} to={200} /> : ""}
              {play ? "% " : ""}
              {snapshot.step === 7 && !play ? "0%" : ""}
              {snapshot.step !== 7 && !play ? "200%" : ""}
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="lg:text-2xl">
              Better user experience (UX) design could lead to an increase of:
            </h1>
            <h2 className="lg:text-5xl text-3xl text-[#AAA3FF]">
              {play ? <AnimatedCounter from={0} to={400} /> : ""}
              {play ? "% " : ""}

              {snapshot.step === 7 && !play ? "0%" : ""}
              {snapshot.step !== 7 && !play ? "400%" : ""}
            </h2>
          </div>
        </div>
      </div>
    </Section>
  );
}
