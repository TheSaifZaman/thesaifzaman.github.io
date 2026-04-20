// ═══════════════════════════════════════
// BODY BLUEPRINT — DATA
// ═══════════════════════════════════════

const YT = (q) => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q + ' proper form tutorial');

// ── LEVELS / PHASES ──
const LEVELS = [
    {
        id: 'foundation', name: 'Foundation', sub: 'Week 0 – 4',
        blurb: 'Rebuild the baseline. Grease the groove. Form over everything.',
        focus: 'Mobility, activation, endurance',
        prereq: 'None. You start here if you\'ve been inactive.',
        icon: 'fas fa-seedling', color: 'lvl-foundation'
    },
    {
        id: 'beginner', name: 'Beginner', sub: 'Week 4 – 12',
        blurb: 'Own the seven fundamentals. Build real rep endurance.',
        focus: 'Push-ups · Pull-ups · Squats · Dips · Core · Bridge · Hollow',
        prereq: 'Hold plank 60s · 5 strict push-ups · 20s dead hang',
        icon: 'fas fa-fire', color: 'lvl-beginner'
    },
    {
        id: 'intermediate', name: 'Intermediate', sub: 'Month 3 – 9',
        blurb: 'Variations get serious. Lean, visible abs, real strength.',
        focus: 'Archer push-ups · Pistol squats · Wide pull-ups · L-sits · Handstand wall',
        prereq: '20 push-ups · 8 pull-ups · 30 squats · 60s plank',
        icon: 'fas fa-bolt', color: 'lvl-intermediate'
    },
    {
        id: 'advanced', name: 'Advanced', sub: 'Month 9 – 18',
        blurb: 'Skills training. Muscle-ups, handstands, tuck levers.',
        focus: 'Muscle-up · Handstand · Pistol squat · Dragon flag · Front lever tuck',
        prereq: 'Archer push-ups · 12 pull-ups · 5 pistol squats · 20s L-sit',
        icon: 'fas fa-chess-knight', color: 'lvl-advanced'
    },
    {
        id: 'mastery', name: 'Mastery', sub: 'Month 18+',
        blurb: 'Elite bodyweight feats. Full planche, front lever, one-arm variants.',
        focus: 'Full planche · Front lever · One-arm push-up · One-arm pull-up · Press handstand',
        prereq: 'Clean muscle-up · 30s handstand · Tuck planche · Dragon flag',
        icon: 'fas fa-crown', color: 'lvl-mastery'
    }
];

