import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ClipboardCheck,
  Laptop,
  Printer,
  RotateCcw,
} from 'lucide-react';
import { Eyebrow, Icon, LinkButton, Note, PageHeader } from '../components/ui';
import { site } from '../config/site';
import './partnership.css';

const partnershipSteps = [
  {
    title: 'Meet leadership',
    icon: 'Handshake',
    description:
      "Listen to the institution's vision, existing studies, and priorities.",
  },
  {
    title: 'Assess starting skills',
    icon: 'Compass',
    description:
      "Understand learners' digital confidence, language needs, and support needs.",
  },
  {
    title: 'Review devices and facilities',
    icon: 'Monitor',
    description:
      'Check computers, power, connectivity, and a suitable place to practice.',
  },
  {
    title: 'Agree a pilot group',
    icon: 'Users',
    description:
      'Choose a manageable starting group together, based on support and access.',
  },
  {
    title: 'Adapt the timetable',
    icon: 'CalendarDays',
    description:
      'Fit practical sessions around Islamic studies and institutional commitments.',
  },
  {
    title: 'Guide lessons and projects',
    icon: 'FolderOpen',
    description:
      'Demonstrate, practice, and make useful sample work with patient guidance.',
  },
  {
    title: 'Review with teachers',
    icon: 'MessagesSquare',
    description:
      "Look at learners' work, attendance, and feedback with the institution's teachers.",
  },
  {
    title: 'Decide whether to expand',
    icon: 'Sprout',
    description: 'Continue, adjust, pause, or grow only after a shared review.',
  },
];

const responsibilities = [
  {
    title: `The ${site.name} team`,
    label: 'Teaching and learning',
    icon: 'BookOpen',
    items: [
      {
        title: 'Curriculum and preparation',
        detail:
          'Adapt lesson plans and learning resources to the agreed starting level.',
      },
      {
        title: 'Guided instruction',
        detail:
          'Teach practical skills through demonstrations and supported practice.',
      },
      {
        title: 'Projects and feedback',
        detail:
          'Guide sample projects, review work, and help learners make revisions.',
      },
      {
        title: 'Progress reviews',
        detail:
          'Share learning observations and discuss the next step with institutional teachers.',
      },
    ],
  },
  {
    title: 'The institution',
    label: 'Local guidance and support',
    icon: 'GraduationCap',
    items: [
      {
        title: 'Learners and supervision',
        detail:
          'Select the pilot group and arrange attendance, supervision, and learner support.',
      },
      {
        title: 'Space and device access',
        detail:
          'Arrange a suitable classroom, available computers, power, and agreed connectivity.',
      },
      {
        title: 'Timetable and coordination',
        detail:
          'Nominate a coordinator and protect time alongside existing Islamic studies.',
      },
      {
        title: 'Permissions and safeguards',
        detail:
          'Oversee local approvals, privacy, safeguarding, and review of religious material.',
      },
    ],
  },
];

const startingLevels = {
  'first-time': {
    label: 'First-time computer user',
    emphasis:
      'Begin with the keyboard and mouse, saving and finding files, safe browsing, and simple documents. Build confidence through repeatable everyday tasks before introducing specialist tools.',
  },
  basic: {
    label: 'Some basic experience',
    emphasis:
      'Check file handling and digital safety, then strengthen documents, spreadsheets, and presentations. Support English or Arabic communication where useful, and revisit gaps before specialist work.',
  },
  specialization: {
    label: 'Ready for specialization',
    emphasis:
      'Confirm readiness with a practical check of files, documents, and digital safety. Focus on one specialist prototype, returning to individual foundation skills whenever support is needed.',
  },
};

