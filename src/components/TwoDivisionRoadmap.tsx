import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { learningDivisions, type LearningDivision } from '../data/divisions';
import { BrandMark, Eyebrow, Icon } from './ui';
import './two-division-roadmap.css';

function DivisionCard({ division }: { division: LearningDivision }) {
  const [selectedCategory, setSelectedCategory] = useState(
    division.categories[0].id,
  );
  const selected = division.categories.find(
    (category) => category.id === selectedCategory,
  );

  return (
    <article className={`division-card division-${division.id}`}>
      <div className="division-card-header">
        <div className="division-icon">
          <Icon name={division.icon} size={27} />
        </div>
        <div>
          <span className="division-label">{division.label}</span>
          <h3>{division.title}</h3>
          <p className="division-urdu" lang="ur" dir="rtl">
            {division.urdu}
          </p>
        </div>
      </div>
      <p className="division-audience">{division.audience}</p>
      <p className="division-purpose">{division.purpose}</p>
      <div className="division-steps" aria-label={`${division.title} pathway`}>
        {division.steps.map((step, index) => (
          <div className="division-step" key={step}>
            <span className="division-step-number">0{index + 1}</span>
            <span>{step}</span>
            {index < division.steps.length - 1 && (
              <ArrowRight size={14} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
      <div className="division-courses">
        <div className="division-courses-heading">
          <span>Proposed course areas</span>
          <span className="proposed-badge">Proposed</span>
        </div>
        <div className="division-category-list">
          {division.categories.map((category) => {
            const isSelected = category.id === selectedCategory;
            return (
              <button
                type="button"
                className={`division-category${isSelected ? ' is-selected' : ''}`}
                key={category.id}
                aria-expanded={isSelected}
                aria-controls={`${division.id}-${category.id}-courses`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon name={category.icon} size={16} />
                <span>{category.label}</span>
                <ChevronDown size={15} aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <div
          className="division-course-panel"
          id={`${division.id}-${selected?.id}-courses`}
          aria-live="polite"
        >
          {selected?.courses.map((course) => (
            <span key={course}>
              <span aria-hidden="true" />
              {course}
            </span>
          ))}
        </div>
      </div>
      <Link className="division-detail-link" to={division.detailLink}>
        {division.detailLabel}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}

export default function TwoDivisionRoadmap() {
  return (
    <section
      className="two-division-roadmap"
      aria-labelledby="two-division-title"
    >
      <div className="container">
        <div className="two-division-heading">
          <Eyebrow>One shared mission, two complementary paths</Eyebrow>
          <h2 id="two-division-title">
            Two communities.
            <br />
            <span>Two learning paths.</span>
            <br />
            One shared mission.
          </h2>
          <p>
            Ilm &amp; Skills responds to different learning contexts without
            assuming that every learner starts from the same place. Each
            division is a proposed pathway for discussion, development, and
            qualified educational review.
          </p>
        </div>
        <div className="division-map" aria-label="Two division learning model">
          <div
            className="division-map-line division-map-line-left"
            aria-hidden="true"
          />
          <div
            className="division-map-line division-map-line-right"
            aria-hidden="true"
          />
          <div className="division-center">
            <span className="division-center-mark">
              <BrandMark small />
            </span>
            <strong>Ilm &amp; Skills</strong>
            <span>Knowledge in service of people</span>
          </div>
          <div className="division-grid">
            {learningDivisions.map((division) => (
              <DivisionCard division={division} key={division.id} />
            ))}
          </div>
        </div>
        <p className="division-outcome-note">
          <span aria-hidden="true" />
          Different audiences. Careful teaching. A wider contribution.
          <span aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
