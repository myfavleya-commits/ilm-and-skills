import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Object3D, Vector3 } from 'three';
import type { DirectionalLight, Group } from 'three';
import type { RefObject } from 'react';
import { cameraPath, gazePath, pathParameter } from './camera-path';
import { createSceneResources } from './scene-resources';
import {
  Arch,
  Chair,
  Desk,
  Monitor,
  Plant,
  Resources,
  Round,
  Solid,
  Student,
  Tiles,
  useResources,
} from './WorldObjects';

export type JourneyProgress = { value: number };

function Screen({
  position,
  scale,
  screen = 'identity',
  rotation = 0,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  screen?: 'identity' | 'curriculum' | 'website' | 'slides';
  rotation?: number;
}) {
  const { geometries, screens } = useResources();
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={[0, rotation, 0]}
      geometry={geometries.plane}
      material={screens[screen]}
    />
  );
}

function Bench({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {[0, 1, 2, 3].map((index) => (
        <Solid
          key={index}
          position={[0, 0.6, (index - 1.5) * 0.15]}
          scale={[2.4, 0.09, 0.12]}
          finish="oak"
          rounded
        />
      ))}
      <Solid
        position={[0, 1, 0.38]}
        scale={[2.4, 0.45, 0.08]}
        finish="oak"
        rounded
      />
      {[-0.9, 0.9].map((x) => (
        <Solid
          key={x}
          position={[x, 0.28, 0]}
          scale={[0.1, 0.56, 0.65]}
          finish="metal"
        />
      ))}
    </group>
  );
}

function Pillar({
  position,
  height = 5,
}: {
  position: [number, number, number];
  height?: number;
}) {
  return (
    <group position={position}>
      <Solid position={[0, 0.15, 0]} scale={[0.65, 0.3, 0.65]} finish="stone" />
      <Round
        position={[0, height / 2, 0]}
        scale={[0.39, height, 0.39]}
        finish="edge"
      />
      <Solid
        position={[0, height - 0.18, 0]}
        scale={[0.65, 0.34, 0.65]}
        finish="stone"
      />
      <Round position={[0, 0.4, 0]} scale={[0.48, 0.08, 0.48]} finish="gold" />
    </group>
  );
}

