import {  useRef } from "react";

import {
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
  Page7,
  Page8,
} from "./Pages";

import "./page.css";

const MainSection = () => {
  const sec2 = useRef();
  return (
    <>
      <main className="mainsection fixed w-full h-screen top-0 left-0  ">
        <Page1 />
        <Page2 sec2={sec2} />
        <Page3 />
        <Page5 />
        <Page6 />
        <Page7 />
        <Page8 />
      </main>
      <Page4 />
    </>
  );
};

export default MainSection;
