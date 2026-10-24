# Ilm & Skills

**Islamic Knowledge. Modern Skills. Wider Impact.**

A frontend prototype for presenting a proposed practical-skills program alongside Islamic education. It supports curriculum exploration, illustrative projects, a fictional learner journey, and institutional pilot discussions.

This is not a production learning management system (LMS), an accredited program, or a certification service. Courses, teaching roles, project outputs, and feedback describe a proposal, not verified delivery, partnerships, or learner results.

## Stack

React 19, TypeScript, Vite 6, Tailwind CSS 4, React Router 7, and Lucide icons. Manrope and DM Sans are bundled from local `@fontsource` packages. The app uses local content and assets, with no external API, analytics, CDN, or remote-font requests.

## Local Setup

Use Node.js 22.12+ or Node.js 24 LTS with a current compatible npm release. Run commands from `C:\Users\Muhammad Sami\Documents\ILM & SKILLS`.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`. No environment variables, accounts, or API keys are required. Dependency installation and the initial Playwright browser download require internet access.

| Command             | Purpose                                                                       |
| ------------------- | ----------------------------------------------------------------------------- |
| `npm install`       | Install the project dependencies.                                             |
| `npm run dev`       | Start the Vite development server.                                            |
| `npm run build`     | Run the TypeScript project check and create the production bundle in `dist/`. |
| `npm run typecheck` | Run the TypeScript project check without a Vite build.                        |
| `npm run preview`   | Serve an existing production build locally, normally on port 4173.            |
| `npm run test:e2e`  | Run the Playwright end-to-end suite.                                          |

The npm scripts deliberately invoke local CLI files through `node` rather than executable shims, avoiding Windows path issues in a folder containing spaces and `&`. Keep this pattern when changing scripts. The dev and preview servers bind to `0.0.0.0`; use them only on a trusted network.

To review the production bundle locally:

```sh
npm run build
npm run preview
```

Vite preview is a local review server, not a production hosting service.

## Quality Checks

Install Playwright's Chromium browser after installing dependencies:

```sh
node ./node_modules/playwright/cli.js install chromium
```

Then run:

```sh
npm run typecheck
npm run build
npm run test:e2e
```

The end-to-end suite runs 30 checks in Chromium across desktop (1440px), tablet (834px), and mobile (360px) layouts. It covers every route and course page, search and filters, roadmap expansion, dialog keyboard/focus behavior, pathway switching, pilot planning and reset, print isolation, simulated email, and all eight presentation slides while offline. Automated axe checks cover the main routes, all course pages, and all six open project dialogs. Screenshots, traces for failures, and a sample A4 pilot PDF are written to `test-results/`; the browsable report is in `playwright-report/`.

Run the suite for current results. Automated checks are not a full accessibility certification or a claim of production readiness. For meeting preparation, also review the printed brief and browser fullscreen behavior on the intended device; Firefox, Safari, and physical printers are not covered by this Chromium suite.

## Routes

| Route                | Purpose                                                                            |
| -------------------- | ---------------------------------------------------------------------------------- |
| `/`                  | Program vision and introduction.                                                   |
| `/roadmap`           | Five readiness-based learning stages and pathway guidance.                         |
| `/courses`           | Searchable, category-filtered proposed course catalog.                             |
| `/courses/:courseId` | Course objectives, lesson sequence, practice, mini-project, and completion checks. |
| `/journey`           | Fictional learner milestones, example evidence, and sample teacher feedback.       |
| `/projects`          | Six illustrative project previews and teacher-review criteria.                     |
| `/partnership`       | Proposed responsibilities, Pilot Planner, and printable discussion brief.          |
| `/team`              | Teaching roles and proposed institutional coordination.                            |
| `/presentation`      | Standalone eight-slide meeting presentation.                                       |

Unknown routes and course IDs show a not-found page.

## Content And Branding

| Source                              | Edit Here                                                                                                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/config/site.ts`                | Brand name, taglines, team roles, and email, phone, and location placeholders.                                                                     |
| `src/data/courses.ts`               | All 12 proposed courses, categories, prerequisites, objectives, lessons, practice, mini-projects, completion criteria, and suggested next courses. |
| `src/data/roadmap.ts`               | Five learning stages, readiness checks, activities, outputs, and linked course IDs.                                                                |
| `src/data/projects.ts`              | Six sample project briefs, skills, evaluation criteria, course links, and preview types.                                                           |
| `src/data/types.ts`                 | Shared curriculum and project types.                                                                                                               |
| `src/pages/Journey.tsx`             | Fictional learner milestones, example evidence labels, and sample teacher feedback.                                                                |
| `src/components/ProjectPreview.tsx` | Locally rendered sample output designs and preview interactions.                                                                                   |
| `src/pages/Presentation.tsx`        | Eight-slide presentation copy and visuals.                                                                                                         |

