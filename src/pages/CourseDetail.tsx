import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { courses } from '../data/courses';
import { projects } from '../data/projects';
import { Breadcrumbs, Eyebrow, Icon, LinkButton, Note } from '../components/ui';
import { OutputPreview } from '../components/ProjectPreview';
import { EmailPractice } from '../components/EmailPractice';
import NotFound from './NotFound';
import './curriculum.css';

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courses.find((item) => item.id === courseId);
  if (!course) return <NotFound />;
  const next = courses.find((item) => item.id === course.nextCourse)!;
  const project = projects.find((item) => item.courseId === course.id);

  return (
    <div className="container course-detail-page">
      <Breadcrumbs
        items={[
          { label: 'Courses', to: '/courses' },
          { label: course.shortTitle },
        ]}
      />
      <header className="course-detail-header">
        <span className="icon-tile">
          <Icon name={course.icon} size={27} />
        </span>
        <Eyebrow>{course.category}</Eyebrow>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <div>
          <span className="pill">
            {course.optional ? 'Optional later module' : 'Proposed course'}
          </span>
          <span>{course.lessons.length} guided learning steps</span>
          <span>Practical, teacher-reviewed output</span>
        </div>
      </header>
      <div className="course-detail-layout">
        <div className="course-detail-main">
          <section className="course-relevance">
            <h2>Built on what you already know.</h2>
            <p>{course.relevance}</p>
          </section>
          <section className="course-objectives" id="objectives">
            <Eyebrow>Where this course takes you</Eyebrow>
            <h2>What you will learn</h2>
            <ul className="check-list">
              {course.objectives.map((item) => (
                <li key={item}>
                  <Check size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="course-lessons" id="lessons">
            <div className="lesson-section-title">
              <div>
                <Eyebrow>Small steps. Real practice.</Eyebrow>
                <h2>Your learning sequence</h2>
              </div>
              <span>{course.lessons.length} steps</span>
            </div>
            <p>
              Explore a step to see what the teacher will guide you through.
              Revisit any step whenever more practice would help.
            </p>
            <div className="lesson-list">
              {course.lessons.map((lesson, index) => (
                <details key={`${course.id}-${index}`} open={index === 0}>
                  <summary>
                    <span className="lesson-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3>{lesson.title}</h3>
                    <ChevronDown size={16} aria-hidden="true" />
                  </summary>
                  <p>{lesson.detail}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="guided-practice" id="practice">
            <span className="icon-tile">
              <Icon name="MousePointer2" size={24} />
            </span>
            <div>
              <Eyebrow>Learn by doing</Eyebrow>
              <h2>Guided practice</h2>
              <p>{course.practice}</p>
            </div>
          </section>
          {course.id === 'computer-foundations' && <EmailPractice />}
          {project && (
            <section className="course-output-section">
              <Eyebrow>A glimpse of the outcome</Eyebrow>
              <h2>{project.title}</h2>
              <p>
                An illustrative example of the kind of work this course
                introduces. Religious references stay as placeholders until
                qualified teacher review.
              </p>
              <div className="course-output-example">
                <OutputPreview type={project.preview} />
              </div>
              <span className="output-caption">
                Sample output. Not actual student work.
              </span>
            </section>
          )}
          {course.id === 'web-development' && (
            <Note icon="Code2">
              <strong>A website and a web application are different.</strong> A
              website mainly presents pages and resources. A web application
              helps people perform interactive tasks. A basic frontend can
              display and simulate forms; storing submissions, authenticating
              accounts, or managing learner data requires additional systems and
              a reviewed backend.
            </Note>
          )}
          {course.optional && (
            <Note icon="ShieldCheck">
              <strong>AI is an assistant, not a religious authority.</strong>{' '}
              Its output cannot authenticate quotations or establish religious
              rulings. Qualified teachers must review religious material. This
              prototype does not connect to an AI service.
            </Note>
          )}
          <section className="completion-section" id="completion">
            <Eyebrow>Understanding, not just attendance</Eyebrow>
            <h2>How completion is demonstrated</h2>
            <p>
              A teacher looks for the following evidence. These are proposed
              checks, not a certification or an accredited assessment.
            </p>
            <ul className="check-list">
              {course.completion.map((item) => (
                <li key={item}>
                  <Icon name="ClipboardCheck" size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="course-detail-sidebar">
          <div className="course-project-card">
            <span className="icon-tile">
              <Icon name="FolderCheck" size={25} />
            </span>
            <Eyebrow>Make something useful</Eyebrow>
            <h2>{course.miniProject.title}</h2>
            <p>{course.miniProject.description}</p>
            <a href="#practice" className="button button-primary">
              See the guided practice
              <ArrowRight size={15} />
            </a>
          </div>
          <div className="prerequisite-card">
            <h3>Before you begin</h3>
            <ul>
              {course.prerequisites.map((item) => (
                <li key={item}>
                  <Check size={13} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <nav className="course-section-nav" aria-label="On this course page">
            <h3>In this course</h3>
            <a href="#objectives">
              Learning objectives
              <ArrowRight size={13} />
            </a>
            <a href="#lessons">
              Step-by-step lessons
              <ArrowRight size={13} />
            </a>
            <a href="#practice">
              Guided practice
              <ArrowRight size={13} />
            </a>
            <a href="#completion">
              Completion evidence
              <ArrowRight size={13} />
            </a>
          </nav>
        </aside>
      </div>
      <section className="course-next-banner">
        <div>
          <Eyebrow>A suggested next step</Eyebrow>
          <h2>{next.title}</h2>
          <p>{next.description}</p>
        </div>
        <LinkButton to={`/courses/${next.id}`}>
          Explore the next course
        </LinkButton>
      </section>
      <div className="course-back">
        <Link to="/courses">
          Back to all courses
          <ArrowRight size={15} />
        </Link>
        <span>Progress depends on readiness, not a fixed schedule.</span>
      </div>
    </div>
  );
}
