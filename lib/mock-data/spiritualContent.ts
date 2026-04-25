/**
 * GlowUp OS — Contenu pédagogique des arcs spirituels
 * Chaque leçon : introduction, sections de cours, application concrète, points-clés.
 * Sources : Coran et Sunnah authentifiées uniquement.
 */

export interface LessonSection {
  heading: string
  body: string
}

export interface SpiritualLessonContent {
  id: string
  arcNum: number
  lessonNum: string
  title: string
  duration: string
  intro: string
  sections: LessonSection[]
  application: string
  keyPoints: string[]
}

// ══════════════════════════════════════════════════════════════
// ARC 1 — Fondements de la Foi (Aqidah)
// ══════════════════════════════════════════════════════════════

const arc1_l1: SpiritualLessonContent = {
  id: 'arc1-l1',
  arcNum: 1,
  lessonNum: '1.1',
  title: "Le Tawhid — L'Unicité d'Allah",
  duration: '~15 min',
  intro: "Le Tawhid est le fondement absolu de l'Islam. Tout le reste — la prière, le jeûne, le comportement moral — repose sur cette conviction : Allah est Un, sans associé, sans ressemblant. Comprendre le Tawhid n'est pas seulement un exercice intellectuel, c'est une transformation de la façon dont tu regardes chaque chose dans ta vie.",

  sections: [
    {
      heading: "Qu'est-ce que le Tawhid ?",
      body: "Le mot Tawhid vient de la racine arabe wahada, qui signifie « rendre un » ou « unifier ». En théologie islamique, il désigne la croyance en l'unicité absolue d'Allah dans Son existence, Ses attributs et Ses droits.\n\nLes savants ont classifié le Tawhid en trois dimensions complémentaires :\n\n1. Tawhid ar-Rububiyya (Unicité de la Seigneurie) — Allah est le seul Créateur, le seul Maître et le seul Administrateur de l'univers. Même les polythéistes de l'époque du Prophète ﷺ reconnaissaient cette dimension (Coran 23:84-89). Elle est nécessaire mais insuffisante.\n\n2. Tawhid al-Uluhiyya (Unicité de l'Adoration) — Allah est le seul digne d'être adoré. C'est autour de cette dimension que le Prophète ﷺ a passé 13 ans à La Mecque à appeler les gens. La Shahada (La ilaha illallah) en est l'expression directe.\n\n3. Tawhid al-Asma' wa's-Sifat (Unicité des Noms et Attributs) — Allah possède des noms et des attributs parfaits (Al-'Alim, le Savant ; Ar-Rahman, le Miséricordieux ; Al-Qadir, le Tout-Puissant). On les affirme tels qu'ils sont révélés, sans les comparer aux attributs humains, sans les nier, et sans en chercher la modalité exacte. Allah dit : « Il n'y a rien qui Lui soit semblable, et Il est l'Audient, le Clairvoyant. » (Coran 42:11)"
    },
    {
      heading: "Pourquoi le Tawhid change-t-il tout ?",
      body: "Le Tawhid n'est pas une formule récitée, c'est une vision du monde. Quand tu comprends réellement que seul Allah crée, guide et contrôle, plusieurs conséquences pratiques s'imposent :\n\n— Tu ne crains que Lui : les opinions des autres, les jugements sociaux, les pertes matérielles perdent leur emprise. « C'est Allah que vous devez craindre, si vous êtes croyants. » (Coran 9:13)\n\n— Tu ne suppliques que Lui : la du'a (invocation) devient directe, sans intermédiaire obligatoire. « Invoquez-Moi, Je vous répondrai. » (Coran 40:60)\n\n— Tu n'espères qu'en Lui : quand une porte se ferme, tu ne paniques pas, parce que tu sais que c'est Lui qui ouvre et ferme les portes.\n\nA l'opposé, le Shirk (associer quelqu'un à Allah) est décrit dans le Coran comme la seule faute qu'Allah ne pardonne pas à celui qui meurt sans en revenir (Coran 4:48). Ce n'est pas une mise en garde arbitraire — c'est parce que le Shirk détruit le fondement même de la relation entre le serviteur et son Créateur."
    },
    {
      heading: "Erreurs fréquentes à éviter",
      body: "Même sans tomber dans un Shirk explicite, certaines attitudes quotidiennes affaiblissent le Tawhid dans le cœur :\n\n— Compter excessivement sur les causes secondaires (l'argent, les relations, la chance) en oubliant que ce sont des moyens, non des causes réelles.\n\n— Avoir peur de déplaire aux gens au point de compromettre ce qu'Allah a ordonné.\n\n— Faire des actes d'adoration (prière, sadaqa) principalement pour être vu ou reconnu des autres — c'est ce qu'on appelle le Riya, et les savants le considèrent comme un Shirk mineur.\n\nLa vigilance face à ces attitudes est une pratique du Tawhid, pas un reproche moral. Le Prophète ﷺ lui-même invoquait : « O Allah, je me réfugie en Toi contre l'association que je pourrais commettre en le sachant, et je Te demande pardon pour ce que je ne sais pas. » (Ahmad)"
    }
  ],

  application: "Aujourd'hui, quand tu ressens de l'anxiété, de la peur ou de l'espoir face à une situation, pose-toi cette question : est-ce que je réagis comme si c'était Allah qui contrôle, ou comme si c'était les causes secondaires qui décident ? Remarque les moments de la journée où tu oublies le Tawhid dans ton comportement réel.",
  keyPoints: [
    "Tawhid = unicité d'Allah dans Sa Seigneurie, Son adoration et Ses attributs",
    "La dimension la plus importante : personne d'autre ne mérite d'être adoré",
    "Le Shirk est la seule faute impardonnable à la mort — Coran 4:48",
    "Le Tawhid se vit dans les actes, pas seulement dans les croyances",
    "Affirmer les attributs d'Allah sans comparer, sans nier, sans chercher la modalité"
  ]
}

