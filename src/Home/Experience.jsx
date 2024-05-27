// import { OrbitControls, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useGLTF, OrbitControls, Sky, Environment, Clouds, Cloud, CameraControls, Float, useProgress, StatsGl } from '@react-three/drei'
import * as THREE from "three"
import Ufo from './Components/Models/Ufo'
import { getProject, types } from '@theatre/core'
import studio from '@theatre/studio'
import { useControls } from 'leva'
import { Howl } from 'howler';
import { useRecoilState , useRecoilValue } from 'recoil'
import { loadingProgress , enterClicked } from '../state/atoms';
import CloudsEnvironment from './Components/CloudsEnvironment'

studio.initialize()

const Experience = () => {

    const ufoRef = useRef(null);
const [loadProgress , setLoadingProgress] = useRecoilState(loadingProgress)

const enterExpClicked = useRecoilValue(enterClicked)


const sheet = getProject("Demo Project").sheet(
    "Demo Sheet"
  );

useEffect(() => {
    if (enterExpClicked) {
      // Call playAnimation function from Ufo component


      sheet.sequence.play({ range: [0, 2] })

      setTimeout(()=>{
          ufoRef.current.playAnimation();
        }, 1500)
  
  
  
    }
  }, [enterExpClicked]);
  
    

      const cloudsAnimation = sheet.object("Clouds", {
        posZ : -80,
        posX : 40,
        posY : 30,
        
      })
      
 const [cloudPosZ, setcloudPosZ] = useState(-80)
        
      useEffect(() => {
        cloudsAnimation.onValuesChange((values)=>{
            setcloudPosZ(values.posZ)
              })
})




    
    // const cloudParams = useControls("Clouds",{
    //     seed : {min : 1, max : 40, value : 10},
    //     bound : {min : 20, max : 100, value : 50},
    //     value : {min : 20, max : 100, value : 50},
    //     posX : {min : -40, max : 100, value : 40},
    //     posY : {min : -30, max : 0, value : 30},
    //     posZ : {min : -130, max : 80, value : -80},
    //     posX : {min : -80, max : 100, value : 40},
    // })



    const {  progress } = useProgress()
    
    setLoadingProgress(progress)
useEffect(()=>{
    console.log(loadProgress)
}, [loadProgress])
    
    return (
    <div id='canvas-container'>

        <Suspense fallback={<Experience/>}>
  <Canvas id="main-canvas" camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 1.5, 26] }}>

<Float

  speed={3} // Animation speed, defaults to 1
  rotationIntensity={0.2} // XYZ rotation intensity, defaults to 1
  floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
  floatingRange={[-0.03, 0.05]} // Range of y-axis values the object will float within, defaults to [-0.1
>
      <Ufo ref={ufoRef} />
</Float>


<CloudsEnvironment  seed={10} bounds={50} volume={50} position={cloudPosZ}/>

<Sky/>

    </Canvas>
        </Suspense>
    </div>
  )
}

export default Experience
