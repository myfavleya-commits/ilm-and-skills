import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { site } from '../../config/site';
import { courses } from '../../data/courses';
import { BrandMark } from '../ui';
import JourneyFallback from './JourneyFallback';
import './journey.css';

const JourneyCanvas = lazy(() => import('./JourneyCanvas'));
const phaseBoundaries = [0.17, 0.29, 0.48, 0.67, 0.86];

class CanvasBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function motionAllowed() {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !connection?.saveData &&
    (navigator.hardwareConcurrency || 4) > 2
  );
}

export default function EducationalJourney() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef({ value: 0 });
  const draw = useRef<(() => void) | null>(null);
  const regress = useRef<(() => void) | null>(null);
  const lastPhase = useRef(0);
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(motionAllowed);
  const [nearby, setNearby] = useState(false);
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(false);
  const [failed, setFailed] = useState(false);
  const [phase, setPhase] = useState(0);
  const [lite, setLite] = useState(
    () =>
      window.matchMedia('(max-width: 760px), (pointer: coarse)').matches ||
      navigator.hardwareConcurrency <= 4,
  );
  const [copy, setCopy] = useState({
    captions: [] as string[],
    proposal: '',
    skip: '',
    cta: '',
    route: '/roadmap',
  });
  const animated = allowed && !failed;

  useEffect(() => {
    // Read the original HTML; the visual layer has no separate marketing copy.
    const text = (selector: string) =>
      document.querySelector<HTMLElement>(selector)?.innerText.trim() ?? '';
    setCopy({
      captions: [
        text('.hero-copy h1'),
        site.shortTagline,
        courses[0].title,
        text('.home-pathway .section-heading h2'),
        text('.home-showcase .section-heading h2'),
        site.tagline,
      ],
      proposal: text('.hero-kicker > span:last-child'),
      skip: text('.skip-link'),
      cta: text('.hero-actions a:first-child'),
      route:
        document
          .querySelector('.hero-actions a:first-child')
          ?.getAttribute('href') ?? '/roadmap',
    });
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const quality = window.matchMedia('(max-width: 760px), (pointer: coarse)');
    let motionFrame = 0;
    const changeMotion = () => {
      const permitted = motionAllowed();
      const wasInside = progress.current.value > 0 && progress.current.value < 1;
      setAllowed(permitted);
      setReady(false);
      draw.current = null;
      regress.current = null;
      progress.current.value = 0;
      if (!permitted && wasInside) {
        // Keep the reader at the static scene when its long scroll stage collapses.
        motionFrame = requestAnimationFrame(() => {
          section.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
        });
      }
    };
    const changeQuality = () =>
      setLite(quality.matches || navigator.hardwareConcurrency <= 4);
    media.addEventListener('change', changeMotion);
    quality.addEventListener('change', changeQuality);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearby(true);
      },
      { rootMargin: '650px' },
    );
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(motionFrame);
      media.removeEventListener('change', changeMotion);
      quality.removeEventListener('change', changeQuality);
    };
  }, []);

  const fail = useCallback(() => {
    setFailed(true);
    setReady(false);
    draw.current = null;
    regress.current = null;
  }, []);
  const started = useCallback((invalidate: () => void, lowerResolution: () => void) => {
    draw.current = invalidate;
    regress.current = lowerResolution;
    setReady(true);
    invalidate();
  }, []);
  const report = useCallback((position: string) => {
    if (section.current) section.current.dataset.cameraPosition = position;
  }, []);

  useEffect(() => {
    if (!animated || !nearby) return;
    // Probe separately so browsers without WebGL never attempt a broken Canvas.
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      fail();
      return;
    }
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    setSupported(true);
  }, [animated, nearby, fail]);

  useEffect(() => {
    if (!animated || !ready || !section.current) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const element = section.current;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          gsap.to(progress.current, {
            value: 1,
            ease: 'none',
            onUpdate: () => {
              const value = progress.current.value;
              element.dataset.journeyProgress = value.toFixed(5);
              const next = phaseBoundaries.filter(
                (boundary) => value >= boundary,
              ).length;
              if (next !== lastPhase.current) {
                lastPhase.current = next;
                setPhase(next);
              }
              element.style.setProperty('--journey-progress', String(value));
              draw.current?.();
            },
            scrollTrigger: {
              id: 'ilm-educational-journey',
              trigger: element,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.45,
              invalidateOnRefresh: true,
              onUpdate: (trigger) => {
                if (Math.abs(trigger.getVelocity()) > 1600) regress.current?.();
              },
            },
          });
        }, element);
        ScrollTrigger.refresh();
        cleanup = () => context.revert();
      })
      .catch(fail);
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [animated, ready, fail]);

  function skip() {
    const target = section.current?.nextElementSibling;
    target?.scrollIntoView({ block: 'start', behavior: 'instant' });
    document
      .querySelector<HTMLElement>('.home-pathway .button')
      ?.focus({ preventScroll: true });
  }

  return (
    <section
      ref={section}
      className="educational-journey"
      aria-label={site.name}
      data-mode={animated ? (ready ? 'webgl' : 'loading') : 'static'}
      data-quality={lite ? 'lite' : 'full'}
      data-phase={phase}
      data-journey-progress="0"
    >
      <div className="journey-viewport">
        <div className="journey-fallback-layer" aria-hidden="true">
          <JourneyFallback />
        </div>
        {animated && nearby && supported && (
          <CanvasBoundary onFailure={fail}>
            <Suspense fallback={null}>
            <JourneyCanvas
              key={lite ? 'lite' : 'full'}
                progress={progress}
                lite={lite}
                onReady={started}
                onFailure={fail}
                report={report}
              />
            </Suspense>
          </CanvasBoundary>
        )}
        <div className="journey-topbar">
          <div className="journey-identity" aria-hidden="true">
            <BrandMark small />
            <span>{site.name}</span>
          </div>
          <button className="journey-skip" onClick={skip}>
            {copy.skip}
            <ArrowDown size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="journey-caption" aria-hidden="true">
          <span>{copy.proposal}</span>
          <p>{copy.captions[animated ? phase : 0]}</p>
        </div>
        <div className="journey-bottom-bar">
          <div className="journey-chapters" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => (
              <span
                key={index}
                className={phase === index ? 'is-current' : ''}
              />
            ))}
          </div>
          <button
            className="journey-roadmap"
            onClick={() => navigate(copy.route)}
            hidden={animated && phase !== 5}
          >
            {copy.cta}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="journey-scroll-progress" aria-hidden="true" />
      </div>
    </section>
  );
}
