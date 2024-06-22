import React from "react";
import Section from "../Section";
import Faq from "./Faq";

export default function Page9() {
  return (
    <Section>
      <div className="section9 w-full h-screen p-6 opacity-0">
        <h1 className="text-center text-5xl text-white mb-20 uppercase font-horizon">
          Our <span className="text-[#38b6ff] font-horizon ">methodology</span>
        </h1>
        <div className="lg:max-w-[60%] mx-auto">
          <Faq />
        </div>
      </div>
    </Section>
  );
}
