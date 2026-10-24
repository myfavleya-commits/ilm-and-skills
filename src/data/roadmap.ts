import type { RoadmapStage } from './types';

export const stages: RoadmapStage[] = [
  {
    id: 1,
    title: 'Computer Confidence',
    subtitle: 'Build everyday confidence, one demonstrated task at a time.',
    icon: 'Monitor',
    prerequisites:
      'No previous computer experience is required. Access to a shared or personal computer and patient teacher guidance is enough to begin.',
    learns:
      'Use the keyboard and mouse, manage files and folders, browse with care, and protect personal information. Progress depends on demonstrated readiness, not a fixed number of weeks.',
    steps: [
      'Practice selecting, typing, scrolling, and opening and closing an application.',
      'Create a practice folder, save a short note, rename it clearly, and find it again.',
      'Open a teacher-approved website, identify its address, and distinguish page content from advertisements.',
      'Practice recognizing an unexpected download or suspicious message, and sign out of a shared device.',
    ],
    activity:
      'Save a fictional lesson note in a named folder, close the application, and reopen the note. Use a teacher-prepared suspicious-message example to explain when to ask for help.',
    output:
      'A clearly named practice folder containing a saved, retrievable lesson note and a short personal safety checklist.',
    assessment:
      'The teacher watches the learner create a folder, save and reopen a file, locate a website address, and explain why an unexpected link should not be opened. The learner signs out of the practice account; any task needing support is practiced again without penalty.',
    next: 'Move to office tasks when files can be saved and found with growing independence. Revisit individual foundation tasks whenever needed.',
    courseIds: ['computer-foundations'],
  },
  {
    id: 2,
    title: 'Office and Communication Foundations',
    subtitle: 'Prepare useful documents, records, and short presentations.',
    icon: 'FileText',
    prerequisites:
      'Can open an application, type a short note, and save and retrieve a file, with agreed accessibility support where needed.',
    learns:
      'Format a readable document, organize a small spreadsheet, present a short lesson, and communicate clearly. English and Arabic are parallel pathways: choose either or both according to existing ability and learning needs, not as a required sequence.',
    steps: [
      'Use Word to format headings, paragraphs, and a simple list in an illustrative lesson outline.',
      'Use Excel to record fictional attendance and check a basic counting formula.',
      'Use PowerPoint to arrange a short lesson with readable slides and speaker notes.',
      'Choose an English or Arabic communication pathway, or both if useful, and practice a short introduction and a respectful clarification question.',
      'Label any religious reference as a citation placeholder until a qualified teacher has checked its source and context; do not invent quotations or rulings.',
    ],
    activity:
      'Prepare a sample lesson outline, a small fictional attendance sheet, and a brief slide presentation. Rehearse explaining one item in the selected communication pathway.',
    output:
      'An editable document, a checked practice spreadsheet, a short slide deck, and a rehearsed introduction in the selected language pathway.',
    assessment:
      'The teacher opens the saved files, asks the learner to change a heading, checks a spreadsheet total against a manual count, and watches a short presentation. During a brief exchange, the teacher checks that the learner can introduce the topic and ask for clarification; accent is not a pass or fail criterion.',
    next: 'Begin digital content and online teaching basics once these everyday tasks are understandable and repeatable. Continue the selected English or Arabic pathway alongside later stages as needed.',
    courseIds: ['word', 'excel', 'powerpoint', 'english', 'arabic'],
  },
  {
    id: 3,
    title: 'Digital Content and Online Teaching Basics',
    subtitle: 'Turn a small lesson into clear, accessible digital material.',
    icon: 'Video',
    prerequisites:
      'Can prepare and retrieve a simple document or slide deck and explain a short lesson. Completing both language pathways is not required.',
    learns:
      'Adapt lesson material for a screen, record a short explanation, organize a practice online class, and respect consent, privacy, and content ownership. Treat AI-generated material as an unverified draft rather than a source of facts or religious authority.',
    steps: [
      'Choose one learning objective and simplify a document or slide for screen viewing.',
      'Record a short sample explanation and add captions or a matching transcript.',
      'Rehearse joining a practice class, muting the microphone, sharing a window, and stopping screen sharing.',
      'Use fictional learner details, check sharing permissions, and ask for consent before recording anyone.',
      'If using AI for a draft or checklist, remove personal data, verify factual statements, and leave religious citations as placeholders for qualified teacher review.',
    ],
    activity:
      'Run a short mock lesson with the teacher as the learner. Share a prepared resource, explain one idea, ask a check-for-understanding question, and collect a sample response.',
    output:
      'A sample digital lesson resource, a captioned recording or transcript, and a practice-class checklist using fictional information.',
    assessment:
      'The teacher joins the mock lesson, checks that the resource is readable and audible, observes screen sharing start and stop, and answers the learner-check question. Together they inspect captions or the transcript, sharing permissions, and any unverified claims before the resource is marked ready.',
    next: 'Choose a practical specialization according to interests, available equipment, and demonstrated readiness. These basics are an introduction, not a requirement to master every content or teaching tool.',
    courseIds: ['content-creation', 'online-teaching', 'ai-literacy'],
  },
  {
    id: 4,
    title: 'Choose a Practical Specialization',
    subtitle:
      'Choose web, content, or teaching; one focused pathway is enough.',
    icon: 'Route',
    prerequisites:
      'Can prepare a clear digital resource and complete a guided mock lesson. Discuss interests, access needs, and equipment with the teacher before selecting a pathway.',
    learns:
      'Develop one practical specialty: a simple website, useful digital content with an honest promotion plan, or a structured online lesson sequence. The listed courses are pathway options, not a checklist that every learner must complete.',
    steps: [
      'Choose one primary pathway with the teacher: web, content, or teaching. There is no requirement to master all three.',
      'For web, use web-development to build a small teacher profile website with clear navigation and mobile-friendly content.',
      'For content, use content-creation to make a coherent lesson resource; add digital-marketing if an audience and promotion plan supports the chosen project.',
      'For teaching, use online-teaching to plan a short sequence with a learning objective, guided practice, and a check for understanding.',
      'Use ai-literacy as optional support for reviewing drafts, while checking accuracy, permissions, and citation placeholders with the teacher.',
      'Revise one prototype after specific teacher feedback before increasing the project scope.',
    ],
    activity:
      'Build one small prototype in the selected pathway: a fictional profile website, a sample content resource and promotion outline, or a mock online lesson sequence. Test it with the teacher rather than publishing to a real audience.',
    output:
      'One reviewed specialization prototype and a short note explaining its audience, purpose, tools, and next revision.',
    assessment:
      'The teacher checks only the selected pathway: navigate the website on narrow and wide screens; open the content and inspect its message and permissions; or participate in the mock lesson and complete its learner task. The learner demonstrates a revision based on that check and explains one remaining limitation.',
    next: 'Start the final project when the selected prototype works for its agreed purpose. Extend practice or adjust scope when needed; another specialization can be explored later by choice.',
    courseIds: [
      'web-development',
      'content-creation',
      'digital-marketing',
      'online-teaching',
      'ai-literacy',
    ],
  },
  {
    id: 5,
    title: 'Guided Final Project and Portfolio',
    subtitle: 'Show the work, explain the choices, and plan the next step.',
    icon: 'FolderCheck',
    prerequisites:
      'Has one reviewed prototype from the selected specialization and can explain its purpose. Agree a manageable final-project scope with the teacher; all-track mastery is not required.',
    learns:
      'Respond to a simple brief, revise work after feedback, organize a small portfolio, and describe skills and limits honestly. Sample work demonstrates practice, not actual client results, employment, or earnings.',
    steps: [
      'Select one illustrative project or an equally scoped teacher-approved brief within the chosen pathway.',
      'Write a short checklist covering audience, deliverables, accessibility, privacy, and source review.',
      'Build and test the deliverable, keeping fictional information and teacher-review placeholders wherever verification is still needed.',
      'Record specific teacher feedback and show how at least one revision addresses it.',
      'Package the editable work and a viewable version with a short explanation of the tools used, any AI assistance, and known limitations.',
      'Label the portfolio entry as illustrative sample work and agree a personal next-practice goal.',
    ],
    activity:
      'Present the final sample to the teacher, demonstrate one core task, explain one design or teaching choice, and walk through a revision prompted by feedback.',
    output:
      'A small portfolio containing the final illustrative project, editable source files, a viewable version, a feedback-and-revision note, and a realistic next-practice goal.',
    assessment:
      'The teacher opens the portfolio files, observes the agreed core task, compares the work with the project checklist, and checks the documented revision. The teacher confirms that sample labels, privacy safeguards, permissions, and unresolved citation placeholders are visible before agreeing the next learning step.',
    next: 'Continue targeted practice, explore an optional second pathway, or prepare for a supervised real-world task when ready. Timing is based on readiness and available practice; no course length, job, client, or earnings outcome is guaranteed.',
    courseIds: ['professional-practice'],
  },
];
