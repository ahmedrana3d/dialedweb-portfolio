import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import MagneticIcon from "../navbar/components/MagneticIcon";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";

import "./contact.css";
import Stairs from "../transitions/Stair";

function Contact({ contact, setContact }) {
  return (
    <Stairs>
      <div className="noise"></div>
      <div className=" w-full h-screen bg-[#1E1E1E] mx-auto  ">
        <div className=" h-screen w-screen lg:max-w-[80%] mx-auto flex justify-center items-center  ">
          <div className="w-full h-screen  lg:max-w-[50%] mx-auto flex flex-col  items-center lg:mt-20 mt-32 p-3 bg-black/30 rounded-2xl ">
            <h1 className="text-7xl lg:text-6xl xl:text-8xl xl:mb-3  text-white font-Helvetic">
              CONTACT
            </h1>
            <div className="p-3 mb-3 xl:mb-4 text-[#9d9d9d] border rounded-xl flex hover:bg-white/20 transition-all">
              <img
                src="/mathewpic2.jpg"
                alt=""
                className="lg:w-20 w-12 mr-3 rounded-full"
              />
              <p className="font-circular  ">
                Hi, I’m Matvey and I’ll be happy to talk to you about your
                potential project ideas. Email me at
                <span className="text-white pl-1">
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    support@dialedworldwide.com
                  </a>
                </span>
              </p>
            </div>
            <div className="p-3 mb-3 xl:mb-4 text-[#9d9d9d] border rounded-xl flex hover:bg-white/20 transition-all">
              <img
                src="/mathewpic2.jpg"
                alt=""
                className="lg:w-20 w-12 mr-3 rounded-full"
              />
              <p className="font-circular  ">
                Hi, I’m Matvey and I’ll be happy to talk to you about your
                potential project ideas. Email me at
                <span className="text-white pl-1">
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    support@dialedworldwide.com
                  </a>
                </span>
              </p>
            </div>
            <div className=" w-full flex justify-between items-center font-circular xl:mb-4">
              <div className="lg:w-32 lg:h-20 w-28 h-20 hover:bg-white/20 transition-all  rounded-md text-white bg-[#1f1f1f] flex justify-center items-center flex-col ">
                <IoIosCall size="30" />
                CaLL
              </div>
              <div className="lg:w-32 lg:h-20 w-28 h-20 hover:bg-white/20 transition-all rounded-md text-white bg-[#1f1f1f] flex justify-center items-center flex-col ">
                <MdEmail size="30" />
                Email
              </div>
              <div className="lg:w-32 lg:h-20 w-28 h-20 hover:bg-white/20 transition-all rounded-md text-white bg-[#1f1f1f] flex justify-center items-center flex-col ">
                <AiFillMessage size="30" />
                Message
              </div>
            </div>
            <div className="bg-[#1f1f1f] w-full p-3 rounded-lg mt-1 xl:mb-4">
              <p className="text-[#9d9d9d]">Phone</p>
              <p className="text-white">+111 22 33 44</p>
            </div>
            <div className="bg-[#1f1f1f] w-full p-3 rounded-lg mt-1 xl:mb-4">
              <p className="text-[#9d9d9d]">Email</p>
              <p className="text-white">support@dialedworldwide.com</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center mt-6 lg:mt-0 space-y-4 md:space-y-0 md:space-x-4">
              <form className="w-full md:w-auto flex-grow">
                <textarea
                  name="textarea"
                  id="textarea"
                  rows="1"
                  className="w-full md:w-auto h-auto p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-all md:h-24 bg-transparent text-white"
                  placeholder="Enter your text here..."
                ></textarea>
              </form>
              <button className="bg-[#1f1f1f] p-4 md:p-6 rounded-xl text-white hover:bg-white/20 transition-all md:h-24">
                SUBMIT
              </button>
            </div>

            <div className="w-full">
              <Icons />
            </div>
          </div>
        </div>
      </div>
    </Stairs>
  );
}

export default Contact;

const Icons = () => {
  return (
    <>
      <ul className=" flex justify-evenly items-center mt-1 mb-6 text-3xl lg:text-4xl py-5">
        <MagneticIcon>
          <li className="hover:text-[#9d9d9d] text-white hover:scale-150 transition-all duration-500 ">
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
          <li className="hover:text-[#9d9d9d] text-white hover:scale-150 transition-all duration-500">
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
          <li className="hover:text-[#9d9d9d] text-white hover:scale-150 transition-all duration-500">
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
