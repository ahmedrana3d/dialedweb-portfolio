
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

export default function Globe(props) {
  const { nodes, materials } = useGLTF('models/globe-v1.glb')

  const globeRef = useRef()

  useFrame((state) => {
    if (globeRef.current) {
      // pointsRef.current.material.color.setHSL((state.clock.getElapsedTime() * 0.1) % 1, 0.5, 0.5);
      globeRef.current.rotation.y += 0.006;
    }
  });



  const [xPosition, setXPosition] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // Adjust xPosition based on screen size
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        // Adjust this breakpoint according to your design
        setXPosition(18.4);
      } else {
        setXPosition(0);
      }
    };

    handleResize(); // Call it once to set initial position

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <group {...props} ref={globeRef} position={[xPosition, 0 , 0]} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.PaletteMaterial001}
        position={[0, -0.191, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials.PaletteMaterial002}
        scale={[0.568, 0.568, 0.698]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials.PaletteMaterial003}
        scale={[0.568, 0.568, 0.698]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_10.geometry}
        material={materials.PaletteMaterial004}
      />
    </group>
  )
}

useGLTF.preload('models/globe-v1.glb')