const arc1_l2: SpiritualLessonContent = {
  id: 'arc1-l2',
  arcNum: 1,
  lessonNum: '1.2',
  title: 'Les Six Piliers de la Foi',
  duration: '~15 min',
  intro: "L'iman (la foi) en Islam n'est pas un sentiment vague. Il a une structure précise, définie par le Prophète ﷺ lui-même dans l'un des hadiths les plus fondamentaux de la tradition islamique. Comprendre chaque pilier, c'est comprendre comment un musulman voit le monde dans sa totalité.",

  sections: [
    {
      heading: "Le hadith fondateur",
      body: "Les six piliers sont définis dans le Hadith de Jibril, rapporté par 'Umar ibn al-Khattab (رضي الله عنه) et authentifié dans Sahih Muslim (n°8). L'ange Jibril, sous forme humaine, interroge le Prophète ﷺ devant les Compagnons :\n\n« Dis-moi ce qu'est l'iman. » Il répondit : « L'iman, c'est de croire en Allah, en Ses anges, en Ses Livres, en Ses messagers, au Jour Dernier, et de croire au destin (qadar), qu'il soit bon ou mauvais. »\n\nJibril conclut : « Tu as dit vrai. »\n\nCe hadith est l'un des piliers de la compréhension islamique car il vient d'une source exceptionnelle — l'ange de la Révélation — et a été enseigné publiquement aux Compagnons."
    },
    {
      heading: "Explication de chaque pilier",
      body: "1. La foi en Allah — Croire en Son existence, Son unicité (Tawhid), Ses noms et attributs parfaits. C'est le pilier des piliers. Tout le reste en découle.\n\n2. La foi en les Anges — Ils sont des créatures de lumière, sans libre arbitre, obéissant à Allah entièrement. Jibril transmet la Révélation, Mikail est lié à la pluie et aux moyens de subsistance, Israfil soufflera dans la trompette, Izra'il est l'ange de la mort. La foi en eux nous rappelle qu'il existe une réalité au-delà du monde visible.\n\n3. La foi en les Livres — Allah a envoyé des révélations à plusieurs prophètes : la Torah (Musa), les Psaumes (Dawud), l'Évangile original (Isa), et enfin le Coran (Muhammad ﷺ). Seul le Coran est préservé intact jusqu'à ce jour, conformément à la promesse d'Allah (Coran 15:9).\n\n4. La foi en les Messagers — Allah a envoyé des prophètes à chaque peuple. « Il n'y a pas de communauté à qui Nous n'ayons envoyé un avertisseur. » (Coran 35:24). Muhammad ﷺ est le dernier et le sceau des prophètes (Coran 33:40).\n\n5. La foi au Jour Dernier — La mort n'est pas une fin. Il y aura la résurrection, le rassemblement, le jugement, et soit le Paradis soit l'Enfer. Ce pilier donne un sens à l'équité : chaque injustice non réparée ici-bas le sera là-bas.\n\n6. La foi au Destin (Qadar) — Allah connaît tout ce qui a été, est et sera. Il a tout inscrit 50 000 ans avant la création des cieux et de la terre (Sahih Muslim). Croire au Qadar, c'est agir de son mieux et accepter ce qui échappe à notre contrôle sans amertume ni résignation passive."
    },
    {
      heading: "Iman : croyance, paroles et actes",
      body: "Les savants de la Sunnah s'accordent : l'iman n'est pas seulement une croyance intérieure. Il comprend :\n— La conviction du cœur (itiqad)\n— L'attestation de la langue (qawl)\n— Les actes des membres du corps (amal)\n\nL'iman augmente par l'obéissance et diminue par la désobéissance. Cela explique pourquoi les actes d'adoration — prière, jeûne, bonnes actions — ne sont pas optionnels : ils nourrissent et renforcent la foi."
    }
  ],

  application: "Prends le pilier du Qadar. Pense à une situation actuelle dans ta vie où tu ressens de l'inquiétude ou de la frustration face à quelque chose que tu ne contrôles pas. Comment la croyance que Allah connaît et a décidé de tout ce qui t'arrive peut-elle changer ta façon de vivre cette situation aujourd'hui ?",
  keyPoints: [
    "Définis dans le Hadith de Jibril — Sahih Muslim n°8",
    "6 piliers : Allah, Anges, Livres, Messagers, Jour Dernier, Qadar",
    "L'iman se compose de conviction, de paroles et d'actes",
    "L'iman augmente et diminue selon l'obéissance",
    "Le Qadar : Allah connaît tout — agis et accepte sans résignation"
  ]
}