function Madrasa({ lite }: { lite: boolean }) {
  const { materials, geometries } = useResources();
  return (
    <group name="Madrasa courtyard">
      <Solid position={[0, -0.2, 9]} scale={[30, 0.24, 34]} finish="earth" />
      <Tiles z={23} length={26} width={24} />
      <Solid
        position={[0, -0.005, 11]}
        scale={[3.4, 0.025, 25]}
        finish="edge"
      />
      {[-1.7, 1.7].map((x) => (
        <Solid
          key={x}
          position={[x, 0.018, 11]}
          scale={[0.035, 0.025, 25]}
          finish="gold"
        />
      ))}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Solid
            position={[side * 7.25, 3.25, -2.7]}
            scale={[8.8, 6.5, 5.5]}
            finish="plaster"
          />
          <Solid
            position={[side * 7.25, 6.55, -2.7]}
            scale={[9.1, 0.2, 5.8]}
            finish="edge"
          />
          <Solid
            position={[side * 7.25, 6.75, -2.7]}
            scale={[9.2, 0.15, 5.9]}
            finish="stone"
          />
          <Solid
            position={[side * 7.25, 6.83, 0.2]}
            scale={[9.2, 0.035, 0.06]}
            finish="gold"
          />
          {[5.3, 8.1, 10.8].map((x) => (
            <group key={x} position={[side * x, 1.1, 0.09]}>
              <Solid
                position={[0, 1.7, -0.03]}
                scale={[1.65, 3.5, 0.12]}
                finish="emerald"
              />
              <Arch width={2.1} height={4.3} depth={0.24} finish="stone" />
              <Solid
                position={[0, 1.6, 0.08]}
                scale={[0.055, 2.9, 0.03]}
                finish="gold"
              />
              <Solid
                position={[0, 1.6, 0.08]}
                scale={[1.5, 0.055, 0.03]}
                finish="gold"
              />
            </group>
          ))}
          <Solid
            position={[side * 12, 0.55, 10]}
            scale={[0.3, 1.1, 25]}
            finish="stone"
          />
          {[3, 9, 15].map((z) => (
            <group key={z}>
              <Pillar position={[side * 10.8, 0, z]} height={4.3} />
              <Arch
                position={[side * 10.8, 0, z + 3]}
                rotation={[0, Math.PI / 2, 0]}
                width={6}
                height={4.6}
                depth={0.36}
              />
            </group>
          ))}
          <Solid
            position={[side * 10.8, 4.5, 10.5]}
            scale={[1.8, 0.22, 22.8]}
            finish="plaster"
          />
          <Plant position={[side * 8.2, 0, 18]} scale={1.2} />
          <Plant position={[side * 9, 0, 3]} scale={1.3} />
          <Bench
            position={[side * 8, 0, 6.3]}
            rotation={(side * Math.PI) / 2}
          />
        </group>
      ))}
      <Arch
        position={[0, 0, 0]}
        width={6.2}
        height={7.8}
        depth={1.1}
        finish="stone"
      />
      <Arch
        position={[0, 0, 0.57]}
        width={5.6}
        height={7.2}
        depth={0.13}
        finish="edge"
      />
      <Arch
        position={[0, 0, 0.66]}
        width={5.12}
        height={6.8}
        depth={0.05}
        finish="gold"
      />
      <Solid position={[0, 7.7, -0.4]} scale={[6.2, 0.34, 1.8]} finish="edge" />
      <Solid
        position={[0, 7.95, -0.4]}
        scale={[6.6, 0.16, 1.9]}
        finish="stone"
      />
      {[-3.1, 3.1].map((x) => (
        <Pillar key={x} position={[x, 0, 0.5]} height={7.6} />
      ))}
      <group position={[-5.8, 0, 11]}>
        <mesh
          geometry={geometries.cylinder}
          material={materials.stone}
          position={[0, 0.2, 0]}
          scale={[3.6, 0.4, 3.6]}
          receiveShadow
        />
        <Round
          position={[0, 0.42, 0]}
          scale={[3.1, 0.06, 3.1]}
          finish="water"
        />
        <Round position={[0, 0.83, 0]} scale={[0.4, 0.8, 0.4]} finish="edge" />
        <Round
          position={[0, 1.26, 0]}
          scale={[1.15, 0.12, 1.15]}
          finish="stone"
        />
        <Round
          position={[0, 1.35, 0]}
          scale={[0.15, 0.16, 0.15]}
          shape="sphere"
          finish="gold"
        />
      </group>
      <Student position={[4.5, 0, 11]} rotation={-0.4} />
      <Student
        position={[5.5, 0, 10.7]}
        rotation={0.55}
        finish="lapis"
        skin="skinDeep"
      />
      {!lite && (
        <Student
          position={[4.8, 0, 9.4]}
          rotation={2.7}
          finish="jade"
          skin="skinLight"
        />
      )}
      <Student
        position={[-7.7, 0.04, 6.3]}
        rotation={-Math.PI / 2}
        seated
        finish="white"
      />
    </group>
  );
}

function LearningCenter() {
  const { geometries, glass, light } = useResources();
  return (
    <group name="Connected learning center">
      <Tiles z={-2} length={22} width={16} />
      <Solid position={[0, 0, -12]} scale={[3.4, 0.035, 23]} finish="edge" />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Solid
            position={[side * 8.2, 2.6, -12]}
            scale={[0.25, 5.2, 23]}
            finish="plaster"
          />
          <Solid
            position={[side * 6.6, 5.2, -12]}
            scale={[3.5, 0.22, 23]}
            finish="edge"
          />
          <Solid
            position={[side * 2.1, 0.02, -12]}
            scale={[0.025, 0.025, 22]}
            finish="gold"
          />
          {[-5, -11, -17].map((z) => (
            <group key={z}>
              <Solid
                position={[side * 5.8, 2.4, z]}
                scale={[0.1, 4.8, 0.12]}
                finish="metal"
              />
              <mesh
                geometry={geometries.box}
                material={glass}
                position={[side * 5.8, 2.4, z - 2.6]}
                scale={[0.045, 4.8, 5]}
              />
              <Solid
                position={[side * 5.8, 1.05, z - 2.6]}
                scale={[0.06, 0.05, 5]}
                finish="metal"
              />
            </group>
          ))}
          <Plant position={[side * 4.3, 0, -6]} />
          <Plant position={[side * 4.3, 0, -19.5]} />
        </group>
      ))}
      <Arch position={[0, 0, -8]} width={11.5} height={5.7} depth={0.2} />
      <Arch position={[0, 0, -20.5]} width={10.8} height={5.6} depth={0.18} />
      <Solid
        position={[-5.1, 0.7, -12]}
        scale={[2.7, 1.4, 1.3]}
        finish="emerald"
        rounded
      />
      <Solid
        position={[-5.1, 1.43, -12]}
        scale={[2.9, 0.08, 1.5]}
        finish="oak"
        rounded
      />
      <Monitor position={[-5.1, 2.05, -12.2]} scale={0.7} />
      <Student position={[-5.1, 0, -13.1]} rotation={Math.PI} finish="jade" />
      <Student position={[3.9, 0, -15]} rotation={-0.6} finish="lapis" />
      <Screen position={[0, 4.2, -21]} scale={[3.3, 1.85, 1]} />
      {[-4.8, 4.8].map((x) => (
        <mesh
          key={x}
          geometry={geometries.box}
          material={light}
          position={[x, 4.8, -13]}
          scale={[0.045, 0.04, 15]}
        />
      ))}
    </group>
  );
}

