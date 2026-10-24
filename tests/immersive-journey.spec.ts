import { expect, test } from '@playwright/test';
import type { Page, TestInfo } from '@playwright/test';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { site } from '../src/config/site';
import { courses } from '../src/data/courses';

const readyTimeout = 45_000;
const roadmapLabel = 'Explore the Learning Roadmap';
const scenes = [
  { name: '01-madrasa-exterior', progress: 0.035, phase: 0 },
  { name: '02-learning-center', progress: 0.23, phase: 1 },
  { name: '03-computer-classroom', progress: 0.38, phase: 2 },
  { name: '04-digital-learning', progress: 0.61, phase: 3 },
  { name: '05-project-studio', progress: 0.72, phase: 4 },
  { name: '06-community-terrace', progress: 0.975, phase: 5 },
] as const;

async function startWebGL(page: Page, testInfo: TestInfo) {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const journey = page.locator('.educational-journey');
  await journey.evaluate((element) => {
    window.scrollTo({
      top: window.scrollY + element.getBoundingClientRect().top,
      behavior: 'instant',
    });
  });
  await expect(
    journey,
    'A real Chromium WebGL renderer must initialize; static fallback is not a WebGL pass. Check GPU/SwiftShader availability and motion eligibility.',
  ).toHaveAttribute('data-mode', 'webgl', { timeout: readyTimeout });
  await expect(journey).toHaveAttribute('data-quality', /^(full|lite)$/);
  const canvas = journey.locator('canvas');
  await expect(canvas).toHaveCount(1);
  await expect(canvas).toBeVisible();
  const renderer = await canvas.evaluate((element) => {
    const gl = (element as HTMLCanvasElement).getContext('webgl2');
    if (!gl) return null;
    return {
      version: String(gl.getParameter(gl.VERSION)),
      renderer: String(gl.getParameter(gl.RENDERER)),
      contextLost: gl.isContextLost(),
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };
  });
  await testInfo.attach('actual-webgl-context', {
    body: JSON.stringify(renderer, null, 2),
    contentType: 'application/json',
  });
  expect(
    renderer,
    'The nested canvas must have an actual WebGL2 context.',
  ).not.toBeNull();
  expect(renderer?.version).toMatch(/^WebGL 2/);
  expect(renderer?.contextLost).toBe(false);
  expect(renderer?.width).toBeGreaterThan(0);
  expect(renderer?.height).toBeGreaterThan(0);
  await expect(journey.locator('svg.journey-fallback')).toBeHidden();
  return journey;
}

async function scrollToProgress(page: Page, progress: number, phase: number) {
  const journey = page.locator('.educational-journey');
  await expect(journey).toHaveAttribute('data-mode', 'webgl');
  await journey.evaluate((element, target) => {
    // Match ScrollTrigger's top/top -> bottom/bottom range, not section height.
    const distance = (element as HTMLElement).offsetHeight - window.innerHeight;
    if (distance <= 0)
      throw new Error('The WebGL journey has no scroll stage.');
    const top = window.scrollY + element.getBoundingClientRect().top;
    window.scrollTo({ top: top + target * distance, behavior: 'instant' });
  }, progress);
  await expect
    .poll(
      async () =>
        Math.abs(
          Number(await journey.getAttribute('data-journey-progress')) -
            progress,
        ),
      {
        timeout: 20_000,
        message: `Scroll progress must reach ${progress} within 0.015.`,
      },
    )
    .toBeLessThanOrEqual(0.015);
  await expect(journey).toHaveAttribute('data-phase', String(phase));

  let previous = '';
  let stableSamples = 0;
  await expect
    .poll(
      async () => {
        const state = await journey.evaluate((element) => ({
          progress: Number(
            (element as HTMLElement).dataset.journeyProgress ?? NaN,
          ),
          camera: (element as HTMLElement).dataset.cameraPosition ?? '',
        }));
        const coordinates = state.camera.split(',').map(Number);
        const valid =
          Math.abs(state.progress - progress) <= 0.0005 &&
          coordinates.length === 3 &&
          coordinates.every(Number.isFinite);
        const signature = JSON.stringify(state);
        stableSamples = valid && signature === previous ? stableSamples + 1 : 0;
        previous = signature;
        return stableSamples;
      },
      {
        timeout: 20_000,
        intervals: [150, 250, 350],
        message:
          'GSAP scrub and the rendered camera must settle before capture or comparison.',
      },
    )
    .toBeGreaterThanOrEqual(2);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  const camera = (await journey.getAttribute('data-camera-position'))!
    .split(',')
    .map(Number);
  expect(camera).toHaveLength(3);
  expect(camera.every(Number.isFinite)).toBe(true);
  return camera;
}

