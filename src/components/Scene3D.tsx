import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, MeshTransmissionMaterial, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, SMAA } from '@react-three/postprocessing'
import * as THREE from 'three'

function Dumbbell({ position, rotation, color = '#d2f000', mouseFactor = 1, ...props }: any) {
  const group = useRef<THREE.Group>(null!)
  const basePos = useMemo(() => new THREE.Vector3(position[0], position[1], position[2]), [position])

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime
      const ptr = state.pointer

      group.current.rotation.x = rotation[0] + Math.sin(t * 0.2 + position[0]) * 0.08 + ptr.y * 0.2 * mouseFactor
      group.current.rotation.y = rotation[1] + Math.sin(t * 0.15 + position[0]) * 0.08 + ptr.x * 0.25 * mouseFactor
      group.current.rotation.z = rotation[2] + ptr.x * 0.1 * mouseFactor

      group.current.position.x = basePos.x + ptr.x * 0.4 * mouseFactor
      group.current.position.y = basePos.y + Math.sin(t * 0.4 + position[0]) * 0.15 + ptr.y * 0.3 * mouseFactor
    }
  })

  return (
    <group ref={group} position={position} rotation={rotation} {...props}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 1.6, 12]} />
        <meshPhysicalMaterial color="#666" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[-0.95, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.25, 24]} />
        <MeshDistortMaterial color={color} roughness={0.2} metalness={0.9} distort={0.1} speed={2} />
      </mesh>
      <mesh position={[0.95, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.25, 24]} />
        <MeshDistortMaterial color={color} roughness={0.2} metalness={0.9} distort={0.1} speed={2} />
      </mesh>
    </group>
  )
}

function Kettlebell({ position, rotation, mouseFactor = 1, ...props }: any) {
  const group = useRef<THREE.Group>(null!)
  const basePos = useMemo(() => new THREE.Vector3(position[0], position[1], position[2]), [position])

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime
      const ptr = state.pointer

      group.current.rotation.x = rotation[0] + ptr.y * 0.15 * mouseFactor
      group.current.rotation.y = rotation[1] + Math.sin(t * 0.2 + position[0]) * 0.08 + ptr.x * 0.3 * mouseFactor
      group.current.rotation.z = rotation[2] + Math.sin(t * 0.15 + position[0]) * 0.05

      group.current.position.x = basePos.x + ptr.x * 0.5 * mouseFactor
      group.current.position.y = basePos.y + Math.sin(t * 0.5 + position[0]) * 0.12 + ptr.y * 0.25 * mouseFactor
    }
  })

  return (
    <group ref={group} position={position} rotation={rotation} {...props}>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.6, 48, 48]} />
        <MeshDistortMaterial
          color="#d2f000"
          roughness={0.3}
          metalness={0.85}
          distort={0.12}
          speed={1.5}
        />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <torusGeometry args={[0.35, 0.08, 24, 48]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.2}
          chromaticAberration={0.15}
          anisotropy={0.2}
          distortion={0.1}
          color="#d2f000"
          metalness={0.5}
          roughness={0.1}
          ior={1.5}
        />
      </mesh>
    </group>
  )
}

function WeightPlate({ position, rotation, mouseFactor = 1, ...props }: any) {
  const mesh = useRef<THREE.Mesh>(null!)
  const basePos = useMemo(() => new THREE.Vector3(position[0], position[1], position[2]), [position])

  useFrame((state) => {
    if (mesh.current) {
      const t = state.clock.elapsedTime
      const ptr = state.pointer

      mesh.current.rotation.x = rotation[0] + ptr.y * 0.1 * mouseFactor
      mesh.current.rotation.y = rotation[1] + Math.sin(t * 0.25 + position[0]) * 0.1 + ptr.x * 0.2 * mouseFactor

      mesh.current.position.x = basePos.x + ptr.x * 0.35 * mouseFactor
      mesh.current.position.y = basePos.y + Math.sin(t * 0.4 + position[0]) * 0.12 + ptr.y * 0.2 * mouseFactor
    }
  })

  return (
    <mesh ref={mesh} position={position} rotation={rotation} {...props}>
      <torusGeometry args={[0.5, 0.15, 32, 48]} />
      <MeshDistortMaterial
        color="#e4e2e1"
        roughness={0.2}
        metalness={0.95}
        distort={0.05}
      />
    </mesh>
  )
}

function Particles({ count = 80 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  const ref = useRef<THREE.Points>(null!)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0003
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#d2f000"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function SceneContent() {
  const viewport = useThree((s) => s.viewport)

  const elements = useMemo(() => {
    const w = viewport.width
    const h = viewport.height

    return [
      {
        type: 'dumbbell',
        position: [w * -0.3, h * 0.35, -1],
        rotation: [0.3, 0.5, 0.1],
        scale: 0.55,
        color: '#d2f000',
        mouseFactor: 0.8,
      },
      {
        type: 'kettlebell',
        position: [w * 0.3, h * 0.3, -0.5],
        rotation: [0.5, -0.3, 0.2],
        scale: 0.6,
        mouseFactor: 1.0,
      },
      {
        type: 'weightplate',
        position: [w * 0.15, h * 0.08, -2.5],
        rotation: [0.8, 0.5, 0],
        scale: 0.65,
        mouseFactor: 0.5,
      },
      {
        type: 'kettlebell',
        position: [w * -0.32, h * -0.15, -1.5],
        rotation: [0.2, 0.7, 0],
        scale: 0.45,
        mouseFactor: 0.7,
      },
      {
        type: 'dumbbell',
        position: [w * 0.32, h * -0.2, -1],
        rotation: [0, 0.4, 0.3],
        scale: 0.4,
        color: '#b8d300',
        mouseFactor: 0.9,
      },
      {
        type: 'weightplate',
        position: [w * -0.2, h * -0.38, -0.8],
        rotation: [0.5, 0.8, 0.1],
        scale: 0.5,
        mouseFactor: 0.5,
      },
    ]
  }, [viewport.width, viewport.height])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#d2f000" />
      <directionalLight position={[-5, -3, -5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 3, 2]} intensity={3} color="#d2f000" />
      <pointLight position={[-3, -1, 2]} intensity={1.5} color="#ffffff" />

      {elements.map((el, i) => {
        if (el.type === 'dumbbell') return <Dumbbell key={i} {...el} />
        if (el.type === 'kettlebell') return <Kettlebell key={i} {...el} />
        return <WeightPlate key={i} {...el} />
      })}

      <Particles count={120} />

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={15}
        blur={2.5}
        color="#000"
      />

      <Environment preset="studio" />

      <EffectComposer multisampling={4}>
        <SMAA />
      </EffectComposer>
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-background">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1.5, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
