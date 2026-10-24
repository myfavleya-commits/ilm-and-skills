import { CatmullRomCurve3, Vector3 } from 'three';

// World coordinates connect the courtyard, classroom, screen doorway and terrace.
// Time is scroll progress, never elapsed clock time.
const waypoints = [
  { at: 0, eye: [0, 7, 24], look: [0, 3, 0] },
  { at: 0.1, eye: [0, 3.3, 10], look: [0, 2.7, -3] },
  { at: 0.18, eye: [0, 2.5, -2], look: [0, 2.4, -13] },
  { at: 0.27, eye: [0, 2.5, -18], look: [0, 2.2, -29] },
  { at: 0.34, eye: [0, 2.5, -28], look: [3, 1.6, -34.5] },
  { at: 0.4, eye: [2.5, 2.15, -32], look: [4.1, 1.58, -34.5] },
  { at: 0.46, eye: [0.4, 2.6, -39.5], look: [0, 2.2, -44] },
  { at: 0.52, eye: [0, 2.2, -42.6], look: [0, 2.2, -49] },
  { at: 0.58, eye: [0, 2.2, -47], look: [-0.5, 2.1, -54] },
  { at: 0.65, eye: [0, 2.6, -54], look: [0, 2.3, -63] },
  { at: 0.72, eye: [-1.3, 2.7, -62], look: [-3.7, 1.5, -65] },
  { at: 0.79, eye: [-1, 3.1, -69], look: [0, 2.4, -78] },
  { at: 0.87, eye: [0, 3.5, -79], look: [0, 3, -91] },
  { at: 0.94, eye: [0, 4.7, -88], look: [0, 3.5, -101] },
  { at: 1, eye: [0, 5.5, -93], look: [0, 3.3, -104] },
];

export const cameraPath = new CatmullRomCurve3(
  waypoints.map(({ eye }) => new Vector3(...(eye as [number, number, number]))),
  false,
  'centripetal',
);
export const gazePath = new CatmullRomCurve3(
  waypoints.map(
    ({ look }) => new Vector3(...(look as [number, number, number])),
  ),
  false,
  'centripetal',
);

export function pathParameter(progress: number) {
  const value = Math.max(0, Math.min(1, progress));
  const last = waypoints.length - 1;
  let index = 0;
  while (index < last - 1 && value > waypoints[index + 1].at) index++;
  const local =
    (value - waypoints[index].at) /
    (waypoints[index + 1].at - waypoints[index].at);
  return (index + local) / last;
}
