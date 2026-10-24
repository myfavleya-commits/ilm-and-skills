import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  GitBranch,
  Languages,
} from 'lucide-react';
import { stages } from '../data/roadmap';
import { courses } from '../data/courses';
import {
  Eyebrow,
  Icon,
  LinkButton,
  Note,
  PageHeader,
  SectionHeading,
} from '../components/ui';
import './curriculum.css';

const pathways = [
  {
    icon: 'Code2',
    title: 'Web Development',
    text: 'Create a useful, accessible teacher profile or institutional website.',
    course: 'web-development',
  },
  {
    icon: 'PenTool',
    title: 'Digital Content & Marketing',
    text: 'Prepare educational resources and a thoughtful plan to reach an audience.',
    course: 'content-creation',
  },
  {
    icon: 'Video',
    title: 'Online Teaching',
    text: 'Bring objectives, resources, practice, and feedback into an online lesson.',
    course: 'online-teaching',
  },
];

export default function Roadmap() {
  const { hash } = useLocation();
  const [expanded, setExpanded] = useState<number | null>(
    () => Number(hash.replace('#stage-', '')) || 1,
  );

  useEffect(() => {
    const id = Number(hash.replace('#stage-', ''));
    if (id >= 1 && id <= 5) {
      setExpanded(id);
      const timer = setTimeout(
        () =>
          document
            .getElementById(`stage-${id}`)
            ?.scrollIntoView({ block: 'start', behavior: 'instant' }),
        60,
      );
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <div className="container roadmap-page">
      <PageHeader
        eyebrow="The learning roadmap"
        title="A clear path. A purposeful future."
        description="Start with what is familiar. Build confidence through practice. Then choose a direction that puts new skills in service of existing knowledge."
      />
      <div className="roadmap-top-note">
        <span className="pill">
          <Icon name="Route" size={12} />5 guided stages
        </span>
        <span>No previous computer experience needed</span>
        <span className="readiness-note">
          <span />
          Progress at the learner's pace
        </span>
      </div>
      <div className="roadmap-layout">
        <div className="roadmap-stages">
          {stages.map((stage) => (
            <article
              id={`stage-${stage.id}`}
              key={stage.id}
              className={`roadmap-stage ${expanded === stage.id ? 'is-expanded' : ''}`}
            >
              <span className="roadmap-dot">
                {String(stage.id).padStart(2, '0')}
              </span>
              <button
                className="roadmap-toggle"
                aria-expanded={expanded === stage.id}
                aria-controls={`stage-content-${stage.id}`}
                onClick={() =>
                  setExpanded(expanded === stage.id ? null : stage.id)
                }
              >
                <span className="icon-tile">
                  <Icon name={stage.icon} size={22} />
                </span>
                <span>
                  <small>STAGE {String(stage.id).padStart(2, '0')}</small>
                  <h2>{stage.title}</h2>
                  <span className="roadmap-stage-subtitle">
                    {stage.subtitle}
                  </span>
                </span>
                <ChevronDown
                  size={20}
                  className="stage-chevron"
                  aria-hidden="true"
                />
              </button>
              <div
                id={`stage-content-${stage.id}`}
                hidden={expanded !== stage.id}
                className="roadmap-expanded"
              >
                <div className="stage-overview">
                  <div>
                    <h3>
                      <Icon name="FolderOpen" size={15} />
                      Before we begin
                    </h3>
                    <p>{stage.prerequisites}</p>
                  </div>
                  <div>
                    <h3>
                      <Icon name="Lightbulb" size={15} />
                      What the learner discovers
                    </h3>
                    <p>{stage.learns}</p>
                  </div>
                </div>
                <section className="stage-steps">
                  <h3>Small steps, with a teacher beside you</h3>
                  <ol>
                    {stage.steps.map((step, index) => (
                      <li key={step}>
                        <span>{index + 1}</span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>
                </section>
                <div className="stage-practice-grid">
                  <section>
                    <span className="stage-content-label">
                      <Icon name="MousePointer2" size={14} />
                      TRY IT TOGETHER
                    </span>
                    <p>{stage.activity}</p>
                  </section>
                  <section>
                    <span className="stage-content-label">
                      <Icon name="FileCheck2" size={14} />
                      SOMETHING TO SHOW
                    </span>
                    <p>{stage.output}</p>
                  </section>
                </div>
                <section className="stage-assessment">
                  <h3>
                    <Icon name="ClipboardCheck" size={17} />
                    How a teacher checks understanding
                  </h3>
                  <p>{stage.assessment}</p>
                </section>
                <div className="stage-course-links">
                  <span>Related courses</span>
                  <div>
                    {stage.courseIds.map((id) => (
                      <Link to={`/courses/${id}`} key={id}>
                        {courses.find((course) => course.id === id)?.shortTitle}
                        <ArrowRight size={12} />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="stage-next">
                  <ArrowDown size={16} />
                  <p>
                    <strong>What comes next</strong>
                    {stage.next}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="roadmap-sidebar">
          <div className="roadmap-principle">
            <div className="roadmap-principle-art">
              <Icon name="Sprout" size={55} />
            </div>
            <Eyebrow>A pathway, not a race</Eyebrow>
            <h3>
              Confidence comes
              <br />
              before complexity.
            </h3>
            <p>
              These are learning phases, not a fixed timetable. Scheduling
              depends on learner readiness, practice opportunities, and
              institutional availability.
            </p>
            <ul>
              <li>
                <Check size={14} />
                Patient instruction
              </li>
              <li>
                <Check size={14} />
                Small, practical tasks
              </li>
              <li>
                <Check size={14} />
                Feedback before moving on
              </li>
            </ul>
          </div>
          <div className="roadmap-language-card">
            <Languages size={25} strokeWidth={1.5} />
            <h3>Communication grows alongside.</h3>
            <p>
              English and practical Arabic can continue through every stage.
              Placement recognizes existing strengths, including classical
              Arabic knowledge.
            </p>
            <div>
              <Link to="/courses/english">
                Explore English
                <ArrowRight size={13} />
              </Link>
              <Link to="/courses/arabic">
                Explore Arabic
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          <LinkButton to="/partnership#pilot-planner" variant="secondary">
            Plan a small pilot
          </LinkButton>
        </aside>
      </div>
      <section className="specializations-section">
        <SectionHeading
          eyebrow="One foundation. More than one direction."
          title="Choose a path that feels purposeful."
          description="After the foundations, a learner can focus on one practical specialization. Nobody needs to master every pathway before creating something useful."
        />
        <div className="branch-label">
          <GitBranch size={18} />
          <span>BUILD ON STAGES 1-3</span>
        </div>
        <div className="specialization-grid">
          {pathways.map((path, index) => (
            <article key={path.title}>
              <span className="specialization-number">
                PATHWAY 0{index + 1}
              </span>
              <span className="icon-tile">
                <Icon name={path.icon} size={24} />
              </span>
              <h3>{path.title}</h3>
              <p>{path.text}</p>
              <LinkButton variant="text" to={`/courses/${path.course}`}>
                Explore this direction
              </LinkButton>
            </article>
          ))}
        </div>
        <Note icon="FolderCheck">
          All three pathways lead to a{' '}
          <strong>guided final project and a small portfolio</strong>.
          Professional opportunities may follow further practice and experience;
          employment and income are not guaranteed.
        </Note>
      </section>
    </div>
  );
}
