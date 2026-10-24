import { useState } from 'react';
import { ArrowRight, Check, Circle, MessageSquareQuote } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Pathway } from '../data/types';
import { Eyebrow, Icon, LinkButton, Note, PageHeader } from '../components/ui';
import './journey.css';

const pathways: { id: Pathway; title: string; icon: string; output: string }[] =
  [
    {
      id: 'web',
      title: 'Web Development',
      icon: 'Code2',
      output: 'A teacher profile website',
    },
    {
      id: 'content',
      title: 'Content & Marketing',
      icon: 'PenTool',
      output: 'An educational content package',
    },
    {
      id: 'teaching',
      title: 'Online Teaching',
      icon: 'Video',
      output: 'A short online teaching package',
    },
  ];

type Milestone = {
  title: string;
  text: string;
  evidence: string;
  feedback: string;
  icon: string;
  course: string;
};

const foundations: Milestone[] = [
  {
    title: 'Saves a first document',
    text: 'Starts with the mouse and keyboard, types a few lines, and finds the saved file again.',
    evidence: 'study-materials / first-note.txt',
    feedback:
      'You found your file independently. Next, give the folder a clear name and practise moving a copy into it.',
    icon: 'FolderOpen',
    course: 'computer-foundations',
  },
  {
    title: 'Creates a lesson handout',
    text: 'Turns existing subject knowledge into a structured document with headings and source placeholders.',
    evidence: 'lesson-handout.docx + a readable PDF',
    feedback:
      'The main points are easy to follow. Keep reference placeholders visible until a qualified teacher checks the source and wording.',
    icon: 'FileText',
    course: 'word',
  },
  {
    title: 'Builds an attendance sheet',
    text: 'Uses fictional learner records to practise entering information, checking formulas, and correcting a mistake.',
    evidence: 'class-attendance.xlsx / fictional sample records',
    feedback:
      'Your total matches the manual count. Change one entry and explain how the formula responds.',
    icon: 'FileSpreadsheet',
    course: 'excel',
  },
  {
    title: 'Presents a short lesson',
    text: 'Organizes five slides, adds speaker notes, and explains one idea to a teacher acting as the learner.',
    evidence: 'five-slide-lesson.pptx + speaker notes',
    feedback:
      'Your lesson has a clear beginning and recap. Give the practice question a little more space and invite a response before continuing.',
    icon: 'Presentation',
    course: 'powerpoint',
  },
];

