/* eslint-disable react-refresh/only-export-components */

import React, { useEffect, useImperativeHandle, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
export default React.forwardRef(function Ufo(props, ref) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/UFO-v1.glb");
  const { actions, names } = useAnimations(animations, group);

  const ufo_body = useRef();
  const ufo_disk = useRef()
  useEffect(()=>{
  const subDiv_ufo = ufo_disk.current.material
subDiv_ufo.roughness = 0
subDiv_ufo.metalness = 1
subDiv_ufo.color = new THREE.Color("#212121")

console.log(subDiv_ufo.metalness)

// subDiv_ufo.Matalic = Matalic
},[])



  const playAnimation = () => {
    if (actions && names.length > 0) {
      const firstAnimation = actions[names[0]];
      firstAnimation.clampWhenFinished = true;
      firstAnimation.loop = THREE.LoopOnce;
      firstAnimation.play();
    }
  };

  // Forwarding the ref
  useImperativeHandle(ref, () => ({
    playAnimation,
  }));

  useFrame(() => {
    ufo_body.current.rotation.z += 0.02;
  });

  return (
    <group ref={group} position={[0, 0.5, 0]} {...props} dispose={null}>
      <group name="Scene">
        <group
          ref={ufo_body}
          name="Space_ship_1__Copy_"
          position={[19.592, 14.586, -5.837]}
          rotation={[Math.PI / 2, Math.PI / 6, -Math.PI / 2]}
          scale={0.01}
        >
          <mesh
            name="Subdivision_Surface001"
            castShadow
            receiveShadow
            geometry={nodes.Subdivision_Surface001.geometry}
            material={materials["Scratched Silver Metal.001"]}
            position={[0, -0.017, 211.25]}
            rotation={[0, 0, 2.386]}
          >
            <mesh
              name="Cloner_1"
              castShadow
              receiveShadow
              geometry={nodes.Cloner_1.geometry}
              material={materials["Material.004"]}
              position={[0, 0, 52.725]}
            />
            <mesh
            ref={ufo_disk}
              name="Disc_1"
              castShadow
              receiveShadow
              geometry={nodes.Disc_1.geometry}
              material={materials["Scratched Silver Metal.001"]}
              position={[-1.519, 4.138, 90.343]}
              rotation={[Math.PI, 0, 0]}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload("models/UFO-v1.glb");
