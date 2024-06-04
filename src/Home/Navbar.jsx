import React, { useEffect, useState } from "react";
import AnimatedLinks from "../Home/Components/AnimatedLinks.jsx";
import { useSnapshot } from "valtio";
import state from "../state/state.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);

  const snapshot = useSnapshot(state);

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
      path: "/projects",
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
  }, [snapshot.step]);

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
                        <AnimatedLinks title={link.title} />
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="hidden secPage absolute top-0 right-0 w-full h-14 px-4  z-10 lg:flex items-center justify-between  ">
            <div className="  ">
              <Diallogo />
            </div>
            <div className="z-50">
              <button
                onClick={() => setMenuOpened(!menuOpened)}
                className="  bg-transparent  w-16  rounded-md"
              >
                <div
                  className={`bg-black h-0.5 rounded-md w-full transition-all ${
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
              className={`z-10 h-56 fixed top-0 right-0  transition-all overflow-hidden  shadow-lg shadow-orange-400 rounded-3xl
      ${menuOpened ? "w-96" : "w-0"}`}
              style={{
                background: snapshot.step > 0 ? "black" : "white",
                color: snapshot.step > 0 ? "white" : "black",
              }}
            >
              <div className="absolute w-full h-full flex items-center justify-center flex-col gap-4 ">
                <MenuButton label="PROJECTS" />
                <MenuButton label="LEARN " />
                <MenuButton label="CONTACT" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* BELOW CODE FOR SMALLER DEVICE */}

      <div className="lg:hidden absolute top-0 right-0 w-full h-14 px-1 z-10 flex items-center justify-between ">
        <div className="  ">
          <Diallogo />
        </div>
        <div className="z-50">
          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className="  bg-transparent  w-16  rounded-md"
          >
            <div
              className={`bg-black h-0.5 rounded-md w-full transition-all ${
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
          className={`z-10 fixed top-0 right-0 bottom-0 transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-60" : "w-0"}`}
          style={{
            background: snapshot.step > 0 ? "black" : "white",
            color: snapshot.step > 0 ? "white" : "black",
          }}
        >
          <div className="flex-1 flex items-center justify-center flex-col gap-16 p-8">
            <MenuButton label="PROJECTS" />
            <MenuButton label="LEARN " />
            <MenuButton label="CONTACT" />
          </div>
        </div>
      </div>
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
  const { label, onClick } = props;
  return (
    <p
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer hover:text-orange-400 transition-all"
    >
      {label}
    </p>
  );
};
