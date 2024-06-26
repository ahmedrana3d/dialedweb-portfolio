import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  shaderMaterial,
  useGLTF,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import { MathUtils } from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

// Define shader material outside the component to avoid recreation on each render
const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 0.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
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
  const texture1 = useVideoTexture("./videos/good_screen.mp4");
  const texture2 = useVideoTexture("./videos/bad_screen.mp4");
  const dispTexture = useTexture("./videos/cells_disp.png");
  const ref = useRef();
  const ref2 = useRef(null);
  const { size } = useThree();
  texture1.flipY = false;
  texture2.flipY = false;

  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  useFrame(() => {
    if (ref.current) {
      ref.current.dispFactor = MathUtils.lerp(
        ref.current.dispFactor,
        hovered ? 1 : 0,
        0.055
      );
    }
    if (ref2.current) {
      easing.damp(ref2.current.rotation, 'x', targetRotation.x, 4, 0.1);
      easing.damp(ref2.current.rotation, 'y', targetRotation.y, 4, 0.1);
    }
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (size.width !== 0 && size.height !== 0) {
        const x = (event.clientX / size.width) * 2 - 1;
        const y = -(event.clientY / size.height) * 2 + 1;
        setTargetRotation({ x: y * 0.1, y: x * 0.1 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size.width, size.height]);

  function setBG(value) {
    hover(value);
  }

  const { nodes, materials } = useGLTF("./models/monitor_simple.glb");

  const { ...matConfig } = {
    color: "#000000",
    metalness:  0.1 ,
    roughness: 0.1 ,
  }

  return (
    <group
      ref={ref2}
      {...props}
      dispose={null}
      scale={[30, 30, 30]}
      position={[0, -30, 0]}
    >
      <group position={[0, -0.055, 0.027]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
        >
          <meshStandardMaterial {...matConfig} />
        </mesh>
        <mesh
          onPointerEnter={() => setBG(true)}
          onPointerLeave={() => setBG(false)}
          castShadow
          receiveShadow
          geometry={nodes.screen.geometry}
          material={materials.Display}
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
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_9.geometry}
      >
        <meshStandardMaterial {...matConfig} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        position={[0, -0.055, 0.027]}
        rotation={[-1.571, 0, 0]}
        scale={0.272}
      >
        <meshStandardMaterial {...matConfig} />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/monitor_simple.glb");
