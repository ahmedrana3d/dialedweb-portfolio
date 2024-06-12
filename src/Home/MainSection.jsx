import gsap from "gsap";

import ScrollDetector from "./Components/ScrollDetector";
import { useSnapshot } from "valtio";
import state from "../state/state";
import { useEffect, useRef } from "react";

import { Page1, Page2, Page3, Page4, Page5, Page6, Page7 } from "./Pages";

const MainSection = () => {
  const sec2 = useRef();
  const page3 = useRef();

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
    tl.fromTo(".compet", { opacity: 0 }, { opacity: 1, duration: 0.5 });
    tl.fromTo(".important", { opacity: 0 }, { opacity: 1, duration: 0.5 });
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
      opacity: 1,
      duration: 1,
    });

    tl.to(
      ".compet",
      {
        opacity: 0,
        // duration: 0.5,
      },
      "-=1"
    );
    tl.to(
      ".important",
      {
        y: "-60vh",
        duration: 1,
        delay: 1,
      },
      "-=1"
    );
    tl.to(
      ".section5",
      {
        opacity: 1,
        duration: 1,
        delay: 2,
      },
      "-=1"
    );
  };

  const Section5Out = () => {
    const tl = gsap.timeline();

    tl.to(
      ".section5",
      {
        opacity: 0,
        duration: 0.1,
      },
      "-=2"
    );
    tl.to(".section4", {
      opacity: 1,
      duration: 1,
    });
    tl.to(
      ".important",
      {
        y: "3vh",
        duration: 1,
      },
      "-=1"
    );
    tl.to(".compet", {
      opacity: 1,
      duration: 1,
      delay: 1,
    });
  };

  const Section6In = () => {
    const tl = gsap.timeline();

    tl.to(".section5", {
      opacity: 0,
      duration: 0.5,
    });
    tl.to(".important", {
      opacity: 0,
      duration: 0.5,
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
    tl.to(".important", {
      opacity: 1,
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

  useEffect(() => {
    if (enterExpClicked && snapshot.step === 0 && !snapshot.reverse) {
      Section1In();
      console.log("scetion1in");
    } else if (snapshot.step === 0 && snapshot.reverse) {
      Section2Out();
      console.log("scetion2Out");
    } else if (snapshot.step === 1 && !snapshot.reverse) {
      Section2In();
      console.log("scetion2In");
    } else if (snapshot.step === 1 && snapshot.reverse) {
      Section3Out();
      console.log("scetion3Out");
    } else if (snapshot.step === 2 && !snapshot.reverse) {
      Section3In();
      console.log("scetion3In");
    } else if (snapshot.step === 2 && snapshot.reverse) {
      Section4Out();
      console.log("scetion4Out");
    } else if (snapshot.step === 3 && !snapshot.reverse) {
      Section4In();
      console.log("scetion4In");
    } else if (snapshot.step === 3 && snapshot.reverse) {
      Section5Out();
      console.log("scetion5Out");
    } else if (snapshot.step === 4 && !snapshot.reverse) {
      Section5In();
      console.log("scetion5In");
    } else if (snapshot.step === 4 && snapshot.reverse) {
      Section6Out();
      console.log("scetion6Out");
    } else if (snapshot.step === 5 && !snapshot.reverse) {
      Section6In();
      console.log("scetion6In");
    } else if (snapshot.step === 5 && snapshot.reverse) {
      Section7Out();
      console.log("scetion7out");
    } else if (snapshot.step === 6 && !snapshot.reverse) {
      Section7In();
      console.log("scetion7In");
    }
  }, [enterExpClicked, snapshot.step, snapshot.reverse]);

  return (
    <>
      <main className="fixed w-full h-screen top-0 left-0  ">
        <Page1 />
        <Page2 sec2={sec2} />
        <Page3 />
        <Page4 />
        <Page5 />
        <Page6 />
        <Page7 />
      </main>

      <ScrollDetector />
    </>
  );
};

export default MainSection;