const deviceOptions = {
  individual: {
    label: 'One per learner',
    approach:
      'Check each computer can run the agreed tools and save work. Give every learner individual practice, followed by a paired review. Confirm power, connectivity, and safe sign-in arrangements.',
  },
  pairs: {
    label: 'Shared pairs',
    approach:
      'Alternate operator and observer roles so both learners get hands-on practice. Ask each learner to demonstrate the task individually. Agree shared-device sign-out and separate work folders.',
  },
  limited: {
    label: 'Limited lab access',
    approach:
      'Agree actual lab availability before choosing the group. Combine offline preparation with supervised computer rotations, and repeat individual tasks when access allows. Do not assume home access.',
  },
};

const sessionOptions = {
  '1': {
    label: '1 session per week',
    practice:
      'Use a short recap and one manageable task in each session. Agree between-session practice only where device access is available; allow extra repetition before moving on.',
  },
  '2': {
    label: '2 sessions per week',
    practice:
      "Use one session for demonstration and guided practice, then revisit and improve the same task in the next. Keep both sessions aligned with the institution's study timetable.",
  },
  '3': {
    label: '3 sessions per week',
    practice:
      'Alternate demonstration, supported repetition, and a project review. Check that the proposed frequency leaves enough time for existing studies, rest, and teacher preparation.',
  },
};

const specializations = {
  web: {
    label: 'Web development',
    project:
      'Build a small, mobile-friendly educational web page using fictional information. Review clarity, navigation, and accessibility before discussing any publication.',
  },
  content: {
    label: 'Content creation',
    project:
      'Prepare a clear digital lesson resource with a captioned explanation or matching transcript. Review readability, source permissions, and religious references before sharing.',
  },
  teaching: {
    label: 'Online teaching',
    project:
      'Plan a learning objective and rehearse a supervised mock lesson with a resource and a check for understanding. Use fictional learner details and follow institutional safeguarding rules.',
  },
};

type PlannerSelections = {
  level: keyof typeof startingLevels;
  devices: keyof typeof deviceOptions;
  sessions: keyof typeof sessionOptions;
  specialization: keyof typeof specializations;
};

const defaultSelections: PlannerSelections = {
  level: 'first-time',
  devices: 'pairs',
  sessions: '2',
  specialization: 'web',
};

const contactFields = [
  { key: 'email', label: 'Team email', icon: 'Mail' },
  { key: 'phone', label: 'Contact number', icon: 'MessagesSquare' },
  { key: 'location', label: 'Area of operation', icon: 'Globe2' },
] as const;

