export interface WeekPlan {
  week: number;
  classes: string[];
  assignment: string;
  exam: string;
}

export interface CourseReview {
  name: string;
  batch: string;
  rating: number; // 1-5
  comment: string;
}

export interface CourseData {
  id: string;
  slug: string;
  key: string; // translation key prefix, e.g. 'course.a1'
  level: string;
  price: number; // in EUR
  image: string;
  demoVideoId: string;
  duration: string;
  lessons: number;
  studentsEnrolled: number;
  rating: number; // 1-5
  objective: string;
  curriculum: { title: string; lessons: string[] }[];
  reviews: CourseReview[];
  weeks: WeekPlan[];
}

// TODO: Ajustez le contenu du programme, les avis et le nombre d'inscrits
// pour qu'ils correspondent exactement à la réalité de vos cours.

// Répartit les thèmes du programme sur 16 semaines : chaque semaine comprend
// 4 classes vidéo courtes (15-25 min), 1 devoir à rendre et 1 examen blanc,
// pour un parcours complet menant automatiquement au certificat final.
function buildWeeks(curriculum: { title: string; lessons: string[] }[]): WeekPlan[] {
  const topics = curriculum.flatMap((m) => m.lessons);
  const weeks: WeekPlan[] = [];
  for (let i = 0; i < 16; i++) {
    const topic = topics[i % topics.length];
    const classes = [
      `Classe 1 — ${topic} (introduction)`,
      `Classe 2 — ${topic} (grammaire & vocabulaire)`,
      `Classe 3 — ${topic} (mise en pratique)`,
      `Classe 4 — ${topic} (révision & expression orale)`,
    ];
    weeks.push({
      week: i + 1,
      classes,
      assignment: `Devoir de la semaine ${i + 1} : exercices écrits sur « ${topic} »`,
      exam: `Examen blanc de la semaine ${i + 1} : évaluation sur « ${topic} »`,
    });
  }
  return weeks;
}

type RawCourse = Omit<CourseData, 'lessons' | 'duration' | 'weeks'>;