const arc1_l3: SpiritualLessonContent = {
  id: 'arc1-l3',
  arcNum: 1,
  lessonNum: '1.3',
  title: 'Le Sens de la Création',
  duration: '~12 min',
  intro: "Pourquoi existes-tu ? La réponse islamique à cette question est précise, profonde, et radicalement différente de la vision matérialiste moderne. Comprendre le sens de ta création, c'est comprendre ce que tu dois faire de ta vie — et pourquoi cela a de l'importance.",

  sections: [
    {
      heading: "Le verset fondateur",
      body: "Allah dit dans le Coran : « Je n'ai créé les djinns et les humains que pour qu'ils M'adorent. » (Coran 51:56)\n\nEn arabe, le mot utilisé est ya'budun, de la même racine qu'ibada (adoration, servitude). L'adoration en Islam est bien plus large que les rituels : elle englobe toute action accomplie dans la conscience d'Allah et dans l'intention de Lui plaire.\n\nCela signifie que manger, travailler, dormir, aimer sa famille — tout cela peut être de l'adoration si l'intention est juste. Et à l'inverse, des actes apparemment religieux peuvent se vider de sens si l'intention est fausse."
    },
    {
      heading: "Le Khalifa : gestionnaire de la terre",
      body: "Allah dit également : « Je vais établir un vicaire (khalifa) sur la terre. » (Coran 2:30)\n\nLe terme khalifa ne signifie pas propriétaire ni divinité. Il signifie gestionnaire, représentant, celui à qui on confie une responsabilité. L'humain reçoit la terre en trust (amanah) et en rendra compte.\n\nCette conception a des implications concrètes :\n— L'exploitation injuste de la nature est une trahison de la mission\n— L'oppression des autres humains est une trahison de la mission\n— La paresse et le gaspillage de son potentiel sont une forme d'ingratitude\n\nLe Prophète ﷺ a dit : « Si l'Heure arrive alors que l'un d'entre vous tient une bouture et peut la planter, qu'il la plante. » (Ahmad) — une illustration de la responsabilité envers la création même dans les derniers instants."
    },
    {
      heading: "Ce monde est un test, pas une finalité",
      body: "Allah dit : « C'est Lui qui a créé la mort et la vie pour vous éprouver et voir qui de vous est le meilleur en œuvres. » (Coran 67:2)\n\nLe monde duniya (monde d'ici-bas) vient d'une racine qui signifie « proche » et « bas ». Il est proche de nous et inférieur en valeur à l'au-delà. Le Prophète ﷺ a dit : « Qu'est-ce que le monde par rapport à l'au-delà ? C'est comme si l'un d'entre vous trempait son doigt dans la mer : voyez ce qu'il en rapporte. » (Muslim)\n\nCela ne signifie pas que le monde n'a pas d'importance — il en a énormément, car c'est le lieu où l'on construit son au-delà. Mais cela remet les difficultés, les pertes et les échecs dans une perspective : ce sont des épreuves, pas des condamnations définitives."
    }
  ],

  application: "Pendant les prochaines 24 heures, choisis une action ordinaire (travailler, cuisiner, faire du sport) et reformule ton intention avant de commencer : « Je fais cela pour prendre soin de ce qu'Allah m'a confié, et j'espère Sa satisfaction. » Observe si cela change ta façon de faire cette action.",
  keyPoints: [
    "La création est créée pour adorer Allah — Coran 51:56",
    "L'adoration englobe tous les actes faits avec la bonne intention",
    "L'humain est Khalifa : gestionnaire, pas propriétaire de la terre",
    "Ce monde est un test et un moyen, pas une finalité — Coran 67:2",
    "Les difficultés de cette vie ont un sens dans la perspective de l'au-delà"
  ]
}

