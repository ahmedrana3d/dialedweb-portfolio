import gsap from "gsap";

import { useSnapshot } from "valtio";
import state from "../state/state";
import { useEffect, useRef, useState } from "react";

import {
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
  Page7,
  Page8,
  Page9,
} from "./Pages";

import "./page.css"

const MainSection = () => {
  const sec2 = useRef();

  const snapshot = useSnapshot(state);
  console.log(snapshot.step);

  // const enterExpClicked = snapshot.enterClicked;

  // const Section1In = () => {
  //   const tl = gsap.timeline({ delay: 2 });
  //   tl.to(".section1", { opacity: 1 })
  //   .from(".anim", {
  //     y: -500,
  //     ease: "power4.out",
  //     duration: 3,
  //     stagger: { amount: 0.8, from: "start" },
  //     onComplete: () => {
  //       sec2.current.classList.remove("animate-levitate");
  //     },

  //   });
  //   return tl;
  // };

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
      duration: 1,
      delay: 0.5,
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

  const Section4In = () => {
    const tl = gsap.timeline();

    tl.to(".section3", {
      opacity: 0,
      duration: 1,
    });
    tl.to(".section4", {
      opacity: 1,
      duration: 1,
    });
    tl.fromTo(".compet", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "<");
  };

  const Section4Out = () => {
    const tl = gsap.timeline();

    tl.to(".section4", {
      opacity: 0,
      duration: 1,
    });
    tl.to(".section3", {
      opacity: 1,
      duration: 1,
    });
  };

  const Section5In = () => {
    const tl = gsap.timeline();

    tl.to(".section4", {
      opacity: 0,
      duration: 1,
    });

    tl.to(".section5", {
      opacity: 1,
      duration: 1,
    });
  };

  const Section5Out = () => {
    const tl = gsap.timeline();

    tl.to(".section5", {
      opacity: 0,
      duration: 0.5,
    });
    tl.to(".section4", {
      opacity: 1,
      duration: 1,
    });
    tl.to(".compet", {
      opacity: 1,
      duration: 1,
    });
  };

  const Section6In = () => {
    const tl = gsap.timeline();

    tl.to(".section5", {
      opacity: 0,
      // duration: 0.5,
    });

    tl.to(".section6", {
      opacity: 1,
      duration: 1,
    });
  };

  const Section6Out = () => {
    const tl = gsap.timeline();

    tl.to(".section6", {
      opacity: 0,
      duration: 1,
    });

    tl.to(".section5", {
      opacity: 1,
      duration: 1,
    });
  };

  const Section7In = () => {
    const tl = gsap.timeline();

    tl.to(".section6", {
      opacity: 0,
      duration: 0.5,
    });

    tl.to(".section7", {
      opacity: 1,
      duration: 1,
    });
  };
  const Section7Out = () => {
    const tl = gsap.timeline();

    tl.to(".section7", {
      opacity: 0,
      duration: 0.5,
    });

    tl.to(".section6", {
      opacity: 1,
      duration: 1,
    });
  };

  const Section8In = () => {
    const tl = gsap.timeline();

    tl.to(".section7", {
      opacity: 0,
      duration: 0.5,
    });

    tl.to(".section8", {
      opacity: 1,
      duration: 1,
    });

    tl.from(
      ".leftCon .leftText",
      {
        x: -300,
        opacity: 0,
        ease: "power4.out",
        stagger: 1,
        duration: 1,
      },
      "anim"
    );

    tl.from(
      ".rightCon .rightText",
      {
        x: 300,
        opacity: 0,
        ease: "power4.out",
        stagger: 1,
        duration: 1,
      },
      "anim"
    );
    tl.from(
      ".bigAmount",
      {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      },
      "anim1"
    );
    tl.from(
      ".bigText",
      {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      },
      "anim1"
    );
  };

  const Section8Out = () => {
    const tl = gsap.timeline();

    tl.to(".section8", {
      opacity: 0,
      duration: 0.5,
    });

    tl.to(".section7", {
      opacity: 1,
      duration: 1,
    });
  };

  const Section9In = () => {
    const tl = gsap.timeline();
    tl.to(".section8", { opacity: 0, duration: 1 })
      .to(".section9", { opacity: 1, duration: 1 })
      .fromTo(
        ".accordion",
        { x: -1400, ease: "power1.inOut" },
        { x: 0, duration: 1, stagger: 0.8, ease: "power1.inOut" }
      );

    return tl;
  };

  const Section9Out = () => {
    const tl = gsap.timeline();
    tl.to(".section9", { opacity: 0, duration: 1 }).to(".section8", {
      opacity: 1,
      duration: 1,
    });

    return tl;
  };

  // const animations = {
  //   "0:true": Section2Out,
  //   "1:false": Section2In,
  //   "1:true": Section3Out,
  //   "2:false": Section3In,
  //   "2:true": Section4Out,
  //   "3:false": Section4In,
  //   "3:true": Section5Out,
  //   "4:false": Section5In,
  //   "4:true": Section6Out,
  //   "5:false": Section6In,
  //   "5:true": Section7Out,
  //   "6:false": Section7In,
  //   "6:true": Section8Out,
  //   "7:false": Section8In,
  //   "7:true": Section9Out,
  //   "8:false": Section9In,
  // };

  // const logMessages = {
  //   "0:false": "section1In",
  //   "0:true": "section2Out",
  //   "1:false": "section2In",
  //   "1:true": "section3Out",
  //   "2:false": "section3In",
  //   "2:true": "section4Out",
  //   "3:false": "section4In",
  //   "3:true": "section5Out",
  //   "4:false": "section5In",
  //   "4:true": "section6Out",
  //   "5:false": "section6In",
  //   "5:true": "section7Out",
  //   "6:false": "section7In",
  //   "6:true": "section8Out",
  //   "7:false": "section8In",
  // };

  // useEffect(() => {
  //   const key = `${snapshot.step}:${snapshot.reverse}`;
  //   const animation = animations[key];
  //   // const logMessage = logMessages[key];

  //   if (enterExpClicked && snapshot.step === 0 && !snapshot.reverse) {
  //     Section1In();
  //     console.log("section1In");
  //   } else if (animation) {
  //     animation();
  //     // console.log(logMessage);
  //   }
  // }, [enterExpClicked, snapshot.step, snapshot.reverse]);

  // useEffect(() => {
  //   if (enterExpClicked && snapshot.step === 0 && !snapshot.reverse) {
  //   Section1In();
  //   console.log("scetion1in");
  //   } else if (snapshot.step === 0 && snapshot.reverse) {
  //   Section2Out();
  //   console.log("scetion2Out");
  //   } else if (snapshot.step === 1 && !snapshot.reverse) {
  //   Section2In();
  //   console.log("scetion2In");
  //   } else if (snapshot.step === 1 && snapshot.reverse) {
  //   Section3Out();
  //   console.log("scetion3Out");
  //   } else if (snapshot.step === 2 && !snapshot.reverse) {
  //   Section3In();
  //   console.log("scetion3In");
  //   } else if (snapshot.step === 2 && snapshot.reverse) {
  //   Section4Out();
  //   console.log("scetion4Out");
  //   } else if (snapshot.step === 3 && !snapshot.reverse) {
  //   Section4In();
  //   console.log("scetion4In");
  //   } else if (snapshot.step === 3 && snapshot.reverse) {
  //   Section5Out();
  //   console.log("scetion5Out");
  //   } else if (snapshot.step === 4 && !snapshot.reverse) {
  //   Section5In();
  //   console.log("scetion5In");
  //   } else if (snapshot.step === 4 && snapshot.reverse) {
  //   Section6Out();
  //   console.log("scetion6Out");
  //   } else if (snapshot.step === 5 && !snapshot.reverse) {
  //   Section6In();
  //   console.log("scetion6In");
  //   } else if (snapshot.step === 5 && snapshot.reverse) {
  //   Section7Out();
  //   console.log("scetion7out");
  //   } else if (snapshot.step === 6 && !snapshot.reverse) {
  //   Section7In();
  //   console.log("scetion7In");
  //   } else if (snapshot.step === 6 && snapshot.reverse) {
  //   Section8Out();
  //   console.log("scetion8Out");
  //   } else if (snapshot.step === 7 && !snapshot.reverse) {
  //   Section8In();
  //   console.log("scetion8In");
  //   }
  //   }, [enterExpClicked, snapshot.step, snapshot.reverse]);

  return (
    <>
      <main className="fixed w-full h-screen top-0 left-0  ">
        <Page1 />
        <Page2 sec2={sec2} />
        <Page3 />
        <Page4 />
        {/* <Page5 /> */}
        {/* <Page6 /> */}
        {/* <Page7 /> */}
        {/* <Page8 /> */}
        {/* <Page9 /> */}
      </main>
    </>
  );
};

export default MainSection;
