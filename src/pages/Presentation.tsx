import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Globe2,
  GraduationCap,
  Handshake,
  Keyboard,
  LogOut,
  Maximize2,
  Minimize2,
  Monitor,
  MousePointer2,
  PenTool,
  Sprout,
  Users,
  Video,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandMark, Icon } from '../components/ui';
import { site } from '../config/site';
import { projects } from '../data/projects';
import { stages } from '../data/roadmap';
import './presentation.css';

const slides = [
  {
    title: 'Our Vision',
    message: 'Rooted in knowledge.',
    emphasis: 'Growing in possibility.',
    description:
      'Practical digital and communication skills that complement Islamic education, helping learners share knowledge and serve with care.',
    visual: 'vision',
  },
  {
    title: 'Who We Serve',
    message: 'Start with the learner.',
    emphasis: 'Respect the foundation.',
    description:
      "For students, educators, and teams in Islamic institutions. Build on existing knowledge, with support shaped around each learner's experience and needs.",
    visual: 'audience',
  },
  {
    title: 'Starting from Zero',
    message: 'Every first step',
    emphasis: 'deserves patience.',
    description:
      'No previous computer experience is required. Begin with everyday tasks, guided practice, and the freedom to ask, repeat, and try again.',
    visual: 'foundations',
  },
  {
    title: 'The Learning Roadmap',
    message: 'A clear direction.',
    emphasis: "A learner's own pace.",
    description:
      'Build confidence, create useful resources, choose a specialty, and develop a sample portfolio. Move forward through demonstrated readiness, not a fixed calendar.',
    visual: 'roadmap',
  },
  {
    title: 'Practical Student Projects',
    message: 'Make something useful.',
    emphasis: 'Then make it better.',
    description:
      'Practice with an outline, fictional class records, or a demonstration website. Teacher feedback and a thoughtful revision are part of the work.',
    visual: 'projects',
  },
  {
    title: 'Specialization Pathways',
    message: 'One focused pathway.',
    emphasis: 'Not every tool at once.',
    description:
      'Choose with a teacher, based on interests, readiness, and equipment. AI can support a checked draft; it is never a source of religious authority.',
    visual: 'pathways',
  },
  {
    title: 'How a Pilot Could Work',
    message: 'Begin small.',
    emphasis: 'Review together.',
    description:
      'Agree on a manageable group, timetable, device access, and supervision. Try guided tasks, review the work, then decide whether to adapt, continue, or pause.',
    visual: 'pilot',
  },
  {
    title: 'Partnership Discussion',
    message: 'What would be useful',
    emphasis: 'for your institution?',
    description:
      "Let's begin with your learners, priorities, and constraints. Together, we can explore a suitable pilot, or decide that now is not the right time.",
    visual: 'discussion',
  },
] as const;

const sampleProjects = projects.filter((project) =>
  ['khutbah', 'attendance', 'teacher-website'].includes(project.id),
);