const arc1_l4: SpiritualLessonContent = {
  id: 'arc1-l4',
  arcNum: 1,
  lessonNum: '1.4',
  title: "La Shahada — Son Vrai Sens",
  duration: '~12 min',
  intro: "« La ilaha illallah, Muhammad rasulullah. » Prononcée des milliards de fois chaque jour dans le monde, la Shahada est bien plus qu'une formule d'entrée en Islam. Elle est un engagement existentiel qui, si elle est comprise et vécue, transforme toute l'existence.",

  sections: [
    {
      heading: "La structure de la Shahada",
      body: "La première partie — La ilaha illallah — se décompose en deux mouvements :\n\n— Negation : La ilaha (« Il n'y a pas de dieu... ») — on commence par effacer toutes les fausses divinités : l'argent, le statut social, les passions, les peurs, les autres humains comme objets d'adoration absolue.\n\n— Affirmation : illallah (« ...si ce n'est Allah ») — on affirme que seul Allah mérite l'adoration, la soumission, la crainte et l'espérance absolues.\n\nCe n'est donc pas seulement dire « Je crois en Dieu ». C'est dire « Je dégage tout ce qui a usurpé la place d'Allah dans ma vie, et je L'y installe à la place qui Lui revient. »\n\nLa deuxième partie — Muhammad rasulullah — implique d'accepter Muhammad ﷺ comme le modèle de comment vivre la première partie. Son mode de vie (Sunnah) est le manuel de la Shahada en pratique."
    },
    {
      heading: "Les conditions de la Shahada",
      body: "Les savants ont identifié des conditions pour que la Shahada soit valide et efficace — non pas pour la rendre difficile, mais pour qu'elle ne reste pas une coquille vide :\n\n1. L'ilm (la connaissance) — comprendre ce qu'on affirme et ce qu'on nie\n2. Al-Yaqin (la certitude) — sans doute dans le cœur\n3. Al-Ikhlas (la sincérité) — pour Allah seul, pas pour les autres\n4. As-Sidq (la véracité) — accord entre le cœur et la langue\n5. Al-Mahabbah (l'amour) — aimer ce qu'elle implique, pas seulement la réciter\n6. Al-Inqiyad (la soumission) — agir conformément à ce qu'elle implique\n7. Al-Qabul (l'acceptation) — accepter tout ce qui vient avec la Shahada, même ce qui est difficile\n\nCes conditions ne sont pas un barème de perfection. Elles sont une boussole pour évaluer où on en est dans sa vie."
    },
    {
      heading: "La Shahada dans la vie quotidienne",
      body: "La Shahada n'est pas seulement prononcée lors de l'entrée en Islam. Elle est réaffirmée dans :\n— L'adhan (l'appel à la prière), 5 fois par jour\n— Le Tashahhud (assis dans la prière)\n— Le moment de la mort : le Prophète ﷺ a dit : « Faites prononcer à vos mourants La ilaha illallah. » (Muslim)\n\nVivriez-la au quotidien signifie :\n— Ne pas donner d'autres humains le pouvoir de définir ta valeur\n— Ne pas te soumettre aux modes culturelles qui contredisent ce qu'Allah a ordonné\n— Faire de ta conformité à l'ordre d'Allah la priorité quand il y a conflit avec les désirs ou les pressions extérieures"
    }
  ],

  application: "Écris en quelques lignes ce qui occupe, dans ta vie actuelle, une place disproportionnée que seul Allah devrait avoir (une peur, une dépendance, une approbation que tu cherches). Ce n'est pas un reproche — c'est un exercice d'honnêteté. La Shahada commence par reconnaître ce qu'il faut effacer.",
  keyPoints: [
    "La ilaha = négation de toute fausse divinité dans sa vie",
    "illallah = affirmation qu'Allah seul mérite l'adoration absolue",
    "Muhammad rasulullah = son mode de vie est le guide pratique",
    "7 conditions : connaissance, certitude, sincérité, véracité, amour, soumission, acceptation",
    "La Shahada est un engagement quotidien, pas une formule unique"
  ]
}

