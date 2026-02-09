"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Center } from "@react-three/drei";
import * as THREE from "three";

const domains: { name: string; color: string; position: [number, number, number] }[] = [
    { name: "AI/ML", color: "#00d4ff", position: [-3, 2, 0] },
    { name: "Web Dev", color: "#a855f7", position: [3, 2, 0] },
    { name: "Data Science", color: "#10b981", position: [-3, -2, 0] },
    { name: "DevOps", color: "#ec4899", position: [3, -2, 0] },
    { name: "Cybersecurity", color: "#f59e0b", position: [0, 0, -2] },
];

function DomainCard({ name, color, position }: { name: string; color: string; position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            if (hovered) {
                meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
            } else {
                meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[1.5, 1.5, 0.2]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 0.5 : 0.2}
                    transparent
                    opacity={0.8}
                    roughness={0.2}
                    metalness={0.8}
                />
                <Text
                    position={[0, 0, 0.11]}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={1.4}
                    textAlign="center"
                >
                    {name}
                </Text>
            </mesh>
        </Float>
    );
}

export default function CareerDomainCards() {
    return (
        <>
            {domains.map((domain, index) => (
                <DomainCard key={index} {...domain} />
            ))}

            {/* Particles */}
            <Points />
        </>
    );
}

function Points() {
    const pointsRef = useRef<THREE.Points>(null);

    const particlesCount = 400;
    const positions = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, [particlesCount]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0003;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#00d4ff" transparent opacity={0.6} />
        </points>
    );
}
