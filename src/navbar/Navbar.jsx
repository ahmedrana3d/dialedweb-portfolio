import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase"; // Import CustomEase for custom bezier ease
import { FaInstagram } from "react-icons/fa";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./navbar.css";
import { AnimatePresence, motion } from "framer-motion";
import AnimText from "./components/AnimText";

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

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      menuContentRef.current,
      { opacity: 0, gap: "50px" },
      { opacity: 1, duration: 0.5, gap: "10px", ease: customEase },
      0
    );

    tl.fromTo(
      menuNavRef.current,
      { transform: "translate3d(0, 5.5em, 0) rotate(3.5deg)" },
      { transform: "translate3d(0, 0, 0) rotate(0deg)", duration: 0.5, ease: customEase },
      0
    );

    tl.fromTo(
      menuContainerRef.current,
      { transform: "translate3d(0, 5.5em, 0) rotate(-3.5deg)" },
      { transform: "translate3d(0, 0, 0) rotate(0deg)", duration: 0.5, ease: customEase },
      0
    );

    tl.fromTo(
      menuSocialRef.current,
      { transform: "translate3d(0, 5.5em, 0) rotate(-3.5deg)" },
      { transform: "translate3d(0, 0, 0) rotate(0deg)", duration: 0.5, ease: customEase },
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
      tl.kill(); // Clean up the timeline when the component unmounts
    };
  }, [menu]);

  const navLinks = [
    { title: "HOME", path: "/home" },
    { title: "PROJECTS", path: "/project" },
    { title: "LEARN", path: "/learn" },
    { title: "GET IN TOUCH", path: "/contact" },
  ];

  return (
    <>
      <div className="fixed top-[50px] left-[50px] z-10">
        <div
          onClick={() => {
            // const newClosedState = !closed;
            // setClosed(newClosedState);
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
        <div className="menu" animate={menu ? "open" : "closed"} initial="closed">
          <AnimatePresence>
            <div
              key="menuContent"
              className="menuContent flex flex-col"
              ref={menuContentRef}
            >
              <div className="menuNav" ref={menuNavRef}>
                {navLinks.map((link, i) => (
                  <AnimText key={i} title={link.title} />
                ))}
              </div>
              <div ref={menuContainerRef}>
                <div className="menuContainer mt-2">
                  <h1 className="emailText">LETS TALK TOGETHER</h1>
                  <div className="inputContainer">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="emailinput"
                    />
                    <FaLongArrowAltRight className="arrowIcon" />
                  </div>
                </div>
                <div className="menuSocial mt-2" ref={menuSocialRef}>
                  <Icons />
                </div>
              </div>
            </div>
          </AnimatePresence>
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
