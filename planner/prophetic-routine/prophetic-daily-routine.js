/* ============================================
   PROPHETIC DAILY ROUTINE - Adaptive System
   Based on Prophet Muhammad's (PBUH) daily schedule
   Adapts to: Jummah, Sun/Thu fasting, Ayyam al-Beed, Ramadan
   ============================================ */

(function() {
    'use strict';

    // ===== ROUTINE TYPES =====
    const RoutineType = {
        REGULAR: 'regular',
        JUMMAH: 'jummah',
        MON_THU_FAST: 'mon_thu_fast',
        AYYAM_AL_BEED: 'ayyam_al_beed',
        RAMADAN: 'ramadan',
        EID: 'eid'
    };

    // ===== PROPHETIC DAILY ROUTINE CLASS =====
    class PropheticDailyRoutine {
        constructor() {
            this.storageKey = 'prophetic-daily-routine';
            this.settingsKey = 'bb-settings';
            this.currentRoutineType = null;
            this.currentDate = new Date();
        }

        // Load settings
        loadSettings() {
            try {
                return JSON.parse(localStorage.getItem(this.settingsKey) || '{}');
            } catch { return {}; }
        }

        // Get Islamic date components
        getIslamicDate(date = new Date()) {
            try {
                const adj = this.loadSettings().hijriAdj || 0;
                const d = new Date(date);
                d.setDate(d.getDate() + adj);

                // Get Islamic month and day
                const formatter = new Intl.DateTimeFormat('en-u-ca-islamic', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                });
                const parts = formatter.formatToParts(d);

                const day = parseInt(parts.find(p => p.type === 'day')?.value || '1');
                const month = parseInt(parts.find(p => p.type === 'month')?.value || '1');
                const year = parts.find(p => p.type === 'year')?.value || '';

                return { day, month, year, formatted: formatter.format(d) };
            } catch {
                return { day: 1, month: 1, year: '1446', formatted: '' };
            }
        }

        // Determine routine type based on date
        getRoutineType(date = new Date()) {
            const dayOfWeek = date.getDay(); // 0 = Sunday, 5 = Friday
            const islamicDate = this.getIslamicDate(date);
            const settings = this.loadSettings();

            // Check for Ramadan (Month 9)
            if (islamicDate.month === 9) {
                return { type: RoutineType.RAMADAN, label: 'Ramadan', icon: '🌙' };
            }

            // Check for Eid (1 Shawwal or 10 Dhu al-Hijjah)
            if ((islamicDate.month === 10 && islamicDate.day === 1) ||
                (islamicDate.month === 12 && islamicDate.day === 10)) {
                return { type: RoutineType.EID, label: 'Eid Day', icon: '🎉' };
            }

            // Check for Jummah (Friday)
            if (dayOfWeek === 5) {
                return { type: RoutineType.JUMMAH, label: 'Jummah Day', icon: '🕌' };
            }

            // Check for Ayyam al-Beed (13, 14, 15 of Islamic month)
            if (islamicDate.day >= 13 && islamicDate.day <= 15) {
                return { type: RoutineType.AYYAM_AL_BEED, label: 'Ayyam al-Beed (White Days)', icon: '⚪' };
            }

            // Check for Monday/Thursday fasting
            const fastMon = settings.fastMon !== undefined ? settings.fastMon : true;
            const fastThu = settings.fastThu !== undefined ? settings.fastThu : true;

            if ((dayOfWeek === 1 && fastMon) || (dayOfWeek === 4 && fastThu)) {
                return { type: RoutineType.MON_THU_FAST, label: 'Recommended Fast Day', icon: '🌙' };
            }

            // Default regular day
            return { type: RoutineType.REGULAR, label: 'Regular Day', icon: '📅' };
        }

        // ===== ROUTINE STRUCTURES =====

        // Get routine based on type
        getRoutineStructure(routineType = null) {
            const type = routineType || this.getRoutineType().type;

            switch(type) {
                case RoutineType.RAMADAN:
                    return this.getRamadanRoutine();
                case RoutineType.JUMMAH:
                    return this.getJummahRoutine();
                case RoutineType.MON_THU_FAST:
                case RoutineType.AYYAM_AL_BEED:
                    return this.getFastingDayRoutine();
                case RoutineType.EID:
                    return this.getEidRoutine();
                default:
                    return this.getRegularRoutine();
            }
        }

        // Regular Day Routine
        getRegularRoutine() {
            return {
                // Night Routine
                tahajjud: {
                    id: 'tahajjud',
                    name: 'Tahajjud - Night Prayer',
                    arabicName: 'صلاة التهجد',
                    time: 'Last third of night',
                    icon: '🌙',
                    color: '#1e3a5f',
                    description: 'The Prophet (PBUH) would sleep early and wake for Tahajjud. His head would be on his pillow but he would sleep little.',
                    hadith: 'The best prayer after the obligatory prayers is the night prayer.',
                    source: 'Muslim',
                    benefits: ['Connection with Allah', 'Peace and tranquility', 'Forgiveness of sins', 'Accepted duas'],
                    actionItems: ['Wake 1-1.5 hours before Fajr', 'Perform 2-12 rakats', 'Make heartfelt dua', 'Seek forgiveness'],
                    duration: '20-45 minutes',
                    trackingKey: 'tahajjud'
                },

                // Morning Routine
                fajr: {
                    id: 'fajr',
                    name: 'Fajr - Dawn Prayer',
                    arabicName: 'صلاة الفجر',
                    time: 'Dawn',
                    icon: '🌅',
                    color: '#f4d03f',
                    description: 'The Prophet (PBUH) would pray Fajr at its earliest time when light appeared.',
                    hadith: 'Whoever prays Fajr in congregation, it is as if he had prayed the whole night.',
                    source: 'Muslim',
                    benefits: ['Angels witness', 'Protection of Allah', 'Fresh start to day', 'Peace of mind'],
                    actionItems: ['Pray in congregation', 'Stay for dhikr', 'Recite Qur\'an', 'Morning adhkar'],
                    duration: '15-20 minutes',
                    trackingKey: 'fajr'
                },

                morningAdhkar: {
                    id: 'morning_adhkar',
                    name: 'Morning Adhkar & Qur\'an',
                    arabicName: 'أذكار الصباح',
                    time: 'After sunrise (Ishraq)',
                    icon: '📖',
                    color: '#27ae60',
                    description: 'The Prophet (PBUH) would engage in morning remembrance and teaching Qur\'an.',
                    hadith: 'Whoever reads a letter from the Book of Allah will have a good deed.',
                    source: 'Tirmidhi',
                    benefits: ['Barakah in time', 'Spiritual focus', 'Peace of heart', 'Knowledge increase'],
                    actionItems: ['Recite morning adhkar', 'Read Qur\'an (1-2 pages)', 'Dua for barakah', 'Review daily goals'],
                    duration: '20-30 minutes',
                    trackingKey: 'morning_adhkar'
                },

                duha: {
                    id: 'duha',
                    name: 'Duha Prayer (Forenoon)',
                    arabicName: 'صلاة الضحى',
                    time: 'After sunrise (15+ mins)',
                    icon: '☀️',
                    color: '#f39c12',
                    description: 'The Prophet (PBUH) would pray Duha regularly, sometimes 2, 4, or 8 rakats.',
                    hadith: 'The prayer of Duha is two rakats, and may increase to 8 rakats.',
                    source: 'Abu Dawud',
                    benefits: ['Forgiveness of sins', 'Charity for every joint', 'Sufficiency from Allah', 'Good deeds increase'],
                    actionItems: ['Pray 2-8 rakats', 'Make dua', 'Express gratitude', 'Start work with intention'],
                    duration: '10-15 minutes',
                    trackingKey: 'duha'
                },

                // Work Block 1
                workBlock1: {
                    id: 'work_block_1',
                    name: 'Deep Work Block',
                    arabicName: 'العمل - الجهد العميق',
                    time: 'Morning (9am-12pm)',
                    icon: '💼',
                    color: '#3498db',
                    description: 'The Prophet (PBUH) would attend to community affairs, resolve disputes, and manage state matters.',
                    hadith: 'Allah loves that when one of you does a job, he perfects it.',
                    source: 'Bayhaqi',
                    benefits: ['Peak productivity', 'Barakah in work', 'Excellence (Ihsan)', 'Providing for family'],
                    actionItems: ['Deep work tasks', 'Important meetings', 'Decision making', 'Creative work'],
                    duration: '3 hours',
                    trackingKey: 'work_block_1'
                },

                dhuhr: {
                    id: 'dhuhr',
                    name: 'Dhuhr - Midday Prayer',
                    arabicName: 'صلاة الظهر',
                    time: 'After midday',
                    icon: '🕌',
                    color: '#e67e22',
                    description: 'The Prophet (PBUH) would pray Dhuhr at the beginning of its time.',
                    hadith: 'The most burdensome prayers for hypocrites are Fajr and Isha.',
                    source: 'Bukhari & Muslim',
                    benefits: ['Break from work', 'Spiritual recharge', 'Midday reset', 'Connection with Allah'],
                    actionItems: ['Pray in congregation', 'Make dua', 'Short rest (qailulah)', 'Review afternoon goals'],
                    duration: '15-20 minutes',
                    trackingKey: 'dhuhr'
                },

                // Work Block 2
                workBlock2: {
                    id: 'work_block_2',
                    name: 'Afternoon Work Block',
                    arabicName: 'العمل - فترة ما بعد الظهر',
                    time: 'Afternoon (1pm-4pm)',
                    icon: '💻',
                    color: '#9b59b6',
                    description: 'The Prophet (PBUH) would continue his work and teaching in the afternoon.',
                    hadith: 'Work, for Allah, His Messenger, and the believers will see your deeds.',
                    source: 'Tirmidhi',
                    benefits: ['Completing tasks', 'Collaboration', 'Professional growth', 'Service to others'],
                    actionItems: ['Meetings and calls', 'Emails and communication', 'Admin tasks', 'Team collaboration'],
                    duration: '3 hours',
                    trackingKey: 'work_block_2'
                },

                asr: {
                    id: 'asr',
                    name: 'Asr - Afternoon Prayer',
                    arabicName: 'صلاة العصر',
                    time: 'Late afternoon',
                    icon: '🌤️',
                    color: '#d35400',
                    description: 'The Prophet (PBUH) emphasized Asr prayer greatly.',
                    hadith: 'Whoever misses Asr prayer, it is as if he has lost his family and wealth.',
                    source: 'Bukhari',
                    benefits: ['End of work day', 'Spiritual reflection', 'Protection from loss', 'Transition to evening'],
                    actionItems: ['Pray on time', 'Evening adhkar', 'Review accomplishments', 'Plan for tomorrow'],
                    duration: '15-20 minutes',
                    trackingKey: 'asr'
                },

                familyTime: {
                    id: 'family_time',
                    name: 'Family & Personal Time',
                    arabicName: 'وقت العائلة',
                    time: 'Before Maghrib',
                    icon: '👨‍👩‍👧‍👦',
                    color: '#e74c3c',
                    description: 'The Prophet (PBUH) would spend time with family and strengthen bonds.',
                    hadith: 'The best of you are those best to their families.',
                    source: 'Tirmidhi',
                    benefits: ['Family bonding', 'Community connection', 'Emotional support', 'Following Sunnah'],
                    actionItems: ['Connect with family', 'Exercise or walk', 'Personal development', 'Prepare dinner'],
                    duration: '1-2 hours',
                    trackingKey: 'family_time'
                },

                maghrib: {
                    id: 'maghrib',
                    name: 'Maghrib - Sunset Prayer',
                    arabicName: 'صلاة المغرب',
                    time: 'At sunset',
                    icon: '🌇',
                    color: '#c0392b',
                    description: 'The Prophet (PBUH) would hasten to Maghrib prayer immediately after sunset.',
                    hadith: 'When the evening comes, keep your children close, for the devils spread out.',
                    source: 'Bukhari & Muslim',
                    benefits: ['Gratitude for day', 'Family prayer time', 'Evening start', 'Angels witness'],
                    actionItems: ['Pray in congregation', 'Make dua', 'Evening adhkar', 'Express gratitude'],
                    duration: '15-20 minutes',
                    trackingKey: 'maghrib'
                },

                isha: {
                    id: 'isha',
                    name: 'Isha - Night Prayer',
                    arabicName: 'صلاة العشاء',
                    time: 'After twilight disappears',
                    icon: '🌃',
                    color: '#2c3e50',
                    description: 'The Prophet (PBUH) would delay Isha to its later time but disliked sleeping before it.',
                    hadith: 'If I did not fear hardship for my ummah, I would have ordered them to delay Isha.',
                    source: 'Bukhari & Muslim',
                    benefits: ['End of day prayers', 'Peace before sleep', 'Reflection', 'Night routine start'],
                    actionItems: ['Pray in congregation', 'Night adhkar', 'Recite Surah Al-Mulk', 'Sleep preparation'],
                    duration: '15-20 minutes',
                    trackingKey: 'isha'
                },

                witr: {
                    id: 'witr',
                    name: 'Witr Prayer',
                    arabicName: 'صلاة الوتر',
                    time: 'After Isha, before sleep',
                    icon: '🤲',
                    color: '#8e44ad',
                    description: 'The Prophet (PBUH) would always pray Witr and never abandon it.',
                    hadith: 'Witr is a duty, so whoever does not pray Witr is not of our people.',
                    source: 'Abu Dawud',
                    benefits: ['Completion of day prayers', 'Odd number rakats', 'Special connection', 'Before sleep peace'],
                    actionItems: ['Pray 1, 3, or more rakats', 'Make qunut dua', 'Seek forgiveness', 'Sleep dua'],
                    duration: '5-10 minutes',
                    trackingKey: 'witr'
                },

                sleep: {
                    id: 'sleep',
                    name: 'Sleep & Night Routine',
                    arabicName: 'النوم والروتين الليلي',
                    time: 'Before midnight',
                    icon: '😴',
                    color: '#1a1a2e',
                    description: 'The Prophet (PBUH) would sleep early, on his right side, with wudu.',
                    hadith: 'When you go to bed, perform ablution as you would for prayer.',
                    source: 'Bukhari & Muslim',
                    benefits: ['Physical rest', 'Spiritual protection', 'Energy for next day', 'Following Sunnah'],
                    actionItems: ['Sleep on right side', 'Be in wudu', 'Recite Surah Al-Mulk', 'Sleep with intention'],
                    duration: '6-7 hours',
                    trackingKey: 'sleep'
                }
            };
        }

        // Jummah Day Routine
        getJummahRoutine() {
            const regular = this.getRegularRoutine();

            return {
                // Remove Duha, add Jummah preparation
                ...regular,

                jummahPrep: {
                    id: 'jummah_prep',
                    name: 'Jummah Preparation (Ghusl)',
                    arabicName: 'الاستعداد لجمعة',
                    time: 'Before Dhuhr',
                    icon: '🚿',
                    color: '#3498db',
                    description: 'The Prophet (PBUH) encouraged ghusl (bath) for Jummah and wearing clean clothes.',
                    hadith: 'Ghusl on Friday is obligatory for every adult.',
                    source: 'Bukhari & Muslim',
                    benefits: ['Purification', 'Special day honor', 'Fresh start', 'Community preparation'],
                    actionItems: ['Perform ghusl', 'Wear best clothes', 'Use perfume (itr)', 'Go early to masjid'],
                    duration: '30 minutes',
                    trackingKey: 'jummah_prep'
                },

                jummah: {
                    id: 'jummah',
                    name: 'Jummah Prayer & Khutbah',
                    arabicName: 'صلاة الجمعة',
                    time: 'Dhuhr time',
                    icon: '🕌',
                    color: '#f39c12',
                    description: 'The Prophet (PBUH) would deliver the Jummah khutbah and then lead the prayer.',
                    hadith: 'The best day on which the sun has risen is Friday.',
                    source: 'Muslim',
                    benefits: ['Weekly gathering', 'Special blessings', 'Community unity', 'Learning opportunity'],
                    actionItems: ['Go early for reward', 'Listen to khutbah', 'Pray in congregation', 'Make many duas'],
                    duration: '1 hour',
                    trackingKey: 'jummah'
                },

                // Replace work blocks with lighter work/learning
                morningLearning: {
                    id: 'morning_learning',
                    name: 'Morning Learning & Work',
                    arabicName: 'التعلم والعمل الصباحي',
                    time: 'Morning',
                    icon: '📚',
                    color: '#27ae60',
                    description: 'Friday is a day of learning and worship. Light work is recommended.',
                    hadith: 'The best day to seek knowledge is Friday.',
                    source: 'Ibn Majah',
                    benefits: ['Sacred day blessings', 'Knowledge increase', 'Barakah in time', 'Spiritual growth'],
                    actionItems: ['Read Islamic books', 'Watch beneficial content', 'Light work tasks', 'Prepare for Jummah'],
                    duration: '2-3 hours',
                    trackingKey: 'morning_learning'
                }
            };
        }

        // Fasting Day Routine (Mon/Thu or Ayyam al-Beed)
        getFastingDayRoutine() {
            const regular = this.getRegularRoutine();

            return {
                suhoor: {
                    id: 'suhoor',
                    name: 'Suhoor - Pre-Dawn Meal',
                    arabicName: 'السحور',
                    time: 'Before Fajr',
                    icon: '🌅',
                    color: '#d4a574',
                    description: 'For voluntary fast days, eat a light suhoor following the Sunnah.',
                    hadith: 'Eat Suhoor, for in Suhoor there is barakah.',
                    source: 'Bukhari & Muslim',
                    benefits: ['Energy for fast', 'Following Sunnah', 'Barakah in time', 'Physical strength'],
                    actionItems: ['Eat light meal', 'Dates and water', 'Make intention', 'Morning adhkar'],
                    duration: '15-20 minutes',
                    trackingKey: 'suhoor'
                },

                ...regular,

                iftar: {
                    id: 'iftar',
                    name: 'Iftar - Breaking Fast',
                    arabicName: 'الإفطار',
                    time: 'At Maghrib',
                    icon: '🍽️',
                    color: '#16a085',
                    description: 'Break your fast with dates and water, following the Sunnah.',
                    hadith: 'When one of you breaks his fast, let him break it with dates.',
                    source: 'Tirmidhi',
                    benefits: ['Gratitude', 'Following Sunnah', 'Physical nourishment', 'Charity opportunity'],
                    actionItems: ['Start with dates', 'Make dua before eating', 'Share meal if possible', 'Express gratitude'],
                    duration: '20 minutes',
                    trackingKey: 'iftar'
                }
            };
        }

        // Ramadan Routine
        getRamadanRoutine() {
            const fastingDay = this.getFastingDayRoutine();

            return {
                tahajjud: fastingDay.tahajjud,
                suhoor: fastingDay.suhoor,
                fajr: fastingDay.fajr,
                morningAdhkar: {
                    ...fastingDay.morningAdhkar,
                    name: 'Morning Qur\'an & Ibadah',
                    description: 'In Ramadan, increase Qur\'an recitation and worship in the morning hours.',
                    actionItems: ['Read 1-2 Juz', 'Morning adhkar', 'Dua for fasting', 'Tarawih preparation']
                },

                duha: {
                    ...fastingDay.duha,
                    description: 'The Prophet (PBUH) would pray Duha in Ramadan and engage in extra worship.',
                    actionItems: ['Pray Duha (2-8 rakats)', 'Qur\'an recitation', 'Dua for acceptance', 'Dhikr']
                },

                workBlock1: fastingDay.workBlock1,
                dhuhr: fastingDay.dhuhr,

                qailulah: {
                    id: 'qailulah',
                    name: 'Qailulah - Midday Rest',
                    arabicName: 'قيلولة',
                    time: 'After Dhuhr',
                    icon: '😴',
                    color: '#95a5a6',
                    description: 'Short midday rest to recharge for Tarawih and night prayers.',
                    hadith: 'Take a midday nap, for the devils do not take midday naps.',
                    source: 'Tabarani',
                    benefits: ['Energy for Tarawih', 'Following Sunnah', 'Physical rest', 'Refreshed mind'],
                    actionItems: ['Short 20-30 min rest', 'Make wudu before sleeping', 'Sleep on right side', 'Wake for Asr'],
                    duration: '20-30 minutes',
                    trackingKey: 'qailulah'
                },

                workBlock2: fastingDay.workBlock2,
                asr: fastingDay.asr,
                iftarPrep: {
                    id: 'iftar_prep',
                    name: 'Iftar Preparation',
                    arabicName: 'تحضير الإفطار',
                    time: 'Before Maghrib',
                    icon: '🍲',
                    color: '#e74c3c',
                    description: 'Prepare for iftar and arrange dates and water following the Sunnah.',
                    hadith: 'Whoever provides food for a fasting person to break his fast will have his reward.',
                    source: 'Tirmidhi',
                    benefits: ['Reward for feeding fasting people', 'Family time', 'Preparation mindset', 'Charity opportunity'],
                    actionItems: ['Prepare dates and water', 'Set intention for iftar', 'Invite guests if possible', 'Make dua'],
                    duration: '30 minutes',
                    trackingKey: 'iftar_prep'
                },

                maghrib: fastingDay.maghrib,
                iftar: fastingDay.iftar,

                awwabin: {
                    id: 'awwabin',
                    name: 'Awwabin Prayer (After Maghrib)',
                    arabicName: 'صلاة الأوابين',
                    time: 'Between Maghrib and Isha',
                    icon: '🤲',
                    color: '#9b59b6',
                    description: 'Prayer between Maghrib and Isha, recommended especially in Ramadan.',
                    hadith: 'Whoever prays six rakats after Maghrib, Allah will forgive his sins.',
                    source: 'Tirmidhi',
                    benefits: ['Forgiveness of sins', 'Special Ramadan reward', 'Preparation for Tarawih', 'Spiritual charge'],
                    actionItems: ['Pray 2-6 rakats nafl', 'Recite Qur\'an', 'Make dua', 'Prepare for Tarawih'],
                    duration: '15-20 minutes',
                    trackingKey: 'awwabin'
                },

                isha: fastingDay.isha,

                tarawih: {
                    id: 'tarawih',
                    name: 'Tarawih Prayer',
                    arabicName: 'صلاة التراويح',
                    time: 'After Isha',
                    icon: '🕌',
                    color: '#8e44ad',
                    description: 'Special Ramadan night prayer, praying behind the imam in congregation.',
                    hadith: 'Whoever stands in prayer during Ramadan with faith and hope for reward will be forgiven.',
                    source: 'Bukhari & Muslim',
                    benefits: ['Forgiveness of sins', 'Qur\'an completion', 'Community bonding', 'Special blessing'],
                    actionItems: ['Pray in congregation', 'Listen to Qur\'an', 'Reflect on verses', 'Make dua in sujud'],
                    duration: '45-90 minutes',
                    trackingKey: 'tarawih'
                },

                witr: fastingDay.witr,

                nightQuran: {
                    id: 'night_quran',
                    name: 'Night Qur\'an & Reflection',
                    arabicName: 'قراءة الليل',
                    time: 'Before sleep',
                    icon: '📖',
                    color: '#1abc9c',
                    description: 'The Prophet (PBUH) would increase Qur\'an recitation in Ramadan, especially at night.',
                    hadith: 'The closest a servant is to his Lord is during the last part of the night.',
                    source: 'Tirmidhi',
                    benefits: ['Deep reflection', 'Peace before sleep', 'Understanding increase', 'Spiritual growth'],
                    actionItems: ['Read Qur\'an (1-2 pages)', 'Make heartfelt dua', 'Review the day', 'Sleep dua'],
                    duration: '20-30 minutes',
                    trackingKey: 'night_quran'
                }
            };
        }

        // Eid Day Routine
        getEidRoutine() {
            return {
                eidGhusl: {
                    id: 'eid_ghusl',
                    name: 'Eid Ghusl & Preparation',
                    arabicName: 'غسل العيد',
                    time: 'Morning',
                    icon: '🚿',
                    color: '#3498db',
                    description: 'The Prophet (PBUH) would perform ghusl on Eid day and wear his best clothes.',
                    hadith: 'The Prophet (PBUH) used to wear his most beautiful garment for Eid.',
                    source: 'Ibn Khuzaymah',
                    benefits: ['Special day honor', 'Following Sunnah', 'Joy and celebration', 'Best appearance'],
                    actionItems: ['Perform ghusl', 'Wear best clothes', 'Use perfume', 'Prepare for prayer'],
                    duration: '30 minutes',
                    trackingKey: 'eid_ghusl'
                },

                eidPrayer: {
                    id: 'eid_prayer',
                    name: 'Eid Prayer & Khutbah',
                    arabicName: 'صلاة العيد',
                    time: 'Morning',
                    icon: '🕌',
                    color: '#f39c12',
                    description: 'Attend Eid prayer in congregation, listen to khutbah, and meet fellow Muslims.',
                    hadith: 'The festivals of the believers are Eid al-Fitr and Eid al-Adha.',
                    source: 'Nasai',
                    benefits: ['Community unity', 'Special celebration', 'Blessings of day', 'Joy and thanks'],
                    actionItems: ['Pray in congregation', 'Listen to khutbah', 'Say takbeerat', 'Greet fellow Muslims'],
                    duration: '1-2 hours',
                    trackingKey: 'eid_prayer'
                },

                familyVisits: {
                    id: 'family_visits',
                    name: 'Family & Friends Visits',
                    arabicName: 'زيارة العائلة والأصدقاء',
                    time: 'Afternoon',
                    icon: '👨‍👩‍👧‍👦',
                    color: '#e74c3c',
                    description: 'Visit family members and friends, strengthen bonds, and share joy of Eid.',
                    hadith: 'The Muslim is the brother of the Muslim.',
                    source: 'Bukhari & Muslim',
                    benefits: ['Family bonding', 'Community unity', 'Spreading joy', 'Following Sunnah'],
                    actionItems: ['Visit family', 'Give gifts (Eidi)', 'Share meals', 'Connect with relatives'],
                    duration: '3-4 hours',
                    trackingKey: 'family_visits'
                },

                gratitude: {
                    id: 'gratitude',
                    name: 'Gratitude & Reflection',
                    arabicName: 'الشكر والتأمل',
                    time: 'Evening',
                    icon: '🤲',
                    color: '#27ae60',
                    description: 'Reflect on Ramadan/blessings completed and express gratitude to Allah.',
                    hadith: 'Whoever does not give thanks to people has not given thanks to Allah.',
                    source: 'Tirmidhi',
                    benefits: ['Spiritual reflection', 'Gratitude practice', 'Spiritual growth', 'Peace of heart'],
                    actionItems: ['Make shukr (thanks)', 'Reflect on Ramadan', 'Plan for continued worship', 'Family dua'],
                    duration: '20-30 minutes',
                    trackingKey: 'gratitude'
                }
            };
        }

        // ===== DATA MANAGEMENT =====
        loadRoutineData() {
            try {
                return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
            } catch { return {}; }
        }

        saveRoutineData(data) {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }

        getDateString(date = null) {
            const d = date || new Date();
            return d.toISOString().split('T')[0];
        }

        markComplete(itemId, date = null) {
            const dateStr = this.getDateString(date);
            const data = this.loadRoutineData();

            if (!data[dateStr]) {
                data[dateStr] = {};
            }

            data[dateStr][itemId] = {
                completed: true,
                timestamp: new Date().toISOString()
            };

            this.saveRoutineData(data);
            return true;
        }

        markIncomplete(itemId, date = null) {
            const dateStr = this.getDateString(date);
            const data = this.loadRoutineData();

            if (data[dateStr]) {
                delete data[dateStr][itemId];
                this.saveRoutineData(data);
                return true;
            }
            return false;
        }

        isComplete(itemId, date = null) {
            const dateStr = this.getDateString(date);
            const data = this.loadRoutineData();
            return data[dateStr]?.[itemId]?.completed || false;
        }

        // ===== PROGRESS CALCULATION =====
        calculateProgress(routineType = null, date = null) {
            const routine = this.getRoutineStructure(routineType);
            const dateStr = this.getDateString(date);
            const data = this.loadRoutineData();

            const total = Object.keys(routine).length;
            const completed = Object.keys(data[dateStr] || {}).length;

            return {
                completed,
                total,
                percentage: total > 0 ? Math.round((completed / total) * 100) : 0
            };
        }

        // ===== RENDER FUNCTIONS =====
        renderTimelineCard(itemId, routineStructure, date = null) {
            const item = routineStructure[itemId];
            if (!item) {
                return '';
            }

            const isComplete = this.isComplete(itemId, date);
            const computedStyle = getComputedStyle(document.documentElement);

            // Map item types to theme colors
            const colorMap = {
                tahajjud: computedStyle.getPropertyValue('--routine-ramadan').trim() || '#1e3a5f',
                suhoor: computedStyle.getPropertyValue('--routine-ramadan').trim() || '#1e3a5f',
                fajr: computedStyle.getPropertyValue('--routine-islamic').trim() || '#27ae60',
                morningAdhkar: computedStyle.getPropertyValue('--routine-islamic').trim() || '#27ae60',
                duha: computedStyle.getPropertyValue('--routine-jummah').trim() || '#f39c12',
                workBlock1: computedStyle.getPropertyValue('--routine-regular').trim() || '#3498db',
                morningLearning: computedStyle.getPropertyValue('--routine-regular').trim() || '#3498db',
                dhuhr: computedStyle.getPropertyValue('--routine-islamic').trim() || '#27ae60',
                qailulah: computedStyle.getPropertyValue('--routine-regular').trim() || '#3498db',
                jummah: computedStyle.getPropertyValue('--routine-jummah').trim() || '#f39c12',
                jummahPrep: computedStyle.getPropertyValue('--routine-jummah').trim() || '#f39c12',
                workBlock2: computedStyle.getPropertyValue('--routine-regular').trim() || '#3498db',
                asr: computedStyle.getPropertyValue('--routine-islamic').trim() || '#27ae60',
                familyTime: computedStyle.getPropertyValue('--routine-regular').trim() || '#3498db',
                iftarPrep: computedStyle.getPropertyValue('--routine-ramadan').trim() || '#1e3a5f',
                maghrib: computedStyle.getPropertyValue('--routine-islamic').trim() || '#27ae60',
                iftar: computedStyle.getPropertyValue('--routine-ramadan').trim() || '#1e3a5f',
                awwabin: computedStyle.getPropertyValue('--routine-special').trim() || '#9b59b6',
                isha: computedStyle.getPropertyValue('--routine-islamic').trim() || '#27ae60',
                tarawih: computedStyle.getPropertyValue('--routine-ramadan').trim() || '#1e3a5f',
                witr: computedStyle.getPropertyValue('--routine-islamic').trim() || '#27ae60',
                nightQuran: computedStyle.getPropertyValue('--routine-ramadan').trim() || '#1e3a5f',
                sleep: computedStyle.getPropertyValue('--routine-regular').trim() || '#3498db',
                eidGhusl: computedStyle.getPropertyValue('--routine-eid').trim() || '#27ae60',
                eidPrayer: computedStyle.getPropertyValue('--routine-eid').trim() || '#27ae60',
                familyVisits: computedStyle.getPropertyValue('--routine-eid').trim() || '#27ae60',
                gratitude: computedStyle.getPropertyValue('--routine-islamic').trim() || '#27ae60'
            };

            const itemColor = colorMap[itemId] || computedStyle.getPropertyValue('--routine-regular').trim() || '#3498db';

            return `
                <div class="prophetic-timeline-card" data-item-id="${itemId}" style="border-left: 4px solid ${itemColor}">
                    <div class="routine-card-header">
                        <div class="routine-icon" style="background-color: ${itemColor}20">
                            <span style="font-size: 1.5rem">${item.icon}</span>
                        </div>
                        <div class="routine-info">
                            <h4 class="routine-name">${item.name}</h4>
                            <p class="routine-arabic">${item.arabicName}</p>
                        </div>
                        <button class="routine-check-btn ${isComplete ? 'completed' : ''}"
                                data-item-id="${itemId}"
                                aria-label="Mark ${item.name} as complete">
                            ${isComplete ? '✓' : '○'}
                        </button>
                    </div>
                    <div class="routine-details">
                        <div class="routine-time">
                            <span class="time-icon">🕐</span>
                            <span>${item.time}</span>
                            <span class="duration">${item.duration}</span>
                        </div>
                        <p class="routine-description">${item.description}</p>
                        <div class="routine-hadith">
                            <span class="hadith-icon">❝</span>
                            <p>${item.hadith}</p>
                            <span class="hadith-source">— ${item.source}</span>
                        </div>
                        <div class="routine-details-grid">
                            <div class="routine-benefits">
                                <h5>Benefits:</h5>
                                <ul>
                                    ${item.benefits.map(b => `<li>${b}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="routine-actions">
                                <h5>Action Items:</h5>
                                <ul>
                                    ${item.actionItems.map(a => `<li>${a}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        renderFullTimeline(routineType = null, date = null) {
            const routine = this.getRoutineStructure(routineType);
            const typeInfo = this.getRoutineType(date);

            const sections = {
                'Night Routine': ['tahajjud', 'suhoor'].filter(k => routine[k]),
                'Morning Routine': ['fajr', 'morningAdhkar', 'duha'].filter(k => routine[k]),
                'Work & Learning': ['workBlock1', 'morningLearning', 'dhuhr', 'qailulah'].filter(k => routine[k]),
                'Afternoon': ['workBlock2', 'asr'].filter(k => routine[k]),
                'Evening Routine': ['familyTime', 'iftarPrep', 'maghrib', 'iftar', 'awwabin'].filter(k => routine[k]),
                'Night Prayers': ['isha', 'tarawih', 'witr', 'nightQuran', 'sleep'].filter(k => routine[k])
            };

            let html = `
                <div class="prophetic-routine-header">
                    <div class="routine-type-badge" style="background: ${this.getRoutineColor(typeInfo.type)}">
                        <span class="routine-type-icon">${typeInfo.icon}</span>
                        <span class="routine-type-label">${typeInfo.label}</span>
                    </div>
                    <div class="routine-progress-summary">
                        <span class="progress-label">Today's Progress</span>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${this.calculateProgress(routineType, date).percentage}%"></div>
                            </div>
                            <span class="progress-text">${this.calculateProgress(routineType, date).percentage}%</span>
                        </div>
                    </div>
                </div>
                <div class="prophetic-timeline">
            `;

            for (const [sectionName, items] of Object.entries(sections)) {
                if (items.length === 0) continue;

                const sectionProgress = this.calculateSectionProgress(items, date);

                html += `
                    <div class="routine-section">
                        <h3 class="section-title">${sectionName}</h3>
                        <div class="section-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${sectionProgress}%"></div>
                            </div>
                            <span class="progress-text">${sectionProgress}%</span>
                        </div>
                        <div class="routine-cards">
                            ${items.map(itemId => this.renderTimelineCard(itemId, routine, date)).join('')}
                        </div>
                    </div>
                `;
            }

            html += '</div>';
            return html;
        }

        calculateSectionProgress(items, date = null) {
            let completed = 0;
            items.forEach(itemId => {
                if (this.isComplete(itemId, date)) {
                    completed++;
                }
            });
            return items.length > 0 ? Math.round((completed / items.length) * 100) : 0;
        }

        getRoutineColor(type) {
            // Get colors from CSS variables
            const computedStyle = getComputedStyle(document.documentElement);
            const colors = {
                [RoutineType.REGULAR]: computedStyle.getPropertyValue('--routine-regular').trim() || '#3498db',
                [RoutineType.JUMMAH]: computedStyle.getPropertyValue('--routine-jummah').trim() || '#f39c12',
                [RoutineType.MON_THU_FAST]: computedStyle.getPropertyValue('--routine-special').trim() || '#9b59b6',
                [RoutineType.AYYAM_AL_BEED]: computedStyle.getPropertyValue('--routine-ayyam-al-beed').trim() || '#ecf0f1',
                [RoutineType.RAMADAN]: computedStyle.getPropertyValue('--routine-ramadan').trim() || '#1e3a5f',
                [RoutineType.EID]: computedStyle.getPropertyValue('--routine-eid').trim() || '#27ae60'
            };
            return colors[type] || colors[RoutineType.REGULAR];
        }

        // Get current recommendation based on time
        getCurrentRecommendation() {
            const hour = new Date().getHours();
            const routine = this.getRoutineStructure();
            const typeInfo = this.getRoutineType();

            // Time-based recommendations
            const timeMap = {
                tahajjud: [3, 5],
                suhoor: [5, 6],
                fajr: [6, 7],
                morningAdhkar: [7, 9],
                duha: [9, 11],
                workBlock1: [9, 12],
                morningLearning: [9, 12],
                dhuhr: [12, 14],
                jummah: [12, 14],
                qailulah: [14, 15],
                workBlock2: [14, 17],
                asr: [15, 17],
                familyTime: [17, 18],
                iftarPrep: [17, 18],
                maghrib: [18, 19],
                iftar: [18, 20],
                awwabin: [19, 20],
                isha: [20, 22],
                tarawih: [21, 23],
                witr: [22, 23],
                nightQuran: [22, 23],
                sleep: [22, 3]
            };

            for (const [itemId, timeRange] of Object.entries(timeMap)) {
                if (hour >= timeRange[0] && hour < timeRange[1]) {
                    if (routine[itemId]) {
                        return {
                            ...routine[itemId],
                            routineType: typeInfo
                        };
                    }
                }
            }

            return null;
        }
    }

    // ===== EXPORT =====
    window.PropheticDailyRoutine = PropheticDailyRoutine;
    window.RoutineType = RoutineType;

})();