// ── EXERCISES ──
const EXERCISES = [
    { id: 'wall-pushup', name: 'Wall Push-Up', cat: 'push', muscles: ['Chest','Shoulders','Triceps'], difficulty: 1, desc: 'Stand arms-length from a wall. Plant palms shoulder-width. Elbows bend at ~45°, lower nose to wall, press out.', video: YT('wall push up beginner'), tip: 'Keep a straight line from head to heels.' },
    { id: 'incline-pushup', name: 'Incline Push-Up', cat: 'push', muscles: ['Chest','Triceps'], difficulty: 1, desc: 'Hands on a sturdy bench/bed. Lower chest to edge with control. Drive back up.', video: YT('incline push up form'), tip: 'Higher surface = easier. Progress by lowering the incline weekly.' },
    { id: 'knee-pushup', name: 'Knee Push-Up', cat: 'push', muscles: ['Chest','Triceps','Core'], difficulty: 2, desc: 'From knees, maintain a straight line from knees to head. Lower chest to floor.', video: YT('knee push up proper form'), tip: 'Don\'t let hips sag. This bridges you to full push-ups.' },
    { id: 'pushup', name: 'Push-Up', cat: 'push', muscles: ['Chest','Shoulders','Triceps','Core'], difficulty: 2, desc: 'Plank position. Hands shoulder-width. Lower chest to one fist above floor. Press up fully.', video: YT('push up perfect form'), tip: 'Elbows ~45° from torso. Glutes squeezed. Core braced.' },
    { id: 'diamond-pushup', name: 'Diamond Push-Up', cat: 'push', muscles: ['Triceps','Chest'], difficulty: 3, desc: 'Hands form a diamond under sternum. Lower slowly. Hammers the triceps.', video: YT('diamond push up tutorial'), tip: 'Keep elbows tracking close to the body.' },
    { id: 'decline-pushup', name: 'Decline Push-Up', cat: 'push', muscles: ['Upper Chest','Shoulders'], difficulty: 3, desc: 'Feet elevated on a bed/chair. Head drives toward floor. Targets upper chest + shoulders.', video: YT('decline push up form'), tip: 'Higher the feet, harder the set. Avoid hip-pike.' },
    { id: 'pike-pushup', name: 'Pike Push-Up', cat: 'push', muscles: ['Shoulders','Triceps'], difficulty: 3, desc: 'Start in downward-dog. Lower crown of head toward floor between hands. Press back up.', video: YT('pike push up tutorial'), tip: 'Prepares you for handstand push-ups.' },
    { id: 'archer-pushup', name: 'Archer Push-Up', cat: 'push', muscles: ['Chest','Shoulders','Triceps'], difficulty: 4, desc: 'Wide hand stance. Lower toward one hand while the other arm straightens. Alternate sides.', video: YT('archer push up tutorial'), tip: 'One step before one-arm push-ups.' },
    { id: 'psplanche-pushup', name: 'Pseudo Planche Push-Up', cat: 'push', muscles: ['Chest','Shoulders','Core'], difficulty: 4, desc: 'Hands at hip level, fingers rotated out. Lean forward aggressively. Lower and press.', video: YT('pseudo planche push up'), tip: 'Gateway to planche progression.' },
    { id: 'onearm-pushup', name: 'One-Arm Push-Up', cat: 'push', muscles: ['Chest','Triceps','Core'], difficulty: 5, desc: 'Feet wide. One arm behind back. Lower with full control. Press with a unilateral drive.', video: YT('one arm push up tutorial'), tip: 'The test of push-strength mastery.' },
    { id: 'handstand-pushup', name: 'Handstand Push-Up', cat: 'push', muscles: ['Shoulders','Triceps','Core'], difficulty: 5, desc: 'Kick up to handstand against wall. Lower crown to floor. Press back up.', video: YT('wall handstand push up tutorial'), tip: 'Negatives first. Full ROM builds overhead strength.' },

    { id: 'dead-hang', name: 'Dead Hang', cat: 'pull', muscles: ['Grip','Lats','Shoulders'], difficulty: 1, desc: 'Hang from a bar with arms fully extended. Shoulders active, not loose.', video: YT('dead hang tutorial'), tip: 'Start 10-20s, build to 60s. Foundation for pull-ups.' },
    { id: 'scap-pulls', name: 'Scapular Pulls', cat: 'pull', muscles: ['Upper Back','Lats'], difficulty: 1, desc: 'From dead hang, pull shoulder blades down and back WITHOUT bending arms. Small range.', video: YT('scapular pulls tutorial'), tip: 'Wakes up the pulling chain. Essential.' },
    { id: 'neg-pullup', name: 'Negative Pull-Up', cat: 'pull', muscles: ['Lats','Biceps'], difficulty: 2, desc: 'Jump/step to top of bar. Lower yourself down taking 3-5 seconds.', video: YT('negative pull up tutorial'), tip: 'Eccentrics build pull-ups faster than anything else.' },
    { id: 'chin-up', name: 'Chin-Up', cat: 'pull', muscles: ['Biceps','Lats'], difficulty: 3, desc: 'Underhand grip, shoulder-width. Pull chin over bar. Lower fully.', video: YT('chin up proper form'), tip: 'Easier than overhand. Build reps here first.' },
    { id: 'pullup', name: 'Pull-Up', cat: 'pull', muscles: ['Lats','Upper Back','Biceps'], difficulty: 3, desc: 'Overhand grip, slightly wider than shoulders. Chest to bar. Full hang bottom.', video: YT('pull up perfect form'), tip: 'No kipping. No half-reps. Dead-hang start every time.' },
    { id: 'wide-pullup', name: 'Wide Pull-Up', cat: 'pull', muscles: ['Lats','Upper Back'], difficulty: 4, desc: 'Hands wide. Pull upper chest toward bar. Emphasizes lat width.', video: YT('wide grip pull up tutorial'), tip: 'Harder. Go slower than standard pull-ups.' },
    { id: 'lsit-pullup', name: 'L-Sit Pull-Up', cat: 'pull', muscles: ['Lats','Core','Hip Flexors'], difficulty: 4, desc: 'Pull-up with legs held horizontal throughout the entire rep.', video: YT('L sit pull up tutorial'), tip: 'Integrates pull + core under load.' },
    { id: 'archer-pullup', name: 'Archer Pull-Up', cat: 'pull', muscles: ['Lats','Biceps'], difficulty: 4, desc: 'Pull toward one hand while the other straightens to the side.', video: YT('archer pull up tutorial'), tip: 'One-arm pull-up preparation.' },
    { id: 'muscle-up', name: 'Muscle-Up', cat: 'pull', muscles: ['Lats','Chest','Triceps','Core'], difficulty: 5, desc: 'Explosive pull-up transitioning into a dip above the bar.', video: YT('strict muscle up tutorial'), tip: 'False grip + explosive pull + fast transition = strict muscle-up.' },
    { id: 'onearm-pullup', name: 'One-Arm Pull-Up', cat: 'pull', muscles: ['Lats','Biceps','Core'], difficulty: 5, desc: 'Full pull-up using only one arm, chin over bar.', video: YT('one arm pull up tutorial'), tip: 'Elite. Archer pull-ups are the gateway.' },

    // No-bar pull alternatives — use when no pull-up bar is available
    { id: 'superman', name: 'Superman Hold', cat: 'pull', muscles: ['Lower Back','Glutes','Upper Back'], difficulty: 1, desc: 'Lie face-down. Lift arms, chest, and legs off floor at once. Squeeze the back. Hold.', video: YT('superman exercise tutorial'), tip: 'Bar-free posterior-chain starter. Build to 30s holds.' },
    { id: 'ytw-raise', name: 'Prone Y-T-W Raise', cat: 'pull', muscles: ['Upper Back','Rear Delts','Rhomboids'], difficulty: 2, desc: 'Face-down on floor. Arms sweep through Y, then T, then W shapes — lifted off floor, thumbs up. Slow.', video: YT('prone YTW raise tutorial'), tip: 'No bar? This nails the upper back you\'d miss from skipping pull-ups.' },
    { id: 'table-row', name: 'Inverted Row (Table)', cat: 'pull', muscles: ['Back','Biceps','Rear Delts'], difficulty: 2, desc: 'Lie under a sturdy table. Grip the edge overhand. Pull chest up to the table with body straight, heels on floor.', video: YT('inverted row under table bodyweight'), tip: 'Strongest no-bar pull-up substitute. Test table stability first.' },
    { id: 'door-row', name: 'Towel Door Row', cat: 'pull', muscles: ['Back','Biceps','Grip'], difficulty: 2, desc: 'Loop a towel around a locked door handle (both sides). Feet close to door. Lean back, arms straight. Pull chest to door.', video: YT('towel door row tutorial'), tip: 'Zero equipment. The lower you lean, the harder it gets.' },
    { id: 'bp-row', name: 'Backpack Bent-Over Row', cat: 'pull', muscles: ['Lats','Upper Back','Biceps'], difficulty: 2, desc: 'Load a backpack with books (5–15kg). Hinge at hips, flat back. Row the pack to your lower ribs. Lower slow.', video: YT('bent over row backpack bodyweight'), tip: 'Closest mimic of a pull. Add books as you get stronger.' },
    { id: 'onearm-row', name: 'One-Arm Backpack Row', cat: 'pull', muscles: ['Lats','Biceps','Core'], difficulty: 3, desc: 'Knee and hand on chair/bed. Row a loaded backpack with the free arm — elbow drives back past ribs.', video: YT('single arm dumbbell row form'), tip: 'Unilateral = heavier per side. Killer lat isolation.' },
    { id: 'archer-row', name: 'Archer Inverted Row', cat: 'pull', muscles: ['Lats','Biceps','Core'], difficulty: 4, desc: 'Inverted row under a table with hands wide. Pull toward one hand while the other arm straightens sideways.', video: YT('archer row tutorial'), tip: 'Advanced bar-free pulling. Gateway to one-arm row.' },

    { id: 'assist-squat', name: 'Assisted Squat', cat: 'legs', muscles: ['Quads','Glutes'], difficulty: 1, desc: 'Hold a door frame/pole. Squat down with support. Rise.', video: YT('assisted squat tutorial'), tip: 'For absolute beginners. Build confidence first.' },
    { id: 'air-squat', name: 'Air Squat', cat: 'legs', muscles: ['Quads','Glutes','Hamstrings'], difficulty: 2, desc: 'Feet shoulder-width. Sit down as if onto a chair. Knees track over toes. Thighs parallel.', video: YT('air squat perfect form'), tip: 'Chest up. Heels grounded. Full depth every rep.' },
    { id: 'jump-squat', name: 'Jump Squat', cat: 'legs', muscles: ['Quads','Glutes','Calves'], difficulty: 2, desc: 'Squat down, explode up into a jump. Land soft. Go again.', video: YT('jump squat tutorial'), tip: 'Power + conditioning. Soft landings save knees.' },
    { id: 'bulgarian-split', name: 'Bulgarian Split Squat', cat: 'legs', muscles: ['Quads','Glutes'], difficulty: 3, desc: 'Rear foot elevated on a bed/chair. Front leg does the work. Lower until back knee nearly touches.', video: YT('bulgarian split squat tutorial'), tip: 'Unilateral. Destroys muscle imbalances.' },
    { id: 'cossack-squat', name: 'Cossack Squat', cat: 'legs', muscles: ['Quads','Adductors','Hamstrings'], difficulty: 3, desc: 'Wide stance. Shift weight to one leg, lower fully. Opposite leg extends straight. Alternate.', video: YT('cossack squat tutorial'), tip: 'Mobility + strength combo. Builds hip range.' },
    { id: 'shrimp-squat', name: 'Shrimp Squat', cat: 'legs', muscles: ['Quads','Glutes','Core'], difficulty: 4, desc: 'Grab one foot behind. Squat down on the other leg until rear knee touches floor.', video: YT('shrimp squat tutorial'), tip: 'Bridge between split squat and pistol squat.' },
    { id: 'pistol-squat', name: 'Pistol Squat', cat: 'legs', muscles: ['Quads','Glutes','Core','Balance'], difficulty: 5, desc: 'One leg extended forward. Squat down fully on standing leg. Rise without touching floor.', video: YT('pistol squat tutorial'), tip: 'The bodyweight leg strength benchmark.' },
    { id: 'nat-leg-curl', name: 'Natural Leg Curl', cat: 'legs', muscles: ['Hamstrings','Glutes'], difficulty: 4, desc: 'Knees down, feet anchored. Lower torso forward controlling with hamstrings. Push back with hands if needed.', video: YT('nordic hamstring curl tutorial'), tip: 'Nordic curls — the eccentric king for hamstrings.' },
    { id: 'glute-bridge', name: 'Glute Bridge', cat: 'legs', muscles: ['Glutes','Hamstrings'], difficulty: 1, desc: 'Lie on back, knees bent. Drive hips up, squeezing glutes at top.', video: YT('glute bridge tutorial'), tip: 'Essential for posterior chain activation.' },
    { id: 'single-leg-bridge', name: 'Single-Leg Bridge', cat: 'legs', muscles: ['Glutes','Hamstrings'], difficulty: 2, desc: 'Glute bridge with one leg extended. Drive up through one heel.', video: YT('single leg glute bridge tutorial'), tip: 'Unilateral glute work.' },
    { id: 'calf-raise', name: 'Calf Raise', cat: 'legs', muscles: ['Calves'], difficulty: 1, desc: 'Stand on edge of a step. Drop heels. Raise up onto toes fully. Pause and lower slow.', video: YT('calf raise tutorial'), tip: 'Full range of motion. Pause at top AND bottom.' },

    { id: 'plank', name: 'Plank', cat: 'core', muscles: ['Core','Shoulders'], difficulty: 1, desc: 'Forearms down. Body in a straight line. Hold tight, breathe.', video: YT('plank proper form'), tip: 'Quality > time. Start 20s, build to 90s.' },
    { id: 'side-plank', name: 'Side Plank', cat: 'core', muscles: ['Obliques','Core'], difficulty: 2, desc: 'On one forearm. Body straight. Hips high. Hold.', video: YT('side plank tutorial'), tip: 'Kills obliques. 30s each side minimum.' },
    { id: 'hollow-hold', name: 'Hollow Hold', cat: 'core', muscles: ['Abs','Hip Flexors'], difficulty: 2, desc: 'On back. Lower back pressed to floor. Legs and shoulders off ground. Banana shape.', video: YT('hollow body hold tutorial'), tip: 'Foundation for every advanced gymnastic skill.' },
    { id: 'hollow-rocks', name: 'Hollow Rocks', cat: 'core', muscles: ['Abs','Core'], difficulty: 3, desc: 'From hollow hold, rock back and forth along your spine.', video: YT('hollow rocks tutorial'), tip: 'Maintains tension. Do not let feet/shoulders touch.' },
    { id: 'leg-raise', name: 'Lying Leg Raise', cat: 'core', muscles: ['Lower Abs','Hip Flexors'], difficulty: 2, desc: 'On back. Straight legs rise to 90°, lower with control not touching floor.', video: YT('lying leg raise tutorial'), tip: 'Lower back stays glued to floor. Builds the lower abs.' },
    { id: 'hang-leg-raise', name: 'Hanging Leg Raise', cat: 'core', muscles: ['Abs','Hip Flexors','Grip'], difficulty: 4, desc: 'Hang from bar. Raise straight legs to horizontal or higher. No swing.', video: YT('hanging leg raise tutorial'), tip: 'The 6-pack maker. Knees-up version first.' },
    { id: 'toes-to-bar', name: 'Toes-to-Bar', cat: 'core', muscles: ['Abs','Lats','Hip Flexors'], difficulty: 5, desc: 'Hanging leg raise until toes touch the bar.', video: YT('toes to bar tutorial'), tip: 'Full compression. Advanced core.' },
    { id: 'v-up', name: 'V-Up', cat: 'core', muscles: ['Abs','Hip Flexors'], difficulty: 3, desc: 'From lying, simultaneously lift legs and torso, reaching hands to feet.', video: YT('v up tutorial'), tip: 'Explosive core. Pair with hollow holds.' },
    { id: 'russian-twist', name: 'Russian Twist', cat: 'core', muscles: ['Obliques','Core'], difficulty: 2, desc: 'Seated, lean back ~45°. Feet off floor. Rotate shoulders side to side.', video: YT('russian twist form'), tip: 'Rotation matters. Use control, not momentum.' },
    { id: 'mountain-climber', name: 'Mountain Climber', cat: 'core', muscles: ['Core','Cardio'], difficulty: 2, desc: 'Plank position. Drive knees to chest alternating fast.', video: YT('mountain climber tutorial'), tip: 'Conditioning + core. Great finisher.' },
    { id: 'lsit', name: 'L-Sit', cat: 'core', muscles: ['Abs','Hip Flexors','Triceps'], difficulty: 4, desc: 'On floor/parallettes. Push up to straight arms. Lift legs horizontal. Hold.', video: YT('L sit tutorial'), tip: 'Brutal compression. Start with tuck-L.' },
    { id: 'dragon-flag', name: 'Dragon Flag', cat: 'core', muscles: ['Abs','Core'], difficulty: 5, desc: 'Lie on bench, grip behind head. Body straight and rigid, pivot from shoulders, lower and raise.', video: YT('dragon flag tutorial'), tip: 'Bruce Lee\'s signature. Elite core strength.' },
    { id: 'ab-wheel', name: 'Ab Wheel Rollout', cat: 'core', muscles: ['Abs','Lats','Shoulders'], difficulty: 4, desc: 'From knees (or toes), roll wheel forward until near-horizontal. Roll back using abs.', video: YT('ab wheel rollout tutorial'), tip: 'Anti-extension gold. Start from knees.' },

    { id: 'cat-cow', name: 'Cat-Cow', cat: 'flex', muscles: ['Spine','Core'], difficulty: 1, desc: 'On all fours. Arch and round spine slowly with breath.', video: YT('cat cow stretch tutorial'), tip: 'Wake up the spine. 10 reps.' },
    { id: 'downward-dog', name: 'Downward Dog', cat: 'flex', muscles: ['Hamstrings','Calves','Shoulders'], difficulty: 1, desc: 'Inverted V-shape. Heels push toward floor. Hips high.', video: YT('downward dog tutorial'), tip: 'Full body opener.' },
    { id: 'cobra', name: 'Cobra', cat: 'flex', muscles: ['Spine','Chest'], difficulty: 1, desc: 'On stomach, palms down near ribs. Extend arms, arching back, chest forward.', video: YT('cobra pose tutorial'), tip: 'Counters all the sitting you do.' },
    { id: 'pigeon', name: 'Pigeon Pose', cat: 'flex', muscles: ['Hips','Glutes'], difficulty: 2, desc: 'Bring one shin forward under torso. Extend other leg behind. Fold forward.', video: YT('pigeon pose tutorial'), tip: 'Best hip opener. 1-2 min each side.' },
    { id: 'forward-fold', name: 'Forward Fold', cat: 'flex', muscles: ['Hamstrings','Lower Back'], difficulty: 1, desc: 'Stand, hinge from hips, let upper body hang. Soft knees OK.', video: YT('standing forward fold tutorial'), tip: 'Do not force. Hang relaxed.' },
    { id: 'deep-lunge', name: 'Deep Lunge Hip Opener', cat: 'flex', muscles: ['Hip Flexors','Hamstrings'], difficulty: 2, desc: 'Step into deep lunge. Drop back knee. Lift chest, feel hip flexor stretch.', video: YT('deep lunge stretch tutorial'), tip: 'Essential if you sit all day.' },
    { id: 'shoulder-dis', name: 'Shoulder Dislocates', cat: 'flex', muscles: ['Shoulders'], difficulty: 1, desc: 'Broomstick/band in wide grip. Pass from front to back overhead, arms straight.', video: YT('shoulder dislocates tutorial'), tip: 'Build overhead mobility. Start wide.' },
    { id: 'wall-slide', name: 'Wall Slide', cat: 'flex', muscles: ['Upper Back','Shoulders'], difficulty: 1, desc: 'Back against wall. Arms against wall in W-shape. Slide up and down.', video: YT('wall slide exercise tutorial'), tip: 'Posture fix. Do before any push day.' },
    { id: 'standing-split', name: 'Standing Pike', cat: 'flex', muscles: ['Hamstrings','Calves'], difficulty: 2, desc: 'Stand, fold forward, aim chest toward thighs. Hang.', video: YT('standing pike stretch'), tip: 'Progress toward full pike on floor.' },
    { id: 'thoracic-rot', name: 'Thoracic Rotation', cat: 'flex', muscles: ['Upper Back'], difficulty: 1, desc: 'On all fours. One hand to head. Rotate elbow up toward ceiling. Return.', video: YT('thread the needle stretch'), tip: 'Fights desk-back posture.' },

    { id: 'crow-pose', name: 'Crow Pose', cat: 'skill', muscles: ['Shoulders','Core','Wrists'], difficulty: 3, desc: 'Hands flat. Knees balance on triceps. Lean forward, lift feet, balance.', video: YT('crow pose tutorial'), tip: 'Gateway arm balance. Builds wrist strength.' },
    { id: 'tuck-planche', name: 'Tuck Planche', cat: 'skill', muscles: ['Shoulders','Core','Chest'], difficulty: 4, desc: 'From pseudo planche position, lift knees to chest, balance on straight arms.', video: YT('tuck planche tutorial'), tip: 'Planche journey starts here.' },
    { id: 'handstand-wall', name: 'Wall Handstand', cat: 'skill', muscles: ['Shoulders','Core'], difficulty: 3, desc: 'Kick up to handstand with belly to wall. Hold. Straight body line.', video: YT('wall handstand tutorial'), tip: 'Hold 60s before trying freestanding.' },
    { id: 'freestand-hs', name: 'Freestanding Handstand', cat: 'skill', muscles: ['Shoulders','Core','Balance'], difficulty: 5, desc: 'Handstand without wall support. Balanced on hands.', video: YT('freestanding handstand tutorial'), tip: 'Takes months of daily practice. Worth it.' },
    { id: 'back-lever-tuck', name: 'Tuck Back Lever', cat: 'skill', muscles: ['Back','Core'], difficulty: 4, desc: 'Invert on bar/rings. Tuck knees. Lower body parallel to ground, facing down.', video: YT('tuck back lever tutorial'), tip: 'Easier than front lever. Starting point.' },
    { id: 'front-lever-tuck', name: 'Tuck Front Lever', cat: 'skill', muscles: ['Lats','Core'], difficulty: 4, desc: 'Hang from bar. Tuck knees. Pull body up until back parallel to floor, facing up.', video: YT('tuck front lever tutorial'), tip: 'One of the hardest pulling skills.' },
    { id: 'full-planche', name: 'Full Planche', cat: 'skill', muscles: ['Shoulders','Chest','Core'], difficulty: 5, desc: 'Straight body horizontal, supported only on hands. Years of preparation.', video: YT('full planche tutorial'), tip: 'Elite. Tuck, advanced tuck, straddle, full.' },
    { id: 'full-front-lever', name: 'Full Front Lever', cat: 'skill', muscles: ['Lats','Core'], difficulty: 5, desc: 'Straight body horizontal hanging from bar, facing up.', video: YT('full front lever tutorial'), tip: 'Straddle lever bridges tuck to full.' },
    { id: 'human-flag', name: 'Human Flag', cat: 'skill', muscles: ['Obliques','Lats','Shoulders'], difficulty: 5, desc: 'Grip a vertical pole. Body extends horizontally sideways, parallel to ground.', video: YT('human flag tutorial'), tip: 'Oblique and shoulder strength signature.' },

    { id: 'burpee', name: 'Burpee', cat: 'cardio', muscles: ['Full Body'], difficulty: 3, desc: 'Squat, plank, push-up, jump back, jump up. One rep.', video: YT('burpee tutorial'), tip: 'Full body under fatigue. Brutal conditioning.' },
    { id: 'jumping-jacks', name: 'Jumping Jacks', cat: 'cardio', muscles: ['Full Body','Cardio'], difficulty: 1, desc: 'Classic. Jump legs out while arms raise overhead. Jump back.', video: YT('jumping jacks tutorial'), tip: 'Warm-up staple.' },
    { id: 'high-knees', name: 'High Knees', cat: 'cardio', muscles: ['Hip Flexors','Cardio'], difficulty: 2, desc: 'Running in place driving knees high, toward chest.', video: YT('high knees exercise'), tip: 'Activates hip flexors, raises heart rate.' },
    { id: 'skater', name: 'Skater Jumps', cat: 'cardio', muscles: ['Legs','Glutes','Cardio'], difficulty: 3, desc: 'Leap side to side, landing on one leg, other leg sweeping behind.', video: YT('skater jumps tutorial'), tip: 'Lateral power. Nails the glutes.' }
];

