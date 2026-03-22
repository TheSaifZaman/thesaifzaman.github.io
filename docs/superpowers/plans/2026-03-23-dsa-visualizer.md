# DSA & ML/AI Visualizer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 224-topic interactive DSA & ML/AI algorithm visualizer with search/filter hub, step-based visualizations, and curated LeetCode problems.

**Architecture:** Hub page (`dsa/index.html`) driven by slim `dsa-data.js` metadata. Each topic is a self-contained HTML file with inline data, concept explanation, JS visualization, code implementation, and problem links. Shared CSS/JS/visualizer engine in `dsa/shared/`. Registered in the site's pages hub.

**Tech Stack:** Vanilla HTML5, CSS3 (glass-morphism + developer terminal theme), ES6+ JavaScript, SVG for graphs/trees/scatter, DOM divs for bars/grids. No frameworks, no build step, no fetch().

**Spec:** `docs/superpowers/specs/2026-03-23-dsa-visualizer-design.md`

**XSS note:** All innerHTML usage in this project operates exclusively on developer-defined static data (DSA_DATA, TOPIC objects hardcoded in source files). No user-supplied HTML is ever rendered — user input (search, custom viz data) is always escaped via textContent or numeric parsing. This is a static site with no backend and no external data sources.

---

## File Structure Overview

```
dsa/
├── index.html                  → Hub page
├── dsa-data.js                 → Slim metadata (224 entries)
├── shared/
│   ├── shared.css              → Common styles + dev theme
│   ├── shared.js               → Theme, nav, breadcrumbs, tabs, syntax highlighting
│   └── visualizer.js           → Step-based visualization engine (bars, graph, tree, grid, scatter, network, matrix, timeline)
├── foundations/                 → 2 files
├── data-structures/            → 8 files
├── advanced-data-structures/   → 17 files
├── sorting/                    → 11 files
├── searching/                  → 6 files
├── tree-algorithms/            → 3 files
├── graph-algorithms/           → 20 files
├── techniques/                 → 29 files
├── string-algorithms/          → 11 files
├── math/                       → 11 files
├── computational-geometry/     → 4 files
├── game-theory/                → 3 files
├── ml-supervised/              → 19 files
├── ml-unsupervised/            → 16 files
├── ml-ensemble/                → 8 files
├── ml-deep-learning/           → 13 files
├── ml-reinforcement/           → 8 files
├── ml-nlp/                     → 7 files
├── ml-optimization/            → 9 files
├── ml-computer-vision/         → 8 files
├── ml-probabilistic/           → 6 files
└── ml-recommendation/          → 5 files
```

---

## Phase 1: Foundation (Tasks 1-5)

### Task 1: Create shared CSS (`dsa/shared/shared.css`)

**Files:**
- Create: `dsa/shared/shared.css`

- [ ] **Step 1: Create the shared CSS file with CSS variables, layout, and developer theme**

Include:
- `:root` light theme and `[data-theme="dark"]` dark theme CSS variables matching the site's pattern
- Developer accents: `--font-mono: 'JetBrains Mono'`, `--accent-cyan: #06b6d4`, terminal-style borders
- Code syntax colors: `--code-keyword`, `--code-string`, `--code-comment`, `--code-number`, `--code-function`
- Components: `.navbar` (with `::before` prompt char), `.breadcrumb`, `.badge-easy/medium/hard`, `.section-title`, `.topic-header`, `.glass-card`, `.content`
- Visualization: `.viz-container`, `.viz-area`, `.viz-controls`, `.viz-btn`, `.viz-speed`, `.viz-explanation`, `.viz-input`
- Viz states: `.bar` + `.comparing/.swapped/.sorted/.active/.current`, `.node-circle` + states, `.edge-line` + states, `.grid-cell` + `.wall/.start/.end/.visited/.path/.current`
- Scatter: `.scatter-point`, `.scatter-axis`
- Code block: `.code-block` with dark bg and syntax spans
- Problems: `.problems-tabs`, `.problems-tab`, `.problems-table`
- Navigation: `.topic-nav`, `.back-to-hub`
- Footer: `.dsa-footer`
- Responsive: `@media (max-width: 768px)` breakpoint

See spec for exact color values and design tokens.

- [ ] **Step 2: Commit**

```bash
git add dsa/shared/shared.css
git commit -m "feat(dsa): add shared CSS with glass-morphism + developer theme"
```

---

### Task 2: Create shared JS (`dsa/shared/shared.js`)

**Files:**
- Create: `dsa/shared/shared.js`