function Classroom({
  lite,
  progress,
}: {
  lite: boolean;
  progress: RefObject<JourneyProgress>;
}) {
  const { geometries, glass, screens } = useResources();
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);
  useFrame(() => {
    // The student's enlarged monitor opens as an actual doorway, not a crossfade.
    const opening = Math.max(
      0,
      Math.min(1, (progress.current.value - 0.49) / 0.055),
    );
    const smooth = opening * opening * (3 - 2 * opening);
    if (left.current) left.current.position.x = -0.89 - smooth * 2.1;
    if (right.current) right.current.position.x = 0.89 + smooth * 2.1;
  });
  return (
    <group name="Computer classroom">
      <Tiles z={-24} length={22} width={20} />
      <Solid
        position={[0, 0.007, -34]}
        scale={[3.25, 0.02, 21]}
        finish="edge"
      />
      <Arch position={[0, 0, -23]} width={8.4} height={5.7} depth={0.3} />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Solid
            position={[side * 10, 0.6, -34]}
            scale={[0.22, 1.2, 22]}
            finish="jade"
          />
          <Solid
            position={[side * 10, 5.1, -34]}
            scale={[0.22, 1, 22]}
            finish="plaster"
          />
          <Solid
            position={[side * 6.8, 5.65, -34]}
            scale={[7, 0.2, 22]}
            finish="edge"
          />
          {[-26, -31.5, -37, -42.5].map((z) => (
            <group key={z}>
              <Solid
                position={[side * 10, 2.75, z]}
                scale={[0.28, 4.7, 0.2]}
                finish="edge"
              />
              <mesh
                geometry={geometries.box}
                material={glass}
                position={[side * 10, 2.9, z + 2.5]}
                scale={[0.05, 3.5, 4.8]}
              />
              <Solid
                position={[side * 10, 3.1, z + 2.5]}
                scale={[0.09, 0.09, 4.9]}
                finish="edge"
              />
            </group>
          ))}
          {(lite ? [-28.5, -34.5] : [-28.5, -34.5, -40]).map((z, index) => (
            <Desk
              key={z}
              position={[side * 4.1, 0, z]}
              lite={lite}
              finish={index % 2 ? 'jade' : 'white'}
            />
          ))}
          <Solid
            position={[side * 6.7, 2.7, -44.5]}
            scale={[7.8, 5.4, 0.35]}
            finish="plaster"
          />
          <Plant position={[side * 8.2, 0, -24.5]} />
        </group>
      ))}
      <Solid
        position={[-7.2, 2.7, -43.9]}
        scale={[4.3, 2.65, 0.12]}
        finish="emerald"
        rounded
      />
      <Screen
        position={[-7.2, 2.7, -43.82]}
        scale={[4.04, 2.27, 1]}
        screen="slides"
      />
      <Student
        position={[-6.3, 0, -41.2]}
        rotation={Math.PI - 0.3}
        finish="lapis"
      />
      <Solid
        position={[0, 0.98, -43.3]}
        scale={[4.5, 0.14, 1.4]}
        finish="oak"
        rounded
      />
      {[-2, 2].map((x) => (
        <Solid
          key={x}
          position={[x, 0.45, -43.3]}
          scale={[0.09, 0.9, 1.15]}
          finish="metal"
        />
      ))}
      <Student position={[-1.1, 0, -41.9]} seated finish="white" />
      <Chair position={[-1.1, 0, -41.85]} />
      <Arch
        position={[0, 0, -44.5]}
        width={5.9}
        height={5.6}
        depth={0.4}
        finish="emerald"
      />
      <group position={[0, 2.22, -43.6]}>
        {[-1.28, 1.28].map((y) => (
          <Solid
            key={y}
            position={[0, y, -0.13]}
            scale={[4.1, 0.06, 0.07]}
            finish="gold"
          />
        ))}
        {[-2.02, 2.02].map((x) => (
          <Solid
            key={x}
            position={[x, 0, -0.13]}
            scale={[0.06, 2.53, 0.07]}
            finish="gold"
          />
        ))}
        {/* The backing is a frame: no solid mesh obstructs the camera aperture. */}
        <Solid
          position={[0, 1.17, 0]}
          scale={[3.9, 0.18, 0.2]}
          finish="dark"
          rounded
        />
        <Solid
          position={[0, -1.17, 0]}
          scale={[3.9, 0.18, 0.2]}
          finish="dark"
          rounded
        />
        {[-1.9, 1.9].map((x) => (
          <Solid
            key={x}
            position={[x, 0, 0]}
            scale={[0.18, 2.3, 0.2]}
            finish="dark"
            rounded
          />
        ))}
        <group ref={left} position={[-0.89, 0, 0]}>
          <Solid scale={[1.78, 2.14, 0.14]} finish="dark" />
          <mesh
            geometry={geometries.leftScreen}
            material={screens.curriculum}
            position={[0, 0, 0.081]}
            scale={[1.78, 2.03, 1]}
          />
        </group>
        <group ref={right} position={[0.89, 0, 0]}>
          <Solid scale={[1.78, 2.14, 0.14]} finish="dark" />
          <mesh
            geometry={geometries.rightScreen}
            material={screens.curriculum}
            position={[0, 0, 0.081]}
            scale={[1.78, 2.03, 1]}
          />
        </group>
      </group>
    </group>
  );
}

