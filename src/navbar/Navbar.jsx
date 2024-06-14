import React, { useEffect, useState, useRef } from "react";
import AnimatedLinks from "./components/AnimatedLinks.jsx";
import { useSnapshot } from "valtio";
import state from "../state/state.js";
import gsap from "gsap";
import Contact from "../contact/Contact.jsx";
import AniNavLink from "./components/AniNavLinks.jsx";
import AnimText from "./components/AnimText.jsx";
import { FaInstagram } from "react-icons/fa";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import MobileNav from "./MobileNav.jsx";
import { NavLink } from "react-router-dom";

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
      title: "PROJECTS",
      path: "/project",
    },
    {
      title: "LEARN",
      path: "/",
    },
    {
      title: "GET IN TOUCH",
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
      const timeline = gsap.timeline({ delay: 0.5 });

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
            <p className="text-2xl text-center font-horizon text-white hover:-translate-y-1 transition-all duration-300">
              DIALED<span className="text-[#AAA3FF]">WEB</span>
            </p>
            <div>
              <ul className="flex text-2xl text-white gap-6 items-center justify-center font-serif font-semibold ">
                {navLinks.map((link, i) => {
                  return (
                    <div key={i}>
                    <NavLink to={link.path} target={link.title === "PROJECTS" ? "_blank" : "_self"}>
                      <AnimatedLinks title={link.title} />
                    </NavLink>
                  </div>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* MENU */}
          <div className=" hidden secPage absolute top-3 left-1  h-14 px-4  z-10 lg:flex items-center ">
            <div className="z-50 ">
              <button
                onClick={() => setMenuOpened(!menuOpened)}
                className="menuButton "
              >
                {menuOpened ? (
                  <AnimText title="CLOSE" />
                ) : (
                  <AnimText title="MENU" />
                )}
              </button>
            </div>
            <div
              className={` w-full fixed bottom-0 left-0  transition-all overflow-hidden duration-1000 bg-black text-white 
          ${menuOpened ? "h-full" : "h-0"} `}
            >
              <div className=" w-full h-screen  flex flex-col justify-between items-center ">
                <div className="w-full lg:h-20 h-16 pl-5  flex justify-between items-center ">
                  <div className="flex-1 flex justify-center items-center text-center  pl-[9rem]  ">
                    <p className="text-5xl font-horizon text-white hover:-translate-y-1 transition-all duration-300">
                      DIALED<span className="text-[#AAA3FF]">WEB</span>
                    </p>
                  </div>
                  <div className="hidden pr-4 lg:flex">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleContact();
                      }}
                      className="  getInTouch  "
                    >
                      <AnimText title="GET IN TOUCH" />
                    </button>
                  </div>
                </div>

                <div className=" w-full  text-center flex flex-col sm:flex sm:flex-col lg:items-center lg:justify-between gap-10 ">
                  <p className="navLinks text-4xl lg:text-6xl cursor-pointer tracking-tight ">
                    <AniNavLink title="PROJECTS" />
                  </p>
                  <p className=" navLinks text-4xl lg:text-6xl   lg:text-start cursor-pointer ">
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
                      <div className="socialButton ">
                        <a
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaInstagram size="35" />
                        </a>
                      </div>
                      <div className="socialButton  ">
                        <a
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BsTwitterX size="35" />
                        </a>
                      </div>
                      <div className="socialButton ">
                        <a
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BsLinkedin size="35" />
                        </a>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Contact contact={contact} setContact={setContact} /> */}
        </>
      )}

      {/* BELOW CODE FOR SMALLER DEVICE */}
      <MobileNav
        contact={contact}
        setContact={setContact}
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
      />
    </>
  );
}

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
