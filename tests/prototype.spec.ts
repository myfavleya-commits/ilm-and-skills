import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { courses } from '../src/data/courses';
import { projects } from '../src/data/projects';

const routes = [
  '/',
  '/roadmap',
  '/courses',
  '/journey',
  '/projects',
  '/partnership',
  '/team',
  '/presentation',
];

test('all routes and course details render without console errors or horizontal overflow', async ({
  page,
}) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const route of [
    ...routes,
    ...courses.map((course) => `/courses/${course.id}`),
    '/missing',
    '/courses/missing',
  ]) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle(/Ilm & Skills/);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, `Horizontal overflow on ${route}`).toBe(false);
    if (route.startsWith('/courses/') && !route.endsWith('missing')) {
      await expect(page.locator('.lesson-list details')).not.toHaveCount(0);
      await expect(page.locator('.course-project-card')).toBeVisible();
      await expect(
        page.locator('.completion-section .check-list > li'),
      ).not.toHaveCount(0);
    }
  }
  expect(errors).toEqual([]);
});

test('course search, combined filtering, empty results, and reset work', async ({
  page,
}) => {
  await page.goto('/courses');
  await expect(page.locator('.course-card')).toHaveCount(12);
  await page
    .getByRole('searchbox', { name: 'Search courses' })
    .fill('Microsoft');
  await expect(page.locator('.course-card')).toHaveCount(3);
  await page
    .getByRole('button', { name: 'Office Productivity', exact: true })
    .click();
  await expect(page.locator('.course-card')).toHaveCount(3);
  await page.getByRole('searchbox').fill('not-a-real-course');
  await expect(page.getByText('No courses found, just yet.')).toBeVisible();
  await page
    .getByRole('button', { name: 'Show all courses', exact: true })
    .click();
  await expect(page.locator('.course-card')).toHaveCount(12);
  await page
    .locator('.course-card')
    .first()
    .getByRole('link', { name: /Explore/ })
    .click();
  await expect(page).toHaveURL(/courses\/computer-foundations$/);
});

test('roadmap expands all five stages and respects deep links', async ({
  page,
}) => {
  await page.goto('/roadmap#stage-4');
  await expect(page.locator('#stage-4 > button')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  for (let stage = 1; stage <= 5; stage++) {
    const button = page.locator(`#stage-${stage} > button`);
    if ((await button.getAttribute('aria-expanded')) !== 'true')
      await button.click();
    await expect(page.locator(`#stage-content-${stage}`)).toBeVisible();
    await expect(
      page.locator(`#stage-${stage} .stage-assessment`),
    ).toBeVisible();
    await button.press('Enter');
    await expect(page.locator(`#stage-content-${stage}`)).toBeHidden();
  }
});

test('all six project dialogs show actual outputs and restore focus on Escape', async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.goto('/projects');
  for (const project of projects) {
    const trigger = page.getByRole('button', {
      name: `Preview ${project.title}`,
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole('heading', {
        name: project.title,
        exact: true,
        level: 2,
      }),
    ).toBeVisible();
    await expect(
      dialog.locator('.dialog-output .output-preview'),
    ).toBeVisible();
    await expect(
      dialog.getByRole('heading', { name: 'How a teacher checks it' }),
    ).toBeVisible();
    const accessibility = await new AxeBuilder({ page })
      .include('dialog')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      accessibility.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
    ).toEqual([]);
    if (project.preview === 'slides') {
      await dialog.getByRole('button', { name: 'Next sample slide' }).click();
      await expect(dialog.getByText('Slide 2 of 5')).toBeVisible();
    }
    if (project.preview === 'website') {
      await dialog
        .getByRole('button', { name: 'Subjects', exact: true })
        .click();
      await expect(
        dialog.getByText('Thoughtful learning.', { exact: true }),
      ).toBeVisible();
    }
    const close = dialog.getByRole('button', { name: 'Close project preview' });
    await close.focus();
    await page.keyboard.press('Shift+Tab');
    expect(
      await page.evaluate(() =>
        Boolean(document.activeElement?.closest('dialog')),
      ),
    ).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  }
});

