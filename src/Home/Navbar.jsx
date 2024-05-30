import React, { useState } from "react";
import AnimatedLinks from "../Home/Components/AnimatedLinks.jsx";
import { useSnapshot } from "valtio";
import state from "../state/state.js";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);

  const snapshot = useSnapshot(state);

  const navLinks = [
    {
      title: "PORTFOLIO",
      path: "/",
    },
    {
      title: "LEARN MORE",
      path: "/about",
    },
    {
      title: "CONTACT",
      path: "/projects",
    },
  ];
  // style={{ display: (snapshot.step ===1 ? "block": "none")}}

  return (
    <>
      {snapshot.step === 0 ? (
        <div className="hidden absolute z-40 w-full h-20  p-6 lg:flex items-center justify-between">
          <Diallogo />
          <div>
            <ul className="flex text-2xl text-white gap-6 items-center justify-center font-serif font-semibold ">
              {navLinks.map((link, i) => {
                return (
                  <div key={i} >
                    <li
                      to={link.path}
                    >
                      <AnimatedLinks title={link.title} />
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className=" absolute z-[999] cursor-pointer">
          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className="z-20 fixed top-12 right-12 p-3  bg-transparent  w-24 h-24 rounded-md"
          >
            <div
              className={`bg-black h-0.5 rounded-md w-full transition-all ${
                menuOpened ? "rotate-45  translate-y-0.5" : ""
              }`}
              style={{ background: snapshot.step === 1 ? "white" : "" }}
            />
            <div
              className={`bg-black h-0.5 rounded-md w-full my-3 ${
                menuOpened ? "hidden" : ""
              }`}
              style={{ background: snapshot.step === 1 ? "white" : "" }}
            />
            <div
              className={`bg-black h-0.5 rounded-md w-full transition-all ${
                menuOpened ? "-rotate-45" : ""
              }`}
              style={{ background: snapshot.step === 1 ? "white" : "" }}
            />
          </button>
          <div
            className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
        ${menuOpened ? "w-72" : "w-0"}`}
            style={{
              background: snapshot.step === 1 ? "black" : "",
              color: snapshot.step === 1 ? "white" : "black",
            }}
          >
            <div className="flex-1 flex items-center justify-center flex-col gap-16 p-8">
              <Diallogo />
              <MenuButton label="PROJECTS" />
              <MenuButton label="LEARN MORE" />
              <MenuButton label="CONTACT" />
            </div>
          </div>
        </div>
      )}

      {/* BELOW CODE FOR SMALLER DEVICE */}

      <div className="lg:hidden absolute z-[999] cursor-pointer">
        <button
          onClick={() => setMenuOpened(!menuOpened)}
          className="z-20 fixed top-12 right-12 p-3  bg-transparent  w-24 h-24 rounded-md"
        >
          <div
            className={`bg-black h-0.5 rounded-md w-full transition-all ${
              menuOpened ? "rotate-45  translate-y-0.5" : ""
            }`}
            style={{ background: snapshot.step === 1 ? "white" : "" }}

          />
          <div
            className={`bg-black h-0.5 rounded-md w-full my-3 ${
              menuOpened ? "hidden" : ""
            }`}
            style={{ background: snapshot.step === 1 ? "white" : "" }}

          />
          <div
            className={`bg-black h-0.5 rounded-md w-full transition-all ${
              menuOpened ? "-rotate-45" : ""
            }`}
            style={{ background: snapshot.step === 1 ? "white" : "" }}

          />
        </button>
        <div
          className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-72" : "w-0"}`}
        >
          <div className="flex-1 flex items-center justify-center flex-col gap-16 p-8">
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
      <div className="keycaps w-64  flex items-center select-none">
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
