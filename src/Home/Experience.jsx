// import { OrbitControls, Sky } from '@react-three/drei'
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Float, OrbitControls, StatsGl, useProgress } from "@react-three/drei";
import {Color} from "three";
import Ufo from "./Components/Models/Ufo";
import { getProject, types } from "@theatre/core";
import DialedWebAnimation from "../Components/animation/cloud-anime.json";
import CloudsEnvironment from "./Components/CloudsEnvironment";
import { useSnapshot } from "valtio";
import state from "../state/state";
import SkySphere from "./Components/SkySphere";
import Stars from "./Components/Stars";
import { editable as e, SheetProvider } from "@theatre/r3f";
// import studio from "@theatre/studio";
import Globe from "./Components/Models/Globe";
import Monitor from "./Components/Models/Monitor";
import MonitorBox from "./Components/Models/MonitorBox";
import ChessBoard from "./Components/Models/ChessBoard";

// const snapshot  = useSnapshot(state);
// let CLICKED_ENTER = snapshot.step

// CLICKED_ENTER = true
//   state.enterClicked = CLICKED_ENTER

const Experience = () => {
  // studio.initialize()

  const snapshot = useSnapshot(state);
  const enterExpClicked = snapshot.enterClicked;

  useEffect(() => {
    if (enterExpClicked) {
      const animations = [
        { step: 0, reverse: true, direction: "reverse", range: [2, 6], message: "First Animation Reverse" },
        { step: 1, reverse: false, range: [2, 6], message: "First Animation" },
        { step: 2, reverse: false, range: [6, 8], message: "Second Animation" },
        { step: 1, reverse: true, direction: "reverse", range: [6, 8], message: "Second Animation Reversed" },
        { step: 2, reverse: true, direction: "reverse", range: [8, 9], message: "Third Animation Reversed" },
        { step: 3, reverse: false, range: [8, 9], message: "Third Animation" },
        { step: 4, reverse: false, range: [9, 10.5], message: "Third Animation" },
        { step: 3, reverse: true, direction: "reverse", range: [9, 10.5], message: "Third Animation" },
        { step: 5, reverse: false, range: [10.5, 12], message: "Third Animation" },
        { step: 4, reverse: true, direction: "reverse", range: [10.5, 12], message: "Third Animation" },
        { step: 6, reverse: false, range: [12, 13.5], message: "Third Animation" },
        { step: 5, reverse: true, direction: "reverse", range: [12, 13.5], message: "Third Animation" },
        { step: 7, reverse: false, range: [13.5 , 14.5], message: "Third Animation" },
        { step: 6, reverse: true, direction: "reverse", range: [13.5 , 14.5], message: "Third Animation" },
      ];
  
      const animation = animations.find(anim => anim.step === snapshot.step && anim.reverse === snapshot.reverse);
  
      if (animation) {
        sheet.sequence.play({ direction: animation.direction, range: animation.range });
        console.log(snapshot.step , snapshot.reverse);
      }
    }
  }, [snapshot.step]);
  

  const ufoRef = useRef(null);

  let LOAD_PROGRESS = snapshot.loadingProgress;

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
    topColor: types.rgba({ r: 92, g: 83, b: 204, a: 1 }), // #5C53CC
    bottomColor: types.rgba({ r: 153, g: 147, b: 223, a: 1 }), // #9993DF
  });
  

  const starsPos = sheet.object("Stars", {
    posY: 0,
    opacity : 0.8,
    size : 5,
    color : types.rgba({ r: 136, g: 136, b: 136, a: 1 }),
  });

  const bloomPara = sheet.object("Bloom", {
    enabled: false,
    luminanceThreshold: 0,
    intensity: 0,
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
  const [starsSize, setStarsSize] = useState(5);
  const [starsColor, setStarsColor] = useState({ r: 136, g: 136, b: 136, a: 1 });

  // Bloom Para

  const [bloomEnabled, setbloomEnabled] = useState(false);
  const [bloomThreshold, setbloomThreshold] = useState(0);
  const [bloomIntensity, setbloomIntensity] = useState(0);
  
  // Stars ////////////////
  
  const [starsOpacity, setstarsOpacity] = useState(0.8);
  

  useEffect(() => {
    cloudsAnimation.onValuesChange((values) => {
      setCloudPosZ(values.posZ);
    });

    starsPos.onValuesChange((values) => {
      setStarsPosY(values.posY);
      setstarsOpacity(values.opacity)
      setStarsSize(values.size)
      setStarsColor(values.color)
    });

    skyColor.onValuesChange((colors) => {
      setTopColor(colors.topColor); // Using functional form of setTopColor
      setBottomColor(colors.bottomColor);
    });

    bloomPara.onValuesChange((val) => {
      setbloomEnabled(val.enabled);
      setbloomIntensity(val.intensity);
      setbloomThreshold(val.luminanceThreshold);
    });
  }, []); // Empty dependency array to run only once on component mount

  const { progress } = useProgress();

  LOAD_PROGRESS = progress;
  state.loadingProgress = LOAD_PROGRESS;

  const [xPosition, setXPosition] = useState(0);
const [monitorScale, setMonitorScale] = useState(1)
  useEffect(() => {
    const handleResize = () => {
      // Adjust xPosition based on screen size
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        // Adjust this breakpoint according to your design
        setXPosition(-9);
      } else {
        setXPosition(0);
      }





    };

    handleResize(); // Call it once to set initial position

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // const depthBuffer = useDepthBuffer({ frames: 1 })




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
                <e.group theatreKey="Ufo">
                  <Ufo ref={ufoRef} position={[0,0 , 0]} >
                  </Ufo>
                </e.group>


<e.group theatreKey="Globe" position={[-8.1299, -22 , 0]} scale={[0.45,0.45,0.45]}>
<Globe/>
</e.group>

<group scale={[monitorScale,monitorScale,monitorScale]}>
<e.group theatreKey="Monitors"  scale={[0,0,0]}>
  {/* <e.group theatreKey="Monitor"> */}
<Monitor />
  {/* </e.group> */}
  {/* <e.group theatreKey="Monitor Box"> */}
<MonitorBox />
  {/* </e.group> */}
</e.group>
</group>

<e.group theatreKey="Chess Board" scale={[0,0,0]}>
<ChessBoard/>
</e.group>




              </SheetProvider>
            </group>
          </Float>



     

          <CloudsEnvironment
            seed={10}
            bounds={50}
            volume={50}
            position={cloudPosZ}
            luminanceThreshold={bloomThreshold}
            intensity={bloomIntensity}
            enabled={bloomEnabled}
          />
          <SkySphere
            topColor={new Color(topColor.r, topColor.g, topColor.b)}
            bottomColor={
              new Color(bottomColor.r, bottomColor.g, bottomColor.b)
            }
            
          />

          <Stars posY={starsPosY} opacity={starsOpacity} StarSize={starsSize} starsColor={new Color(starsColor.r, starsColor.g, starsColor.b)}/>


{/* <OrbitControls/> */}

          {/* <StatsGl/> */}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Experience;
