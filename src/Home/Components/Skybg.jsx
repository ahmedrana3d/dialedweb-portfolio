import { Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import React from "react";
import * as THREE from "three";

export default function SkyBg() {
  return (
    <>
      <Sphere scale={[20, 20, 20]} rotation-y={Math.PI / 2}>
        <LayerMaterial
          lighting="physical"
          transmission={1}
          side={THREE.BackSide}
        >
          <Gradient
            colorA={"#357ca1"}
            colorB={"white"}
            axes={"y"}
            start={0}
            end={-2}
          />
        </LayerMaterial>
      </Sphere>
    </>
  );
}