export default function Partnership() {
  const [selections, setSelections] =
    useState<PlannerSelections>(defaultSelections);
  const [contact, setContact] = useState({ ...site.contact });
  const level = startingLevels[selections.level];
  const devices = deviceOptions[selections.devices];
  const sessions = sessionOptions[selections.sessions];
  const specialization = specializations[selections.specialization];
  const projectReadiness =
    selections.level === 'first-time'
      ? 'Keep this as a future direction while computer confidence develops.'
      : selections.level === 'basic'
        ? 'Introduce this project once everyday foundation tasks are repeatable.'
        : 'Begin with a small prototype once the practical readiness check is complete.';
  const guidance = [
    { title: 'Foundation emphasis', icon: 'Layers3', text: level.emphasis },
    { title: 'Equipment and access', icon: 'Monitor', text: devices.approach },
    { title: 'Practice rhythm', icon: 'CalendarDays', text: sessions.practice },
    {
      title: 'Suggested approach',
      icon: 'Route',
      text: `${projectReadiness} ${specialization.project}`,
    },
  ];

  return (
    <div className="container partnership-page">
      <section
        className="partnership-intro"
        aria-label="Institutional partnership introduction"
      >
        <PageHeader
          eyebrow="A thoughtful partnership"
          title="Start small. Build together."
          description="A small, supported pilot to bring practical skills alongside your institution's existing Islamic studies. Shaped with your teachers, at a pace that respects your priorities."
        >
          <div className="partnership-intro-actions">
            <a href="#pilot-planner" className="button button-primary">
              Explore a pilot <ArrowDown size={17} aria-hidden="true" />
            </a>
            <span>A conversation first. A shared decision next.</span>
          </div>
        </PageHeader>

        <aside
          className="partnership-principle"
          aria-labelledby="partnership-principle-title"
        >
          <div className="partnership-principle-top">
            <span className="partnership-small-label">
              An addition, not a replacement
            </span>
            <Icon name="Sprout" size={23} />
          </div>
          <div className="partnership-connected-icons" aria-hidden="true">
            <span>
              <BookOpen size={30} strokeWidth={1.4} />
            </span>
            <span className="partnership-connection">
              <span />
              <span />
              <span />
            </span>
            <span>
              <Laptop size={30} strokeWidth={1.4} />
            </span>
          </div>
          <h2 id="partnership-principle-title">
            Rooted in your studies.
            <br />
            Room for new skills.
          </h2>
          <p>
            Keep Islamic learning at the heart. Create space for digital
            confidence, useful projects, and thoughtful teaching.
          </p>
          <div className="partnership-principle-bottom">
            <Icon name="ShieldCheck" size={18} />
            <span>Your context shapes the pilot.</span>
          </div>
        </aside>
      </section>

      <section
        className="partnership-process partnership-section"
        aria-labelledby="partnership-process-title"
      >
        <div className="section-heading partnership-section-heading">
          <div>
            <Eyebrow>From conversation to classroom</Eyebrow>
            <h2 id="partnership-process-title">A clear path, at your pace.</h2>
          </div>
          <p>
            Begin by listening. Build through practice.
            <br />
            Decide the next step together.
          </p>
        </div>
        <ol className="partnership-steps" role="list">
          {partnershipSteps.map((step, index) => (
            <li key={step.title}>
              <div className="partnership-step-top">
                <span className="partnership-step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon name={step.icon} size={21} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="partnership-roles partnership-section"
        aria-labelledby="partnership-roles-title"
      >
        <div className="section-heading partnership-section-heading">
          <div>
            <Eyebrow>Shared ownership</Eyebrow>
            <h2 id="partnership-roles-title">Clear roles. A shared purpose.</h2>
          </div>
          <p>
            A proposed division of responsibilities,
            <br />
            to confirm together before a pilot begins.
          </p>
        </div>
        <div className="partnership-role-grid">
          {responsibilities.map((role, index) => (
            <article
              key={role.title}
              className={`partnership-role-card partnership-role-${index === 0 ? 'team' : 'institution'}`}
            >
              <header>
                <span className="partnership-role-icon">
                  <Icon name={role.icon} size={25} />
                </span>
                <div>
                  <span className="partnership-small-label">{role.label}</span>
                  <h3>{role.title}</h3>
                </div>
              </header>
              <ul role="list">
                {role.items.map((item) => (
                  <li key={item.title}>
                    <Icon name="Check" size={17} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        id="pilot-planner"
        className="partnership-planner partnership-section"
        aria-labelledby="pilot-planner-title"
        aria-describedby="pilot-planner-description"
      >
        <header className="partnership-planner-heading">
          <div>
            <Eyebrow light>A starting point, not a fixed plan</Eyebrow>
            <h2 id="pilot-planner-title">Pilot Planner</h2>
            <p id="pilot-planner-description">
              What might work for your institution? Explore a starting point and
              bring the brief to a conversation with your teachers.
            </p>
          </div>
          <span className="partnership-planner-mark" aria-hidden="true">
            <ClipboardCheck size={34} strokeWidth={1.3} />
          </span>
        </header>

        <div className="partnership-planner-body">
          <div className="partnership-planner-controls">
            <fieldset
              className="partnership-planner-fields"
              aria-describedby="partnership-planner-help"
            >
              <legend>A few things to begin with</legend>
              <p id="partnership-planner-help">
                Change a selection to update your discussion brief. Nothing is
                submitted.
              </p>

              <div className="partnership-field">
                <label htmlFor="pilot-starting-level">Starting level</label>
                <div className="partnership-select-wrap">
                  <select
                    id="pilot-starting-level"
                    value={selections.level}
                    onChange={(event) =>
                      setSelections({
                        ...selections,
                        level: event.target.value as PlannerSelections['level'],
                      })
                    }
                    aria-describedby="pilot-level-help"
                  >
                    {Object.entries(startingLevels).map(([value, option]) => (
                      <option key={value} value={value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={17} aria-hidden="true" />
                </div>
                <p id="pilot-level-help">
                  An initial impression, to review with a teacher.
                </p>
              </div>

              <div className="partnership-field">
                <label htmlFor="pilot-devices">Device availability</label>
                <div className="partnership-select-wrap">
                  <select
                    id="pilot-devices"
                    value={selections.devices}
                    onChange={(event) =>
                      setSelections({
                        ...selections,
                        devices: event.target
                          .value as PlannerSelections['devices'],
                      })
                    }
                    aria-describedby="pilot-devices-help"
                  >
                    {Object.entries(deviceOptions).map(([value, option]) => (
                      <option key={value} value={value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={17} aria-hidden="true" />
                </div>
                <p id="pilot-devices-help">
                  Choose what is available, not what is hoped for.
                </p>
              </div>

              <div className="partnership-field-row">
                <div className="partnership-field">
                  <label htmlFor="pilot-sessions">Sessions per week</label>
                  <div className="partnership-select-wrap">
                    <select
                      id="pilot-sessions"
                      value={selections.sessions}
                      onChange={(event) =>
                        setSelections({
                          ...selections,
                          sessions: event.target
                            .value as PlannerSelections['sessions'],
                        })
                      }
                    >
                      {Object.entries(sessionOptions).map(([value, option]) => (
                        <option key={value} value={value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={17} aria-hidden="true" />
                  </div>
                </div>
                <div className="partnership-field">
                  <label htmlFor="pilot-specialization">Specialization</label>
                  <div className="partnership-select-wrap">
                    <select
                      id="pilot-specialization"
                      value={selections.specialization}
                      onChange={(event) =>
                        setSelections({
                          ...selections,
                          specialization: event.target
                            .value as PlannerSelections['specialization'],
                        })
                      }
                    >
                      {Object.entries(specializations).map(
                        ([value, option]) => (
                          <option key={value} value={value}>
                            {option.label}
                          </option>
                        ),
                      )}
                    </select>
                    <ChevronDown size={17} aria-hidden="true" />
                  </div>
                </div>
              </div>
              <p className="partnership-field-footnote">
                A direction to explore, not a requirement to skip foundations.
              </p>
            </fieldset>

            <details className="partnership-contact-editor">
              <summary>
                <span>
                  <Icon name="FileText" size={18} />
                  Edit printout contact details
                </span>
                <ChevronDown size={17} aria-hidden="true" />
              </summary>
              <fieldset>
                <legend>Contact details for this draft</legend>
                <p>
                  These editable placeholders come from the site configuration.
                  Replace them with approved team details for the printout.
                  Nothing is sent or saved.
                </p>
                {contactFields.map((field) => (
                  <div className="partnership-field" key={field.key}>
                    <label htmlFor={`pilot-contact-${field.key}`}>
                      {field.label}
                    </label>
                    <input
                      id={`pilot-contact-${field.key}`}
                      type="text"
                      autoComplete="off"
                      spellCheck={false}
                      value={contact[field.key]}
                      placeholder={site.contact[field.key]}
                      onChange={(event) =>
                        setContact({
                          ...contact,
                          [field.key]: event.target.value,
                        })
                      }
                    />
                  </div>
                ))}
              </fieldset>
            </details>

            <div className="partnership-planner-actions">
              <button
                type="button"
                className="button button-primary"
                onClick={() => window.print()}
              >
                <Printer size={17} aria-hidden="true" />
                Print summary
              </button>
              <button
                type="button"
                className="button button-text"
                onClick={() => {
                  setSelections(defaultSelections);
                  setContact({ ...site.contact });
                }}
              >
                <RotateCcw size={16} aria-hidden="true" />
                Reset planner
              </button>
            </div>
            <p className="partnership-local-note">
              <Icon name="ShieldCheck" size={15} />A local draft only. No
              registration, storage, or data submission.
            </p>
          </div>

          <article
            className="pilot-print-summary"
            aria-labelledby="pilot-summary-title"
          >
            <p className="partnership-print-only partnership-print-brand">
              {site.name} / Institutional Partnership
            </p>
            <header className="partnership-summary-heading">
              <span className="partnership-summary-label">
                <span />
                Discussion draft
              </span>
              <h3 id="pilot-summary-title">Your pilot discussion brief</h3>
              <p>
                A proposal to explore together, not an application, confirmed
                schedule, or commitment.
              </p>
            </header>

            <div
              aria-live="polite"
              aria-atomic="false"
              className="partnership-summary-live"
            >
              <dl className="partnership-summary-selections">
                <div>
                  <dt>Starting level</dt>
                  <dd>{level.label}</dd>
                </div>
                <div>
                  <dt>Device availability</dt>
                  <dd>{devices.label}</dd>
                </div>
                <div>
                  <dt>Sessions per week</dt>
                  <dd>{sessions.label}</dd>
                </div>
                <div>
                  <dt>Specialization</dt>
                  <dd>{specialization.label}</dd>
                </div>
              </dl>
              <div className="partnership-summary-guidance">
                {guidance.map((item) => (
                  <section
                    key={item.title}
                    className="partnership-guidance-item"
                    aria-label={item.title}
                  >
                    <span className="partnership-guidance-icon">
                      <Icon name={item.icon} size={18} />
                    </span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <Note icon="CalendarDays" className="partnership-summary-note">
              Schedules depend on learner readiness and institution
              availability. Group size, equipment needs, and any expansion must
              be agreed after an on-site review.
            </Note>

            <section
              className="partnership-print-only partnership-print-responsibilities"
              aria-labelledby="pilot-print-roles-title"
            >
              <h4 id="pilot-print-roles-title">Proposed responsibilities</h4>
              <div className="partnership-print-role-grid">
                {responsibilities.map((role) => (
                  <div key={role.title}>
                    <h5>{role.title}</h5>
                    <ul>
                      {role.items.map((item) => (
                        <li key={item.title}>
                          <strong>{item.title}:</strong> {item.detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="partnership-summary-contact"
              aria-labelledby="pilot-summary-contact-title"
            >
              <h4 id="pilot-summary-contact-title">
                Contact details for discussion
              </h4>
              <p className="partnership-contact-caption">
                Editable draft details. Replace any bracketed placeholders
                before sharing.
              </p>
              <dl>
                {contactFields.map((field) => (
                  <div key={field.key}>
                    <dt>
                      <Icon name={field.icon} size={14} />
                      {field.label}
                    </dt>
                    <dd>
                      {contact[field.key].trim() || site.contact[field.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
            <p className="partnership-print-only partnership-print-closing">
              Next conversation: review readiness, available facilities, shared
              responsibilities, and a timetable that protects existing Islamic
              studies.
            </p>
          </article>
        </div>
      </section>

      <section
        className="partnership-next"
        aria-labelledby="partnership-next-title"
      >
        <span className="partnership-next-icon">
          <Icon name="Handshake" size={28} />
        </span>
        <div>
          <Eyebrow>The people behind the proposal</Eyebrow>
          <h2 id="partnership-next-title">
            Begin with a shared understanding.
          </h2>
          <p>
            Explore the teaching roles and the support a thoughtful pilot needs.
          </p>
        </div>
        <LinkButton to="/team" variant="secondary" arrow={false}>
          Meet the teaching roles <ArrowRight size={17} aria-hidden="true" />
        </LinkButton>
      </section>
    </div>
  );
}
