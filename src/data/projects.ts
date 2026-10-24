import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'khutbah',
    title: 'Friday Khutbah Outline',
    category: 'Document Preparation',
    description:
      'An illustrative sample Word project for practicing a clear, readable khutbah outline. It is a formatting exercise, not an approved sermon or a source of religious rulings.',
    problem:
      'A draft outline can be difficult to review when its main message, supporting points, and sources are not clearly separated.',
    creates:
      'An editable outline with a topic heading, an introduction, three discussion points, a closing reminder, and [Teacher-verified citation to be added] placeholders. Include no invented scripture, attributed quotation, or ruling; a qualified teacher must review religious content before any real use.',
    skills: [
      'Apply heading styles and consistent paragraph spacing in Word.',
      'Organize a topic into an introduction, main points, and a conclusion.',
      'Keep citation placeholders distinct from reviewed source material.',
      'Save an editable document and export a readable PDF.',
    ],
    evaluation: [
      'The teacher can identify the topic and follow the outline in its intended order.',
      'Headings, lists, and paragraph spacing are consistent in both the Word file and PDF.',
      'Religious references remain clearly labeled placeholders until a qualified teacher checks the source, wording, and context; no scripture or ruling is invented.',
      'The learner makes one requested formatting revision and saves the revised file with a clear name.',
    ],
    courseId: 'word',
    preview: 'document',
  },
  {
    id: 'attendance',
    title: 'Class Attendance Tracker',
    category: 'Spreadsheets and Records',
    description:
      'An illustrative sample Excel tracker using fictional learners and practice dates. It contains no real student records or claims about class performance.',
    problem:
      'An inconsistent attendance sheet makes entries hard to interpret and totals difficult to check.',
    creates:
      'A worksheet for six fictional learners across five sample sessions, with a P/A legend, session dates, a present-count formula for each learner, and a clearly labeled total for each session.',
    skills: [
      'Arrange names, dates, and attendance entries in a labeled table.',
      'Use COUNTIF to count present entries in a selected range.',
      'Copy a formula while checking its cell references.',
      'Format column widths and print settings for a readable sheet.',
    ],
    evaluation: [
      'The teacher can locate a fictional learner and interpret each attendance code using the legend.',
      'Formula totals match a manual count for two selected learners and one selected session.',
      'Changing one practice entry updates the corresponding totals correctly.',
      'The sheet uses fictional labels without personal contact details, and its print preview includes all relevant columns.',
    ],
    courseId: 'excel',
    preview: 'spreadsheet',
  },
  {
    id: 'presentation',
    title: 'Five-Slide Lesson Presentation',
    category: 'Lesson Presentations',
    description:
      'An illustrative sample PowerPoint lesson for practicing a concise explanation. It is a mock teaching resource, not evidence of learner results.',
    problem:
      'A lesson can be hard to follow when slides contain dense text, unclear sequencing, or no opportunity to check understanding.',
    creates:
      'Exactly five slides: a title and learning objective, a simple explanation, a worked example, a learner practice task, and a recap with a check-for-understanding question. Add speaker notes and source-review placeholders where needed.',
    skills: [
      'Sequence slides around one observable learning objective.',
      'Use readable text, clear contrast, and consistent layouts.',
      'Choose an original or appropriately licensed visual and record its source.',
      'Use speaker notes to support explanation rather than crowding slides.',
    ],
    evaluation: [
      'The teacher counts five slides and identifies the learning objective, example, practice task, and recap.',
      'Text remains readable in presentation mode, and visuals support rather than obscure the explanation.',
      'The learner presents the sequence and uses the final question to check the teacher acting as a learner.',
      'Visual sources are recorded; any religious reference is a placeholder pending qualified teacher review, with no invented quotation or ruling.',
    ],
    courseId: 'powerpoint',
    preview: 'slides',
  },
  {
    id: 'teacher-website',
    title: 'Teacher Profile Website',
    category: 'Web Development',
    description:
      'An illustrative sample website for a fictional teacher. All biographical details and offerings are demonstration content, not verified credentials or a live service.',
    problem:
      'A visitor needs a simple way to find a teacher introduction, sample lesson topics, and a clearly explained contact route.',
    creates:
      'A small static website with an introduction, sample subjects, one lesson-resource link, and a contact section marked Demonstration only. Use fictional details and a reserved example.com address; collect no visitor information.',
    skills: [
      'Structure a page with semantic HTML and clear section headings.',
      'Use CSS to create a layout that works on narrow and wide screens.',
      'Write meaningful link text and useful alternative text for images.',
      'Check navigation, keyboard access, and local file paths.',
    ],
    evaluation: [
      'The teacher opens the site locally and reaches each section and the sample resource without a broken link.',
      'The layout remains readable at narrow and wide widths without horizontal scrolling.',
      'Keyboard navigation reaches links with a visible focus indicator, and relevant images have suitable alternative text.',
      'Fictional identity details and the demonstration-only contact section are clearly labeled, with no real credentials asserted or visitor data collected.',
    ],
    courseId: 'web-development',
    preview: 'website',
  },
  {
    id: 'promotion',
    title: 'Online Class Promotion Plan',
    category: 'Digital Marketing',
    description:
      'An illustrative sample promotion plan for a fictional online class. No advertisement is published, no money is spent, and no enrollment or earnings result is claimed.',
    problem:
      'A class announcement needs a clear intended audience, honest wording, and a practical way to assess interest without promising results.',
    creates:
      'A one-page plan naming a sample audience, a class objective, two suitable communication channels, a short announcement, a draft posting sequence, and a measurement table labeled Hypothetical sample data. List consent and permission checks before any future publication.',
    skills: [
      'Describe an intended audience and a relevant class objective.',
      'Write an accurate announcement without pressure or exaggerated claims.',
      'Select channels and draft a manageable posting sequence.',
      'Distinguish inquiries, registrations, and hypothetical measurements.',
    ],
    evaluation: [
      'The teacher can identify who the class is for, what it covers, and how a reader would ask for information in a real version.',
      'The sample announcement avoids guaranteed learning, enrollment, income, or employment claims and contains no invented testimonials.',
      'Each proposed channel has a brief audience-fit explanation and a permission or consent check.',
      'The measurement table is explicitly hypothetical, separates inquiries from registrations, and is not presented as an actual campaign result.',
    ],
    courseId: 'digital-marketing',
    preview: 'plan',
  },
  {
    id: 'mini-course',
    title: 'Mini Online Course',
    category: 'Online Teaching',
    description:
      'An illustrative sample online course rehearsed with a teacher or consenting practice partner. It demonstrates planning and delivery, not verified student achievement or a live course business.',
    problem:
      'A short online course needs connected objectives, usable resources, and checks for understanding rather than a collection of unrelated recordings.',
    creates:
      'A three-lesson mock course with one overall aim, an observable objective for each lesson, a short teaching resource, a guided activity, a learner-check question with a feedback note, and a joining and privacy checklist. Use fictional participants and citation-review placeholders when relevant.',
    skills: [
      'Break a small topic into a coherent three-lesson sequence.',
      'Match an activity and learner check to each lesson objective.',
      'Prepare readable resources with captions or transcripts for recorded explanations.',
      'Rehearse online-class controls and give specific, respectful feedback.',
      'Check sharing permissions and recording consent before a practice session.',
    ],
    evaluation: [
      'The teacher finds three connected lessons, each with an objective, resource, activity, and learner check.',
      'During one mock lesson, the learner demonstrates joining instructions, shares the intended resource, and stops screen sharing afterward.',
      'The teacher acting as a participant completes a learner check and receives feedback tied to the stated objective.',
      'Resources are readable, recorded explanations have captions or transcripts, and sharing settings and recording consent are checked.',
      'The course is labeled illustrative, participant information is fictional, and any religious citations remain placeholders pending qualified review without invented scripture or rulings.',
    ],
    courseId: 'online-teaching',
    preview: 'classroom',
  },
];
