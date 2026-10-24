import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe2,
  Play,
  X,
} from 'lucide-react';
import type { Project } from '../data/types';
import { Icon } from './ui';
import './project-preview.css';

const slideContent = [
  {
    label: '01 / INTRODUCTION',
    title: 'Learning with purpose',
    text: 'Today we will organize a clear, useful lesson.',
    note: 'Introduce the topic and state one observable learning objective.',
  },
  {
    label: '02 / ONE CLEAR IDEA',
    title: 'Give every idea a place',
    text: 'Start with an introduction. Develop the main points. End with a reminder.',
    note: 'Explain the three parts, using a simple example.',
  },
  {
    label: '03 / A WORKED EXAMPLE',
    title: 'From notes to an outline',
    text: 'Topic: preparing a study plan. Introduction: choose a goal. Main point: make time for practice.',
    note: 'Walk through an original, non-religious sample rather than an unverified quotation.',
  },
  {
    label: '04 / YOUR TURN',
    title: 'Make a short outline',
    text: 'Choose a topic you know. Write a title, three main points, and one closing reminder.',
    note: 'Allow practice time and ask a learner to explain one choice.',
  },
  {
    label: '05 / RECAP & REFLECT',
    title: 'What makes a lesson clear?',
    text: 'A focused purpose. A thoughtful sequence. A chance to practise and receive feedback.',
    note: 'Ask: Can you name the three parts of an outline and show them in your work?',
  },
];

function DocumentOutput() {
  return (
    <div className="output-document">
      <div className="output-document-meta">
        <span>LESSON RESOURCE / SAMPLE</span>
        <FileText size={15} />
      </div>
      <h4>
        Friday Khutbah
        <br />
        Outline
      </h4>
      <p className="document-subtitle">
        A thoughtfully structured lesson handout
      </p>
      <div className="document-rule" />
      {[
        [
          '01',
          'Topic & purpose',
          '[Add a teacher-approved topic and learning aim]',
        ],
        ['02', 'Introduction', '[Write an original opening in your own words]'],
        [
          '03',
          'Verified references',
          '[Teacher-verified citation to be added]',
        ],
        [
          '04',
          'Main points',
          'A clear first point. A supporting explanation. A practical reminder.',
        ],
        [
          '05',
          'Closing reminders',
          '[Summarize the key message for the audience]',
        ],
      ].map(([number, title, text]) => (
        <div className="document-section" key={number}>
          <span>{number}</span>
          <div>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>
        </div>
      ))}
      <div className="document-footer">
        FORMATTING EXAMPLE ONLY<span>01</span>
      </div>
    </div>
  );
}

const attendance = [
  ['Learner A', 'P', 'P', 'P', 'A', 'P'],
  ['Learner B', 'P', 'A', 'P', 'P', 'P'],
  ['Learner C', 'P', 'P', 'P', 'P', 'P'],
  ['Learner D', 'A', 'P', 'P', 'P', 'A'],
  ['Learner E', 'P', 'P', 'A', 'P', 'P'],
  ['Learner F', 'P', 'P', 'P', 'P', 'P'],
];

