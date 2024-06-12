import React from "react";
import Section from "./Section";

function Page4() {
  return (
    <Section>
      <div className="section4 w-full h-screen flex flex-col items-center  justify-around fontHorizon text-white opacity-0  ">
        <div className="compet w-full h-[100px]  text-center animate-levitate">
          <p className="headline-orange lg:text-8xl text-5xl">OUTSHINE</p>
          <p className="text-3xl lg:text-7xl ">YOUR COMPETITORS</p>
        </div>
        <div className="important w-full h-[150px] text-2xl lg:text-5xl text-center flex items-center justify-center p-4">
          <h1 className="font-bold tracking-wide drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 shimmer">
            BUT WHY IS A GREAT WEBSITE SO IMPORTANT?
          </h1>
        </div>
      </div>
    </Section>
  );
}

export default Page4;
