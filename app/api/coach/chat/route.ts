import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/coach/chat
 *
 * Body: { message: string; context: CoachContext }
 *
 * CoachContext (sent from client):
 *   globalScore, systemState, completionToday,
 *   streak, sportDone, pagesRead, water, prayersCount,
 *   bookTitle, bookPage, bookTotal,
 *   arcTitle, arcStatus
 *
 * Returns: { reply: string }
 *
 * The Anthropic API key lives ONLY here — never sent to the client.
 * To enable: set ANTHROPIC_API_KEY in .env.local
 */

export interface CoachContext {
  globalScore: number
  systemState: string
  completionToday: number
  streak: number
  sportDone: boolean
  pagesRead: number
  water: number
  prayersCount: number
  bookTitle: string
  bookPage: number
  bookTotal: number
  arcTitle: string
  arcStatus: string
  // Domain scores
  sportScore: number
  learningScore: number
  disciplineScore: number
  constancyScore: number
}

function buildSystemPrompt(ctx: CoachContext): string {
  const bookTotal  = ctx.bookTotal
  const bookPct    = bookTotal > 0 ? Math.round((ctx.bookPage / bookTotal) * 100) : 0
  const stateLabel = ctx.systemState === 'green' ? 'Performance ●' : ctx.systemState === 'yellow' ? 'Adaptatif ◐' : 'Reprise ○'

  // Detect weakest domain
  const scores = { Sport: ctx.sportScore, Apprentissage: ctx.learningScore, Discipline: ctx.disciplineScore, Constance: ctx.constancyScore }
  const weakest = Object.entries(scores).sort(([,a],[,b]) => a - b)[0]

  return `Tu es le Coach IA de GlowUp OS — système de progression personnelle exigeant.

PROFIL UTILISATEUR (données temps réel) :
Score global : ${ctx.globalScore}/100 | État : ${stateLabel} | Streak : ${ctx.streak}j
Complétion aujourd'hui : ${ctx.completionToday}%

SCORES PAR DOMAINE :
- Sport       : ${ctx.sportScore}/100 ${ctx.sportDone ? '✓ séance faite' : '✗ séance manquante'}
- Apprentissage: ${ctx.learningScore}/100 | ${ctx.pagesRead} pages lues | "${ctx.bookTitle}" ${bookPct}%
- Discipline   : ${ctx.disciplineScore}/100 | Eau ${ctx.water}/8 | Prières ${ctx.prayersCount}/5
- Constance    : ${ctx.constancyScore}/100 | Arc actuel : "${ctx.arcTitle}" (${ctx.arcStatus})

DOMAINE LE PLUS FAIBLE : ${weakest[0]} (${weakest[1]}/100) — priorité coach.

RÈGLES DE COMMUNICATION :
1. Ancrer chaque conseil dans les données réelles ci-dessus — jamais de généralité
2. Être direct, factuel. Ni flatterie ni jugement moral
3. Format recommandation : verbe + quoi + quand + pourquoi chiffré
4. Si complétion < 50% : ton exigeant et correctif
5. Si complétion ≥ 75% : validation sobre + prochaine étape concrète
6. Jamais "c'est normal" — toujours une correction
7. Question opérationnelle → réponse < 100 mots
8. Analyse → structure : constat · cause · correction

Réponse en français uniquement.`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, context } = body as { message: string; context: CoachContext }

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message vide' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY

    // ── Mock response if no API key ──────────────────────────────
    if (!apiKey) {
      const mockReplies: Record<string, string> = {
        default:  `Score: ${context.globalScore}/100 · ${context.completionToday}% · Streak ${context.streak}j\n\nDomaines — Sport: ${context.sportScore} · Apprentissage: ${context.learningScore} · Discipline: ${context.disciplineScore} · Constance: ${context.constancyScore}\n\nActive ANTHROPIC_API_KEY dans .env.local pour des réponses personnalisées.`,
        sport:    `Sport ${context.sportScore}/100. ${context.sportDone ? 'Séance du jour ✓. Maintiens le rythme.' : 'Séance manquante. Démarre maintenant.'}`,
        lecture:  `Apprentissage ${context.learningScore}/100. Page ${context.bookPage}/${context.bookTotal} — ${Math.round(context.bookPage/context.bookTotal*100)}%. Finissable dans ${Math.ceil((context.bookTotal-context.bookPage)/15)} jours à 15p/j.`,
      }

      const lower = message.toLowerCase()
      const reply = lower.includes('sport') || lower.includes('séance') ? mockReplies.sport
        : lower.includes('lire') || lower.includes('lecture') || lower.includes('livre') ? mockReplies.lecture
        : mockReplies.default

      // Simulate API latency
      await new Promise(r => setTimeout(r, 400))
      return NextResponse.json({ reply })
    }

    // ── Real Anthropic call ──────────────────────────────────────
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 600,
        system: buildSystemPrompt(context),
        messages: [{ role: 'user', content: message }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic API error:', response.status, err)
      return NextResponse.json({ error: 'Erreur API Anthropic' }, { status: 502 })
    }

    const data = await response.json()
    const reply = data.content?.[0]?.text ?? "Je n'ai pas pu générer de réponse."

    return NextResponse.json({ reply })

  } catch (err) {
    console.error('Coach route error:', err)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}
