import React, { Suspense, useEffect, useRef, useState } from 'react'
import { shaderMaterial, useGLTF, useTexture, useVideoTexture } from '@react-three/drei'
import {  MathUtils } from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three';

// Define shader material outside the component to avoid recreation on each render
const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 0.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,

  ` 
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float dispFactor;
    uniform float effectFactor;

    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);

      vec2 distortedPosition = vec2(uv.y + dispFactor * (disp.r*effectFactor), uv.x);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

      vec4 _texture = texture2D(tex, uv);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      
      gl_FragColor = finalTexture;
    }`
);

extend({ ImageFadeMaterial });






export default function Monitor(props) {
  const [hovered, hover] = useState(false);
  const texture1 = useVideoTexture('./videos/good_screen.mp4');
  const texture2 = useVideoTexture('./videos/bad_screen.mp4');
  const dispTexture = useTexture('./videos/cells_disp.png');
  const ref = useRef();
  const ref2 = useRef(null);
  const { size } = useThree();
  texture1.flipY = false;
  texture2.flipY = false;

  

  useFrame(() => {
    if (ref.current) {
      ref.current.dispFactor = MathUtils.lerp(ref.current.dispFactor, hovered ? 1 : 0, 0.055);
    }
  });





  useEffect(() => {
    const handleMouseMove = (event) => {
      if (size.width !== 0 && size.height !== 0) {
        const x = (event.clientX / size.width) * 2 - 1;
        const y = -(event.clientY / size.height) * 2 + 1;
        ref2.current.rotation.set(-y * 0.1, x * 0.1, 0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size.width, size.height]);





  function setBG(value) {
    hover(value);
  }

  useEffect(() => {
    if (ref2.current) console.log(ref2.current);
  }, []);

  const { nodes, materials } = useGLTF('./models/simple_monitor.glb');

  return (
    <group {...props} dispose={null} scale={[35, 35, 35]} position={[0, -45, 0]} ref={ref2}>
      <group position={[0, 1.775, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials.GLASS} />
        <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials.BOTTOM_LINE} />
        <mesh
          onPointerEnter={() => setBG(true)}
          onPointerLeave={() => setBG(false)}
          castShadow
          receiveShadow
          geometry={nodes.screen.geometry}
          material={materials.GLASS}
        >
          <Suspense fallback={null}>
            <imageFadeMaterial
              transparent={true}
              ref={ref}
              key={ImageFadeMaterial.key}
              tex={texture1}
              tex2={texture2}
              disp={dispTexture}
              toneMapped={false}
            />
          </Suspense>
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials.FRAME} />
        <mesh castShadow receiveShadow geometry={nodes.Object_2_1.geometry} material={materials.BOTTOM_LINE} />
      </group>
    </group>
  );
}

useGLTF.preload('./models/simple_monitor.glb');
