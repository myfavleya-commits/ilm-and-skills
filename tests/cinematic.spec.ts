import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';

test('architectural motion follows scroll rather than an autoplay timer', async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const arch = page.locator('.portal-arch').first();
  const initial = await arch.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.waitForTimeout(300);
  expect(
    await arch.evaluate((element) => getComputedStyle(element).transform),
  ).toBe(initial);

  await page.evaluate(() => window.scrollTo(0, 360));
  if (testInfo.project.name === 'desktop') {
    await expect
      .poll(() =>
        arch.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe(initial);
    await expect(arch).toHaveCSS('animation-timeline', '--hero');
  } else {
    // Touch/tablet layouts use the static architectural composition.
    await expect(arch).toHaveCSS('animation-name', 'none');
    expect(
      await arch.evaluate((element) => getComputedStyle(element).transform),
    ).toBe(initial);
  }
  await expect(page.locator('.arch-portal')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  expect(await page.locator('.home-cinematic').getByRole('link').count()).toBe(
    11,
  );
});

test('live reduced-motion changes stop every added timeline and expose all content', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 420));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const selector of [
    '.portal-arch',
    '.hero-illustration',
    '.transition-seal',
    '.footer-main',
  ]) {
    await expect(page.locator(selector).first()).toHaveCSS(
      'animation-name',
      'none',
    );
  }
  await expect(page.locator('.hero-illustration')).toHaveCSS(
    'transform',
    'none',
  );
  const hidden = await page
    .locator('.reveal-pending')
    .evaluateAll(
      (elements) =>
        elements.filter((element) => getComputedStyle(element).opacity !== '1')
          .length,
    );
  expect(hidden).toBe(0);
  await page
    .getByRole('button', {
      name: 'Preview Friday Khutbah Outline',
      exact: true,
    })
    .click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('every scene responds to scroll and cleanup survives route changes', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop',
    'Full perspective is desktop-only.',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const scenes = [
    ['.home-stage', '--pathway'],
    ['.audience-cards article', '--audience'],
    ['.transition-seal', '--star'],
    ['.home-showcase .project-card', '--showcase'],
    ['.footer-main', '--footer'],
  ];
  for (const [selector, timeline] of scenes) {
    const element = page.locator(selector).first();
    await element.scrollIntoViewIfNeeded();
    await expect(element).toHaveCSS('animation-timeline', timeline);
    await expect(element).toHaveCSS('opacity', '1');
  }
  await page
    .locator('.footer-main')
    .getByRole('link', { name: 'Explore the curriculum' })
    .click();
  await expect(page).toHaveURL('/courses');
  await expect(page.locator('.arch-portal')).toHaveCount(0);
  await page
    .getByRole('link', { name: 'Ilm & Skills home', exact: true })
    .click();
  await expect(page).toHaveURL('/');
  await expect(page.locator('.portal-arch')).toHaveCount(5);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('responsive scene checks and desktop/mobile screenshot gallery', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop',
    'One explicit matrix covers five viewport widths.',
  );
  test.setTimeout(180_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [360, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(width);
    const clippedHeadings = await page
      .locator('h1, h2, h3')
      .evaluateAll((elements) =>
        elements
          .filter((element) => element.scrollWidth > element.clientWidth + 1)
          .map((element) => element.textContent),
      );
    expect(clippedHeadings, `Clipped headings at ${width}px`).toEqual([]);

    if (width < 941) {
      await page.getByRole('button', { name: 'Open navigation menu' }).click();
      await expect(
        page.getByRole('navigation', {
          name: 'Mobile navigation',
          exact: true,
        }),
      ).toBeVisible();
      const mobileLink = page
        .getByRole('navigation', { name: 'Mobile navigation', exact: true })
        .getByRole('link', { name: 'Roadmap', exact: true });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(mobileLink).toBeFocused();
      await expect(mobileLink).toHaveCSS('outline-color', 'rgb(11, 79, 60)');
      await page.keyboard.press('Escape');
      await expect(
        page.getByRole('button', { name: 'Open navigation menu' }),
      ).toBeFocused();
    }

    if (width === 390 || width === 1440) {
      // Clear the intentionally tested focus state for the presentation captures.
      await page.locator('h1').click();
      await page.mouse.move(0, 0);
      const device = width === 390 ? 'mobile' : 'desktop';
      const directory = path.join(process.cwd(), 'artifacts', 'cinematic');
      await page.screenshot({
        path: path.join(directory, `${device}-hero.png`),
      });
      await page.screenshot({
        path: path.join(directory, `${device}-full.png`),
        fullPage: true,
      });
      for (const [name, selector] of [
        ['pathway', '.illuminated-panel'],
        ['audience', '.home-audience'],
        ['star', '.star-transition'],
        ['showcase', '.home-showcase > .container'],
        ['footer', '.site-footer'],
      ]) {
        await page.locator(selector).screenshot({
          path: path.join(directory, `${device}-${name}.png`),
          // Beyond-viewport capture can include a fixed link above the viewport.
          style: '.skip-link:not(:focus) { visibility: hidden !important; }',
        });
      }
      const accessibility = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        accessibility.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes,
        })),
      ).toEqual([]);
    }
  }
});