- [ ] **Step 1: Create shared.js with theme toggle, breadcrumbs, nav, tabs, and syntax highlighting**

Wrap in IIFE. Include:
- **Theme toggle:** read `dsa-theme` from localStorage, set `data-theme` attribute, toggle icon `fa-sun`/`fa-moon`
- **Breadcrumbs:** if `#breadcrumb` and `TOPIC` global exist, render `DSA Hub > Category > Title` with link to `../index.html`
- **Prev/Next nav:** if `#topicNav`, `DSA_DATA`, and `TOPIC` exist, filter `DSA_DATA` by same category, find current index, render prev/next links with `../` prefix on hrefs
- **Problem tabs:** delegate click on `.problems-tabs` to filter `.problems-table tbody tr` by `data-difficulty` attribute
- **Syntax highlighting:** `window.highlightCode(codeEl)` — regex-based replacement for JS keywords, strings, comments, numbers. Auto-apply to `.code-block code` elements on load.

- [ ] **Step 2: Commit**

```bash
git add dsa/shared/shared.js
git commit -m "feat(dsa): add shared JS — theme, nav, tabs, syntax highlighting"
```

---

### Task 3: Create visualization engine (`dsa/shared/visualizer.js`)

**Files:**
- Create: `dsa/shared/visualizer.js`

- [ ] **Step 1: Create the Visualizer object with step-based animation, controls, and rendering adapters**

Global `var Visualizer = (function() { ... })();` returning public API:
- `init(config)` — config: `{ container, data, stepGenerator, type, renderOptions }`
- `play()`, `pause()`, `stepForward()`, `stepBack()`, `reset()`
- `setSpeed(ms)`, `setData(newData)`

Internal implementation:
- `buildUI()` — creates custom input field, viz area div, explanation div, and control buttons inside container
- `applyCustomData()` — parses comma-separated input via `parseFloat`, validates (no NaN, max 50 elements), calls `generateSteps` and renders
- `generateSteps(data)` — calls `state.stepGenerator(data.slice())`
- `renderStep()` — dispatches to type-specific renderer, updates explanation text and step counter
- **Renderers:**
  - `renderBars(step)` — div bars with height proportional to value, state classes from `step.highlights`
  - `renderGraph(step)` — SVG with edge lines and node circles, positioned by `step.nodes[].x/y`
  - `renderTree(step)` — SVG like graph but with hierarchical y, finds nodes by id for edges
  - `renderGrid(step)` — CSS grid of `.grid-cell` divs from `step.grid[][]` with `state` and `value`
  - `renderScatter(step)` — SVG with axes, points from `step.points[].x/y/color/r`, optional `step.lines[]`
  - `renderNetwork(step)` — SVG layered nodes from `step.layers[].nodes[]`, connections between adjacent layers
  - `renderMatrix(step)` — delegates to renderGrid
  - `renderTimeline(step)` — horizontal bars from `step.intervals[].start/end/label/color/state`
- **Playback:** `play()` sets playing flag, toggles button icon to pause, calls `tick()` via setTimeout at `state.speed` interval. `stop()` clears timeout. `stepForward/Back` increment/decrement and re-render.

Each step object shape:
```js
{
    array: [...],           // for bars
    highlights: { 0: 'comparing', 2: 'sorted' },  // index -> CSS class
    explanation: "Comparing elements at index 0 and 1",
    nodes: [...], edges: [...],  // for graph/tree
    grid: [[{value, state}]],    // for grid/matrix
    points: [{x, y, color, r, state}],  // for scatter
    layers: [{nodes: [{label, state}], weights: [[...]]}],  // for network
    intervals: [{start, end, label, color, state}],  // for timeline
    lines: [{x1, y1, x2, y2, color, dash}],  // for scatter overlays
    render: function(el) {}  // for custom type
}
```

- [ ] **Step 2: Commit**

```bash
git add dsa/shared/visualizer.js
git commit -m "feat(dsa): add step-based visualization engine with 8 render types"
```

---

### Task 4: Create hub page (`dsa/index.html` + `dsa/dsa-data.js`)

**Files:**
- Create: `dsa/index.html`
- Create: `dsa/dsa-data.js`

- [ ] **Step 1: Create `dsa/dsa-data.js` with slim metadata for all 224 topics**

`var DSA_DATA = [...]` with one entry per topic:
```js
{ id: "slug", title: "Name", category: "Category", difficulty: "Easy|Medium|Hard", description: "One sentence.", problemCount: N, timeComplexity: "O(...)", href: "category-folder/slug.html", tags: ["tag1", "tag2"], section: "dsa|ml" }
```

