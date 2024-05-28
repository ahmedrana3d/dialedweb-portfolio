import React from "react";
import Experience from "./Experience";
import LoadingScreen from "./Components/LoadingScreen";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { enterClicked } from "../state/atoms";
import { useRecoilState } from "recoil";
import ScrollDetector from "./Components/ScrollDetector";

const FirstSection = () => {
  const enterExpClicked = useRecoilState(enterClicked);
  console.log(enterExpClicked[0]);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 2 });
    if (enterExpClicked[0]) {
      tl.from(".anim", {
        y: -500,
        ease: "power4.out",
        duration: 3,
        stagger: {
          amount: 0.8,
          from: "start",
        },
      });

      tl.to(".mouse", {
        opacity: 1,
      });
    }
  }, [enterExpClicked[0]]);





  return (
    <div>
      <div className="absolute bottom-0 left-0 z-10 w-full   flex flex-col gap-10 items-center justify-center pb-32 overflow-hidden">
      <h1 className="lg:text-3xl text-xl flex lg:gap-3 gap-2 font-mono font-semibold text-[#8C52FF] cursor-pointer ">
          <div className="anim  h-auto">
          <span className="neonText anim main__scroll-text text-3xl ">start</span>
          </div>
        
          <div className="anim  h-auto">
          <span className="neonText anim main__scroll-text text-3xl    ">scrolling</span>
          </div>
        </h1>
       
        <h1 className="lg:text-6xl text-3xl flex lg:gap-3 gap-2 font-mono font-semibold text-white cursor-pointer ">
          <div className="anim">
            <span id="test" className="anim ">
              BEGIN
            </span>
          </div>
          <div className="anim">
            <span id="test" className="anim">
              YOUR
            </span>
          </div>
          <div className="anim">
            <span id="test" className="anim">
              EXPERINCE
            </span>
          </div>
        </h1>
        <div className="mouse opacity-0"></div>
      </div>
      <Experience />
     <ScrollDetector/>
    </div>
  );
};

export default FirstSection;
