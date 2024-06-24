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
import { FaLongArrowAltRight } from "react-icons/fa";

import "./navbar.css";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [menu, setMenu] = useState(false);

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

  const varitants = {
    open: {
      width: "18rem",
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: 0,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const linkVariants = {
    initial: {
      opacity: 0,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
    enter: {
      opacity: 1,
      transition: { delay: 0.5 },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.45,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.5 } },
    exit: (custom) => ({
      opacity: 0,
      rotate: custom === "left" ? 10 : -10,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <>
      <div className="fixed top-[50px] left-[50px] z-10 ">
        {/* --!? */}
        <div onClick={() => setMenu(!menu)} className="navButton">
          <motion.div
            className="navSlider"
            animate={{ top: menu ? "-100%" : "0" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="navText">
              <PerspectiveText text="MENU" />
            </div>
            <div className="navText">
              <PerspectiveText text="CLOSE" />
            </div>
          </motion.div>
        </div>
        {/* --!? */}
        <motion.div
          className="menu"
          variants={varitants}
          animate={menu ? "open" : "closed"}
          initial="closed"
        >
          <AnimatePresence>
            {menu && (
              <motion.div
                key="menuContent"
                variants={linkVariants}
                animate="enter"
                initial="initial"
                exit="exit"
              >
                <motion.div
                  className="menuNav"
                  variants={childVariants}
                  custom="left"
                >
                  {/* <FaLongArrowAltRight className="showIcon" /> */}
                  {navLinks.map((link, i) => (
                      <AnimText key={i} title={link.title} />
                    // <div key={i} className="navlinks">
                    // </div>
                  ))}
                </motion.div>
                <motion.div variants={childVariants} custom="right">
                  <div className="menuContainer mt-2">
                    <h1 className="emailText">LETS TALK TOGETHER </h1>
                    <div className="inputContainer">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="emailinput"
                      />
                      <FaLongArrowAltRight className="arrowIcon" />
                    </div>
                  </div>
                  <div className="menuSocial mt-2">
                    <Icons />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
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
    <ul className="flex justify-center text-center gap-6  ">
      <div className="socialButton ">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <FaInstagram size="35" />
        </a>
      </div>
      <div className="socialButton  ">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <BsTwitterX size="35" />
        </a>
      </div>
      <div className="socialButton ">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <BsLinkedin size="35" />
        </a>
      </div>
    </ul>
  );
}
