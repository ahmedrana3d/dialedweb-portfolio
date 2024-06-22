import { useRef } from 'react';
import { BackSide, ShaderMaterial, Color } from 'three';
import { useFrame } from '@react-three/fiber';

const SkySphere = ({ topRightColor, mainColor, bottomLeftColor }) => {
  const shaderMaterialRef = useRef();

  // Custom shader material
  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      topRightColor: { value: new Color(topRightColor) },
      mainColor: { value: new Color(mainColor) },
      bottomLeftColor: { value: new Color(bottomLeftColor) },
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 topRightColor;
      uniform vec3 mainColor;
      uniform vec3 bottomLeftColor;
      varying vec3 vWorldPosition;

      void main() {
        vec3 color;
        vec3 normalizedPosition = normalize(vWorldPosition);

        // Calculate weights for blending
        float weightTopRight = smoothstep(0.0, 1.0, dot(normalizedPosition, vec3(1.0, 1.0, 0.0)));
        float weightBottomLeft = smoothstep(0.0, 1.0, dot(normalizedPosition, vec3(-1.0, -1.0, 0.0)));
        float weightMain = 1.0 - weightTopRight - weightBottomLeft;

        // Blend the colors
        color = weightTopRight * topRightColor + weightMain * mainColor + weightBottomLeft * bottomLeftColor;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: BackSide
  });

  useFrame(() => {
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.topRightColor.value = new Color(topRightColor);
      shaderMaterialRef.current.uniforms.mainColor.value = new Color(mainColor);
      shaderMaterialRef.current.uniforms.bottomLeftColor.value = new Color(bottomLeftColor);
    }
  });

  return (
    <mesh scale={[400, 400, 400]}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive ref={shaderMaterialRef} object={shaderMaterial} attach="material" />
    </mesh>
  );
}

export default SkySphere;
