import { createContext, useContext, useLayoutEffect, useRef } from 'react';
import { Object3D } from 'three';
import type { InstancedMesh } from 'three';
import type { Finish, SceneResources } from './scene-resources';

export const Resources = createContext<SceneResources | null>(null);
export function useResources() {
  return useContext(Resources)!;
}
type Vector = [number, number, number];
type ObjectProps = {
  position?: Vector;
  scale?: Vector;
  rotation?: Vector;
  finish?: Finish;
};

export function Solid({
  position,
  scale,
  rotation,
  finish = 'plaster',
  rounded = false,
}: ObjectProps & { rounded?: boolean }) {
  const { geometries, materials } = useResources();
  return (
    <mesh
      geometry={geometries[rounded ? 'rounded' : 'box']}
      material={materials[finish]}
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    />
  );
}
export function Round({
  position,
  scale,
  rotation,
  finish = 'stone',
  shape = 'cylinder',
}: ObjectProps & { shape?: 'cylinder' | 'sphere' | 'robe' }) {
  const { geometries, materials } = useResources();
  return (
    <mesh
      geometry={geometries[shape]}
      material={materials[finish]}
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    />
  );
}
export function Arch({
  position,
  width = 5,
  height = 6,
  depth = 0.5,
  finish = 'edge',
  rotation,
}: {
  position?: Vector;
  width?: number;
  height?: number;
  depth?: number;
  finish?: Finish;
  rotation?: Vector;
}) {
  const { geometries, materials } = useResources();
  return (
    <mesh
      position={position}
      rotation={rotation}
      geometry={geometries.arch}
      material={materials[finish]}
      scale={[width, height, depth]}
      castShadow
      receiveShadow
    />
  );
}

export function Tiles({
  z,
  length,
  width = 20,
  finish = 'floor',
}: {
  z: number;
  length: number;
  width?: number;
  finish?: Finish;
}) {
  const mesh = useRef<InstancedMesh>(null);
  const { geometries, materials } = useResources();
  const columns = Math.round(width / 2);
  const rows = Math.round(length / 2);
  useLayoutEffect(() => {
    const object = new Object3D();
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < columns; col++) {
        object.position.set((col - (columns - 1) / 2) * 2, -0.065, z - row * 2);
        object.scale.set(1.97, 0.1, 1.97);
        object.updateMatrix();
        mesh.current?.setMatrixAt(row * columns + col, object.matrix);
      }
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
  }, [columns, rows, z]);
  return (
    <instancedMesh
      ref={mesh}
      args={[geometries.box, materials[finish], columns * rows]}
      receiveShadow
    />
  );
}

export function Plant({
  position,
  scale = 1,
}: {
  position: Vector;
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <Round
        position={[0, 0.3, 0]}
        scale={[0.8, 0.6, 0.8]}
        finish="stone"
        shape="robe"
      />
      <Round
        position={[0, 0.61, 0]}
        scale={[0.63, 0.05, 0.63]}
        finish="earth"
      />
      <Round position={[0, 1.1, 0]} scale={[0.08, 1, 0.08]} finish="wood" />
      {[0, 1, 2, 3, 4].map((index) => (
        <Round
          key={index}
          position={[
            Math.sin(index * 1.3) * 0.23,
            1.35 + (index % 2) * 0.22,
            Math.cos(index * 1.3) * 0.23,
          ]}
          scale={[0.58, 0.83, 0.46]}
          rotation={[0.2, index, 0.3]}
          finish={index % 2 ? 'jade' : 'leaf'}
          shape="sphere"
        />
      ))}
    </group>
  );
}

export function Student({
  position,
  rotation = 0,
  seated = false,
  finish = 'white',
  skin = 'skin',
}: {
  position: Vector;
  rotation?: number;
  seated?: boolean;
  finish?: Finish;
  skin?: Finish;
}) {
  const head = seated ? 1.58 : 1.68;
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Round
        position={[0, seated ? 1.03 : 0.88, 0]}
        scale={seated ? [0.72, 0.67, 0.57] : [0.75, 1.18, 0.62]}
        shape="robe"
        finish={finish}
      />
      <Round
        position={[0, head, -0.015]}
        scale={[0.37, 0.43, 0.35]}
        shape="sphere"
        finish={skin}
      />
      <Round
        position={[0, head + 0.16, 0]}
        scale={[0.37, 0.105, 0.35]}
        finish="white"
      />
      <Round
        position={[0, head - 0.24, 0]}
        scale={[0.13, 0.15, 0.13]}
        finish={skin}
      />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Round
            position={[side * 0.09, head + 0.02, -0.168]}
            scale={[0.023, 0.028, 0.016]}
            shape="sphere"
            finish="dark"
          />
          <Round
            position={[side * 0.28, seated ? 1.17 : 1.08, seated ? -0.1 : 0]}
            scale={[0.18, seated ? 0.43 : 0.59, 0.18]}
            rotation={[seated ? 0.59 : 0, 0, side * 0.12]}
            finish={finish}
          />
          {seated && (
            <Round
              position={[side * 0.28, 1.02, -0.35]}
              scale={[0.14, 0.3, 0.14]}
              rotation={[Math.PI / 2, 0, 0]}
              finish={finish}
            />
          )}
          <Round
            position={[side * 0.28, seated ? 1.02 : 0.77, seated ? -0.53 : 0]}
            scale={[0.13, 0.14, 0.15]}
            finish={skin}
            shape="sphere"
          />
          <Round
            position={[side * 0.14, seated ? 0.32 : 0.18, seated ? -0.19 : 0]}
            scale={[0.17, seated ? 0.48 : 0.26, 0.18]}
            finish="lapis"
          />
          <Solid
            position={[side * 0.14, 0.055, -0.1]}
            scale={[0.22, 0.1, 0.36]}
            finish="dark"
            rounded
          />
        </group>
      ))}
    </group>
  );
}

