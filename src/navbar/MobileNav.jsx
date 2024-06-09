import React from "react";
import Contact from "../Home/Contact";

function MobileNav() {
  return (
    <>
      <div className="lg:hidden absolute top-0 right-0 w-full h-14 px-1 z-10 flex items-center justify-between  ">
        <div>
          <Diallogo />
        </div>
        <div className="z-50">
          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className="  bg-transparent  w-10  rounded-md"
          >
            <div
              className={`bg-black h-0.5 rounded-md w-full transition-all  ${
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
          className={`z-10 fixed top-0 right-0 bottom-0 transition-all duration-1000 overflow-hidden flex flex-col
  ${menuOpened ? "w-full" : "w-0"}`}
          style={{
            background: snapshot.step > 0 ? "black" : "white",
            color: snapshot.step > 0 ? "white" : "black",
          }}
        >
          <div className="flex-1 flex items-center justify-center flex-col gap-16 p-8 ">
            <div className="navLinks">
              <MenuButton label="PROJECTS" />
            </div>
            <div className="navLinks">
              <MenuButton label="LEARN " />
            </div>
            <div
              className="navLinks"
              onClick={(e) => {
                e.preventDefault();

                handleContact();
              }}
            >
              <MenuButton label="CONTACT" />
            </div>
          </div>
        </div>
      </div>
      <Contact contact={contact} setContact={setContact} />
    </>
  );
}

export default MobileNav;

const MenuButton = (props) => {
    const { label } = props;
    return (
      <p className=" lg:text-6xl text-3xl font-bold fontHorizon cursor-pointer  transition-all">
        {label}
      </p>
    );
  };