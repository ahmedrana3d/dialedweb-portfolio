// import { OrbitControls, Sky } from '@react-three/drei'
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState, useFrame } from "react";
import {
  Float,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import Ufo from "./Components/Models/Ufo";
import { getProject, types } from "@theatre/core";
import DialedWebAnimation from "../Components/animation/cloud-anime.json";
import CloudsEnvironment from "./Components/CloudsEnvironment";
import { useSnapshot } from "valtio";
import state from "../state/state";
import SkySphere from "./Components/SkySphere";
import Stars from "./Components/Stars";
import { editable as e, SheetProvider } from '@theatre/r3f'
// import studio from "@theatre/studio";




// const snapshot  = useSnapshot(state);
// let CLICKED_ENTER = snapshot.step

// CLICKED_ENTER = true
//   state.enterClicked = CLICKED_ENTER

const Experience = () => {
  // studio.initialize()



  const snapshot = useSnapshot(state);
  const enterExpClicked = snapshot.enterClicked

  useEffect(() => {
    if (enterExpClicked == true) {    
      if (snapshot.step === 0 && snapshot.reverse === true ) {
        sheet.sequence.play({ direction: "reverse", range: [2, 6] });
        console.log("First Animation Reverse");
      }  else if (snapshot.step === 1 && snapshot.reverse === false) {
        sheet.sequence.play({ range: [2, 6] });
        console.log("First Animation");
      } else if (snapshot.step === 2 && snapshot.reverse === false) {
        sheet.sequence.play({ range: [6, 9] });
        console.log("Second Animation");
      } else if (snapshot.step === 1 && snapshot.reverse === true) {
        sheet.sequence.play({ direction: "reverse", range: [6, 9] });
        console.log("Second Animation Reversed");
      }
    }
  }, [snapshot.step]); 

  const ufoRef = useRef(null);



let LOAD_PROGRESS = snapshot.loadingProgress





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

  // Theatre JS Animations //////////////////////////////////////

  const cloudsAnimation = sheet.object("Clouds", {
    posZ: -80,
    posX: 40,
    posY: 30,
  });

  const skyColor = sheet.object("Sky Color", {
    topColor: types.rgba({ r: 135, g: 206, b: 235, a: 1 }), // Sky blue
    bottomColor: types.rgba({ r: 255, g: 255, b: 255, a: 1 }), // White
  });

  const starsPos = sheet.object("Stars", {
    posY: 0,
  });

  const bloomPara = sheet.object("Bloom", {
    enabled : false,
    luminanceThreshold : 0,
    intensity : 0
  });





  const [topColor, setTopColor] = useState({ r: 135, g: 206, b: 235, a: 1 }); // Sky blue in hex
  const [bottomColor, setBottomColor] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  }); // White in hex
  // Stars Pos
  const [cloudPosZ, setCloudPosZ] = useState(-80);
  const [starsPosY, setStarsPosY] = useState(-700);
// Bloom Para 

const [bloomEnabled , setbloomEnabled] = useState(false)
const [bloomThreshold , setbloomThreshold] = useState(0)
const [bloomIntensity , setbloomIntensity] = useState(0)



  useEffect(() => {
    cloudsAnimation.onValuesChange((values) => {
      setCloudPosZ(values.posZ);
    });

    starsPos.onValuesChange((values) => {
      setStarsPosY(values.posY);
    });

    skyColor.onValuesChange((colors) => {
      setTopColor(colors.topColor); // Using functional form of setTopColor
      setBottomColor(colors.bottomColor);
    });

    bloomPara.onValuesChange((val) => {
   setbloomEnabled(val.enabled)
   setbloomIntensity(val.intensity)
   setbloomThreshold(val.luminanceThreshold)
    });




  }, []); // Empty dependency array to run only once on component mount

  const { progress } = useProgress();

LOAD_PROGRESS = progress
  state.loadingProgress = LOAD_PROGRESS

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


            <group position={[0, 0, xPosition]}>
              <SheetProvider sheet={sheet}>
              <e.group  theatreKey="Ufo">
            <Ufo ref={ufoRef} position={[0, 0, 0]} />
              </e.group>
              </SheetProvider>
            </group>


          </Float>
          <CloudsEnvironment
            seed={10}
            bounds={50}
            volume={50}
            position={cloudPosZ}
            luminanceThreshold={bloomThreshold} intensity={bloomIntensity} enabled={bloomEnabled} 
          />
          <SkySphere
            topColor={new THREE.Color(topColor.r, topColor.g, topColor.b)}
            bottomColor={
              new THREE.Color(bottomColor.r, bottomColor.g, bottomColor.b)
            }
          />
         
          <Stars posY={starsPosY} />

          {/* <StatsGl/> */}


  

        </Canvas>
      </Suspense>
    </div>
  );
};

export default Experience;