The proposed courses are:

| Course ID               | Course                                             |
| ----------------------- | -------------------------------------------------- |
| `computer-foundations`  | Computer and Internet Foundations                  |
| `word`                  | Microsoft Word for Study and Teaching              |
| `excel`                 | Microsoft Excel for Everyday Administration        |
| `powerpoint`            | Microsoft PowerPoint for Clear Lessons             |
| `english`               | Practical English for Learning and Communication   |
| `arabic`                | Modern Arabic Communication and Digital Writing    |
| `web-development`       | Web Development from Pages to a Responsive Website |
| `content-creation`      | Content Creation for Clear Educational Messages    |
| `digital-marketing`     | Digital Marketing for Useful Educational Outreach  |
| `online-teaching`       | Online Teaching with Practice, Feedback, and Care  |
| `professional-practice` | Professional Practice and a Responsible Portfolio  |
| `ai-literacy`           | Optional AI Literacy with Human Review             |

The six project previews are Friday Khutbah Outline, Class Attendance Tracker, Five-Slide Lesson Presentation, Teacher Profile Website, Online Class Promotion Plan, and Mini Online Course. They are rendered examples, not actual student submissions, downloadable Office files, published campaigns, or live services.

Replace bracketed contact placeholders with approved details before sharing. Preserve sample labels and religious-reference placeholders until qualified teachers verify the sources, wording, and context. Do not invent scripture, rulings, credentials, partners, testimonials, enrollment figures, or outcome claims. Curriculum descriptions of outside tools do not mean those tools are integrated into this prototype.

## Local Interactions

- **Pilot Planner:** On `/partnership`, change starting level, device availability, sessions per week, and specialization to update the discussion brief. Selections are React component state only and reset when leaving the page, reloading, or choosing **Reset planner**.
- **Editable contact details:** Expand **Edit printout contact details** to edit the draft inline. These changes affect only the current brief, not `site.ts`; leaving, reloading, or resetting restores configured values.
- **Print summary:** Calls `window.print()`. Print styles hide navigation, controls, and unrelated page content, leaving the discussion brief, proposed responsibilities, and contact details. Review print preview before printing or saving a PDF.
- **Student journey:** Pathway and milestone controls switch locally authored fictional evidence and teacher feedback. They do not track a real learner, save progress, or perform an assessment.
- **Email practice:** The Computer Foundations course includes a local draft-check simulation with a fictional recipient and simulated attachments. It sends no email and uploads no file.
- **Project previews:** Open local dialogs to inspect sample outputs and review criteria. The sample lesson slides and teacher website tabs are demonstrations, not external documents or sites.

No `localStorage` is used. Interactive state is temporary; there is no cross-visit persistence or data submission.

## Presentation

Open `/presentation` for eight slides with **Previous**, **Next**, slide selectors, a slide count, and progress indicators.

- Right or Down arrow: next slide.
- Left or Up arrow: previous slide.
- Home: first slide. End: last slide.
- **Exit presentation:** return to the home page.
- **Full screen / Exit fullscreen:** request or leave browser fullscreen. Unsupported or rejected requests show a notice and leave the presentation usable in the normal window.

## Meeting And Hosting

All app page modules are eagerly imported rather than lazy-loaded, and font assets are served locally. Once the production app and required assets have loaded, route navigation and prototype interactions need no external internet service. This is useful for a meeting, but it is not an offline-installation guarantee.

There is no service worker. Full offline hard reloads are not promised, and normal use still needs the dev server, preview server, or deployed static host. Keep the local server running during a demonstration. Development mode can request additional modules and use Vite's local hot-reload connection; it is not an offline deployment.

Production hosting should serve `dist/` over HTTP(S). Because the app uses `BrowserRouter`, configure an SPA fallback that serves `index.html` for application routes while serving asset files normally. Direct visits and refreshes must work on paths such as `/roadmap` and `/courses/computer-foundations`; without that fallback, course deep links can return a server 404. Do not open `dist/index.html` directly with `file://`.

## Scope And Next Steps

There is no authentication, database, real learner record system, email delivery, enrollment flow, submission upload, live video, payment processing, or AI integration. Editable fields and buttons do not connect to those services.

Actual accounts, learner records, submissions, emails, media hosting, and video delivery require backend services with reviewed authentication, authorization, validation, storage, privacy, retention, and sharing permissions. Any use involving minors also requires institution-approved safeguarding, appropriate guardian consent, supervised communication, and restricted media access. A frontend prototype alone does not provide those protections.