test('fictional learner pathways change later milestones and evidence', async ({
  page,
}) => {
  await page.goto('/journey');
  await page
    .getByRole('button', { name: 'Content & Marketing', exact: true })
    .click();
  await page.getByRole('button', { name: /Creates a content package/ }).click();
  await expect(page.locator('.journey-evidence h2')).toHaveText(
    'Creates a content package',
  );
  await expect(page.locator('.evidence-file')).toContainText(
    '7-day content plan',
  );
  await page
    .getByRole('button', { name: 'Online Teaching', exact: true })
    .click();
  await expect(page.locator('.journey-evidence h2')).toHaveText(
    'Creates a teaching package',
  );
  await page
    .getByRole('button', { name: 'Web Development', exact: true })
    .click();
  await expect(page.locator('.journey-evidence h2')).toHaveText(
    'Creates a teacher website',
  );
  await expect(page.getByRole('progressbar')).toHaveAttribute(
    'aria-valuenow',
    '4',
  );
});

test('pilot planner updates, resets, and prints only the discussion summary', async ({
  page,
}, testInfo) => {
  await page.goto('/partnership');
  await page
    .getByLabel('Starting level', { exact: true })
    .selectOption('specialization');
  await page
    .getByLabel('Device availability', { exact: true })
    .selectOption('limited');
  await page.getByLabel('Sessions per week', { exact: true }).selectOption('3');
  await page
    .getByLabel('Specialization', { exact: true })
    .selectOption('teaching');
  const summary = page.locator('.pilot-print-summary');
  await expect(summary).toContainText('Ready for specialization');
  await expect(summary).toContainText('Limited lab access');
  await expect(summary).toContainText('3 sessions per week');
  await expect(summary).toContainText('Online teaching');
  await page.getByText('Edit printout contact details').click();
  await page.getByLabel('Team email', { exact: true }).fill('team@example.com');
  await expect(summary).toContainText('team@example.com');
  await page.evaluate(() => {
    window.print = () => {
      document.documentElement.dataset.printInvoked = 'true';
    };
  });
  await page
    .getByRole('button', { name: 'Print summary', exact: true })
    .click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-print-invoked',
    'true',
  );
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.site-footer')).toBeHidden();
  await expect(summary).toBeVisible();
  await expect(
    summary.getByRole('heading', { name: 'Proposed responsibilities' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Print summary', exact: true }),
  ).toBeHidden();
  if (testInfo.project.name === 'desktop') {
    await page.pdf({
      path: testInfo.outputPath('pilot-summary.pdf'),
      format: 'A4',
      printBackground: true,
    });
    await page.screenshot({
      path: testInfo.outputPath('pilot-print.png'),
      fullPage: true,
    });
  }
  await page.emulateMedia({ media: 'screen' });
  await page.getByRole('button', { name: 'Reset planner' }).click();
  await expect(page.getByLabel('Starting level', { exact: true })).toHaveValue(
    'first-time',
  );
  await expect(
    page.getByLabel('Device availability', { exact: true }),
  ).toHaveValue('pairs');
  await expect(
    page.getByLabel('Sessions per week', { exact: true }),
  ).toHaveValue('2');
  await expect(page.getByLabel('Specialization', { exact: true })).toHaveValue(
    'web',
  );
  await expect(summary).toContainText('[Add your team email]');
});

test('email practice is a resettable simulation with no network submission', async ({
  page,
}) => {
  await page.goto('/courses/computer-foundations');
  const submissions: string[] = [];
  page.on('request', (request) => {
    if (request.method() !== 'GET') submissions.push(request.url());
  });
  await page.getByLabel('Subject', { exact: true }).fill('My first study note');
  await page
    .getByLabel(/Message Use sample/)
    .fill('Hello teacher, here is my practice note. Thank you.');
  await page
    .getByLabel('Sample attachment', { exact: true })
    .selectOption('study');
  await page.getByRole('button', { name: 'Check my practice draft' }).click();
  await expect(page.locator('.email-result')).toContainText(
    'Nothing has been sent.',
  );
  expect(submissions).toEqual([]);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByLabel('Subject', { exact: true })).toHaveValue('');
  await expect(page.locator('.email-result')).toBeEmpty();
});

