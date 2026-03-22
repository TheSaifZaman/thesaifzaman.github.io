# DSA Visualizer — Design Specification

**Date:** 2026-03-23
**Author:** Claude (with Md Saif Zaman)
**Status:** Approved

## Overview

An interactive Data Structures, Algorithms & ML/AI reference section for the personal website. Covers 221 topics across classical CS algorithms, interview patterns, and ML/AI algorithms — each with visualizations, complexity analysis, code implementations, and curated LeetCode/practice problem links.

## Goals

- Comprehensive SWE interview prep covering DSA + ML/AI (221 topics)
- Interactive step-based visualizations with mock data + custom input
- Curated LeetCode problems per topic (Easy/Medium/Hard tagged)
- Developer-themed UI (glass-morphism + terminal accents)
- Fully self-contained per topic page (no heavy shared data files)
- Works offline (file:// protocol), no build step, no frameworks

## Architecture

### Folder Structure

```
dsa/
├── index.html                        → Hub page (search, filter, browse)
├── dsa-data.js                       → Slim metadata for 221 topics
├── shared/
│   ├── shared.css                    → Common styles
│   ├── shared.js                     → Theme toggle, nav, UI utilities
│   └── visualizer.js                 → Step-based visualization engine
│
│  ── GENERAL DSA (122 topics) ──
├── data-structures/                  → 7 files
│   ├── arrays.html
│   ├── linked-lists.html
│   ├── stacks.html
│   ├── queues.html
│   ├── hash-tables.html
│   ├── heaps.html
│   └── tries.html
├── advanced-data-structures/         → 17 files
│   ├── segment-trees.html
│   ├── union-find.html
│   ├── monotonic-stack-queue.html
│   ├── b-tree.html
│   ├── skip-list.html
│   ├── bloom-filter.html
│   ├── lru-cache.html
│   ├── fenwick-tree.html
│   ├── sparse-table.html
│   ├── deque.html
│   ├── circular-buffer.html
│   ├── doubly-linked-list.html
│   ├── treap.html
│   ├── splay-tree.html
│   ├── hash-map-internals.html
│   ├── persistent-data-structures.html
│   └── bitwise-trie.html
├── sorting/                          → 11 files
│   ├── bubble-sort.html
│   ├── selection-sort.html
│   ├── insertion-sort.html
│   ├── merge-sort.html
│   ├── quick-sort.html
│   ├── heap-sort.html
│   ├── counting-sort.html
│   ├── radix-sort.html
│   ├── tim-sort.html
│   ├── bucket-sort.html
│   └── shell-sort.html
├── searching/                        → 6 files
│   ├── binary-search.html
│   ├── dfs.html
│   ├── bfs.html
│   ├── ternary-search.html
│   ├── interpolation-search.html
│   └── exponential-search.html
├── tree-algorithms/                  → 3 files
│   ├── binary-tree.html
│   ├── binary-search-tree.html
│   └── avl-red-black-trees.html
├── graph-algorithms/                 → 20 files
│   ├── graph-representation.html
│   ├── dijkstras.html
│   ├── bellman-ford.html
│   ├── floyd-warshall.html
│   ├── topological-sort.html
│   ├── minimum-spanning-tree.html
│   ├── a-star-search.html
│   ├── tarjans-scc.html
│   ├── kosarajus-scc.html
│   ├── euler-path-circuit.html
│   ├── floyd-cycle-detection.html
│   ├── bipartite-check.html
│   ├── network-flow.html
│   ├── hungarian-algorithm.html
│   ├── articulation-points-bridges.html
│   ├── hamiltonian-path.html
│   ├── graph-coloring.html
│   ├── minimum-cut.html
│   ├── travelling-salesman.html
│   └── shortest-path-dag.html
├── techniques/                       → 26 files
│   ├── two-pointers.html
│   ├── sliding-window.html
│   ├── divide-and-conquer.html
│   ├── dynamic-programming.html
│   ├── greedy.html
│   ├── backtracking.html
│   ├── bit-manipulation.html
│   ├── recursion.html
│   ├── reservoir-sampling.html
│   ├── fisher-yates-shuffle.html
│   ├── boyer-moore-voting.html
│   ├── dutch-national-flag.html
│   ├── kadanes-algorithm.html
│   ├── prefix-sum.html
│   ├── difference-array.html
│   ├── interval-scheduling.html
│   ├── line-sweep.html
│   ├── meet-in-the-middle.html
│   ├── topk-elements.html
│   ├── sliding-window-max.html
│   ├── cycle-detection-arrays.html
│   ├── coordinate-compression.html
│   ├── binary-lifting.html
│   ├── heavy-light-decomposition.html
│   ├── mos-algorithm.html
│   └── sqrt-decomposition.html
├── string-algorithms/                → 11 files
│   ├── kmp.html
│   ├── rabin-karp.html
│   ├── string-matching.html
│   ├── z-algorithm.html
│   ├── manachers.html
│   ├── suffix-array.html
│   ├── suffix-tree.html
│   ├── aho-corasick.html
│   ├── boyer-moore-search.html
│   ├── longest-common-subsequence.html
│   └── edit-distance.html
├── math/                             → 11 files
│   ├── math-number-theory.html
│   ├── sieve-of-eratosthenes.html
│   ├── euclidean-gcd.html
│   ├── fast-exponentiation.html
│   ├── modular-arithmetic.html
│   ├── matrix-exponentiation.html
│   ├── catalan-numbers.html
│   ├── combinatorics.html
│   ├── prime-factorization.html
│   ├── chinese-remainder-theorem.html
│   └── inclusion-exclusion.html
├── computational-geometry/           → 4 files
│   ├── convex-hull.html
│   ├── line-intersection.html
│   ├── closest-pair.html
│   └── point-in-polygon.html
├── game-theory/                      → 3 files
│   ├── minimax.html
│   ├── alpha-beta-pruning.html
│   └── nim-game.html
│
│  ── ML/AI ALGORITHMS (99 topics) ──
├── ml-supervised/                    → 19 files
│   ├── linear-regression.html
│   ├── polynomial-regression.html
│   ├── ridge-regression.html
│   ├── lasso-regression.html
│   ├── elastic-net.html
│   ├── bayesian-linear-regression.html
│   ├── quantile-regression.html
│   ├── svr.html
│   ├── logistic-regression.html
│   ├── decision-tree.html
│   ├── random-forest.html
│   ├── svm.html
│   ├── knn.html
│   ├── naive-bayes.html
│   ├── gradient-boosted-trees.html
│   ├── perceptron.html
│   ├── lda-classifier.html
│   ├── qda.html
│   └── softmax-regression.html
├── ml-unsupervised/                  → 16 files
│   ├── k-means.html
│   ├── dbscan.html
│   ├── hierarchical-clustering.html
│   ├── gaussian-mixture-models.html
│   ├── mean-shift.html
│   ├── spectral-clustering.html
│   ├── optics.html
│   ├── k-medoids.html
│   ├── pca.html
│   ├── t-sne.html
│   ├── umap.html
│   ├── lda-topic.html
│   ├── svd.html
│   ├── autoencoder.html
│   ├── isomap.html
│   └── kernel-pca.html
├── ml-ensemble/                      → 8 files
│   ├── bagging.html
│   ├── boosting.html
│   ├── adaboost.html
│   ├── xgboost.html
│   ├── lightgbm.html
│   ├── catboost.html
│   ├── stacking.html
│   └── voting-ensemble.html
├── ml-deep-learning/                 → 13 files
│   ├── mlp.html
│   ├── cnn.html
│   ├── rnn.html
│   ├── lstm.html
│   ├── gru.html
│   ├── transformer.html
│   ├── gan.html
│   ├── vae.html
│   ├── resnet-skip-connections.html
│   ├── batch-normalization.html
│   ├── dropout.html
│   ├── attention-mechanism.html
│   └── diffusion-models.html
├── ml-reinforcement/                 → 8 files
│   ├── q-learning.html
│   ├── sarsa.html
│   ├── deep-q-network.html
│   ├── policy-gradient.html
│   ├── actor-critic.html
│   ├── monte-carlo-rl.html
│   ├── multi-armed-bandit.html
│   └── ppo.html
├── ml-nlp/                           → 7 files
│   ├── tf-idf.html
│   ├── word2vec.html
│   ├── glove.html
│   ├── beam-search.html
│   ├── bpe-tokenization.html
│   ├── seq2seq.html
│   └── self-attention.html
├── ml-optimization/                  → 9 files
│   ├── gradient-descent.html
│   ├── sgd.html
│   ├── adam.html
│   ├── rmsprop.html
│   ├── momentum.html
│   ├── learning-rate-scheduling.html
│   ├── simulated-annealing.html
│   ├── genetic-algorithm.html
│   └── backpropagation.html
├── ml-computer-vision/               → 8 files
│   ├── edge-detection.html
│   ├── hog.html
│   ├── sift.html
│   ├── image-convolution.html
│   ├── non-max-suppression.html
│   ├── iou.html
│   ├── anchor-boxes.html
│   └── image-augmentation.html
├── ml-probabilistic/                 → 6 files
│   ├── bayesian-networks.html
│   ├── hidden-markov-models.html
│   ├── expectation-maximization.html
│   ├── mcmc.html
│   ├── bayes-theorem.html
│   └── kalman-filter.html
└── ml-recommendation/                → 5 files
    ├── collaborative-filtering.html
    ├── content-based-filtering.html
    ├── matrix-factorization.html
    ├── apriori.html
    └── fp-growth.html
```

## Data Architecture

### Hub Data (`dsa-data.js`)

Slim metadata only — loaded via `<script>` tag (no fetch):

```js
var DSA_DATA = [
    {
        id: "bubble-sort",
        title: "Bubble Sort",
        category: "Sorting",
        difficulty: "Easy",
        description: "Repeatedly swaps adjacent elements if they are in the wrong order.",
        problemCount: 5,
        timeComplexity: "O(n²)",
        href: "sorting/bubble-sort.html",
        tags: ["sorting", "comparison", "stable"]
    },
    // ... 220 more entries
];
```

### Topic Page Data (inline per page)

Each `.html` file contains its own full data — concept text, LeetCode problems, code, and visualization logic. No external data dependency beyond shared CSS/JS.

```html
<!-- Example: sorting/bubble-sort.html -->
<script>
var TOPIC = {
    title: "Bubble Sort",
    category: "Sorting",
    difficulty: "Easy",
    description: "...",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    keyPoints: ["Stable sort", "In-place", "Adaptive with early termination"],
    whenToUse: ["Small datasets", "Nearly sorted data", "Educational purposes"],
    problems: [
        { number: 912, title: "Sort an Array", difficulty: "Medium", url: "https://leetcode.com/problems/sort-an-array/" },
        // ...
    ]
};
</script>
```

## Hub Page (`dsa/index.html`)

### Features

1. **Hero section** — title "DSA & ML/AI Visualizer", tagline about 221 topics
2. **Stats bar** — total topics (221), total problems count, category count
3. **Search** — real-time filter by title, description, tags
4. **Filter pills** — by category AND by difficulty (Easy/Medium/Hard)
5. **Section toggle** — "All" | "DSA" | "ML/AI" top-level filter
6. **Sort** — A-Z, by difficulty, by category
7. **Card grid** — glass cards with:
   - Topic name + difficulty badge (green=Easy, amber=Medium, red=Hard)
   - Category tag
   - Short description
   - Problem count + complexity at a glance
   - Link to topic page

### Data Flow

```
dsa-data.js (loaded via <script>) → index.html JS reads DSA_DATA
→ renders filter pills from unique categories
→ renders card grid
→ search/filter/sort manipulate the displayed subset
```

## Topic Pages

### Layout Sections

1. **Breadcrumb** — `DSA Hub > Category > Topic Name`
2. **Header** — title, difficulty badge, time/space complexity
3. **Concept** — how it works, key properties, when to use / not use
4. **Visualization** — interactive animation area
5. **Code** — JavaScript implementation with syntax highlighting via CSS
6. **Problems table** — LeetCode links, filterable by difficulty
7. **Navigation** — prev/next within category, back to hub

### Visualization Engine

Shared `visualizer.js` provides:

- **DOM-based rendering** — div bars, SVG nodes/edges (no canvas dependency)
- **Step system** — each algorithm generates an array of steps; visualizer renders them
- **Controls** — Play, Pause, Step Forward, Step Back, Reset, Speed slider
- **Custom input** — text field for comma-separated values (or node definitions for graphs/trees)
- **State colors** — CSS classes: `.comparing`, `.active`, `.sorted`, `.visited`, `.swapped`, `.current`
- **Step explanation** — text area below visualization describing current operation

Each topic page defines:

```js
function generateSteps(data) {
    // Returns array of step objects
    // Each step: { highlights: [...], explanation: "...", state: {...} }
}
Visualizer.init({
    container: '#viz',
    data: [5, 3, 8, 1, 9, 2],
    stepGenerator: generateSteps,
    type: 'bars' // or 'graph', 'tree', 'grid', 'scatter', 'network', 'matrix'
});
```

### Visualization Types

| Type | Used For | Rendering |
|------|----------|-----------|
| `bars` | Sorting, arrays, heaps | Colored div bars with values |
| `graph` | Graph algorithms | SVG nodes + edges |
| `tree` | Tree algorithms, decision trees | SVG hierarchical layout |
| `grid` | Pathfinding (A*, BFS, DFS), DP tables | Table cells with states |
| `scatter` | ML regression, clustering, classification | SVG/canvas scatter plot |
| `network` | Neural networks, deep learning | Layered node diagram |
| `matrix` | Attention, DP tables, edit distance | Colored grid cells |
| `timeline` | Interval scheduling, line sweep | Horizontal bars |
| `custom` | Topic-specific (e.g., Bloom filter hash demo) | Per-topic implementation |

### ML/AI Topic Pages

Same layout as DSA pages but with differences:

- **No LeetCode links** (unless applicable) — instead link to relevant practice platforms (Kaggle, HackerRank ML tracks)
- **Math/formula section** — key equations rendered as styled text (not LaTeX, keeping it simple)
- **Visualization focus** — gradient descent on loss surface, decision boundary animation, cluster formation, attention heatmaps, etc.

## Shared Utilities (`dsa/shared/`)

### `shared.css`

- Inherits site's CSS variable pattern for light/dark themes
- Developer-themed accents:
  - `JetBrains Mono` for code and headings
  - Terminal-style borders (`border-left: 3px solid var(--accent-cyan)`)
  - Subtle green/cyan code accents
  - Code blocks with dark background and syntax colors
- Component styles: difficulty badges, breadcrumbs, control buttons, problem tables, visualization containers
- Responsive: mobile-first, cards stack on small screens

### `shared.js`

- Theme toggle (light/dark, persisted in localStorage)
- Breadcrumb renderer (from data attributes)
- Prev/Next topic navigation (reads from `DSA_DATA` via `<script>` include)
- Tab switching for problem difficulty filters
- Code block syntax highlighting (simple regex-based, no library)

### `visualizer.js`

- `Visualizer.init(config)` — main entry point
- `Visualizer.play()` / `.pause()` / `.stepForward()` / `.stepBack()` / `.reset()`
- `Visualizer.setSpeed(ms)` — animation delay per step
- `Visualizer.setData(newData)` — for custom input
- Rendering adapters per type (bars, graph, tree, grid, scatter, network, matrix)
- Responsive — visualizations scale to container width

## Registration in Pages Hub

Add to `pages/pages-data.js`:

```js
{
    title: "DSA & ML/AI Visualizer",
    description: "221 interactive algorithm visualizations with complexity analysis, code implementations, and curated LeetCode problems for SWE interview prep.",
    href: "../dsa/index.html",
    icon: "fas fa-code",
    color: "blue",
    category: "Knowledge",
    tags: ["dsa", "algorithms", "data-structures", "leetcode", "ml", "ai", "visualization", "interview-prep"],
    featured: true
}
```

## Styling Theme

- **Base:** Glass-morphism matching site (`backdrop-filter: blur`, `rgba` backgrounds, rounded corners)
- **Developer accents:**
  - Monospace fonts (JetBrains Mono) for headings, code, stats
  - Terminal-inspired elements (blinking cursor in search, `>` prompt chars)
  - Cyan/green accent colors for interactive elements
  - Dark code blocks with syntax highlighting colors
- **Difficulty colors:** Easy=`#22c55e` (green), Medium=`#f59e0b` (amber), Hard=`#ef4444` (red)
- **Light/dark mode** via CSS variables and `data-theme` attribute

## Error Handling

- Hub gracefully shows "No results" state when filters match nothing
- Visualization handles edge cases (empty input, single element, already sorted)
- Custom input validates and shows inline error for malformed data

## Performance

- Hub loads only slim metadata (~15KB for 221 entries)
- Topic pages load only their own data + shared utilities
- Visualizations use requestAnimationFrame for smooth animation
- No external API calls — everything works offline

## Non-Goals

- No user accounts or progress tracking (may add later)
- No code execution / online judge
- No LaTeX rendering (use styled HTML for formulas)
- No backend or database
