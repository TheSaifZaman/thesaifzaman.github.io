var SYLLABUS_DATA = {
  pageTitle: '12-Month Syllabus — Nocturnal',
  header: {
    title: 'The Twelve-Month <em>Syllabus</em>',
    titleAr: 'مَنْهَجُ الاثْنَيْ <em>عَشَرَ شَهْرًا</em>',
    subtitle: 'Three pillars — Deen, Software Engineering, Interview Prep — laid out day by day across 360 days so you never have to wonder what to read.',
    subtitleAr: 'ثَلَاثُ رَكَائِزَ — الدِّينُ وَهَنْدَسَةُ البَرْمَجِيَّاتِ وَتَجْهِيزُ المُقَابَلَاتِ — مُرَتَّبَةٌ يَوْمًا بِيَوْمٍ عَلَى مَدَى ٣٦٠ يَوْمًا حَتَّى لَا تَتَسَاءَلَ مَاذَا تَقْرَأُ.',
    accentLine: '3 tracks · 12 months · 30 days/month · 7-day rotation · 20 learn + 10 revise.',
    accentLineAr: '٣ مَسَارَات · ١٢ شَهْرًا · ٣٠ يَوْمًا فِي الشَّهْرِ · دَوْرَةُ سَبْعَةِ أَيَّامٍ · ٢٠ تَعَلُّمًا + ١٠ مُرَاجَعَةً.'
  },
  pact: 'I do not improvise the day. I open the tab, pick the day, and run the plan. Twenty days of new material, ten days of cumulative revision, every month — repeated until the spine is the practice and the practice is the spine.',
  pactAr: 'لَا أَرْتَجِلُ يَوْمِي. أَفْتَحُ التَّبْوِيبَ، وَأَخْتَارُ اليَوْمَ، وَأُنَفِّذُ الخُطَّةَ. عِشْرُونَ يَوْمًا مِنَ التَّعَلُّمِ الجَدِيدِ، وَعَشَرَةٌ مِنَ المُرَاجَعَةِ التَّرَاكُمِيَّةِ كُلَّ شَهْرٍ — تُكَرَّرُ حَتَّى يَصِيرَ العَمُودُ هُوَ المُمَارَسَةَ وَالمُمَارَسَةُ هِيَ العَمُودَ.',
  stats: [
    { num: '3', lbl: 'tracks', lblAr: 'مَسَارَات' },
    { num: '12', lbl: 'months', lblAr: 'أَشْهُر' },
    { num: '30', lbl: 'days/mo', lblAr: 'يَوْم/شَهْر' },
    { num: '1,080', lbl: 'days', lblAr: 'يَوْم' }
  ],
  windows: [
    { day: 'Mon–Fri', dayAr: 'الاثْنَيْن–الجُمُعَة', time: '10:00 – 11:00 AM', name: 'Office self-learn', nameAr: 'تَعَلُّمٌ ذَاتِيٌّ بِالمَكْتَب', tone: 'blue', total: '5h/wk', totalAr: '٥س/أُسْبُوع', use: 'Software Engineering — Mon Backend, Tue AI, Wed DevOps, Thu SecOps, Fri Frontend.', useAr: 'هَنْدَسَةُ البَرْمَجِيَّاتِ — الاثْنَيْن خَلْفِيَّة، الثُّلَاثَاء ذَكَاءٌ اصْطِنَاعِيّ، الأَرْبِعَاء دِيفُوبْس، الخَمِيس أَمْنُ التَّشْغِيل، الجُمُعَة وَاجِهَة.' },
    { day: 'Sat', dayAr: 'السَّبْت', time: '9:00 AM – 12:00 PM', name: 'Heavy build block', nameAr: 'كُتْلَةُ البِنَاءِ الكَبِيرَة', tone: 'accent', total: '3h', totalAr: '٣س', use: 'Software Engineering — Build day (cross-discipline project work).', useAr: 'هَنْدَسَةُ البَرْمَجِيَّاتِ — يَوْمُ البِنَاءِ (عَمَلُ المَشْرُوعِ المُتَدَاخِل).' },
    { day: 'Sat', dayAr: 'السَّبْت', time: '2:30 – 5:00 PM', name: 'Self-learn deep block', nameAr: 'كُتْلَةُ التَّعَلُّمِ العَمِيقَة', tone: 'green', total: '2.5h', totalAr: '٢٫٥س', use: 'Software Engineering — Decision/architecture writeup (ADR work).', useAr: 'هَنْدَسَةُ البَرْمَجِيَّاتِ — تَوْثِيقُ قَرَارٍ مِعْمَارِيٍّ.' },
    { day: 'Sat', dayAr: 'السَّبْت', time: '4:00 – 5:00 PM', name: 'Interview prep', nameAr: 'تَجْهِيزُ المُقَابَلَات', tone: 'rose', total: '1h', totalAr: '١س', use: 'Interview Prep track — DSA / System Design / Behavioral / Mock.', useAr: 'مَسَارُ تَجْهِيزِ المُقَابَلَاتِ — خَوَارِزْمِيَّات / تَصْمِيمُ نِظَامٍ / سُلُوكِيّ / مُحَاكَاة.' },
    { day: 'Sun', dayAr: 'الأَحَد', time: '9:00 AM – 1:00 PM', name: 'Part-time / ship block', nameAr: 'دَوَامٌ جُزْئِيّ / نَشْر', tone: 'accent', total: '4h', totalAr: '٤س', use: 'Software Engineering — Ship day (publish, polish, edit).', useAr: 'هَنْدَسَةُ البَرْمَجِيَّاتِ — يَوْمُ النَّشْرِ (إِصْدَارٌ، صَقْلٌ، تَحْرِير).' },
    { day: 'Sun', dayAr: 'الأَحَد', time: '4:00 – 5:00 PM', name: 'Interview prep', nameAr: 'تَجْهِيزُ المُقَابَلَات', tone: 'rose', total: '1h', totalAr: '١س', use: 'Interview Prep track — Mock + retro.', useAr: 'مَسَارُ تَجْهِيزِ المُقَابَلَاتِ — مُحَاكَاةٌ وَمُرَاجَعَة.' },
    { day: 'Daily', dayAr: 'يَوْمِيًّا', time: '4:00 – 5:00 AM + 4:30 – 5:30 PM + Hifz slots', name: 'Deen anchor times', nameAr: 'أَوْقَاتُ الدِّينِ المَرْكَزِيَّة', tone: 'green', total: '~1.5h/day', totalAr: '~١٫٥س/يَوْم', use: 'Deen track — Tahajjud, Fajr+adhkar, Arabic drill (4:30), Quran slot, Maghrib+Esha.', useAr: 'مَسَارُ الدِّينِ — تَهَجُّد، فَجْر مَعَ الأَذْكَار، تَدْرِيبُ العَرَبِيَّةِ (٤:٣٠)، فَتْرَةُ القُرْآنِ، مَغْرِبٌ وَعِشَاء.' }
  ],
  tracks: [
    {
      key: 'deen',
      label: 'Deen',
      labelAr: 'الدِّين',
      tone: 'green',
      icon: '☪',
      desc: 'Quran (hifz + tajweed) · Tafsir · 40 Nawawi + Riyad-as-Salihin · Fiqh · Aqeedah · Seerah.',
      descAr: 'القُرْآنُ (حِفْظٌ وَتَجْوِيدٌ) · التَّفْسِيرُ · الأَرْبَعُونَ النَّوَوِيَّةُ وَرِيَاضُ الصَّالِحِينَ · الفِقْهُ · العَقِيدَةُ · السِّيرَة.',
      slot: 'Daily anchor times — Tahajjud, Fajr + adhkar, Arabic drill 4:30 AM, Quran 6:30 AM, Maghrib + Esha windows.',
      slotAr: 'أَوْقَاتٌ مَرْكَزِيَّةٌ يَوْمِيَّةٌ — التَّهَجُّدُ، الفَجْرُ مَعَ الأَذْكَارِ، تَدْرِيبُ العَرَبِيَّةِ ٤:٣٠ صَبَاحًا، القُرْآنُ ٦:٣٠ صَبَاحًا، نَافِذَتَا المَغْرِبِ وَالعِشَاء.',
      rotation: [
        { day: 1, code: 'quran',   label: 'Quran',   labelAr: 'قُرْآن' },
        { day: 2, code: 'tafsir',  label: 'Tafsir',  labelAr: 'تَفْسِير' },
        { day: 3, code: 'hadith',  label: 'Hadith',  labelAr: 'حَدِيث' },
        { day: 4, code: 'fiqh',    label: 'Fiqh',    labelAr: 'فِقْه' },
        { day: 5, code: 'aqeedah', label: 'Aqeedah', labelAr: 'عَقِيدَة' },
        { day: 6, code: 'seerah',  label: 'Seerah',  labelAr: 'سِيرَة' },
        { day: 7, code: 'revise',  label: 'Revise',  labelAr: 'مُرَاجَعَة' }
      ],
      months: []
    },
    {
      key: 'se',
      label: 'Software Engineering',
      labelAr: 'هَنْدَسَةُ البَرْمَجِيَّات',
      tone: 'blue',
      icon: '⌘',
      desc: 'Backend · AI · DevOps · SecOps · Frontend · Build · Ship — one discipline per weekday.',
      descAr: 'خَلْفِيَّة · ذَكَاءٌ اصْطِنَاعِيّ · دِيفُوبْس · أَمْنُ التَّشْغِيل · وَاجِهَة · بِنَاء · نَشْر — تَخَصُّصٌ وَاحِدٌ لِكُلِّ يَوْمٍ.',
      slot: 'Mon-Fri 10–11 AM (office self-learn) · Sat 9 AM–12 + 2:30–5 PM (build + deep block) · Sun 9 AM–1 PM (ship).',
      slotAr: 'الاثْنَيْن–الجُمُعَة ١٠–١١ صَبَاحًا (تَعَلُّمٌ ذَاتِيٌّ بِالمَكْتَبِ) · السَّبْت ٩ صَبَاحًا–١٢ + ٢:٣٠–٥ مَسَاءً (بِنَاءٌ وَكُتْلَةٌ عَمِيقَةٌ) · الأَحَد ٩ صَبَاحًا–١ مَسَاءً (نَشْر).',
      rotation: [
        { day: 1, code: 'backend',  label: 'Backend',  labelAr: 'خَلْفِيَّة' },
        { day: 2, code: 'ai',       label: 'AI',       labelAr: 'ذَكَاءٌ اصْطِنَاعِيّ' },
        { day: 3, code: 'devops',   label: 'DevOps',   labelAr: 'دِيفُوبْس' },
        { day: 4, code: 'secops',   label: 'SecOps',   labelAr: 'أَمْنُ التَّشْغِيل' },
        { day: 5, code: 'frontend', label: 'Frontend', labelAr: 'وَاجِهَة' },
        { day: 6, code: 'build',    label: 'Build',    labelAr: 'بِنَاء' },
        { day: 7, code: 'ship',     label: 'Ship',     labelAr: 'نَشْر' }
      ],
      months: []
    },
    {
      key: 'interview',
      label: 'Interview Prep',
      labelAr: 'تَجْهِيزُ المُقَابَلَات',
      tone: 'rose',
      icon: '◐',
      desc: 'DSA patterns · System Design cases · Behavioral STAR · Mocks + retro.',
      descAr: 'أَنْمَاطُ الخَوَارِزْمِيَّاتِ · حَالَاتُ تَصْمِيمِ النِّظَامِ · سُلُوكِيٌّ بِنَمَطِ STAR · مُحَاكَيَاتٌ وَمُرَاجَعَة.',
      slot: 'Sat 4:00–5:00 PM (interview prep slot) · Sun 4:00–5:00 PM (mock + retro slot).',
      slotAr: 'السَّبْت ٤:٠٠–٥:٠٠ مَسَاءً (فَتْرَةُ تَجْهِيزِ المُقَابَلَاتِ) · الأَحَد ٤:٠٠–٥:٠٠ مَسَاءً (مُحَاكَاةٌ وَمُرَاجَعَة).',
      rotation: [
        { day: 1, code: 'dsa',   label: 'DSA',           labelAr: 'خَوَارِزْمِيَّات' },
        { day: 2, code: 'sd',    label: 'System Design', labelAr: 'تَصْمِيمُ نِظَام' },
        { day: 3, code: 'beh',   label: 'Behavioral',    labelAr: 'سُلُوكِيّ' },
        { day: 4, code: 'mock',  label: 'Mock',          labelAr: 'مُحَاكَاة' },
        { day: 5, code: 'dsa',   label: 'DSA',           labelAr: 'خَوَارِزْمِيَّات' },
        { day: 6, code: 'sd',    label: 'System Design', labelAr: 'تَصْمِيمُ نِظَام' },
        { day: 7, code: 'retro', label: 'Retro',         labelAr: 'مُرَاجَعَة' }
      ],
      months: []
    }
  ],
  creed: 'Discipline is downstream of identity. Mushaf before mouse, code before coffee, debrief before sleep — and the syllabus carries the day on every day you would rather drift.',
  creedAr: 'الانْضِبَاطُ ابْنُ الهُوِيَّة. المُصْحَفُ قَبْلَ الفَأْرَة، الكُودُ قَبْلَ القَهْوَة، المُرَاجَعَةُ قَبْلَ النَّوْم — وَالمَنْهَجُ يَحْمِلُ اليَوْمَ فِي كُلِّ يَوْمٍ تَكَادُ تَنْحَرِفُ فِيهِ.',
  // Track months get attached by track-specific data files below.
  attachMonths: function (key, months) {
    for (var i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].key === key) {
        this.tracks[i].months = months;
        return;
      }
    }
  }
};
