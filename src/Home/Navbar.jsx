import React, { useEffect, useState, useRef } from "react";
import AnimatedLinks from "../Home/Components/AnimatedLinks.jsx";
import { useSnapshot } from "valtio";
import state from "../state/state.js";
import gsap from "gsap";
import Contact from "./Contact.jsx";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);
  useEffect(() => {
    const navTextElements = document.querySelectorAll(".navText");
    if (menuOpened) {
      const mouseMove = (e) => {
        gsap.to(".cursor", {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "Power4.out",
        });
      };
      const mouseEnter = () => {
        gsap.to(".cursor", {
          scale: 4,
          mixBlendMode: "exclusion",
          backgroundColor: "silver",
        });
      };

      const mouseLeave = () => {
        gsap.to(".cursor", {
          scale: 1,
          background: "white",
        });
      };
      window.addEventListener("mousemove", mouseMove);
      navTextElements.forEach((element) => {
        element.addEventListener("mouseenter", mouseEnter);
        element.addEventListener("mouseleave", mouseLeave);
      });

      return () => {
        window.removeEventListener("mousemove", mouseMove);
        navTextElements.forEach((element) => {
          element.removeEventListener("mouseenter", mouseEnter);
          element.removeEventListener("mouseleave", mouseLeave);
        });
      };
    }
  }, [menuOpened]);

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
      // Adjust xPosition based on screen size
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        // Adjust this breakpoint according to your design
        setXPosition(screenWidth < 768);
      }
    };

    handleResize(); // Call it once to set initial position

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
          <div className=" hidden secPage absolute top-5 right-5  h-14 px-4  z-10 lg:flex items-center ">
            <div className="z-50 ">
              <button
                onClick={() => setMenuOpened(!menuOpened)}
                className=" hover:bg-black   w-16  rounded-md"
              >
                <div
                  className={`bg-white navText h-0.5 rounded-md w-full transition-all hover:bg-black ${
                    menuOpened ? "rotate-45  translate-y-0.5" : ""
                  }`}
                />
                <div
                  className={`bg-white navText h-0.5 rounded-md w-full my-3 hover:bg-black ${
                    menuOpened ? "hidden" : ""
                  }`}
                />
                <div
                  className={`bg-white navText h-0.5 rounded-md w-full transition-all hover:bg-black  ${
                    menuOpened ? "-rotate-45" : ""
                  }`}
                />
              </button>
            </div>
            <div
              className={`z-10 w-full  fixed top-0 right-0  transition-all overflow-hidden duration-1000 bg-black text-white ${
                menuOpened ? "h-screen" : "h-0"
              }`}
            >
              <div className="cursor" />

              <div className="absolute w-full h-full  flex items-center justify-center  gap-16  ">
                <p className="navText navLinks  text-6xl font-bold fontHorizon cursor-pointer   ">
                  PROJECTS
                </p>
                <p className="navText navLinks text-6xl font-bold fontHorizon cursor-pointer ">
                  LEARN
                </p>

                <div
                  onClick={(e) => {
                    e.preventDefault();

                    handleContact();
                  }}
                >
                  <p className="navText navLinks text-6xl font-bold fontHorizon cursor-pointer  ">
                    CONTACT
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Contact contact={contact} setContact={setContact} />
        </>
      )}

      {/* BELOW CODE FOR SMALLER DEVICE */}

      <div className="lg:hidden absolute top-0 right-0 w-full h-14 px-1 z-10 flex items-center justify-between  ">
        <div>
          <Diallogo />
        </div>
        <div className="z-50">
          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className="  bg-transparent  w-10  rounded-md"
          >
            <div
              className={`bg-black h-0.5 rounded-md w-full transition-all  ${
                menuOpened ? "rotate-45  translate-y-0.5" : ""
              }`}
              style={{ background: snapshot.step > 0 ? "white" : "" }}
            />
            <div
              className={`bg-black h-0.5 rounded-md w-full my-3 ${
                menuOpened ? "hidden" : ""
              }`}
              style={{ background: snapshot.step > 0 ? "white" : "" }}
            />
            <div
              className={`bg-black h-0.5 rounded-md w-full transition-all ${
                menuOpened ? "-rotate-45" : ""
              }`}
              style={{ background: snapshot.step > 0 ? "white" : "" }}
            />
          </button>
        </div>
        <div
          className={`z-10 fixed top-0 right-0 bottom-0 transition-all duration-1000 overflow-hidden flex flex-col
      ${menuOpened ? "w-full" : "w-0"}`}
          style={{
            background: snapshot.step > 0 ? "black" : "white",
            color: snapshot.step > 0 ? "white" : "black",
          }}
        >
          <div className="flex-1 flex items-center justify-center flex-col gap-16 p-8 ">
            <div className="navLinks">
              <MenuButton label="PROJECTS" />
            </div>
            <div className="navLinks">
              <MenuButton label="LEARN " />
            </div>
            <div
              className="navLinks"
              onClick={(e) => {
                e.preventDefault();

                handleContact();
              }}
            >
              <MenuButton label="CONTACT" />
            </div>
          </div>
        </div>
      </div>
      <Contact contact={contact} setContact={setContact} />
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

const MenuButton = (props) => {
  const { label } = props;
  return (
    <p className=" lg:text-6xl text-3xl font-bold fontHorizon cursor-pointer  transition-all">
      {label}
    </p>
  );
};