function DigitalLearning() {
  const { geometries, light } = useResources();
  return (
    <group name="Screen learning passage">
      <Solid
        position={[0, 1.06, -50.3]}
        scale={[8.8, 0.2, 13.5]}
        finish="lapis"
      />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Solid
            position={[side * 4.3, 3.2, -50.3]}
            scale={[0.18, 4.4, 13.5]}
            finish="emerald"
          />
          <mesh
            geometry={geometries.box}
            material={light}
            position={[side * 2, 1.18, -50.4]}
            scale={[0.025, 0.035, 13]}
          />
          {[-46.5, -50.3, -54].map((z, index) => (
            <group key={z}>
              <Solid
                position={[side * 3, 1.6, z]}
                scale={[1.55, 0.9, 1.5]}
                finish="jade"
                rounded
              />
              <Monitor
                position={[side * 3, 2.72, z]}
                rotation={side * -0.4}
                scale={0.75}
                screen={
                  index === 0
                    ? 'curriculum'
                    : index === 1
                      ? 'website'
                      : 'slides'
                }
              />
              <Solid
                position={[side * 3.15, 2.11, z + 0.3]}
                scale={[0.8, 0.055, 0.6]}
                rotation={[0, side * 0.2, 0]}
                finish="white"
                rounded
              />
            </group>
          ))}
        </group>
      ))}
      {[-45.2, -50, -55.6].map((z) => (
        <Arch
          key={z}
          position={[0, 1.15, z]}
          width={8.5}
          height={4.8}
          depth={0.15}
          finish="gold"
        />
      ))}
      {Array.from({ length: 7 }, (_, row) =>
        [-0.9, 0, 0.9].map((x) => (
          <Solid
            key={`${row},${x}`}
            position={[x, 1.18, -45.8 - row * 1.5]}
            scale={[0.78, 0.08, 1.15]}
            finish={row % 2 ? 'stone' : 'edge'}
            rounded
          />
        )),
      )}
      {[0, 1, 2, 3, 4].map((index) => (
        <Solid
          key={index}
          position={[0, 0.95 - index * 0.2, -56.8 - index * 0.45]}
          scale={[4, 0.2, 0.52]}
          finish="stone"
        />
      ))}
      <Solid
        position={[0, 6, -50]}
        scale={[8.8, 0.18, 13.5]}
        finish="emerald"
      />
    </group>
  );
}

