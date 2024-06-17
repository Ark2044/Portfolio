import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ scale, position }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.45} groundColor='black' />
      <spotLight
        position={[-20, 80, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={scale}
        position={position}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [scale, setScale] = useState(0.75);
  const [position, setPosition] = useState([0, -3.25, -1.5]);

  useEffect(() => {
    const updateScaleAndPosition = () => {
      const width = window.innerWidth;

      // Calculate scale and position based on the window width
      const newScale = 0.4 + (width / 1000) * 0.2;
      const newPositionY = -2.4 - (width / 1000);

      setScale(newScale);
      setPosition([0, newPositionY, -1.5]);
    };

    // Initial setup
    updateScaleAndPosition();

    // Add resize listener
    window.addEventListener("resize", updateScaleAndPosition);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", updateScaleAndPosition);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers scale={scale} position={position} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
