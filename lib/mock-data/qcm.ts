import type { QcmQuestion } from '@/lib/store'

// Atomic Habits
export const QCM_ATOMIC_HABITS: QcmQuestion[] = [
  {
    id: 'ah1',
    text: 'Selon James Clear, les habitudes sont comparables à quoi en termes de croissance personnelle ?',
    options: [
      'Des objectifs à court terme',
      'Des intérêts composés de l\'auto-amélioration',
      'Des contraintes sociales',
      'Des décisions conscientes',
    ],
    correctIndex: 1,
    explanation: 'Clear compare les habitudes aux intérêts composés : de petites améliorations quotidiennes s\'accumulent pour produire des résultats remarquables sur le long terme.',
    minTimeSec: 10,
  },
  {
    id: 'ah2',
    text: 'Dans la séquence du cycle d\'habitude, l\'ordre correct est :',
    options: [
      'Action → Signal → Récompense → Envie',
      'Signal → Envie → Réponse → Récompense',
      'Envie → Signal → Action → Récompense',
      'Récompense → Signal → Envie → Réponse',
    ],
    correctIndex: 1,
    explanation: 'Signal (déclencheur) → Envie (désir) → Réponse (comportement) → Récompense. Ce cycle est central dans Atomic Habits.',
    minTimeSec: 12,
  },
  {
    id: 'ah3',
    text: 'L\'approche identitaire des habitudes consiste à se concentrer sur :',
    options: [
      'Les résultats que tu veux atteindre',
      'Les processus que tu suis',
      'Le type de personne que tu veux devenir',
      'Les habitudes des gens qui réussissent',
    ],
    correctIndex: 2,
    explanation: '"Je suis le genre de personne qui..." est plus puissant que "Je veux obtenir X". L\'identité est la couche la plus profonde du changement selon Clear.',
    minTimeSec: 12,
  },
  {
    id: 'ah4',
    text: 'S\'améliorer de 1% par jour donne après 1 an :',
    options: ['10× mieux', '37× mieux', '2× mieux', '5× mieux'],
    correctIndex: 1,
    explanation: '1.01^365 ≈ 37.78. La puissance de l\'accumulation — c\'est le principe fondamental du livre.',
    minTimeSec: 8,
  },
  {
    id: 'ah5',
    text: 'Pour briser une mauvaise habitude, Clear recommande principalement de :',
    options: [
      'Trouver une punition si on cède',
      'Augmenter la friction — rendre le déclencheur inaccessible',
      'Remplacer systématiquement par une bonne habitude',
      'Informer ses proches de son intention',
    ],
    correctIndex: 1,
    explanation: '3ème loi inversée : rendre le comportement difficile. Augmenter la friction entre toi et le déclencheur réduit mécaniquement le comportement non désiré.',
    minTimeSec: 12,
  },
]

// Arc 1 — Fondations de la Foi
export const QCM_ARC1_FINAL: QcmQuestion[] = [
  {
    id: 'a1f1',
    text: 'Les trois dimensions du Tawhid dans l\'ordre correct sont :',
    options: [
      'Uluhiyya, Rububiyya, Asma\' wa\'s-Sifat',
      'Rububiyya, Uluhiyya, Asma\' wa\'s-Sifat',
      'Asma\' wa\'s-Sifat, Rububiyya, Uluhiyya',
      'Rububiyya, Asma\' wa\'s-Sifat, Uluhiyya',
    ],
    correctIndex: 1,
    explanation: 'La Rububiyya (Seigneurie) → L\'Uluhiyya (adoration exclusive, cœur du message prophétique) → Les Asma\' wa\'s-Sifat (noms et attributs divins).',
    minTimeSec: 15,
  },
  {
    id: 'a1f2',
    text: 'Les six piliers de la foi sont définis dans :',
    options: [
      'Les 40 hadith de Nawawi',
      'Le hadith de Jibril — Sahih Muslim n°8',
      'Le premier hadith de Bukhari',
      'Le hadith de Mu\'adh ibn Jabal',
    ],
    correctIndex: 1,
    explanation: 'Le hadith de Jibril (rapporté par \'Umar ibn al-Khattab) dans Sahih Muslim n°8 définit les six piliers de l\'iman lors de l\'interrogation de l\'ange.',
    minTimeSec: 12,
  },
  {
    id: 'a1f3',
    text: '"Il n\'y a rien qui Lui soit semblable et Il est l\'Audient, le Clairvoyant" (42:11) enseigne que :',
    options: [
      'Allah n\'a pas d\'attributs car rien ne Lui ressemble',
      'On peut comparer les attributs d\'Allah à ceux des humains',
      'On affirme les attributs sans les comparer à ceux des créatures',
      'Allah entend et voit comme les humains mais de manière supérieure',
    ],
    correctIndex: 2,
    explanation: 'Méthode correcte : affirmer l\'attribut (As-Sami\', Al-Basir) et nier toute ressemblance avec les créatures, sans chercher à concevoir la modalité.',
    minTimeSec: 15,
  },
  {
    id: 'a1f4',
    text: 'Le premier hadith cité dans Sahih al-Bukhari est :',
    options: [
      '"La prière est le pilier de la religion"',
      '"Les actes ne valent que par les intentions"',
      '"Le droit d\'Allah sur Ses serviteurs est qu\'ils L\'adorent seul"',
      '"Celui qui meurt en sachant qu\'il n\'y a de dieu qu\'Allah entre au Paradis"',
    ],
    correctIndex: 1,
    explanation: 'Bukhari ouvre son recueil par le hadith de l\'intention (rapporté par \'Umar). Ce choix délibéré dit que l\'intention est le fondement de tout acte.',
    minTimeSec: 12,
  },
  {
    id: 'a1f5',
    text: 'Le concept de "Khalifa" (vice-régent) dans le Coran implique que l\'humain :',
    options: [
      'Est une divinité secondaire sur terre',
      'Est le propriétaire absolu de la terre',
      'A une responsabilité de gestion de ce qu\'Allah lui confie',
      'Seuls les prophètes sont des Khalifa',
    ],
    correctIndex: 2,
    explanation: 'Khalifa = gestionnaire responsable, pas propriétaire. Cette responsabilité implique une reddition de comptes. L\'injustice envers les autres créatures est un manquement à ce rôle.',
    minTimeSec: 12,
  },
]
