
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function Globe(props) {
  const { nodes, materials } = useGLTF('models/globe-v1.glb')

  const globeRef = useRef()

  useFrame((state) => {
    if (globeRef.current) {
      // pointsRef.current.material.color.setHSL((state.clock.getElapsedTime() * 0.1) % 1, 0.5, 0.5);
      globeRef.current.rotation.y += 0.006;
    }
  });




  return (
    <group {...props} ref={globeRef} dispose={null}>
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
