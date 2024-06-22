/* eslint-disable react-refresh/only-export-components */

import React, { useEffect, useImperativeHandle, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
export default React.forwardRef(function Ufo(props, ref) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/Animated.glb");
  const { actions, names } = useAnimations(animations, group);

  const ufo_body = useRef();
  const ufo_disk = useRef()
//   useEffect(()=>{
//   const subDiv_ufo = ufo_disk.current.material
// subDiv_ufo.roughness = 0
// subDiv_ufo.metalness = 1
// subDiv_ufo.color = new THREE.Color("#212121")

// console.log(subDiv_ufo.metalness)

// // subDiv_ufo.Matalic = Matalic
// },[])



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

  // useFrame(() => {
  //   ufo_body.current.rotation.z += 0.02;
  // });

  return (
    <group ref={group} position={[0, 0.5, 0]} {...props} dispose={null}>
    <group name="Scene">
        <group name="Empty" position={[13.851, 0.013, 0.001]}>
          <group
            name="Disc_1"
            position={[-27.414, 7.236, -13.029]}
            rotation={[0.472, 0.07, 0]}
            scale={0.006}>
            <mesh
              name="Mesh002"
              castShadow
              receiveShadow
              geometry={nodes.Mesh002.geometry}
              material={materials['Scratched Silver Metal.001']}
            />
            <mesh
              name="Mesh002_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh002_1.geometry}
              material={materials['Material.004']}
            />
          </group>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload("models/Animated.glb");