Generate all 224 entries following the folder structure in the spec. Categories and their topic counts:
- Foundations (2), Data Structures (8), Advanced Data Structures (17), Sorting (11), Searching (6), Tree Algorithms (3), Graph Algorithms (20), Techniques (29), String Algorithms (11), Math (11), Computational Geometry (4), Game Theory (3) — all `section: "dsa"`
- Supervised Learning (19), Unsupervised Learning (16), Ensemble Methods (8), Deep Learning (13), Reinforcement Learning (8), NLP Algorithms (7), Optimization (9), Computer Vision (8), Probabilistic (6), Recommendation (5) — all `section: "ml"`

- [ ] **Step 2: Create `dsa/index.html` — the hub page**

Structure:
- Navbar with logo (`> DSA Visualizer`), links to Pages and Home, theme toggle
- Hero section with `$ DSA & ML/AI Visualizer` title and subtitle
- Stats bar: topic count, problem count, category count (computed from DSA_DATA on load)
- Controls: search input, section toggles (All/DSA/ML-AI), category pills (auto-generated from data), difficulty pills (All/Easy/Medium/Hard), sort dropdown (By Category/A-Z/Z-A/By Difficulty)
- Card grid: `.glass-card.topic-card` for each filtered topic showing badge, category, title, description, problem count, complexity
- Empty state when no results
- Footer

Script: IIFE that reads `DSA_DATA`, manages filter/sort state, renders cards. Search filters by title+description+tags. All user text displayed via `esc()` function that replaces `&<>` characters. Include theme toggle inline (hub doesn't load shared.js since it has its own layout).

Load `dsa-data.js` via `<script>` tag before the inline script.

- [ ] **Step 3: Commit**

```bash
git add dsa/index.html dsa/dsa-data.js
git commit -m "feat(dsa): add hub page with search, filter, sort for 224 topics"
```

---

### Task 5: Register in pages hub

**Files:**
- Modify: `pages/pages-data.js`

- [ ] **Step 1: Add DSA Visualizer entry to `pages/pages-data.js`**

Add at the end of the array (before the closing `];`):

```js
    {
        title: "DSA & ML/AI Visualizer",
        description: "224 interactive algorithm visualizations with complexity analysis, code implementations, and curated LeetCode problems for SWE interview prep.",
        href: "../dsa/index.html",
        icon: "fas fa-code",
        color: "blue",
        category: "Knowledge",
        tags: ["dsa", "algorithms", "data-structures", "leetcode", "ml", "ai", "visualization", "interview-prep"],
        featured: true
    }
```

- [ ] **Step 2: Commit**

```bash
git add pages/pages-data.js
git commit -m "feat(pages): register DSA & ML/AI Visualizer in pages hub"
```

---

## Phase 2: DSA Topic Pages (Tasks 6-17)

Each task creates all topic pages for one category. Every page follows this template structure.

### Topic Page Template

Each topic HTML file follows this structure:

```
<!DOCTYPE html> with lang="en"
<head>: charset, viewport, title "[Topic] — DSA Visualizer", shared.css link, Font Awesome 6.5.1, favicon
<body>:
  <nav class="navbar"> — logo linking to ../index.html, Hub link, theme toggle
  <div class="breadcrumb" id="breadcrumb"> — populated by shared.js
  <div class="topic-header"> — h1, badge, complexity tags
  <div class="content">:
    1. Concept section — "How It Works" with explanation paragraphs and key-points grid
    2. Visualization — <div class="viz-container" id="viz"> (populated by visualizer.js)
    3. Code — <div class="code-block"><pre><code>JS implementation</code></pre></div>
    4. Problems — tabs (All/Easy/Medium/Hard) + table with # / Problem (linked) / Difficulty badge
       Table rows have data-difficulty attribute for filtering
    5. Navigation — <div class="topic-nav" id="topicNav"> populated by shared.js
  <footer class="dsa-footer">

  <script>: var TOPIC = { id, title, category, difficulty, ... inline data }
  <script src="../dsa-data.js">
  <script src="../shared/shared.js">
  <script src="../shared/visualizer.js">
  <script>: generateSteps function + Visualizer.init() call
```

**Important:** All problem URLs use `https://leetcode.com/problems/[slug]/` format. All user search text is escaped. Custom viz input is parsed as numbers only (no HTML).

---

### Task 6: Foundations pages (2 files)

**Files:**
- Create: `dsa/foundations/logic-building.html`
- Create: `dsa/foundations/complexity-analysis.html`

- [ ] **Step 1: Create `logic-building.html`** — covers pattern recognition, loop logic, conditional thinking. Visualization type: `bars` showing step-through of a logic problem (e.g., FizzBuzz decision flow). Include 10+ basic LeetCode logic problems.

- [ ] **Step 2: Create `complexity-analysis.html`** — covers Big O, Omega, Theta, common complexities. Visualization type: `scatter` showing animated comparison chart of growth rates O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n) as n increases. Include 8+ complexity analysis problems.

