import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase"; // Import CustomEase for custom bezier ease
import { FaInstagram } from "react-icons/fa";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import "./navbar.css";
import AnimText from "./components/AnimText";
import { PiArrowRight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// Register CustomEase plugin with GSAP
gsap.registerPlugin(CustomEase);

// Define custom cubic bezier ease
const customEase = CustomEase.create("customEase", ".4,0,.1,1");

export default function Navbar() {
  const [menu, setMenu] = useState(false);

  const menuContentRef = useRef(null);
  const menuNavRef = useRef(null);
  const menuContainerRef = useRef(null);
  const menuSocialRef = useRef(null);

  const bgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      ".menu",
      { display: "none"},
      { display: "block",  duration: 0.5, ease: customEase },
      0
    );

    tl.fromTo(
      bgRef.current,
      { zIndex: 0 },
      { zIndex: 1,  duration: 0.5, ease: customEase },
      0
    );

    tl.fromTo(
      bgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: customEase },
      0
    );

    tl.fromTo(
      menuContentRef.current,
      { opacity: 0, gap: "150px" },
      { opacity: 1, duration: 0.5, gap: "10px", ease: customEase },
      0
    );

    tl.fromTo(
      menuNavRef.current,
      { transform: "translate3d(0, 5.5em, 0) rotate(3.5deg)" },
      {
        transform: "translate3d(0, 0, 0) rotate(0deg)",
        duration: 0.5,
        ease: customEase,
      },
      0
    );

    tl.fromTo(
      menuContainerRef.current,
      { transform: "translate3d(0, 5.5em, 0) rotate(-3.5deg)" },
      {
        transform: "translate3d(0, 0, 0) rotate(0deg)",
        duration: 0.5,
        ease: customEase,
      },
      0
    );

    tl.fromTo(
      menuSocialRef.current,
      { transform: "translate3d(0, 5.5em, 0) rotate(-3.5deg)" },
      {
        transform: "translate3d(0, 0, 0) rotate(0deg)",
        duration: 0.5,
        ease: customEase,
      },
      0
    );

    // Function to handle opening and closing
    const handleOpen = (isClosed) => {
      if (isClosed) {
        tl.play();
      } else {
        tl.progress(1).reverse();
      }
    };

    handleOpen(menu);

    return () => {
      tl.kill();
    };
  }, [menu]);

  const navLinks = [
    { title: "HOME", path: "/" },
    { title: "PROJECTS", path: "/project" },
    { title: "LEARN", path: "/" },
    { title: "GET IN TOUCH", path: "/contact" },
  ];

  return (
    <>
      <div
        ref={bgRef}
        className="flex lg:hidden absolute top-0 left-0  bg-gradient-to-r from-blue-800 to-indigo-900 w-[100%] h-[100%]  z-[1]"
      ></div>

      <div className="fixed left-0 w-full py-[25px] px-[25px] z-10  ">
        <div
          onClick={() => {
            setMenu(!menu);
          }}
          className="navButton"
        >
          <motion.div
            className="navSlider"
            animate={{ top: menu ? "-100%" : "0" }}
            transition={{ duration: 0.5, ease: customEase }}
          >
            <div className="navText">
              <PerspectiveText text="MENU" />
            </div>
            <div className="navText">
              <PerspectiveText text="CLOSE" />
            </div>
          </motion.div>
        </div>

        <div className="menu ">
          <div
            key="menuContent"
            className="menuContent flex flex-col"
            ref={menuContentRef}
          >
            <div className="menuNav" ref={menuNavRef}>
              {navLinks.map((link, i) => (
                <NavLink key={i} to={link.path} onClick={() => setMenu(!menu)}>
                  <AnimText key={i} title={link.title} />
                </NavLink>
              ))}
            </div>
            <div ref={menuContainerRef}>
              <div className="menuContainer mt-2">
                <h1 className="emailText">Book Your Consultation</h1>
                <div className="inputContainer">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="emailinput"
                  />
                  <PiArrowRight className="arrowIcon" />
                </div>
              </div>
              <div className="menuSocial mt-2" ref={menuSocialRef}>
                <Icons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PerspectiveText({ text }) {
  return (
    <div className="perspectiveText">
      <p className="navP">{text}</p>
      <p className="navP">{text}</p>
    </div>
  );
}

function Icons() {
  return (
    <ul className="flex justify-center text-center gap-6">
      <div className="socialButton">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <FaInstagram size="35" />
        </a>
      </div>
      <div className="socialButton">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <BsTwitterX size="35" />
        </a>
      </div>
      <div className="socialButton">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <BsLinkedin size="35" />
        </a>
      </div>
    </ul>
  );
}