// ══════════════════════════════════════════════════════════════
// ARC 2 — La Prière (Salah)
// ══════════════════════════════════════════════════════════════

const arc2_l1: SpiritualLessonContent = {
  id: 'arc2-l1',
  arcNum: 2,
  lessonNum: '2.1',
  title: "L'obligation et l'histoire de la prière",
  duration: '~12 min',
  intro: "La prière (Salah) est le deuxième pilier de l'Islam et la seule obligation prescrite directement par Allah à Son Prophète ﷺ sans intermédiaire. Comprendre comment elle a été instituée, c'est comprendre son rang exceptionnel dans la religion.",

  sections: [
    {
      heading: "Le Voyage nocturne (Isra wal Mi'raj)",
      body: "La prière a été prescrite lors d'un événement unique dans l'histoire de l'humanité : le voyage nocturne du Prophète ﷺ à Jérusalem (Isra) puis son ascension vers les cieux (Mi'raj), environ un an avant l'Hégire.\n\nAllah dit : « Gloire à Celui qui a fait voyager de nuit Son serviteur, de la Mosquée Sacrée à la Mosquée Al-Aqsa. » (Coran 17:1)\n\nLors de ce voyage, Allah prescrit initialement 50 prières par jour. Sur le conseil du Prophète Moussa (عليه السلام), le Prophète ﷺ retourne plusieurs fois auprès d'Allah jusqu'à ce que le nombre soit réduit à 5. Mais Allah dit alors : « Ce sont 5 prières, et la récompense en est 50. Ma parole ne change pas. » (Bukhari et Muslim)\n\nCette origine extraordinaire explique pourquoi la prière est la seule obligation prescrite dans les cieux, et non sur terre par révélation."
    },
    {
      heading: "Le rang de la prière dans l'Islam",
      body: "Le Prophète ﷺ a dit : « La prière est le pilier de la religion. Celui qui l'accomplit a soutenu la religion, et celui qui la délaisse a démoli la religion. » (Al-Bayhaqi — hadith dont le sens est confirmé par d'autres sources)\n\nAu Jour du Jugement, le premier compte qui sera demandé sera la prière. Si elle est correcte, tout le reste sera examiné favorablement. Si elle est déficiente, tout le reste le sera (At-Tabarani).\n\nLes 5 prières structurent la journée à intervalles réguliers, empêchant l'oubli d'Allah de s'installer plus de quelques heures d'affilée. C'est un rappel architectural du Tawhid, intégré dans le temps lui-même."
    },
    {
      heading: "Les conditions et obligations de la prière",
      body: "Pour qu'une prière soit valide, plusieurs conditions doivent être réunies :\n\n— La pureté rituelle (Taharah) : ablutions (wudu) ou ghusl si nécessaire\n— La direction (Qibla) : face à la Ka'ba à La Mecque\n— L'heure : chaque prière a une plage de temps précise\n— La tenue : les awrat (parties du corps à couvrir) doivent être couverts\n— L'intention (niyyah) : dans le cœur, sans la prononcer obligatoirement à voix haute\n\nLes rukuns (piliers internes) de la prière incluent : le Takbir d'ouverture, la récitation d'Al-Fatiha, le Ruku', le Sujud, et le Tashahhud final."
    }
  ],

  application: "Regarde ton planning de prière aujourd'hui. Pour chaque prière, note quelle pensée ou quelle activité t'en a éloigné ou t'y a aidé. Sans jugement — juste une observation. La prière se construit d'abord par la conscience de ce qui l'obstrue.",
  keyPoints: [
    "Prescrite lors du Mi'raj — seule obligation reçue dans les cieux",
    "5 prières en acte, récompense de 50 — Bukhari et Muslim",
    "Premier compte au Jour du Jugement",
    "Pilier de la religion : sans elle, tout s'effondre",
    "Conditions de validité : pureté, direction, heure, tenue, intention"
  ]
}

