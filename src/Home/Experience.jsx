// import { OrbitControls, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState, useFrame } from 'react'
import { Sky, Float, useProgress, StatsGl, OrbitControls } from '@react-three/drei'
import * as THREE from "three"
import Ufo from './Components/Models/Ufo'
import { getProject, types } from '@theatre/core'
import DialedWebAnimation from "../../public/animation/cloud-anime.json";
import { useRecoilState , useRecoilValue } from 'recoil'
import { loadingProgress , enterClicked } from '../state/atoms';
import CloudsEnvironment from './Components/CloudsEnvironment'
import { useSnapshot } from 'valtio';
import state from '../state/state'; // Import the shared state
// import studio from '@theatre/studio'
import SkySphere from './Components/SkySphere'
import Stars from './Components/Stars'


const Experience = () => {

  // studio.initialize()

  const triggerAnimation = (step) => {
    // Define your animations based on the step
    if (step === 0) {
      sheet.sequence.play({ direction: 'reverse', range : [2 , 6] })
      console.log("First Animation");




    } else if (step === 1) {
      sheet.sequence.play({ range: [2, 6] });
      console.log("Second Animation");
    } 

  };



  const snapshot = useSnapshot(state);


useEffect(()=>{
  triggerAnimation(snapshot.step)
}, [snapshot])


  const ufoRef = useRef(null);
  const [loadProgress, setLoadingProgress] = useRecoilState(loadingProgress);

  const enterExpClicked = useRecoilValue(enterClicked);


const sheet = getProject("Demo Project", {state : DialedWebAnimation} ).sheet(
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
 posY : 0
  });




  const [topColor, setTopColor] = useState({ r: 135, g: 206, b: 235, a: 1 }); // Sky blue in hex
  const [bottomColor, setBottomColor] = useState({ r: 255, g: 255, b: 255, a: 1 }); // White in hex
  // Stars Pos 
  const [cloudPosZ, setCloudPosZ] = useState(-80);
  const [starsPosY, setStarsPosY] = useState(-700);
  
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
  }, []); // Empty dependency array to run only once on component mount
  


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
            <Ufo ref={ufoRef} />
          </Float>
          <CloudsEnvironment
            seed={10}
            bounds={50}
            volume={50}
            position={cloudPosZ}
            />
<SkySphere topColor={new THREE.Color(topColor.r, topColor.g, topColor.b)} bottomColor={new THREE.Color(bottomColor.r, bottomColor.g, bottomColor.b)} />
{/* #47A2D6 */}
           <Stars posY={starsPosY}/> 



<StatsGl/>

        </Canvas>
      </Suspense>
    </div>
  );
};

export default Experience;




