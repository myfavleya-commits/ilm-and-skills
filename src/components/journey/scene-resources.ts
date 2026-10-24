import {
  BoxGeometry,
  CanvasTexture,
  CylinderGeometry,
  ExtrudeGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Shape,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { courses } from '../../data/courses';
import { projects } from '../../data/projects';
import { site } from '../../config/site';

export const palette = {
  plaster: '#eadcc1',
  edge: '#fff5de',
  stone: '#cbb995',
  floor: '#d9ccaf',
  emerald: '#0b4f3c',
  jade: '#387766',
  lapis: '#12275a',
  gold: '#c9a24b',
  wood: '#996d45',
  oak: '#c49b6e',
  dark: '#172b32',
  metal: '#587274',
  white: '#f6efdc',
  leaf: '#577957',
  earth: '#93765d',
  water: '#72aca1',
  skin: '#bb875f',
  skinLight: '#d1a17b',
  skinDeep: '#966746',
};
export type Finish = keyof typeof palette;

function archGeometry() {
  const shape = new Shape();
  shape.moveTo(-0.5, 0);
  shape.lineTo(-0.5, 0.53);
  shape.bezierCurveTo(-0.5, 0.76, -0.18, 0.91, 0, 1);
  shape.bezierCurveTo(0.18, 0.91, 0.5, 0.76, 0.5, 0.53);
  shape.lineTo(0.5, 0);
  shape.lineTo(0.38, 0);
  shape.lineTo(0.38, 0.53);
  shape.bezierCurveTo(0.38, 0.72, 0.14, 0.82, 0, 0.9);
  shape.bezierCurveTo(-0.14, 0.82, -0.38, 0.72, -0.38, 0.53);
  shape.lineTo(-0.38, 0);
  shape.closePath();
  const geometry = new ExtrudeGeometry(shape, {
    depth: 1,
    bevelEnabled: false,
    curveSegments: 18,
  });
  geometry.translate(0, 0, -0.5);
  return geometry;
}

// All visible words come from existing curriculum, project and site data.
function makeScreen(kind: 'curriculum' | 'website' | 'slides' | 'identity') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576;
  const context = canvas.getContext('2d');
  if (!context) return new CanvasTexture(canvas);
  const text = (
    value: string,
    x: number,
    y: number,
    size: number,
    color = '#173f34',
  ) => {
    context.fillStyle = color;
    context.font = `600 ${size}px Manrope, sans-serif`;
    const words = value.split(' ');
    let line = '';
    let baseline = y;
    for (const word of words) {
      if (context.measureText(`${line} ${word}`).width > 740 && line) {
        context.fillText(line, x, baseline);
        baseline += size * 1.3;
        line = word;
      } else line = line ? `${line} ${word}` : word;
    }
    context.fillText(line, x, baseline);
  };
  context.fillStyle = kind === 'identity' ? '#0b4f3c' : '#f6efdc';
  context.fillRect(0, 0, 1024, 576);
  if (kind === 'identity') {
    context.strokeStyle = '#c9a24b';
    context.lineWidth = 2;
    context.strokeRect(20, 20, 984, 536);
    context.strokeRect(30, 30, 964, 516);
    text(site.name, 100, 240, 96, '#f6efdc');
    text(site.shortTagline, 105, 340, 32, '#e8cb78');
    text(site.tagline, 105, 410, 23, '#f6efdc');
  } else {
    context.fillStyle = '#0b4f3c';
    context.fillRect(0, 0, 1024, 80);
    text(site.name, 38, 54, 28, '#f6efdc');
    if (kind === 'curriculum') {
      const selection = [
        'computer-foundations',
        'english',
        'ai-literacy',
        'content-creation',
        'word',
        'web-development',
      ];
      selection.forEach((id, index) => {
        const course = courses.find((entry) => entry.id === id)!;
        const x = 40 + (index % 2) * 492;
        const y = 111 + Math.floor(index / 2) * 148;
        context.fillStyle = index === 0 ? '#dfe8d4' : '#fffcf1';
        context.fillRect(x, y, 452, 125);
        context.fillStyle = '#0b4f3c';
        context.fillRect(x + 18, y + 20, 27, 27);
        text(course.shortTitle, x + 18, y + 88, 21);
        context.fillStyle = '#c9a24b';
        context.fillRect(x + 18, y + 107, 80 + index * 28, 2);
      });
    } else if (kind === 'website') {
      const project = projects.find((entry) => entry.preview === 'website')!;
      text(project.title, 42, 170, 45);
      context.fillStyle = '#dce5d2';
      context.fillRect(690, 108, 285, 280);
      context.strokeStyle = '#0b4f3c';
      context.lineWidth = 3;
      context.strokeRect(735, 164, 196, 143);
      context.beginPath();
      context.moveTo(782, 236);
      context.lineTo(808, 215);
      context.lineTo(828, 236);
      context.stroke();
      project.skills
        .slice(0, 3)
        .forEach((skill, index) => text(skill, 44, 280 + index * 55, 23));
      context.fillStyle = '#0b4f3c';
      context.fillRect(42, 440, 285, 51);
      text(site.name, 64, 476, 23, '#f6efdc');
    } else {
      const project = projects.find((entry) => entry.preview === 'slides')!;
      text(project.title, 48, 180, 45);
      project.skills.slice(0, 3).forEach((skill, index) => {
        context.fillStyle = '#c9a24b';
        context.fillRect(48, 265 + index * 70, 10, 10);
        text(skill, 80, 280 + index * 70, 25);
      });
      context.strokeStyle = '#c9a24b';
      context.strokeRect(740, 300, 195, 190);
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function createSceneResources() {
  const materials = Object.fromEntries(
    Object.entries(palette).map(([name, color]) => [
      name,
      new MeshStandardMaterial({
        color,
        roughness: name === 'metal' || name === 'gold' ? 0.35 : 0.78,
        metalness: name === 'gold' ? 0.55 : name === 'metal' ? 0.4 : 0,
      }),
    ]),
  ) as Record<Finish, MeshStandardMaterial>;
  const glass = new MeshStandardMaterial({
    color: '#9fcfc5',
    transparent: true,
    opacity: 0.17,
    roughness: 0.2,
    depthWrite: false,
  });
  const light = new MeshStandardMaterial({
    color: '#fff2ce',
    emissive: '#ffdca0',
    emissiveIntensity: 0.9,
  });
  const screens = {
    curriculum: makeScreen('curriculum'),
    website: makeScreen('website'),
    slides: makeScreen('slides'),
    identity: makeScreen('identity'),
  };
  const screenMaterials = Object.fromEntries(
    Object.entries(screens).map(([key, map]) => [
      key,
      new MeshBasicMaterial({ map, toneMapped: false }),
    ]),
  ) as Record<keyof typeof screens, MeshBasicMaterial>;
  const leftScreen = new PlaneGeometry(1, 1);
  const rightScreen = new PlaneGeometry(1, 1);
  for (const [geometry, offset] of [
    [leftScreen, 0],
    [rightScreen, 0.5],
  ] as const) {
    const uv = geometry.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * 0.5 + offset);
  }
  const geometries = {
    box: new BoxGeometry(1, 1, 1),
    rounded: new RoundedBoxGeometry(1, 1, 1, 2, 0.06),
    cylinder: new CylinderGeometry(0.5, 0.5, 1, 14),
    robe: new CylinderGeometry(0.31, 0.48, 1, 12),
    sphere: new SphereGeometry(0.5, 14, 10),
    arch: archGeometry(),
    plane: new PlaneGeometry(1, 1),
    leftScreen,
    rightScreen,
    ring: new TorusGeometry(0.5, 0.04, 6, 32),
  };
  return {
    materials,
    glass,
    light,
    screens: screenMaterials,
    geometries,
    dispose() {
      Object.values(materials).forEach((material) => material.dispose());
      Object.values(screenMaterials).forEach((material) => material.dispose());
      Object.values(screens).forEach((texture) => texture.dispose());
      Object.values(geometries).forEach((geometry) => geometry.dispose());
      glass.dispose();
      light.dispose();
    },
  };
}
export type SceneResources = ReturnType<typeof createSceneResources>;
