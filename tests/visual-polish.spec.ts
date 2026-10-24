import { expect, test } from '@playwright/test';

test.use({ reducedMotion: 'no-preference' });

test('scroll reveals preserve keyboard focus and interactive controls', async ({
  page,
}) => {
  await page.goto('/');
  const cards = page.locator('.project-card');
  await expect(cards.first()).toHaveClass(/reveal-pending/);

  const keyboardCard = cards.nth(1);
  await keyboardCard
    .getByRole('button', { name: /^Preview / })
    .evaluate((element) => element.focus({ preventScroll: true }));
  await expect(keyboardCard).toHaveCSS('opacity', '1');

  const card = cards.first();
  await card.scrollIntoViewIfNeeded();
  await expect(card).not.toHaveClass(/reveal-pending/);
  await expect(card).toHaveCSS('opacity', '1');
  await card.getByRole('button', { name: /^Preview / }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();

  await page.getByRole('link', { name: 'See the full roadmap' }).click();
  await expect(page).toHaveURL('/roadmap');
  await expect(page.locator('.roadmap-toggle').first()).toBeVisible();
});

test('reduced motion shows every reveal target and stops decorative animation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.reveal-pending')).toHaveCount(0);
  await expect(page.locator('.computer-art')).toHaveCSS(
    'animation-name',
    'none',
  );

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  await expect(page.locator('.reveal-pending').first()).toBeAttached();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() =>
      page
        .locator('.reveal-pending')
        .evaluateAll(
          (elements) =>
            elements.filter(
              (element) => getComputedStyle(element).opacity !== '1',
            ).length,
        ),
    )
    .toBe(0);
  await expect(page.locator('.computer-art')).toHaveCSS(
    'animation-name',
    'none',
  );

  await page.goto('/presentation');
  await expect(page.locator('.pres-slide')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.pres-vision-symbol')).toHaveCSS(
    'animation-name',
    'none',
  );
});

test('highlighted text stays readable in forced-colors mode', async ({
  page,
}) => {
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({
      colorScheme,
      forcedColors: 'active',
      reducedMotion: 'reduce',
    });
    for (const [route, selector] of [
      ['/', '.hero-copy h1 > span'],
      ['/presentation', '.pres-message > span'],
    ]) {
      await page.goto(route);
      const highlight = page.locator(selector);
      await expect(highlight).toHaveCSS('background-image', 'none');
      const colors = await highlight.evaluate((element) => {
        const style = getComputedStyle(element);
        return { fill: style.webkitTextFillColor, text: style.color };
      });
      expect(colors.fill).toBe(colors.text);
      expect(colors.fill).not.toBe('rgba(0, 0, 0, 0)');
    }
  }
});