// ── DAY FOCUS + WORKOUT PLAN ──
const DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const DAY_FOCUS = [
    { key: 'push', name: 'Push Day', sub: 'Chest · Shoulders · Triceps', icon: 'fas fa-hand-fist', accent: '#ff7a59' },
    { key: 'pull', name: 'Pull Day', sub: 'Back · Biceps · Grip', icon: 'fas fa-hand-back-fist', accent: '#4eb9ff' },
    { key: 'legs', name: 'Leg Day', sub: 'Quads · Hamstrings · Glutes · Calves', icon: 'fas fa-person-walking', accent: '#8e78ff' },
    { key: 'core', name: 'Core & Six-Pack', sub: 'Abs · Obliques · Lower Back', icon: 'fas fa-shield-halved', accent: '#ffb347' },
    { key: 'full', name: 'Skills & Full Body', sub: 'Conditioning · Transfer · Benchmarks', icon: 'fas fa-bolt', accent: '#ff5ca8' },
    { key: 'flex', name: 'Mobility & Flexibility', sub: 'Stretch · Joint Health · Active Recovery', icon: 'fas fa-feather', accent: '#5ee6a0' },
    { key: 'rest', name: 'Rest & Rebuild', sub: 'Sleep · Walk · Nutrition · Rebuild', icon: 'fas fa-moon', accent: '#9aa0b0' }
];