export function Chair({
  position,
  rotation = 0,
}: {
  position: Vector;
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Solid
        position={[0, 0.57, 0]}
        scale={[0.62, 0.12, 0.64]}
        finish="emerald"
        rounded
      />
      <Solid
        position={[0, 0.99, 0.31]}
        scale={[0.62, 0.78, 0.1]}
        finish="emerald"
        rounded
      />
      {[-0.23, 0.23].map((x) =>
        [-0.22, 0.23].map((z) => (
          <Solid
            key={`${x},${z}`}
            position={[x, 0.27, z]}
            scale={[0.045, 0.54, 0.045]}
            finish="metal"
          />
        )),
      )}
    </group>
  );
}

export function Monitor({
  position,
  rotation = 0,
  screen = 'curriculum',
  scale = 1,
}: {
  position: Vector;
  rotation?: number;
  screen?: 'curriculum' | 'website' | 'slides';
  scale?: number;
}) {
  const { geometries, screens } = useResources();
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <Solid
        position={[0, 0, -0.02]}
        scale={[1.46, 0.87, 0.12]}
        finish="dark"
        rounded
      />
      <mesh
        position={[0, 0, 0.047]}
        scale={[1.34, 0.754, 1]}
        geometry={geometries.plane}
        material={screens[screen]}
      />
      <Solid
        position={[0, -0.55, -0.06]}
        scale={[0.09, 0.35, 0.09]}
        finish="metal"
      />
      <Solid
        position={[0, -0.71, 0.03]}
        scale={[0.48, 0.035, 0.3]}
        finish="dark"
        rounded
      />
    </group>
  );
}

export function Desk({
  position,
  rotation = 0,
  screen = 'curriculum',
  student = true,
  finish = 'white',
  lite = false,
}: {
  position: Vector;
  rotation?: number;
  screen?: 'curriculum' | 'website' | 'slides';
  student?: boolean;
  finish?: Finish;
  lite?: boolean;
}) {
  const { geometries, materials } = useResources();
  const keys = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (lite || !keys.current) return;
    const object = new Object3D();
    for (let i = 0; i < 36; i++) {
      object.position.set(
        ((i % 12) - 5.5) * 0.057,
        1.027,
        0.26 + Math.floor(i / 12) * 0.065,
      );
      object.scale.set(0.044, 0.012, 0.045);
      object.updateMatrix();
      keys.current.setMatrixAt(i, object.matrix);
    }
    keys.current.instanceMatrix.needsUpdate = true;
  }, [lite]);
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Solid
        position={[0, 0.96, 0]}
        scale={[2.35, 0.1, 1.25]}
        finish="oak"
        rounded
      />
      <Solid
        position={[0, 0.87, -0.37]}
        scale={[2.1, 0.12, 0.08]}
        finish="wood"
      />
      {[-1.02, 1.02].map((x) =>
        [-0.47, 0.47].map((z) => (
          <Solid
            key={`${x},${z}`}
            position={[x, 0.44, z]}
            scale={[0.06, 0.88, 0.06]}
            finish="metal"
          />
        )),
      )}
      <Monitor position={[0, 1.72, -0.27]} screen={screen} />
      <Solid
        position={[0, 1.017, 0.35]}
        scale={[0.76, 0.035, 0.3]}
        finish="dark"
        rounded
      />
      {!lite && (
        <instancedMesh
          ref={keys}
          args={[geometries.box, materials.white, 36]}
        />
      )}
      <Round
        position={[0.65, 1.035, 0.35]}
        scale={[0.11, 0.06, 0.17]}
        finish="dark"
        shape="sphere"
      />
      <Chair position={[0, 0, 1]} />
      {student && <Student position={[0, 0, 0.96]} seated finish={finish} />}
    </group>
  );
}