const specialistMilestones: Record<Pathway, Milestone[]> = {
  web: [
    {
      title: 'Chooses web development',
      text: 'Discusses interests and equipment with a teacher, then sketches a useful teacher profile website.',
      evidence: 'A one-page website brief and pencil wireframe',
      feedback:
        'Keep the first version small: an introduction, sample subjects, and a resource section. Account features are outside this project.',
      icon: 'Code2',
      course: 'web-development',
    },
    {
      title: 'Creates a teacher website',
      text: 'Builds and revises a responsive page with clear navigation, readable content, and a demonstration-only contact section.',
      evidence: 'index.html + styles.css + mobile preview',
      feedback:
        'The sections work well on a laptop. Now check keyboard focus and text wrapping on a narrow screen.',
      icon: 'Globe2',
      course: 'web-development',
    },
    {
      title: 'Presents a final portfolio',
      text: 'Organizes the lesson handout, attendance sheet, and website, showing what changed after teacher feedback.',
      evidence: 'Three labeled sample projects with a revision note',
      feedback:
        'Explain what each example demonstrates and what still needs practice. Present this honestly as beginner sample work, not client experience.',
      icon: 'FolderCheck',
      course: 'professional-practice',
    },
  ],
  content: [
    {
      title: 'Chooses content & marketing',
      text: 'Selects a learner audience and one helpful topic, then plans a poster and short lesson storyboard.',
      evidence: 'Audience note, original script, and source checklist',
      feedback:
        'The topic is focused. Check the visual permissions and leave religious references for qualified teacher review.',
      icon: 'PenTool',
      course: 'content-creation',
    },
    {
      title: 'Creates a content package',
      text: 'Designs a readable educational poster, a one-minute storyboard, and a seven-day responsible promotion plan.',
      evidence: 'poster.pdf + storyboard + 7-day content plan',
      feedback:
        'The message is clear. Add a caption or transcript, make the invitation specific, and avoid exaggerated claims or repeated unsolicited messages.',
      icon: 'Megaphone',
      course: 'digital-marketing',
    },
    {
      title: 'Presents a final portfolio',
      text: 'Brings the handout, poster/storyboard, and promotion plan together, documenting sources and revisions.',
      evidence: 'Three labeled sample projects with attribution notes',
      feedback:
        'Show the purpose behind each piece. Any performance figures must be clearly hypothetical; do not imply a real campaign or enrollment result.',
      icon: 'FolderCheck',
      course: 'professional-practice',
    },
  ],
  teaching: [
    {
      title: 'Chooses online teaching',
      text: 'Defines a small learner group and a realistic learning objective, then plans a short sequence.',
      evidence: 'A course outline with three connected lessons',
      feedback:
        'Match each learning objective to an activity and a question that makes understanding visible.',
      icon: 'Video',
      course: 'online-teaching',
    },
    {
      title: 'Creates a teaching package',
      text: 'Rehearses an introductory lesson with slides, joining instructions, guided practice, and a feedback question.',
      evidence: 'Course information page + lesson resource + privacy checklist',
      feedback:
        'You stopped screen sharing correctly. Confirm consent for recordings and follow institution-approved safeguarding when working with minors.',
      icon: 'Users',
      course: 'online-teaching',
    },
    {
      title: 'Presents a final portfolio',
      text: 'Presents the handout, five-slide lesson, and online teaching package with an explanation of revisions.',
      evidence: 'Three labeled sample projects and a mock-lesson review',
      feedback:
        'Show how practice and feedback support the lesson objective. This is a teaching rehearsal, not evidence of real learner results.',
      icon: 'FolderCheck',
      course: 'professional-practice',
    },
  ],
};