const arc2_l2: SpiritualLessonContent = {
  id: 'arc2-l2',
  arcNum: 2,
  lessonNum: '2.2',
  title: "Le sens des paroles et des gestes",
  duration: '~18 min',
  intro: "La plupart des musulmans font la prière depuis l'enfance mais n'ont jamais appris ce que signifient les paroles qu'ils prononcent. Comprendre la prière de l'intérieur — chaque takbir, chaque verset, chaque position — transforme radicalement l'expérience. La prière cesse d'être une routine pour devenir une conversation.",

  sections: [
    {
      heading: "Le Takbir d'ouverture — Allahu Akbar",
      body: "La prière commence par « Allahu Akbar » — Allah est le Plus Grand.\n\nCe n'est pas seulement une formule d'ouverture. C'est une déclaration que, à partir de maintenant, tout le reste passe en second. Le téléphone, le travail, les soucis — tout est mis en dessous d'Allah pour la durée de cette conversation.\n\nLes bras levés et abaissés symbolisent le fait de « laisser le monde derrière » pour entrer dans un espace sanctifié."
    },
    {
      heading: "Al-Fatiha — Le cœur de la prière",
      body: "Al-Fatiha est récitée dans chaque raka'a (unité de prière). Le Prophète ﷺ a dit : « Pas de prière valide sans la Fatiha. » (Bukhari et Muslim)\n\nAllah dit dans un hadith qudsi : « J'ai partagé la prière entre Moi et Mon serviteur en deux moitiés, et Mon serviteur obtient ce qu'il demande. » Quand le serviteur dit :\n\n« Bismillahi Rahman Rahim » — il reconnaît qu'il agit au nom d'Allah\n« Al-hamdu lillahi rabbil alamin » — il remercie Allah, Seigneur de tous les mondes\n« Ar-Rahmani Rahim » — il invoque Sa miséricorde\n« Maliki yawmi ddin » — il reconnaît Son autorité souveraine au Jour du Jugement\n\nAllah répond : « Mon serviteur M'a loué. »\n\n« Iyyaka na'budu wa iyyaka nasta'in » — C'est Toi seul que nous adorons, C'est Toi seul dont nous implorons le secours\n\nAllah répond : « Cela est entre Moi et Mon serviteur. »\n\n« Ihdina as-sirat al-mustaqim » — Guide-nous vers le droit chemin\n\nAllah répond : « Cela appartient à Mon serviteur, et Mon serviteur obtient ce qu'il demande. » (Muslim)\n\nLa Fatiha est donc un dialogue, pas un monologue."
    },
    {
      heading: "Le Ruku' et le Sujud — La soumission en acte",
      body: "Le Ruku' (l'inclinaison) : on dit « Subhana Rabbi al-'Azim » — Gloire à mon Seigneur le Très Grand. En s'inclinant, on reconnaît physiquement la grandeur d'Allah et la petitesse de l'humain.\n\nEn se relevant : « Sami'a Allahu liman hamidah » (Allah entend celui qui Le loue) — « Rabbana wa lakal hamd » (Notre Seigneur, à Toi la louange).\n\nLe Sujud (la prosternation) est la position la plus importante de la prière. Le Prophète ﷺ a dit : « Le moment où le serviteur est le plus proche de son Seigneur, c'est lorsqu'il est en prosternation. Faites donc beaucoup de du'a (invocations). » (Muslim)\n\nOn dit : « Subhana Rabbi al-A'la » — Gloire à mon Seigneur le Très-Haut. C'est l'ironie spirituelle magnifique : on est dans la position la plus basse physiquement, et c'est là qu'on est le plus proche d'Allah.\n\nChaque prière offre deux prosternations par raka'a — deux opportunités de proximité."
    },
    {
      heading: "Le Tashahhud — La salutation du Prophète",
      body: "Le Tashahhud commence par : « At-tahiyyatu lillahi was-salawatu wat-tayyibat » — Toutes les salutations, prières et bonnes paroles appartiennent à Allah.\n\nSelon les savants, cette formule rappelle la conversation entre Allah et le Prophète ﷺ lors du Mi'raj — le Prophète saluait Allah, Allah lui répondait, les Anges attestaient.\n\nEnsuite vient la Shahada et la Salawat (invocation de paix sur le Prophète ﷺ) : « Allahumma salli 'ala Muhammad... » — invocation qu'Allah Lui-même a commandée (Coran 33:56)."
    }
  ],

  application: "Dans ta prochaine prière, essaie de réciter Al-Fatiha en connaissant le sens de chaque verset. Pas besoin de te souvenir de tout — focalise sur un seul verset à la fois. Cette semaine : comprends « Ihdina as-sirat al-mustaqim ». Tu la prononces au minimum 17 fois par jour.",
  keyPoints: [
    "Allahu Akbar = déclaration que tout passe en second pendant la prière",
    "Al-Fatiha est un dialogue avec Allah — Muslim (hadith qudsi)",
    "Le Sujud : position la plus proche d'Allah — Muslim",
    "Ruku' et Sujud : la soumission corporelle renforce la soumission du cœur",
    "Le Tashahhud rappelle la conversation du Mi'raj"
  ]
}

