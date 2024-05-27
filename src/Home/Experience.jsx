// import { OrbitControls, Sky } from '@react-three/drei'
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState, useFrame } from "react";
import { Sky, Float, useProgress, StatsGl } from "@react-three/drei";
import * as THREE from "three";
import Ufo from "./Components/Models/Ufo";
import { getProject, types } from "@theatre/core";

import DialedWebAnimation from "../../public/animation/cloud-anime.json";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingProgress, enterClicked } from "../state/atoms";
import CloudsEnvironment from "./Components/CloudsEnvironment";

// studio.initialize()

const Experience = () => {
  const ufoRef = useRef(null);
  const [loadProgress, setLoadingProgress] = useRecoilState(loadingProgress);

  const [xPosition, setXPosition] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // Adjust xPosition based on screen size
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        // Adjust this breakpoint according to your design
        setXPosition(-7);
      } else {
        setXPosition(0);
      }
    };

    handleResize(); // Call it once to set initial position

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const enterExpClicked = useRecoilValue(enterClicked);

  const sheet = getProject("Demo Project", { state: DialedWebAnimation }).sheet(
    "Demo Sheet"
  );

  useEffect(() => {
    if (enterExpClicked) {
      // Call playAnimation function from Ufo component

      sheet.sequence.play({ range: [0, 2] });

      setTimeout(() => {
        ufoRef.current.playAnimation();
      }, 1500);
    }
  }, [enterExpClicked]);

  const cloudsAnimation = sheet.object("Clouds", {
    posZ: -80,
    posX: 40,
    posY: 30,
  });

  const [cloudPosZ, setcloudPosZ] = useState(-80);

  useEffect(() => {
    cloudsAnimation.onValuesChange((values) => {
      setcloudPosZ(values.posZ);
    });
  });

  const { progress } = useProgress();

  setLoadingProgress(progress);

  return (
    <div id="canvas-container">
      <Suspense fallback={<Experience />}>
        <Canvas
          id="main-canvas"
          camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 1.5, 26] }}
        >
          <Float
            speed={2} // Animation speed, defaults to 1
            rotationIntensity={0.2} // XYZ rotation intensity, defaults to 1
            floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.01, 0.01]} // Range of y-axis values the object will float within, defaults to [-0.1 ]
          >
            <Ufo ref={ufoRef} position={[0, 0, xPosition]} />
          </Float>
          <CloudsEnvironment
            seed={10}
            bounds={50}
            volume={50}
            position={cloudPosZ}
          />

          <Sky />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Experience;
