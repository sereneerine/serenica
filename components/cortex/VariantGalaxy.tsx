"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

type Variant = {
  id: string;
  af: number;
  impact: number;
  gene: string;
  aiWeight: number;
  chrom: string;
  pos: number;
};

export default function VariantGalaxy({ variants, onSelect, mode }: { variants: Variant[]; onSelect: (v: any) => void; mode: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 60], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[100, 50, 100]} intensity={0.8} />
      <Suspense fallback={null}>
        <GalaxyPoints variants={variants} onSelect={onSelect} mode={mode} />
      </Suspense>
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}

function GalaxyPoints({ variants, onSelect, mode }: { variants: Variant[]; onSelect: (v: any) => void; mode: string }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {variants.map((v, idx) => {
        const x = (Math.log10(v.af + 1e-9) + 6) * 6 - 20;
        const y = (v.impact - 0.5) * 40;
        const z = (v.gene.charCodeAt(4) % 10) * 5 - 20;
        const color = new THREE.Color();
        if (v.impact > 0.8) color.set("#FF3B5C");
        else if (v.impact > 0.6) color.set("#FFA500");
        else color.set("#02E9FF");
        const size = 0.6 + v.aiWeight * 1.2;

        return (
          <mesh
            key={v.id}
            position={[x, y, z]}
            onClick={() => onSelect(v)}
            onPointerOver={() => setHovered(idx)}
            onPointerOut={() => setHovered(null)}
          >
            <sphereBufferGeometry args={[size, 8, 8]} />
            <meshStandardMaterial color={color} />
            {hovered === idx && (
              <Html distanceFactor={10}>
                <div className="bg-black/80 text-white text-xs rounded px-2 py-1">
                  {v.id} • {v.gene} <br />
                  AF: {v.af.toExponential(1)} • impact: {v.impact.toFixed(2)}
                </div>
              </Html>
            )}
          </mesh>
        );
      })}
    </>
  );
}