function ProjectStudio({ lite }: { lite: boolean }) {
  return (
    <group name="Practical project studio">
      <Tiles z={-59} length={20} width={22} />
      <Arch
        position={[0, 0, -59]}
        width={8}
        height={6.2}
        depth={0.3}
        finish="stone"
      />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Solid
            position={[side * 11, 1.2, -68]}
            scale={[0.3, 2.4, 22]}
            finish="plaster"
          />
          <Solid
            position={[side * 8.5, 5.8, -68]}
            scale={[5, 0.24, 22]}
            finish="edge"
          />
          {[-61, -67, -73, -78].map((z) => (
            <Pillar key={z} position={[side * 10.5, 0, z]} height={5.8} />
          ))}
          <Plant position={[side * 8.5, 0, -61]} scale={1.3} />
          <Plant position={[side * 8.5, 0, -76]} scale={1.3} />
        </group>
      ))}
      <Desk
        position={[-4, 0, -65]}
        screen="website"
        finish="jade"
        lite={lite}
      />
      <Desk
        position={[4.2, 0, -65]}
        screen="slides"
        finish="white"
        lite={lite}
      />
      <Solid
        position={[0, 0.96, -71.5]}
        scale={[4.4, 0.13, 2.7]}
        finish="oak"
        rounded
      />
      {[-1.9, 1.9].map((x) =>
        [-72.5, -70.5].map((z) => (
          <Solid
            key={`${x},${z}`}
            position={[x, 0.45, z]}
            scale={[0.1, 0.9, 0.1]}
            finish="metal"
          />
        )),
      )}
      <Chair position={[-1.2, 0, -69.7]} />
      <Student
        position={[-1.2, 0, -69.7]}
        seated
        finish="lapis"
        skin="skinLight"
      />
      <Chair position={[1, 0, -73.2]} rotation={Math.PI} />
      <Student
        position={[1, 0, -73.2]}
        rotation={Math.PI}
        seated
        finish="jade"
      />
      <Monitor position={[-1.2, 1.72, -71.4]} screen="website" />
      {[0, 1, 2].map((index) => (
        <Solid
          key={index}
          position={[0.7 + index * 0.06, 1.07 + index * 0.035, -71.4]}
          rotation={[0, 0.15 + index * 0.06, 0]}
          scale={[0.8, 0.025, 1.1]}
          finish="white"
        />
      ))}
      <Round
        position={[1.55, 1.2, -71.6]}
        scale={[0.12, 0.35, 0.12]}
        finish="emerald"
      />
      <Screen
        position={[7, 2.9, -73.5]}
        scale={[5, 2.82, 1]}
        screen="slides"
        rotation={-0.35}
      />
      <Solid
        position={[7, 2.9, -73.65]}
        scale={[5.2, 3, 0.12]}
        finish="emerald"
        rounded
      />
      <Student position={[5.3, 0, -71.5]} rotation={2.5} finish="white" />
      <Arch position={[0, 0, -78]} width={8.8} height={6.4} depth={0.4} />
    </group>
  );
}

function OpportunityTerrace({ lite }: { lite: boolean }) {
  return (
    <group name="Open community terrace">
      <Tiles z={-80} length={27} width={26} finish="edge" />
      <Solid position={[0, -0.13, -93]} scale={[40, 0.1, 42]} finish="leaf" />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Solid
            position={[side * 13, 0.45, -92]}
            scale={[0.3, 0.9, 28]}
            finish="stone"
          />
          {[-82, -90, -98].map((z) => (
            <group key={z}>
              <Pillar position={[side * 9.6, 0, z]} height={5.5} />
              <Plant position={[side * 7.4, 0, z - 2]} scale={1.6} />
            </group>
          ))}
          <Solid
            position={[side * 9.6, 5.5, -90]}
            scale={[2.4, 0.2, 24]}
            finish="oak"
          />
          <Bench
            position={[side * 6.9, 0, -91]}
            rotation={(side * Math.PI) / 2}
          />
        </group>
      ))}
      {!lite &&
        Array.from({ length: 9 }, (_, index) => (
          <Solid
            key={index}
            position={[0, 5.7, -80 - index * 3]}
            scale={[20.2, 0.15, 0.18]}
            finish="wood"
          />
        ))}
      <Student position={[-4.1, 0, -88]} rotation={0.6} finish="white" />
      <Student position={[4.4, 0, -98]} rotation={0.7} finish="white" />
      <Student position={[5.3, 0, -98.6]} rotation={2.5} finish="jade" skin="skinDeep" />
      <Student
        position={[-3.1, 0, -88.8]}
        rotation={2.7}
        finish="jade"
        skin="skinDeep"
      />
      <Student
        position={[5.8, 0, -91]}
        rotation={Math.PI / 2}
        seated
        finish="lapis"
      />
      <Arch
        position={[0, 0, -104]}
        width={12}
        height={8.8}
        depth={0.8}
        finish="stone"
      />
      <Solid
        position={[0, 3.4, -103.7]}
        scale={[8.2, 4.6, 0.24]}
        finish="emerald"
        rounded
      />
      <Screen position={[0, 3.4, -103.56]} scale={[8, 4.5, 1]} />
      {[-6.5, 6.5].map((x) => (
        <Plant key={x} position={[x, 0, -101]} scale={2} />
      ))}
    </group>
  );
}