const PLAN = {
    foundation: [
        ['wall-pushup','incline-pushup','pike-pushup','plank','shoulder-dis'],
        ['superman','ytw-raise','glute-bridge','cobra','wall-slide'],
        ['assist-squat','glute-bridge','calf-raise','cossack-squat','pigeon'],
        ['plank','leg-raise','russian-twist','hollow-hold','cat-cow'],
        ['incline-pushup','scap-pulls','air-squat','plank','mountain-climber'],
        ['cat-cow','downward-dog','cobra','pigeon','forward-fold','deep-lunge','shoulder-dis','thoracic-rot'],
        []
    ],
    beginner: [
        ['pushup','knee-pushup','pike-pushup','diamond-pushup','plank'],
        ['table-row','door-row','bp-row','russian-twist','cobra'],
        ['air-squat','bulgarian-split','glute-bridge','single-leg-bridge','calf-raise'],
        ['plank','hollow-hold','leg-raise','russian-twist','side-plank','mountain-climber'],
        ['pushup','chin-up','air-squat','burpee','plank'],
        ['cat-cow','downward-dog','cobra','pigeon','forward-fold','deep-lunge','shoulder-dis'],
        []
    ],
    intermediate: [
        ['pushup','decline-pushup','diamond-pushup','pike-pushup','psplanche-pushup','plank'],
        ['table-row','door-row','bp-row','ytw-raise','superman'],
        ['bulgarian-split','cossack-squat','shrimp-squat','nat-leg-curl','jump-squat','calf-raise'],
        ['hollow-rocks','v-up','hang-leg-raise','side-plank','lsit','dragon-flag'],
        ['archer-pushup','pullup','pistol-squat','handstand-wall','burpee'],
        ['downward-dog','pigeon','deep-lunge','shoulder-dis','thoracic-rot','standing-split'],
        []
    ],
    advanced: [
        ['archer-pushup','psplanche-pushup','decline-pushup','handstand-pushup','diamond-pushup'],
        ['archer-row','onearm-row','table-row','bp-row','ytw-raise'],
        ['pistol-squat','shrimp-squat','nat-leg-curl','jump-squat','bulgarian-split'],
        ['dragon-flag','lsit','hang-leg-raise','toes-to-bar','ab-wheel','hollow-rocks'],
        ['muscle-up','pistol-squat','handstand-wall','tuck-planche','front-lever-tuck'],
        ['pigeon','standing-split','thoracic-rot','shoulder-dis','deep-lunge','downward-dog'],
        []
    ],
    mastery: [
        ['onearm-pushup','handstand-pushup','psplanche-pushup','archer-pushup'],
        ['archer-row','onearm-row','bp-row','ytw-raise','superman'],
        ['pistol-squat','shrimp-squat','nat-leg-curl','jump-squat'],
        ['dragon-flag','lsit','toes-to-bar','ab-wheel','full-front-lever'],
        ['full-planche','full-front-lever','human-flag','freestand-hs','onearm-pullup'],
        ['standing-split','pigeon','thoracic-rot','shoulder-dis','deep-lunge'],
        []
    ]
};