function SlideVisual({ kind }: { kind: (typeof slides)[number]['visual'] }) {
  switch (kind) {
    case 'vision':
      return (
        <>
          <svg
            className="pres-arch"
            viewBox="0 0 460 460"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M35 435V213C35 106 230 25 230 25s195 81 195 188v222M64 435V223C64 129 230 57 230 57s166 72 166 166v212M94 435V233C94 152 230 91 230 91s136 61 136 142v202"
              stroke="currentColor"
            />
            <path
              d="m230 10 5 10 10 5-10 5-5 10-5-10-10-5 10-5Z"
              fill="currentColor"
              stroke="none"
            />
          </svg>
          <div className="pres-vision-symbol">
            <BookOpen size={66} strokeWidth={1.2} aria-hidden="true" />
          </div>
          <p className="pres-vision-label">Islamic knowledge</p>
          <div className="pres-vision-bridge" aria-hidden="true">
            <span />
            <Sprout size={24} strokeWidth={1.4} />
            <span />
          </div>
          <div className="pres-vision-skills">
            <Monitor size={23} aria-hidden="true" />
            <span>Practical skills</span>
            <Globe2 size={23} aria-hidden="true" />
          </div>
          <p className="pres-vision-caption">
            Learn with purpose. Serve with care.
          </p>
        </>
      );

    case 'audience':
      return (
        <>
          <p className="pres-visual-eyebrow">People before tools</p>
          <div className="pres-audiences">
            {[
              {
                title: 'Madrasa students',
                detail: 'Skills alongside existing studies',
                icon: GraduationCap,
              },
              {
                title: 'Islamic educators',
                detail: 'Clearer resources and communication',
                icon: BookOpen,
              },
              {
                title: 'Institutional teams',
                detail: 'Practical support for local learning',
                icon: Users,
              },
            ].map(({ title, detail, icon: AudienceIcon }) => (
              <div className="pres-audience" key={title}>
                <span className="pres-icon-tile">
                  <AudienceIcon
                    size={25}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <strong>{title}</strong>
                  <p>{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="pres-visual-note">
            Different starting points. Equal respect.
          </p>
        </>
      );

    case 'foundations':
      return (
        <>
          <p className="pres-visual-eyebrow">
            Small task. Meaningful beginning.
          </p>
          <div className="pres-practice-screen">
            <div className="pres-screen-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="pres-practice-file">
              <FolderOpen
                className="pres-folder"
                size={64}
                strokeWidth={1.2}
                aria-hidden="true"
              />
              <span className="pres-file-label">
                <FileText size={18} aria-hidden="true" />
                lesson-note.txt
              </span>
              <MousePointer2
                className="pres-practice-cursor"
                size={32}
                strokeWidth={1.3}
                aria-hidden="true"
              />
            </div>
            <p className="pres-screen-caption">A fictional lesson note</p>
          </div>
          <div className="pres-practice-sequence">
            <span>Save it</span>
            <ArrowRight size={15} aria-hidden="true" />
            <span>Close it</span>
            <ArrowRight size={15} aria-hidden="true" />
            <span>Find it again</span>
          </div>
          <p className="pres-visual-note">
            Demonstrate. Practice. Repeat as needed.
          </p>
        </>
      );

    case 'roadmap':
      return (
        <>
          <p className="pres-visual-eyebrow">
            From a first file to a sample portfolio
          </p>
          <ol className="pres-roadmap">
            {stages.map((stage, index) => (
              <li className="pres-roadmap-stage" key={stage.id}>
                <span className="pres-roadmap-icon">
                  <Icon name={stage.icon} size={21} />
                </span>
                <span className="pres-roadmap-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{stage.title}</span>
              </li>
            ))}
          </ol>
          <p className="pres-roadmap-note">
            English or Arabic can run alongside, according to need.
          </p>
        </>
      );

    case 'projects':
      return (
        <>
          <div className="pres-project-heading">
            <p className="pres-visual-eyebrow">A sample workbench</p>
            <span className="pres-sample-label">Illustrative only</span>
          </div>
          <div className="pres-projects">
            {sampleProjects.map((project) => (
              <div
                className={`pres-project pres-project-${project.preview}`}
                key={project.id}
              >
                <div className="pres-project-preview" aria-hidden="true">
                  {project.preview === 'document' ? (
                    <FileText size={29} strokeWidth={1.3} />
                  ) : project.preview === 'spreadsheet' ? (
                    <FileSpreadsheet size={29} strokeWidth={1.3} />
                  ) : (
                    <Globe2 size={29} strokeWidth={1.3} />
                  )}
                  <div className="pres-preview-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="pres-project-sample">Sample</span>
                </div>
                <div>
                  <p className="pres-project-category">{project.category}</p>
                  <strong>{project.title}</strong>
                </div>
              </div>
            ))}
          </div>
          <p className="pres-visual-note">
            Religious content requires qualified teacher review. No actual
            student or client results are shown.
          </p>
        </>
      );

    case 'pathways':
      return (
        <>
          <p className="pres-visual-eyebrow">
            Choose a direction, with guidance
          </p>
          <div className="pres-pathway-root">
            <Sprout size={23} strokeWidth={1.5} aria-hidden="true" />
            <span>Shared foundations</span>
          </div>
          <svg
            className="pres-pathway-branches"
            viewBox="0 0 420 52"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M210 0v24H70v28M210 24v28M210 24h140v28"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <div className="pres-pathways">
            {[
              { title: 'Web', detail: 'A simple website', icon: Code2 },
              {
                title: 'Content',
                detail: 'A useful digital resource',
                icon: PenTool,
              },
              {
                title: 'Teaching',
                detail: 'A structured online lesson',
                icon: Video,
              },
            ].map(({ title, detail, icon: PathwayIcon }) => (
              <div className="pres-pathway" key={title}>
                <PathwayIcon size={30} strokeWidth={1.4} aria-hidden="true" />
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            ))}
          </div>
          <p className="pres-visual-note">
            One primary pathway is enough to begin.
          </p>
        </>
      );

    case 'pilot':
      return (
        <>
          <div className="pres-pilot-heading">
            <span className="pres-icon-tile">
              <Handshake size={28} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <p className="pres-visual-eyebrow">A proposed pilot</p>
          </div>
          <ol className="pres-pilot-steps">
            {[
              {
                title: 'Agree the essentials',
                detail: 'Learners, access, timetable, responsibilities',
              },
              {
                title: 'Try guided sessions',
                detail: 'Practice tasks and teacher feedback',
              },
              {
                title: 'Review before extending',
                detail: 'Adapt, continue, or pause together',
              },
            ].map((step, index) => (
              <li className="pres-pilot-step" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="pres-visual-note">
            Scope and timing remain open for discussion.
          </p>
        </>
      );

    case 'discussion':
      return (
        <>
          <p className="pres-visual-eyebrow">Listen first. Shape together.</p>
          <div className="pres-discussion-symbol">
            <Handshake size={64} strokeWidth={1.2} aria-hidden="true" />
          </div>
          <p className="pres-discussion-message">
            A conversation,
            <br />
            <span>not a commitment.</span>
          </p>
          <div className="pres-discussion-topics">
            <span>Learner needs</span>
            <span>Practical access</span>
            <span>Shared responsibilities</span>
          </div>
        </>
      );
  }
}

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenPending, setFullscreenPending] = useState(false);
  const [notice, setNotice] = useState('');
  const pageRef = useRef<HTMLDivElement>(null);
  const fullscreenBusy = useRef(false);
  const slide = slides[currentSlide];

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"], [role="slider"], [role="spinbutton"]',
        )
      )
        return;

      let destination: number | 'next' | 'previous';
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          destination = 'next';
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          destination = 'previous';
          break;
        case 'Home':
          destination = 0;
          break;
        case 'End':
          destination = slides.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      setCurrentSlide((previous) =>
        typeof destination === 'number'
          ? destination
          : Math.max(
              0,
              Math.min(
                slides.length - 1,
                previous + (destination === 'next' ? 1 : -1),
              ),
            ),
      );
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    const syncFullscreen = () =>
      setIsFullscreen(document.fullscreenElement === page);
    syncFullscreen();
    if (!page?.requestFullscreen || document.fullscreenEnabled === false) {
      setNotice(
        'Fullscreen is unavailable in this browser. You can still present in this window.',
      );
    }
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () =>
      document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  const toggleFullscreen = async () => {
    const page = pageRef.current;
    if (!page || fullscreenBusy.current) return;
    const exiting = document.fullscreenElement === page;
    if (
      (!exiting &&
        (!page.requestFullscreen || document.fullscreenEnabled === false)) ||
      (exiting && !document.exitFullscreen)
    ) {
      setNotice(
        'Fullscreen is unavailable in this browser. You can still present in this window.',
      );
      return;
    }

    fullscreenBusy.current = true;
    setFullscreenPending(true);
    setNotice('');
    try {
      if (exiting) await document.exitFullscreen();
      else await page.requestFullscreen();
    } catch {
      setNotice(
        'Fullscreen could not be changed. You can still present in this window.',
      );
    } finally {
      setIsFullscreen(document.fullscreenElement === page);
      fullscreenBusy.current = false;
      setFullscreenPending(false);
    }
  };

  return (
    <div className="pres-page" ref={pageRef}>
      <header className="pres-header">
        <div className="pres-brand">
          <span className="pres-brand-symbol">
            <BrandMark />
          </span>
          <div>
            <span className="pres-brand-name">{site.name}</span>
            <p>{site.tagline}</p>
          </div>
        </div>
        <div className="pres-header-tools">
          <span className="pres-concept">
            <span aria-hidden="true" />
            Interactive concept demo
          </span>
          <div className="pres-actions">
            <button
              type="button"
              className="pres-action pres-fullscreen"
              onClick={() => void toggleFullscreen()}
              disabled={fullscreenPending}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              aria-pressed={isFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 size={18} aria-hidden="true" />
              ) : (
                <Maximize2 size={18} aria-hidden="true" />
              )}
              <span className="pres-fullscreen-text">
                {isFullscreen ? 'Exit fullscreen' : 'Full screen'}
              </span>
            </button>
            <Link className="pres-action pres-exit" to="/">
              <LogOut size={17} aria-hidden="true" />
              <span>Exit presentation</span>
            </Link>
          </div>
        </div>
      </header>

      {notice && (
        <p className="pres-notice" role="status">
          {notice}
        </p>
      )}

      <main className="pres-main">
        <article
          className="pres-slide"
          key={slide.visual}
          aria-labelledby="pres-slide-title"
        >
          <div className="pres-copy">
            <div className="pres-slide-heading">
              <span className="pres-slide-rule" aria-hidden="true" />
              <h1 id="pres-slide-title">{slide.title}</h1>
            </div>
            <p className="pres-message">
              {slide.message}
              <span>{slide.emphasis}</span>
            </p>
            <p className="pres-description">{slide.description}</p>
          </div>
          <div className={`pres-visual pres-visual-${slide.visual}`}>
            <SlideVisual kind={slide.visual} />
          </div>
        </article>
      </main>

      <nav className="pres-navigation" aria-label="Presentation navigation">
        <button
          type="button"
          className="pres-button pres-previous"
          disabled={currentSlide === 0}
          onClick={() =>
            setCurrentSlide((previous) => Math.max(0, previous - 1))
          }
        >
          <ArrowLeft size={19} aria-hidden="true" />
          <span>Previous</span>
        </button>
        <div className="pres-progress">
          <div className="pres-dots">
            {slides.map((item, index) => (
              <button
                type="button"
                key={item.title}
                className={`pres-dot${index < currentSlide ? ' pres-dot-past' : ''}`}
                aria-label={`Go to slide ${index + 1}: ${item.title}`}
                aria-current={index === currentSlide ? 'step' : undefined}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <span className="pres-count" aria-hidden="true">
            <strong>{String(currentSlide + 1).padStart(2, '0')}</strong>
            <span>/</span>
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>
        <button
          type="button"
          className="pres-button pres-next"
          disabled={currentSlide === slides.length - 1}
          onClick={() =>
            setCurrentSlide((previous) =>
              Math.min(slides.length - 1, previous + 1),
            )
          }
        >
          <span>Next</span>
          <ArrowRight size={19} aria-hidden="true" />
        </button>
      </nav>

      <footer className="pres-footer">
        <p>Proposed program. Sample projects. Discussion, not a commitment.</p>
        <span className="pres-keyboard-hint">
          <Keyboard size={15} aria-hidden="true" />
          Arrow keys to explore
        </span>
      </footer>
      <p
        className="pres-sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Slide {currentSlide + 1} of {slides.length}: {slide.title}.
      </p>
    </div>
  );
}