function SpreadsheetOutput() {
  return (
    <div className="output-spreadsheet">
      <div className="sheet-heading">
        <span className="sheet-app">X</span>
        <div>
          <strong>Class attendance</strong>
          <span>Fictional learners / practice data</span>
        </div>
      </div>
      <div className="formula-bar">
        <span>G3</span>
        <span>fx</span>
        <code>=COUNTIF(B3:F3,"P")</code>
      </div>
      <div className="sheet-table-wrap">
        <table>
          <caption className="sr-only">
            Attendance for six fictional learners across five sample sessions. P
            means present, A means absent.
          </caption>
          <thead>
            <tr>
              {['Learner', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Total'].map(
                (item) => (
                  <th key={item} scope="col">
                    {item}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {attendance.map((row) => (
              <tr key={row[0]}>
                <th scope="row">{row[0]}</th>
                {row.slice(1).map((cell, index) => (
                  <td key={index}>
                    <span
                      className={
                        cell === 'P'
                          ? 'attendance-present'
                          : 'attendance-absent'
                      }
                    >
                      {cell}
                    </span>
                  </td>
                ))}
                <td className="sheet-total">
                  {row.slice(1).filter((cell) => cell === 'P').length}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Present</th>
              {[1, 2, 3, 4, 5].map((index) => (
                <td key={index}>
                  {attendance.filter((row) => row[index] === 'P').length}
                </td>
              ))}
              <td>25</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="sheet-legend">
        <span>
          <i />P = Present
        </span>
        <span>
          <i />A = Absent
        </span>
      </div>
      <div className="sheet-tabs">
        <span>Attendance</span>
        <span>Practice only</span>
      </div>
    </div>
  );
}

function SlidesOutput({ interactive }: { interactive: boolean }) {
  const [slide, setSlide] = useState(0);
  const item = slideContent[slide];
  return (
    <div className="output-slides">
      <div className="slide-stage">
        <BookOpen size={23} strokeWidth={1.4} />
        <span>{item.label}</span>
        <h4>{item.title}</h4>
        <p>{item.text}</p>
        <div className="slide-motif" />
      </div>
      {interactive ? (
        <>
          <div className="slide-controls">
            <button
              onClick={() => setSlide(Math.max(0, slide - 1))}
              disabled={slide === 0}
              aria-label="Previous sample slide"
            >
              <ChevronLeft size={17} />
            </button>
            <span>Slide {slide + 1} of 5</span>
            <button
              onClick={() => setSlide(Math.min(4, slide + 1))}
              disabled={slide === 4}
              aria-label="Next sample slide"
            >
              <ChevronRight size={17} />
            </button>
          </div>
          <div className="speaker-note">
            <strong>Speaker notes</strong>
            <p>{item.note}</p>
          </div>
        </>
      ) : (
        <div className="mini-slide-strip">
          {slideContent.map((_, index) => (
            <span className={index === 0 ? 'selected' : ''} key={index}>
              {String(index + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function WebsiteOutput({ interactive }: { interactive: boolean }) {
  const [tab, setTab] = useState('About');
  return (
    <div className="output-website">
      <div className="preview-browser">
        <div>
          <i />
          <i />
          <i />
        </div>
        <span>
          <Globe2 size={10} />
          teacher.example.com
        </span>
      </div>
      <div className="website-top">
        <span>
          <BookOpen size={13} />
          THE LEARNING SPACE
        </span>
        {interactive ? (
          <nav aria-label="Sample website sections">
            {['About', 'Subjects', 'Resources'].map((item) => (
              <button
                key={item}
                className={tab === item ? 'active' : ''}
                aria-pressed={tab === item}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        ) : (
          <span>SAMPLE WEBSITE</span>
        )}
      </div>
      <div className="website-content">
        <div className="website-visual">
          <BookOpen size={37} strokeWidth={1} />
          <span>LEARN WITH PURPOSE</span>
        </div>
        <div>
          <span className="website-eyebrow">FICTIONAL TEACHER PROFILE</span>
          <h4>
            {tab === 'About'
              ? 'A wider classroom.'
              : tab === 'Subjects'
                ? 'Thoughtful learning.'
                : 'Resources to revisit.'}
          </h4>
          <p>
            {tab === 'About'
              ? 'An introduction to a teacher, their approach, and the knowledge they hope to share.'
              : tab === 'Subjects'
                ? 'Sample subject areas: study skills, lesson preparation, and clear educational communication.'
                : 'Sample resources: a lesson outline, a study checklist, and a short lesson transcript.'}
          </p>
          <span className="website-contact">
            Demonstration only. No contact data collected.
          </span>
        </div>
      </div>
      <div className="website-footer">
        <span>Clear lessons. Meaningful connection.</span>
        <span>HTML + CSS</span>
      </div>
    </div>
  );
}

const plan = [
  ['01', 'Introduce', 'Share the class purpose'],
  ['02', 'Be useful', 'Offer a helpful study tip'],
  ['03', 'Explain', 'Describe who it is for'],
  ['04', 'Show', 'Preview a lesson resource'],
  ['05', 'Connect', 'Join a relevant discussion'],
  ['06', 'Clarify', 'Answer a common question'],
  ['07', 'Invite', 'Share how to ask for details'],
];

function PlanOutput() {
  return (
    <div className="output-plan">
      <span className="plan-eyebrow">A PURPOSEFUL 7-DAY CONTENT PLAN</span>
      <h4>
        A good class.
        <br />A clear invitation.
      </h4>
      <p>Sample audience: adult learners seeking structured online study.</p>
      <div className="plan-grid">
        {plan.map(([day, title, text]) => (
          <div key={day}>
            <span>DAY {day}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="plan-note">
        <Check size={13} />
        Permission before posting. No spam. No promised results.
      </div>
    </div>
  );
}

function ClassroomOutput() {
  return (
    <div className="output-classroom">
      <div className="classroom-heading">
        <span>
          <BookOpen size={20} />
        </span>
        <p>ILLUSTRATIVE ONLINE COURSE</p>
        <h4>
          Small lessons.
          <br />
          Lasting understanding.
        </h4>
      </div>
      <div className="classroom-lessons">
        {[
          [
            '01',
            'Begin with a purpose',
            'Set a learning goal and introduce the topic.',
          ],
          [
            '02',
            'Learn through practice',
            'Explore an example, then try a guided activity.',
          ],
          [
            '03',
            'Reflect and review',
            'Check understanding and plan the next step.',
          ],
        ].map(([number, title, description]) => (
          <div key={number}>
            <span>{number}</span>
            <div>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
            <Play size={12} />
          </div>
        ))}
      </div>
      <div className="classroom-privacy">
        <Icon name="ShieldCheck" size={14} />
        Fictional participants. Privacy and safeguarding first.
      </div>
    </div>
  );
}

export function OutputPreview({
  type,
  compact = false,
}: {
  type: Project['preview'];
  compact?: boolean;
}) {
  return (
    <div
      className={`output-preview output-${type}-wrap ${compact ? 'output-compact' : ''}`}
      aria-hidden={compact || undefined}
    >
      {type === 'document' && <DocumentOutput />}
      {type === 'spreadsheet' && <SpreadsheetOutput />}
      {type === 'slides' && <SlidesOutput interactive={!compact} />}
      {type === 'website' && <WebsiteOutput interactive={!compact} />}
      {type === 'plan' && <PlanOutput />}
      {type === 'classroom' && <ClassroomOutput />}
    </div>
  );
}

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <article className="project-card">
      <button
        className="project-card-preview"
        onClick={() => onOpen(project)}
        aria-label={`Preview ${project.title}`}
      >
        <OutputPreview type={project.preview} compact />
        <span className="preview-open">
          <Icon name="ArrowUpRight" size={18} />
        </span>
      </button>
      <div className="project-card-copy">
        <div className="project-category">
          {project.category}
          <span>Sample project</span>
        </div>
        <h3>
          <button onClick={() => onOpen(project)}>{project.title}</button>
        </h3>
        <p>{project.problem}</p>
        <button className="project-view" onClick={() => onOpen(project)}>
          Explore the project
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
          ),
        ).filter((control) => control.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
    >
      <div className="dialog-inner">
        <header className="dialog-header">
          <div>
            <span className="pill">Illustrative project preview</span>
            <h2 id="project-dialog-title">{project.title}</h2>
          </div>
          <button
            className="dialog-close"
            onClick={onClose}
            aria-label="Close project preview"
            autoFocus
          >
            <X size={20} />
          </button>
        </header>
        <div className="dialog-body">
          <div className="dialog-output">
            <OutputPreview type={project.preview} />
            <p className="output-caption">
              Example output, not submitted student work.
            </p>
          </div>
          <div className="dialog-details">
            <section>
              <h3>The problem it solves</h3>
              <p>{project.problem}</p>
            </section>
            <section>
              <h3>What the learner creates</h3>
              <p>{project.creates}</p>
            </section>
            <section>
              <h3>Skills put into practice</h3>
              <ul>
                {project.skills.map((skill) => (
                  <li key={skill}>
                    <Check size={14} />
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3>How a teacher checks it</h3>
              <ul>
                {project.evaluation.map((item) => (
                  <li key={item}>
                    <Icon name="ClipboardCheck" size={15} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <Link
              to={`/courses/${project.courseId}`}
              className="button button-primary"
              onClick={onClose}
            >
              Explore the related course
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="dialog-disclaimer">{project.description}</div>
      </div>
    </dialog>
  );
}
