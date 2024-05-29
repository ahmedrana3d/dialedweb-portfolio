
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { enterClicked } from "../state/atoms";
import { useRecoilState } from "recoil";
import ScrollDetector from "./Components/ScrollDetector";
import { useSnapshot } from "valtio";
import state from "../state/state";
import { useRef } from "react";

const FirstSection = () => {
  const enterExpClicked = useRecoilState(enterClicked);
const sec2 = useRef()
  const snapshot = useSnapshot(state);
  console.log(snapshot.step);

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
        onComplete : () => {
          sec2.current.classList.remove("animate-levitate")
        }
      })
      .to(".mouse", { opacity: 1 });
  };

  const animateSection2 = () => {
    const tl = gsap.timeline();
    tl.to(".section1", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        gsap.set(".section2", { opacity: 1 })
      },
    }).from(".section2", {
      y: -270,
      ease: "power1.inOut",
      duration: 1.5,
      delay: 2,
      onComplete: () => {
        sec2.current.classList.add("animate-levitate")
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
        <Section>
          <div className="section1 z-[1] absolute bottom-0 left-0  w-full   flex flex-col gap-10 items-center justify-center pb-32 overflow-hidden">
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
                <span className="anim test ">
                  BEGIN
                </span>
              </div>
              <div className="anim">
                <span className="anim test">
                  YOUR
                </span>
              </div>
              <div className="anim">
                <span className="anim test headline-dark fontHorizon">
                  EXPERINCE
                </span>
              </div>
            </h1>
            <div className="mouse opacity-0"></div>
          </div>
        </Section>

        <Section>
        <div ref={sec2} className="section2 fontHorizon z-[2] lg:text-7xl text-2xl flex flex-col items-center justify-center pt-20 text-white leading-tight font-bold uppercase opacity-0 ">
  <p className="">delve into the</p>
  <p className="text-3xl lg:text-9xl headline-orange">FUTURE</p>
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
      <div className="absolute w-full h-screen top-0 left-0 ">{children}</div>
    </>
  );
};