function cameraDistance(left: number[], right: number[]) {
  return Math.hypot(
    ...left.map((coordinate, index) => coordinate - right[index]),
  );
}

async function captureScene(page: Page, testInfo: TestInfo, name: string) {
  const parent = path.join(process.cwd(), 'artifacts');
  expect(
    (await stat(parent)).isDirectory(),
    'The workspace artifacts parent must exist.',
  ).toBe(true);
  const screenshot = path.join(
    parent,
    'journey-3d',
    `${testInfo.project.name}-${name}.png`,
  );
  await page.screenshot({ path: screenshot });
  await testInfo.attach(name, { path: screenshot, contentType: 'image/png' });
}

async function expectStaticJourney(page: Page) {
  const journey = page.locator('.educational-journey');
  await expect(journey).toHaveAttribute('data-mode', 'static');
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(journey.locator('svg.journey-fallback')).toBeVisible();
  await expect(journey.locator('.journey-viewport')).toHaveCSS(
    'position',
    'relative',
  );
  const height = await journey.evaluate((element) => ({
    stage: (element as HTMLElement).offsetHeight,
    viewport: window.innerHeight,
  }));
  expect(
    height.stage,
    'Static mode must not retain the long pinned scroll stage.',
  ).toBeLessThanOrEqual(height.viewport + 1);
  await journey.scrollIntoViewIfNeeded();
}

async function skipToContent(page: Page) {
  const skip = page.locator('.educational-journey').getByRole('button', {
    name: 'Skip to content',
    exact: true,
  });
  await expect(skip).toBeVisible();
  await skip.click();
  const purpose = page.locator('.educational-journey + .purpose-strip');
  await expect(purpose).toBeInViewport();
  await expect
    .poll(async () =>
      Math.abs(
        await purpose.evaluate(
          (element) => element.getBoundingClientRect().top,
        ),
      ),
    )
    .toBeLessThanOrEqual(2);
  await expect(page.locator('.home-pathway .button').first()).toBeFocused();
  await expect(page).toHaveURL('/');
}

test('desktop real-WebGL six-scene gallery reverses deterministically and cleans up on the roadmap route', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop',
    'The heavy six-scene gallery runs only in the desktop project.',
  );
  test.setTimeout(180_000);
  const journey = await startWebGL(page, testInfo);
  const captions = [
    await page.locator('.hero-copy h1').innerText(),
    site.shortTagline,
    courses[0].title,
    await page.locator('.home-pathway .section-heading h2').innerText(),
    await page.locator('.home-showcase .section-heading h2').innerText(),
    site.tagline,
  ];
  const finalButton = journey.getByRole('button', {
    name: roadmapLabel,
    exact: true,
  });
  const cameras: number[][] = [];
  for (const scene of scenes) {
    const camera = await scrollToProgress(page, scene.progress, scene.phase);
    if (cameras.length) {
      expect(
        cameraDistance(camera, cameras[cameras.length - 1]),
        'Scrolling to another scene must move the actual camera.',
      ).toBeGreaterThan(0.1);
    }
    cameras.push(camera);
    await expect(journey.locator('.journey-caption > p')).toHaveText(
      captions[scene.phase],
    );
    if (scene.phase === 5) await expect(finalButton).toBeVisible();
    else await expect(finalButton).toBeHidden();
    await captureScene(page, testInfo, scene.name);
  }

  for (let index = scenes.length - 2; index >= 0; index--) {
    const scene = scenes[index];
    const camera = await scrollToProgress(page, scene.progress, scene.phase);
    expect(
      cameraDistance(camera, cameras[index]),
      `Reverse scroll must revisit the same ${scene.name} camera within 0.04 world units.`,
    ).toBeLessThanOrEqual(0.04);
    await expect(journey.locator('.journey-caption > p')).toHaveText(
      captions[scene.phase],
    );
    await expect(finalButton).toBeHidden();
  }

  const last = scenes[5];
  const finalCamera = await scrollToProgress(page, last.progress, last.phase);
  expect(cameraDistance(finalCamera, cameras[5])).toBeLessThanOrEqual(0.04);
  await expect(
    page
      .locator('.hero-actions')
      .getByRole('link', { name: roadmapLabel, exact: true }),
  ).toHaveAttribute('href', '/roadmap');
  await finalButton.click();
  await expect(page).toHaveURL('/roadmap');
  await expect(page.locator('.roadmap-toggle').first()).toBeVisible();
  await expect(page.locator('.educational-journey')).toHaveCount(0);
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('landscape keeps the skip control and final action inside the actual viewport', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'One explicit landscape matrix.');
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 844, height: 390 });
  const journey = await startWebGL(page, testInfo);
  await scrollToProgress(page, 0.975, 5);
  for (const selector of ['.journey-skip', '.journey-roadmap', '.journey-caption']) {
    const box = await journey.locator(selector).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(391);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expectStaticJourney(page);
  await skipToContent(page);
});

