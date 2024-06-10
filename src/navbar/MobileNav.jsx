import React, { useEffect } from "react";
import Contact from "../contact/Contact";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import AniNavLink from "./components/AniNavLinks";
import AnimText from "./components/AnimText";
import gsap from "gsap";

function MobileNav({ menuOpened, setMenuOpened, contact, setContact }) {
  const handleContact = () => {
    setContact((prev) => !prev);
    setMenuOpened(false);
  };
  useEffect(() => {
    if (menuOpened === true) {
      const timeline = gsap.timeline({ delay: 0.5 });

      timeline
        .from(".mobileLinks", {
          opacity: 0,
          x: -50,
          ease: "power4.out",
          duration: 2,
          stagger: { amount: 0.8, from: "start" },
        })
        .to(".mobileLinks", {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power4.out",
        });
    }
  }, [menuOpened]);
  return (
    <>
      <div className=" lg:hidden flex  absolute top-4 left-1  h-14 px-4  z-10  items-center ">
        <div className="z-50 ">
          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className="CommonButton "
          >
            {menuOpened ? (
              <AnimText title="CLOSE" />
            ) : (
              <AnimText title="MENU" />
            )}
          </button>
        </div>
        <div
          className={` w-full fixed bottom-0 left-0  transition-all overflow-hidden duration-1000 text-white menuOverlay
          ${menuOpened ? "h-full" : "h-0"} `}
        >
          <div className=" w-full h-screen  flex flex-col justify-between items-center ">
            <div className="w-full lg:h-20 h-16 pl-5  flex justify-between items-center">
              <div className="flex-1 flex justify-center lg:scale-150 pt-24 scale-150 ">
                <Diallogo />
              </div>
              <div className="hidden pr-4 lg:flex">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleContact();
                  }}
                  className=" font-Helvetic  getInTouch  "
                >
                  <AnimText title="GET IN TOUCH" />
                </button>
              </div>
            </div>

            <div className="  flex flex-col sm:flex sm:flex-col lg:items-center lg:justify-between gap-5 font-Helvetic">
              <p className=" ml-8 navLinks text-4xl  lg:text-6xl  cursor-pointer  ">
                <AniNavLink title="PROJECTS" />
              </p>
              <p className=" ml-14 navLinks text-4xl lg:text-6xl   lg:text-start cursor-pointer ">
                <AniNavLink title="LEARN" />
              </p>
              <p
                onClick={(e) => {
                  e.preventDefault();
                  handleContact();
                }}
                className="navLinks text-4xl lg:text-6xl  cursor-pointer "
              >
                <AniNavLink title="GET IN TOUCH" />
              </p>
            </div>

            <div className="w-full flex items-end justify-end text-center  ">
              <div className="flex items-center justify-center pb-6 pr-6 gap-6 ">
                <h1 className="text-sm text-cyan-50 text-opacity-40">
                  FIND US
                </h1>
                <ul className="flex justify-center text-center gap-6  ">
                  <div className="socialButton w-8 h-8 flex items-center justify-center">
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      <FaInstagram size="20" />
                    </a>
                  </div>
                  <div className="socialButton w-8 h-8 flex items-center justify-center">
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      <BsTwitterX size="20" />
                    </a>
                  </div>
                  <div className="socialButton w-8 h-8 flex items-center justify-center">
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      <BsLinkedin size="20" />
                    </a>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact contact={contact} setContact={setContact} />
    </>
  );
}

export default MobileNav;

const MenuButton = (props) => {
  const { label } = props;
  return (
    <p className=" lg:text-6xl text-3xl font-bold fontHorizon cursor-pointer  transition-all">
      {label}
    </p>
  );
};

const Diallogo = () => {
  return (
    <>
      <div className="keycaps w-60  flex items-center select-none">
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img className="glow-effect" src="./dialedweb_keys/1.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img className="glow-effect" src="./dialedweb_keys/2.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img className="glow-effect" src="./dialedweb_keys/3.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img className="glow-effect" src="./dialedweb_keys/4.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img className="glow-effect" src="./dialedweb_keys/5.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img className="glow-effect" src="./dialedweb_keys/6.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img className="glow-effect" src="./dialedweb_keys/7.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img className="glow-effect" src="./dialedweb_keys/8.png" alt="" />
        </div>
        <div className="key w-24  transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img className="glow-effect" src="./dialedweb_keys/9.png" alt="" />
        </div>
      </div>
    </>
  );
};
