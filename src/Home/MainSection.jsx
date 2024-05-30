import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import ScrollDetector from "./Components/ScrollDetector";
import { useSnapshot } from "valtio";
import state from "../state/state";
import { useEffect, useRef } from "react";
// import Page1 from "./Pages/Page1";
// import Page2 from "./Pages/Page2";
import { Page1, Page2, Page3 } from "./Pages";

const MainSection = () => {
  const sec2 = useRef();
  const snapshot = useSnapshot(state);
  console.log(snapshot.step);

  const enterExpClicked = snapshot.enterClicked;

  const Section1In = () => {
    const tl = gsap.timeline({ delay: 2 });
    tl.to(".section1", { opacity: 1 });
    tl.from(".anim", {
      y: -500,
      ease: "power4.out",
      duration: 3,
      stagger: { amount: 0.8, from: "start" },
      onComplete: () => {
        sec2.current.classList.remove("animate-levitate");
      },
    }).to(".mouse", { opacity: 1 });
  };

  const Section2In = () => {
    const tl = gsap.timeline();
    tl.to(".section1", {
      opacity: 0,
      duration: 1,
    })
      .to(".section2", { opacity: 1, duration: 2 })
      .from(".section2", {
        y: -270,
        ease: "power1.inOut",
        duration: 1.5,
        delay: 1,
        onComplete: () => {
          sec2.current.classList.add("animate-levitate");
        },
      });
  };

  const Section2Out = () => {
    const tl = gsap.timeline();
    tl.to(".section2", {
      opacity: 0,
      duration: 1,
    });
    Section1In();
  };

  const Section3In = () => {
    const tl = gsap.timeline();
    tl.to(".section2", {
      opacity: 0,
      duration: 1,
    });
    tl.to(".section3", {
      opacity: 1,
      duration: 1,
    }).from(".section3", {
      y: -270,
      ease: "power1.inOut",
      duration: 1.5,
      delay: 1,
    });
  };

  const Section3Out = () => {
    const tl = gsap.timeline();
    tl.to(".section3", {
      opacity: 0,
      duration: 1,
    }).to(".section2", {
      opacity: 1,
      duration: 1,
      delay: 1,
    });
  };

  useEffect(() => {
    if (enterExpClicked && snapshot.step === 0 && !snapshot.reverse) {
      Section1In();
      console.log("section1 play");
    } else if (snapshot.step === 0 && snapshot.reverse) {
      Section2Out();
      console.log("section2 reverse");
    } else if (snapshot.step === 1 && !snapshot.reverse) {
      Section2In();
      console.log("section2 play");
    } else if (snapshot.step === 1 && snapshot.reverse) {
      Section3Out();
    } else if (snapshot.step === 2 && !snapshot.reverse) {
      Section3In();
    }
  }, [enterExpClicked, snapshot.step, snapshot.reverse]);

  return (
    <>
      <main className="fixed w-full h-screen top-0 left-0  ">
        <Page1 />

        <Page2 sec2={sec2} />
        <Page3 />
      </main>

      <ScrollDetector />
    </>
  );
};

export default MainSection;