test('presentation supports keyboard, progress selection, fullscreen fallback, and offline use', async ({
  page,
  context,
}) => {
  await page.addInitScript(() => {
    Element.prototype.requestFullscreen = () =>
      Promise.reject(new Error('Unavailable for test'));
  });
  await page.goto('/presentation');
  await expect(
    page.getByRole('heading', { name: 'Our Vision', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Previous', exact: true }),
  ).toBeDisabled();
  await page.getByRole('button', { name: 'Enter fullscreen' }).click();
  await expect(
    page
      .getByRole('status')
      .filter({ hasText: 'Fullscreen could not be changed' }),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await context.setOffline(true);
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('heading', { name: 'Who We Serve', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('End');
  await expect(
    page.getByRole('heading', { name: 'Partnership Discussion', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Next', exact: true }),
  ).toBeDisabled();
  await page.keyboard.press('Home');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page
    .getByRole('button', {
      name: 'Go to slide 4: The Learning Roadmap',
      exact: true,
    })
    .click();
  await expect(
    page.getByRole('heading', { name: 'The Learning Roadmap', exact: true }),
  ).toBeVisible();
  const slideTitles = [
    'Our Vision',
    'Who We Serve',
    'Starting from Zero',
    'The Learning Roadmap',
    'Practical Student Projects',
    'Specialization Pathways',
    'How a Pilot Could Work',
    'Partnership Discussion',
  ];
  for (const [index, title] of slideTitles.entries()) {
    await page
      .getByRole('button', {
        name: `Go to slide ${index + 1}: ${title}`,
        exact: true,
      })
      .click();
    await expect(
      page.getByRole('heading', { name: title, exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      ),
      `Overflow on slide ${index + 1}`,
    ).toBe(false);
  }
  await context.setOffline(false);
  await page
    .getByRole('link', { name: 'Exit presentation', exact: true })
    .click();
  await expect(page).toHaveURL('/');
});

test('navigation works with keyboard and the mobile menu closes with Escape', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name !== 'desktop') {
    const open = page.getByRole('button', { name: 'Open navigation menu' });
    await open.click();
    await expect(
      page.getByRole('navigation', { name: 'Mobile navigation', exact: true }),
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(open).toBeFocused();
    await expect(
      page.getByRole('navigation', { name: 'Mobile navigation', exact: true }),
    ).not.toBeVisible();
    await open.click();
    await page
      .getByRole('navigation', { name: 'Mobile navigation', exact: true })
      .getByRole('link', { name: 'Courses', exact: true })
      .click();
  } else {
    const link = page
      .getByRole('navigation', { name: 'Main navigation', exact: true })
      .getByRole('link', { name: 'Courses', exact: true });
    await link.focus();
    await page.keyboard.press('Enter');
  }
  await expect(page).toHaveURL('/courses');
});

test('screenshots and automated accessibility review', async ({
  page,
}, testInfo) => {
  test.setTimeout(120_000);
  const issues: {
    route: string;
    violations: {
      id: string;
      nodes: { target: unknown; summary: string | undefined }[];
    }[];
  }[] = [];
  for (const route of [
    ...routes,
    ...courses.map((course) => `/courses/${course.id}`),
  ]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    if (
      route === '/' ||
      route === '/presentation' ||
      route === '/roadmap' ||
      route === '/courses'
    ) {
      await page.screenshot({
        path: testInfo.outputPath(`${route.slice(1) || 'home'}.png`),
        fullPage: true,
      });
      if (route === '/')
        await page.screenshot({
          path: testInfo.outputPath('home-viewport.png'),
        });
    }
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    if (results.violations.length)
      issues.push({
        route,
        violations: results.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        })),
      });
  }
  await testInfo.attach('accessibility-results', {
    body: JSON.stringify(issues, null, 2),
    contentType: 'application/json',
  });
  expect(issues).toEqual([]);
});