- [ ] **Step 3: Commit**

```bash
git add dsa/foundations/
git commit -m "feat(dsa): add foundations pages — logic building, complexity analysis"
```

---

### Task 7: Data Structures pages (8 files)

**Files:**
- Create all 8 files in `dsa/data-structures/`: `arrays.html`, `linked-lists.html`, `stacks.html`, `queues.html`, `hash-tables.html`, `heaps.html`, `tries.html`, `matrix-grid.html`

- [ ] **Step 1: Create all 8 data structure pages** following the topic template. Each with:
  - Concept explanation specific to the data structure
  - Visualization types: `bars` for arrays, custom linked-list node chain for linked lists, stack/queue push-pop animation, hash table with collision visualization, `tree` type for heaps, trie character-by-character insertion, `grid` for matrix
  - JavaScript implementation of core operations
  - 10-15 curated LeetCode problems per topic

- [ ] **Step 2: Commit**

```bash
git add dsa/data-structures/
git commit -m "feat(dsa): add 8 data structure pages with visualizations"
```

---

### Task 8: Advanced Data Structures pages (17 files)

**Files:**
- Create all 17 files in `dsa/advanced-data-structures/`:
  `segment-trees.html`, `union-find.html`, `monotonic-stack-queue.html`, `b-tree.html`, `skip-list.html`, `bloom-filter.html`, `lru-cache.html`, `fenwick-tree.html`, `sparse-table.html`, `deque.html`, `circular-buffer.html`, `doubly-linked-list.html`, `treap.html`, `splay-tree.html`, `hash-map-internals.html`, `persistent-data-structures.html`, `bitwise-trie.html`

- [ ] **Step 1: Create all 17 pages** with appropriate visualization types:
  - `tree` type: segment-trees, fenwick-tree, treap, splay-tree, b-tree
  - `bars` type: deque, circular-buffer, monotonic-stack-queue
  - Custom: bloom-filter (hash function demo), lru-cache (list+map animation), skip-list (layered structure), hash-map-internals (chaining/probing), union-find (forest with path compression), persistent-data-structures (version tree), bitwise-trie, sparse-table, doubly-linked-list (node chain)

- [ ] **Step 2: Commit**

```bash
git add dsa/advanced-data-structures/
git commit -m "feat(dsa): add 17 advanced data structure pages"
```

---

### Task 9: Sorting pages (11 files)

**Files:**
- Create all 11 files in `dsa/sorting/`:
  `bubble-sort.html`, `selection-sort.html`, `insertion-sort.html`, `merge-sort.html`, `quick-sort.html`, `heap-sort.html`, `counting-sort.html`, `radix-sort.html`, `tim-sort.html`, `bucket-sort.html`, `shell-sort.html`

- [ ] **Step 1: Create all 11 sorting pages.** All use `bars` visualization type. Each step generator implements the actual sorting algorithm generating compare/swap/sorted state transitions step by step. Default mock data: `[38, 27, 43, 3, 9, 82, 10]`. Each page must have a working `generateSteps` that produces correct sorting animation.

- [ ] **Step 2: Commit**

```bash
git add dsa/sorting/
git commit -m "feat(dsa): add 11 sorting algorithm pages with bar visualizations"
```

---

### Task 10: Searching pages (6 files)

**Files:**
- Create all 6 files in `dsa/searching/`:
  `binary-search.html`, `dfs.html`, `bfs.html`, `ternary-search.html`, `interpolation-search.html`, `exponential-search.html`

- [ ] **Step 1: Create all 6 pages.** Binary/ternary/interpolation/exponential use `bars` type with pointer highlights showing search range narrowing. DFS/BFS use `graph` type showing node traversal order with visited/current/active states.

- [ ] **Step 2: Commit**

```bash
git add dsa/searching/
git commit -m "feat(dsa): add 6 searching algorithm pages"
```

---