test('actual WebGL context loss returns to the usable static alternative', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Context-loss lifecycle is shared.');
  test.setTimeout(90_000);
  const journey = await startWebGL(page, testInfo);
  const extensionAvailable = await journey.locator('canvas').evaluate((canvas) => {
    const gl = (canvas as HTMLCanvasElement).getContext('webgl2');
    const extension = gl?.getExtension('WEBGL_lose_context');
    extension?.loseContext();
    return Boolean(extension);
  });
  expect(extensionAvailable).toBe(true);
  await expectStaticJourney(page);
  await skipToContent(page);
});

test('mobile 360px renders real lite WebGL from exterior to classroom and skips without overflow', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'mobile',
    'The explicit 360px journey runs only in the mobile project.',
  );
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 360, height: 800 });
  const journey = await startWebGL(page, testInfo);
  await expect(journey).toHaveAttribute('data-quality', 'lite');
  let exterior: number[] = [];
  for (const scene of [scenes[0], scenes[2]]) {
    const camera = await scrollToProgress(page, scene.progress, scene.phase);
    if (scene.phase === 0) exterior = camera;
    else {
      expect(cameraDistance(camera, exterior)).toBeGreaterThan(0.1);
      await expect(journey.locator('.journey-caption > p')).toHaveText(
        courses[0].title,
      );
    }
    await expect(journey.locator('canvas')).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      ),
    ).toBeLessThanOrEqual(1);
    await captureScene(page, testInfo, scene.name);
  }
  await skipToContent(page);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
});

test('reduced motion preserves the original hero and content order with a short static SVG journey', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.site-header')).toBeVisible();
  await expect(page.locator('.home-hero h1')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(
    page
      .locator('.home-hero')
      .getByRole('link', { name: roadmapLabel, exact: true }),
  ).toHaveAttribute('href', '/roadmap');
  await expect(
    page.locator('.hero-environment + .educational-journey + .purpose-strip'),
  ).toHaveCount(1);
  const journey = page.locator('.educational-journey');
  await expect(journey.locator('.journey-caption > p')).toHaveText(
    await page.locator('.hero-copy h1').innerText(),
  );
  await expect(journey.locator('.journey-caption > span')).toHaveText(
    await page.locator('.hero-kicker > span:last-child').innerText(),
  );
  await expect(journey.locator('.journey-identity > span')).toHaveText(
    site.name,
  );
  await expect(
    journey.getByRole('button', { name: roadmapLabel, exact: true }),
  ).toBeVisible();
  await expectStaticJourney(page);
  await skipToContent(page);
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('switching to reduced motion while real WebGL is active removes the canvas and retains usable static content', async ({
  page,
}, testInfo) => {
  test.setTimeout(90_000);
  await startWebGL(page, testInfo);
  await scrollToProgress(page, scenes[2].progress, scenes[2].phase);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expectStaticJourney(page);
  await skipToContent(page);
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('WebGL initialization failure retains 2D support, static SVG, and a working skip button', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    let attempts = 0;
    Object.defineProperty(window, '__journeyWebglAttempts', {
      get: () => attempts,
    });
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      contextId: string,
      ...args: unknown[]
    ) {
      if (/^webgl/.test(contextId)) {
        attempts++;
        return null;
      }
      return Reflect.apply(original, this, [contextId, ...args]);
    } as typeof original;
  });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const journey = page.locator('.educational-journey');
  await journey.evaluate((element) =>
    window.scrollTo({
      top: window.scrollY + element.getBoundingClientRect().top,
      behavior: 'instant',
    }),
  );
  await expect
    .poll(
      () =>
        page.evaluate(() =>
          Number(Reflect.get(window, '__journeyWebglAttempts')),
        ),
      {
        timeout: readyTimeout,
        message:
          'The failure test must actually reach WebGL initialization, not an unrelated static-mode eligibility guard.',
      },
    )
    .toBeGreaterThan(0);
  expect(
    await page.evaluate(() =>
      Boolean(document.createElement('canvas').getContext('2d')),
    ),
    'The failure override must preserve the native 2D canvas context.',
  ).toBe(true);
  await expectStaticJourney(page);
  await skipToContent(page);
  await expect(page.locator('canvas')).toHaveCount(0);
});
