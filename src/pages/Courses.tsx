import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, courses } from '../data/courses';
import { Icon, Note, PageHeader } from '../components/ui';
import type { Category } from '../data/types';
import './curriculum.css';

export default function Courses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'All courses'>(
    'All courses',
  );
  const filtered = courses.filter(
    (course) =>
      (category === 'All courses' || category === course.category) &&
      `${course.title} ${course.shortTitle} ${course.description} ${course.category} ${course.miniProject.title}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const clear = () => {
    setSearch('');
    setCategory('All courses');
  };

  return (
    <div className="container courses-page">
      <PageHeader
        eyebrow="The proposed curriculum"
        title="Practical skills. Purposeful learning."
        description="A course for the first click, the first lesson handout, and the next chapter. Explore a curriculum built around useful work, careful guidance, and real understanding."
      />
      <div className="catalog-tools">
        <div className="catalog-search">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="course-search">
            Search courses
          </label>
          <input
            id="course-search"
            type="search"
            placeholder="What would you like to learn?"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear course search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <span>
          <SlidersHorizontal size={15} />
          Explore by interest, not by deadline
        </span>
      </div>
      <div
        className="category-filters"
        role="group"
        aria-label="Filter courses by category"
      >
        {(['All courses', ...categories] as const).map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={category === item ? 'is-selected' : ''}
          >
            {item}
            {item === 'All courses' && <span>{courses.length}</span>}
          </button>
        ))}
      </div>
      <div className="catalog-results">
        <p aria-live="polite">
          Showing <strong>{filtered.length}</strong>{' '}
          {filtered.length === 1 ? 'course' : 'courses'}
          {category !== 'All courses' && <> in {category}</>}
          {search.trim() && <> for "{search.trim()}"</>}
        </p>
        {(search || category !== 'All courses') && (
          <button onClick={clear}>
            Reset filters
            <X size={13} />
          </button>
        )}
        <span>Proposed learning modules</span>
      </div>
      {filtered.length ? (
        <div className="course-grid">
          {filtered.map((course, index) => (
            <article
              className={`course-card course-color-${categories.indexOf(course.category)}`}
              key={course.id}
            >
              <div className="course-card-top">
                <span className="course-icon">
                  <Icon name={course.icon} size={26} />
                </span>
                <span className={`pill ${course.optional ? 'pill-gold' : ''}`}>
                  {course.phase}
                </span>
              </div>
              <span className="course-category">{course.category}</span>
              <h2>
                <Link to={`/courses/${course.id}`}>{course.title}</Link>
              </h2>
              <p>{course.description}</p>
              <div className="course-mini-project">
                <Icon name="FolderCheck" size={16} />
                <div>
                  <small>YOUR MINI-PROJECT</small>
                  <span>{course.miniProject.title}</span>
                </div>
              </div>
              <div className="course-card-footer">
                <span>
                  {String(index + 1).padStart(2, '0')}
                  <span />
                  {course.lessons.length} learning steps
                </span>
                <Link
                  to={`/courses/${course.id}`}
                  aria-label={`Explore ${course.title}`}
                >
                  Explore course
                  <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="empty-courses">
          <span className="icon-tile">
            <Search size={27} />
          </span>
          <h2>No courses found, just yet.</h2>
          <p>
            Try a broader term like "computer", "English", or "teaching", or
            explore a different category.
          </p>
          <button onClick={clear} className="button button-primary">
            Show all courses
            <ArrowRight size={16} />
          </button>
        </section>
      )}
      <Note icon="Compass" className="catalog-note">
        <strong>Not sure where to start?</strong> Computer Foundations assumes
        no previous computer experience. The{' '}
        <Link to="/roadmap">learning roadmap</Link> explains how the courses fit
        together. Course scheduling is agreed with the institution and adapted
        to learner readiness.
      </Note>
    </div>
  );
}