const PRINCIPLES = [
    { icon: 'fas fa-clock', title: 'Consistency > Intensity', desc: '45 minutes, 5 days a week for a year beats a 3-hour beast session once a month. Show up.' },
    { icon: 'fas fa-ruler', title: 'Progressive Overload Without Weights', desc: 'Harder variations, more reps, slower tempo, longer holds. Your body doesn\'t know percentages — it knows difficulty.' },
    { icon: 'fas fa-heart-pulse', title: 'Recovery Is a Training Variable', desc: '7–9 hours of sleep, 1 true rest day, deload every 6 weeks. Muscle is built in recovery, not training.' },
    { icon: 'fas fa-apple-whole', title: 'Nutrition Decides the Abs', desc: 'Six-pack is visible at ~12% body fat for men, ~20% for women. Training builds them — diet reveals them.' },
    { icon: 'fas fa-compass', title: 'Form Over Ego', desc: '5 pristine reps beat 15 sloppy ones. Sloppy reps teach your nervous system the wrong pattern.' },
    { icon: 'fas fa-droplet', title: '3 Liters of Water · Daily', desc: 'Dehydration cuts strength output by up to 10%. Keep a bottle with you.' },
    { icon: 'fas fa-infinity', title: 'The 30-Minute Rule', desc: 'If you can\'t train 90 minutes, train 30. Never skip — scale.' },
    { icon: 'fas fa-ear-listen', title: 'Listen — But Verify', desc: 'Real pain = stop. Discomfort = information. Soreness = normal. Know the difference.' }
];

