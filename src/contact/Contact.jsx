import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import MagneticIcon from "../navbar/components/MagneticIcon";

import "./contact.css";
import Stairs from "../transitions/Stair";

function Contact({ contact, setContact }) {
 
  return (
    <Stairs>
      <div className="w-full h-screen bg-[#313131]">
        
      </div>
    </Stairs>
   
  );
}

export default Contact;

const Icons = () => {
  return (
    <>
      <ul className=" flex justify-evenly items-center mt-6 mb-6 text-3xl lg:text-4xl py-5">
        <MagneticIcon>
          <li className="hover:text-red-300 hover:scale-150 transition-all duration-500 ">
            <a
              href="https://github.com/CoderTalhaa"
              target="_blank"
              className="contact-icon"
              rel="noreferrer"
            >
              <AiFillGithub />
            </a>
          </li>
        </MagneticIcon>
        <MagneticIcon>
          <li className="hover:text-red-300 hover:scale-150 transition-all duration-500">
            <a
              href="https://twitter.com/home"
              target="_blank"
              className="contact-icon"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
          </li>
        </MagneticIcon>
        <MagneticIcon>
          <li className="hover:text-red-300 hover:scale-150 transition-all duration-500">
            <a
              href="https://www.instagram.com/7x.talha/"
              target="_blank"
              className="contact-icon"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
          </li>
        </MagneticIcon>
      </ul>
    </>
  );
};
