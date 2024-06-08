
import { useThree } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';


export default function Stars ({posY}) {
  const pointsRef = useRef();


  const starsRef = useRef()

  const { size } = useThree();
    
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Ensure that viewport width and height are non-zero
      if (size.width !== 0 && size.height !== 0) {
        const x = (event.clientX / size.width) * 2 - 1;
        const y = -(event.clientY / size.height) * 2 + 1;

        starsRef.current.position.set(-y * 3.5, x * 3.5, 0); // Adjust the scaling factor if needed
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [size.width, size.height]);


  useEffect(() => {
    // Generate random vertices
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(1000);
      const y = THREE.MathUtils.randFloatSpread(1000);
      const z = THREE.MathUtils.randFloatSpread(800);
      vertices.push(x, y, z);
    }

    // Create geometry and material
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const starTexture = new THREE.TextureLoader().load("./textures/star_07.png")
    const material = new THREE.PointsMaterial({ color: 0x888888, size: 5, map : starTexture, transparent : true, });

    // Create points and set reference
    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
  }, []);



  return (



<group position={[0 , posY , 0]}>
<group ref={starsRef}>


    {pointsRef.current ? <primitive  object={pointsRef.current} /> : null}

</group>
</group>


 
);
};