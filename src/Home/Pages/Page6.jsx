import React, { useRef, useState } from "react";
import Section from "./Section";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../../state/state";
import AnimatedCounter from "./AnimatedNum";
import gsap from "gsap";

function Page6() {
  const snapshot = useSnapshot(state);

  const [play, setPlay] = useState(false);

  const page6Text1 = useRef();
  const page6Text2 = useRef();

  useEffect(() => {
    let timeout;
    if (snapshot.step === 6) {
      timeout = setTimeout(() => {
        setPlay(true);
      }, 2000);
    } else {
      setPlay(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [snapshot.step]);

  const Section6In = () => {
    const tl = gsap.timeline();
    tl.to(".section5", {
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
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
      },
      {
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
        delay: 2,
      }
    );
  };
  const Section6Out = () => {
    const tl = gsap.timeline();
    tl.to(".section6", {
      opacity: 0,
      duration: 1,
    }).to(".section5", {
      opacity: 1,
      duration: 1,
    });
  };

  useEffect(() => {
    if (snapshot.step === 6 && !snapshot.reverse) {
      Section6In();
      console.log("Section6In");
    }
    if (snapshot.step === 5 && snapshot.reverse) {
      Section6Out();
      console.log("Section6Out");
    }
  }, [snapshot.step, snapshot.reverse]);

  return (
    <Section>
      <div className="section6 w-full h-screen flex  justify-center items-center text-start  text-white fontHorizon opacity-0 ">
        <div className=" text-center">
          <div className="overflow-hidden">
            <p
              ref={page6Text1}
              className="lg:text-8xl text-5xl headline-orange  "
            >
              {play ? <AnimatedCounter from={0} to={252000} /> : ""}
              {snapshot.step === 6 && !play ? "000000" : ""}
              {snapshot.step !== 6 && !play ? "252000" : ""}
            </p>
          </div>
          <div className="overflow-hidden">
            <p ref={page6Text2} className="pt-3 text-2xl  text6">
              New sites are created every day - make yours stand out{" "}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Page6;
