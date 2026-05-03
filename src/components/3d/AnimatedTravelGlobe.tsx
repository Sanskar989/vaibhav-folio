import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function GlobeMesh() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      sphereRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
      <MeshDistortMaterial
        color="#6C63FF"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        metalness={0.8}
        wireframe={true}
      />
    </Sphere>
  );
}

export default function AnimatedTravelGlobe() {
  return (
    <div className="w-full h-[500px] relative pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-transparent to-brand-bg z-10" />
      
      {/* @ts-ignore */}
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ width: '100%', height: '100%', pointerEvents: 'auto' as const }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#A78BFA" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <GlobeMesh />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
        />
      </Canvas>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center">
        <h3 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tighter drop-shadow-2xl">
          GLOBAL REACH
        </h3>
        <p className="font-mono text-xs text-brand-accent mt-2 tracking-widest uppercase">From Morena to the World</p>
      </div>
    </div>
  );
}
