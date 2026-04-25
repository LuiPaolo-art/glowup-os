const DAILY_HADITHS = [
  { text: "Les actes les plus aimés d'Allah sont ceux accomplis de manière constante, même s'ils sont peu nombreux.", src: 'Boukhari & Muslim' },
  { text: "Ton corps a des droits sur toi.", src: 'Boukhari' },
  { text: "La recherche de la connaissance est une obligation pour chaque musulman.", src: 'Ibn Majah' },
  { text: "Le fort n'est pas celui qui terrasse les autres, mais celui qui se maîtrise lui-même lorsqu'il est en colère.", src: 'Boukhari & Muslim' },
  { text: "Profite de cinq choses avant cinq : ta jeunesse, ta santé, ta richesse, ton temps libre et ta vie.", src: 'Al-Hakim' },
  { text: "Les actes ne valent que par les intentions, et chaque homme n'aura que ce qu'il a eu intention de faire.", src: 'Boukhari & Muslim' },
  { text: "Faites preuve de modération, faites preuve de modération — ainsi vous parviendrez au but.", src: 'Boukhari' },
]

export function HadithCard() {
  const h = DAILY_HADITHS[new Date().getDay()]
  return (
    <div className="mx-5 mb-3 bg-gold-bg border border-gold-border rounded-2xl px-4 py-3">
      <p className="text-[9px] text-gold-dim uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <span>☽</span> Hadith du jour
      </p>
      <p className="font-serif text-sm italic text-gold/60 leading-relaxed">"{h.text}"</p>
      <p className="text-[10px] text-gold-dim mt-2">— {h.src}</p>
    </div>
  )
}
