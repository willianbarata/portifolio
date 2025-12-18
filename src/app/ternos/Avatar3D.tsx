"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

// --- COMPONENTE DO CORPO ---
function HumanBody({ dados, showLines }: any) {
  
  // 1. TRAVA DE SEGURANÇA (Isso resolve o erro "undefined")
  // Se os dados não chegarem, usamos um padrão neutro para não travar a tela.
  const safeDados = dados || { 
      toraxAdj: 0, 
      cinturaAdj: 0, 
      quadrilAdj: 0, 
      peso: 75 
  };

  // 2. CÁLCULOS (Agora seguros)
  const toraxScale = 1 + (safeDados.toraxAdj * 0.08) + ((safeDados.peso - 75) * 0.005);
  const cinturaScale = 1 + (safeDados.cinturaAdj * 0.08) + ((safeDados.peso - 75) * 0.008);
  const quadrilScale = 1 + (safeDados.quadrilAdj * 0.08) + ((safeDados.peso - 75) * 0.006);

  // 3. MATERIAIS
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: "#f0f0f0", // Branco Gelo
    roughness: 0.5,
    metalness: 0.1,
  });

  const lineMaterial = new THREE.MeshBasicMaterial({
    color: "#22c55e", // Verde da marca
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide
  });

  return (
    <group position={[0, -3, 0]}>
      
      {/* --- CABEÇA E PESCOÇO --- */}
      <group position={[0, 6.2, 0]}>
        <mesh position={[0, 0.5, 0]} material={skinMaterial}>
           <sphereGeometry args={[0.38, 32, 32]} />
           <mesh scale={[0.9, 1.15, 1]} /> 
        </mesh>
        <mesh position={[0, -0.2, 0]} material={skinMaterial}>
           <cylinderGeometry args={[0.18, 0.22, 0.6, 32]} />
        </mesh>
      </group>

      {/* --- TÓRAX --- */}
      <group position={[0, 5.0, 0]} scale={[toraxScale, 1, toraxScale * 0.8]}>
        <mesh position={[0, 0.6, 0]} material={skinMaterial}>
            <cylinderGeometry args={[0.25, 0.8, 0.6, 32]} />
        </mesh>
        <mesh position={[0, -0.2, 0]} material={skinMaterial}>
             <cylinderGeometry args={[0.75, 0.65, 1.4, 32]} />
        </mesh>
        {/* Ombros */}
        <mesh position={[-0.75, 0.4, 0]} material={skinMaterial}>
            <sphereGeometry args={[0.32, 32, 32]} />
        </mesh>
        <mesh position={[0.75, 0.4, 0]} material={skinMaterial}>
            <sphereGeometry args={[0.32, 32, 32]} />
        </mesh>

        {showLines && (
             <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.72, 0.015, 16, 64]} />
                <primitive object={lineMaterial} />
             </mesh>
        )}
      </group>

      {/* --- CINTURA --- */}
      <group position={[0, 3.6, 0]} scale={[cinturaScale, 1, cinturaScale * 0.85]}>
         <mesh position={[0, 0, 0]} material={skinMaterial}>
            <cylinderGeometry args={[0.63, 0.60, 1.4, 32]} />
         </mesh>

         {showLines && (
             <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.62, 0.015, 16, 64]} />
                <primitive object={lineMaterial} />
             </mesh>
        )}
      </group>

      {/* --- QUADRIL --- */}
      <group position={[0, 2.5, 0]} scale={[quadrilScale, 1, quadrilScale]}>
         <mesh position={[0, 0, 0]} material={skinMaterial}>
             <cylinderGeometry args={[0.58, 0.65, 1.0, 32]} />
         </mesh>

          {showLines && (
             <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.66, 0.015, 16, 64]} />
                <primitive object={lineMaterial} />
             </mesh>
        )}
      </group>

      {/* --- BRAÇOS --- */}
      <group>
        <group position={[-0.85 * toraxScale, 5.2, 0]} rotation={[0, 0, 0.15]}>
             <mesh position={[0, -1.2, 0]} material={skinMaterial}>
                 <cylinderGeometry args={[0.26, 0.20, 1.6, 32]} />
             </mesh>
             <mesh position={[0.15, -2.6, 0.1]} rotation={[0.1, 0, -0.1]} material={skinMaterial}>
                 <cylinderGeometry args={[0.19, 0.16, 1.5, 32]} />
             </mesh>
        </group>

        <group position={[0.85 * toraxScale, 5.2, 0]} rotation={[0, 0, -0.15]}>
             <mesh position={[0, -1.2, 0]} material={skinMaterial}>
                 <cylinderGeometry args={[0.26, 0.20, 1.6, 32]} />
             </mesh>
             <mesh position={[-0.15, -2.6, 0.1]} rotation={[0.1, 0, 0.1]} material={skinMaterial}>
                 <cylinderGeometry args={[0.19, 0.16, 1.5, 32]} />
             </mesh>
        </group>
      </group>

      {/* --- PERNAS --- */}
      <group>
         <mesh position={[-0.35 * quadrilScale, 1.0, 0]} rotation={[0, 0, 0.05]} material={skinMaterial}>
            <cylinderGeometry args={[0.32, 0.24, 2.8, 32]} />
         </mesh>
         <mesh position={[0.35 * quadrilScale, 1.0, 0]} rotation={[0, 0, -0.05]} material={skinMaterial}>
            <cylinderGeometry args={[0.32, 0.24, 2.8, 32]} />
         </mesh>

         <mesh position={[-0.4 * quadrilScale, -1.8, 0]} material={skinMaterial}>
            <cylinderGeometry args={[0.23, 0.18, 3.0, 32]} />
         </mesh>
         <mesh position={[0.4 * quadrilScale, -1.8, 0]} material={skinMaterial}>
            <cylinderGeometry args={[0.23, 0.18, 3.0, 32]} />
         </mesh>
      </group>

    </group>
  );
}

// --- COMPONENTE PRINCIPAL (EXPORTADO) ---
export default function Avatar3D({ dados, showLines }: any) {
  return (
    <Canvas 
      camera={{ position: [0, 1, 6.5], fov: 40 }} 
      shadows
    >
      <ambientLight intensity={0.7} />
      <spotLight position={[5, 10, 5]} angle={0.5} penumbra={0.5} intensity={1.2} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#eef2ff" />
      <spotLight position={[0, 5, -5]} intensity={0.8} color="#ffffff" />
      
      <Environment preset="city" />

      {/* Float faz o boneco flutuar levemente, dando vida */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
         <HumanBody dados={dados} showLines={showLines} />
      </Float>

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#000000" />
      
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}