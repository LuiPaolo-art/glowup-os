export interface DailyDocu {
  id: string
  title: string
  description: string
  channel: string
  source: string
  duration: string
  url: string
}

// Un documentaire par jour de la semaine (index 0 = dimanche)
export const DAILY_DOCUS: DailyDocu[] = [
  {
    id: 'docu-sun',
    title: 'Le Stoïcisme appliqué à la vie moderne',
    description: 'Épictète, Marc Aurèle, Sénèque — comment les principes stoïciens s\'appliquent concrètement à la discipline personnelle, la gestion des émotions et la maîtrise de soi.',
    channel: 'Ryan Holiday',
    source: 'YouTube',
    duration: '14 min',
    url: 'https://www.youtube.com/watch?v=yu7n0XzqtfA',
  },
  {
    id: 'docu-mon',
    title: 'La neurologie des habitudes — comment le cerveau apprend',
    description: 'La science derrière la formation des habitudes : boucle signal-routine-récompense, plasticité neuronale, et pourquoi certains comportements deviennent automatiques.',
    channel: 'Kurzgesagt',
    source: 'YouTube',
    duration: '12 min',
    url: 'https://www.youtube.com/watch?v=dHN_tlBEFwc',
  },
  {
    id: 'docu-tue',
    title: 'Les réseaux de neurones — comment fonctionne l\'IA',
    description: 'Une introduction visuelle aux réseaux de neurones artificiels — gradient descent, couches cachées, et pourquoi ces systèmes peuvent apprendre à partir de données brutes.',
    channel: '3Blue1Brown',
    source: 'YouTube',
    duration: '19 min',
    url: 'https://www.youtube.com/watch?v=aircAruvnKk',
  },
  {
    id: 'docu-wed',
    title: 'L\'âge d\'or islamique — quand Bagdad était le centre du monde',
    description: 'Du VIIIe au XIIIe siècle, la civilisation islamique a préservé et développé les sciences, les mathématiques, la médecine et la philosophie. Ce que le monde lui doit.',
    channel: 'Overly Sarcastic Productions',
    source: 'YouTube',
    duration: '22 min',
    url: 'https://www.youtube.com/watch?v=TYoMIQE2h84',
  },
  {
    id: 'docu-thu',
    title: 'La science de la récupération — pourquoi le repos est du travail',
    description: 'Sommeil, adaptation musculaire, surcompensation — ce que la recherche dit sur la récupération et pourquoi négliger le repos est aussi néfaste que négliger l\'entraînement.',
    channel: 'Jeff Nippard',
    source: 'YouTube',
    duration: '18 min',
    url: 'https://www.youtube.com/watch?v=dnRLQ3sVn8o',
  },
  {
    id: 'docu-fri',
    title: 'La concentration dans un monde de distractions',
    description: 'Deep work, attention fragmentée, coût cognitif du multitâche — comment les plus productifs organisent leur temps et protègent leur attention des interruptions modernes.',
    channel: 'Cal Newport',
    source: 'YouTube',
    duration: '16 min',
    url: 'https://www.youtube.com/watch?v=0sPs3DiJlcg',
  },
  {
    id: 'docu-sat',
    title: 'Comment l\'argent fonctionne vraiment',
    description: 'Inflation, taux d\'intérêt, création monétaire, banques centrales — les mécanismes fondamentaux de l\'économie moderne expliqués sans jargon inaccessible.',
    channel: 'Economics Explained',
    source: 'YouTube',
    duration: '20 min',
    url: 'https://www.youtube.com/watch?v=PHe0bXAIuk0',
  },
]

export function getTodayDocu(): DailyDocu {
  return DAILY_DOCUS[new Date().getDay()]
}
