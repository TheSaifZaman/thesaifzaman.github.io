/**
 * Challenge Templates Data
 * ========================
 *
 * This file contains all pre-built challenge templates, categories, and
 * configuration constants for the Challenge Tracker app.
 *
 * HOW TO ADD A NEW TEMPLATE:
 * --------------------------
 * 1. Pick the appropriate category from CHALLENGE_CATEGORIES below.
 * 2. Add a new object to the CHALLENGE_TEMPLATES array with these fields:
 *
 *    {
 *        icon: '....',              // A single emoji that represents the challenge
 *        name: 'Challenge Name',    // Short, catchy title
 *        description: 'One sentence description of the challenge',
 *        goal: 'Daily action the user should take',
 *        category: 'category_key',  // Must match a key in CHALLENGE_CATEGORIES
 *        duration: 30,              // One of: 21, 30, 40, 60, 90, or 100
 *        tags: ['tag1', 'tag2']     // 2-4 lowercase search keywords
 *    }
 *
 * 3. Choose a sensible default duration:
 *    - 21 days: habit kickstarters, detox challenges
 *    - 30 days: standard monthly challenges
 *    - 40 days: spiritual / deeper habit formation
 *    - 60 days: intermediate skill-building
 *    - 90 days: major transformations, long-form study
 *    - 100 days: flagship "100-day" challenges
 *
 * 4. Tags should be lowercase and useful for search/filtering.
 */

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

var CHALLENGE_CATEGORIES = {
    islamic:      { label: 'Islamic',      icon: 'fas fa-mosque',          color: '#22c55e' },
    fitness:      { label: 'Fitness',      icon: 'fas fa-dumbbell',        color: '#ef4444' },
    learning:     { label: 'Learning',     icon: 'fas fa-graduation-cap',  color: '#3b82f6' },
    productivity: { label: 'Productivity', icon: 'fas fa-chart-line',      color: '#f59e0b' },
    nutrition:    { label: 'Nutrition',    icon: 'fas fa-apple-whole',     color: '#10b981' },
    mindfulness:  { label: 'Mindfulness',  icon: 'fas fa-brain',           color: '#8b5cf6' },
    social:       { label: 'Social',       icon: 'fas fa-users',           color: '#ec4899' },
    finance:      { label: 'Finance',      icon: 'fas fa-piggy-bank',     color: '#14b8a6' },
    creative:     { label: 'Creative',     icon: 'fas fa-palette',         color: '#f97316' },
    career:       { label: 'Career',       icon: 'fas fa-briefcase',       color: '#6366f1' }
};

// ---------------------------------------------------------------------------
// Supported durations & grid column mappings
// ---------------------------------------------------------------------------

var DURATIONS = [21, 30, 40, 60, 90, 100];

var GRID_COLS = { 21: 7, 30: 6, 40: 8, 60: 10, 90: 10, 100: 10 };

// ---------------------------------------------------------------------------
// Challenge Templates (101+)
// ---------------------------------------------------------------------------

