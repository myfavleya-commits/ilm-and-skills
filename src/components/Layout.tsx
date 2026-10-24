import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, Presentation, X } from 'lucide-react';
import { site } from '../config/site';
import { BrandMark } from './ui';
import { GeometricSeal } from './CinematicOrnament';

const navigation = [
  { to: '/', label: 'Our Vision' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/courses', label: 'Courses' },
  { to: '/journey', label: 'Student Journey' },
  { to: '/projects', label: 'Projects' },
  { to: '/partnership', label: 'Partnership' },
  { to: '/team', label: 'Our Team' },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { pathname, hash } = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (firstLoad.current) firstLoad.current = false;
    else
      document.getElementById('main-content')?.focus({ preventScroll: true });
    if (hash) {
      const timer = window.setTimeout(() => {
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ block: 'start' });
      }, 70);
      return () => window.clearTimeout(timer);
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return;

    const elements = document.querySelectorAll<HTMLElement>(
      '.section-heading, .home-stage, .audience-cards article, .project-card, .course-card, .specialization-grid article, .team-card, .team-approach article, .partnership-steps > li, .partnership-role-card, .home-partnership, .journey-progress',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('reveal-enter');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -24px 0px', threshold: 0.06 },
    );

    // Only reveal offscreen elements; first-paint content stays immediately usable.
    elements.forEach((element, index) => {
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      element.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
      element.classList.add('reveal-pending');
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        element.classList.remove('reveal-pending', 'reveal-enter');
        element.style.removeProperty('--reveal-delay');
      });
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  return (
    <div className={`site-layout${pathname === '/' ? ' is-home' : ''}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-shell">
          <Link
            className="brand"
            to="/"
            onClick={() => setMenuOpen(false)}
            aria-label={`${site.name} home`}
          >
            <BrandMark />
            <span>
              {site.name}
              <small>KNOWLEDGE INTO POSSIBILITY</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link
            className="nav-presentation"
            to="/presentation"
            aria-label="Start presentation"
          >
            <Presentation size={17} aria-hidden="true" />
            <span>Present the vision</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <button
            ref={menuButton}
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </NavLink>
            ))}
            <Link to="/presentation" onClick={() => setMenuOpen(false)}>
              <Presentation size={17} aria-hidden="true" />
              Start Presentation
            </Link>
          </nav>
        )}
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-ornament" aria-hidden="true">
          <GeometricSeal />
        </div>
        <div className="container footer-main">
          <div>
            <Link className="brand" to="/">
              <BrandMark small />
              <span>{site.name}</span>
            </Link>
            <p>{site.tagline}</p>
            <p className="footer-purpose">
              An invitation to learn, create, and serve.
              <br />A proposed initiative, built around your institution.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <Link to="/roadmap">The learning pathway</Link>
            <Link to="/courses">Explore the curriculum</Link>
            <Link to="/projects">See sample projects</Link>
          </nav>
          <nav aria-label="About the initiative">
            <Link to="/partnership">Discuss a partnership</Link>
            <Link to="/team">Meet the teaching roles</Link>
            <Link to="/presentation">
              Open presentation mode{' '}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </nav>
        </div>
        <div className="container footer-bottom">
          <span>Thoughtfully proposed. Practically focused.</span>
          <span className="concept-label">
            <span />
            Interactive concept demo
          </span>
          <span>Sample content. No enrollment or data submission.</span>
        </div>
      </footer>
    </div>
  );
}
