
import { Exam, ExamStream, StudyResource, Question, Milestone } from './types';

export const EXAMS: Exam[] = [
  {
    id: '1',
    name: 'Joint Entrance Examination',
    shortName: 'JEE Main',
    stream: ExamStream.ENGINEERING,
    difficulty: 'Hard',
    nextDate: '2026-04-10',
    applicants: 1250000,
    seats: 55000,
    description: 'Premier engineering entrance for IITs, NITs, and top technical institutes in India.',
    cutoffTrends: [{ year: 2025, score: 93 }, { year: 2024, score: 91 }, { year: 2023, score: 90 }],
    outcomes: {
      colleges: ['IIT Bombay', 'IIT Delhi', 'NIT Trichy', 'IIIT Hyderabad'],
      careers: ['Software Engineer', 'Data Scientist', 'Research Scientist']
    },
    syllabusHighlights: ['Mechanics & Electrodynamics', 'Organic & Physical Chemistry', 'Calculus & Algebra']
  },
  {
    id: '2',
    name: 'National Eligibility cum Entrance Test',
    shortName: 'NEET UG',
    stream: ExamStream.MEDICAL,
    difficulty: 'Hard',
    nextDate: '2026-05-03',
    applicants: 2500000,
    seats: 108000,
    description: 'The single-window entrance exam for all medical (MBBS/BDS) seats in India.',
    cutoffTrends: [{ year: 2025, score: 722 }, { year: 2024, score: 720 }, { year: 2023, score: 715 }],
    outcomes: {
      colleges: ['AIIMS Delhi', 'MAMC', 'KGMU Lucknow', 'CMC Vellore'],
      careers: ['Cardiologist', 'Surgeon', 'Medical Researcher']
    },
    syllabusHighlights: ['Human Physiology & Genetics', 'Plant Physiology', 'Chemical Bonding']
  },
  {
    id: '3',
    name: 'Union Public Service Commission',
    shortName: 'UPSC CSE',
    stream: ExamStream.CIVIL_SERVICES,
    difficulty: 'Very Hard',
    nextDate: '2026-05-31',
    applicants: 1100000,
    seats: 1050,
    description: 'Recruitment for IAS, IPS, and IFS cadres of the Government of India.',
    cutoffTrends: [{ year: 2025, score: 98 }, { year: 2024, score: 95 }, { year: 2023, score: 92 }],
    outcomes: {
      colleges: ['LBSNAA (Training)', 'SVPNPA (Training)'],
      careers: ['IAS Officer', 'IPS Officer', 'Diplomat (IFS)']
    },
    syllabusHighlights: ['Indian Polity & History', 'Ethics & Aptitude', 'Geography & Environment']
  },
  {
    id: '4',
    name: 'Common Law Admission Test',
    shortName: 'CLAT',
    stream: ExamStream.LAW,
    difficulty: 'Moderate',
    nextDate: '2025-12-07',
    applicants: 80000,
    seats: 3500,
    description: 'Admission to 22 National Law Universities in India.',
    cutoffTrends: [{ year: 2025, score: 102 }, { year: 2024, score: 98 }, { year: 2023, score: 95 }],
    outcomes: {
      colleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'WBNUJS Kolkata'],
      careers: ['Corporate Lawyer', 'Judge (Judiciary)', 'Legal Consultant']
    },
    syllabusHighlights: ['Legal Reasoning', 'Current Affairs & GK', 'Critical Reasoning']
  },
  {
    id: '5',
    name: 'Undergraduate Common Entrance Examination for Design',
    shortName: 'UCEED',
    stream: ExamStream.DESIGN,
    difficulty: 'Moderate',
    nextDate: '2026-01-18',
    applicants: 15000,
    seats: 200,
    description: 'Admission to Bachelor of Design (B.Des) programmes at IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad and IIITDM Jabalpur.',
    cutoffTrends: [],
    outcomes: {
      colleges: ['IIT Bombay', 'IIT Delhi', 'IIT Guwahati'],
      careers: ['Product Designer', 'UX/UI Designer', 'Interaction Designer']
    },
    syllabusHighlights: ['Visualization and Spatial Ability', 'Observation and Design Sensitivity', 'Analytical and Logical Reasoning'],
    isComingSoon: true
  },
  {
    id: '6',
    name: 'National Defence Academy',
    shortName: 'NDA',
    stream: ExamStream.DEFENCE,
    difficulty: 'Hard',
    nextDate: '2026-04-12',
    applicants: 400000,
    seats: 400,
    description: 'The Joint Services academy of the Indian Armed Forces, where cadets of the three services train together.',
    cutoffTrends: [],
    outcomes: {
      colleges: ['National Defence Academy (Khadakwasla)'],
      careers: ['Army Officer', 'Navy Officer', 'Air Force Officer']
    },
    syllabusHighlights: ['Mathematics', 'General Ability Test', 'English'],
    isComingSoon: true
  }
];

