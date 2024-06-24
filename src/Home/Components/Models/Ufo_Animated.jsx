/* eslint-disable react-refresh/only-export-components */

import React, { useEffect, useImperativeHandle, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
export default React.forwardRef(function Ufo_Animated(props, ref) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/c1.glb");
  const { actions, names, mixer } = useAnimations(animations, group);

  const ufo_body = useRef();
  const ufo_disk = useRef()



  const playAnimation = (index, reverse = false, fadeDuration = 0.5) => {
    if (actions && names.length > 0 && index >= 0 && index < names.length) {
      const animation = actions[names[index]];
      animation.clampWhenFinished = true;
      animation.loop = THREE.LoopOnce;


      // mixer.removeEventListener("finished" , handleFinishedAnimation)

  // Remove previous event listeners to avoid multiple triggers
  // mixer.removeEventListener('finished', handleFinished);

  // Add an event listener to play "Animation5" when any animation ends
  // mixer.addEventListener('finished', () => {
  //   const specificAnimationIndex = names.indexOf('Animation5');
  //   if (specificAnimationIndex >= 0) {
  //     playAnimation(specificAnimationIndex, false, fadeDuration, true); // Play Animation5 in loop
  //   } else {
  //     console.error('Animation5 not found in names array.');
  //   }
  // });

  
      // // Remove previous event listeners to avoid multiple triggers
      // animation.off('finished');
  
      // // Add an event listener to play "Animation5" when any animation ends
  
      if (reverse) {
        animation.timeScale = -1; // Play the animation in reverse
        animation.time = animation.getClip().duration; // Start from the end
      } else {
        animation.timeScale = 1; // Play the animation normally
        animation.time = 0; // Start from the beginning
      }
  
      // Fade out all other animations
      for (let i = 0; i < names.length; i++) {
        if (i !== index) {
          actions[names[i]].fadeOut(fadeDuration);
        }
      }
  
      // Fade in the current animation
      animation.reset().fadeIn(fadeDuration).play();
    } else {
      console.error("Invalid animation index or actions/names array is empty.");
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
        <group
        ref={ufo_body}
          name="Empty"
          position={[0.2, 1.138, 32.812]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={1.6}>
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

useGLTF.preload("models/c1.glb");
