import React, { useState } from "react";
import AnimatedLinks  from "../Home/Components/AnimatedLinks.jsx";


export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);

  const navLinks = [
    {
      title: "PORTFOLIO",
      path: "/",
    },
    {
      title: "LEANR MORE",
      path: "/about",
    },
    {
      title: "CONTACT",
      path: "/projects",
    },
    
  ];

  return (
    <>
      <div className="hidden absolute z-10 w-full h-20  p-6 lg:flex items-center justify-between">
        <Diallogo />
        <div>
        <ul className="flex text-2xl text-white gap-6 items-center justify-center font-serif font-semibold ">
                {navLinks.map((link, i) => {
                  return (
                    <div key={i} className=" relative font-Anto   ">
                      <li
                        to={link.path}
                        className={({ isActive }) =>
                          `${isActive ? "text-amber-400" : ""}`
                        }
                      >
                        <AnimatedLinks title={link.title} />
                      </li>
                    </div>
                  );
                })}
              </ul>
        </div>
      </div>
      {/* BELOW CODE FOR SMALLER DEVICE */}
      <div className="lg:hidden">
        <button
          onClick={() => setMenuOpened(!menuOpened)}
          className="z-20 fixed top-12 right-12 p-3 bg-sky-600 w-11 h-11 rounded-md"
        >
          <div
            className={`bg-white h-0.5 rounded-md w-full transition-all ${
              menuOpened ? "rotate-45  translate-y-0.5" : ""
            }`}
          />
          <div
            className={`bg-white h-0.5 rounded-md w-full my-1 ${
              menuOpened ? "hidden" : ""
            }`}
          />
          <div
            className={`bg-white h-0.5 rounded-md w-full transition-all ${
              menuOpened ? "-rotate-45" : ""
            }`}
          />
        </button>
        <div
          className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-72" : "w-0"}`}
        >
          <div className="flex-1 flex items-center justify-center flex-col gap-6 p-8">
            <Diallogo />
            <MenuButton label="PROJECTS" />
            <MenuButton label="LEARN MORE" />
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
      <div className="keycaps w-64  flex items-center">
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
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer hover:text-sky-600 transition-colors"
    >
      {label}
    </button>
  );
};
