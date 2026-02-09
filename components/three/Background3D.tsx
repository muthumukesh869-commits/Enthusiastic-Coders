"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });
const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => mod.OrbitControls), { ssr: false });
const CareerDomainCards = dynamic(() => import("./CareerDomainCards"), { ssr: false });

export default function Background3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
                    <CareerDomainCards />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}
