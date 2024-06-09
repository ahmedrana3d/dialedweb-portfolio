import React, { useEffect, useState, useRef } from "react";
import AnimatedLinks from "./components/AnimatedLinks.jsx";
import { useSnapshot } from "valtio";
import state from "../state/state.js";
import gsap from "gsap";
import Contact from "../Home/Contact.jsx";
import AniNavLink from "./components/AniNavLinks.jsx";
import AnimText from "./components/AnimText.jsx";
import { FaInstagram } from "react-icons/fa";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);

  const snapshot = useSnapshot(state);

  const [contact, setContact] = useState(false);

  const handleContact = () => {
    setContact((prev) => !prev);
    setMenuOpened(false);
  };

  const navLinks = [
    {
      title: "PORTFOLIO",
      path: "/",
    },
    {
      title: "LEARN",
      path: "/about",
    },
    {
      title: "CONTACT",
      path: "/contact",
    },
  ];

  useEffect(() => {
    if (snapshot.step === 0) {
      const tl = gsap.timeline();
      gsap.to(".secPage", {
        display: "none",
        opacity: 0,
      });
      tl.to(".nav", {
        display: "flex",
        opacity: 1,
      }).from(".nav", {
        y: -200,
        duration: 3,
      });
    } else if (snapshot.step === 1) {
      gsap.to(".nav", {
        display: "none",
      });
      gsap.to(".secPage", {
        display: "flex",
        opacity: 1,
        duration: 2,
      });
    }

    if (menuOpened === true) {
      const timeline = gsap.timeline();

      timeline
        .from(".navLinks", {
          opacity: 0,
          y: 50,
          ease: "power4.out",
          duration: 2,
          stagger: { amount: 0.8, from: "start" },
        })
        .to(".navLinks", {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power4.out",
        });
    }
  }, [snapshot.step, menuOpened]);

  const [xPosition, setXPosition] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setXPosition(screenWidth < 768);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {xPosition ? null : (
        <>
          <div className="nav hidden absolute z-40 w-full h-20  p-6 lg:flex items-center justify-between">
            <Diallogo />
            <div>
              <ul className="flex text-2xl text-white gap-6 items-center justify-center font-serif font-semibold ">
                {navLinks.map((link, i) => {
                  return (
                    <div key={i}>
                      <li to={link.path}>
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            if (link.title === "CONTACT") {
                              handleContact();
                            }
                          }}
                        >
                          <AnimatedLinks title={link.title} />
                        </div>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* MENU */}
          <div className=" hidden secPage absolute top-4 left-2  h-14 px-4  z-10 lg:flex items-center ">
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
              className={`z-10 h-full fixed top-0 right-0  transition-all overflow-hidden duration-1000 text-white menuOverlay ${
                menuOpened ? "w-full" : "w-0"
              } flex-col text-center justify-center `}
            >
              <div className="text-6xl text-center  mt-4">
                <h1>DIALEDWEB</h1>
              </div>
              <div className="mt-20 h-[500px] mr-3 ml-3 pr-3 pl-3 flex items-center justify-between   ">
                <p className="navLinks  text-6xl font-bold fontCircularr cursor-pointer   ">
                  <AniNavLink title="PROJECTS" />
                </p>
                <p className=" navLinks text-6xl font-bold fontHorizon cursor-pointer ">
                  <AniNavLink title="LEARN" />
                </p>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleContact();
                  }}
                >
                  <p className=" navLinks text-6xl font-bold fontHorizon cursor-pointer  ">
                    <AniNavLink title="CONTACT" />
                  </p>
                </div>
              </div>
              <div className=" mt-20 flex items-end justify-end text-center   h-36 pb-5 pr-9 ">
                <div className="flex items-center justify-center p-3 gap-6 ">
                  <h1 className="text-sm text-cyan-50 text-opacity-40">FOLLOW US</h1>
                  <ul className="flex justify-center text-center gap-6  ">
                   <div className="socialButton w-10 h-10 flex items-center justify-center">
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size="30" />
                    </a>
                   </div>
                   <div className="socialButton w-10 h-10 flex items-center justify-center">
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                    <BsTwitterX size="30" />
                    </a>
                   </div>
                   <div className="socialButton w-10 h-10 flex items-center justify-center">
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                    <BsLinkedin size="30" />
                    </a>
                   </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Contact contact={contact} setContact={setContact} />
        </>
      )}

      {/* BELOW CODE FOR SMALLER DEVICE */}
    </>
  );
}

const Diallogo = () => {
  return (
    <>
      <div className="keycaps w-60  flex items-center select-none">
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/1.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/2.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/3.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/4.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/5.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/6.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/7.png" alt="" />
        </div>
        <div className="key w-24 transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/8.png" alt="" />
        </div>
        <div className="key w-24  transform transition-transform duration-100 hover:scale-95 hover:translate-y-1">
          <img src="./dialedweb_keys/9.png" alt="" />
        </div>
      </div>
    </>
  );
};
