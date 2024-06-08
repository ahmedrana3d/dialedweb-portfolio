import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import MagneticIcon from "./Components/MagneticIcon";

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
        <div className="py-10 text-white sm:py-4">
          <h1 className=" text-center font-bold lg:text-5xl text-2xl fontHorizon ">
            CONTACT
          </h1>
        </div>
        <div className="m-auto sm:w-full pt-5 md:w-full">
          <div className="w-full">
            <form>
              <div className="flex flex-col sm:pt-4">
                <div className="relative w-full lg:mr-16 ">
                  <label className="">
                     NAME
                    <spna className="pl-1 text-[#F75252]">*</spna>
                  </label>
                  <input
                    className="mt-2 block w-full appearance-none rounded border border-[#313131] bg-[#1B1B1B] px-4 py-2 text-white focus:outline-none"
                    placeholder="Name"
                    tabIndex="1"
                    type="text"
                  />
                </div>
                <div className="mt-2"></div>
                <div className="relative w-full">
                  <label className="">
                    EMAIL
                    <spna className="pl-1 text-[#F75252]">*</spna>
                  </label>
                  <input
                    className="mt-2 block w-full appearance-none rounded border border-[#313131] bg-[#1B1B1B] px-4 py-2 text-white focus:outline-none"
                    placeholder="Email address"
                    tabIndex="1"
                    type="text"
                  />
                </div>
                <div className="relative w-full mt-2">
                  <label className="">
                    MESSAGE
                    <spna className="pl-1 text-[#F75252]">*</spna>
                  </label>
                  <textarea
                    id="contact_message"
                    name="contact_message"
                    placeholder=""
                    className="mt-2 block h-[123px] w-full rounded-[4px] border border-[#313131] bg-[#1B1B1B] px-4 pb-2.5 pt-4 text-white focus:outline-none"
                  ></textarea>
                </div>
              </div>
            </form>
            <div className="my-10 text-center text-white sm:my-6">
              By submitting this form, you provide us with your personal data.
              Read more about processing of your personal data by{" "}
              <span className="text-[#00B87C]">DIALEDWEB</span> and about your
              rights in your{" "}
              <a className="text-[#00B87C]" href="#">
                Privacy Policy
              </a>
              .
            </div>
          </div>
         <Icons />
          <div className="flex justify-center items-center gap-9">
            <button
              className="flex px-4 py-2 whitespace-nowrap rounded-3xl border items-center fontHorizon hover:bg-white/40"
              onClick={() => {
                setContact(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
              >
                <path
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 5 5 15M5 5l10 10"
                ></path>
              </svg>
              CANCEl
            </button>
            <button className="flex gap-1 px-4 py-2 whitespace-nowrap rounded-3xl border items-center fontHorizon hover:bg-white/40 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
              >
                <g
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  clip-path="url(#icon_send_svg__a)"
                >
                  <path d="m18.333 1.667-9.166 9.166M18.333 1.667 12.5 18.333l-3.333-7.5-7.5-3.333z"></path>
                </g>
                <defs>
                  <clipPath id="icon_send_svg__a">
                    <path fill="#fff" d="M0 0h20v20H0z"></path>
                  </clipPath>
                </defs>
              </svg>
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;


const Icons = ()=>{
  return(
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
  )
}