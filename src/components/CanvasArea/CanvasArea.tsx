import { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { createCirclePoints } from './utils';
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import VertexShader from './shaders/vertex.glsl?raw';
import FragmentShader from './shaders/fragment.glsl?raw';

const positions = new Float32Array([
  ...createCirclePoints({ radius: 0.2, height: 0, divisions: 100 }),
  ...createCirclePoints({ radius: 0.5, height: 0.1, divisions: 100 }),
  ...createCirclePoints({ radius: 1.0, height: 0.2, divisions: 100 }),
  ...createCirclePoints({ radius: 1.5, height: 0.3, divisions: 100 }),
  ...createCirclePoints({ radius: 2.0, height: 0.4, divisions: 100 }),
  ...createCirclePoints({ radius: 2.5, height: 0.5, divisions: 100 }),
]);
const cameraInitPosition = new THREE.Vector3(0, 2.5, 5);

const Shader: React.FC = () => {
  const ref = useRef<THREE.Points>(null!);
  useFrame(gl => {
    const { clock } = gl;
    if (ref.current) {
      (ref.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        clock.getElapsedTime();
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={positions.length / 3}
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
export const CanvasArea: React.FC = () => {
  return (
    <div className="canvas-area">
      <Canvas camera={{ position: cameraInitPosition }}>
        <OrbitControls enablePan enableRotate />
        <gridHelper />
        <Shader />
        <GizmoHelper alignment="top-right">
          <GizmoViewport />
        </GizmoHelper>
      </Canvas>
    </div>
  );
};