const RESOURCES = [
    { name: 'Hybrid Calisthenics', handle: 'Hampton', url: 'https://www.youtube.com/@HybridCalisthenics', desc: 'Perfect for absolute beginners. Free structured routine.', vibe: 'Encouraging · Zero-to-hero' },
    { name: 'FitnessFAQs', handle: 'Daniel Vadnal', url: 'https://www.youtube.com/@FitnessFAQs', desc: 'Evidence-based programming, progressions, handstands, planche.', vibe: 'Coach · Scientific' },
    { name: 'ThenX / Chris Heria', handle: 'Chris Heria', url: 'https://www.youtube.com/@chrisheria', desc: 'High-intensity routines, skills, aesthetics focus.', vibe: 'High-Energy · Aesthetics' },
    { name: 'Calisthenicmovement', handle: 'Sven + Alex', url: 'https://www.youtube.com/@Calisthenicmovement', desc: 'German duo — crisp form breakdowns and proven programs.', vibe: 'Technical · Clean Form' },
    { name: 'Austin Dunham', handle: 'Austin Dunham', url: 'https://www.youtube.com/@AustinDunham', desc: 'Transformations, routines, aesthetic calisthenics.', vibe: 'Inspiring · Transformation' },
    { name: 'ATHLEAN-X', handle: 'Jeff Cavaliere', url: 'https://www.youtube.com/@athleanx', desc: 'Biomechanics-driven — save your joints, train smart.', vibe: 'Coaching · Smart' },
    { name: 'Yoga With Adriene', handle: 'Adriene Mishler', url: 'https://www.youtube.com/@yogawithadriene', desc: 'Daily flexibility + mobility companion. Free 30-day programs.', vibe: 'Calm · Mobility' },
    { name: 'Tom Merrick', handle: 'Bodyweight Warrior', url: 'https://www.youtube.com/@TomMerrick', desc: 'Mobility + calisthenics crossover.', vibe: 'Chill · Deep-work' }
];

const MEALS = {
    breakfast: [
        { name: 'Dim-Ruti Combo', items: '2 chapati + 2 boiled eggs + 100g vegetables + 1 cup doi (yogurt)', kcal: 450, p: 28, c: 48, f: 14 },
        { name: 'Oats Power Bowl', items: '60g oats + 1 banana + 1 tbsp peanut butter + 200ml milk', kcal: 480, p: 20, c: 62, f: 16 },
        { name: 'Chanar Breakfast', items: '100g chana chaat + 1 boiled egg + 1 apple', kcal: 380, p: 24, c: 45, f: 10 },
        { name: 'Muri Salad', items: '1 cup muri + chopped onion/cucumber/tomato + 2 boiled eggs + mustard oil drizzle', kcal: 420, p: 22, c: 55, f: 12 },
        { name: 'Dim Bhurji Ruti', items: '3 egg bhurji (low oil) + 2 whole wheat ruti + sliced cucumber', kcal: 520, p: 30, c: 45, f: 22 }
    ],
    lunch: [
        { name: 'Rui Fish Plate', items: '1 cup brown rice + grilled rui (150g) + dal (1 katori) + palong shaak', kcal: 620, p: 42, c: 70, f: 16 },
        { name: 'Chicken Breast Plate', items: '1 cup rice + grilled chicken breast (150g) + lauki/bhindi curry + dal', kcal: 650, p: 48, c: 75, f: 14 },
        { name: 'Dal Khichuri', items: 'Mug dal khichuri (1.5 cup) + begun bhaja + 1 egg + salad', kcal: 580, p: 28, c: 78, f: 16 },
        { name: 'Masoor Dal Chapati', items: '3 chapati + masoor dal + mixed veg curry + raita', kcal: 540, p: 25, c: 75, f: 12 },
        { name: 'Pangash Protein Plate', items: '1 cup rice + pangash curry (low oil) + lal shaak + chola', kcal: 600, p: 38, c: 72, f: 18 }
    ],
    snack: [
        { name: 'Chana + Egg', items: '1 cup boiled chickpeas + 1 boiled egg + lemon', kcal: 260, p: 18, c: 28, f: 8 },
        { name: 'Badam Banana', items: '1 banana + 20g almonds/peanuts', kcal: 280, p: 9, c: 32, f: 14 },
        { name: 'Doi Muri Shake', items: '200g doi + half cup muri + half tsp honey', kcal: 230, p: 14, c: 34, f: 5 },
        { name: 'Paneer Chaat', items: '80g paneer cubes + chopped cucumber + chaat masala', kcal: 220, p: 18, c: 8, f: 14 },
        { name: 'Fruit Board', items: 'Seasonal: guava + apple + 10 peanuts', kcal: 200, p: 5, c: 38, f: 5 }
    ],
    dinner: [
        { name: 'Grilled Fish Dinner', items: '2 roti + grilled pabda/ruhi + spinach curry + salad', kcal: 520, p: 38, c: 55, f: 14 },
        { name: 'Chicken Roti Plate', items: '3 roti + chicken curry (low oil) + dal + salad', kcal: 560, p: 42, c: 60, f: 14 },
        { name: 'Veg + Egg Plate', items: '2 roti + shobji curry + 3-egg omelette + dal', kcal: 500, p: 28, c: 55, f: 18 },
        { name: 'Paneer Platter', items: '2 roti + paneer bhuna + dal + salad', kcal: 540, p: 26, c: 55, f: 22 },
        { name: 'Khichuri Light', items: 'Bhuna khichuri (1 cup) + grilled chicken (80g) + salad', kcal: 470, p: 30, c: 55, f: 12 }
    ]
};

