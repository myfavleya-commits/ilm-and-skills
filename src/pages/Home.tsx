import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  HeartHandshake,
  Play,
  Sprout,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../config/site';
import { stages } from '../data/roadmap';
import { projects } from '../data/projects';
import type { Project } from '../data/types';
import { HeroIllustration } from '../components/HeroIllustration';
import { ArchPortal, GeometricSeal } from '../components/CinematicOrnament';
import EducationalJourney from '../components/journey/EducationalJourney';
import { ProjectCard, ProjectDialog } from '../components/ProjectPreview';
import { Eyebrow, Icon, LinkButton, SectionHeading } from '../components/ui';
import './home.css';
import './cinematic.css';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <div className="home-cinematic">
      <div className="hero-environment">
        <section className="container home-hero">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="concept-label">
                <span />
                Interactive concept demo
              </span>
              <span className="hero-kicker-divider" />
              <span>A proposed educational initiative</span>
            </div>
            <Eyebrow>Islamic knowledge. New possibilities.</Eyebrow>
            <h1>
              Rooted in knowledge.
              <br />
              Ready for <span>what's next.</span>
            </h1>
            <p className="hero-description">
              Empowering madrasa students and graduates with the digital
              confidence, communication, and practical skills to teach, create,
              and contribute to a wider world.
            </p>
            <div className="hero-actions">
              <LinkButton to="/roadmap">
                Explore the Learning Roadmap
              </LinkButton>
              <LinkButton to="/presentation" variant="secondary" arrow={false}>
                <Play size={14} fill="currentColor" />
                Start Presentation
              </LinkButton>
            </div>
            <div className="hero-reassurance">
              <div className="reassurance-symbol">
                <BookOpen size={19} strokeWidth={1.5} />
              </div>
              <p>
                Building on a strong foundation.
                <br />
                <strong>Not replacing it.</strong>
              </p>
              <div className="reassurance-line" />
              <span>
                For students.
                <br />
                For teachers. For communities.
              </span>
            </div>
          </div>
          <div className="hero-gallery">
            <ArchPortal />
            <HeroIllustration />
            <div className="gallery-plinth" aria-hidden="true" />
          </div>
        </section>
      </div>
      <EducationalJourney />
      <div className="container purpose-strip">
        <span className="purpose-strip-title">
          EXISTING KNOWLEDGE.
          <br />
          <strong>WIDER POSSIBILITIES.</strong>
        </span>
        {[
          ['Monitor', 'Digital confidence', 'From the very first click'],
          [
            'MessagesSquare',
            'Clear communication',
            'English & practical Arabic',
          ],
          ['Code2', 'Purposeful creation', 'Documents, content & websites'],
          [
            'Globe2',
            'Meaningful contribution',
            'Teaching, service & opportunity',
          ],
        ].map(([icon, title, text]) => (
          <div className="purpose-item" key={title}>
            <Icon name={icon} size={23} />
            <span>
              <strong>{title}</strong>
              <small>{text}</small>
            </span>
          </div>
        ))}
      </div>
      <section className="section home-pathway">
        <div className="container illuminated-panel">
          <div className="panel-seal" aria-hidden="true">
            <GeometricSeal />
          </div>
          <SectionHeading
            eyebrow="A clear path, at their pace"
            title="Small steps. Meaningful progress."
            description="From first-time computer use to a project they can be proud of. A guided pathway that meets learners where they are."
          >
            <LinkButton to="/roadmap" variant="text">
              See the full roadmap
            </LinkButton>
          </SectionHeading>
          <div className="home-stage-grid">
            {stages.map((stage) => (
              <Link
                to={`/roadmap#stage-${stage.id}`}
                className="home-stage"
                key={stage.id}
              >
                <div className="stage-icon-line">
                  <span className="home-stage-icon">
                    <Icon name={stage.icon} size={23} />
                  </span>
                  <span className="home-stage-number">0{stage.id}</span>
                </div>
                <span className="stage-caption">STAGE 0{stage.id}</span>
                <h3>
                  {stage.id === 2
                    ? 'Office & Communication'
                    : stage.id === 3
                      ? 'Content & Online Teaching'
                      : stage.id === 4
                        ? 'Choose a Specialization'
                        : stage.id === 5
                          ? 'Project & Portfolio'
                          : stage.title}
                </h3>
                <p>
                  {
                    [
                      'Start with the basics. Build confidence through practice.',
                      'Create useful documents, records, and presentations.',
                      'Turn knowledge into clear digital learning resources.',
                      'Follow an interest. Build a focused, practical skill.',
                      'Bring it together. Show what you can create.',
                    ][stage.id - 1]
                  }
                </p>
                <span className="stage-explore">
                  Explore stage
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
          <div className="parallel-pathways">
            <LanguagesVisual />
            <p>
              <strong>Language learning runs alongside the journey.</strong>{' '}
              English and Arabic pathways support communication at every stage.
            </p>
            <span>Placement-led. Readiness-based.</span>
          </div>
        </div>
      </section>
      <section className="section section-tinted home-audience">
        <div className="container audience-layout">
          <div>
            <Eyebrow>Respecting the journey so far</Eyebrow>
            <h2>
              New skills.
              <br />
              The same sense
              <br />
              of purpose.
            </h2>
            <p>
              The discipline of Hifz. The depth of Islamic study. The
              responsibility of teaching. These are strengths to build on.
            </p>
            <LinkButton to="/journey" variant="text">
              Follow a student's journey
            </LinkButton>
          </div>
          <div className="audience-cards">
            {[
              [
                'BookOpen',
                'Students in Hifz & Islamic studies',
                'Patient, practical learning that fits around existing studies, starting with no assumed computer experience.',
              ],
              [
                'GraduationCap',
                'Madrasa graduates & scholars',
                'Tools to prepare resources, communicate with new audiences, and share knowledge thoughtfully.',
              ],
              [
                'HeartHandshake',
                'Teachers & their communities',
                'Useful skills for class administration, accessible lessons, educational content, and responsible online participation.',
              ],
            ].map(([icon, title, text]) => (
              <article key={title}>
                <span className="icon-tile">
                  <Icon name={icon} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="star-transition" aria-hidden="true">
        <div className="transition-seal">
          <GeometricSeal />
        </div>
      </div>
      <section className="section home-showcase">
        <div className="container">
          <SectionHeading
            eyebrow="Learning you can see"
            title="Not just lessons. Things they can make."
            description="Useful work is at the heart of the proposal. Explore these illustrative projects to see how new skills serve familiar purposes."
          >
            <LinkButton to="/projects" variant="text">
              View all sample projects
            </LinkButton>
          </SectionHeading>
          <div className="project-grid">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
          <div className="sample-disclaimer">
            <Icon name="FileCheck2" size={15} />
            Illustrative examples, not actual student submissions or promised
            outcomes.
          </div>
        </div>
      </section>
      <section className="container home-partnership">
        <div className="partnership-symbol">
          <HeartHandshake size={34} strokeWidth={1.3} />
          <div />
        </div>
        <div>
          <Eyebrow light>A conversation, not a commitment</Eyebrow>
          <h2>
            Could this have a place
            <br />
            in your institution?
          </h2>
          <p>
            Begin with a small, thoughtfully planned pilot. Together, we can
            explore your learners' starting point, available resources, and a
            timetable that respects their studies.
          </p>
          <div className="partnership-points">
            <span>
              <Check size={13} />
              Adapted to your setting
            </span>
            <span>
              <Check size={13} />
              Practical, teacher-guided learning
            </span>
          </div>
        </div>
        <LinkButton to="/partnership" variant="light">
          Explore a Partnership
        </LinkButton>
        <Sprout
          className="partnership-sprout"
          size={180}
          strokeWidth={0.5}
          aria-hidden="true"
        />
      </section>
      <div className="container home-closing">
        <span />
        <p>{site.tagline}</p>
        <span />
      </div>
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

function LanguagesVisual() {
  return (
    <div className="language-visual">
      <Icon name="Languages" size={21} />
    </div>
  );
}
