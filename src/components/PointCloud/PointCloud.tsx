import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Points } from './Points';

const cameraInitPosition = new THREE.Vector3(0, 2.5, 5);

export const PointCloud: React.FC = () => {
  return (
    <div className="canvas-area">
      <Canvas camera={{ position: cameraInitPosition }}>
        <OrbitControls makeDefault enablePan enableRotate />
        <gridHelper />
        <Points />
        <GizmoHelper alignment="top-right">
          <GizmoViewport />
        </GizmoHelper>
      </Canvas>
    </div>
  );
};
