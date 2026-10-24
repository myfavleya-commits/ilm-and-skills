import { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { AdaptiveDpr, PerspectiveCamera } from '@react-three/drei';
import { ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';
import type { RefObject } from 'react';
import LearningWorld from './LearningWorld';
import type { JourneyProgress } from './LearningWorld';

type Props = {
  progress: RefObject<JourneyProgress>;
  lite: boolean;
  onReady: (invalidate: () => void, regress: () => void) => void;
  onFailure: () => void;
  report: (position: string) => void;
};

function RendererLifecycle({
  onReady,
  onFailure,
}: Pick<Props, 'onReady' | 'onFailure'>) {
  const { gl, invalidate, performance: { regress } } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener('webglcontextlost', lost);
    onReady(invalidate, regress);
    return () => canvas.removeEventListener('webglcontextlost', lost);
  }, [gl, invalidate, regress, onReady, onFailure]);
  return null;
}

export default function JourneyCanvas({
  progress,
  lite,
  onReady,
  onFailure,
  report,
}: Props) {
  const quality = useRef(lite);
  return (
    <Canvas
      className="journey-webgl"
      frameloop="demand"
      resize={{ scroll: false }}
      performance={{ min: 0.7, max: 1, debounce: 250 }}
      dpr={quality.current ? 1 : [1, 1.5]}
      shadows={quality.current ? false : { type: PCFSoftShadowMap }}
      gl={{
        antialias: !quality.current,
        alpha: false,
        powerPreference: 'low-power',
        toneMapping: ACESFilmicToneMapping,
      }}
      fallback={null}
      onCreated={({ gl }) => {
        gl.setClearColor('#d7e2dc');
        gl.toneMappingExposure = 1.1;
      }}
      aria-hidden="true"
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 7, 24]}
        fov={lite ? 69 : 55}
        near={0.045}
        far={160}
      />
      <AdaptiveDpr pixelated />
      <RendererLifecycle onReady={onReady} onFailure={onFailure} />
      <LearningWorld
        progress={progress}
        lite={quality.current}
        report={report}
      />
    </Canvas>
  );
}
