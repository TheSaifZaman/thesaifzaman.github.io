var WEEKLY_PLAN_DATA = {
  pageTitle: "Weekly Plan - Nocturnal",
  header: {
    title: 'The Weekly <em>Rhythm</em>',
    subtitle: 'A life of deen, craft, and presence - built hour by hour.'
  },
  legend: [
    { label: 'Deen', dot: 'deen' },
    { label: 'Work', dot: 'work' },
    { label: 'Growth', dot: 'growth' },
    { label: 'Wife & Family', dot: 'wife' },
    { label: 'Rest', dot: 'rest' },
    { label: 'Sleep', dot: 'sleep' }
  ],
  // type → tag color CSS variable + optional row bg class
  typeMap: {
    sleep:  { color: 'var(--sleep)',  bg: 'sleep-bg' },
    deen:   { color: 'var(--green)',  bg: 'deen-bg' },
    wife:   { color: 'var(--rose)',   bg: 'wife-bg' },
    growth: { color: 'var(--accent)', bg: '' },
    work:   { color: 'var(--blue)',   bg: '' },
    rest:   { color: 'var(--muted)',  bg: '' }
  },
  // Activities: English noun phrase → Arabic ism (noun)
  arabicMap: {
    'Sleep - protected': 'نَوْم مَحْمِيّ',
    'Tahajjud (4 rakah) + dua': 'تَهَجُّد (٤ رَكَعَات) + دُعَاء',
    'Fajr + morning adhkar': 'الفَجْر + أَذْكَار الصَّبَاح',
    'Fajr + Surah Al-Kahf': 'الفَجْر + سُورَة الكَهْف',
    'Arabic drill': 'تَدْرِيب اللُّغَة العَرَبِيَّة',
    'Arabic deep dive': 'غَوْص فِي اللُّغَة العَرَبِيَّة',
    'Blog writing': 'كِتَابَة المُدَوَّنَة',
    'Blog writing - long-form': 'كِتَابَة المُدَوَّنَة - مُطَوَّلَة',
    'Online madrasa class': 'دَرْس المَدْرَسَة عَبْرَ الإِنْتِرْنِت',
    'Quran: 5 new ayahs + revision': 'القُرْآن: ٥ آيَات جَدِيدَة + مُرَاجَعَة',
    'VO2 max workout': 'تَمْرِين رِيَاضِيّ مُكَثَّف',
    'Shower, breakfast, desk setup': 'اِسْتِحْمَام، فَطُور، تَجْهِيز المَكْتَب',
    'Coffee + Quality Time': 'قَهْوَة + وَقْت مُمَيَّز',
    'Slow breakfast + Quality Time': 'فَطُور هَادِئ + وَقْت مُمَيَّز',
    'Breakfast + Quality Time': 'فَطُور + وَقْت مُمَيَّز',
    'Office: deep work block 1': 'المَكْتَب: عَمَل عَمِيق (١)',
    'Office: deep work block 2': 'المَكْتَب: عَمَل عَمِيق (٢)',
    'Self-learning (in office time)': 'تَعَلُّم ذَاتِيّ',
    'Self-learning deep block': 'تَعَلُّم ذَاتِيّ مُعَمَّق',
    'Team huddle + plan share': 'اِجْتِمَاع الفَرِيق + مُشَارَكَة الخُطَّة',
    'Office work (Claude-assisted)': 'عَمَل المَكْتَب (بِمُسَاعَدَة Claude)',
    'Dhuhr + lunch + Quality Time': 'الظُّهْر + الغَدَاء + وَقْت مُمَيَّز',
    'Qaylulah (nap) - sunnah rest': 'القَيْلُولَة - سُنَّة',
    'Long nap + true rest': 'قَيْلُولَة طَوِيلَة + رَاحَة حَقِيقِيَّة',
    'Tea, light movement, focus reset': 'شَاي، حَرَكَة خَفِيفَة، اِسْتِعَادَة التَّرْكِيز',
    'Asr': 'العَصْر',
    'Office wrap-up + handoff notes': 'إِنْهَاء العَمَل + مُلَاحَظَات التَّسْلِيم',
    'Wind-down + Quality Time': 'اِسْتِرْخَاء + وَقْت مُمَيَّز',
    'Maghrib': 'المَغْرِب',
    'Dinner + family time': 'العَشَاء + وَقْت العَائِلَة',
    'Esha': 'العِشَاء',
    'Esha (together)': 'العِشَاء (مَعًا)',
    'Quran memorization deep session': 'جَلْسَة حِفْظ القُرْآن',
    'Part-time job': 'العَمَل الجُزْئِيّ',
    'Part-time job - heavy block': 'العَمَل الجُزْئِيّ - كَتْلَة كَبِيرَة',
    'Part-time office visit': 'زِيَارَة المَكْتَب - نِصْف يَوْم',
    'Journaling + next-day plan': 'كِتَابَة اليَوْمِيَّات + خُطَّة الغَد',
    'Journaling + week-ahead plan': 'كِتَابَة اليَوْمِيَّات + خُطَّة الأُسْبُوع',
    "Ghusl + Jumu'ah prayer + lunch": 'الغُسْل + صَلَاة الجُمُعَة + الغَدَاء',
    'Date-night prep': 'تَجْهِيز مَوْعِد المَسَاء',
    'Date night dinner': 'عَشَاء مَوْعِد خَاصّ',
    'Quality Time + Quran together': 'وَقْت مُمَيَّز + قُرْآن مَعًا',
    'Outing + Quality Time': 'نُزْهَة + وَقْت مُمَيَّز',
    'Quality Time': 'وَقْت مُمَيَّز',
    'Family evening': 'أُمْسِيَة عَائِلِيَّة',
    'Weekly review + planning': 'مُرَاجَعَة أُسْبُوعِيَّة + تَخْطِيط'
  },
  // Notes: full affirmative English sentence → full affirmative Arabic sentence
  notesMap: {
    "I sleep deeply so I rise ready for Tahajjud.":
      "أَنَامُ نَوْمًا عَمِيقًا لِأَقُومَ مُسْتَعِدًّا لِلتَّهَجُّد.",
    "I sleep five hours by night plus one hour Qaylulah - six in total.":
      "أَنَامُ خَمْسَ سَاعَاتٍ لَيْلًا وَسَاعَةَ قَيْلُولَةٍ - سِتُّ سَاعَاتٍ كَامِلَة.",
    "I sleep five hours by night plus a long nap - six and a half in total.":
      "أَنَامُ خَمْسَ سَاعَاتٍ لَيْلًا وَقَيْلُولَةً طَوِيلَةً - سِتٌّ وَنِصْفٌ كَامِلَة.",
    "I rise in the blessed last third of the night and stand for my Lord.":
      "أَقُومُ فِي الثُّلُثِ الأَخِيرِ المُبَارَكِ مِنَ اللَّيْلِ وَأَقِفُ لِرَبِّي.",
    "I pray Fajr and recite the morning adhkar from Hisnul Muslim.":
      "أُصَلِّي الفَجْرَ وَأَقْرَأُ أَذْكَارَ الصَّبَاحِ مِنْ حِصْنِ المُسْلِم.",
    "I pray Fajr and recite Surah Al-Kahf as is sunnah on Jumu'ah.":
      "أُصَلِّي الفَجْرَ وَأَقْرَأُ سُورَةَ الكَهْفِ كَمَا هِيَ سُنَّةُ يَوْمِ الجُمُعَة.",
    "I drill street and Quranic vocab paired with my current hifz.":
      "أَتَدَرَّبُ عَلَى مُفْرَدَاتِ الشَّارِعِ وَالقُرْآنِ مَعَ حِفْظِيَ الحَالِيّ.",
    "I push deeper into Arabic grammar and roots.":
      "أَتَعَمَّقُ فِي قَوَاعِدِ العَرَبِيَّةِ وَجُذُورِهَا.",
    "I draft, outline, or publish my blog for thirty minutes.":
      "أَكْتُبُ مُسَوَّدَةَ المُدَوَّنَةِ أَوْ خُطَّتَهَا أَوْ أَنْشُرُهَا فِي ثَلَاثِينَ دَقِيقَةً.",
    "I research, draft, and publish a long-form post in ninety minutes.":
      "أَبْحَثُ وَأَكْتُبُ وَأَنْشُرُ مَقَالًا مُطَوَّلًا فِي تِسْعِينَ دَقِيقَةً.",
    "I attend the live class and take careful notes.":
      "أَحْضُرُ الدَّرْسَ المُبَاشِرَ وَأُدَوِّنُ مُلَاحَظَاتٍ دَقِيقَة.",
    "I memorize five new ayahs and revise the previous portions.":
      "أَحْفَظُ خَمْسَ آيَاتٍ جَدِيدَةً وَأُرَاجِعُ مَا سَبَقَ حِفْظُهُ.",
    "I push my VO2 max with thirty minutes of equipment-free HIIT.":
      "أَرْفَعُ لِيَاقَتِي بِتَدْرِيبٍ مُكَثَّفٍ ثَلَاثِينَ دَقِيقَةً بِدُونِ أَدَوَات.",
    "I shower, eat breakfast, and prepare my desk for office mode.":
      "أَسْتَحِمُّ وَأَتَنَاوَلُ الفَطُورَ وَأُجَهِّزُ مَكْتَبِي لِبَدْءِ العَمَل.",
    "I sip coffee with my wife and we start the day together - devices away.":
      "أَحْتَسِي القَهْوَةَ مَعَ زَوْجَتِي وَنَبْدَأُ يَوْمَنَا مَعًا بَعِيدًا عَنِ الأَجْهِزَة.",
    "We eat a slow breakfast together and set the tone for the day.":
      "نَتَنَاوَلُ فَطُورًا هَادِئًا مَعًا وَنَضَعُ إِيقَاعَ اليَوْم.",
    "We share a slow weekend breakfast - the morning is ours.":
      "نَتَشَارَكُ فَطُورَ نِهَايَةِ الأُسْبُوعِ الهَادِئ - الصَّبَاحُ لَنَا.",
    "We share a slow weekend morning together over breakfast.":
      "نَقْضِي صَبَاحَ العُطْلَةِ الهَادِئَ مَعًا عَلَى الفَطُور.",
    "I focus on the heaviest cognitive task of the day.":
      "أُرَكِّزُ عَلَى أَثْقَلِ مُهِمَّةٍ ذِهْنِيَّةٍ فِي يَوْمِي.",
    "I run a second cognitive sprint and finish today's commitments.":
      "أُنْجِزُ سِبَاقًا ذِهْنِيًّا ثَانِيًا وَأُكْمِلُ اِلْتِزَامَاتِ يَوْمِي.",
    "I keep this block lighter - emails and reviews after Jumu'ah.":
      "أُبْقِي هَذِهِ الكُتْلَةَ خَفِيفَةً - رَسَائِلُ وَمُرَاجَعَاتٌ بَعْدَ الجُمُعَة.",
    "I study senior engineering - system design, DDIA, architecture.":
      "أَدْرُسُ هَنْدَسَةَ الأَنْظِمَةِ وَكِتَابَ DDIA وَالمِعْمَارِيَّة.",
    "I sharpen my leadership and staff-engineer skills.":
      "أَصْقُلُ مَهَارَاتِي القِيَادِيَّةَ وَمَهَارَاتِ مُهَنْدِسِ القِيَادَة.",
    "I dive deep into CQRS, event sourcing, and Laravel patterns.":
      "أَتَعَمَّقُ فِي CQRS وَتَدْفُقِ الأَحْدَاثِ وَأَنْمَاطِ Laravel.",
    "I whiteboard a real-world system-design case.":
      "أَرْسُمُ عَلَى اللَّوْحِ حَالَةَ تَصْمِيمِ نِظَامٍ حَقِيقِيَّة.",
    "I read code and research my next blog post.":
      "أَقْرَأُ الكُودَ وَأَبْحَثُ لِمَقَالِيَ القَادِم.",
    "I sync with my team and share my top three tasks and blockers.":
      "أَلْتَقِي بِفَرِيقِي وَأُشَارِكُ أَهَمَّ ثَلَاثِ مَهَامَّ وَالعَوَائِق.",
    "I execute tickets in pair with Claude.":
      "أُنْجِزُ المَهَامَّ بِالتَّعَاوُنِ مَعَ Claude.",
    "I wrap loose ends before Jumu'ah.":
      "أُنْهِي مَا تَبَقَّى قَبْلَ صَلَاةِ الجُمُعَة.",
    "We pray Dhuhr and eat lunch together with devices away.":
      "نُصَلِّي الظُّهْرَ وَنَتَنَاوَلُ الغَدَاءَ مَعًا بَعِيدًا عَنِ الأَجْهِزَة.",
    "We share an extended weekend lunch together with devices away.":
      "نَتَشَارَكُ غَدَاءً مُمَدَّدًا مَعًا فِي العُطْلَةِ بَعِيدًا عَنِ الأَجْهِزَة.",
    "I take a sixty-minute sunnah nap that restores my afternoon focus.":
      "أَنَامُ قَيْلُولَةَ السُّنَّةِ سِتِّينَ دَقِيقَةً تُعِيدُ تَرْكِيزِي بَعْدَ الظُّهْر.",
    "I rest for sixty minutes after Jumu'ah.":
      "أَسْتَرِيحُ سِتِّينَ دَقِيقَةً بَعْدَ صَلَاةِ الجُمُعَة.",
    "I take a ninety-minute weekend rest to recharge.":
      "أَسْتَرِيحُ تِسْعِينَ دَقِيقَةً فِي العُطْلَةِ لِأَسْتَعِيدَ نَشَاطِي.",
    "I stretch and sip tea to reset focus before the second block.":
      "أَتَمَدَّدُ وَأَحْتَسِي الشَّايَ لِأُجَدِّدَ تَرْكِيزِي قَبْلَ الكُتْلَةِ الثَّانِيَة.",
    "I pray Asr and take a brief reset.":
      "أُصَلِّي العَصْرَ وَأَسْتَرِيحُ قَلِيلًا.",
    "I close loops, document my work, and prep tomorrow.":
      "أُغْلِقُ المَهَامَّ وَأُوَثِّقُ عَمَلِي وَأُجَهِّزُ لِلْغَد.",
    "I close loops early because date night is ahead.":
      "أُغْلِقُ المَهَامَّ مُبَكِّرًا اِسْتِعْدَادًا لِمَوْعِدِ المَسَاء.",
    "We walk, drink tea, and talk - phones are away.":
      "نَمْشِي وَنَحْتَسِي الشَّايَ وَنَتَحَدَّثُ بَعِيدًا عَنِ الهَوَاتِف.",
    "I pray Maghrib and recite the evening adhkar.":
      "أُصَلِّي المَغْرِبَ وَأَقْرَأُ أَذْكَارَ المَسَاء.",
    "We eat dinner together with our phones away.":
      "نَتَنَاوَلُ العَشَاءَ مَعًا بَعِيدًا عَنِ الهَوَاتِف.",
    "We share dinner out or a special meal at home - phones away.":
      "نَتَنَاوَلُ العَشَاءَ خَارِجًا أَوْ مَائِدَةً خَاصَّةً فِي البَيْتِ بَعِيدًا عَنِ الهَوَاتِف.",
    "I pray Esha and pray witr before sleep.":
      "أُصَلِّي العِشَاءَ وَأَخْتِمُ بِالوِتْرِ قَبْلَ النَّوْم.",
    "We pray Esha together at home.":
      "نُصَلِّي العِشَاءَ مَعًا فِي البَيْت.",
    "I repeat and lock in today's hifz portion.":
      "أُكَرِّرُ مَقْطَعَ حِفْظِ اليَوْمِ وَأُثَبِّتُهُ.",
    "I do light tasks tonight; heavy work shifts to the weekend.":
      "أُنْجِزُ المَهَامَّ الخَفِيفَةَ اللَّيْلَةَ وَأُؤَجِّلُ الثَّقِيلَ لِنِهَايَةِ الأُسْبُوع.",
    "I do three hours of deep work to compensate for short weekday slots.":
      "أُنْجِزُ ثَلَاثَ سَاعَاتٍ مِنَ العَمَلِ العَمِيقِ لِأُعَوِّضَ سَاعَاتِ الأُسْبُوعِ القَصِيرَة.",
    "I spend a four-hour half-day in office for in-person presence.":
      "أَقْضِي نِصْفَ يَوْمٍ - أَرْبَعَ سَاعَاتٍ - حُضُورًا فِي المَكْتَب.",
    "I review today and plan my top three for tomorrow.":
      "أُرَاجِعُ يَوْمِي وَأُخَطِّطُ لِأَهَمِّ ثَلَاثِ مَهَامَّ لِلْغَد.",
    "I review the week thoroughly and set Monday before sleep.":
      "أُرَاجِعُ الأُسْبُوعَ بِدِقَّةٍ وَأُعِدُّ خُطَّةَ الاثْنَيْنِ قَبْلَ النَّوْم.",
    "I make ghusl, attend the khutbah and salah, and have lunch after.":
      "أَغْتَسِلُ غُسْلَ الجُمُعَةِ وَأَحْضُرُ الخُطْبَةَ وَالصَّلَاةَ ثُمَّ أَتَنَاوَلُ الغَدَاء.",
    "We freshen up and dress well - sunnah of the Jumu'ah evening.":
      "نَتَجَهَّزُ وَنَلْبَسُ أَجْمَلَ ثِيَابِنَا - سُنَّةُ مَسَاءِ الجُمُعَة.",
    "We read, recite, and make dua together.":
      "نَقْرَأُ وَنَتْلُو وَنَدْعُو مَعًا.",
    "I dedicate two and a half hours to a system-design project or hands-on lab.":
      "أُكَرِّسُ سَاعَتَيْنِ وَنِصْفًا لِمَشْرُوعِ تَصْمِيمِ نِظَامٍ أَوْ مُخْتَبَرٍ تَطْبِيقِيّ.",
    "We go out together - a walk, the market, dawah, anything.":
      "نَخْرُجُ مَعًا - مَشْيًا أَوْ سُوقًا أَوْ دَعْوَةً، أَيُّ شَيْءٍ مَعًا.",
    "We wind down together with our phones away.":
      "نَسْتَرْخِي مَعًا بَعِيدًا عَنِ الهَوَاتِف.",
    "I am fully present with my family - laptop closed.":
      "أَكُونُ حَاضِرًا تَمَامًا مَعَ عَائِلَتِي وَالحَاسُوبُ مُغْلَق.",
    "I review the week, plan the next, and batch blog ideas.":
      "أُرَاجِعُ الأُسْبُوعَ وَأُخَطِّطُ لِلْقَادِمِ وَأَجْمَعُ أَفْكَارَ المَقَالَات."
  },
  // Step-by-step plan per activity. Keys mirror arabicMap.
  detailsMap: {
    'Sleep - protected': {
      en: [
        'Lights out by 10:30 PM with devices in another room.',
        'Make wudu and recite the night adhkar before lying down.',
        'Sleep on the right side as the sunnah teaches.',
        'Set one alarm for 3:30 AM with full intention to rise.'
      ],
      ar: [
        'أُطْفِئُ الأَنْوَارَ قَبْلَ العَاشِرَةِ وَالنِّصْفِ وَأُبْعِدُ الأَجْهِزَة.',
        'أَتَوَضَّأُ وَأَقْرَأُ أَذْكَارَ النَّوْمِ قَبْلَ أَنْ أَنَامَ.',
        'أَنَامُ عَلَى شِقِّيَ الأَيْمَنِ اِتِّبَاعًا لِلسُّنَّة.',
        'أَضْبِطُ مُنَبِّهًا وَاحِدًا عَلَى ٣:٣٠ صَبَاحًا بِنِيَّةٍ صَادِقَةٍ لِلْقِيَام.'
      ]
    },
    'Tahajjud (4 rakah) + dua': {
      en: [
        'Wake at 3:30, make wudu, and use the siwak.',
        'Pray two rakat, then two more, with long sujood.',
        'Pray witr last and make dua with raised hands.',
        'Name each need - dunya and akhirah - one by one.'
      ],
      ar: [
        'أَسْتَيْقِظُ عَلَى ٣:٣٠ وَأَتَوَضَّأُ وَأَسْتَاكُ.',
        'أُصَلِّي رَكْعَتَيْنِ ثُمَّ رَكْعَتَيْنِ بِسُجُودٍ طَوِيل.',
        'أَخْتِمُ بِالوِتْرِ وَأَدْعُو بِيَدَيْنِ مَرْفُوعَتَيْن.',
        'أُسَمِّي كُلَّ حَاجَةٍ - دُنْيَا وَآخِرَة - وَاحِدَةً وَاحِدَة.'
      ]
    },
    'Fajr + morning adhkar': {
      en: [
        'Pray two rakat sunnah, then the fardh.',
        'Sit on the musalla until sunrise if possible.',
        'Recite the morning adhkar from Hisnul Muslim.',
        'Take brief tafakkur on the day ahead.'
      ],
      ar: [
        'أُصَلِّي رَكْعَتَيِ السُّنَّةِ ثُمَّ الفَرْض.',
        'أَجْلِسُ عَلَى المُصَلَّى إِلَى الشُّرُوقِ إِنْ أَمْكَن.',
        'أَقْرَأُ أَذْكَارَ الصَّبَاحِ مِنْ حِصْنِ المُسْلِم.',
        'أَتَفَكَّرُ قَلِيلًا فِي يَوْمِيَ القَادِم.'
      ]
    },
    'Fajr + Surah Al-Kahf': {
      en: [
        'Pray two rakat sunnah, then the fardh in jamaah.',
        'Recite the morning adhkar from Hisnul Muslim.',
        'Recite Surah Al-Kahf slowly with tadabbur.',
        'Reflect on each story - the cave, the gardens, Musa, Dhul-Qarnayn.'
      ],
      ar: [
        'أُصَلِّي رَكْعَتَيِ السُّنَّةِ ثُمَّ الفَرْضَ فِي جَمَاعَة.',
        'أَقْرَأُ أَذْكَارَ الصَّبَاحِ مِنْ حِصْنِ المُسْلِم.',
        'أَتْلُو سُورَةَ الكَهْفِ بِتَدَبُّرٍ وَتَأَنٍّ.',
        'أَتَأَمَّلُ القِصَصَ - الكَهْف، الجَنَّتَيْن، مُوسَى، ذُو القَرْنَيْن.'
      ]
    },
    'Arabic drill': {
      en: [
        'Open Anki and clear today’s vocab deck.',
        'Review five Quranic roots paired with current hifz.',
        'Read each word and its example sentence aloud.',
        'Note one new pattern in the vocabulary log.'
      ],
      ar: [
        'أَفْتَحُ Anki وَأُنْهِي مُفْرَدَاتِ اليَوْم.',
        'أُرَاجِعُ خَمْسَ جُذُورٍ قُرْآنِيَّةٍ مَعَ مَا أَحْفَظُهُ.',
        'أَقْرَأُ كُلَّ كَلِمَةٍ وَجُمْلَتَهَا بِصَوْتٍ مَسْمُوع.',
        'أُدَوِّنُ نَمَطًا جَدِيدًا فِي دَفْتَرِ المُفْرَدَات.'
      ]
    },
    'Arabic deep dive': {
      en: [
        'Pick one grammar topic and study its rules.',
        'Parse five Quranic ayat using i’rab.',
        'Conjugate today’s key verbs in all tenses.',
        'Trace each root to its derivatives.'
      ],
      ar: [
        'أَخْتَارُ بَابًا نَحْوِيًّا وَأَدْرُسُ قَوَاعِدَه.',
        'أُعْرِبُ خَمْسَ آيَاتٍ مِنَ القُرْآن.',
        'أُصَرِّفُ أَفْعَالَ اليَوْمِ فِي جَمِيعِ الأَزْمِنَة.',
        'أَتَتَبَّعُ كُلَّ جَذْرٍ إِلَى مُشْتَقَّاتِه.'
      ]
    },
    'Blog writing': {
      en: [
        'Open today’s draft and skim the outline.',
        'Write five hundred words without editing.',
        'Tighten the strongest paragraph and the headline.',
        'Save the draft or publish if it is ready.'
      ],
      ar: [
        'أَفْتَحُ مُسَوَّدَةَ اليَوْمِ وَأُرَاجِعُ خُطَّتِي.',
        'أَكْتُبُ خَمْسَمِائَةِ كَلِمَةٍ دُونَ تَحْرِير.',
        'أُحَسِّنُ أَقْوَى فِقْرَةٍ وَالعُنْوَان.',
        'أَحْفَظُ المُسَوَّدَةَ أَوْ أَنْشُرُهَا إِنْ كَانَتْ جَاهِزَة.'
      ]
    },
    'Blog writing - long-form': {
      en: [
        'Research the topic for twenty minutes and gather sources.',
        'Outline the post in headings and key points.',
        'Draft each section without polishing.',
        'Edit, add code or visuals, and publish.'
      ],
      ar: [
        'أَبْحَثُ فِي المَوْضُوعِ عِشْرِينَ دَقِيقَةً وَأَجْمَعُ المَصَادِر.',
        'أُخَطِّطُ المَقَالَ بِالعَنَاوِينِ وَالنِّقَاطِ الرَّئِيسَة.',
        'أَكْتُبُ كُلَّ قِسْمٍ دُونَ تَنْقِيح.',
        'أُحَرِّرُ وَأُضِيفُ كُودًا أَوْ صُوَرًا ثُمَّ أَنْشُر.'
      ]
    },
    'Online madrasa class': {
      en: [
        'Join the live class five minutes early.',
        'Take notes in a single dated markdown file.',
        'Ask one clarifying question per lesson.',
        'Review the notes immediately after class.'
      ],
      ar: [
        'أَدْخُلُ الفَصْلَ المُبَاشِرَ قَبْلَ المَوْعِدِ بِخَمْسِ دَقَائِق.',
        'أُدَوِّنُ المُلَاحَظَاتِ فِي مِلَفِّ markdown مُؤَرَّخ.',
        'أَطْرَحُ سُؤَالًا تَوْضِيحِيًّا فِي كُلِّ دَرْس.',
        'أُرَاجِعُ المُلَاحَظَاتِ مُبَاشَرَةً بَعْدَ الدَّرْس.'
      ]
    },
    'Quran: 5 new ayahs + revision': {
      en: [
        'Listen to today’s portion from a qari twice.',
        'Recite each new ayah twenty times until smooth.',
        'Revise yesterday’s portion and the current page.',
        'Record yourself and review the tajwid.'
      ],
      ar: [
        'أَسْتَمِعُ إِلَى مَقْطَعِ اليَوْمِ مِنْ قَارِئٍ مَرَّتَيْن.',
        'أُكَرِّرُ كُلَّ آيَةٍ جَدِيدَةٍ عِشْرِينَ مَرَّةً حَتَّى تَثْبُت.',
        'أُرَاجِعُ مَقْطَعَ الأَمْسِ وَالصَّفْحَةَ الحَالِيَّة.',
        'أُسَجِّلُ نَفْسِي وَأُرَاجِعُ التَّجْوِيد.'
      ]
    },
    'VO2 max workout': {
      en: [
        'Warm up with five minutes of light movement.',
        'Run four sets of four-minute hard intervals.',
        'Add burpees, push-ups, or jumping jacks between sets.',
        'Cool down, stretch, and hydrate.'
      ],
      ar: [
        'أُحَمِّي جِسْمِي خَمْسَ دَقَائِقَ بِحَرَكَةٍ خَفِيفَة.',
        'أُؤَدِّي أَرْبَعَ مَجْمُوعَاتٍ بِأَرْبَعِ دَقَائِقَ مُكَثَّفَة.',
        'أُضِيفُ burpees وَضَغْطًا وَقَفْزًا بَيْنَ المَجْمُوعَات.',
        'أَبْرُدُ وَأَتَمَدَّدُ وَأَشْرَبُ المَاء.'
      ]
    },
    'Shower, breakfast, desk setup': {
      en: [
        'Take a cool shower to wake up the body.',
        'Eat a light, protein-led breakfast.',
        'Tidy the desk and silence notifications.',
        'Write the day’s top three tasks before opening Slack.'
      ],
      ar: [
        'أَسْتَحِمُّ بِمَاءٍ بَارِدٍ لِأُنْعِشَ جِسْمِي.',
        'أَتَنَاوَلُ فَطُورًا خَفِيفًا غَنِيًّا بِالبُرُوتِين.',
        'أُرَتِّبُ مَكْتَبِي وَأُسْكِتُ الإِشْعَارَات.',
        'أَكْتُبُ أَهَمَّ ثَلَاثِ مَهَامَّ قَبْلَ فَتْحِ Slack.'
      ]
    },
    'Coffee + Quality Time': {
      en: [
        'Brew coffee for both of us with no rush.',
        'Sit together at the table with phones away.',
        'Talk about the day ahead - no work topics.',
        'Make a brief dua together for the day.'
      ],
      ar: [
        'أُحَضِّرُ القَهْوَةَ لَنَا بِلَا اِسْتِعْجَال.',
        'نَجْلِسُ مَعًا عَلَى الطَّاوِلَةِ وَالهَوَاتِفُ بَعِيدَة.',
        'نَتَحَدَّثُ عَنْ يَوْمِنَا - دُونَ مَوَاضِيعِ العَمَل.',
        'نَدْعُو دُعَاءً قَصِيرًا مَعًا لِلْيَوْم.'
      ]
    },
    'Slow breakfast + Quality Time': {
      en: [
        'Cook or plate breakfast together.',
        'Sit at the table - no phones, no screens.',
        'Share one gratitude and one intention.',
        'End with a small dua before leaving the table.'
      ],
      ar: [
        'نُحَضِّرُ الفَطُورَ مَعًا أَوْ نُقَدِّمُه.',
        'نَجْلِسُ عَلَى الطَّاوِلَةِ بَعِيدًا عَنِ الأَجْهِزَة.',
        'يَذْكُرُ كُلٌّ مِنَّا نِعْمَةً وَنِيَّة.',
        'نَخْتِمُ بِدُعَاءٍ قَصِيرٍ قَبْلَ القِيَام.'
      ]
    },
    'Breakfast + Quality Time': {
      en: [
        'Eat together, slowly, with no devices.',
        'Talk about plans for the weekend day.',
        'Share a gratitude before leaving the table.',
        'Tidy the table together when finished.'
      ],
      ar: [
        'نَتَنَاوَلُ الفَطُورَ مَعًا بِتَأَنٍّ بِلَا أَجْهِزَة.',
        'نَتَحَدَّثُ عَنْ خُطَطِ نِهَايَةِ الأُسْبُوع.',
        'نَذْكُرُ نِعْمَةً قَبْلَ أَنْ نَقُومَ مِنَ الطَّاوِلَة.',
        'نُرَتِّبُ الطَّاوِلَةَ مَعًا بَعْدَ الاِنْتِهَاء.'
      ]
    },
    'Office: deep work block 1': {
      en: [
        'Open only the priority task and close all other tabs.',
        'Silence Slack and put the phone face down.',
        'Run a single ninety-minute focused sprint.',
        'Park side-tasks in a list - do not chase them.'
      ],
      ar: [
        'أَفْتَحُ المَهَمَّةَ ذَاتَ الأَوْلَوِيَّةِ فَقَطْ وَأُغْلِقُ بَقِيَّةَ التَّبْوِيبَات.',
        'أُسْكِتُ Slack وَأَقْلِبُ هَاتِفِي.',
        'أُنْجِزُ سِبَاقَ تَرْكِيزٍ وَاحِدًا تِسْعِينَ دَقِيقَة.',
        'أُدَوِّنُ المَهَامَّ الجَانِبِيَّةَ فِي قَائِمَةِ اِنْتِظَارٍ دُونَ مُلَاحَقَتِهَا.'
      ]
    },
    'Office: deep work block 2': {
      en: [
        'Pick the second hardest task on the list.',
        'Run another ninety-minute focused sprint.',
        'Ship something concrete before the wrap-up.',
        'Commit changes and push at the block’s end.'
      ],
      ar: [
        'أَخْتَارُ ثَانِيَ أَصْعَبِ مَهَمَّةٍ فِي قَائِمَتِي.',
        'أُنْجِزُ سِبَاقَ تَرْكِيزٍ آخَرَ تِسْعِينَ دَقِيقَة.',
        'أُسَلِّمُ شَيْئًا مَلْمُوسًا قَبْلَ الإِنْهَاء.',
        'أَرْفَعُ التَّعْدِيلَاتِ بِنِهَايَةِ الكُتْلَة.'
      ]
    },
    'Self-learning (in office time)': {
      en: [
        'Open the current senior-engineering track.',
        'Read or watch for forty-five focused minutes.',
        'Take notes in a permanent knowledge base.',
        'Apply one idea to a real task before standing up.'
      ],
      ar: [
        'أَفْتَحُ مَسَارَ هَنْدَسَةِ الأَنْظِمَةِ الحَالِيّ.',
        'أَقْرَأُ أَوْ أُشَاهِدُ خَمْسًا وَأَرْبَعِينَ دَقِيقَةً بِتَرْكِيز.',
        'أُدَوِّنُ المُلَاحَظَاتِ فِي قَاعِدَةِ مَعْرِفَتِي الدَّائِمَة.',
        'أُطَبِّقُ فِكْرَةً وَاحِدَةً عَلَى مَهَمَّةٍ فِعْلِيَّةٍ قَبْلَ القِيَام.'
      ]
    },
    'Self-learning deep block': {
      en: [
        'Pick one system-design or architecture project.',
        'Build a small hands-on lab around it.',
        'Document what worked and what failed.',
        'Publish the writeup or push the code.'
      ],
      ar: [
        'أَخْتَارُ مَشْرُوعَ تَصْمِيمِ نِظَامٍ أَوْ مِعْمَارِيَّة.',
        'أَبْنِي مُخْتَبَرًا تَطْبِيقِيًّا صَغِيرًا لَه.',
        'أُوَثِّقُ مَا نَجَحَ وَمَا أَخْفَق.',
        'أَنْشُرُ المَقَالَ أَوْ أَرْفَعُ الكُود.'
      ]
    },
    'Team huddle + plan share': {
      en: [
        'List the top three tasks for today before joining.',
        'Share blockers clearly and ask for help if needed.',
        'Listen to teammates and note where to support.',
        'Align on the day’s biggest commitment.'
      ],
      ar: [
        'أُحَدِّدُ أَهَمَّ ثَلَاثِ مَهَامِّ اليَوْمِ قَبْلَ الاِجْتِمَاع.',
        'أُشَارِكُ العَوَائِقَ بِوُضُوحٍ وَأَطْلُبُ المُسَاعَدَةَ عِنْدَ الحَاجَة.',
        'أَسْتَمِعُ لِلْفَرِيقِ وَأُدَوِّنُ أَيْنَ أَدْعَمُهُم.',
        'نَتَّفِقُ عَلَى أَكْبَرِ اِلْتِزَامِ اليَوْم.'
      ]
    },
    'Office work (Claude-assisted)': {
      en: [
        'Open the next ticket and read it twice.',
        'Plan the change with Claude before coding.',
        'Implement, write tests, and self-review the diff.',
        'Ship the PR with a clear description.'
      ],
      ar: [
        'أَفْتَحُ المَهَمَّةَ التَّالِيَةَ وَأَقْرَأُهَا مَرَّتَيْن.',
        'أُخَطِّطُ التَّعْدِيلَ مَعَ Claude قَبْلَ الكِتَابَة.',
        'أُنَفِّذُ وَأَكْتُبُ الاِخْتِبَارَاتِ وَأُرَاجِعُ الفَرْق.',
        'أَرْفَعُ المَهَمَّةَ بِوَصْفٍ وَاضِح.'
      ]
    },
    'Dhuhr + lunch + Quality Time': {
      en: [
        'Pray Dhuhr together as soon as the adhan is heard.',
        'Eat lunch slowly at the table - phones away.',
        'Share one win and one challenge from the morning.',
        'Take a brief walk before returning to work.'
      ],
      ar: [
        'نُصَلِّي الظُّهْرَ مَعًا فَوْرَ سَمَاعِ الأَذَان.',
        'نَتَنَاوَلُ الغَدَاءَ بِتَأَنٍّ عَلَى الطَّاوِلَةِ بَعِيدًا عَنِ الهَوَاتِف.',
        'نَتَشَارَكُ نَجَاحًا وَتَحَدِّيًا مِنَ الصَّبَاح.',
        'نَتَمَشَّى قَلِيلًا قَبْلَ العَوْدَةِ لِلْعَمَل.'
      ]
    },
    'Qaylulah (nap) - sunnah rest': {
      en: [
        'Make wudu and dim the room.',
        'Lay on the right side for sixty minutes.',
        'Set one gentle alarm to wake up.',
        'Splash water on the face after waking.'
      ],
      ar: [
        'أَتَوَضَّأُ وَأُعَتِّمُ الغُرْفَة.',
        'أَسْتَلْقِي عَلَى شِقِّيَ الأَيْمَنِ سِتِّينَ دَقِيقَة.',
        'أَضْبِطُ مُنَبِّهًا هَادِئًا وَاحِدًا.',
        'أَغْسِلُ وَجْهِي عِنْدَ الاِسْتِيقَاظ.'
      ]
    },
    'Long nap + true rest': {
      en: [
        'Make wudu and prepare a dark, cool room.',
        'Sleep for ninety minutes - one full cycle.',
        'Wake gently with a soft alarm.',
        'Pray two rakat and drink water before returning to the day.'
      ],
      ar: [
        'أَتَوَضَّأُ وَأُجَهِّزُ غُرْفَةً مُعْتِمَةً بَارِدَة.',
        'أَنَامُ تِسْعِينَ دَقِيقَةً - دَوْرَةً كَامِلَة.',
        'أَسْتَيْقِظُ بِلُطْفٍ مَعَ مُنَبِّهٍ نَاعِم.',
        'أُصَلِّي رَكْعَتَيْنِ وَأَشْرَبُ المَاءَ قَبْلَ العَوْدَة.'
      ]
    },
    'Tea, light movement, focus reset': {
      en: [
        'Brew a small pot of tea slowly.',
        'Stretch the back, shoulders, and neck.',
        'Walk briefly and look at something far away.',
        'Re-open the task list and pick the next thing.'
      ],
      ar: [
        'أُحَضِّرُ إِبْرِيقَ شَايٍ صَغِيرًا بِتَأَنٍّ.',
        'أَتَمَدَّدُ - الظَّهْر وَالكَتِفَيْن وَالرَّقَبَة.',
        'أَتَمَشَّى قَلِيلًا وَأَنْظُرُ إِلَى بَعِيد.',
        'أَفْتَحُ قَائِمَةَ المَهَامِّ وَأَخْتَارُ التَّالِي.'
      ]
    },
    'Asr': {
      en: [
        'Stop work the moment the adhan is heard.',
        'Make wudu unhurriedly.',
        'Pray Asr with khushu.',
        'Take three minutes of dhikr before returning.'
      ],
      ar: [
        'أَتْرُكُ العَمَلَ فَوْرَ سَمَاعِ الأَذَان.',
        'أَتَوَضَّأُ بِتَأَنٍّ.',
        'أُصَلِّي العَصْرَ بِخُشُوع.',
        'أَذْكُرُ اللَّهَ ثَلَاثَ دَقَائِقَ قَبْلَ العَوْدَة.'
      ]
    },
    'Office wrap-up + handoff notes': {
      en: [
        'Close all open tickets in IDE and browser.',
        'Write a short handoff note for the team.',
        'Set tomorrow’s top three on a sticky note.',
        'Shut the laptop fully - the work day is done.'
      ],
      ar: [
        'أُغْلِقُ جَمِيعَ المَهَامِّ المَفْتُوحَة.',
        'أَكْتُبُ مُلَاحَظَةَ تَسْلِيمٍ قَصِيرَةً لِلْفَرِيق.',
        'أُحَدِّدُ أَهَمَّ ثَلَاثِ مَهَامِّ الغَدِ عَلَى وَرَقَة.',
        'أُغْلِقُ الحَاسُوبَ تَمَامًا - اِنْتَهَى يَوْمُ العَمَل.'
      ]
    },
    'Wind-down + Quality Time': {
      en: [
        'Step away from the desk and out of the office mood.',
        'Take a short walk together - phones in pocket.',
        'Sip tea and talk about anything but work.',
        'End at the door with a warm smile.'
      ],
      ar: [
        'أَبْتَعِدُ عَنِ المَكْتَبِ وَأَخْرُجُ مِنْ مَزَاجِ العَمَل.',
        'نَتَمَشَّى قَصِيرًا مَعًا وَالهَوَاتِفُ فِي الجَيْب.',
        'نَحْتَسِي الشَّايَ وَنَتَحَدَّثُ فِي أَيِّ شَيْءٍ غَيْرِ العَمَل.',
        'نَخْتِمُ عِنْدَ البَابِ بِاِبْتِسَامَةٍ دَافِئَة.'
      ]
    },
    'Maghrib': {
      en: [
        'Pray Maghrib in jamaah if possible.',
        'Pray two rakat sunnah after the fardh.',
        'Recite the evening adhkar from Hisnul Muslim.',
        'Brief tafakkur on the day before standing up.'
      ],
      ar: [
        'أُصَلِّي المَغْرِبَ فِي جَمَاعَةٍ إِنْ أَمْكَن.',
        'أُصَلِّي رَكْعَتَيِ السُّنَّةِ بَعْدَ الفَرْض.',
        'أَقْرَأُ أَذْكَارَ المَسَاءِ مِنْ حِصْنِ المُسْلِم.',
        'أَتَفَكَّرُ قَلِيلًا فِي يَوْمِي قَبْلَ القِيَام.'
      ]
    },
    'Dinner + family time': {
      en: [
        'Eat dinner at the table - phones in another room.',
        'Make light conversation with the family.',
        'Share a gratitude and a small win from the day.',
        'Help with clearing the table.'
      ],
      ar: [
        'نَتَعَشَّى عَلَى الطَّاوِلَةِ وَالهَوَاتِفُ فِي غُرْفَةٍ أُخْرَى.',
        'نَتَحَدَّثُ بِخِفَّةٍ مَعَ العَائِلَة.',
        'نَذْكُرُ نِعْمَةً وَنَجَاحًا صَغِيرًا.',
        'نُسَاعِدُ فِي تَرْتِيبِ الطَّاوِلَة.'
      ]
    },
    'Esha': {
      en: [
        'Make wudu and pray two rakat sunnah.',
        'Pray Esha in jamaah or at home.',
        'Pray witr at the end of the night.',
        'Make brief dua before standing up.'
      ],
      ar: [
        'أَتَوَضَّأُ وَأُصَلِّي رَكْعَتَيِ السُّنَّة.',
        'أُصَلِّي العِشَاءَ فِي جَمَاعَةٍ أَوْ فِي البَيْت.',
        'أَخْتِمُ بِالوِتْرِ فِي آخِرِ اللَّيْل.',
        'أَدْعُو دُعَاءً قَصِيرًا قَبْلَ القِيَام.'
      ]
    },
    'Esha (together)': {
      en: [
        'Make wudu together and pray sunnah.',
        'Pray Esha together at home.',
        'Recite an ayah and share its meaning.',
        'End with a joint dua.'
      ],
      ar: [
        'نَتَوَضَّأُ مَعًا وَنُصَلِّي السُّنَّة.',
        'نُصَلِّي العِشَاءَ مَعًا فِي البَيْت.',
        'نَتْلُو آيَةً وَنَتَدَارَسُ مَعْنَاهَا.',
        'نَخْتِمُ بِدُعَاءٍ مُشْتَرَك.'
      ]
    },
    'Quran memorization deep session': {
      en: [
        'Repeat today’s new portion twenty times slowly.',
        'Recite the new portion to a partner or recording.',
        'Check tajwid against a qari recording.',
        'Connect today’s portion to yesterday’s smoothly.'
      ],
      ar: [
        'أُكَرِّرُ مَقْطَعَ اليَوْمِ الجَدِيدَ عِشْرِينَ مَرَّةً بِتَأَنٍّ.',
        'أَتْلُوهُ عَلَى شَرِيكٍ أَوْ تَسْجِيل.',
        'أُرَاجِعُ التَّجْوِيدَ مَعَ تَسْجِيلِ قَارِئ.',
        'أَرْبِطُ مَقْطَعَ اليَوْمِ بِمَقْطَعِ الأَمْسِ بِسَلَاسَة.'
      ]
    },
    'Part-time job': {
      en: [
        'Open the current part-time ticket.',
        'Focus thirty minutes without breaks.',
        'Ship a small visible update.',
        'Log the time and write a one-line note for tomorrow.'
      ],
      ar: [
        'أَفْتَحُ مَهَمَّةَ العَمَلِ الجُزْئِيِّ الحَالِيَّة.',
        'أُرَكِّزُ ثَلَاثِينَ دَقِيقَةً دُونَ اِنْقِطَاع.',
        'أُسَلِّمُ تَحْدِيثًا صَغِيرًا وَاضِحًا.',
        'أُسَجِّلُ الوَقْتَ وَأَكْتُبُ سَطْرًا لِلْغَد.'
      ]
    },
    'Part-time job - heavy block': {
      en: [
        'Set one milestone-level goal for the three-hour block.',
        'Silence all notifications and lock the door.',
        'Work in three deep sprints with short breaks.',
        'Commit, push, and write a status update at the end.'
      ],
      ar: [
        'أُحَدِّدُ هَدَفًا كَبِيرًا لِلْكُتْلَةِ الطَّوِيلَة.',
        'أُسْكِتُ كُلَّ الإِشْعَارَاتِ وَأُغْلِقُ البَاب.',
        'أَعْمَلُ ثَلَاثَ سِبَاقَاتٍ عَمِيقَةٍ بِفَوَاصِلَ قَصِيرَة.',
        'أَرْفَعُ التَّعْدِيلَاتِ وَأَكْتُبُ تَقْرِيرَ الحَالَةِ آخِرًا.'
      ]
    },
    'Part-time office visit': {
      en: [
        'Travel to the office in time for the standup.',
        'Pair on at least one task in person.',
        'Hold one in-person sync with a peer.',
        'Note the key takeaways in the part-time log.'
      ],
      ar: [
        'أَذْهَبُ إِلَى المَكْتَبِ فِي وَقْتِ الاِجْتِمَاعِ اليَوْمِيّ.',
        'أُقَرِّنُ العَمَلَ مَعَ زَمِيلٍ عَلَى الأَقَلِّ فِي مَهَمَّة.',
        'أَعْقِدُ لِقَاءً مُبَاشِرًا مَعَ زَمِيل.',
        'أُدَوِّنُ أَهَمَّ الخُلَاصَاتِ فِي سِجِلِّ العَمَل.'
      ]
    },
    'Journaling + next-day plan': {
      en: [
        'Write three sentences about today - one win, one lesson, one shukr.',
        'List tomorrow’s top three tasks in priority order.',
        'Note the first action of the morning.',
        'Close the journal with a short dua.'
      ],
      ar: [
        'أَكْتُبُ ثَلَاثَ جُمَلٍ عَنْ يَوْمِي - نَجَاح، دَرْس، شُكْر.',
        'أُحَدِّدُ أَهَمَّ ثَلَاثِ مَهَامِّ الغَدِ بِالتَّرْتِيب.',
        'أُحَدِّدُ أَوَّلَ عَمَلٍ لِلْصَّبَاح.',
        'أَخْتِمُ الدَّفْتَرَ بِدُعَاءٍ قَصِير.'
      ]
    },
    'Journaling + week-ahead plan': {
      en: [
        'Review the past week’s wins, lessons, and shukr.',
        'Plan the coming week by area - deen, work, family.',
        'Set Monday’s top three tasks before sleeping.',
        'Close with a long dua for the week ahead.'
      ],
      ar: [
        'أُرَاجِعُ نَجَاحَاتِ الأُسْبُوعِ وَدُرُوسَهُ وَشُكْرَه.',
        'أُخَطِّطُ الأُسْبُوعَ القَادِمَ بِالمَجَالَاتِ - دِين، عَمَل، عَائِلَة.',
        'أُحَدِّدُ أَهَمَّ ثَلَاثِ مَهَامِّ الاِثْنَيْنِ قَبْلَ النَّوْم.',
        'أَخْتِمُ بِدُعَاءٍ مُطَوَّلٍ لِلْأُسْبُوعِ القَادِم.'
      ]
    },
    "Ghusl + Jumu'ah prayer + lunch": {
      en: [
        'Make ghusl, wear the best clothes, and apply perfume.',
        'Walk to the mosque early and complete Surah Al-Kahf if not yet done.',
        'Listen attentively to the khutbah and pray Jumu’ah.',
        'Eat lunch with family after returning home.'
      ],
      ar: [
        'أَغْتَسِلُ وَأَلْبَسُ أَجْمَلَ ثِيَابِي وَأَتَطَيَّب.',
        'أَذْهَبُ إِلَى المَسْجِدِ مُبَكِّرًا وَأُكْمِلُ سُورَةَ الكَهْفِ إِنْ لَمْ أَقْرَأ.',
        'أُنْصِتُ لِلْخُطْبَةِ وَأُصَلِّي الجُمُعَة.',
        'أَتَنَاوَلُ الغَدَاءَ مَعَ العَائِلَةِ بَعْدَ العَوْدَة.'
      ]
    },
    'Date-night prep': {
      en: [
        'Shower, dress well, and apply perfume - sunnah of presence.',
        'Tidy our shared space and dim the lights.',
        'Agree on a no-phones rule for the evening.',
        'Plan one small surprise or thoughtful detail.'
      ],
      ar: [
        'أَسْتَحِمُّ وَأَلْبَسُ جَيِّدًا وَأَتَطَيَّبُ - سُنَّةُ الحُضُور.',
        'نُرَتِّبُ مَكَانَنَا المُشْتَرَكَ وَنُخَفِّفُ الإِضَاءَة.',
        'نَتَّفِقُ عَلَى لَيْلَةٍ بِدُونِ هَوَاتِف.',
        'أُجَهِّزُ مُفَاجَأَةً صَغِيرَةً أَوْ لَمْسَةً لَطِيفَة.'
      ]
    },
    'Date night dinner': {
      en: [
        'Dinner together - either out or a special meal at home.',
        'Phones stay in a bag or another room.',
        'Talk about us, our dreams, and gratitude - no logistics.',
        'Walk together after dinner if possible.'
      ],
      ar: [
        'نَتَعَشَّى مَعًا - فِي مَطْعَمٍ أَوْ بِوَجْبَةٍ خَاصَّةٍ فِي البَيْت.',
        'تَبْقَى الهَوَاتِفُ فِي حَقِيبَةٍ أَوْ غُرْفَةٍ أُخْرَى.',
        'نَتَحَدَّثُ عَنَّا وَأَحْلَامِنَا وَنِعَمِنَا - لَا لُوجِسْتِيَّات.',
        'نَتَمَشَّى مَعًا بَعْدَ العَشَاءِ إِنْ أَمْكَن.'
      ]
    },
    'Quality Time + Quran together': {
      en: [
        'Pick a short surah or page to read together.',
        'Each of us recites a portion aloud.',
        'Discuss one ayah’s meaning and tafsir briefly.',
        'Make a joint dua at the end.'
      ],
      ar: [
        'نَخْتَارُ سُورَةً قَصِيرَةً أَوْ صَفْحَةً نَقْرَؤُهَا مَعًا.',
        'يَتْلُو كُلٌّ مِنَّا مَقْطَعًا بِصَوْتٍ مَسْمُوع.',
        'نَتَدَارَسُ مَعْنَى آيَةٍ وَتَفْسِيرَهَا قَلِيلًا.',
        'نَخْتِمُ بِدُعَاءٍ مُشْتَرَك.'
      ]
    },
    'Outing + Quality Time': {
      en: [
        'Decide together: walk, market, dawah, or visit family.',
        'Both phones go on silent in pockets.',
        'Make the outing about presence, not errands.',
        'End with chai or a small treat together.'
      ],
      ar: [
        'نَتَّفِقُ مَعًا - مَشْي، سُوق، دَعْوَة، أَوْ زِيَارَة.',
        'تُوضَعُ الهَوَاتِفُ صَامِتَةً فِي الجُيُوب.',
        'نَجْعَلُ الخُرُوجَ لِلْحُضُورِ لَا لِلْمَهَامّ.',
        'نَخْتِمُ بِشَايٍ أَوْ ضِيَافَةٍ صَغِيرَةٍ مَعًا.'
      ]
    },
    'Quality Time': {
      en: [
        'Sit together with phones in another room.',
        'Talk about anything but work or chores.',
        'Share one moment from today that mattered.',
        'End the day with a soft dua for each other.'
      ],
      ar: [
        'نَجْلِسُ مَعًا وَالهَوَاتِفُ فِي غُرْفَةٍ أُخْرَى.',
        'نَتَحَدَّثُ فِي أَيِّ شَيْءٍ غَيْرِ العَمَلِ أَوِ المَهَامّ.',
        'نَذْكُرُ لَحْظَةً مُهِمَّةً مِنَ اليَوْم.',
        'نَخْتِمُ يَوْمَنَا بِدُعَاءٍ لَطِيفٍ لِبَعْضِنَا.'
      ]
    },
    'Family evening': {
      en: [
        'Close the laptop fully - work is done.',
        'Sit with family, no devices around.',
        'Play a game, walk, or simply talk.',
        'End the night with hugs and a dua.'
      ],
      ar: [
        'أُغْلِقُ الحَاسُوبَ تَمَامًا - اِنْتَهَى العَمَل.',
        'أَجْلِسُ مَعَ عَائِلَتِي بِدُونِ أَجْهِزَة.',
        'نَلْعَبُ أَوْ نَتَمَشَّى أَوْ نَتَحَدَّث.',
        'نَخْتِمُ بِالأَحْضَانِ وَالدُّعَاء.'
      ]
    },
    'Weekly review + planning': {
      en: [
        'Review the past week - wins, lessons, missed reps.',
        'Plan the next week by area in a single doc.',
        'Batch three blog ideas for the week.',
        'Set Monday’s top three before standing up.'
      ],
      ar: [
        'أُرَاجِعُ الأُسْبُوعَ المَاضِيَ - نَجَاحَات، دُرُوس، تَكْرَارَات فَائِتَة.',
        'أُخَطِّطُ الأُسْبُوعَ القَادِمَ بِالمَجَالَاتِ فِي مُسْتَنَدٍ وَاحِد.',
        'أَجْمَعُ ثَلَاثَ أَفْكَارٍ لِلْمُدَوَّنَةِ لِلْأُسْبُوع.',
        'أُحَدِّدُ أَهَمَّ ثَلَاثِ مَهَامِّ الاِثْنَيْنِ قَبْلَ القِيَام.'
      ]
    }
  },
  days: [
    {
      key: 'mon',
      label: 'Mon',
      tag: 'Standard',
      name: 'Monday',
      focus: 'Full 24-hour Plan',
      schedule: [
        { time: '3:30 – 4:00', activity: 'Tahajjud (4 rakah) + dua', note: 'I rise in the blessed last third of the night and stand for my Lord.', type: 'deen' },
        { time: '4:00 – 4:30', activity: 'Fajr + morning adhkar', note: 'I pray Fajr and recite the morning adhkar from Hisnul Muslim.', type: 'deen' },
        { time: '4:30 – 4:50', activity: 'Arabic drill', note: 'I drill street and Quranic vocab paired with my current hifz.', type: 'growth' },
        { time: '4:50 – 5:30', activity: 'Blog writing', note: 'I draft, outline, or publish my blog for thirty minutes.', type: 'growth' },
        { time: '5:30 – 6:30', activity: 'Online madrasa class', note: 'I attend the live class and take careful notes.', type: 'deen' },
        { time: '6:30 – 7:00', activity: 'Quran: 5 new ayahs + revision', note: 'I memorize five new ayahs and revise the previous portions.', type: 'deen' },
        { time: '7:00 – 7:30', activity: 'VO2 max workout', note: 'I push my VO2 max with thirty minutes of equipment-free HIIT.', type: 'growth' },
        { time: '7:30 – 8:00', activity: 'Shower, breakfast, desk setup', note: 'I shower, eat breakfast, and prepare my desk for office mode.', type: 'rest' },
        { time: '8:00 – 8:30', activity: 'Coffee + Quality Time', note: 'I sip coffee with my wife and we start the day together - devices away.', type: 'wife' },
        { time: '8:30 – 10:00', activity: 'Office: deep work block 1', note: 'I focus on the heaviest cognitive task of the day.', type: 'work' },
        { time: '10:00 – 11:00', activity: 'Self-learning (in office time)', note: 'I study senior engineering - system design, DDIA, architecture.', type: 'growth' },
        { time: '11:00 – 11:30', activity: 'Team huddle + plan share', note: 'I sync with my team and share my top three tasks and blockers.', type: 'work' },
        { time: '11:30 – 1:00', activity: 'Office work (Claude-assisted)', note: 'I execute tickets in pair with Claude.', type: 'work' },
        { time: '1:00 – 1:30', activity: 'Dhuhr + lunch + Quality Time', note: 'We pray Dhuhr and eat lunch together with devices away.', type: 'deen' },
        { time: '1:30 – 2:30', activity: 'Qaylulah (nap) - sunnah rest', note: 'I take a sixty-minute sunnah nap that restores my afternoon focus.', type: 'sleep' },
        { time: '2:30 – 3:00', activity: 'Tea, light movement, focus reset', note: 'I stretch and sip tea to reset focus before the second block.', type: 'rest' },
        { time: '3:00 – 5:00', activity: 'Office: deep work block 2', note: "I run a second cognitive sprint and finish today's commitments.", type: 'work' },
        { time: '5:00 – 5:15', activity: 'Asr', note: 'I pray Asr and take a brief reset.', type: 'deen' },
        { time: '5:15 – 6:30', activity: 'Office wrap-up + handoff notes', note: 'I close loops, document my work, and prep tomorrow.', type: 'work' },
        { time: '6:30 – 7:00', activity: 'Wind-down + Quality Time', note: 'We walk, drink tea, and talk - phones are away.', type: 'wife' },
        { time: '7:00 – 7:15', activity: 'Maghrib', note: 'I pray Maghrib and recite the evening adhkar.', type: 'deen' },
        { time: '7:15 – 8:15', activity: 'Dinner + family time', note: 'We eat dinner together with our phones away.', type: 'wife' },
        { time: '8:15 – 8:45', activity: 'Esha', note: 'I pray Esha and pray witr before sleep.', type: 'deen' },
        { time: '8:45 – 9:30', activity: 'Quran memorization deep session', note: "I repeat and lock in today's hifz portion.", type: 'deen' },
        { time: '9:30 – 10:00', activity: 'Part-time job', note: 'I do light tasks tonight; heavy work shifts to the weekend.', type: 'growth' },
        { time: '10:00 – 10:30', activity: 'Journaling + next-day plan', note: 'I review today and plan my top three for tomorrow.', type: 'rest' },
        { time: '10:30 PM – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep five hours by night plus one hour Qaylulah - six in total.', type: 'sleep' }
      ],
      summary: [
        { label: 'Sleep', value: '6 hr' },
        { label: 'Deen', value: '~4 hr' },
        { label: 'Office', value: '7 hr' },
        { label: 'Self-learn', value: '1 hr' },
        { label: 'Part-time', value: '0.5 hr' },
        { label: 'Wife/Family', value: '~3 hr' }
      ]
    },
    {
      key: 'tue',
      label: 'Tue',
      tag: 'Standard',
      name: 'Tuesday',
      focus: 'Full 24-hour Plan',
      schedule: [
        { time: '12:00 – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep deeply so I rise ready for Tahajjud.', type: 'sleep' },
        { time: '3:30 – 4:00', activity: 'Tahajjud (4 rakah) + dua', note: 'I rise in the blessed last third of the night and stand for my Lord.', type: 'deen' },
        { time: '4:00 – 4:30', activity: 'Fajr + morning adhkar', note: 'I pray Fajr and recite the morning adhkar from Hisnul Muslim.', type: 'deen' },
        { time: '4:30 – 4:50', activity: 'Arabic drill', note: 'I drill street and Quranic vocab paired with my current hifz.', type: 'growth' },
        { time: '4:50 – 5:30', activity: 'Blog writing', note: 'I draft, outline, or publish my blog for thirty minutes.', type: 'growth' },
        { time: '5:30 – 6:30', activity: 'Online madrasa class', note: 'I attend the live class and take careful notes.', type: 'deen' },
        { time: '6:30 – 7:00', activity: 'Quran: 5 new ayahs + revision', note: 'I memorize five new ayahs and revise the previous portions.', type: 'deen' },
        { time: '7:00 – 7:30', activity: 'VO2 max workout', note: 'I push my VO2 max with thirty minutes of equipment-free HIIT.', type: 'growth' },
        { time: '7:30 – 8:00', activity: 'Shower, breakfast, desk setup', note: 'I shower, eat breakfast, and prepare my desk for office mode.', type: 'rest' },
        { time: '8:00 – 8:30', activity: 'Coffee + Quality Time', note: 'I sip coffee with my wife and we start the day together - devices away.', type: 'wife' },
        { time: '8:30 – 10:00', activity: 'Office: deep work block 1', note: 'I focus on the heaviest cognitive task of the day.', type: 'work' },
        { time: '10:00 – 11:00', activity: 'Self-learning (in office time)', note: 'I sharpen my leadership and staff-engineer skills.', type: 'growth' },
        { time: '11:00 – 11:30', activity: 'Team huddle + plan share', note: 'I sync with my team and share my top three tasks and blockers.', type: 'work' },
        { time: '11:30 – 1:00', activity: 'Office work (Claude-assisted)', note: 'I execute tickets in pair with Claude.', type: 'work' },
        { time: '1:00 – 1:30', activity: 'Dhuhr + lunch + Quality Time', note: 'We pray Dhuhr and eat lunch together with devices away.', type: 'deen' },
        { time: '1:30 – 2:30', activity: 'Qaylulah (nap) - sunnah rest', note: 'I take a sixty-minute sunnah nap that restores my afternoon focus.', type: 'sleep' },
        { time: '2:30 – 3:00', activity: 'Tea, light movement, focus reset', note: 'I stretch and sip tea to reset focus before the second block.', type: 'rest' },
        { time: '3:00 – 5:00', activity: 'Office: deep work block 2', note: "I run a second cognitive sprint and finish today's commitments.", type: 'work' },
        { time: '5:00 – 5:15', activity: 'Asr', note: 'I pray Asr and take a brief reset.', type: 'deen' },
        { time: '5:15 – 6:30', activity: 'Office wrap-up + handoff notes', note: 'I close loops, document my work, and prep tomorrow.', type: 'work' },
        { time: '6:30 – 7:00', activity: 'Wind-down + Quality Time', note: 'We walk, drink tea, and talk - phones are away.', type: 'wife' },
        { time: '7:00 – 7:15', activity: 'Maghrib', note: 'I pray Maghrib and recite the evening adhkar.', type: 'deen' },
        { time: '7:15 – 8:15', activity: 'Dinner + family time', note: 'We eat dinner together with our phones away.', type: 'wife' },
        { time: '8:15 – 8:45', activity: 'Esha', note: 'I pray Esha and pray witr before sleep.', type: 'deen' },
        { time: '8:45 – 9:30', activity: 'Quran memorization deep session', note: "I repeat and lock in today's hifz portion.", type: 'deen' },
        { time: '9:30 – 10:00', activity: 'Part-time job', note: 'I do light tasks tonight; heavy work shifts to the weekend.', type: 'growth' },
        { time: '10:00 – 10:30', activity: 'Journaling + next-day plan', note: 'I review today and plan my top three for tomorrow.', type: 'rest' },
        { time: '10:30 PM – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep five hours by night plus one hour Qaylulah - six in total.', type: 'sleep' }
      ],
      summary: [
        { label: 'Sleep', value: '6 hr' },
        { label: 'Deen', value: '~4 hr' },
        { label: 'Office', value: '7 hr' },
        { label: 'Self-learn', value: '1 hr' },
        { label: 'Part-time', value: '0.5 hr' },
        { label: 'Wife/Family', value: '~3 hr' }
      ]
    },
    {
      key: 'wed',
      label: 'Wed',
      tag: 'Standard',
      name: 'Wednesday',
      focus: 'Full 24-hour Plan',
      schedule: [
        { time: '12:00 – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep deeply so I rise ready for Tahajjud.', type: 'sleep' },
        { time: '3:30 – 4:00', activity: 'Tahajjud (4 rakah) + dua', note: 'I rise in the blessed last third of the night and stand for my Lord.', type: 'deen' },
        { time: '4:00 – 4:30', activity: 'Fajr + morning adhkar', note: 'I pray Fajr and recite the morning adhkar from Hisnul Muslim.', type: 'deen' },
        { time: '4:30 – 4:50', activity: 'Arabic drill', note: 'I drill street and Quranic vocab paired with my current hifz.', type: 'growth' },
        { time: '4:50 – 5:30', activity: 'Blog writing', note: 'I draft, outline, or publish my blog for thirty minutes.', type: 'growth' },
        { time: '5:30 – 6:30', activity: 'Online madrasa class', note: 'I attend the live class and take careful notes.', type: 'deen' },
        { time: '6:30 – 7:00', activity: 'Quran: 5 new ayahs + revision', note: 'I memorize five new ayahs and revise the previous portions.', type: 'deen' },
        { time: '7:00 – 7:30', activity: 'VO2 max workout', note: 'I push my VO2 max with thirty minutes of equipment-free HIIT.', type: 'growth' },
        { time: '7:30 – 8:00', activity: 'Shower, breakfast, desk setup', note: 'I shower, eat breakfast, and prepare my desk for office mode.', type: 'rest' },
        { time: '8:00 – 8:30', activity: 'Coffee + Quality Time', note: 'I sip coffee with my wife and we start the day together - devices away.', type: 'wife' },
        { time: '8:30 – 10:00', activity: 'Office: deep work block 1', note: 'I focus on the heaviest cognitive task of the day.', type: 'work' },
        { time: '10:00 – 11:00', activity: 'Self-learning (in office time)', note: 'I dive deep into CQRS, event sourcing, and Laravel patterns.', type: 'growth' },
        { time: '11:00 – 11:30', activity: 'Team huddle + plan share', note: 'I sync with my team and share my top three tasks and blockers.', type: 'work' },
        { time: '11:30 – 1:00', activity: 'Office work (Claude-assisted)', note: 'I execute tickets in pair with Claude.', type: 'work' },
        { time: '1:00 – 1:30', activity: 'Dhuhr + lunch + Quality Time', note: 'We pray Dhuhr and eat lunch together with devices away.', type: 'deen' },
        { time: '1:30 – 2:30', activity: 'Qaylulah (nap) - sunnah rest', note: 'I take a sixty-minute sunnah nap that restores my afternoon focus.', type: 'sleep' },
        { time: '2:30 – 3:00', activity: 'Tea, light movement, focus reset', note: 'I stretch and sip tea to reset focus before the second block.', type: 'rest' },
        { time: '3:00 – 5:00', activity: 'Office: deep work block 2', note: "I run a second cognitive sprint and finish today's commitments.", type: 'work' },
        { time: '5:00 – 5:15', activity: 'Asr', note: 'I pray Asr and take a brief reset.', type: 'deen' },
        { time: '5:15 – 6:30', activity: 'Office wrap-up + handoff notes', note: 'I close loops, document my work, and prep tomorrow.', type: 'work' },
        { time: '6:30 – 7:00', activity: 'Wind-down + Quality Time', note: 'We walk, drink tea, and talk - phones are away.', type: 'wife' },
        { time: '7:00 – 7:15', activity: 'Maghrib', note: 'I pray Maghrib and recite the evening adhkar.', type: 'deen' },
        { time: '7:15 – 8:15', activity: 'Dinner + family time', note: 'We eat dinner together with our phones away.', type: 'wife' },
        { time: '8:15 – 8:45', activity: 'Esha', note: 'I pray Esha and pray witr before sleep.', type: 'deen' },
        { time: '8:45 – 9:30', activity: 'Quran memorization deep session', note: "I repeat and lock in today's hifz portion.", type: 'deen' },
        { time: '9:30 – 10:00', activity: 'Part-time job', note: 'I do light tasks tonight; heavy work shifts to the weekend.', type: 'growth' },
        { time: '10:00 – 10:30', activity: 'Journaling + next-day plan', note: 'I review today and plan my top three for tomorrow.', type: 'rest' },
        { time: '10:30 PM – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep five hours by night plus one hour Qaylulah - six in total.', type: 'sleep' }
      ],
      summary: [
        { label: 'Sleep', value: '6 hr' },
        { label: 'Deen', value: '~4 hr' },
        { label: 'Office', value: '7 hr' },
        { label: 'Self-learn', value: '1 hr' },
        { label: 'Part-time', value: '0.5 hr' },
        { label: 'Wife/Family', value: '~3 hr' }
      ]
    },
    {
      key: 'thu',
      label: 'Thu',
      tag: 'No Madrasa',
      name: 'Thursday',
      focus: 'Madrasa Off - Extended Morning',
      schedule: [
        { time: '12:00 – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep deeply so I rise ready for Tahajjud.', type: 'sleep' },
        { time: '3:30 – 4:00', activity: 'Tahajjud (4 rakah) + dua', note: 'I rise in the blessed last third of the night and stand for my Lord.', type: 'deen' },
        { time: '4:00 – 4:30', activity: 'Fajr + morning adhkar', note: 'I pray Fajr and recite the morning adhkar from Hisnul Muslim.', type: 'deen' },
        { time: '4:30 – 5:00', activity: 'Arabic deep dive', note: 'I push deeper into Arabic grammar and roots.', type: 'growth' },
        { time: '5:00 – 6:30', activity: 'Blog writing - long-form', note: 'I research, draft, and publish a long-form post in ninety minutes.', type: 'growth' },
        { time: '6:30 – 7:00', activity: 'Quran: 5 new ayahs + revision', note: 'I memorize five new ayahs and revise the previous portions.', type: 'deen' },
        { time: '7:00 – 7:30', activity: 'VO2 max workout', note: 'I push my VO2 max with thirty minutes of equipment-free HIIT.', type: 'growth' },
        { time: '7:30 – 8:30', activity: 'Slow breakfast + Quality Time', note: 'We eat a slow breakfast together and set the tone for the day.', type: 'wife' },
        { time: '8:30 – 10:00', activity: 'Office: deep work block 1', note: 'I focus on the heaviest cognitive task of the day.', type: 'work' },
        { time: '10:00 – 11:00', activity: 'Self-learning (in office time)', note: 'I whiteboard a real-world system-design case.', type: 'growth' },
        { time: '11:00 – 11:30', activity: 'Team huddle + plan share', note: 'I sync with my team and share my top three tasks and blockers.', type: 'work' },
        { time: '11:30 – 1:00', activity: 'Office work (Claude-assisted)', note: 'I execute tickets in pair with Claude.', type: 'work' },
        { time: '1:00 – 1:30', activity: 'Dhuhr + lunch + Quality Time', note: 'We pray Dhuhr and eat lunch together with devices away.', type: 'deen' },
        { time: '1:30 – 2:30', activity: 'Qaylulah (nap) - sunnah rest', note: 'I take a sixty-minute sunnah nap that restores my afternoon focus.', type: 'sleep' },
        { time: '2:30 – 3:00', activity: 'Tea, light movement, focus reset', note: 'I stretch and sip tea to reset focus before the second block.', type: 'rest' },
        { time: '3:00 – 5:00', activity: 'Office: deep work block 2', note: "I run a second cognitive sprint and finish today's commitments.", type: 'work' },
        { time: '5:00 – 5:15', activity: 'Asr', note: 'I pray Asr and take a brief reset.', type: 'deen' },
        { time: '5:15 – 6:30', activity: 'Office wrap-up + handoff notes', note: 'I close loops, document my work, and prep tomorrow.', type: 'work' },
        { time: '6:30 – 7:00', activity: 'Wind-down + Quality Time', note: 'We walk, drink tea, and talk - phones are away.', type: 'wife' },
        { time: '7:00 – 7:15', activity: 'Maghrib', note: 'I pray Maghrib and recite the evening adhkar.', type: 'deen' },
        { time: '7:15 – 8:15', activity: 'Dinner + family time', note: 'We eat dinner together with our phones away.', type: 'wife' },
        { time: '8:15 – 8:45', activity: 'Esha', note: 'I pray Esha and pray witr before sleep.', type: 'deen' },
        { time: '8:45 – 9:30', activity: 'Quran memorization deep session', note: "I repeat and lock in today's hifz portion.", type: 'deen' },
        { time: '9:30 – 10:00', activity: 'Part-time job', note: 'I do light tasks tonight; heavy work shifts to the weekend.', type: 'growth' },
        { time: '10:00 – 10:30', activity: 'Journaling + next-day plan', note: 'I review today and plan my top three for tomorrow.', type: 'rest' },
        { time: '10:30 PM – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep five hours by night plus one hour Qaylulah - six in total.', type: 'sleep' }
      ],
      summary: [
        { label: 'Sleep', value: '6 hr' },
        { label: 'Deen', value: '~3.5 hr' },
        { label: 'Office', value: '7 hr' },
        { label: 'Blog', value: '1.5 hr (long-form)' },
        { label: 'Self-learn', value: '1 hr' },
        { label: 'Wife/Family', value: '~3.5 hr' }
      ]
    },
    {
      key: 'fri',
      label: 'Fri',
      tag: "Jumu'ah",
      name: 'Friday',
      focus: "Jumu'ah · Madrasa Off · Date Night",
      schedule: [
        { time: '12:00 – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep deeply so I rise ready for Tahajjud.', type: 'sleep' },
        { time: '3:30 – 4:00', activity: 'Tahajjud (4 rakah) + dua', note: 'I rise in the blessed last third of the night and stand for my Lord.', type: 'deen' },
        { time: '4:00 – 4:30', activity: 'Fajr + Surah Al-Kahf', note: "I pray Fajr and recite Surah Al-Kahf as is sunnah on Jumu'ah.", type: 'deen' },
        { time: '4:30 – 5:00', activity: 'Arabic deep dive', note: 'I push deeper into Arabic grammar and roots.', type: 'growth' },
        { time: '5:00 – 6:30', activity: 'Blog writing - long-form', note: 'I research, draft, and publish a long-form post in ninety minutes.', type: 'growth' },
        { time: '6:30 – 7:00', activity: 'Quran: 5 new ayahs + revision', note: 'I memorize five new ayahs and revise the previous portions.', type: 'deen' },
        { time: '7:00 – 7:30', activity: 'VO2 max workout', note: 'I push my VO2 max with thirty minutes of equipment-free HIIT.', type: 'growth' },
        { time: '7:30 – 8:30', activity: 'Slow breakfast + Quality Time', note: 'We eat a slow breakfast together and set the tone for the day.', type: 'wife' },
        { time: '8:30 – 10:00', activity: 'Office: deep work block 1', note: 'I focus on the heaviest cognitive task of the day.', type: 'work' },
        { time: '10:00 – 11:00', activity: 'Self-learning (in office time)', note: 'I read code and research my next blog post.', type: 'growth' },
        { time: '11:00 – 11:30', activity: 'Team huddle + plan share', note: 'I sync with my team and share my top three tasks and blockers.', type: 'work' },
        { time: '11:30 – 12:30', activity: 'Office work (Claude-assisted)', note: "I wrap loose ends before Jumu'ah.", type: 'work' },
        { time: '12:30 – 2:00', activity: "Ghusl + Jumu'ah prayer + lunch", note: 'I make ghusl, attend the khutbah and salah, and have lunch after.', type: 'deen' },
        { time: '2:00 – 3:00', activity: 'Qaylulah (nap) - sunnah rest', note: "I rest for sixty minutes after Jumu'ah.", type: 'sleep' },
        { time: '3:00 – 5:00', activity: 'Office: deep work block 2', note: "I keep this block lighter - emails and reviews after Jumu'ah.", type: 'work' },
        { time: '5:00 – 5:15', activity: 'Asr', note: 'I pray Asr and take a brief reset.', type: 'deen' },
        { time: '5:15 – 6:30', activity: 'Office wrap-up + handoff notes', note: 'I close loops early because date night is ahead.', type: 'work' },
        { time: '6:30 – 7:00', activity: 'Date-night prep', note: "We freshen up and dress well - sunnah of the Jumu'ah evening.", type: 'wife' },
        { time: '7:00 – 7:15', activity: 'Maghrib', note: 'I pray Maghrib and recite the evening adhkar.', type: 'deen' },
        { time: '7:15 – 8:15', activity: 'Date night dinner', note: 'We share dinner out or a special meal at home - phones away.', type: 'wife' },
        { time: '8:15 – 8:45', activity: 'Esha (together)', note: 'We pray Esha together at home.', type: 'deen' },
        { time: '8:45 – 10:00', activity: 'Quality Time + Quran together', note: 'We read, recite, and make dua together.', type: 'wife' },
        { time: '10:00 – 10:30', activity: 'Journaling + next-day plan', note: 'I review today and plan my top three for tomorrow.', type: 'rest' },
        { time: '10:30 PM – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep five hours by night plus one hour Qaylulah - six in total.', type: 'sleep' }
      ],
      summary: [
        { label: 'Sleep', value: '6 hr' },
        { label: 'Deen', value: "~4 hr (incl. Jumu'ah)" },
        { label: 'Office', value: '5 hr' },
        { label: 'Self-learn', value: '1 hr' },
        { label: 'Wife/Date Night', value: '~5 hr' }
      ]
    },
    {
      key: 'sat',
      label: 'Sat',
      tag: 'No Office',
      name: 'Saturday',
      focus: 'No Office · Part-time + Self-learn Block',
      schedule: [
        { time: '12:00 – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep deeply so I rise ready for Tahajjud.', type: 'sleep' },
        { time: '3:30 – 4:00', activity: 'Tahajjud (4 rakah) + dua', note: 'I rise in the blessed last third of the night and stand for my Lord.', type: 'deen' },
        { time: '4:00 – 4:30', activity: 'Fajr + morning adhkar', note: 'I pray Fajr and recite the morning adhkar from Hisnul Muslim.', type: 'deen' },
        { time: '4:30 – 4:50', activity: 'Arabic drill', note: 'I drill street and Quranic vocab paired with my current hifz.', type: 'growth' },
        { time: '4:50 – 5:30', activity: 'Blog writing', note: 'I draft, outline, or publish my blog for thirty minutes.', type: 'growth' },
        { time: '5:30 – 6:30', activity: 'Online madrasa class', note: 'I attend the live class and take careful notes.', type: 'deen' },
        { time: '6:30 – 7:00', activity: 'Quran: 5 new ayahs + revision', note: 'I memorize five new ayahs and revise the previous portions.', type: 'deen' },
        { time: '7:00 – 7:30', activity: 'VO2 max workout', note: 'I push my VO2 max with thirty minutes of equipment-free HIIT.', type: 'growth' },
        { time: '7:30 – 9:00', activity: 'Slow breakfast + Quality Time', note: 'We share a slow weekend breakfast - the morning is ours.', type: 'wife' },
        { time: '9:00 – 12:00', activity: 'Part-time job - heavy block', note: 'I do three hours of deep work to compensate for short weekday slots.', type: 'growth' },
        { time: '12:00 – 1:30', activity: 'Dhuhr + lunch + Quality Time', note: 'We share an extended weekend lunch together with devices away.', type: 'deen' },
        { time: '1:30 – 2:30', activity: 'Qaylulah (nap) - sunnah rest', note: 'I take a sixty-minute sunnah nap that restores my afternoon focus.', type: 'sleep' },
        { time: '2:30 – 5:00', activity: 'Self-learning deep block', note: 'I dedicate two and a half hours to a system-design project or hands-on lab.', type: 'growth' },
        { time: '5:00 – 5:15', activity: 'Asr', note: 'I pray Asr and take a brief reset.', type: 'deen' },
        { time: '5:15 – 7:00', activity: 'Outing + Quality Time', note: 'We go out together - a walk, the market, dawah, anything.', type: 'wife' },
        { time: '7:00 – 7:15', activity: 'Maghrib', note: 'I pray Maghrib and recite the evening adhkar.', type: 'deen' },
        { time: '7:15 – 8:15', activity: 'Dinner + family time', note: 'We eat dinner together with our phones away.', type: 'wife' },
        { time: '8:15 – 8:45', activity: 'Esha', note: 'I pray Esha and pray witr before sleep.', type: 'deen' },
        { time: '8:45 – 9:30', activity: 'Quran memorization deep session', note: "I repeat and lock in today's hifz portion.", type: 'deen' },
        { time: '9:30 – 10:00', activity: 'Quality Time', note: 'We wind down together with our phones away.', type: 'wife' },
        { time: '10:00 – 10:30', activity: 'Journaling + next-day plan', note: 'I review today and plan my top three for tomorrow.', type: 'rest' },
        { time: '10:30 PM – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep five hours by night plus one hour Qaylulah - six in total.', type: 'sleep' }
      ],
      summary: [
        { label: 'Sleep', value: '6 hr' },
        { label: 'Deen', value: '~4 hr' },
        { label: 'Part-time', value: '3 hr' },
        { label: 'Self-learn', value: '2.5 hr' },
        { label: 'Wife/Family', value: '~5 hr' }
      ]
    },
    {
      key: 'sun',
      label: 'Sun',
      tag: 'Half Day',
      name: 'Sunday',
      focus: 'Half-day Part-time · Weekly Review',
      schedule: [
        { time: '12:00 – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep deeply so I rise ready for Tahajjud.', type: 'sleep' },
        { time: '3:30 – 4:00', activity: 'Tahajjud (4 rakah) + dua', note: 'I rise in the blessed last third of the night and stand for my Lord.', type: 'deen' },
        { time: '4:00 – 4:30', activity: 'Fajr + morning adhkar', note: 'I pray Fajr and recite the morning adhkar from Hisnul Muslim.', type: 'deen' },
        { time: '4:30 – 4:50', activity: 'Arabic drill', note: 'I drill street and Quranic vocab paired with my current hifz.', type: 'growth' },
        { time: '4:50 – 5:30', activity: 'Blog writing', note: 'I draft, outline, or publish my blog for thirty minutes.', type: 'growth' },
        { time: '5:30 – 6:30', activity: 'Online madrasa class', note: 'I attend the live class and take careful notes.', type: 'deen' },
        { time: '6:30 – 7:00', activity: 'Quran: 5 new ayahs + revision', note: 'I memorize five new ayahs and revise the previous portions.', type: 'deen' },
        { time: '7:00 – 7:30', activity: 'VO2 max workout', note: 'I push my VO2 max with thirty minutes of equipment-free HIIT.', type: 'growth' },
        { time: '7:30 – 9:00', activity: 'Breakfast + Quality Time', note: 'We share a slow weekend morning together over breakfast.', type: 'wife' },
        { time: '9:00 – 1:00', activity: 'Part-time office visit', note: 'I spend a four-hour half-day in office for in-person presence.', type: 'growth' },
        { time: '1:00 – 1:30', activity: 'Dhuhr + lunch + Quality Time', note: 'We pray Dhuhr and eat lunch together with devices away.', type: 'deen' },
        { time: '1:30 – 3:00', activity: 'Long nap + true rest', note: 'I take a ninety-minute weekend rest to recharge.', type: 'sleep' },
        { time: '3:00 – 5:00', activity: 'Weekly review + planning', note: 'I review the week, plan the next, and batch blog ideas.', type: 'growth' },
        { time: '5:00 – 5:15', activity: 'Asr', note: 'I pray Asr and take a brief reset.', type: 'deen' },
        { time: '5:15 – 7:00', activity: 'Family evening', note: 'I am fully present with my family - laptop closed.', type: 'wife' },
        { time: '7:00 – 7:15', activity: 'Maghrib', note: 'I pray Maghrib and recite the evening adhkar.', type: 'deen' },
        { time: '7:15 – 8:15', activity: 'Dinner + family time', note: 'We eat dinner together with our phones away.', type: 'wife' },
        { time: '8:15 – 8:45', activity: 'Esha', note: 'I pray Esha and pray witr before sleep.', type: 'deen' },
        { time: '8:45 – 9:30', activity: 'Quran memorization deep session', note: "I repeat and lock in today's hifz portion.", type: 'deen' },
        { time: '9:30 – 10:00', activity: 'Quality Time', note: 'We wind down together with our phones away.', type: 'wife' },
        { time: '10:00 – 10:30', activity: 'Journaling + week-ahead plan', note: 'I review the week thoroughly and set Monday before sleep.', type: 'rest' },
        { time: '10:30 PM – 3:30 AM', activity: 'Sleep - protected', note: 'I sleep five hours by night plus a long nap - six and a half in total.', type: 'sleep' }
      ],
      summary: [
        { label: 'Sleep', value: '6.5 hr' },
        { label: 'Deen', value: '~4 hr' },
        { label: 'Part-time', value: '4 hr' },
        { label: 'Weekly review', value: '2 hr' },
        { label: 'Wife/Family', value: '~5 hr' }
      ]
    }
  ],
  principles: {
    title: 'Operating Principles',
    items: [
      { strong: 'Sleep is sacred.', body: '5 hr night (10:30 PM → 3:30 AM) + 1 hr Qaylulah = 6 hr daily. Never compress. If something must give, drop the evening part-time - not sleep.' },
      { strong: 'Deen is the spine.', body: 'Tahajjud, Fajr, the five salah, daily Quran, and madrasa anchor the day. Everything else flexes around them.' },
      { strong: 'Quality Time, not proximity.', body: 'WFH means she sees you all day - but seeing is not presence. 8 AM coffee, 1 PM lunch, 6:30 PM walk, 7:15 PM dinner are <em>device-free</em>. Friday evening is hers.' },
      { strong: 'Self-learn at peak brain hours.', body: '10–11 AM is when your mind is sharpest. Spend it on senior-eng skills - system design, architecture, leadership. Never at night when you are drained.' },
      { strong: 'Compound the small daily reps.', body: '30–40 min blog writing, 15–20 min Arabic drill, 5 new Quran ayahs daily. None feels heroic, all compound into mastery.' },
      { strong: 'Arabic in every row.', body: 'Read the Arabic line aloud as the activity begins. The routine itself becomes a vocabulary drill - language is acquired, not studied.' },
      { strong: 'Journal before bed.', body: "10:00–10:30 PM = review today + plan tomorrow's top 3. Wake into clarity, not drift." },
      { strong: 'Sunday plans Monday.', body: 'Run the weekly review (3–5 PM) and set next week before you sleep. No improvising the week.' }
    ]
  },
  footer: '"And whoever puts their trust in Allah - He is sufficient for them." - Surah At-Talaq, 65:3'
};
