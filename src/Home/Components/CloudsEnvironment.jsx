import React, { useEffect, useRef } from "react";
import { Clouds, Cloud, Environment } from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";
import {MeshBasicMaterial} from "three";
import { useThree } from "@react-three/fiber";

const CloudsEnvironment = ({
  position,
  luminanceThreshold,
  intensity,
  enabled,
}) => {
  const cloudsRef = useRef();
  const { size } = useThree();

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Ensure that viewport width and height are non-zero
      if (size.width !== 0 && size.height !== 0) {
        const x = (event.clientX / size.width) * 2 - 1;
        const y = -(event.clientY / size.height) * 2 + 1;

        if (cloudsRef.current) {
          cloudsRef.current.position.set(-y * 1.5, x * 1.5, 0); // Adjust the scaling factor if needed
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [size.width, size.height]);

  // Dispose EffectComposer if it has cleanup logic
  useEffect(() => {
    return () => {
      // Additional cleanup if needed for EffectComposer
    };
  }, []);



  const { ...cloudCon} =  {
    seed :  12,
    bounds :  140,
    volume : 179,
    growth : -5,
    segments: 20, 
    fade:  215, 
    color: "#2c5890",
    concentrate : 'inside'
    
    
    
  }






  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <Clouds ref={cloudsRef} material={MeshBasicMaterial}>
        <Cloud
   {...cloudCon}
          position={[80, -20, position]}
        />
        <Cloud
     {...cloudCon}
          position={[-80, -20, position]}
        />
      </Clouds>
      <Environment preset="city" />

      <EffectComposer enabled={enabled}>
        <Bloom
          luminanceThreshold={luminanceThreshold}
          height={300}
          intensity={intensity}
          levels={6}
          radius={0.8}
        />

      </EffectComposer>
    </>
  );
};

export default CloudsEnvironment;