export default function Journey() {
  const [pathway, setPathway] = useState<Pathway>('web');
  const [selected, setSelected] = useState(3);
  const milestones = [...foundations, ...specialistMilestones[pathway]];
  const milestone = milestones[selected];
  const path = pathways.find((item) => item.id === pathway)!;

  return (
    <div className="container journey-page">
      <PageHeader
        eyebrow="A student's journey"
        title="See how confidence can grow."
        description="Follow one imagined learner from a first saved file to a purposeful final project. The journey is illustrative: every learner brings different strengths and progresses at their own pace."
      />
      <section className="learner-intro">
        <div className="learner-profile">
          <div className="learner-avatar">
            A<Icon name="Sprout" size={18} />
          </div>
          <div>
            <span className="pill">Fictional learner</span>
            <h2>Meet Abdullah.</h2>
            <p>
              A student of Islamic subjects, beginning with no computer
              experience.
            </p>
          </div>
        </div>
        <div className="learner-start">
          <span>STARTING WITH</span>
          <strong>
            Knowledge, discipline,
            <br />
            and a willingness to learn.
          </strong>
        </div>
      </section>
      <section className="journey-path-select">
        <div>
          <Eyebrow>One foundation. Three possible directions.</Eyebrow>
          <h2>Which path shall we explore?</h2>
        </div>
        <div
          className="pathway-switcher"
          role="group"
          aria-label="Choose the fictional learner's specialization"
        >
          {pathways.map((item) => (
            <button
              key={item.id}
              onClick={() => setPathway(item.id)}
              aria-pressed={pathway === item.id}
              className={pathway === item.id ? 'selected' : ''}
            >
              <Icon name={item.icon} size={18} />
              {item.title}
              {pathway === item.id && <Check size={13} />}
            </button>
          ))}
        </div>
        <p>
          The first four milestones stay the same. The later project changes
          with the chosen interest.
        </p>
      </section>
      <div className="journey-workspace">
        <section
          className="milestone-panel"
          aria-labelledby="milestone-heading"
        >
          <div className="journey-panel-heading">
            <h2 id="milestone-heading">A journey, step by step</h2>
            <span>Explore each milestone</span>
          </div>
          <ol className="journey-timeline">
            {milestones.map((item, index) => (
              <li
                key={item.title}
                className={`${index < 4 ? 'milestone-completed' : ''} ${index === selected ? 'milestone-selected' : ''}`}
              >
                <button
                  aria-pressed={index === selected}
                  onClick={() => setSelected(index)}
                >
                  <span className="milestone-status">
                    {index < 4 ? <Check size={12} /> : <Circle size={9} />}
                  </span>
                  <span className="milestone-icon">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <span>
                    <small>
                      {index < 4
                        ? 'SAMPLE MILESTONE'
                        : index === 4
                          ? 'CHOOSE A DIRECTION'
                          : 'A POSSIBLE NEXT STEP'}
                    </small>
                    <strong>{item.title}</strong>
                  </span>
                  <ArrowRight size={15} className="milestone-arrow" />
                </button>
              </li>
            ))}
          </ol>
          <div className="milestone-panel-bottom">
            <Icon name={path.icon} size={16} />
            <span>
              Direction: <strong>{path.title}</strong>
            </span>
          </div>
        </section>
        <section
          className="journey-evidence"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="evidence-topline">
            <span className="pill pill-gold">Illustrative progress</span>
            <span>Milestone {selected + 1} / 7</span>
          </div>
          <div className="evidence-title">
            <span className="icon-tile">
              <Icon name={milestone.icon} size={27} />
            </span>
            <h2>{milestone.title}</h2>
            <p>{milestone.text}</p>
          </div>
          <div className="evidence-file">
            <span className="evidence-label">EXAMPLE PROJECT EVIDENCE</span>
            <div>
              <Icon name="FileCheck2" size={22} />
              <span>{milestone.evidence}</span>
            </div>
          </div>
          <div className="teacher-feedback">
            <MessageSquareQuote size={22} strokeWidth={1.5} />
            <span className="evidence-label">SAMPLE TEACHER FEEDBACK</span>
            <p>"{milestone.feedback}"</p>
            <span>A feedback example, not an actual assessment.</span>
          </div>
          <Link className="evidence-course" to={`/courses/${milestone.course}`}>
            Explore the related course
            <ArrowRight size={15} />
          </Link>
        </section>
      </div>
      <section className="journey-progress">
        <div>
          <span className="icon-tile">
            <Icon name="Route" size={24} />
          </span>
          <div>
            <span className="pill">Illustrative progress</span>
            <h3>Four foundations explored. A new direction ahead.</h3>
            <p>
              This sample view shows 4 of 7 milestones explored, not a record of
              a real learner.
            </p>
          </div>
        </div>
        <div className="journey-progress-meter">
          <div>
            <span>Foundation milestones</span>
            <strong>4 / 7</strong>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Illustrative milestones explored"
            aria-valuenow={4}
            aria-valuemin={0}
            aria-valuemax={7}
            aria-valuetext="4 of 7 sample milestones"
          >
            <span />
          </div>
          <span>Next direction: {path.output}</span>
        </div>
      </section>
      <Note icon="HeartHandshake">
        <strong>Support is part of the pathway.</strong> English and practical
        Arabic may continue alongside these milestones. Teachers can repeat
        tasks, adjust access, and reduce project scope without treating a
        different pace as a failure.
      </Note>
      <div className="journey-actions">
        <LinkButton to="/projects">Explore the sample projects</LinkButton>
        <LinkButton to="/roadmap" variant="text">
          Return to the learning roadmap
        </LinkButton>
      </div>
    </div>
  );
}