const arc2_l3: SpiritualLessonContent = {
  id: 'arc2-l3',
  arcNum: 2,
  lessonNum: '2.3',
  title: "Le Khushu' — La présence du cœur",
  duration: '~15 min',
  intro: "Le Khushu' est à la prière ce que l'âme est au corps. On peut techniquement accomplir une prière sans Khushu', mais cette prière risque de passer à côté de sa finalité. Allah dit : « Les croyants ont certes réussi — ceux qui font preuve d'humilité dans leur prière. » (Coran 23:1-2)",

  sections: [
    {
      heading: "Qu'est-ce que le Khushu' ?",
      body: "Le mot Khushu' vient d'une racine qui signifie l'humilité, le calme, la déférence. Dans la prière, il désigne la présence du cœur, de l'esprit et du corps face à Allah.\n\nIbn al-Qayyim (savant du XIVe siècle) explique que le Khushu' a deux dimensions :\n— Khushu' du cœur : conscience d'être face à Allah, sentiment de Sa grandeur, humilité\n— Khushu' des membres : calme, absence de mouvement inutile, regard vers le lieu de prosternation\n\nLes Compagnons faisaient leurs prières sans bouger, au point que les oiseaux se posaient parfois sur leurs épaules en les confondant avec des statues."
    },
    {
      heading: "Pourquoi c'est difficile aujourd'hui",
      body: "L'absence de Khushu' n'est pas un problème moderne inventé — le Prophète ﷺ lui-même faisait des invocations pour s'en protéger : « Je me réfugie en Toi contre un cœur qui ne ressent pas l'humilité. » (Muslim)\n\nMais plusieurs facteurs contemporains l'aggravent :\n\n— La surcharge cognitive : nos cerveaux sont conditionnés à traiter des dizaines de stimuli par minute. Arrêter brusquement cette cadence pour la prière est difficile.\n— L'automatisme : quand on prie depuis l'enfance, la prière peut devenir un réflexe musculaire sans conscience.\n— La précipitation : la prière rapide est valide techniquement, mais coupe court au Khushu'.\n\nLe Prophète ﷺ a décrit ceux qui volent dans leur prière : « Le pire des voleurs est celui qui vole dans sa prière. » On demanda comment. Il répondit : « Il ne complète pas ses inclinaisons et prosternations. » (Ahmad)"
    },
    {
      heading: "Comment développer le Khushu'",
      body: "Ce sont des pratiques concrètes, pas des exhortations abstraites :\n\n1. Prépare-toi avant la prière : les ablutions ne sont pas seulement un rituel de pureté — elles sont une transition. Utilise ce moment pour quitter mentalement ce que tu faisais.\n\n2. Connaître ce qu'on récite : il est difficile d'être présent dans une prière dont on ne comprend pas les mots. C'est l'objet de la leçon 2.2.\n\n3. Prier comme si c'était ta dernière prière : le Prophète ﷺ a dit : « Prie comme si tu disais au revoir. » (Ibn Majah)\n\n4. Garder le regard vers le lieu de prosternation : évite de regarder de côté. Le regard oriente l'attention.\n\n5. Allonger les postures : prends le temps du Ruku' et du Sujud. C'est là que le cœur s'installe.\n\n6. Varier les sourates : la familiarité peut endormir la conscience. Apprendre de nouvelles sourates réveille l'attention.\n\n7. Identifier une seule chose à améliorer par semaine — pas tout à la fois."
    }
  ],

  application: "Lors de ta prochaine prière, prolonge seulement le premier Sujud. Dis 'Subhana Rabbi al-A'la' au minimum 7 fois lentement. Observe ce qui se passe dans ton cœur pendant ces quelques secondes supplémentaires.",
  keyPoints: [
    "Le Khushu' est mentionné comme attribut des croyants qui réussissent — Coran 23:1-2",
    "Deux dimensions : présence du cœur + calme des membres",
    "Prier vite sans complétude des postures = voler dans sa prière — Ahmad",
    "Se préparer avant la prière avec les ablutions comme transition",
    "Prier chaque prière comme si c'était la dernière — Ibn Majah"
  ]
}