const rawCourses: RawCourse[] = [
  {
    id: 'a1',
    slug: 'delf-a1',
    key: 'course.a1',
    level: 'DELF A1',
    price: 99,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop',
    demoVideoId: 'hf6so7rwny8',
    studentsEnrolled: 186,
    rating: 4.8,
    objective:
      "À la fin de ce cours, vous serez capable de vous présenter, de communiquer dans des situations simples de la vie quotidienne, et de comprendre et utiliser des expressions familières et courantes. Ce cours vous prépare directement à réussir l'examen DELF A1.",
    curriculum: [
      {
        title: 'Module 1 — Premiers pas',
        lessons: ["L'alphabet et la prononciation", 'Se présenter', 'Les nombres et les couleurs'],
      },
      {
        title: 'Module 2 — Communication de base',
        lessons: ['Saluer et prendre congé', 'Poser des questions simples', 'Parler de sa famille'],
      },
      {
        title: 'Module 3 — Vie quotidienne',
        lessons: ['Faire les courses', 'Demander son chemin', 'Commander au restaurant'],
      },
      {
        title: "Module 4 — Préparation à l'examen",
        lessons: ['Compréhension orale DELF A1', 'Compréhension écrite DELF A1', 'Examens blancs'],
      },
    ],
    reviews: [
      { name: 'Rahim Ahmed', batch: 'Batch 12', rating: 5, comment: "Explications très claires, parfait pour un vrai débutant. J'ai adoré le rythme des classes courtes chaque semaine." },
      { name: 'Ayesha Khatun', batch: 'Batch 9', rating: 5, comment: "Les devoirs hebdomadaires m'ont vraiment aidée à progresser. Merci à toute l'équipe FN Formation !" },
      { name: 'Sayem Rahman', batch: 'Batch 11', rating: 4, comment: "Très bon cours, bien structuré. J'aurais aimé un peu plus de pratique orale en groupe." },
    ],
  },
  {
    id: 'a2',
    slug: 'delf-a2',
    key: 'course.a2',
    level: 'DELF A2',
    price: 119,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop',
    demoVideoId: 'b0LWuHgPuvs',
    studentsEnrolled: 142,
    rating: 4.9,
    objective:
      "Ce cours consolide vos bases et vous permet de décrire des événements passés, d'exprimer vos besoins dans des situations courantes (santé, travail, loisirs) et de vous préparer efficacement à l'examen DELF A2.",
    curriculum: [
      {
        title: 'Module 1 — Consolidation des acquis',
        lessons: ['Révision des bases A1', 'Le passé composé', "L'imparfait"],
      },
      {
        title: 'Module 2 — Situations quotidiennes',
        lessons: ['Chez le médecin', 'Au travail', 'Les loisirs et sorties'],
      },
      {
        title: 'Module 3 — Expression personnelle',
        lessons: ['Raconter un événement passé', 'Exprimer une opinion simple', 'Décrire un projet'],
      },
      {
        title: "Module 4 — Préparation à l'examen",
        lessons: ['Compréhension orale DELF A2', 'Production écrite DELF A2', 'Examens blancs'],
      },
    ],
    reviews: [
      { name: 'Fatima Begum', batch: 'Batch 10', rating: 5, comment: "Le passage de A1 à A2 était fluide grâce à la première semaine de révision. Très bien pensé." },
      { name: 'Tasnim Islam', batch: 'Batch 13', rating: 5, comment: "J'ai particulièrement aimé le module sur l'expression personnelle, très utile pour l'oral." },
    ],
  },
  {
    id: 'b1',
    slug: 'delf-b1',
    key: 'course.b1',
    level: 'DELF B1',
    price: 149,
    image: 'https://images.unsplash.com/photo-1470549638415-0a0755be0619?w=800&h=500&fit=crop',
    demoVideoId: 'vKP0FN7imj0',
    studentsEnrolled: 97,
    rating: 4.7,
    objective:
      "Vous apprendrez à argumenter, à justifier vos opinions et à comprendre des documents authentiques (articles, émissions radio). Ce niveau vous rend autonome dans la plupart des situations rencontrées en voyage ou en France.",
    curriculum: [
      {
        title: 'Module 1 — Autonomie linguistique',
        lessons: ['Le futur et le conditionnel', 'Les subordonnées', 'Enrichir son vocabulaire'],
      },
      {
        title: 'Module 2 — Argumentation',
        lessons: ['Exprimer et justifier une opinion', 'Débattre sur un sujet', 'Comparer des idées'],
      },
      {
        title: 'Module 3 — Compréhension avancée',
        lessons: ['Articles de presse', 'Documents audio authentiques', 'Émissions radio'],
      },
      {
        title: "Module 4 — Préparation à l'examen",
        lessons: ['Production écrite DELF B1', 'Production orale DELF B1', 'Examens blancs'],
      },
    ],
    reviews: [
      { name: 'Karim Uddin', batch: 'Batch 14', rating: 5, comment: "Niveau exigeant mais très bien encadré. Les examens blancs m'ont donné confiance pour le vrai DELF." },
      { name: 'Rahim Ahmed', batch: 'Batch 12', rating: 4, comment: 'Bon cours, le module argumentation est particulièrement utile.' },
    ],
  },
  {
    id: 'b2',
    slug: 'delf-b2',
    key: 'course.b2',
    level: 'DELF B2',
    price: 179,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop',
    demoVideoId: 'vKP0FN7imj0',
    studentsEnrolled: 64,
    rating: 4.9,
    objective:
      "Le niveau B2 vous rend capable de débattre avec assurance sur des sujets complexes, d'analyser des points de vue et de comprendre des textes littéraires ou professionnels. Idéal pour les études supérieures ou une carrière en France.",
    curriculum: [
      {
        title: 'Module 1 — Maîtrise avancée',
        lessons: ['Le subjonctif', 'Les nuances de sens', 'Registres de langue'],
      },
      {
        title: 'Module 2 — Sujets complexes',
        lessons: ['Débattre avec assurance', 'Analyser un point de vue', "Argumenter à l'écrit"],
      },
      {
        title: 'Module 3 — Compréhension experte',
        lessons: ['Textes littéraires', 'Débats télévisés', 'Documents professionnels'],
      },
      {
        title: "Module 4 — Préparation à l'examen",
        lessons: ['Production écrite DELF B2', 'Production orale DELF B2', 'Examens blancs'],
      },
    ],
    reviews: [
      { name: 'Sayem Rahman', batch: 'Batch 11', rating: 5, comment: "Le meilleur cours DELF B2 que j'ai suivi en ligne. Enseignants très disponibles." },
      { name: 'Ayesha Khatun', batch: 'Batch 9', rating: 5, comment: "Programme complet et exigeant, exactement ce qu'il fallait avant mon examen." },
    ],
  },
];

export const courses: CourseData[] = rawCourses.map((c) => {
  const weeks = buildWeeks(c.curriculum);
  const lessons = weeks.reduce((sum, w) => sum + w.classes.length, 0);
  return { ...c, weeks, duration: '16 semaines', lessons };
});

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug);
}