export const MILESTONES: Milestone[] = [];

export const STUDY_RESOURCES: StudyResource[] = [
  { id: 'r1', title: 'Organic Chemistry Masterclass', type: 'Video', subject: 'Chemistry', rating: 4.8, url: '#' },
  { id: 'r2', title: 'HCV Physics Solutions', type: 'Book', subject: 'Physics', rating: 4.9, url: '#' },
  { id: 'r3', title: 'Calculus Cheat Sheet', type: 'Notes', subject: 'Mathematics', rating: 4.5, url: '#' }
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'What is the limit of (sin x)/x as x approaches 0?',
    options: ['0', '1', 'Infinity', 'Undefined'],
    correctOption: 1,
    explanation: 'Using standard trigonometric limits.',
    subject: 'Mathematics',
    topic: 'Limits'
  },
  {
    id: 'q2',
    text: 'A bullet is fired from a rifle. If the rifle recoils freely, the kinetic energy of the rifle is:',
    options: ['Less than that of the bullet', 'More than that of the bullet', 'Equal to that of the bullet', 'None of the above'],
    correctOption: 0,
    explanation: 'Conservation of momentum p1 = p2. KE = p^2/2m. Since m_rifle > m_bullet, KE_rifle < KE_bullet.',
    subject: 'Physics',
    topic: 'Momentum'
  },
  {
    id: 'q3',
    text: 'Which of the following has the highest ionic radius?',
    options: ['O2-', 'F-', 'Na+', 'Mg2+'],
    correctOption: 0,
    explanation: 'Isoelectronic species: More negative charge means larger radius due to electron-electron repulsion and lower Zeff.',
    subject: 'Chemistry',
    topic: 'Atomic Structure'
  },
  {
    id: 'q4',
    text: 'The value of the integral ∫(0 to π/2) [1/(1 + tan x)] dx is:',
    options: ['π/2', 'π/4', 'π/8', '0'],
    correctOption: 1,
    explanation: 'Using the property ∫(0 to a) f(x)dx = ∫(0 to a) f(a-x)dx.',
    subject: 'Mathematics',
    topic: 'Integrals'
  },
  {
    id: 'q5',
    text: 'The dimensions of Planck’s constant are the same as that of:',
    options: ['Linear momentum', 'Angular momentum', 'Work', 'Force'],
    correctOption: 1,
    explanation: 'Both have units kg m^2/s.',
    subject: 'Physics',
    topic: 'Units and Dimensions'
  },
  {
    id: 'q6',
    text: 'In the extraction of copper from its sulphide ore, the metal is finally obtained by the reduction of cuprous oxide with:',
    options: ['Copper(I) sulphide', 'Sulphur dioxide', 'Iron(II) sulphide', 'Carbon monoxide'],
    correctOption: 0,
    explanation: 'Self-reduction process.',
    subject: 'Chemistry',
    topic: 'Metallurgy'
  },
  {
    id: 'q7',
    text: 'The sum of the series 1 + 2x + 3x^2 + ... (up to infinity) for |x| < 1 is:',
    options: ['1/(1-x)', '1/(1+x)^2', '1/(1-x)^2', '1/(1+x)'],
    correctOption: 2,
    explanation: 'Arithmetico-Geometric series sum formula.',
    subject: 'Mathematics',
    topic: 'Sequences'
  },
  {
    id: 'q8',
    text: 'A wire of resistance R is stretched to double its length. Its new resistance will be:',
    options: ['R/4', 'R/2', '2R', '4R'],
    correctOption: 3,
    explanation: 'Volume is constant. Length doubles, area halves. R = ρl/A becomes ρ(2l)/(A/2) = 4R.',
    subject: 'Physics',
    topic: 'Current Electricity'
  },
  {
    id: 'q9',
    text: 'Hybridization of xenon in XeF2 is:',
    options: ['sp', 'sp3', 'sp3d', 'sp3d2'],
    correctOption: 2,
    explanation: 'Xe has 8 valence electrons, 2 used for bonding, 3 lone pairs. Steric number 5 = sp3d.',
    subject: 'Chemistry',
    topic: 'Chemical Bonding'
  },
  {
    id: 'q10',
    text: 'If A is a square matrix of order 3 and |adj A| = 64, then |A| is:',
    options: ['±8', '±4', '±2', '64'],
    correctOption: 0,
    explanation: '|adj A| = |A|^(n-1). 64 = |A|^(3-1) = |A|^2. |A| = ±8.',
    subject: 'Mathematics',
    topic: 'Matrices'
  },
  {
    id: 'q11',
    text: 'Light year is a unit of:',
    options: ['Time', 'Distance', 'Light intensity', 'Velocity of light'],
    correctOption: 1,
    explanation: 'Distance traveled by light in one year.',
    subject: 'Physics',
    topic: 'Units'
  },
  {
    id: 'q12',
    text: 'The correct order of boiling points for the following is:',
    options: ['HF > HCl > HBr > HI', 'HI > HBr > HCl > HF', 'HF > HI > HBr > HCl', 'HCl > HBr > HI > HF'],
    correctOption: 2,
    explanation: 'HF is highest due to H-bonding. For others, it depends on van der Waals forces (molecular weight).',
    subject: 'Chemistry',
    topic: 'p-Block'
  },
  {
    id: 'q13',
    text: 'If z = (√3 + i)/2, then z^69 is equal to:',
    options: ['1', 'i', '-i', '-1'],
    correctOption: 2,
    explanation: 'z = e^(iπ/6). z^69 = e^(i69π/6) = e^(i11.5π) = e^(i(10π + 1.5π)) = e^(i3π/2) = -i.',
    subject: 'Mathematics',
    topic: 'Complex Numbers'
  },
  {
    id: 'q14',
    text: 'For a transistor, the relation between α and β is:',
    options: ['β = α/(1+α)', 'β = α/(1-α)', 'α = β/(1-β)', 'αβ = 1'],
    correctOption: 1,
    explanation: 'β = Ic/Ib, α = Ic/Ie. Ie = Ib + Ic.',
    subject: 'Physics',
    topic: 'Semiconductors'
  },
  {
    id: 'q15',
    text: 'The entropy of a perfect crystal at zero Kelvin is zero. This is:',
    options: ['First law of thermodynamics', 'Second law', 'Third law', 'Zeroth law'],
    correctOption: 2,
    explanation: 'Standard definition of Third Law.',
    subject: 'Chemistry',
    topic: 'Thermodynamics'
  },
  {
    id: 'q16',
    text: 'The eccentricity of the ellipse 9x^2 + 5y^2 = 45 is:',
    options: ['2/3', '1/3', '√5/3', '2/√5'],
    correctOption: 0,
    explanation: 'x^2/5 + y^2/9 = 1. a^2=5, b^2=9. e^2 = 1 - (5/9) = 4/9. e = 2/3.',
    subject: 'Mathematics',
    topic: 'Conic Sections'
  },
  {
    id: 'q17',
    text: 'A reversible engine converts one-sixth of heat input into work. When temperature of sink is reduced by 62°C, its efficiency is doubled. Temperature of source is:',
    options: ['372 K', '310 K', '400 K', '300 K'],
    correctOption: 0,
    explanation: 'η = 1 - T2/T1 = 1/6. η\' = 1 - (T2-62)/T1 = 1/3.',
    subject: 'Physics',
    topic: 'Thermodynamics'
  },
  {
    id: 'q18',
    text: 'Cannizzaro reaction is not given by:',
    options: ['Formaldehyde', 'Benzaldehyde', 'Acetaldehyde', 'Trimethyl acetaldehyde'],
    correctOption: 2,
    explanation: 'Acetaldehyde has alpha-hydrogen, so it gives aldol condensation instead.',
    subject: 'Chemistry',
    topic: 'Aldehydes'
  },
  {
    id: 'q19',
    text: 'If the roots of the equation x^2 - bx + c = 0 are two consecutive integers, then b^2 - 4c is:',
    options: ['0', '1', '2', '-1'],
    correctOption: 1,
    explanation: 'Let roots be α and α+1. Difference = 1. (α+1 - α)^2 = 1 = (Sum^2 - 4*Product) = b^2 - 4c.',
    subject: 'Mathematics',
    topic: 'Quadratic Equations'
  },
  {
    id: 'q20',
    text: 'A magnetic needle suspended parallel to a magnetic field requires √3 J of work to turn it through 60°. The torque needed to maintain the needle in this position is:',
    options: ['√3 J', '3 J', '2√3 J', '3/√2 J'],
    correctOption: 1,
    explanation: 'W = MB(1-cosθ). √3 = MB(1-1/2) = MB/2 => MB = 2√3. Torque = MB sinθ = 2√3 * √3/2 = 3.',
    subject: 'Physics',
    topic: 'Magnetism'
  },
  {
    id: 'q21',
    text: 'Which among the following is a paramagnetic molecule?',
    options: ['N2', 'O2', 'C2', 'Li2'],
    correctOption: 1,
    explanation: 'O2 has two unpaired electrons in antibonding pi orbitals.',
    subject: 'Chemistry',
    topic: 'Chemical Bonding'
  },
  {
    id: 'q22',
    text: 'The area bounded by the curve y = log x, x-axis and the ordinate x = e is:',
    options: ['e', '1', 'e - 1', 'None'],
    correctOption: 1,
    explanation: '∫(1 to e) ln x dx = [x ln x - x] from 1 to e = (e - e) - (0 - 1) = 1.',
    subject: 'Mathematics',
    topic: 'Area'
  },
  {
    id: 'q23',
    text: 'The wavelength of de-Broglie wave associated with a thermal neutron of mass m at absolute temperature T is:',
    options: ['h / √(3mkT)', 'h / √(2mkT)', 'h / √(mkT)', 'h / 2√(mkT)'],
    correctOption: 0,
    explanation: 'λ = h/p, p = √(2mKE), KE = (3/2)kT.',
    subject: 'Physics',
    topic: 'Dual Nature'
  },
  {
    id: 'q24',
    text: 'Phenol reacts with CHCl3 and NaOH to give salicylaldehyde. This reaction is known as:',
    options: ['Kolbe reaction', 'Reimer-Tiemann reaction', 'Wurtz reaction', 'Cannizzaro reaction'],
    correctOption: 1,
    explanation: 'Standard organic name reaction.',
    subject: 'Chemistry',
    topic: 'Phenols'
  },
  {
    id: 'q25',
    text: 'The slope of the tangent to the curve y = (x - 1)(x - 2) at the point where it crosses the x-axis (x=1) is:',
    options: ['1', '0', '-1', '2'],
    correctOption: 2,
    explanation: 'y = x^2 - 3x + 2. dy/dx = 2x - 3. At x=1, dy/dx = 2(1) - 3 = -1.',
    subject: 'Mathematics',
    topic: 'Derivatives'
  },
  {
    id: 'q26',
    text: 'In an LCR series circuit, the resonance frequency is given by:',
    options: ['1/√(LC)', '1/2π√(LC)', '2π/√(LC)', '√(LC)'],
    correctOption: 1,
    explanation: 'ω = 1/√(LC), f = 1/2π√(LC).',
    subject: 'Physics',
    topic: 'AC Circuits'
  },
  {
    id: 'q27',
    text: 'Which of the following is an example of an addition polymer?',
    options: ['Nylon-6,6', 'Polythene', 'Terylene', 'Bakelite'],
    correctOption: 1,
    explanation: 'Polythene is formed by addition of ethene monomers.',
    subject: 'Chemistry',
    topic: 'Polymers'
  },
  {
    id: 'q28',
    text: 'The value of cos 1° cos 2° cos 3° ... cos 179° is:',
    options: ['1', '0', '1/√2', '-1'],
    correctOption: 1,
    explanation: 'Includes cos 90°, which is 0.',
    subject: 'Mathematics',
    topic: 'Trigonometry'
  },
  {
    id: 'q29',
    text: 'A radioactive element has a half-life of 20 minutes. The time interval between 33% decay and 67% decay is:',
    options: ['40 min', '20 min', '30 min', '10 min'],
    correctOption: 1,
    explanation: '33% decay left 67%. 67% decay left 33%. 33% is roughly half of 67%. So one half-life.',
    subject: 'Physics',
    topic: 'Nuclear Physics'
  },
  {
    id: 'q30',
    text: 'Gold number is a measure of:',
    options: ['Purity of gold', 'Protective action of lyophilic colloid', 'Charge on gold sol', 'Amount of gold sol required'],
    correctOption: 1,
    explanation: 'Standard measure of colloid protection.',
    subject: 'Chemistry',
    topic: 'Surface Chemistry'
  }
];
