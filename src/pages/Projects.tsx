import { useState } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/types';
import { ProjectCard, ProjectDialog } from '../components/ProjectPreview';
import { Icon, LinkButton, Note, PageHeader } from '../components/ui';
import './projects.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <div className="container projects-page">
      <PageHeader
        eyebrow="The student project showcase"
        title="Knowledge into something useful."
        description="A lesson made clearer. A class record made simpler. A teacher reaching a wider audience. Explore six examples of what practical learning could make possible."
      />
      <div className="showcase-intro">
        <span className="pill pill-gold">
          <Icon name="Layers3" size={12} />
          Illustrative work, thoughtfully proposed
        </span>
        <span>Open any project to explore the output and teacher review.</span>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={setSelectedProject}
          />
        ))}
      </div>
      <Note icon="ShieldCheck">
        <strong>Examples, not claims.</strong> These are designed previews, not
        actual student submissions, institutional results, or live services. All
        learner data is fictional. Religious quotations and references must be
        verified by qualified teachers before publication.
      </Note>
      <section className="projects-next">
        <div>
          <h2>A project is more than a finished file.</h2>
          <p>
            It is a chance to practise, explain a choice, receive feedback, and
            make an improvement. Explore how the pathway supports that process.
          </p>
        </div>
        <LinkButton to="/journey">Follow the student journey</LinkButton>
      </section>
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
