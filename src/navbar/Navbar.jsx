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
  const menuRef = useRef();
  const tl = useRef();

  const snapshot = useSnapshot(state);

  const [contact, setContact] = useState(false);

  const handleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  const navLinks = [
    {
      title: "HOME",
      path: "/home",
    },
    {
      title: "PROJECTS",
      path: "/project",
    },
    {
      title: "LEARN",
      path: "/learn",
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

    gsap.set(menuRef.current, { bottom: "-120%", });
    gsap.set(".navLinks", { opacity: 0, y: 100 });
    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(menuRef.current, {
        bottom: 0,
        duration: 1,
        ease: "power3.out",
      })
      // .to(
      //   ".navLinks",
      //   {
      //     opacity: 1,
      //     y: 0,
      //     ease: "power4.out",
      //     duration: 2,
      //     stagger: { amount: 0.8, from: "start" },
      //   },
        
      // );
  }, [snapshot.step]);

  useEffect(() => {
    menuOpened ? tl.current.play() : tl.current.reverse();
  }, [menuOpened]);

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
              <ul className="flex text-2xl text-white gap-6 items-center justify-center font-Helvetic font-semibold ">
                {navLinks.map((link, i) => {
                  return (
                    <div key={i}>
                      <NavLink
                        to={link.path}
                        target={link.title === "PROJECTS" ? "_blank" : "_self"}
                      >
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
              <button onClick={handleMenu} className="menuButton ">
                {menuOpened ? (
                  <AnimText title="CLOSE" />
                ) : (
                  <AnimText title="MENU" />
                )}
              </button>
            </div>
            <div
              ref={menuRef}
              className={` w-full h-full fixed  left-0  transition-all overflow-hidden duration-1000 bg-black text-white z-10 `}
            >
              <div className=" w-full h-screen  flex flex-col justify-between items-center ">
                <div className="w-full lg:h-20 h-16   flex justify-between items-center ">
                  <div className="flex-1 flex justify-center items-center text-center    ">
                    <p className="text-5xl font-horizon text-white hover:-translate-y-1 transition-all duration-300">
                      DIALED<span className="text-[#AAA3FF]">WEB</span>
                    </p>
                  </div>
                </div>

                <div className=" w-full  text-center flex flex-col sm:flex sm:flex-col lg:items-center lg:justify-between gap-10 ">
                  <div className="overflow-hidden">
                    <p
                      onClick={() => setMenuOpened(false)}
                      className="navLinks text-4xl lg:text-6xl cursor-pointer tracking-wider "
                    >
                      <NavLink to="/">
                        <AniNavLink title="HOME" />
                      </NavLink>
                    </p>
                  </div>
                  <div className="overflow-hidden">
                    <p
                      onClick={() => setMenuOpened(false)}
                      className="navLinks text-4xl lg:text-6xl cursor-pointer tracking-tight "
                    >
                      <NavLink to="/projects">
                        <AniNavLink title="PROJECTS" />
                      </NavLink>
                    </p>
                  </div>
                  <div className="overflow-hidden">
                    <p
                      onClick={() => setMenuOpened(false)}
                      className=" navLinks text-4xl lg:text-6xl   lg:text-start cursor-pointer "
                    >
                      <NavLink to="/learn">
                        <AniNavLink title="LEARN" />
                      </NavLink>
                    </p>
                  </div>
                  <div className="overflow-hidden">
                    <p
                      onClick={() => setMenuOpened(false)}
                      className="navLinks text-4xl lg:text-6xl  cursor-pointer "
                    >
                      <NavLink to="/contact">
                        <AniNavLink title="GET IN TOUCH" />
                      </NavLink>
                    </p>
                  </div>
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
