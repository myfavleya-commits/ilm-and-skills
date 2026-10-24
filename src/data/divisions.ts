export type DivisionCategory = {
  id: string;
  label: string;
  icon: string;
  courses: string[];
};

export type LearningDivision = {
  id: 'pakistan' | 'international';
  label: string;
  title: string;
  urdu: string;
  icon: string;
  audience: string;
  purpose: string;
  outcome: string;
  steps: string[];
  categories: DivisionCategory[];
  detailLink: string;
  detailLabel: string;
};

export const learningDivisions: LearningDivision[] = [
  {
    id: 'pakistan',
    label: 'Division one',
    title: 'Pakistan',
    urdu: 'دینی تعلیم کے ساتھ جدید مہارتیں',
    icon: 'Laptop',
    audience: 'Madrasa students and graduates in Pakistan',
    purpose:
      'Additional modern, practical, digital, and professional skills that build on an existing Islamic educational foundation.',
    outcome:
      'Digital confidence, practical skills, stronger communication, and readiness for further educational or professional opportunities.',
    steps: [
      'Madrasa students',
      'Modern skills education',
      'Digital & professional training',
      'Practical projects',
      'Future opportunities',
    ],
    categories: [
      {
        id: 'languages',
        label: 'Languages & communication',
        icon: 'Languages',
        courses: ['Languages and communication', 'Shorthand writing'],
      },
      {
        id: 'technology',
        label: 'Technology & digital foundations',
        icon: 'Monitor',
        courses: [
          'Computer science fundamentals',
          'Web development',
          'Artificial intelligence literacy',
          'Microsoft Word',
          'Microsoft Office suite',
        ],
      },
      {
        id: 'creative',
        label: 'Creative & enterprise skills',
        icon: 'Sparkles',
        courses: [
          'E-commerce',
          'Social media skills',
          'Graphic designing',
          'Video editing',
        ],
      },
      {
        id: 'professional',
        label: 'Professional connection',
        icon: 'Handshake',
        courses: ['Professional networking and connection building'],
      },
    ],
    detailLink: '/roadmap',
    detailLabel: 'Explore the detailed skills roadmap',
  },
  {
    id: 'international',
    label: 'Division two',
    title: 'International',
    urdu: 'دنیا بھر کے مسلمانوں کے لیے اسلامی تعلیم',
    icon: 'Globe2',
    audience: 'Muslim communities living outside Pakistan',
    purpose:
      'Accessible opportunities for parents, adults, university students, and other Muslim learners who wish to deepen practical religious understanding.',
    outcome:
      'Quranic literacy, Islamic understanding, family education, and practical application of Islamic teachings.',
    steps: [
      'Muslim communities',
      'Quranic education',
      'Arabic & Islamic studies',
      'Practical Islamic learning',
      'Knowledge & community development',
    ],
    categories: [
      {
        id: 'quran',
        label: 'Quranic studies',
        icon: 'BookOpen',
        courses: [
          'Quran reading (Nazra)',
          'Tajweed',
          'Quran memorization (Hifz)',
          'Quran translation',
          'Tafsir',
        ],
      },
      {
        id: 'arabic',
        label: 'Arabic & Islamic studies',
        icon: 'Languages',
        courses: [
          'Arabic language',
          'Hadith',
          'Fiqh',
          'Seerah',
          'Islamic history',
        ],
      },
      {
        id: 'family',
        label: 'Family & community learning',
        icon: 'Users',
        courses: [
          'Islamic parenting',
          'Family life from an Islamic perspective',
        ],
      },
      {
        id: 'guidance',
        label: 'Practical religious life',
        icon: 'Compass',
        courses: ['Hajj guidance', 'Umrah guidance'],
      },
    ],
    detailLink: '/partnership',
    detailLabel: 'Discuss a community learning pathway',
  },
];