// ── EXERCISE SWAPS (alternatives per exercise) ──
// Keys: ex id. Values: array of {id, reason}
const SWAPS = {
    'pushup': [
        { id: 'knee-pushup', reason: 'Easier' },
        { id: 'incline-pushup', reason: 'Wrist-friendly' },
        { id: 'decline-pushup', reason: 'Harder' },
        { id: 'archer-pushup', reason: 'Much harder' }
    ],
    'diamond-pushup': [
        { id: 'pushup', reason: 'Easier' },
        { id: 'knee-pushup', reason: 'Wrist-friendly' }
    ],
    'decline-pushup': [
        { id: 'pushup', reason: 'Easier' },
        { id: 'pike-pushup', reason: 'Shoulder focus' }
    ],
    'pike-pushup': [
        { id: 'pushup', reason: 'Easier' },
        { id: 'handstand-pushup', reason: 'Harder' }
    ],
    'archer-pushup': [
        { id: 'pushup', reason: 'Easier' },
        { id: 'diamond-pushup', reason: 'Alternative' }
    ],
    'onearm-pushup': [
        { id: 'archer-pushup', reason: 'Easier' },
        { id: 'pushup', reason: 'Much easier' }
    ],
    'pullup': [
        { id: 'chin-up', reason: 'Easier grip' },
        { id: 'neg-pullup', reason: 'Easier (eccentric)' },
        { id: 'table-row', reason: 'No bar — under table' },
        { id: 'door-row', reason: 'No bar — towel + door' },
        { id: 'bp-row', reason: 'No bar — backpack row' }
    ],
    'wide-pullup': [
        { id: 'pullup', reason: 'Easier' },
        { id: 'chin-up', reason: 'Much easier' },
        { id: 'table-row', reason: 'No bar — under table' }
    ],
    'chin-up': [
        { id: 'neg-pullup', reason: 'Easier (eccentric)' },
        { id: 'table-row', reason: 'No bar — under table' },
        { id: 'bp-row', reason: 'No bar — backpack row' }
    ],
    'neg-pullup': [
        { id: 'table-row', reason: 'No bar — under table' },
        { id: 'door-row', reason: 'No bar — towel + door' },
        { id: 'bp-row', reason: 'No bar — backpack row' }
    ],
    'dead-hang': [
        { id: 'superman', reason: 'No bar — back activation' },
        { id: 'ytw-raise', reason: 'No bar — upper back' }
    ],
    'scap-pulls': [
        { id: 'ytw-raise', reason: 'No bar — upper back' },
        { id: 'superman', reason: 'No bar — back activation' }
    ],
    'archer-pullup': [
        { id: 'pullup', reason: 'Easier' },
        { id: 'archer-row', reason: 'No bar — under table' },
        { id: 'onearm-row', reason: 'No bar — backpack' }
    ],
    'lsit-pullup': [
        { id: 'pullup', reason: 'Easier' },
        { id: 'table-row', reason: 'No bar — under table' }
    ],
    'onearm-pullup': [
        { id: 'archer-pullup', reason: 'Easier' },
        { id: 'archer-row', reason: 'No bar — under table' },
        { id: 'onearm-row', reason: 'No bar — backpack' }
    ],
    'muscle-up': [
        { id: 'archer-pullup', reason: 'Easier' },
        { id: 'pullup', reason: 'Much easier' },
        { id: 'archer-row', reason: 'No bar — under table' }
    ],
    'table-row': [
        { id: 'door-row', reason: 'Alternative (door + towel)' },
        { id: 'bp-row', reason: 'Alternative (backpack)' },
        { id: 'archer-row', reason: 'Harder (one-arm progression)' },
        { id: 'pullup', reason: 'If bar available' }
    ],
    'door-row': [
        { id: 'table-row', reason: 'Alternative (under table)' },
        { id: 'bp-row', reason: 'Alternative (backpack)' }
    ],
    'bp-row': [
        { id: 'onearm-row', reason: 'Harder (unilateral)' },
        { id: 'table-row', reason: 'Alternative (under table)' },
        { id: 'door-row', reason: 'Alternative (door + towel)' }
    ],
    'onearm-row': [
        { id: 'bp-row', reason: 'Easier (two arms)' },
        { id: 'archer-row', reason: 'Alternative' }
    ],
    'archer-row': [
        { id: 'table-row', reason: 'Easier' },
        { id: 'onearm-row', reason: 'Alternative (backpack)' }
    ],
    'superman': [
        { id: 'ytw-raise', reason: 'Alternative' },
        { id: 'cobra', reason: 'Easier' }
    ],
    'ytw-raise': [
        { id: 'superman', reason: 'Alternative' }
    ],
    'air-squat': [
        { id: 'assist-squat', reason: 'Knee-friendly' },
        { id: 'jump-squat', reason: 'Harder' }
    ],
    'pistol-squat': [
        { id: 'bulgarian-split', reason: 'Knee-friendly' },
        { id: 'shrimp-squat', reason: 'Bridge step' },
        { id: 'cossack-squat', reason: 'Alternative' }
    ],
    'jump-squat': [
        { id: 'air-squat', reason: 'Knee-friendly' }
    ],
    'bulgarian-split': [
        { id: 'air-squat', reason: 'Easier' },
        { id: 'cossack-squat', reason: 'Hip variation' }
    ],
    'plank': [
        { id: 'hollow-hold', reason: 'Harder' }
    ],
    'hollow-hold': [
        { id: 'plank', reason: 'Easier' },
        { id: 'hollow-rocks', reason: 'Harder' }
    ],
    'hang-leg-raise': [
        { id: 'leg-raise', reason: 'Easier (floor)' },
        { id: 'toes-to-bar', reason: 'Harder' }
    ],
    'dragon-flag': [
        { id: 'hollow-rocks', reason: 'Easier' },
        { id: 'v-up', reason: 'Alternative' }
    ],
    'burpee': [
        { id: 'jumping-jacks', reason: 'Knee-friendly' },
        { id: 'high-knees', reason: 'Lower impact' }
    ],
    'handstand-wall': [
        { id: 'pike-pushup', reason: 'Wrist-friendly' }
    ],
    'handstand-pushup': [
        { id: 'pike-pushup', reason: 'Easier' },
        { id: 'handstand-wall', reason: 'Hold first' }
    ]
};