export default function LearningWorld({
  progress,
  lite,
  report,
}: {
  progress: RefObject<JourneyProgress>;
  lite: boolean;
  report: (position: string) => void;
}) {
  const resources = useMemo(createSceneResources, []);
  const zones = useRef<(Group | null)[]>([]);
  const sunlight = useRef<DirectionalLight>(null);
  const lightTarget = useMemo(() => new Object3D(), []);
  const eye = useMemo(() => new Vector3(), []);
  const gaze = useMemo(() => new Vector3(), []);
  const { camera } = useThree();
  useEffect(() => () => resources.dispose(), [resources]);
  useFrame(() => {
    const value = progress.current.value;
    const parameter = pathParameter(value);
    cameraPath.getPoint(parameter, eye);
    gazePath.getPoint(parameter, gaze);
    camera.position.copy(eye);
    camera.lookAt(gaze);
    if (sunlight.current) {
      // A constant sun direction with a camera-local shadow volume keeps one
      // modest shadow map useful throughout the 120-metre connected world.
      sunlight.current.position.set(-13, 30, eye.z + 12);
      lightTarget.position.set(0, 0, eye.z - 7);
      lightTarget.updateMatrixWorld();
    }
    report(`${eye.x.toFixed(3)},${eye.y.toFixed(3)},${eye.z.toFixed(3)}`);
    const bounds = [
      [0, 24],
      [-23, -2],
      [-45, -24],
      [-58, -44],
      [-79, -59],
      [-107, -80],
    ];
    zones.current.forEach((zone, index) => {
      const [back, front] = bounds[index];
      const distance = Math.max(back - eye.z, eye.z - front, 0);
      // Bring whole rooms in beyond the opaque fog boundary, never at a story beat.
      if (zone) zone.visible = distance < 80;
    });
  });
  return (
    <Resources.Provider value={resources}>
      <color attach="background" args={['#d7e2dc']} />
      <fog attach="fog" args={['#d7e2dc', 26, 78]} />
      <ambientLight intensity={0.6} />
      <hemisphereLight args={['#e9f0ec', '#a28a64', 0.9]} />
      <primitive object={lightTarget} />
      <directionalLight
        ref={sunlight}
        target={lightTarget}
        position={[-13, 30, 12]}
        intensity={3.1}
        color="#fff0d2"
        castShadow={!lite}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-camera-far={160}
        shadow-bias={-0.0004}
        shadow-normalBias={0.035}
      />
      <group
        ref={(group) => {
          zones.current[0] = group;
        }}
      >
        <Madrasa lite={lite} />
      </group>
      <group
        ref={(group) => {
          zones.current[1] = group;
        }}
      >
        <LearningCenter />
      </group>
      <group
        ref={(group) => {
          zones.current[2] = group;
        }}
      >
        <Classroom lite={lite} progress={progress} />
      </group>
      <group
        ref={(group) => {
          zones.current[3] = group;
        }}
      >
        <DigitalLearning />
      </group>
      <group
        ref={(group) => {
          zones.current[4] = group;
        }}
      >
        <ProjectStudio lite={lite} />
      </group>
      <group
        ref={(group) => {
          zones.current[5] = group;
        }}
      >
        <OpportunityTerrace lite={lite} />
      </group>
    </Resources.Provider>
  );
}
