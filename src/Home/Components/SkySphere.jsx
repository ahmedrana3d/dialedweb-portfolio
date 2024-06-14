
import {BackSide, ShaderMaterial} from 'three';
const SkySphere = ({topColor, bottomColor}) => {
  // Custom shader material
  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      topColor: { value: topColor },
      bottomColor: { value: bottomColor },
      offset: { value: 200 },
      exponent: { value: 0.6 }
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
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + offset).y;
        gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
      }
    `,
    side: BackSide
  });

  return (
    <mesh scale={[400, 400, 400]}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}

export default SkySphere
