import React from "react";
import Experience from "./Experience";
import LoadingScreen from "./Components/LoadingScreen";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { enterClicked } from "../state/atoms";
import { useRecoilState } from "recoil";
import ScrollDetector from "./Components/ScrollDetector";
import { useSnapshot } from "valtio";
import state from "../state/state";

const FirstSection = () => {
  const enterExpClicked = useRecoilState(enterClicked);

  const snapshot = useSnapshot(state);
  console.log(snapshot.step);

  useGSAP(() => {
    if (snapshot.step === 0) {
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
    }
    else if(snapshot.step === 1) {
      gsap.from(".section2",{
        y: -200,
        opacity: 0,
        ease: "power1.inOut",
        duration: 3,
        delay: 2,
      })
    }
  }, [enterExpClicked[0], snapshot.step]);

  return (
    <>
      <main className="fixed w-full h-screen top-0 left-0 z-10 ">
        {
          snapshot.step === 0 ?
        <Section>
          <div className="absolute bottom-0 left-0 z-10 w-full   flex flex-col gap-10 items-center justify-center pb-32 overflow-hidden">
            <h1 className="lg:text-3xl text-xl flex lg:gap-3 gap-2 font-mono font-semibold text-[#8C52FF] cursor-pointer ">
              <div className="anim  h-auto">
                <span className="neonText anim main__scroll-text text-3xl ">
                  start
                </span>
              </div>

              <div className="anim  h-auto">
                <span className="neonText anim main__scroll-text text-3xl    ">
                  scrolling
                </span>
              </div>
            </h1>

            <h1 className="lg:text-6xl text-1xl flex lg:gap-3 gap-2 font-mono font-semibold text-white cursor-pointer ">
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
        </Section>
        : null
        }

        <Section>
          <div className="section2 fontHorizon lg:text-7xl text-2xl flex flex-col items-center justify-center pt-20 text-white leading-tight font-bold uppercase opacity-1 ">
          <p className="">delve into the</p>
          <p className="">FUTURE</p>

          </div>
        </Section>
        <Section>
        <div className="bg-red-400 absolute">
          <h1 className="  text-6xl text-red-900">HEOOO</h1>

          </div>
        </Section>
        <Section>
        <div className="bg-red-400 absolute">
          <h1 className="  text-6xl text-red-100">HEOOOOO</h1>

          </div>
        </Section>
      </main>

      <ScrollDetector />
    </>
  );
};

export default FirstSection;

const Section = ({ children }) => {
  return (
    <>
      <div className=" w-full h-screen  ">{children}</div>
    </>
  );
};
