import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import ScrollDetector from "./Components/ScrollDetector";
import { useSnapshot } from "valtio";
import state from "../state/state";
import { useRef } from "react";
import Page1 from "./Pages/Page1";
import Page2 from "./Pages/Page2";

const MainSection = () => {

  const sec2 = useRef();
  const snapshot = useSnapshot(state);
  console.log(snapshot.step);

  const enterExpClicked = snapshot.enterClicked;

  const animateSection1 = () => {
    gsap.to(".section2", {
      opacity: 0,
      duration: 2,
    });
    const tl = gsap.timeline({ delay: 2 });
    tl.set(".section2", { opacity: 0 })
      .to(".section1", { opacity: 1 })
      .from(".anim", {
        y: -500,
        ease: "power4.out",
        duration: 3,
        stagger: { amount: 0.8, from: "start" },
        onComplete: () => {
          sec2.current.classList.remove("animate-levitate");
        },
      })
      .to(".mouse", { opacity: 1 });
  };

  const animateSection2 = () => {
    const tl = gsap.timeline();
    tl.to(".section1", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        gsap.set(".section2", { opacity: 1 });
      },
    }).from(".section2", {
      y: -270,
      ease: "power1.inOut",
      duration: 1.5,
      delay: 2,
      onComplete: () => {
        sec2.current.classList.add("animate-levitate");
      },
    });
  };

  useGSAP(() => {
    if (enterExpClicked && snapshot.step === 0) {
      animateSection1();
    } else if (snapshot.step === 1) {
      animateSection2();
    }
  }, [enterExpClicked, snapshot.step]);

  return (
    <>
      <main className="fixed w-full h-screen top-0 left-0  ">
        <Page1 />

        <Page2 sec2={sec2} />
      </main>

      <ScrollDetector />
    </>
  );
};

export default MainSection;