// ── BENCHMARK TESTS (phase readiness) ──
const BENCHMARKS = [
    { id: 'bm-plank-60', label: 'Hold plank for 60 seconds', unlocks: 'beginner' },
    { id: 'bm-pushup-5', label: 'Do 5 strict full push-ups', unlocks: 'beginner' },
    { id: 'bm-hang-20', label: 'Dead hang from a bar for 20 seconds', unlocks: 'beginner' },
    { id: 'bm-squat-20', label: 'Do 20 bodyweight squats with full depth', unlocks: 'beginner' },
    { id: 'bm-pushup-20', label: 'Do 20 strict push-ups in a row', unlocks: 'intermediate' },
    { id: 'bm-pullup-8', label: 'Do 8 strict pull-ups', unlocks: 'intermediate' },
    { id: 'bm-plank-90', label: 'Hold plank for 90 seconds', unlocks: 'intermediate' },
    { id: 'bm-squat-30', label: 'Do 30 bodyweight squats without rest', unlocks: 'intermediate' },
    { id: 'bm-archer-pu', label: 'Do 5 archer push-ups per side', unlocks: 'advanced' },
    { id: 'bm-pullup-12', label: 'Do 12 strict pull-ups', unlocks: 'advanced' },
    { id: 'bm-pistol-5', label: 'Do 5 pistol squats per leg', unlocks: 'advanced' },
    { id: 'bm-lsit-20', label: 'Hold L-sit for 20 seconds', unlocks: 'advanced' },
    { id: 'bm-muscleup', label: 'Do 1 clean strict muscle-up', unlocks: 'mastery' },
    { id: 'bm-hs-30', label: 'Hold a freestanding handstand 30s', unlocks: 'mastery' },
    { id: 'bm-tuck-planche', label: 'Hold tuck planche for 10 seconds', unlocks: 'mastery' },
    { id: 'bm-dragon-flag', label: 'Perform a full dragon flag', unlocks: 'mastery' }
];

// ── 6-PACK DEDICATED CIRCUIT ──
const SIXPACK = {
    title: '5-Minute Daily Core Circuit',
    intro: 'Stack on top of your main workout. Target: 5 straight days/week. Body fat reveals abs — this builds them.',
    note: 'For men, abs become visible around 12–14% body fat. For women, around 18–22%. Training builds the muscle; diet reveals it.',
    circuit: [
        { name: 'Hollow Hold', time: 30, desc: 'Banana-shape tension. Lower back glued to floor.', video: YT('hollow body hold tutorial') },
        { name: 'Plank', time: 40, desc: 'Straight line, glutes and quads squeezed.', video: YT('plank proper form') },
        { name: 'Bicycle Crunches', time: 40, desc: 'Alternate elbow to opposite knee, slow and controlled.', video: YT('bicycle crunches tutorial') },
        { name: 'Leg Raises', time: 40, desc: 'Lower back stays down; control the descent.', video: YT('lying leg raise tutorial') },
        { name: 'Russian Twists', time: 40, desc: 'Feet off floor, rotate shoulders fully.', video: YT('russian twist tutorial') },
        { name: 'Side Plank (L)', time: 30, desc: 'Hips high; stack shoulders.', video: YT('side plank tutorial') },
        { name: 'Side Plank (R)', time: 30, desc: 'Match the left side.', video: YT('side plank tutorial') },
        { name: 'Mountain Climbers', time: 30, desc: 'Fast but controlled knee drives.', video: YT('mountain climber tutorial') }
    ]
};

// ── WEEKLY CHALLENGES (rotate by ISO week) ──
const CHALLENGES = [
    { title: '300 Push-Up Challenge', goal: 300, unit: 'reps', desc: 'Spread across the week. Cumulative count.', icon: 'fas fa-hand-fist' },
    { title: '50 Pull Challenge', goal: 50, unit: 'reps', desc: 'Pull-ups count 1:1. No bar? 1 rep = 2× inverted/door/backpack rows, or 4× scap pulls, or 2× supermans (5s hold). Mix freely.', icon: 'fas fa-hand-back-fist' },
    { title: '500 Squat Challenge', goal: 500, unit: 'reps', desc: 'Knees out, heels grounded. Depth matters.', icon: 'fas fa-person-walking' },
    { title: '15-Minute Plank Week', goal: 900, unit: 'seconds', desc: 'Total plank time across the week.', icon: 'fas fa-shield-halved' },
    { title: '1000 Ab Rep Week', goal: 1000, unit: 'reps', desc: 'Any core exercise counts. Mix it up.', icon: 'fas fa-fire' },
    { title: '5km of Handstand Practice', goal: 25, unit: 'minutes', desc: '5 min/day × 5 days of wall handstand holds.', icon: 'fas fa-bolt' },
    { title: '100 Burpee Week', goal: 100, unit: 'reps', desc: 'Smoke the engine. Split how you like.', icon: 'fas fa-heart-pulse' },
    { title: '7-Day Mobility Streak', goal: 7, unit: 'sessions', desc: '15 min stretch every day for a week.', icon: 'fas fa-feather' }
];

// ── GROCERY MASTER LIST ──
// Aggregated from weekly meal options above, organized by category
const GROCERY = {
    Proteins: ['Eggs (18-20)', 'Chicken breast (1 kg)', 'Rui / Pangash / Pabda (700g)', 'Paneer (200g)', 'Chickpeas / Chana (300g dry)', 'Masoor dal (500g)', 'Mug dal (500g)'],
    Grains: ['Brown rice (1 kg)', 'Whole wheat atta (2 kg)', 'Oats (500g)', 'Muri (500g)'],
    Dairy: ['Full-fat milk (2L)', 'Plain doi / yogurt (1 kg)', 'Optional: Greek yogurt (500g)'],
    'Veg & Fruit': ['Palong shaak / spinach (300g)', 'Lauki / bhindi / begun — seasonal (1 kg)', 'Onion (1 kg)', 'Tomato (500g)', 'Cucumber (500g)', 'Lemon (6)', 'Banana (dozen)', 'Apple (6)', 'Seasonal fruit'],
    'Fats & Pantry': ['Mustard oil (250ml)', 'Olive oil (optional, 250ml)', 'Peanut butter (400g)', 'Almonds / peanuts (200g)', 'Honey (small bottle)', 'Salt, turmeric, cumin, chaat masala'],
    'Hydration': ['3L water minimum / day — fill bottles']
};

// ── RAMADAN MODE ADJUSTMENTS ──
const RAMADAN_MEAL_LABELS = {
    breakfast: { label: 'Sehri (Suhoor)', time: 'Pre-dawn · ~4:00-4:45 AM' },
    lunch:     { label: 'Iftar (Main)',   time: 'Post-maghrib · after dates + water' },
    snack:     { label: 'Taraweeh Fuel',  time: 'Post-Isha · ~9:30-10:30 PM' },
    dinner:    { label: 'Late / Optional',time: 'Before Sehri window closes' }
};
