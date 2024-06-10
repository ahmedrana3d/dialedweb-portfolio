import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import MagneticIcon from "../navbar/components/MagneticIcon";

import "./contact.css";

function Contact({ contact, setContact }) {
  const contactRef = useRef(null);

  useEffect(() => {
    if (contact) {
      gsap.to(contactRef.current, {
        height: "100%",
        duration: 1,
        ease: "power4.inOut",
      });
    }
    if (contact === false) {
      const tl = gsap.timeline();
      tl.to(contactRef.current, {
        height: "0%",
        duration: 1,
        ease: "power4.inOut",
      });
    }
  }, [contact]);

  return (
    <div
      ref={contactRef}
      className="  w-full fixed top-0 left-0 bg-[#151515] text-white overflow-hidden z-40 transition-all  "
    >
      <div className="  h-full lg:w-[1000px] lg:m-auto mr-3 ml-3  ">
        <div className="py-10  text-white sm:py-4">
          <h1 data-text="CONTACT" className=" glitch   ">
            CONTACT
          </h1>
        </div>

        <div className=" w-full mx-auto  h-[75vh] form-container   ">
          <form className="flex flex-col gap-8 " action="">
            <div className="from-group">
              <input
                className="input"
                type="text"
                placeholder="Name"
                name="user_name"
              />
            </div>

            <div className="from-group">
              <input
                className="input"
                type="text"
                placeholder="Email"
                name="user_name"
              />
            </div>

            <div className="from-group">
              <textarea
                className="textarea"
                required=""
                cols="50"
                rows="10"
                id="textarea"
                name="textarea"
                placeholder="Message"
              />
            </div>
            <div className="flex justify-evenly ">
              <button className="submitButton
              "
              onClick={(e) => {
                e.preventDefault();
                setContact(!contact);
              }}
              >CANCEL</button>
              <button type="submit" className="submitButton">SUBMMIT</button>
            </div>
          </form>
          <Icons />
        </div>
      </div>
    </div>
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