### Task 11: Tree Algorithm pages (3 files)

**Files:**
- Create: `dsa/tree-algorithms/binary-tree.html`, `binary-search-tree.html`, `avl-red-black-trees.html`

- [ ] **Step 1: Create all 3 pages** using `tree` visualization type. Show insertion, traversal (inorder/preorder/postorder), and balancing rotations (for AVL/RB). Tree nodes positioned with recursive x/y calculation: root at top center, children spread horizontally at each level.

- [ ] **Step 2: Commit**

```bash
git add dsa/tree-algorithms/
git commit -m "feat(dsa): add 3 tree algorithm pages with tree visualizations"
```

---

### Task 12: Graph Algorithm pages (20 files)

**Files:**
- Create all 20 files in `dsa/graph-algorithms/`:
  `graph-representation.html`, `dijkstras.html`, `bellman-ford.html`, `floyd-warshall.html`, `topological-sort.html`, `minimum-spanning-tree.html`, `a-star-search.html`, `tarjans-scc.html`, `kosarajus-scc.html`, `euler-path-circuit.html`, `floyd-cycle-detection.html`, `bipartite-check.html`, `network-flow.html`, `hungarian-algorithm.html`, `articulation-points-bridges.html`, `hamiltonian-path.html`, `graph-coloring.html`, `minimum-cut.html`, `travelling-salesman.html`, `shortest-path-dag.html`

- [ ] **Step 1: Create all 20 pages** using `graph` type (SVG node/edge). For pathfinding algorithms (Dijkstra, Bellman-Ford, A*, Floyd-Warshall), also support `grid` type for grid-based pathfinding demo. Each page includes a hardcoded sample graph definition with manually positioned nodes (x, y coordinates).

- [ ] **Step 2: Commit**

```bash
git add dsa/graph-algorithms/
git commit -m "feat(dsa): add 20 graph algorithm pages with graph visualizations"
```

---

### Task 13: Techniques pages (29 files)

**Files:**
- Create all 29 files in `dsa/techniques/`:
  `two-pointers.html`, `sliding-window.html`, `divide-and-conquer.html`, `dynamic-programming.html`, `greedy.html`, `backtracking.html`, `bit-manipulation.html`, `recursion.html`, `reservoir-sampling.html`, `fisher-yates-shuffle.html`, `boyer-moore-voting.html`, `dutch-national-flag.html`, `kadanes-algorithm.html`, `prefix-sum.html`, `difference-array.html`, `interval-scheduling.html`, `line-sweep.html`, `meet-in-the-middle.html`, `topk-elements.html`, `sliding-window-max.html`, `cycle-detection-arrays.html`, `coordinate-compression.html`, `binary-lifting.html`, `heavy-light-decomposition.html`, `mos-algorithm.html`, `sqrt-decomposition.html`, `branch-and-bound.html`, `randomized-algorithms.html`, `string-hashing.html`

- [ ] **Step 1: Create all 29 pages.** Visualization types vary:
  - `bars`: two-pointers, sliding-window, kadane's, prefix-sum, difference-array, dutch-national-flag, boyer-moore-voting, topk-elements, sliding-window-max, fisher-yates-shuffle, reservoir-sampling, string-hashing
  - `grid`: dynamic-programming, backtracking, meet-in-the-middle
  - `timeline`: interval-scheduling, line-sweep
  - `tree`: recursion, binary-lifting, heavy-light-decomposition, divide-and-conquer
  - `bars` or `grid`: bit-manipulation, greedy, branch-and-bound, cycle-detection-arrays, coordinate-compression, mos-algorithm, sqrt-decomposition, randomized-algorithms

- [ ] **Step 2: Commit**

```bash
git add dsa/techniques/
git commit -m "feat(dsa): add 29 technique/pattern pages"
```

---

### Task 14: String Algorithm pages (11 files)

**Files:**
- Create all 11 files in `dsa/string-algorithms/`:
  `kmp.html`, `rabin-karp.html`, `string-matching.html`, `z-algorithm.html`, `manachers.html`, `suffix-array.html`, `suffix-tree.html`, `aho-corasick.html`, `boyer-moore-search.html`, `longest-common-subsequence.html`, `edit-distance.html`

- [ ] **Step 1: Create all 11 pages.** Visualization: custom string matching animation showing pattern alignment, character comparisons highlighted, and shifts. Use colored character div boxes. For LCS and edit-distance, use `matrix` type showing DP table cells filling in step by step.

- [ ] **Step 2: Commit**

