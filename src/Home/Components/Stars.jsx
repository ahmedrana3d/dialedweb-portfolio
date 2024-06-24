import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import {MathUtils,BufferGeometry,Float32BufferAttribute,TextureLoader,PointsMaterial,AdditiveBlending,Points} from 'three';

export default function Stars({ posY, opacity , StarSize , starsColor}) {
  const pointsRef = useRef();
  const starsRef = useRef();
  const { size } = useThree();





  useEffect(() => {
    const handleMouseMove = (event) => {
      if (size.width !== 0 && size.height !== 0) {
        const x = (event.clientX / size.width) * 2 - 1;
        const y = -(event.clientY / size.height) * 2 + 1;
        starsRef.current.position.set(-y * 3.5, x * 3.5, 0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size.width, size.height]);

  useEffect(() => {
    const vertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = MathUtils.randFloatSpread(800);
      const y = MathUtils.randFloatSpread(1000);
      const z = MathUtils.randFloatSpread(200);
      vertices.push(x, y, z);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

    const starTexture = new TextureLoader().load('/textures/star_07.png');
    const material = new PointsMaterial({
      color: starsColor,
      size: size,
      map: starTexture,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      opacity: 0.8,
      toneMapped : false,
    });

    const points = new Points(geometry, material);
    pointsRef.current = points;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // pointsRef.current.material.color.setHSL((state.clock.getElapsedTime() * 0.1) % 1, 0.5, 0.5);
      pointsRef.current.material.opacity = opacity;
      pointsRef.current.material.size = StarSize;
      pointsRef.current.material.color = starsColor;
    }
  });

  return (
    <group position={[0, posY, -150]}>
      <group ref={starsRef}>
        {pointsRef.current ? <primitive object={pointsRef.current} /> : null}
      </group>
    </group>
  );
}