var CHALLENGE_TEMPLATES = [

    // ======================================================================
    // ISLAMIC (15 templates)
    // ======================================================================
    {
        icon: '\uD83D\uDCD6',
        name: 'Complete Quran Reading',
        description: 'Read the entire Quran from cover to cover with reflection.',
        goal: 'Read at least 4 pages of the Quran daily',
        category: 'islamic',
        duration: 100,
        tags: ['quran', 'reading', 'tilawah', 'recitation']
    },
    {
        icon: '\uD83D\uDD4C',
        name: 'Pray All Sunnah Prayers',
        description: 'Build the habit of praying the 12 daily Sunnah rakaat.',
        goal: 'Pray all recommended Sunnah prayers alongside the fard',
        category: 'islamic',
        duration: 40,
        tags: ['prayer', 'salah', 'sunnah', 'worship']
    },
    {
        icon: '\uD83D\uDCFF',
        name: 'Daily Adhkar Practice',
        description: 'Never miss your morning and evening remembrance of Allah.',
        goal: 'Complete morning and evening adhkar from Hisn al-Muslim',
        category: 'islamic',
        duration: 40,
        tags: ['dhikr', 'adhkar', 'remembrance', 'morning']
    },
    {
        icon: '\uD83C\uDF19',
        name: 'Tahajjud Night Prayer',
        description: 'Wake before Fajr and stand in the blessed night prayer.',
        goal: 'Pray at least 2 rakaat of Tahajjud before Fajr',
        category: 'islamic',
        duration: 40,
        tags: ['tahajjud', 'night', 'prayer', 'qiyam']
    },
    {
        icon: '\uD83C\uDF4E',
        name: 'Sunnah Fasting Mondays & Thursdays',
        description: 'Revive the Sunnah of fasting every Monday and Thursday.',
        goal: 'Fast on Monday and Thursday each week',
        category: 'islamic',
        duration: 90,
        tags: ['fasting', 'sunnah', 'sawm', 'monday']
    },
    {
        icon: '\uD83D\uDCDA',
        name: 'Read the Complete Seerah',
        description: 'Study the life of Prophet Muhammad (peace be upon him) in depth.',
        goal: 'Read a chapter or 10+ pages of a Seerah book daily',
        category: 'islamic',
        duration: 90,
        tags: ['seerah', 'prophet', 'biography', 'history']
    },
    {
        icon: '\uD83D\uDDD2\uFE0F',
        name: 'Learn One Hadith a Day',
        description: 'Build a collection of authentic hadith in your heart and mind.',
        goal: 'Study and memorise one hadith with its context',
        category: 'islamic',
        duration: 100,
        tags: ['hadith', 'memorisation', 'sunnah', 'knowledge']
    },
    {
        icon: '\uD83E\uDD32',
        name: 'Daily Dua Journal',
        description: 'Deepen your connection with Allah through heartfelt supplication.',
        goal: 'Learn a new dua or write personal duas in a journal',
        category: 'islamic',
        duration: 30,
        tags: ['dua', 'supplication', 'journal', 'prayer']
    },
    {
        icon: '\uD83C\uDFA4',
        name: 'Tajweed Improvement',
        description: 'Perfect your Quran recitation by mastering tajweed rules.',
        goal: 'Practice tajweed rules for 15+ minutes with a resource or teacher',
        category: 'islamic',
        duration: 60,
        tags: ['tajweed', 'quran', 'recitation', 'pronunciation']
    },
    {
        icon: '\uD83D\uDCB0',
        name: 'Daily Sadaqah',
        description: 'Give something in charity every single day, no matter how small.',
        goal: 'Give sadaqah today — money, food, a smile, or a kind word',
        category: 'islamic',
        duration: 30,
        tags: ['sadaqah', 'charity', 'giving', 'generosity']
    },
    {
        icon: '\u2712\uFE0F',
        name: 'Arabic Alphabet & Reading',
        description: 'Learn to read Arabic script from scratch and build fluency.',
        goal: 'Practice Arabic letters, joining, and reading for 20 minutes',
        category: 'islamic',
        duration: 60,
        tags: ['arabic', 'language', 'alphabet', 'reading']
    },
    {
        icon: '\uD83C\uDFF0',
        name: 'Islamic History Deep Dive',
        description: 'Explore the rich history of Islamic civilisation era by era.',
        goal: 'Read or watch a lesson on Islamic history for 20 minutes',
        category: 'islamic',
        duration: 60,
        tags: ['history', 'civilisation', 'islamic', 'knowledge']
    },
    {
        icon: '\uD83D\uDCD2',
        name: 'Memorise Quran — Juz Amma',
        description: 'Commit the 30th Juz of the Quran to memory with revision.',
        goal: 'Memorise new ayaat and revise previously memorised portions',
        category: 'islamic',
        duration: 90,
        tags: ['quran', 'memorisation', 'hifz', 'juz']
    },
    {
        icon: '\uD83E\uDDD8',
        name: 'Istighfar 100 Times Daily',
        description: 'Seek forgiveness throughout the day as the Prophet recommended.',
        goal: 'Say Astaghfirullah at least 100 times throughout the day',
        category: 'islamic',
        duration: 40,
        tags: ['istighfar', 'dhikr', 'forgiveness', 'repentance']
    },
    {
        icon: '\uD83D\uDC65',
        name: 'Attend the Masjid for Every Salah',
        description: 'Pray in congregation and earn the multiplied reward.',
        goal: 'Pray at least one salah in the masjid today',
        category: 'islamic',
        duration: 40,
        tags: ['masjid', 'congregation', 'salah', 'community']
    },

    // ======================================================================
    // FITNESS (12 templates)
    // ======================================================================
    {
        icon: '\uD83C\uDFC3',
        name: 'Couch to 5K Running',
        description: 'Go from zero running to completing a full 5K comfortably.',
        goal: 'Follow a C25K training session or run for 20+ minutes',
        category: 'fitness',
        duration: 60,
        tags: ['running', 'cardio', '5k', 'beginner']
    },
    {
        icon: '\uD83D\uDD25',
        name: 'Daily HIIT Blast',
        description: 'Burn fat and build endurance with intense interval training.',
        goal: 'Complete a 15-20 minute HIIT workout',
        category: 'fitness',
        duration: 30,
        tags: ['hiit', 'cardio', 'fat burn', 'intense']
    },
    {
        icon: '\uD83E\uDDD8',
        name: 'Yoga Every Day',
        description: 'Improve flexibility, balance, and mental calm with daily yoga.',
        goal: 'Complete a 20+ minute yoga session',
        category: 'fitness',
        duration: 30,
        tags: ['yoga', 'flexibility', 'balance', 'stretch']
    },
    {
        icon: '\uD83D\uDCAA',
        name: '100 Pushups a Day',
        description: 'Build serious upper body strength one pushup at a time.',
        goal: 'Complete 100 pushups throughout the day',
        category: 'fitness',
        duration: 30,
        tags: ['pushups', 'strength', 'upper body', 'calisthenics']
    },
    {
        icon: '\u23F1\uFE0F',
        name: 'Plank Challenge',
        description: 'Build an iron core by increasing your plank hold each day.',
        goal: 'Hold a plank — add 5 seconds more than yesterday',
        category: 'fitness',
        duration: 30,
        tags: ['plank', 'core', 'strength', 'abs']
    },
    {
        icon: '\uD83C\uDFCA',
        name: 'Swim Every Day',
        description: 'Make swimming a consistent part of your fitness routine.',
        goal: 'Swim for at least 20 minutes or complete a set workout',
        category: 'fitness',
        duration: 30,
        tags: ['swimming', 'cardio', 'full body', 'endurance']
    },
    {
        icon: '\uD83D\uDEB6',
        name: '10,000 Steps Daily',
        description: 'Walk your way to better health one step at a time.',
        goal: 'Hit 10,000 steps today',
        category: 'fitness',
        duration: 100,
        tags: ['walking', 'steps', 'movement', 'daily']
    },
    {
        icon: '\uD83D\uDEB4',
        name: 'Cycling Challenge',
        description: 'Build leg strength and cardiovascular fitness on two wheels.',
        goal: 'Cycle for at least 30 minutes or 10 km',
        category: 'fitness',
        duration: 30,
        tags: ['cycling', 'cardio', 'legs', 'outdoor']
    },
    {
        icon: '\uD83E\uDD38',
        name: 'Morning Stretch Routine',
        description: 'Start every day limber with a dedicated stretching session.',
        goal: 'Complete a 10-15 minute full-body stretch in the morning',
        category: 'fitness',
        duration: 30,
        tags: ['stretching', 'flexibility', 'morning', 'mobility']
    },
    {
        icon: '\uD83E\uDD4A',
        name: 'Martial Arts Training',
        description: 'Develop discipline and self-defence skills through daily practice.',
        goal: 'Train martial arts techniques or drills for 30+ minutes',
        category: 'fitness',
        duration: 90,
        tags: ['martial arts', 'discipline', 'training', 'self defence']
    },
    {
        icon: '\u2B55',
        name: 'Jump Rope Mastery',
        description: 'One of the best full-body workouts with just a rope.',
        goal: 'Jump rope for 10-15 minutes or 1000 skips',
        category: 'fitness',
        duration: 30,
        tags: ['jump rope', 'cardio', 'coordination', 'agility']
    },
    {
        icon: '\uD83C\uDFCB\uFE0F',
        name: 'Strength Training Programme',
        description: 'Build muscle and functional strength with consistent weight training.',
        goal: 'Complete a structured strength training session',
        category: 'fitness',
        duration: 90,
        tags: ['weights', 'strength', 'muscle', 'gym']
    },

    // ======================================================================
    // LEARNING (12 templates)
    // ======================================================================
    {
        icon: '\uD83D\uDCDA',
        name: 'Read 30 Minutes a Day',
        description: 'Build a lifelong reading habit and finish more books this year.',
        goal: 'Read for at least 30 minutes from any book',
        category: 'learning',
        duration: 100,
        tags: ['reading', 'books', 'knowledge', 'habit']
    },
    {
        icon: '\uD83C\uDF0D',
        name: 'Learn a New Language',
        description: 'Open doors to new cultures by studying a language daily.',
        goal: 'Study your target language for 20+ minutes (app, class, or practice)',
        category: 'learning',
        duration: 100,
        tags: ['language', 'duolingo', 'speaking', 'vocabulary']
    },
    {
        icon: '\uD83C\uDF93',
        name: 'Complete an Online Course',
        description: 'Finish that course you started by committing daily time to it.',
        goal: 'Watch a lecture or complete a lesson in your online course',
        category: 'learning',
        duration: 60,
        tags: ['course', 'online', 'education', 'skill']
    },
    {
        icon: '\uD83D\uDCBB',
        name: 'Code Every Day',
        description: 'Sharpen your programming skills through daily practice.',
        goal: 'Write code, solve a problem, or build a feature for 30+ minutes',
        category: 'learning',
        duration: 100,
        tags: ['coding', 'programming', 'developer', 'tech']
    },
    {
        icon: '\u270D\uFE0F',
        name: 'Write 500 Words a Day',
        description: 'Develop your writing voice by putting words on the page daily.',
        goal: 'Write at least 500 words — essay, journal, fiction, or blog',
        category: 'learning',
        duration: 30,
        tags: ['writing', 'words', 'essay', 'practice']
    },
    {
        icon: '\u265F\uFE0F',
        name: 'Daily Chess Practice',
        description: 'Improve tactical thinking and strategy through chess.',
        goal: 'Play a game or solve chess puzzles for 20 minutes',
        category: 'learning',
        duration: 30,
        tags: ['chess', 'strategy', 'puzzles', 'thinking']
    },
    {
        icon: '\uD83D\uDCA8',
        name: 'Speed Reading Training',
        description: 'Double your reading speed while maintaining comprehension.',
        goal: 'Do speed reading drills or practice techniques for 15 minutes',
        category: 'learning',
        duration: 30,
        tags: ['speed reading', 'reading', 'comprehension', 'focus']
    },
    {
        icon: '\uD83C\uDFB5',
        name: 'Learn an Instrument',
        description: 'Master a musical instrument through consistent daily practice.',
        goal: 'Practice your instrument for 30+ minutes',
        category: 'learning',
        duration: 90,
        tags: ['music', 'instrument', 'practice', 'skill']
    },
    {
        icon: '\uD83D\uDCF7',
        name: 'Photography Skills',
        description: 'Train your eye and technical ability by shooting every day.',
        goal: 'Take at least 5 intentional photos and review one composition tip',
        category: 'learning',
        duration: 30,
        tags: ['photography', 'camera', 'composition', 'visual']
    },
    {
        icon: '\uD83E\uDDE0',
        name: 'Learn Something New Daily',
        description: 'Feed your curiosity by exploring a new topic every day.',
        goal: 'Spend 20 minutes learning something you did not know before',
        category: 'learning',
        duration: 100,
        tags: ['curiosity', 'learning', 'knowledge', 'growth']
    },
    {
        icon: '\uD83D\uDCDD',
        name: 'Vocabulary Builder',
        description: 'Expand your vocabulary with new words and active usage.',
        goal: 'Learn 3 new words and use them in a sentence',
        category: 'learning',
        duration: 60,
        tags: ['vocabulary', 'words', 'english', 'language']
    },
    {
        icon: '\uD83C\uDF10',
        name: 'Public Speaking Practice',
        description: 'Become a confident speaker through daily structured practice.',
        goal: 'Record a 2-minute talk or practice a speech technique',
        category: 'learning',
        duration: 30,
        tags: ['speaking', 'presentation', 'confidence', 'communication']
    },

    // ======================================================================
    // PRODUCTIVITY (10 templates)
    // ======================================================================
    {
        icon: '\u2600\uFE0F',
        name: 'Wake Up at Fajr',
        description: 'Start your day early and claim the barakah of the morning.',
        goal: 'Wake up at or before Fajr time and avoid going back to sleep',
        category: 'productivity',
        duration: 40,
        tags: ['wake early', 'fajr', 'morning', 'routine']
    },
    {
        icon: '\uD83D\uDCF5',
        name: 'No Social Media',
        description: 'Reclaim your time and attention by quitting social media.',
        goal: 'Zero social media scrolling today (news feeds, reels, stories)',
        category: 'productivity',
        duration: 30,
        tags: ['social media', 'detox', 'focus', 'digital']
    },
    {
        icon: '\uD83D\uDCD3',
        name: 'Daily Journaling',
        description: 'Gain clarity and self-awareness by writing in a journal.',
        goal: 'Write in your journal for at least 10 minutes',
        category: 'productivity',
        duration: 30,
        tags: ['journaling', 'writing', 'reflection', 'clarity']
    },
    {
        icon: '\uD83D\uDCCB',
        name: 'Plan Tomorrow Tonight',
        description: 'End each day by planning the next so you wake with purpose.',
        goal: 'Write down your top 3 priorities for tomorrow before bed',
        category: 'productivity',
        duration: 30,
        tags: ['planning', 'priorities', 'evening', 'organisation']
    },
    {
        icon: '\uD83C\uDFAF',
        name: 'Deep Work Sessions',
        description: 'Train your ability to focus deeply on cognitively demanding work.',
        goal: 'Complete at least one 90-minute uninterrupted deep work block',
        category: 'productivity',
        duration: 30,
        tags: ['deep work', 'focus', 'concentration', 'flow']
    },
    {
        icon: '\uD83C\uDF45',
        name: 'Pomodoro Technique',
        description: 'Use timed work-rest cycles to maintain peak productivity.',
        goal: 'Complete at least 6 pomodoro sessions (25 min work / 5 min rest)',
        category: 'productivity',
        duration: 30,
        tags: ['pomodoro', 'timer', 'focus', 'technique']
    },
    {
        icon: '\uD83D\uDCE7',
        name: 'Inbox Zero',
        description: 'Tame the email beast by processing your inbox to zero daily.',
        goal: 'Process all emails — reply, archive, or schedule every message',
        category: 'productivity',
        duration: 21,
        tags: ['email', 'inbox', 'organisation', 'communication']
    },
    {
        icon: '\u23F0',
        name: 'Time Tracking',
        description: 'Discover where your hours go by tracking your time meticulously.',
        goal: 'Track every hour of your day in a time log or app',
        category: 'productivity',
        duration: 21,
        tags: ['time', 'tracking', 'awareness', 'audit']
    },
    {
        icon: '\uD83D\uDEB7',
        name: 'No Procrastination',
        description: 'Beat procrastination by using the 2-minute rule every day.',
        goal: 'If a task takes less than 2 minutes, do it immediately',
        category: 'productivity',
        duration: 30,
        tags: ['procrastination', 'action', 'habit', 'discipline']
    },
    {
        icon: '\uD83D\uDCF1',
        name: 'Screen Time Under 2 Hours',
        description: 'Limit recreational screen time to take back your evenings.',
        goal: 'Keep non-work screen time under 2 hours today',
        category: 'productivity',
        duration: 30,
        tags: ['screen time', 'digital', 'limit', 'discipline']
    },

    // ======================================================================
    // NUTRITION (10 templates)
    // ======================================================================
    {
        icon: '\uD83D\uDCA7',
        name: 'Drink 8 Glasses of Water',
        description: 'Stay properly hydrated for better energy and focus.',
        goal: 'Drink at least 8 glasses (2 litres) of water today',
        category: 'nutrition',
        duration: 30,
        tags: ['water', 'hydration', 'health', 'daily']
    },
    {
        icon: '\uD83C\uDF71',
        name: 'Weekly Meal Prep',
        description: 'Save time and eat healthier by preparing meals in advance.',
        goal: 'Prep or plan meals for the day/week and eat home-cooked food',
        category: 'nutrition',
        duration: 30,
        tags: ['meal prep', 'cooking', 'planning', 'healthy']
    },
    {
        icon: '\uD83D\uDEAB',
        name: '21-Day No Sugar',
        description: 'Break the sugar addiction and reset your taste buds.',
        goal: 'Consume zero added sugar or sugary drinks today',
        category: 'nutrition',
        duration: 21,
        tags: ['no sugar', 'detox', 'clean eating', 'health']
    },
    {
        icon: '\uD83E\uDD66',
        name: 'Eat 5 Servings of Vegetables',
        description: 'Flood your body with nutrients by eating more vegetables.',
        goal: 'Eat at least 5 servings of vegetables across your meals',
        category: 'nutrition',
        duration: 30,
        tags: ['vegetables', 'nutrition', 'greens', 'health']
    },
    {
        icon: '\u23F3',
        name: 'Intermittent Fasting',
        description: 'Practice time-restricted eating for metabolic and mental benefits.',
        goal: 'Fast for 16 hours and eat within an 8-hour window',
        category: 'nutrition',
        duration: 30,
        tags: ['fasting', 'intermittent', '16:8', 'metabolism']
    },
    {
        icon: '\uD83D\uDC68\u200D\uD83C\uDF73',
        name: 'Cook a New Recipe',
        description: 'Expand your cooking skills by trying something new each day.',
        goal: 'Cook at least one meal at home — try a new recipe if possible',
        category: 'nutrition',
        duration: 30,
        tags: ['cooking', 'recipe', 'homemade', 'skill']
    },
    {
        icon: '\uD83C\uDF4F',
        name: 'Sunnah Foods Challenge',
        description: 'Incorporate foods mentioned in the Quran and Sunnah into your diet.',
        goal: 'Eat at least one Sunnah food today (dates, honey, olive oil, etc.)',
        category: 'nutrition',
        duration: 30,
        tags: ['sunnah', 'dates', 'honey', 'prophetic']
    },
    {
        icon: '\uD83E\uDD62',
        name: 'Mindful Eating',
        description: 'Slow down and be present with every bite you take.',
        goal: 'Eat at least one meal without screens, chewing slowly and mindfully',
        category: 'nutrition',
        duration: 21,
        tags: ['mindful', 'eating', 'slow', 'awareness']
    },
    {
        icon: '\uD83C\uDF3E',
        name: 'No Processed Food',
        description: 'Fuel your body with whole, unprocessed ingredients only.',
        goal: 'Eat only whole foods — nothing from a packet or fast food joint',
        category: 'nutrition',
        duration: 30,
        tags: ['whole food', 'clean eating', 'processed', 'natural']
    },
    {
        icon: '\uD83C\uDF53',
        name: 'Eat a Healthy Breakfast',
        description: 'Start every morning with a nutritious, balanced breakfast.',
        goal: 'Eat a healthy breakfast within an hour of waking up',
        category: 'nutrition',
        duration: 30,
        tags: ['breakfast', 'morning', 'nutrition', 'energy']
    },

    // ======================================================================
    // MINDFULNESS (10 templates)
    // ======================================================================
    {
        icon: '\uD83D\uDE4F',
        name: 'Gratitude Journal',
        description: 'Shift your mindset by recording what you are grateful for.',
        goal: 'Write down 3 things you are grateful for today',
        category: 'mindfulness',
        duration: 30,
        tags: ['gratitude', 'journal', 'thankfulness', 'mindset']
    },
    {
        icon: '\uD83E\uDDD8\u200D\u2642\uFE0F',
        name: 'Daily Meditation',
        description: 'Cultivate inner peace and mental clarity through meditation.',
        goal: 'Meditate for at least 10 minutes',
        category: 'mindfulness',
        duration: 30,
        tags: ['meditation', 'calm', 'focus', 'peace']
    },
    {
        icon: '\uD83D\uDCF4',
        name: 'Digital Detox Hour',
        description: 'Give your mind a break from screens every single day.',
        goal: 'Spend at least 1 hour completely screen-free (not counting work)',
        category: 'mindfulness',
        duration: 30,
        tags: ['digital detox', 'screens', 'rest', 'unplug']
    },
    {
        icon: '\uD83C\uDF33',
        name: 'Daily Nature Walk',
        description: 'Reconnect with the natural world and refresh your spirit.',
        goal: 'Walk in nature for at least 20 minutes — park, trail, or garden',
        category: 'mindfulness',
        duration: 30,
        tags: ['nature', 'walk', 'outdoor', 'refresh']
    },
    {
        icon: '\uD83C\uDF2C\uFE0F',
        name: 'Breathing Exercises',
        description: 'Reduce stress and anxiety with daily breathing techniques.',
        goal: 'Practice box breathing or 4-7-8 technique for 5-10 minutes',
        category: 'mindfulness',
        duration: 21,
        tags: ['breathing', 'stress', 'calm', 'relaxation']
    },
    {
        icon: '\u2728',
        name: 'Positive Affirmations',
        description: 'Rewire your inner dialogue with intentional positive words.',
        goal: 'Recite or write 5 positive affirmations in the morning',
        category: 'mindfulness',
        duration: 21,
        tags: ['affirmations', 'positive', 'mindset', 'self-talk']
    },
    {
        icon: '\uD83E\uDD1D',
        name: 'Random Act of Kindness',
        description: 'Make the world better by doing something kind every day.',
        goal: 'Perform one deliberate act of kindness for someone today',
        category: 'mindfulness',
        duration: 30,
        tags: ['kindness', 'compassion', 'giving', 'goodness']
    },
    {
        icon: '\uD83D\uDECC',
        name: 'Sleep Hygiene Routine',
        description: 'Improve your sleep quality with a consistent bedtime routine.',
        goal: 'Follow your wind-down routine and be in bed by your target time',
        category: 'mindfulness',
        duration: 30,
        tags: ['sleep', 'routine', 'rest', 'bedtime']
    },
    {
        icon: '\uD83C\uDFA7',
        name: 'Mindful Listening',
        description: 'Be fully present in every conversation you have today.',
        goal: 'Practice active, undistracted listening in at least one conversation',
        category: 'mindfulness',
        duration: 21,
        tags: ['listening', 'presence', 'attention', 'communication']
    },
    {
        icon: '\uD83D\uDCDD',
        name: 'Evening Reflection',
        description: 'End each day with intention by reflecting on what happened.',
        goal: 'Spend 10 minutes reviewing your day — wins, lessons, and intentions',
        category: 'mindfulness',
        duration: 30,
        tags: ['reflection', 'evening', 'review', 'growth']
    },

    // ======================================================================
    // SOCIAL (10 templates)
    // ======================================================================
    {
        icon: '\uD83D\uDCDE',
        name: 'Call a Family Member',
        description: 'Strengthen family bonds by reaching out every day.',
        goal: 'Call or video-call a family member you have not spoken to recently',
        category: 'social',
        duration: 30,
        tags: ['family', 'call', 'connection', 'relationships']
    },
    {
        icon: '\u2709\uFE0F',
        name: 'Write a Letter or Message',
        description: 'Brighten someone\'s day with a thoughtful handwritten note or message.',
        goal: 'Write and send a letter, card, or heartfelt message to someone',
        category: 'social',
        duration: 30,
        tags: ['letter', 'writing', 'thoughtful', 'connection']
    },
    {
        icon: '\uD83E\uDD1D',
        name: 'Community Service',
        description: 'Serve your local community and make a tangible difference.',
        goal: 'Volunteer or do an act of community service for at least 30 minutes',
        category: 'social',
        duration: 30,
        tags: ['community', 'volunteer', 'service', 'impact']
    },
    {
        icon: '\uD83C\uDF1F',
        name: 'Mentorship Sessions',
        description: 'Grow by mentoring others or being mentored yourself.',
        goal: 'Spend 15+ minutes mentoring someone or learning from a mentor',
        category: 'social',
        duration: 60,
        tags: ['mentor', 'guidance', 'growth', 'teaching']
    },
    {
        icon: '\uD83D\uDC64',
        name: 'Networking Challenge',
        description: 'Expand your professional and personal network intentionally.',
        goal: 'Reach out to one new or existing contact with a genuine message',
        category: 'social',
        duration: 30,
        tags: ['networking', 'connection', 'professional', 'outreach']
    },
    {
        icon: '\uD83C\uDFE5',
        name: 'Volunteer Weekly',
        description: 'Commit regular time to a cause you care about.',
        goal: 'Dedicate time to volunteering or planning your volunteer commitments',
        category: 'social',
        duration: 90,
        tags: ['volunteer', 'charity', 'cause', 'giving back']
    },
    {
        icon: '\uD83C\uDF74',
        name: 'Invite Someone for a Meal',
        description: 'Build friendships by sharing food — a Sunnah practice.',
        goal: 'Share a meal or snack with someone — invite them or bring food',
        category: 'social',
        duration: 30,
        tags: ['hospitality', 'food', 'friendship', 'sunnah']
    },
    {
        icon: '\uD83D\uDE42',
        name: 'Compliment Someone Sincerely',
        description: 'Spread positivity by giving a genuine compliment every day.',
        goal: 'Give at least one sincere, specific compliment to someone',
        category: 'social',
        duration: 21,
        tags: ['compliment', 'positivity', 'encouragement', 'kindness']
    },
    {
        icon: '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66',
        name: 'Quality Family Time',
        description: 'Be fully present with your family without any distractions.',
        goal: 'Spend 30+ minutes of quality, screen-free time with family',
        category: 'social',
        duration: 30,
        tags: ['family', 'quality time', 'presence', 'bonding']
    },
    {
        icon: '\uD83D\uDDE3\uFE0F',
        name: 'Check on a Friend',
        description: 'Be the friend who checks in without being asked.',
        goal: 'Reach out to a friend to ask how they are doing',
        category: 'social',
        duration: 30,
        tags: ['friendship', 'check in', 'care', 'support']
    },

    // ======================================================================
    // FINANCE (8 templates)
    // ======================================================================
    {
        icon: '\uD83D\uDCB5',
        name: 'Save Money Daily',
        description: 'Build wealth gradually by saving a fixed amount every day.',
        goal: 'Transfer your daily savings amount to your savings account',
        category: 'finance',
        duration: 100,
        tags: ['saving', 'money', 'daily', 'wealth']
    },
    {
        icon: '\uD83D\uDCCA',
        name: 'Track Every Expense',
        description: 'Know exactly where your money goes by logging every purchase.',
        goal: 'Record every expense in your tracker app or spreadsheet',
        category: 'finance',
        duration: 30,
        tags: ['expenses', 'tracking', 'budget', 'awareness']
    },
    {
        icon: '\uD83D\uDED2',
        name: 'No Impulse Buying',
        description: 'Apply the 24-hour rule before every non-essential purchase.',
        goal: 'Buy nothing non-essential — if tempted, wait 24 hours',
        category: 'finance',
        duration: 30,
        tags: ['impulse', 'spending', 'discipline', 'minimalism']
    },
    {
        icon: '\uD83D\uDCC8',
        name: 'Learn Investing Basics',
        description: 'Build financial literacy by studying investing every day.',
        goal: 'Read or watch investing content for 15+ minutes',
        category: 'finance',
        duration: 30,
        tags: ['investing', 'financial literacy', 'stocks', 'learning']
    },
    {
        icon: '\uD83D\uDCCB',
        name: 'Budgeting Habit',
        description: 'Master your money by reviewing and adjusting your budget daily.',
        goal: 'Review your budget and categorise today\'s transactions',
        category: 'finance',
        duration: 30,
        tags: ['budget', 'planning', 'money management', 'review']
    },
    {
        icon: '\uD83D\uDCC9',
        name: 'Debt Payoff Sprint',
        description: 'Aggressively pay down debt with focused daily actions.',
        goal: 'Make an extra payment or find one way to save money towards debt',
        category: 'finance',
        duration: 90,
        tags: ['debt', 'payoff', 'financial freedom', 'savings']
    },
    {
        icon: '\uD83E\uDD32',
        name: 'Charitable Giving Tracker',
        description: 'Give consistently and track your charitable contributions.',
        goal: 'Give to charity or set aside money for your next charitable donation',
        category: 'finance',
        duration: 30,
        tags: ['charity', 'giving', 'zakat', 'sadaqah']
    },
    {
        icon: '\uD83D\uDCB3',
        name: 'No Eating Out',
        description: 'Save hundreds by cooking at home and avoiding restaurants.',
        goal: 'Eat only home-cooked or home-packed meals today',
        category: 'finance',
        duration: 30,
        tags: ['eating out', 'savings', 'cooking', 'frugal']
    },

    // ======================================================================
    // CREATIVE (8 templates)
    // ======================================================================
    {
        icon: '\uD83D\uDD8A\uFE0F',
        name: 'Creative Writing Daily',
        description: 'Unleash your creativity through daily writing practice.',
        goal: 'Write creatively for 20+ minutes — fiction, poetry, or free writing',
        category: 'creative',
        duration: 30,
        tags: ['writing', 'fiction', 'creativity', 'storytelling']
    },
    {
        icon: '\u270F\uFE0F',
        name: 'Sketch a Day',
        description: 'Develop your drawing skills one sketch at a time.',
        goal: 'Complete at least one sketch or drawing',
        category: 'creative',
        duration: 30,
        tags: ['sketching', 'drawing', 'art', 'visual']
    },
    {
        icon: '\uD83D\uDD8C\uFE0F',
        name: 'Arabic Calligraphy Practice',
        description: 'Master the beautiful art of Arabic calligraphy.',
        goal: 'Practice Arabic calligraphy strokes or complete a piece for 20 minutes',
        category: 'creative',
        duration: 60,
        tags: ['calligraphy', 'arabic', 'art', 'handwriting']
    },
    {
        icon: '\uD83D\uDCF8',
        name: 'Photo-a-Day Project',
        description: 'Document your world through a daily photography project.',
        goal: 'Take and edit one photograph that tells a story',
        category: 'creative',
        duration: 100,
        tags: ['photography', 'daily photo', 'visual', 'project']
    },
    {
        icon: '\uD83D\uDCDD',
        name: 'Blog Post a Week',
        description: 'Build your online voice by writing and publishing consistently.',
        goal: 'Work on a blog post — outline, draft, edit, or publish',
        category: 'creative',
        duration: 90,
        tags: ['blogging', 'writing', 'publishing', 'content']
    },
    {
        icon: '\uD83D\uDCAB',
        name: 'Poetry Writing',
        description: 'Express yourself through the art of poetry every day.',
        goal: 'Write at least one poem or work on a longer poetic piece',
        category: 'creative',
        duration: 30,
        tags: ['poetry', 'writing', 'expression', 'art']
    },
    {
        icon: '\uD83C\uDFB9',
        name: 'Music Practice Streak',
        description: 'Build musical mastery through an unbroken practice streak.',
        goal: 'Practice your instrument or music theory for 30+ minutes',
        category: 'creative',
        duration: 100,
        tags: ['music', 'practice', 'instrument', 'theory']
    },
    {
        icon: '\uD83E\uDDF5',
        name: 'Handmade Crafts',
        description: 'Create something with your hands every day.',
        goal: 'Work on a craft project for at least 20 minutes',
        category: 'creative',
        duration: 30,
        tags: ['crafts', 'handmade', 'diy', 'creation']
    },

    // ======================================================================
    // CAREER (8 templates)
    // ======================================================================
    {
        icon: '\uD83D\uDCC2',
        name: 'Build Your Portfolio',
        description: 'Create an impressive portfolio that showcases your best work.',
        goal: 'Spend 30 minutes adding to, designing, or refining your portfolio',
        category: 'career',
        duration: 60,
        tags: ['portfolio', 'showcase', 'projects', 'professional']
    },
    {
        icon: '\uD83D\uDCE8',
        name: 'Job Application a Day',
        description: 'Land your next role by applying consistently and strategically.',
        goal: 'Submit one quality job application or follow up on a previous one',
        category: 'career',
        duration: 30,
        tags: ['job search', 'applications', 'resume', 'career']
    },
    {
        icon: '\uD83D\uDD17',
        name: 'LinkedIn Content Creator',
        description: 'Grow your professional brand by posting valuable content.',
        goal: 'Create and publish a LinkedIn post or engage with industry content',
        category: 'career',
        duration: 30,
        tags: ['linkedin', 'branding', 'content', 'networking']
    },
    {
        icon: '\uD83C\uDF1F',
        name: 'Mentor Someone',
        description: 'Give back to your field by guiding someone less experienced.',
        goal: 'Spend 15+ minutes helping or advising someone in your field',
        category: 'career',
        duration: 60,
        tags: ['mentoring', 'teaching', 'leadership', 'giving back']
    },
    {
        icon: '\uD83D\uDEE0\uFE0F',
        name: 'Learn a New Tool',
        description: 'Stay competitive by mastering a new professional tool.',
        goal: 'Spend 20+ minutes learning a tool relevant to your career',
        category: 'career',
        duration: 30,
        tags: ['tools', 'software', 'skills', 'professional']
    },
    {
        icon: '\uD83D\uDCF0',
        name: 'Industry News Digest',
        description: 'Stay ahead by reading industry news and trends daily.',
        goal: 'Read 2-3 articles about your industry or professional field',
        category: 'career',
        duration: 30,
        tags: ['news', 'industry', 'trends', 'awareness']
    },
    {
        icon: '\uD83C\uDFC5',
        name: 'Certification Study',
        description: 'Earn a professional certification by studying consistently.',
        goal: 'Study for your target certification for 30+ minutes',
        category: 'career',
        duration: 60,
        tags: ['certification', 'study', 'exam', 'credential']
    },
    {
        icon: '\uD83D\uDCA1',
        name: 'Side Project Sprint',
        description: 'Make daily progress on a passion project alongside your job.',
        goal: 'Work on your side project for at least 30 minutes',
        category: 'career',
        duration: 100,
        tags: ['side project', 'hustle', 'entrepreneurship', 'building']
    }
];
