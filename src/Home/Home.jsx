import React, { useEffect, useRef } from "react";
import Experience from "./Experience";
import MainSection from "./MainSection";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import state from "../state/state";

const Home = () => {
  const snapshot = useSnapshot(state);

  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef(null);

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };

  const delayedMouse = useRef({ x: 0, y: 0 });

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const moveCircle = (x, y) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),

      y: lerp(y, mouse.current.y, 0.075),
    };

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);

    window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, []);

  return (
    <div>
      <div
        ref={circle}
        className="cursor fixed top-0 left-0 w-20 h-20 z-20 rounded-full flex justify-center items-center  bg-black  "
        // style={{ background: snapshot.step >= 0 ? "#ff876f" : "red" }}
      >
        {snapshot.step >= 0 ? null: <p>SCROLL</p>}
      </div>
      <Experience />
      <MainSection />
    </div>
  );
};

export default Home;
