import React, { useEffect, useRef, useState } from "react";
import Section from "./Section";

export default function Page3() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const word = "BUSINESS";
    setCharacters(word.split(""));
  }, []);
  return (
    <Section>
      <div className="section3 fontHorizon min-w-full  lg:gap-3  z-[2] lg:text-6xl text-1xl flex  items-center justify-center  text-white pt-20 leading-tight font-bold uppercase opacity-0 ">
        {/* <div className="text1 headline-orange">
          <span>ELEVATE</span>
        </div>
        <div className="text2">
          <span>YOUR</span>
        </div>
        <div className="text3">
          {characters.map((char, index) => (
            <span key={index} className="busin inline-block">{char}</span>
          ))}
        </div> */}
        <h1 className="flex items-center  text-yellow-400  ">
          <span className="el inline-block">E</span>
          <span className="el inline-block">L</span>
          <span className="el inline-block">E</span>
          <span className="el inline-block">V</span>
          <span className="el inline-block">A</span>
          <span className="el inline-block">T</span>
          <span className="el inline-block ">E</span>
        </h1>
        {/* <div className="inline-block"></div> */}
        <h1 className="flex items-center  text-yellow-400   ">
          <span className="yo inline-block">Y</span>
          <span className="yo inline-block">O</span>
          <span className="yo inline-block">U</span>
          <span className="yo inline-block">R</span>
        </h1>
        {/* <div className="inline-block"></div> */}
        <h1 className="flex items-center  text-yellow-400  ">
          <span className="bus inline-block">B</span>
          <span className="bus inline-block">U</span>
          <span className="bus inline-block">S</span>
          <span className="bus inline-block">I</span>
          <span className="bus inline-block">N</span>
          <span className="bus inline-block">E</span>
          <span className="bus inline-block">S</span>
          <span className="bus inline-block">S</span>
        </h1>
      </div>
    </Section>
  );
}
