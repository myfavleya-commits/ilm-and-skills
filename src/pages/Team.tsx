import { site } from '../config/site';
import {
  Eyebrow,
  Icon,
  LinkButton,
  Note,
  PageHeader,
  SectionHeading,
} from '../components/ui';
import './team.css';

export default function Team() {
  return (
    <div className="container team-page">
      <PageHeader
        eyebrow="People behind the proposal"
        title="Different strengths. One shared purpose."
        description="A small teaching team bringing together technology, English, and Arabic. Our aim is patient instruction, useful practice, and a respectful partnership with your institution."
      />
      <Note icon="Users">
        <strong>Roles, not invented biographies.</strong> The roles below
        describe our proposed responsibilities. No names, qualifications,
        institutional affiliations, or accreditations are being claimed.
        Instructor details can be added when confirmed.
      </Note>
      <div className="team-grid">
        {site.team.map((member, index) => (
          <article
            className={`team-card ${member.proposed ? 'team-card-proposed' : ''}`}
            key={member.id}
          >
            <div className="team-card-visual">
              <div className="team-role-arch">
                <Icon name={member.icon} size={43} />
              </div>
              <span>
                {member.proposed
                  ? 'A PROPOSED SUPPORT ROLE'
                  : `TEACHING FOCUS 0${index + 1}`}
              </span>
              <div className="team-visual-decoration" />
            </div>
            <div className="team-card-copy">
              <span className={`pill ${member.proposed ? 'pill-gold' : ''}`}>
                {member.proposed
                  ? 'Proposed role - not yet appointed'
                  : 'Core teaching role'}
              </span>
              <h2>{member.role}</h2>
              <p className="team-focus">{member.focus}</p>
              <p>{member.description}</p>
              <div className="team-skill-list">
                {member.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <section className="team-approach">
        <SectionHeading
          eyebrow="How we hope to teach"
          title="Patient guidance. Practical understanding."
        />
        <div>
          {[
            [
              'HeartHandshake',
              'Respect the foundation',
              "Recognize the learner's Islamic knowledge, discipline, and achievements. New skills add capability, not replace identity.",
            ],
            [
              'MousePointer2',
              'Demonstrate, then practise',
              'Break an unfamiliar task into manageable steps. Give learners time to try, ask questions, and repeat with support.',
            ],
            [
              'ClipboardCheck',
              'Review the work together',
              'Look for observable understanding. Give specific feedback and help each learner make one purposeful improvement.',
            ],
          ].map(([icon, title, text]) => (
            <article key={title}>
              <span className="icon-tile">
                <Icon name={icon} size={23} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="team-invitation">
        <div>
          <Eyebrow>Built through collaboration</Eyebrow>
          <h2>Your teachers are part of the conversation.</h2>
          <p>
            A useful program depends on local guidance. We propose regular
            conversations about learner readiness, practical access, progress,
            and appropriate religious review.
          </p>
        </div>
        <LinkButton to="/partnership">Explore the partnership</LinkButton>
      </section>
    </div>
  );
}