const arc2_l4: SpiritualLessonContent = {
  id: 'arc2-l4',
  arcNum: 2,
  lessonNum: '2.4',
  title: "Prière collective et prières surérogatoires (Nawafil)",
  duration: '~12 min',
  intro: "Au-delà des 5 prières obligatoires, l'Islam propose un édifice entier de prières surérogatoires (Nawafil) qui permettent d'approfondir la relation avec Allah. Et la prière collective (Jama'a) transforme radicalement la récompense de chaque prière accomplie.",

  sections: [
    {
      heading: "La prière en communauté — 27 fois plus de récompense",
      body: "Le Prophète ﷺ a dit : « La prière en groupe vaut 27 fois celle accomplie seul. » (Bukhari et Muslim)\n\nCe n'est pas seulement une question de chiffre. La prière collective a des dimensions que la prière individuelle ne peut pas reproduire :\n\n— L'humilité : prier derrière un imam, synchroniser ses mouvements avec les autres, c'est mettre son ego en sourdine\n— La cohésion sociale : la mosquée était, à l'époque du Prophète ﷺ, le centre de la vie communautaire\n— La régularité : s'engager avec une communauté crée une structure externe qui renforce la discipline interne\n\nLe Prophète ﷺ était si strict sur ce point que les aveugles et malvoyants étaient encouragés à venir à la mosquée s'ils pouvaient entendre l'adhan."
    },
    {
      heading: "Les Sunnah Rawatib — les compagnes des obligatoires",
      body: "Les Sunnah Rawatib sont des prières surérogatoires liées aux prières obligatoires :\n\n— 2 raka'at avant Fajr (très fortement recommandées — elles valent mieux que le monde et ce qu'il contient, selon Muslim)\n— 4 raka'at avant Dhuhr et 2 après\n— 2 raka'at après Maghrib\n— 2 raka'at après Isha\n\nSoit 10 à 12 raka'at par jour en plus des obligatoires. Celui qui les accomplit régulièrement, le Prophète ﷺ a promis qu'Allah lui construira une maison au Paradis (Muslim).\n\nLeur importance pratique : elles « comblent » les lacunes des prières obligatoires. Les obligatoires peuvent être accomplies mécaniquement certains jours — les Nawafil permettent de maintenir un lien de qualité."
    },
    {
      heading: "Tahajjud — La prière de la nuit",
      body: "Allah dit : « Et pendant la nuit, reste éveillé pour prier — une œuvre surérogatoire pour toi. Peut-être que ton Seigneur te placera en une station louée (Maqam Mahmud). » (Coran 17:79)\n\nLe Tahajjud se fait après le sommeil, dans le dernier tiers de la nuit. C'est la prière des prophètes, des savants et des gens de conviction à travers les âges.\n\nSes effets pratiques :\n— Clarté mentale au réveil\n— Sentiment de connexion directe avec Allah\n— Protection spirituelle : le Prophète ﷺ a dit que Shaitan fait des nœuds sur la nuque de celui qui dort, et la prière de nuit les défait (Bukhari)\n\nPour commencer : 2 raka'at seulement, irrégulièrement au début. La régularité vient avec l'habitude."
    }
  ],

  application: "Cette semaine, choisis un Nawafil que tu vas essayer d'incorporer : les 2 raka'at avant Fajr. Mets-les sur ton agenda comme n'importe quelle tâche importante. Objectif : les faire 4 jours sur 7 cette semaine.",
  keyPoints: [
    "Prière en groupe = 27x la récompense de la prière seul — Bukhari et Muslim",
    "2 raka'at avant Fajr valent mieux que le monde entier — Muslim",
    "Les Nawafil comblent les lacunes des prières obligatoires",
    "Tahajjud : prière des prophètes, dans le dernier tiers de la nuit — Coran 17:79",
    "Commencer par 2 raka'at irréguliers avant de viser la régularité"
  ]
}

// ══════════════════════════════════════════════════════════════
// EXPORTS
// ══════════════════════════════════════════════════════════════

export const SPIRIT_LESSON_CONTENT: Record<string, SpiritualLessonContent> = {
  'arc1-l1': arc1_l1,
  'arc1-l2': arc1_l2,
  'arc1-l3': arc1_l3,
  'arc1-l4': arc1_l4,
  'arc2-l1': arc2_l1,
  'arc2-l2': arc2_l2,
  'arc2-l3': arc2_l3,
  'arc2-l4': arc2_l4,
}

export const ARC_LESSON_IDS: Record<number, string[]> = {
  1: ['arc1-l1', 'arc1-l2', 'arc1-l3', 'arc1-l4'],
  2: ['arc2-l1', 'arc2-l2', 'arc2-l3', 'arc2-l4'],
}
