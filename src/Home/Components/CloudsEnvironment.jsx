import React, { useEffect, useRef } from "react";
import { Clouds, Cloud, Environment } from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Noise,
  DepthOfField,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";

const CloudsEnvironment = ({
  seed,
  bounds,
  volume,
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

  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <Clouds ref={cloudsRef} material={THREE.MeshBasicMaterial}>
        <Cloud
          seed={seed}
          bounds={bounds}
          volume={volume}
          position={[40, 10, position]}
        />
        <Cloud
          seed={seed}
          bounds={bounds}
          volume={volume}
          position={[-40, 10, position]}
        />
      </Clouds>
      <Environment preset="city" />

      <EffectComposer enabled={enabled}>
        <Bloom
          luminanceThreshold={luminanceThreshold}
          height={300}
          intensity={intensity}
        />
      </EffectComposer>
    </>
  );
};

export default CloudsEnvironment;
