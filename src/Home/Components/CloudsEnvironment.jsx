import React, { useEffect, useRef } from "react";
import { Clouds, Cloud, Environment } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { MeshBasicMaterial } from "three";
import { useThree } from "@react-three/fiber";

const CloudsEnvironment = ({
  position,
  luminanceThreshold,
  intensity,
  enabled,
}) => {
  const cloudsRef = useRef();
  const { size } = useThree();
  const timeRef = useRef(0); // Reference to keep track of time

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (size.width !== 0 && size.height !== 0) {
        const x = (event.clientX / size.width) * 2 - 1;
        const y = -(event.clientY / size.height) * 2 + 1;

        if (cloudsRef.current) {
          cloudsRef.current.position.set(-y * 1.5, x * 1.5, 0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [size.width, size.height]);

  useEffect(() => {
    const animateClouds = () => {
      // Move clouds continuously in one direction
      if (cloudsRef.current) {
        timeRef.current += 0.005; // Adjust speed of movement as needed
        cloudsRef.current.position.x = Math.sin(timeRef.current) * 100; // Adjust amplitude and direction
      }
    };

    const animationFrame = requestAnimationFrame(animateClouds);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const { ...cloudCon } = {
    seed: 12,
    bounds: 140,
    volume: 179,
    growth: -5,
    segments: 20,
    fade: 215,
    color: "#2c5890",
    concentrate: "inside",
  };

  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <Clouds ref={cloudsRef} material={MeshBasicMaterial}>
        <Cloud {...cloudCon} position={[80, -20, position]} />
        <Cloud {...cloudCon} position={[-80, -20, position]} />
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
