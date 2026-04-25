'use client'

import { PageHeader }    from '@/components/layout/PageHeader'
import { ReportCard }    from '@/components/coach/ReportCard'
import { InsightsPanel } from '@/components/coach/InsightsPanel'
import { ChatInterface } from '@/components/coach/ChatInterface'
import { SectionLabel }  from '@/components/ui/Divider'
import { StateBadge }    from '@/components/ui/Badge'
import { useStore }      from '@/lib/store'
import { generateDailyReport } from '@/lib/report'
import { generateInsights }    from '@/lib/insights'

export default function CoachPage() {
  const { user, tasks, exercises, bookPage, domainScores, water } = useStore()

  const reportInput = {
    tasks,
    exercises,
    domainScores,
    globalScore:      user.globalScore,
    globalScoreDelta: user.globalScoreDelta,
    streak:           user.streak.current,
    water,
    bookPage,
    bookTotal:  320,
    bookTitle:  'Atomic Habits',
    sportDone:  tasks.find(t => t.id === 'sport')?.done ?? false,
    systemState: user.systemState,
  }

  const report   = generateDailyReport(reportInput)
  const insights = generateInsights(reportInput)

  return (
    <div className="min-h-screen bg-s0">
      <PageHeader
        title="Coach IA"
        subtitle="Analyse · Décisions · Recommandations"
        right={<StateBadge state={user.systemState} />}
      />

      {/* Mode banner */}
      <div className="mx-5 mb-4 bg-s1 border border-s3 rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-gold-bg border border-gold-border flex items-center justify-center flex-shrink-0">
          <span className="text-gold text-sm">⬡</span>
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-t2">
            Mode {user.systemState === 'green' ? 'Exigeant' : user.systemState === 'yellow' ? 'Soutien' : 'Reconquête'}
            {' '}· Semaine {user.cycle.week}
          </p>
          <p className="text-[10px] text-t4">Streak {user.streak.current}j · Score {user.globalScore}/100</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold text-gold">{user.globalScore}</p>
          <p className="text-[9px] text-t4">score</p>
        </div>
      </div>

      <SectionLabel>Rapport du jour</SectionLabel>
      <div className="mx-5 mb-4">
        <ReportCard report={report} />
      </div>

      <SectionLabel className="mt-2">Analyse personnalisée</SectionLabel>
      <InsightsPanel insights={insights} />

      <SectionLabel className="mt-2">Chat avec le coach</SectionLabel>
      <ChatInterface />

      <div className="h-4" />
    </div>
  )
}
