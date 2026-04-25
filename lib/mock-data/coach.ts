import type { CoachReport, CoachInsight, CoachMessage } from '@/types/coach'

export const MOCK_REPORT: CoachReport = {
  id: 'r-today',
  date: new Date().toISOString().split('T')[0],
  constat: 'Hier : 71% de complétion. Sport fait — séance complète, difficulté MEDIUM. Lecture : 15 pages. Eau : 6/8. Prières : 4/5.',
  analyse: 'Ton sport est solide : 6 séances sur 8 prévues ces 14 derniers jours. La lecture est ton point faible structurel — 8 pages/jour en moyenne au lieu de 15. Corrélation : les jours où tu fais Fajr à l\'heure, ton taux de complétion est 18% plus élevé.',
  actions: [
    'Lis 15 pages ce soir avant 22h — tu es page 145/320, finissable en 11 jours si tu reprends maintenant.',
    'Démarre le chrono sport dans les 2h — l\'ancrage cognitif fonctionne mieux enchaîné à la lecture.',
    'Bois un verre d\'eau avant d\'ouvrir ton téléphone demain matin — tu étais à 5/8 hier.',
  ],
  defi: 'Termine ta séance Push en moins de 65 min (ton record actuel : 72 min). Réduis les pauses de 90 à 75 sec.',
  metrics: { completionRate: 0.71, sportDone: true, pagesRead: 15, water: 6, prayers: 4, score: 62, scoreDelta: 3 },
}

export const MOCK_INSIGHTS: CoachInsight[] = [
  { id: 'i1', icon: '💧', type: 'warning',  text: 'Hydratation : 5/8 verres hier. En dessous de 6 verres ta concentration chute de 15-20%.', metricLabel: 'Eau hier', metricValue: '5/8' },
  { id: 'i2', icon: '🏋️', type: 'positive', text: 'Sport solide : 6 séances sur 8 prévues ces 14 derniers jours. Ton pike push-up est à 5/5 — déblocage disponible.', metricLabel: 'Séances', metricValue: '6/8' },
  { id: 'i3', icon: '📖', type: 'warning',  text: 'Lecture en retard : 68 pages cette semaine au lieu de 105. Si tu lis 20 pages ce soir, tu rattrapas en 2 jours.', metricLabel: 'Pages', metricValue: '68/105' },
  { id: 'i4', icon: '🕌', type: 'neutral',  text: 'Fajr : 5/7 jours. Les 2 jours manquants correspondent à tes 2 jours de complétion les plus bas.', metricLabel: 'Fajr 7j', metricValue: '5/7' },
]

export const MOCK_MESSAGES: CoachMessage[] = [
  { id: 'm1', role: 'user',      content: 'Comment améliorer ma séance de sport push ?',                        timestamp: '14:22' },
  { id: 'm2', role: 'assistant', content: 'Tes données de la dernière séance push : 58 min, FULL / MEDIUM. Un point à corriger : tes dips sont à 2/5 séances seulement — tu les fais probablement en dernier quand tu es fatigué. Inverse l\'ordre cette semaine : commence par les dips, finis par les pompes standards.', timestamp: '14:23' },
  { id: 'm3', role: 'user',      content: 'Et pour la lecture, j\'arrive pas à tenir les 15 pages le soir.',    timestamp: '14:25' },
  { id: 'm4', role: 'assistant', content: 'Données : tu lis en moyenne 8 pages les soirs de semaine, 18 pages le dimanche. Problème : tu lis trop tard (après 22h). Essaie 18h-19h — juste avant le dîner. Si impossible en semaine, 3 sessions de 5 pages dans la journée. Le résultat est identique pour le cerveau.', timestamp: '14:26' },
]
