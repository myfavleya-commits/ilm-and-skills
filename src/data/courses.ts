import type { Category, Course } from './types';

export const categories: Category[] = [
  'Foundations',
  'Office Productivity',
  'Languages and Communication',
  'Technology and Content',
  'Teaching and Professional Practice',
];

export const courses: Course[] = [
  {
    id: 'computer-foundations',
    title: 'Computer and Internet Foundations',
    shortTitle: 'Computer Basics',
    category: 'Foundations',
    description:
      'Start with no computer experience. Learn to control a computer, organize your work, find information, and practise safe communication.',
    relevance:
      'Supports study notes, lesson preparation, and communication alongside madrasa learning, with patient practice and no assumed digital experience.',
    prerequisites: ['No previous computer experience is required.'],
    objectives: [
      'Identify computer parts and use the mouse, keyboard, and common apps.',
      'Type short passages and organize files in clearly named folders.',
      'Browse, search, download, and upload harmless practice files.',
      'Rehearse email and attachments in a simulation and recognize common account risks.',
    ],
    lessons: [
      {
        title: 'Meet the computer',
        detail:
          'Identify the screen, keyboard, mouse or touchpad, ports, camera, and microphone. Practise starting, saving work, and shutting down safely.',
      },
      {
        title: 'Control the mouse',
        detail:
          'Move the pointer, click, double-click, right-click, scroll, and drag items. Adjust pointer speed with support if needed.',
      },
      {
        title: 'Find your keyboard keys',
        detail:
          'Use letters, numbers, Space, Shift, Enter, Backspace, Delete, arrows, and Tab. Practise selecting text, copying, pasting, and undoing.',
      },
      {
        title: 'Open and switch apps',
        detail:
          'Open a text editor and browser, resize windows, switch between them, and close apps after saving. Distinguish an app from a file.',
      },
      {
        title: 'Build typing confidence',
        detail:
          'Type short original study notes with punctuation. Try an English, Arabic, or Urdu keyboard layout with guidance, prioritizing accuracy over speed.',
      },
      {
        title: 'Organize files and folders',
        detail:
          'Create a study folder and subfolders. Save, reopen, rename, copy, move, delete, and restore practice files; notice file names and extensions.',
      },
      {
        title: 'Use a browser',
        detail:
          'Open tabs and follow links. Distinguish the address bar from search results, inspect the site address, and understand that HTTPS alone does not prove trustworthiness.',
      },
      {
        title: 'Search with a purpose',
        detail:
          'Choose useful keywords, compare results, and check authors, dates, and source quality. Refer religious questions to qualified teachers rather than trusting search ranking.',
      },
      {
        title: 'Download and upload files',
        detail:
          'Download an instructor-provided sample, locate it in Downloads, and select it in a demonstration upload. Avoid unknown programs and check the selected file.',
      },
      {
        title: 'Compose email in a simulation',
        detail:
          'Use an instructor-provided mock inbox to practise the recipient, subject, greeting, message, reply, and closing. Do not enter real credentials or send messages.',
      },
      {
        title: 'Handle attachments carefully',
        detail:
          'In the email simulation, attach a harmless sample, confirm its name and recipient, and rehearse locating a downloaded attachment without opening unknown files.',
      },
      {
        title: 'Protect accounts and spot suspicious links',
        detail:
          'Practise long unique passwords, multi-factor authentication, and shared-device sign-out. Identify lookalike addresses and urgent requests; pause and report suspicious messages.',
      },
    ],
    practice:
      'Use a practice folder to type and save a note, search for an official help page, and select a sample for a demonstration upload. Rehearse email and an attachment only in a mock inbox.',
    miniProject: {
      title: 'My Digital Study Folder',
      description:
        'Create two named subfolders containing an original note and an instructor-provided sample. Show a simulated email with the correct sample attachment, without sending it or using real credentials.',
    },
    completion: [
      'Point out the main computer parts and demonstrate clicking, scrolling, typing, and switching apps.',
      'Save and reopen a note from the correct folder, then rename and move a practice file.',
      'Find a relevant page and explain how its address and source were checked.',
      'Locate a downloaded sample and select the intended file for a demonstration upload.',
      'Show a complete simulated email with a subject, message, recipient, and harmless attachment.',
      'Identify a suspicious sample link and demonstrate account-safety choices without sharing a real password.',
    ],
    nextCourse: 'word',
    icon: 'Monitor',
    phase: 'Start here',
  },
  {
    id: 'word',
    title: 'Microsoft Word for Study and Teaching',
    shortTitle: 'Word',
    category: 'Office Productivity',
    description:
      'Turn plain text into clear, saved documents. Practise headings, bilingual layout, tables, source notes, PDF export, and print preparation.',
    relevance:
      'Helps madrasa learners prepare readable lesson or khutbah handouts while preserving careful attribution and review of religious references.',
    prerequisites: [
      'Computer Foundations: type text, save files, and find folders.',
    ],
    objectives: [
      'Create, edit, save, and reopen a structured Word document.',
      'Format headings, paragraphs, spacing, tables, and page numbers consistently.',
      'Set Arabic or Urdu paragraphs to right-to-left and check mixed-language layout.',
      'Add honest source notes and prepare both an editable document and a PDF.',
    ],
    lessons: [
      {
        title: 'Create and save a document',
        detail:
          'Start a document, give it a clear name, save it as an editable file in your study folder, and reopen it to confirm the location.',
      },
      {
        title: 'Write and revise paragraphs',
        detail:
          'Type an original lesson outline, select and edit sentences, and use undo. Mark missing material as a placeholder instead of inventing quotations.',
      },
      {
        title: 'Give the document structure',
        detail:
          'Apply a title and heading styles in a sensible order. Separate ideas into short paragraphs and use lists for steps or key points.',
      },
      {
        title: 'Align and space text',
        detail:
          'Choose suitable alignment, readable fonts, line spacing, and paragraph spacing. Use formatting controls rather than repeated spaces or blank lines.',
      },
      {
        title: 'Work with Arabic and Urdu',
        detail:
          'Select the appropriate keyboard and font, set paragraph direction to right-to-left, and check punctuation, numbers, and English words in mixed-language text.',
      },
      {
        title: 'Arrange information in tables',
        detail:
          'Insert a small topic-and-time table, edit cells, add rows, and adjust column widths. Keep headers clear and text readable.',
      },
      {
        title: 'Set up pages',
        detail:
          'Choose page size and margins, insert a deliberate page break, and add page numbers. Check that headings and tables do not split awkwardly.',
      },
      {
        title: 'Add source notes responsibly',
        detail:
          'Record the author, work, and page or link for checked material. Use a clearly labelled reference placeholder until a qualified teacher verifies religious quotations.',
      },
      {
        title: 'Review, export, and prepare to print',
        detail:
          'Proofread content and layout, retain the editable document, export and reopen a PDF, then check print preview, page range, and paper settings before printing.',
      },
    ],
    practice:
      'Format a short bilingual lesson summary with headings, spaced paragraphs, a small table, and a source-note placeholder. Save the editable file and inspect its PDF version.',
    miniProject: {
      title: 'Lesson or Khutbah Handout',
      description:
        'Prepare a two-page handout with an original outline, Arabic or Urdu RTL text, a topic table, page numbers, and source notes. Keep unverified religious text as labelled placeholders, never invented quotations. Deliver editable and PDF versions.',
    },
    completion: [
      'Reopen the saved editable document from the intended folder.',
      'Show a consistent title, heading hierarchy, paragraph alignment, and spacing.',
      'Demonstrate correctly directed Arabic or Urdu text and readable mixed-language punctuation.',
      'Edit a table and show page numbers on the completed pages.',
      'Distinguish verified source notes from clearly labelled reference placeholders.',
      'Open the exported PDF and explain the selected print-preview settings.',
    ],
    nextCourse: 'excel',
    icon: 'FileText',
    phase: 'Build foundations',
  },
  {
    id: 'excel',
    title: 'Microsoft Excel for Everyday Administration',
    shortTitle: 'Excel',
    category: 'Office Productivity',
    description:
      'Learn spreadsheets through simple attendance and expense examples. Enter accurate data, calculate totals, find records, and create clear charts.',
    relevance:
      'Supports organized class records and transparent study-event expenses without using real learners or sensitive institutional information during practice.',
    prerequisites: [
      'Computer Foundations: use the keyboard and save files in folders.',
    ],
    objectives: [
      'Enter and correct data in cells, rows, columns, and worksheets.',
      'Use SUM, AVERAGE, and COUNT with suitable numeric data.',
      'Format, sort, and filter complete records without separating related cells.',
      'Build a fictional attendance and expenses workbook with a labelled chart.',
    ],
    lessons: [
      {
        title: 'Explore a workbook',
        detail:
          'Identify worksheets, rows, columns, cells, and cell addresses. Enter a heading, rename a sheet, and save the workbook in your practice folder.',
      },
      {
        title: 'Enter and correct records',
        detail:
          'Use fictional learner names and sample expenses. Edit mistaken entries, clear a cell, use undo, and check that each row describes one record.',
      },
      {
        title: 'Choose consistent data types',
        detail:
          'Enter numbers, text, and dates consistently. For attendance, use 1 for present, 0 for absent, and a blank for an entry not yet recorded.',
      },
      {
        title: 'Make the sheet readable',
        detail:
          'Format headers, column widths, wrapped text, dates, and currency. Check that appearance changes do not accidentally change the underlying values.',
      },
      {
        title: 'Add totals with SUM',
        detail:
          'Start formulas with an equals sign, select the intended range, and total attendance or expenses. Correct a value and observe the total update.',
      },
      {
        title: 'Use AVERAGE and COUNT',
        detail:
          'Calculate an average expense and count numeric attendance entries. Explain that COUNT does not count text names and that blanks differ from zero. As a guided extension, compare a P/A attendance sheet using COUNTIF to count present entries.',
      },
      {
        title: 'Sort complete records',
        detail:
          'Select the whole table with its headers before sorting by name, date, or amount. Check that each learner or expense stays with its related values.',
      },
      {
        title: 'Filter to answer questions',
        detail:
          'Filter a date or expense category, inspect matching rows, and clear the filter. Explain that hidden rows remain and ordinary SUM still includes them.',
      },
      {
        title: 'Track simple expenses',
        detail:
          'Record fictional items, categories, dates, and amounts with consistent units. Compare planned and actual totals and check them against the sample records.',
      },
      {
        title: 'Create and check a chart',
        detail:
          'Select a small summary and insert a column chart. Add a meaningful title and labels, then compare the displayed values with the source cells.',
      },
    ],
    practice:
      'Correct a workbook containing fictional attendance and expenses. Apply formatting, calculate SUM, AVERAGE, and COUNT, sort whole records, filter one category, and chart a checked summary.',
    miniProject: {
      title: 'Fictional Class Records Workbook',
      description:
        'Create attendance for six fictional learners over five days and a separate sample expenses sheet. Include checked formulas, a useful filter, and a labelled chart; do not enter real learner or financial data.',
    },
    completion: [
      'Open the saved workbook and explain a cell address and worksheet name.',
      'Correct a deliberate data error and show the affected calculation update.',
      'Show correct SUM, AVERAGE, and COUNT results and explain their ranges.',
      'Sort without breaking row relationships, then apply and clear a filter.',
      'Show readable attendance and expense sheets containing only fictional records.',
      'Match chart labels and values to the underlying summary.',
    ],
    nextCourse: 'powerpoint',
    icon: 'Sheet',
    phase: 'Build foundations',
  },
  {
    id: 'powerpoint',
    title: 'Microsoft PowerPoint for Clear Lessons',
    shortTitle: 'PowerPoint',
    category: 'Office Productivity',
    description:
      'Plan, build, and present a short lesson with readable slides, useful visuals, and speaker notes rather than crowded screens.',
    relevance:
      'Helps learners share study and teaching ideas clearly while keeping spoken explanation, accurate references, and audience understanding central.',
    prerequisites: [
      'Computer Foundations: manage files and open apps.',
      'Word basics: organize ideas into headings and short paragraphs.',
    ],
    objectives: [
      'Plan a five-slide sequence around one learning goal.',
      'Design readable slides with relevant, permitted visuals.',
      'Use speaker notes and rehearse a short explanation.',
      'Save the presentation and check an exported PDF.',
    ],
    lessons: [
      {
        title: 'Choose an audience and goal',
        detail:
          'Identify who will learn, what they already know, and one thing they should be able to do after the presentation.',
      },
      {
        title: 'Plan five slides before designing',
        detail:
          'Sketch a title-and-goal slide, three teaching-point slides, and a recap-and-practice slide. Keep one clear purpose for each slide.',
      },
      {
        title: 'Create and save the deck',
        detail:
          'Choose a simple theme, use built-in layouts, arrange the five slides, and save the editable presentation with a clear file name.',
      },
      {
        title: 'Keep text readable',
        detail:
          'Use short phrases, large text, strong contrast, and generous spacing. Check the slides from a distance and avoid reading long paragraphs aloud.',
      },
      {
        title: 'Add visuals with a purpose',
        detail:
          'Use an original diagram or appropriately licensed image that supports the point. Add labels, alternative text, and attribution where required.',
      },
      {
        title: 'Write speaker notes',
        detail:
          'Add explanation cues, a question, and a timing reminder beneath each slide. Use verified references or labelled placeholders, never invented religious quotations.',
      },
      {
        title: 'Check accessibility and movement',
        detail:
          'Review reading order, contrast, and any media captions. Use restrained transitions only when helpful, keeping attention on the lesson.',
      },
      {
        title: 'Rehearse presenting',
        detail:
          'Practise slide navigation, presenter view, speaking pace, and a short audience activity. Time the lesson and revise unclear or crowded slides.',
      },
      {
        title: 'Export and review',
        detail:
          'Save the final editable deck and export slides as a PDF. Check order, readability, references, and whether private notes were unintentionally included.',
      },
    ],
    practice:
      'Turn a brief digital study-habits outline into five slides, add speaker notes and one useful visual, then rehearse with a peer and revise one unclear point.',
    miniProject: {
      title: 'Five-Slide Study Skills Lesson',
      description:
        'Create exactly five slides on one practical study skill, with a clear goal, three teaching points, and a recap activity. Include speaker notes, a permitted visual, and editable and PDF versions.',
    },
    completion: [
      'Show a five-slide plan that matches one stated learning goal.',
      'Display readable slides with consistent layouts and a relevant, attributed visual.',
      'Show speaker notes that add explanation rather than duplicate slide text.',
      'Present the sequence, navigate confidently, and invite a short learner response.',
      'Open the exported PDF and confirm slide order and readability.',
    ],
    nextCourse: 'english',
    icon: 'Presentation',
    phase: 'Build foundations',
  },
  {
    id: 'english',
    title: 'Practical English for Learning and Communication',
    shortTitle: 'English',
    category: 'Languages and Communication',
    description:
      'Build useful English for introductions, computer screens, classroom instructions, polite messages, and short lesson explanations, one manageable task at a time.',
    relevance:
      "Adds another communication tool to learners' existing languages and scholarship, supporting international learners and professional conversations without replacing local languages.",
    prerequisites: [
      'No previous English course is required; a short supportive placement activity sets your starting point.',
      'Basic computer use or guided support for reading screens and typing.',
    ],
    objectives: [
      'Introduce yourself and ask for clarification in simple English.',
      'Recognize common computer terms, interface labels, and classroom instructions.',
      'Write a polite practice email with a clear request.',
      'Explain a familiar lesson and clarify a simple learner or client request.',
    ],
    lessons: [
      {
        title: 'Find a comfortable starting point',
        detail:
          'Try a short reading, listening, and speaking activity without ranking personal worth. Choose practical phrases to learn at your current level.',
      },
      {
        title: 'Introduce yourself',
        detail:
          'Practise a greeting, chosen name, study interests, and learning goal. Ask a partner simple questions without requesting private personal information.',
      },
      {
        title: 'Learn computer vocabulary',
        detail:
          'Match words such as file, folder, save, browser, upload, download, and attachment to visible actions, then use them in short sentences.',
      },
      {
        title: 'Read interface labels',
        detail:
          'Read menus, buttons, help text, and common warnings. Distinguish Save from Delete and ask for help before accepting an unfamiliar prompt.',
      },
      {
        title: 'Follow classroom instructions',
        detail:
          'Practise instructions such as open, read, compare, and share. Rehearse asking someone to repeat, slow down, or explain a word.',
      },
      {
        title: 'Listen and speak clearly',
        detail:
          'Listen to short, level-appropriate recordings, identify key information, and repeat useful phrases. Focus on understandable speech rather than copying an accent.',
      },
      {
        title: 'Write polite emails',
        detail:
          'Draft a subject, greeting, short request, attachment note, and closing for a fictional recipient. Check tone and meaning without sending a real email.',
      },
      {
        title: 'Explain a familiar lesson',
        detail:
          'Use a beginning, two or three points, and a summary to explain a familiar skill. Ask a simple question to check understanding.',
      },
      {
        title: 'Support international learners',
        detail:
          'Use plain language, check unfamiliar terms, and confirm times and time zones. Ask about learner needs rather than assuming a shared background.',
      },
      {
        title: 'Clarify a client request',
        detail:
          'Role-play asking what is needed, in which format, by what date, and with how many revisions. Summarize the agreement in simple written English.',
      },
    ],
    practice:
      'Introduce yourself, follow a short computer instruction, read a sample interface, and draft a polite email. Explain a familiar skill to a partner and ask one clarification question.',
    miniProject: {
      title: 'English Communication Kit',
      description:
        'Prepare a short introduction, a personal computer-vocabulary sheet, a fictional email, and a two-minute lesson explanation. Add a written summary of a role-played learner or client request.',
    },
    completion: [
      'Give a short introduction and ask a relevant follow-up question.',
      'Match common interface words to the correct computer actions.',
      'Follow classroom instructions and ask politely when clarification is needed.',
      'Show a readable email draft with a clear subject and request.',
      "Explain a familiar skill and check a listener's understanding.",
      "Confirm a fictional request's deliverable, deadline, and revision expectations.",
    ],
    nextCourse: 'arabic',
    icon: 'Languages',
    phase: 'Build foundations',
  },
  {
    id: 'arabic',
    title: 'Modern Arabic Communication and Digital Writing',
    shortTitle: 'Arabic',
    category: 'Languages and Communication',
    description:
      'Practise contemporary Arabic speaking, listening, digital vocabulary, and typed documents at a level chosen through a supportive placement activity.',
    relevance:
      'Respects existing classical Arabic study as a strength. Modern communication and digital writing are additional contexts, not a judgment on religious knowledge or scholarship.',
    prerequisites: [
      'A placement conversation identifies existing reading, classical Arabic, speaking, and listening strengths; no uniform starting level is assumed.',
      'Computer Foundations, or support with keyboard layouts and saving documents.',
    ],
    objectives: [
      'Use contemporary Arabic introductions and everyday clarification phrases.',
      'Understand key information in short, level-appropriate spoken examples.',
      'Use digital vocabulary and type readable right-to-left documents.',
      'Adapt a short description or explanation for its intended audience.',
    ],
    lessons: [
      {
        title: 'Recognize strengths and choose a level',
        detail:
          'Discuss classical study and try a contemporary note, conversation, and listening sample. Choose suitable activities without assuming that all learners share the same background.',
      },
      {
        title: 'Practise contemporary introductions',
        detail:
          'Use instructor-modelled Modern Standard Arabic for greetings, study interests, and simple questions. Add pronunciation or transliteration support when useful.',
      },
      {
        title: 'Listen for useful information',
        detail:
          'Listen to short approved recordings about a class or schedule. Identify the main idea, times, and instructions, repeating sections at a comfortable pace.',
      },
      {
        title: 'Speak and ask for clarification',
        detail:
          'Role-play a classroom conversation, ask someone to repeat or explain, and work on intelligibility. Respect regional accents and different levels of speaking confidence.',
      },
      {
        title: 'Learn digital vocabulary',
        detail:
          'Connect contemporary Arabic terms for files, documents, settings, login, upload, and download to real interface examples, with instructor checks for meaning.',
      },
      {
        title: 'Type Arabic accurately',
        detail:
          'Select an Arabic keyboard, practise connected letters and punctuation, and set right-to-left paragraph direction. Check numbers and embedded English names carefully.',
      },
      {
        title: 'Prepare a short document',
        detail:
          'Type a title, paragraphs, and a simple schedule table. Save the editable document and inspect a PDF for correct letter display and reading order.',
      },
      {
        title: 'Write contemporary descriptions',
        detail:
          "Describe a fictional course, learning space, or timetable in clear language. Revise vocabulary and sentence length for the reader's level.",
      },
      {
        title: 'Explain for different audiences',
        detail:
          'Explain a familiar idea to a beginner and then a more experienced listener. Check comprehension and have religious references reviewed by a qualified teacher.',
      },
      {
        title: 'Compose courteous messages',
        detail:
          'Draft an enquiry, appointment request, or class announcement using fictional details. Check the greeting, purpose, date, and closing before any approved sharing.',
      },
    ],
    practice:
      'Listen to a short class announcement, role-play a reply, type a brief RTL course description, and adapt one explanation for a beginner using instructor feedback.',
    miniProject: {
      title: 'Bilingual Teacher Profile or Lesson Outline',
      description:
        'Plan a fictional teacher profile or lesson outline with parallel English and Arabic sections. Prepare a typed introduction, a courteous message, and a short spoken explanation suited to the placement level. Retain placeholders for religious references until qualified teacher review. The project purpose and planning instructions are shown in English in this prototype.',
    },
    completion: [
      'Complete an introduction and a clarification exchange at the agreed placement level.',
      'Identify the main idea and key details from a short listening sample.',
      'Explain common digital terms using matching interface actions.',
      'Show readable RTL typing, a saved document, and a checked PDF.',
      'Present an audience-appropriate description and revise it using feedback.',
    ],
    nextCourse: 'web-development',
    icon: 'MessageCircle',
    phase: 'Build foundations',
  },
  {
    id: 'web-development',
    title: 'Web Development from Pages to a Responsive Website',
    shortTitle: 'Web Development',
    category: 'Technology and Content',
    description:
      'Build a small website with HTML, CSS, and beginner JavaScript. Learn what a static page can do and when a real application needs a backend.',
    relevance:
      'Offers a way to present educational programs and learning resources clearly, with accessible bilingual design and responsible handling of institutional information.',
    prerequisites: [
      'Computer Foundations: organize files and use a browser.',
      'Basic reading of English interface labels, with a glossary or support as needed.',
    ],
    objectives: [
      'Distinguish linked website pages from applications with stored data and accounts.',
      'Build semantic HTML pages, style them with CSS, and adapt them to mobile screens.',
      'Add a small JavaScript interaction and an explicitly non-submitting demonstration form.',
      'Check accessibility and explain domains, hosting, and backend responsibilities.',
    ],
    lessons: [
      {
        title: 'Understand websites and applications',
        detail:
          'Compare informational pages with interactive applications. Identify the browser frontend, server backend, and database, and discuss what happens when a page reloads.',
      },
      {
        title: 'Plan pages and links',
        detail:
          'Sketch Home, About, and Contact pages for a fictional program. Map navigation, choose the audience, and write original content with clear reference placeholders.',
      },
      {
        title: 'Set up project files',
        detail:
          'Create HTML pages, a shared stylesheet, a script file, and an assets folder. Open a local preview and practise saving and refreshing changes.',
      },
      {
        title: 'Write meaningful HTML',
        detail:
          'Use document structure, headings, paragraphs, lists, navigation, links, and images. Give each page a useful title and keep heading levels logical.',
      },
      {
        title: 'Style with CSS',
        detail:
          'Connect a stylesheet and practise selectors, color, typography, spacing, borders, and the box model. Build a simple layout rather than positioning everything manually.',
      },
      {
        title: 'Make the layout responsive',
        detail:
          'Use flexible widths, responsive images, and a small-screen layout. Test narrow and wide previews for readable text, usable navigation, and unwanted horizontal scrolling.',
      },
      {
        title: 'Build in accessibility',
        detail:
          'Check keyboard navigation, visible focus, contrast, image alternatives, and form labels. Set language and text direction appropriately for Arabic or Urdu content.',
      },
      {
        title: 'Add beginner JavaScript',
        detail:
          'Use variables, functions, and events for a small interaction such as showing extra information. Observe temporary page state and provide a usable default view.',
      },
      {
        title: 'Create a demonstration form',
        detail:
          'Add labelled fields, suitable input types, and helpful validation messages. Prevent submission and clearly state that the demo neither sends nor stores entered information.',
      },
      {
        title: 'Know when a backend is required',
        detail:
          'Explain that real submissions, persistent data, accounts, and secure login require a backend or approved service, server-side validation, authorization, and privacy controls, not frontend code alone.',
      },
      {
        title: 'Test the complete website',
        detail:
          'Check every page and link, image loading, keyboard use, small-screen behavior, and demo-form messages. Use fictional inputs and fix browser-console errors.',
      },
      {
        title: 'Understand domains and hosting',
        detail:
          'Explain domain names, DNS, hosting, and HTTPS. Compare static hosting with backend hosting; use an instructor-approved preview without requiring a purchase or public launch.',
      },
      {
        title: 'Optional next step: React',
        detail:
          'After HTML, CSS, and JavaScript foundations, explore how React components can organize interfaces. React is not required for this project and does not replace backend security.',
      },
    ],
    practice:
      'Build and link three local pages, share their CSS, add one JavaScript interaction, and test on narrow and wide screens. Keep the contact form clearly labelled as a non-submitting demo.',
    miniProject: {
      title: 'Fictional Educational Program Website',
      description:
        'Create a responsive three-page site with accessible navigation, original program information, a small interaction, and a demo contact form that sends and stores nothing. Use no real learner data or accounts, and document what a production backend would need.',
    },
    completion: [
      'Navigate all three pages without broken internal links or missing assets.',
      'Show readable narrow and wide layouts with usable keyboard focus and labelled controls.',
      'Explain the HTML structure, CSS layout, and one working JavaScript event.',
      'Demonstrate that the form is labelled as a demo and does not send or persist data.',
      'Describe backend requirements for real submissions, stored records, and account access.',
      'Explain the difference between a domain, hosting, and an optional React frontend.',
    ],
    nextCourse: 'professional-practice',
    icon: 'Code',
    phase: 'Specialize',
  },
  {
    id: 'content-creation',
    title: 'Content Creation for Clear Educational Messages',
    shortTitle: 'Content Creation',
    category: 'Technology and Content',
    description:
      'Plan and produce a short educational piece with a useful script, readable graphics, clear sound, simple video editing, and checked captions.',
    relevance:
      'Helps communicate learning responsibly while respecting copyright, participant privacy, and the need to verify religious references with qualified teachers.',
    prerequisites: [
      'Computer Foundations: manage files and use common apps.',
      'Ability to outline a short explanation in a language comfortable for the intended audience.',
    ],
    objectives: [
      'Choose an audience, one topic, and a clear learning purpose.',
      'Write a short script and create legible, appropriately licensed graphics.',
      'Record and edit understandable audio or video with accurate captions.',
      'Check sources, permissions, and privacy before approved sharing.',
    ],
    lessons: [
      {
        title: 'Choose an audience and topic',
        detail:
          'Identify the learner group, preferred language, and one useful takeaway. Narrow a broad subject to a short explanation that fits the audience.',
      },
      {
        title: 'Research and verify references',
        detail:
          'Collect trustworthy sources and record where claims come from. Have religious quotations and interpretations checked by a qualified teacher; use placeholders until verified.',
      },
      {
        title: 'Write a short script',
        detail:
          'Plan an opening, a clear explanation, an example, and a recap. Read the script aloud and remove unsupported claims or unnecessary detail.',
      },
      {
        title: 'Design readable graphics',
        detail:
          'Use a simple layout, large text, strong contrast, and a relevant original or permitted image. Check spelling and mixed-language text direction.',
      },
      {
        title: 'Record clear audio',
        detail:
          'Choose a quiet space, position the microphone, and record a short test. Check volume, background noise, and speaking pace before recording the full piece.',
      },
      {
        title: 'Capture simple video',
        detail:
          'Use steady framing, adequate light, and short planned clips. Obtain permission for participants and avoid showing identifiable learners or private documents in practice.',
      },
      {
        title: 'Edit for understanding',
        detail:
          'Arrange clips, trim mistakes, balance audio, and add useful titles. Save the editable project separately from the exported video and avoid distracting effects.',
      },
      {
        title: 'Add and review captions',
        detail:
          'Create timed captions and manually check wording, names, Arabic or Urdu text, and reading speed. Do not rely on automatic captions without review.',
      },
      {
        title: 'Respect copyright and consent',
        detail:
          'Check licenses for images, fonts, audio, and clips; record required attribution. Use your own material or permitted assets and follow institutional sharing rules.',
      },
      {
        title: 'Review and export responsibly',
        detail:
          'Check facts, qualified review of religious references, captions, sound, permissions, and privacy. Export a suitable file and obtain required approval before publishing.',
      },
    ],
    practice:
      'Script and record a 30- to 60-second digital study tip, add one graphic and reviewed captions, then ask a peer to identify the main point and any unclear sound or wording.',
    miniProject: {
      title: 'One-Minute Learning Pack',
      description:
        'Produce a short study-skills video with its script, a matching graphic, reviewed captions, and a source-and-permission list. Use original non-sensitive material; any religious references must be verified before sharing.',
    },
    completion: [
      'State the intended audience and one learning takeaway.',
      'Show a script whose claims are sourced or clearly marked for review.',
      'Play an exported video with understandable audio, readable graphics, and accurate captions.',
      'Provide licenses, attribution, and participant permission where needed.',
      'Show a completed factual, religious-reference, and privacy review before approved sharing.',
    ],
    nextCourse: 'digital-marketing',
    icon: 'Video',
    phase: 'Specialize',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing for Useful Educational Outreach',
    shortTitle: 'Digital Marketing',
    category: 'Technology and Content',
    description:
      'Learn how to help suitable learners discover a useful course or service through honest messages, a simple content plan, and basic measurement. Results are not guaranteed.',
    relevance:
      'Supports respectful outreach for educational programs without spam, exaggerated claims, or treating religious trust as a marketing shortcut.',
    prerequisites: [
      'Computer Foundations: browse safely and organize files.',
      'Content Creation basics, or an existing original educational sample to describe.',
    ],
    objectives: [
      'Explain marketing in plain language and define an audience and honest offer.',
      'Plan useful content for suitable social and community channels.',
      'Apply beginner SEO and write a clear, non-pressuring call to action.',
      'Distinguish organic from paid outreach and interpret simple example metrics.',
    ],
    lessons: [
      {
        title: 'Understand marketing plainly',
        detail:
          'Think of marketing as helping appropriate people discover something useful. Distinguish informing, inviting, and supporting from pressure, hype, or promises of guaranteed results.',
      },
      {
        title: 'Describe the audience',
        detail:
          'Create a fictional learner profile using goals, language, access needs, and available time. Avoid collecting sensitive personal information or making assumptions about a community.',
      },
      {
        title: 'Make an honest offer',
        detail:
          'Explain what the course or service includes, who it suits, prerequisites, schedule, and any cost. Avoid unsupported credentials, earnings claims, or guaranteed outcomes.',
      },
      {
        title: 'Build a simple content plan',
        detail:
          'Choose useful topics and plan posts with a purpose, format, channel, date, and responsible reviewer. Balance helpful learning material with invitations.',
      },
      {
        title: 'Choose social channels thoughtfully',
        detail:
          'Compare where the intended audience already learns. Prepare a clear profile and accessible sample posts without buying followers or posting in unsuitable groups.',
      },
      {
        title: 'Learn basic SEO',
        detail:
          'Write descriptive page titles, headings, summaries, and useful text using natural audience vocabulary. Prioritize readable, relevant information rather than keyword stuffing or ranking promises.',
      },
      {
        title: 'Participate without spam',
        detail:
          'Ask moderators before sharing, answer genuine questions, and respect consent and opt-outs. Do not scrape contacts, mass-message learners, or repeatedly post unwanted promotions.',
      },
      {
        title: 'Write a clear call to action',
        detail:
          'Invite one transparent next step, such as reading course details or making an approved enquiry. Explain what follows and label demonstration sign-up links as non-operational.',
      },
      {
        title: 'Compare organic and paid outreach',
        detail:
          'Explain that organic work needs time while paid promotion spends a budget. Discuss permissions, cost limits, and uncertainty using examples; no live advertising is required.',
      },
      {
        title: 'Measure and improve honestly',
        detail:
          'Use fictional reach, clicks, enquiries, and attendance to calculate simple rates. Distinguish attention from learning or enrolment and suggest a cautious improvement, not a guaranteed result.',
      },
    ],
    practice:
      'Describe a fictional beginner workshop, draft a helpful post and non-pressuring invitation, and compare example outreach results. Use a paper plan rather than launching campaigns or collecting contacts.',
    miniProject: {
      title: 'Two-Week Educational Outreach Plan',
      description:
        'Plan outreach for a fictional computer workshop with an audience profile, honest offer, six scheduled posts, one SEO page outline, clear calls to action, and a fictional measurement table. Explain organic and optional paid choices without promising enrolments or earnings.',
    },
    completion: [
      'Explain the audience, their need, and what the offer does and does not include.',
      'Show a two-week content plan suited to the chosen channels.',
      'Present a readable SEO outline and a transparent call to action.',
      'Explain community permission, consent, and opt-out choices that prevent spam.',
      'Compare organic and paid outreach and interpret sample metrics without guaranteeing results.',
    ],
    nextCourse: 'professional-practice',
    icon: 'Megaphone',
    phase: 'Specialize',
  },
  {
    id: 'online-teaching',
    title: 'Online Teaching with Practice, Feedback, and Care',
    shortTitle: 'Online Teaching',
    category: 'Teaching and Professional Practice',
    description:
      'Plan and rehearse a short online lesson with clear objectives, screen sharing, learner practice, feedback, and safe communication.',
    relevance:
      'Builds on teaching and study experience while making online delivery accessible, respectful, and consistent with institutional privacy and safeguarding responsibilities.',
    prerequisites: [
      'Computer Foundations: open resources, manage files, and use audio controls.',
      'A familiar topic you can explain and suitable materials you have permission to use.',
    ],
    objectives: [
      'Define a learner group and observable lesson objectives.',
      'Plan demonstration, guided practice, independent work, and feedback.',
      'Rehearse screen sharing and clear scheduling and communication.',
      'Apply moderation, privacy, and institution-approved safeguarding, especially for minors.',
    ],
    lessons: [
      {
        title: 'Know the learner group',
        detail:
          'Identify age range, language, prior knowledge, device access, and support needs. Distinguish adult learning plans from sessions involving minors and institutional safeguards.',
      },
      {
        title: 'Set observable objectives',
        detail:
          'Choose one or two things learners will demonstrate, such as saving a file or explaining a concept. Decide what evidence will show understanding.',
      },
      {
        title: 'Sequence a short lesson',
        detail:
          'Plan a welcome, explanation, demonstration, guided practice, independent attempt, and recap. Leave time for questions and avoid overloading the session.',
      },
      {
        title: 'Prepare approved tools and resources',
        detail:
          'Use institution-approved meeting tools and fictional participant details for rehearsal. Prepare accessible, low-bandwidth resources and have religious references checked before teaching.',
      },
      {
        title: 'Share the screen safely',
        detail:
          'Check microphone and display settings, close private messages, and share only the needed window. Narrate actions slowly and confirm learners can see and hear.',
      },
      {
        title: 'Make room for learner practice',
        detail:
          'Pause after modelling and ask learners to try the task. Provide a small file or written alternative for low bandwidth and allow different working speeds.',
      },
      {
        title: 'Give specific feedback',
        detail:
          'Check work against the objective, name a successful step, and suggest one next improvement. Avoid exposing individual mistakes or personal records to the whole group.',
      },
      {
        title: 'Schedule and communicate clearly',
        detail:
          'State date, time zone, duration, preparation, and an approved help channel. Set respectful response hours and send reminders through agreed institutional routes.',
      },
      {
        title: 'Moderate the learning space',
        detail:
          'Explain speaking turns, chat rules, and respectful conduct. Practise muting disruptions and reporting concerns through policy rather than handling safeguarding issues privately.',
      },
      {
        title: 'Protect privacy and safeguard minors',
        detail:
          'Follow institutional approval, guardian-consent rules, supervised communication, and recording policy. Never request private contact details or arrange unsupervised contact with minors during practice.',
      },
      {
        title: 'Rehearse, review, and follow up',
        detail:
          'Teach a short session to peers using fictional learner details. Gather feedback, close with an understanding check, and share only approved follow-up resources.',
      },
    ],
    practice:
      'Rehearse a ten-minute lesson with adult peers: share one window, demonstrate a task, pause for practice, give feedback, and review a fictional moderation and safeguarding scenario.',
    miniProject: {
      title: 'Safe Fifteen-Minute Online Lesson',
      description:
        'Prepare and rehearse a lesson with a learner profile, objectives, timed plan, accessible resources, practice task, feedback checklist, and communication rules. For a minors-focused plan, use only an institution-approved simulated scenario, never unsupervised learner contact.',
    },
    completion: [
      'Show a learner profile, observable objectives, and a timed lesson sequence.',
      'Demonstrate screen sharing without exposing unrelated windows or personal information.',
      'Give peers a practical task and feedback linked to its objective.',
      'Provide a schedule with a time zone and approved communication expectations.',
      'Respond to a moderation scenario and explain the institutional safeguarding and recording rules.',
      'Revise the lesson after a peer rehearsal and understanding check.',
    ],
    nextCourse: 'professional-practice',
    icon: 'GraduationCap',
    phase: 'Specialize',
  },
  {
    id: 'professional-practice',
    title: 'Professional Practice and a Responsible Portfolio',
    shortTitle: 'Professional Practice',
    category: 'Teaching and Professional Practice',
    description:
      'Present your work honestly, agree a clear scope, plan deadlines and revisions, and assess opportunities carefully. Completing this course does not promise work or earnings.',
    relevance:
      'Helps learners connect their educational strengths with dependable service, institutional projects, or suitable professional opportunities while respecting study commitments and ethical boundaries.',
    prerequisites: [
      'Complete at least one practical course project that you can explain and have permission to show.',
      'Computer Foundations: save, name, and share files safely.',
    ],
    objectives: [
      'Build a small portfolio of original, accurately labelled work.',
      'Agree scope, deliverables, deadlines, and revision limits in writing.',
      'Communicate progress and hand over organized, permitted files.',
      'Recognize common opportunity scams without assuming guaranteed income.',
    ],
    lessons: [
      {
        title: 'Identify a realistic service',
        detail:
          'Review your demonstrated skills and choose a small task you can deliver reliably. Respect study time and avoid claiming qualifications or expertise you have not earned.',
      },
      {
        title: 'Select portfolio evidence',
        detail:
          'Choose two or three original samples and explain their purpose and your contribution. Label fictional demonstrations honestly and remove private information or unapproved institutional branding.',
      },
      {
        title: 'Assess suitable opportunities',
        detail:
          'Compare institutional projects, verified referrals, and public opportunities against your skills and availability. Check who is requesting the work and whether the task is appropriate.',
      },
      {
        title: 'Write a clear scope',
        detail:
          'Ask about audience, purpose, required content, file formats, and exclusions. Define the deliverables and who approves factual or religious references before work starts.',
      },
      {
        title: 'Plan deadlines and milestones',
        detail:
          'Break the task into a draft, feedback point, and final handover. Agree realistic dates, dependencies, and what happens if required material arrives late.',
      },
      {
        title: 'Record the agreement',
        detail:
          'Write down scope, delivery dates, approval responsibilities, and payment terms where relevant. Confirm mutual understanding without making unsupported promises about results.',
      },
      {
        title: 'Set revision boundaries',
        detail:
          'Agree the number of revision rounds, feedback format, and response window. Distinguish a correction from new scope and confirm changes before adding work.',
      },
      {
        title: 'Communicate progress respectfully',
        detail:
          'Send concise updates, ask early about blockers, and summarize feedback. Keep versions organized and communicate delays honestly rather than disappearing or overpromising.',
      },
      {
        title: 'Hand over work safely',
        detail:
          'Check names, formats, links, permissions, and source notes. Include simple usage guidance, protect confidential files, and avoid asking clients to share passwords or one-time codes.',
      },
      {
        title: 'Spot scams and pressure',
        detail:
          'Question advance unlock fees, guaranteed earnings, suspicious attachments, and requests for credentials or remote access. Verify independently and decline unsafe or deceptive work.',
      },
      {
        title: 'Reflect and choose a next skill',
        detail:
          'Compare the final work with the agreed scope, record feedback, and identify one improvement. Consider optional AI literacy only as support for skills you can already review.',
      },
    ],
    practice:
      'Respond to a fictional project request with questions, a one-page scope, milestones, and revision limits. Review a sample scam message, then rehearse a progress update and safe file handover.',
    miniProject: {
      title: 'Portfolio and Project Agreement Pack',
      description:
        'Assemble two original or clearly labelled demo samples with brief explanations. Add a fictional client brief, deliverables, exclusions, deadlines, revision terms, progress message, and handover checklist, without presenting practice as paid client work.',
    },
    completion: [
      'Present two permitted portfolio samples and explain your actual contribution.',
      'Show a written scope with deliverables, exclusions, and approval responsibilities.',
      'Provide realistic milestones and an explicit revision agreement.',
      'Demonstrate a clear update and organized, privacy-checked handover.',
      'Identify scam warning signs and explain an independent verification step.',
      'Compare completed work against the brief without claiming guaranteed work or earnings.',
    ],
    nextCourse: 'ai-literacy',
    icon: 'Briefcase',
    phase: 'Apply your skills',
  },
  {
    id: 'ai-literacy',
    title: 'Optional AI Literacy with Human Review',
    shortTitle: 'AI Literacy',
    category: 'Technology and Content',
    description:
      'Explore AI as an optional aid for drafts, language practice, and brainstorming. Learn to check claims and sources, protect privacy, and keep human judgment in charge.',
    relevance:
      'Supports careful educational preparation without replacing study, qualified teachers, or religious authority. Religious content always requires qualified review, not trust in generated answers.',
    prerequisites: [
      'Computer Foundations: recognize suspicious links and protect personal information.',
      'Complete a non-AI practical course so you can judge the quality of a draft; no paid AI account is required.',
    ],
    objectives: [
      'Choose low-risk drafting, language, and brainstorming tasks suited to AI support.',
      'Use fictional or anonymized inputs and exclude confidential information.',
      'Check factual claims and open the original sources rather than trusting generated citations.',
      'Revise outputs yourself and require qualified review for any religious content.',
    ],
    lessons: [
      {
        title: 'Understand what AI does and does not do',
        detail:
          'Learn that generated text can sound confident while being incorrect or fabricated. AI is not a religious authority and cannot replace subject expertise or responsibility.',
      },
      {
        title: 'Choose a low-risk task',
        detail:
          'Compare drafting a polite message, practising language, and brainstorming lesson titles. Keep sensitive decisions and religious rulings outside these practice tasks.',
      },
      {
        title: 'Protect information before prompting',
        detail:
          'Use fictional examples and remove names, contacts, learner records, passwords, and private institutional material. Follow institutional policy before using any approved external tool.',
      },
      {
        title: 'Give a clear instruction',
        detail:
          'Specify the audience, task, language level, length, and desired format. Ask for uncertainty to be marked, while remembering that such instructions do not guarantee accuracy.',
      },
      {
        title: 'Review a draft',
        detail:
          'Work through a sample email or handout draft, correct its tone and meaning, and remove invented facts. Keep responsibility for the final text with the human author.',
      },
      {
        title: 'Use language support carefully',
        detail:
          'Compare a generated translation or explanation with trusted language resources and instructor feedback. Check context and specialist terms; religious wording requires qualified review.',
      },
      {
        title: 'Brainstorm without outsourcing judgment',
        detail:
          'Generate or inspect several topic and outline ideas, select those that fit the objective, and discard unsuitable suggestions. Turn the chosen idea into your own plan.',
      },
      {
        title: 'Check claims and original sources',
        detail:
          'List factual claims, locate genuine sources, open them, and verify author, wording, and context. Treat generated references as unverified leads and remove unsupported claims.',
      },
      {
        title: 'Keep religious review with qualified people',
        detail:
          'Do not use AI to issue fatwas or settle religious rulings. Keep religious quotations and interpretations as placeholders until verified and approved by a qualified teacher.',
      },
      {
        title: 'Finish with human accountability',
        detail:
          'Check accuracy, privacy, permissions, and accessibility, and disclose AI assistance when required. Work manually; this course includes no AI integration, account connection, or automated publishing.',
      },
    ],
    practice:
      'Use an instructor-provided sample AI draft, or an institution-approved external tool with fictional input. Improve one message, compare a language suggestion, and record claim checks; no live AI service is required.',
    miniProject: {
      title: 'Human-Reviewed Draft Pack',
      description:
        'Prepare a revised practice email, a checked language example, and a selected lesson outline, with an edit-and-verification log. Exclude private information and leave any religious material pending qualified review. No software integration is part of the project.',
    },
    completion: [
      'Explain a suitable AI-support task and a task that requires human expertise instead.',
      'Show a prompt or sample exercise containing no private or identifying information.',
      'Demonstrate meaningful human corrections to a generated draft or language suggestion.',
      'Provide original-source checks and remove unsupported claims or fabricated citations.',
      'Identify religious material requiring qualified review and keep it out of publication until approved.',
      'Present a manually reviewed final pack without connecting accounts or integrating an AI service.',
    ],
    nextCourse: 'professional-practice',
    icon: 'Sparkles',
    phase: 'Optional later',
    optional: true,
  },
];
