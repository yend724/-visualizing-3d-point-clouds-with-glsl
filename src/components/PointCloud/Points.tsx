import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createCirclePoints } from './utils';
import VertexShader from './shaders/vertex.glsl?raw';
import FragmentShader from './shaders/fragment.glsl?raw';

const POSITIONS = new Float32Array([
  ...createCirclePoints({ radius: 0.2, height: 0.5, divisions: 100 }),
  ...createCirclePoints({ radius: 0.5, height: 0.5, divisions: 100 }),
  ...createCirclePoints({ radius: 1.0, height: 0.5, divisions: 100 }),
  ...createCirclePoints({ radius: 1.5, height: 0.5, divisions: 100 }),
  ...createCirclePoints({ radius: 2.0, height: 0.5, divisions: 100 }),
  ...createCirclePoints({ radius: 2.5, height: 0.5, divisions: 100 }),
]);

export const Points: React.FC = () => {
  const ref =
    useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  useFrame(gl => {
    const { clock } = gl;
    if (ref.current) {
      ref.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={POSITIONS}
          itemSize={3}
          count={POSITIONS.length / 3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VertexShader}
        fragmentShader={FragmentShader}
        uniforms={{
          uDistanceRangeMax: { value: 3 },
          uPointSize: { value: 5 },
          uTime: { value: 0 },
        }}
      />
    </points>
  );
};