```bash
git add dsa/string-algorithms/
git commit -m "feat(dsa): add 11 string algorithm pages"
```

---

### Task 15: Math pages (11 files)

**Files:**
- Create all 11 files in `dsa/math/`:
  `math-number-theory.html`, `sieve-of-eratosthenes.html`, `euclidean-gcd.html`, `fast-exponentiation.html`, `modular-arithmetic.html`, `matrix-exponentiation.html`, `catalan-numbers.html`, `combinatorics.html`, `prime-factorization.html`, `chinese-remainder-theorem.html`, `inclusion-exclusion.html`

- [ ] **Step 1: Create all 11 pages.** Visualization types:
  - `grid`: sieve-of-eratosthenes (number grid marking composites in red), matrix-exponentiation
  - `bars`: euclidean-gcd (showing division steps), fast-exponentiation (binary representation)
  - `matrix`/`grid`: combinatorics (Pascal's triangle), catalan-numbers
  - Custom: prime-factorization (factor tree), inclusion-exclusion (Venn diagram), chinese-remainder-theorem, modular-arithmetic, math-number-theory

- [ ] **Step 2: Commit**

```bash
git add dsa/math/
git commit -m "feat(dsa): add 11 math & number theory pages"
```

---

### Task 16: Computational Geometry pages (4 files)

**Files:**
- Create: `dsa/computational-geometry/convex-hull.html`, `line-intersection.html`, `closest-pair.html`, `point-in-polygon.html`

- [ ] **Step 1: Create all 4 pages** using `scatter` type with SVG points, lines, and polygon overlays. Convex hull shows points wrapping step by step. Closest pair shows divide-and-conquer strip. Point-in-polygon shows ray casting.

- [ ] **Step 2: Commit**

```bash
git add dsa/computational-geometry/
git commit -m "feat(dsa): add 4 computational geometry pages"
```

---

### Task 17: Game Theory pages (3 files)

**Files:**
- Create: `dsa/game-theory/minimax.html`, `alpha-beta-pruning.html`, `nim-game.html`

- [ ] **Step 1: Create all 3 pages** using `tree` type for game trees with min/max node labels and pruned branches (for alpha-beta). Nim-game uses `bars` showing pile manipulation.

- [ ] **Step 2: Commit**

```bash
git add dsa/game-theory/
git commit -m "feat(dsa): add 3 game theory pages"
```

---

## Phase 3: ML/AI Topic Pages (Tasks 18-27)

Same template as DSA pages but with these differences:
- Practice links go to Kaggle/HackerRank instead of LeetCode (unless a LeetCode problem exists for the topic)
- Math formula section with styled HTML (bold, subscript, superscript — no LaTeX)
- Visualization types: `scatter` for regression/classification/clustering, `network` for deep learning, `grid` for DP-like ML concepts, `bars` for optimization comparisons

### Task 18: ML Supervised Learning pages (19 files)

**Files:**
- Create all 19 files in `dsa/ml-supervised/`:
  `linear-regression.html`, `polynomial-regression.html`, `ridge-regression.html`, `lasso-regression.html`, `elastic-net.html`, `bayesian-linear-regression.html`, `quantile-regression.html`, `svr.html`, `logistic-regression.html`, `decision-tree.html`, `random-forest.html`, `svm.html`, `knn.html`, `naive-bayes.html`, `gradient-boosted-trees.html`, `perceptron.html`, `lda-classifier.html`, `qda.html`, `softmax-regression.html`

- [ ] **Step 1: Create all 19 pages.** Regression topics use `scatter` with fitted line/curve animating. Classification topics use `scatter` with decision boundaries drawn. Decision tree uses `tree` type. SVM shows margin and support vectors. KNN shows expanding radius to find neighbors.

- [ ] **Step 2: Commit**

```bash
git add dsa/ml-supervised/
git commit -m "feat(dsa): add 19 ML supervised learning pages"
```

---

### Task 19: ML Unsupervised Learning pages (16 files)

**Files:**
- Create all 16 files in `dsa/ml-unsupervised/`:
  `k-means.html`, `dbscan.html`, `hierarchical-clustering.html`, `gaussian-mixture-models.html`, `mean-shift.html`, `spectral-clustering.html`, `optics.html`, `k-medoids.html`, `pca.html`, `t-sne.html`, `umap.html`, `lda-topic.html`, `svd.html`, `autoencoder.html`, `isomap.html`, `kernel-pca.html`

- [ ] **Step 1: Create all 16 pages.** Clustering uses `scatter` with color-coded clusters forming iteratively. PCA/t-SNE use `scatter` showing dimensionality projection. Autoencoder uses `network` type showing data flow through bottleneck.

- [ ] **Step 2: Commit**

```bash
git add dsa/ml-unsupervised/
git commit -m "feat(dsa): add 16 ML unsupervised learning pages"
```

---

### Task 20: ML Ensemble Methods pages (8 files)

**Files:**
- Create all 8 files in `dsa/ml-ensemble/`:
  `bagging.html`, `boosting.html`, `adaboost.html`, `xgboost.html`, `lightgbm.html`, `catboost.html`, `stacking.html`, `voting-ensemble.html`

- [ ] **Step 1: Create all 8 pages.** Bagging/boosting use `scatter` showing iterative model improvements and sample weighting. Voting uses custom multi-model comparison visualization with `bars`.

- [ ] **Step 2: Commit**

```bash
git add dsa/ml-ensemble/
git commit -m "feat(dsa): add 8 ML ensemble method pages"
```

---

### Task 21: ML Deep Learning pages (13 files)

**Files:**
- Create all 13 files in `dsa/ml-deep-learning/`:
  `mlp.html`, `cnn.html`, `rnn.html`, `lstm.html`, `gru.html`, `transformer.html`, `gan.html`, `vae.html`, `resnet-skip-connections.html`, `batch-normalization.html`, `dropout.html`, `attention-mechanism.html`, `diffusion-models.html`

- [ ] **Step 1: Create all 13 pages.** MLP/CNN/RNN/LSTM/GRU/ResNet/Dropout use `network` type showing layered diagrams with activations flowing. Transformer/attention use `matrix` type for attention weight heatmaps. GAN shows generator vs discriminator. Diffusion shows progressive denoising.

- [ ] **Step 2: Commit**

```bash
git add dsa/ml-deep-learning/
git commit -m "feat(dsa): add 13 ML deep learning pages"
```

---

### Task 22: ML Reinforcement Learning pages (8 files)

**Files:**
- Create all 8 files in `dsa/ml-reinforcement/`:
  `q-learning.html`, `sarsa.html`, `deep-q-network.html`, `policy-gradient.html`, `actor-critic.html`, `monte-carlo-rl.html`, `multi-armed-bandit.html`, `ppo.html`

- [ ] **Step 1: Create all 8 pages.** Q-learning/SARSA/Monte-Carlo use `grid` type showing agent navigating grid world with Q-value overlays updating. Multi-armed bandit uses `bars` showing reward distribution estimates. DQN/policy-gradient/actor-critic/PPO use `network` + `grid` combination.

- [ ] **Step 2: Commit**

```bash
git add dsa/ml-reinforcement/
git commit -m "feat(dsa): add 8 ML reinforcement learning pages"
```

---

### Task 23: ML NLP pages (7 files)

**Files:**
- Create all 7 files in `dsa/ml-nlp/`:
  `tf-idf.html`, `word2vec.html`, `glove.html`, `beam-search.html`, `bpe-tokenization.html`, `seq2seq.html`, `self-attention.html`

- [ ] **Step 1: Create all 7 pages.** Word2Vec/GloVe use `scatter` for 2D word embedding projections. Attention/self-attention use `matrix` type for attention weight heatmaps between tokens. BPE uses custom character merge animation with `bars`. Beam search uses `tree` type showing candidate expansion/pruning. TF-IDF uses `bars` for term importance. Seq2seq uses `network` type.

- [ ] **Step 2: Commit**

```bash
git add dsa/ml-nlp/
git commit -m "feat(dsa): add 7 ML NLP algorithm pages"
```

---

### Task 24: ML Optimization pages (9 files)

**Files:**
- Create all 9 files in `dsa/ml-optimization/`:
  `gradient-descent.html`, `sgd.html`, `adam.html`, `rmsprop.html`, `momentum.html`, `learning-rate-scheduling.html`, `simulated-annealing.html`, `genetic-algorithm.html`, `backpropagation.html`

- [ ] **Step 1: Create all 9 pages.** Gradient descent/SGD/Adam/RMSProp/momentum use `scatter` showing point moving on 2D loss surface contour plot. Learning-rate scheduling uses `scatter` showing LR decay curve. Genetic algorithm uses `bars` showing population fitness evolution. Backpropagation uses `network` type showing error signal flowing backward. Simulated annealing uses `scatter` showing solution quality over temperature.

- [ ] **Step 2: Commit**

```bash
git add dsa/ml-optimization/
git commit -m "feat(dsa): add 9 ML optimization algorithm pages"
```

---

### Task 25: ML Computer Vision pages (8 files)

**Files:**
- Create all 8 files in `dsa/ml-computer-vision/`:
  `edge-detection.html`, `hog.html`, `sift.html`, `image-convolution.html`, `non-max-suppression.html`, `iou.html`, `anchor-boxes.html`, `image-augmentation.html`

- [ ] **Step 1: Create all 8 pages.** Edge detection/image convolution use `grid` type showing kernel sliding over pixel grid. NMS/IoU/anchor-boxes use `scatter` with SVG rectangle overlays for bounding boxes. HOG uses `grid` with gradient direction arrows. Image augmentation shows multiple transformed versions in a grid.

- [ ] **Step 2: Commit**

```bash
git add dsa/ml-computer-vision/
git commit -m "feat(dsa): add 8 ML computer vision pages"
```

---

### Task 26: ML Probabilistic pages (6 files)

**Files:**
- Create all 6 files in `dsa/ml-probabilistic/`:
  `bayesian-networks.html`, `hidden-markov-models.html`, `expectation-maximization.html`, `mcmc.html`, `bayes-theorem.html`, `kalman-filter.html`

- [ ] **Step 1: Create all 6 pages.** Bayesian networks use `graph` type (directed acyclic graph). HMM uses `graph` with state transitions and emission probabilities. EM uses `scatter` showing E-step/M-step alternation. MCMC uses `scatter` showing random walk sampling. Bayes' theorem uses `bars` showing prior updating to posterior. Kalman filter uses `scatter` showing predicted vs observed trajectory.

- [ ] **Step 2: Commit**

```bash
git add dsa/ml-probabilistic/
git commit -m "feat(dsa): add 6 ML probabilistic algorithm pages"
```

---

### Task 27: ML Recommendation pages (5 files)

**Files:**
- Create all 5 files in `dsa/ml-recommendation/`:
  `collaborative-filtering.html`, `content-based-filtering.html`, `matrix-factorization.html`, `apriori.html`, `fp-growth.html`

- [ ] **Step 1: Create all 5 pages.** Collaborative/content-based filtering use `matrix` type showing user-item rating matrix with predicted values filling in. Matrix factorization shows decomposition animation. Apriori uses custom itemset lattice growing step by step. FP-Growth uses `tree` type for FP-tree construction.

- [ ] **Step 2: Commit**

```bash
git add dsa/ml-recommendation/
git commit -m "feat(dsa): add 5 ML recommendation algorithm pages"
```

---

## Phase 4: Polish and Verify (Task 28)

### Task 28: Final verification and cleanup

- [ ] **Step 1: Verify all 224 topic pages exist**

```bash
find dsa/ -name "*.html" ! -name "index.html" | wc -l
# Expected: 224
```

- [ ] **Step 2: Verify hub page loads and shows all 224 topics**

Open `dsa/index.html` in browser. Check:
- All 224 cards render
- Search works (try "sort", "tree", "gradient")
- Category filter works
- Difficulty filter works
- Section toggle (All/DSA/ML) works
- Each card links to correct topic page

- [ ] **Step 3: Spot-check 5-10 topic pages across categories**

Verify for each:
- Breadcrumb renders correctly
- Visualization plays through all steps without errors
- Custom data input works
- Code block has syntax highlighting
- Problems table filters by difficulty
- Prev/Next navigation works
- Light/dark theme works on both hub and topic pages

- [ ] **Step 4: Verify pages hub shows DSA entry**

Open `pages/index.html`, confirm "DSA & ML/AI Visualizer" card appears and links correctly.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat(dsa): complete DSA & ML/AI Visualizer — 224 interactive topic pages"
```

---

## Execution Notes

- **Tasks 6-17 (DSA) and Tasks 18-27 (ML/AI) are fully independent** — parallelize via subagents
- **Tasks within Phase 2 and Phase 3 are also independent** of each other (e.g., Task 9 sorting doesn't depend on Task 8 advanced DS)
- **Phase 1 (Tasks 1-5) must complete before Phase 2/3** — topic pages depend on shared CSS/JS/visualizer
- **The `dsa-data.js` file in Task 4 is on the critical path** — all 224 entries with correct hrefs must exist before topic pages can use prev/next navigation
- **Each task maps to one subagent session** — the pages follow a consistent template
- **Maximum parallelism:** After Phase 1, all 22 category tasks (6-27) can run simultaneously
