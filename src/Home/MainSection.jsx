import gsap from "gsap";

import ScrollDetector from "./Components/ScrollDetector";
import { useSnapshot } from "valtio";
import state from "../state/state";
import { useEffect, useRef } from "react";
import anime from 'animejs/lib/anime.es.js';

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
    // gsap.set(".text1", { x: -200, y: -200, autoAlpha: 0 });
    // gsap.set(".text2", { x: 200, y: -200, autoAlpha: 0 });
    // gsap.set(".text3", { x: 0, y: 400, autoAlpha: 0 });
    const tl = gsap.timeline();
    tl.to(".section2", {
      opacity: 0,
      duration: 1,
    });
    tl.to(".section3", {
      opacity: 1,
      duration: 1,
    });
    tl.from(".el",{
      x: -700,
      duration: 1,
      ease: "power4.out",
      stagger: 0.3
    },0)
    tl.from(".yo",{
      y: -300,
      duration: 1,
      ease: "power4.out",
      stagger: 0.3
    },0)
    tl.from(".bus",{
      x: 700,
      duration: 1,
      ease: "power4.out",
      stagger: 0.3
    },0)
  
    // tl.to([".text1", ".text2",".text3"], {
    //   duration: 1.5,
    //   x: 0,
    //   y: 0,
    //   autoAlpha: 1,
    //   ease: "elastic.out(1, 0.75)",
    //   stagger: 0.2,
    // });

  };
  

  const Section3Out = () => {
    const tl = gsap.timeline();

    tl.add(() => {
      gsap.to(
        ".text1", {
        x: -200,
        duration: 1,
        ease: "power4.in",
      }
    );
    });

    tl.add(() => {
      gsap.to(".text2", {
        y: 200,
        duration: 1.5,
        ease: "power4.in",
      });
    }, "-=0.5");

    tl.add(() => {
      gsap.to(".text3", {
        x: 200,
        duration: 1.2,
        ease: "power4.in",
      });
    });

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
        <Page3  />
      </main>

      <ScrollDetector />
    </>
  );
};

export default MainSection;
