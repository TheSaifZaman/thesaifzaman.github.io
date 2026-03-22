/**
 * Visualizer.js — Step-based visualization engine
 * Supports 8 render types: bars, graph, tree, grid, scatter, network, matrix, timeline
 * Used by all 224 DSA & ML/AI topic pages.
 */
var Visualizer = (function () {
  'use strict';

  var ICON_PLAY = '<i class="fas fa-play"></i>';
  var ICON_PAUSE = '<i class="fas fa-pause"></i>';
  var ICON_RESET = '<i class="fas fa-undo"></i>';
  var ICON_BACK = '<i class="fas fa-step-backward"></i>';
  var ICON_FWD = '<i class="fas fa-step-forward"></i>';

  var state = {
    steps: [],
    currentStep: 0,
    playing: false,
    speed: 500,
    type: 'bars',
    container: null,
    vizArea: null,
    explanationEl: null,
    data: [],
    originalData: [],
    stepGenerator: null,
    renderOptions: {},
    timerId: null
  };

  // ── Helpers ────────────────────────────────────────────────────────────

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') {
          node.setAttribute('class', attrs[k]);
        } else if (k === 'textContent') {
          node.textContent = attrs[k];
        } else if (k.slice(0, 2) === 'on') {
          node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        } else {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    if (children) {
      children.forEach(function (c) {
        if (c) node.appendChild(c);
      });
    }
    return node;
  }

  function setIconHTML(element, iconMarkup) {
    // Only used with hardcoded icon constants above — safe static HTML
    element.innerHTML = iconMarkup;
  }

  function svgEl(tag, attrs, children) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'textContent') {
          node.textContent = attrs[k];
        } else {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    if (children) {
      children.forEach(function (c) {
        if (c) node.appendChild(c);
      });
    }
    return node;
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  // ── UI Construction ────────────────────────────────────────────────────

  function buildUI() {
    var c = state.container;
    c.textContent = '';
    c.classList.add('visualizer-root');

    // Data input row
    var inputRow = el('div', { className: 'viz-data-input' });
    var dataField = el('input', {
      type: 'text',
      className: 'viz-data-field',
      id: 'vizDataField',
      placeholder: 'Enter data (comma-separated)...'
    });
    dataField.value = state.data.join(', ');
    var applyBtn = el('button', {
      className: 'viz-btn viz-apply-btn',
      textContent: 'Apply',
      onClick: function () { applyCustomData(); }
    });
    var errorDiv = el('div', { className: 'viz-data-error', id: 'vizDataError' });
    inputRow.appendChild(dataField);
    inputRow.appendChild(applyBtn);
    inputRow.appendChild(errorDiv);
    c.appendChild(inputRow);

    // Viz area
    var vizArea = el('div', { className: 'viz-area', id: 'vizArea' });
    c.appendChild(vizArea);
    state.vizArea = vizArea;

    // Explanation
    var explanation = el('div', {
      className: 'viz-explanation',
      id: 'vizExplanation',
      textContent: 'Press Play or Step to begin.'
    });
    c.appendChild(explanation);
    state.explanationEl = explanation;

    // Controls row
    var controls = el('div', { className: 'viz-controls' });

    var resetBtn = el('button', {
      className: 'viz-btn viz-ctrl-btn',
      id: 'vizResetBtn',
      title: 'Reset',
      onClick: function () { reset(); }
    });
    setIconHTML(resetBtn, ICON_RESET);

    var backBtn = el('button', {
      className: 'viz-btn viz-ctrl-btn',
      id: 'vizBackBtn',
      title: 'Step Back',
      onClick: function () { stepBack(); }
    });
    setIconHTML(backBtn, ICON_BACK);

    var playBtn = el('button', {
      className: 'viz-btn viz-ctrl-btn viz-play-btn',
      id: 'vizPlayBtn',
      title: 'Play / Pause',
      onClick: function () {
        if (state.playing) {
          pause();
        } else {
          play();
        }
      }
    });
    setIconHTML(playBtn, ICON_PLAY);

    var fwdBtn = el('button', {
      className: 'viz-btn viz-ctrl-btn',
      id: 'vizFwdBtn',
      title: 'Step Forward',
      onClick: function () { stepForward(); }
    });
    setIconHTML(fwdBtn, ICON_FWD);

    var speedSlider = el('input', {
      type: 'range',
      className: 'viz-speed-slider',
      id: 'vizSpeedSlider',
      min: '50',
      max: '2000',
      step: '50',
      title: 'Speed'
    });
    speedSlider.value = String(state.speed);
    speedSlider.addEventListener('input', function () {
      var v = parseInt(this.value, 10);
      state.speed = v;
      var label = $('#vizSpeedLabel', c);
      if (label) label.textContent = v + 'ms';
    });

    var speedLabel = el('span', {
      className: 'viz-speed-label',
      id: 'vizSpeedLabel',
      textContent: state.speed + 'ms'
    });

    var stepCounter = el('span', {
      className: 'viz-step-counter',
      id: 'vizStepCounter',
      textContent: '0 / 0'
    });

    controls.appendChild(resetBtn);
    controls.appendChild(backBtn);
    controls.appendChild(playBtn);
    controls.appendChild(fwdBtn);
    controls.appendChild(speedSlider);
    controls.appendChild(speedLabel);
    controls.appendChild(stepCounter);
    c.appendChild(controls);
  }

  // ── Custom Data ────────────────────────────────────────────────────────

  function applyCustomData() {
    var field = $('#vizDataField', state.container);
    var errorDiv = $('#vizDataError', state.container);
    if (!field) return;

    errorDiv.textContent = '';
    var raw = field.value.trim();
    if (!raw) {
      errorDiv.textContent = 'Please enter at least one value.';
      return;
    }

    var parts = raw.split(',');
    var parsed = [];
    for (var i = 0; i < parts.length; i++) {
      var v = parseFloat(parts[i].trim());
      if (isNaN(v)) {
        errorDiv.textContent = 'Invalid number: "' + parts[i].trim() + '"';
        return;
      }
      parsed.push(v);
    }

    if (parsed.length < 1) {
      errorDiv.textContent = 'Enter at least 1 number.';
      return;
    }
    if (parsed.length > 50) {
      errorDiv.textContent = 'Maximum 50 values allowed.';
      return;
    }

    state.data = parsed;
    state.originalData = parsed.slice();
    generateSteps(state.data);
    state.currentStep = 0;
    renderStep();
  }

  // ── Steps ──────────────────────────────────────────────────────────────

  function generateSteps(data) {
    if (typeof state.stepGenerator === 'function') {
      state.steps = state.stepGenerator(data.slice()) || [];
    } else {
      state.steps = [];
    }
  }

  // ── Render Dispatch ────────────────────────────────────────────────────

  function renderStep() {
    if (!state.steps.length) {
      if (state.explanationEl) state.explanationEl.textContent = 'No steps to display.';
      updateStepCounter();
      return;
    }

    var step = state.steps[state.currentStep];
    if (!step) return;

    if (state.explanationEl) {
      state.explanationEl.textContent = step.explanation || '';
    }
    updateStepCounter();

    // Custom renderer override
    if (typeof step.render === 'function') {
      state.vizArea.textContent = '';
      step.render(state.vizArea);
      return;
    }

    var type = step.type || state.type;
    switch (type) {
      case 'bars':     renderBars(step); break;
      case 'graph':    renderGraph(step); break;
      case 'tree':     renderTree(step); break;
      case 'grid':     renderGrid(step); break;
      case 'scatter':  renderScatter(step); break;
      case 'network':  renderNetwork(step); break;
      case 'matrix':   renderMatrix(step); break;
      case 'timeline': renderTimeline(step); break;
      default:         renderBars(step); break;
    }
  }

  function updateStepCounter() {
    var counter = $('#vizStepCounter', state.container);
    if (counter) {
      var total = state.steps.length || 0;
      var cur = total ? state.currentStep + 1 : 0;
      counter.textContent = cur + ' / ' + total;
    }
  }

  // ── Renderer: Bars ─────────────────────────────────────────────────────

  function renderBars(step) {
    var area = state.vizArea;
    area.textContent = '';

    var arr = step.array || [];
    if (!arr.length) return;

    var highlights = step.highlights || {};
    var maxVal = Math.max.apply(null, arr.map(function (v) { return Math.abs(v); }));
    if (maxVal === 0) maxVal = 1;

    var wrapper = el('div', { className: 'bars-viz' });

    arr.forEach(function (val, i) {
      var pct = (Math.abs(val) / maxVal) * 85;
      var bar = el('div', { className: 'bar-col' });

      var barInner = el('div', {
        className: 'bar-inner' + (highlights[i] ? ' ' + highlights[i] : '')
      });
      barInner.style.height = pct + '%';

      var label = el('span', {
        className: 'bar-label',
        textContent: String(val)
      });

      bar.appendChild(barInner);
      bar.appendChild(label);
      wrapper.appendChild(bar);
    });

    area.appendChild(wrapper);
  }

  // ── Renderer: Graph ────────────────────────────────────────────────────

  function renderGraph(step) {
    var area = state.vizArea;
    area.textContent = '';

    var nodes = step.nodes || [];
    var edges = step.edges || [];
    var w = area.clientWidth || 600;
    var h = area.clientHeight || 400;

    var svg = svgEl('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h });

    // Draw edges
    edges.forEach(function (edge) {
      var fromNode = nodes[edge.from];
      var toNode = nodes[edge.to];
      if (!fromNode || !toNode) return;

      var line = svgEl('line', {
        x1: fromNode.x,
        y1: fromNode.y,
        x2: toNode.x,
        y2: toNode.y,
        'class': 'edge-line' + (edge.state ? ' ' + edge.state : '')
      });
      svg.appendChild(line);

      if (edge.weight !== undefined && edge.weight !== null) {
        var mx = (fromNode.x + toNode.x) / 2;
        var my = (fromNode.y + toNode.y) / 2;
        var wt = svgEl('text', {
          x: mx,
          y: my - 6,
          'class': 'edge-weight',
          'text-anchor': 'middle',
          textContent: String(edge.weight)
        });
        svg.appendChild(wt);
      }
    });

    // Draw nodes
    nodes.forEach(function (node) {
      var circle = svgEl('circle', {
        cx: node.x,
        cy: node.y,
        r: 20,
        'class': 'node-circle' + (node.state ? ' ' + node.state : '')
      });
      svg.appendChild(circle);

      var label = svgEl('text', {
        x: node.x,
        y: node.y + 5,
        'class': 'node-label',
        'text-anchor': 'middle',
        textContent: node.label !== undefined ? String(node.label) : String(node.id !== undefined ? node.id : '')
      });
      svg.appendChild(label);
    });

    area.appendChild(svg);
  }

  // ── Renderer: Tree ─────────────────────────────────────────────────────

  function renderTree(step) {
    var area = state.vizArea;
    area.textContent = '';

    var nodes = step.nodes || [];
    var edges = step.edges || [];
    var w = area.clientWidth || 600;

    var maxY = 0;
    nodes.forEach(function (n) {
      if (n.y > maxY) maxY = n.y;
    });
    var h = maxY + 60;

    var svg = svgEl('svg', { width: '100%', height: h, viewBox: '0 0 ' + w + ' ' + h });

    // Draw edges (reference nodes by id, not index)
    edges.forEach(function (edge) {
      var fromNode = findNodeById(nodes, edge.from);
      var toNode = findNodeById(nodes, edge.to);
      if (!fromNode || !toNode) return;

      var line = svgEl('line', {
        x1: fromNode.x,
        y1: fromNode.y,
        x2: toNode.x,
        y2: toNode.y,
        'class': 'edge-line' + (edge.state ? ' ' + edge.state : '')
      });
      svg.appendChild(line);
    });

    // Draw nodes
    nodes.forEach(function (node) {
      var circle = svgEl('circle', {
        cx: node.x,
        cy: node.y,
        r: 18,
        'class': 'node-circle' + (node.state ? ' ' + node.state : '')
      });
      svg.appendChild(circle);

      var label = svgEl('text', {
        x: node.x,
        y: node.y + 5,
        'class': 'node-label',
        'text-anchor': 'middle',
        textContent: node.label !== undefined ? String(node.label) : String(node.id !== undefined ? node.id : '')
      });
      svg.appendChild(label);
    });

    area.appendChild(svg);
  }

  function findNodeById(nodes, id) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) return nodes[i];
    }
    return null;
  }

  // ── Renderer: Grid ─────────────────────────────────────────────────────

  function renderGrid(step) {
    var area = state.vizArea;
    area.textContent = '';

    var grid = step.grid || [];
    if (!grid.length) return;

    var cols = grid[0].length || 1;
    var maxW = Math.min(cols * 50, 600);

    var wrapper = el('div', { className: 'grid-viz' });
    wrapper.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    wrapper.style.maxWidth = maxW + 'px';

    grid.forEach(function (row) {
      row.forEach(function (cell) {
        var cellEl = el('div', {
          className: 'grid-cell' + (cell.state ? ' ' + cell.state : ''),
          textContent: cell.value !== undefined && cell.value !== null ? String(cell.value) : ''
        });
        wrapper.appendChild(cellEl);
      });
    });

    area.appendChild(wrapper);
  }

  // ── Renderer: Scatter ──────────────────────────────────────────────────

  function renderScatter(step) {
    var area = state.vizArea;
    area.textContent = '';

    var points = step.points || [];
    var lines = step.lines || [];
    var opts = state.renderOptions || {};
    var w = area.clientWidth || 600;
    var h = area.clientHeight || 400;
    var pad = 40;

    // Determine axis ranges
    var minX = opts.minX, maxX = opts.maxX, minY = opts.minY, maxY = opts.maxY;

    if (minX === undefined || maxX === undefined || minY === undefined || maxY === undefined) {
      var xs = points.map(function (p) { return p.x; });
      var ys = points.map(function (p) { return p.y; });
      if (xs.length) {
        if (minX === undefined) minX = Math.min.apply(null, xs);
        if (maxX === undefined) maxX = Math.max.apply(null, xs);
        if (minY === undefined) minY = Math.min.apply(null, ys);
        if (maxY === undefined) maxY = Math.max.apply(null, ys);
      } else {
        minX = 0; maxX = 1; minY = 0; maxY = 1;
      }
    }

    var rangeX = maxX - minX || 1;
    var rangeY = maxY - minY || 1;

    function scaleX(v) { return pad + ((v - minX) / rangeX) * (w - 2 * pad); }
    function scaleY(v) { return (h - pad) - ((v - minY) / rangeY) * (h - 2 * pad); }

    var svg = svgEl('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h });

    // Axes
    svg.appendChild(svgEl('line', {
      x1: pad, y1: h - pad, x2: w - pad, y2: h - pad,
      'class': 'scatter-axis'
    }));
    svg.appendChild(svgEl('line', {
      x1: pad, y1: pad, x2: pad, y2: h - pad,
      'class': 'scatter-axis'
    }));

    // Lines overlay
    lines.forEach(function (ln) {
      var attrs = {
        x1: scaleX(ln.x1),
        y1: scaleY(ln.y1),
        x2: scaleX(ln.x2),
        y2: scaleY(ln.y2),
        'class': 'scatter-line' + (ln.state ? ' ' + ln.state : '')
      };
      if (ln.color) attrs.stroke = ln.color;
      if (ln.dash) attrs['stroke-dasharray'] = ln.dash;
      svg.appendChild(svgEl('line', attrs));
    });

    // Points
    points.forEach(function (p) {
      var attrs = {
        cx: scaleX(p.x),
        cy: scaleY(p.y),
        r: p.r || 5,
        'class': 'scatter-point' + (p.state ? ' ' + p.state : '')
      };
      if (p.color) attrs.fill = p.color;
      svg.appendChild(svgEl('circle', attrs));
    });

    area.appendChild(svg);
  }

  // ── Renderer: Network ──────────────────────────────────────────────────

  function renderNetwork(step) {
    var area = state.vizArea;
    area.textContent = '';

    var layers = step.layers || [];
    if (!layers.length) return;

    var w = area.clientWidth || 600;
    var h = area.clientHeight || 400;
    var layerCount = layers.length;
    var layerSpacing = w / (layerCount + 1);

    var svg = svgEl('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h });

    // Calculate node positions
    var layerPositions = [];
    layers.forEach(function (layer, li) {
      var nodeCount = layer.nodes.length;
      var nodeSpacing = h / (nodeCount + 1);
      var positions = [];
      layer.nodes.forEach(function (node, ni) {
        positions.push({
          x: layerSpacing * (li + 1),
          y: nodeSpacing * (ni + 1),
          node: node
        });
      });
      layerPositions.push(positions);
    });

    // Draw connections between adjacent layers
    for (var li = 0; li < layerPositions.length - 1; li++) {
      var fromLayer = layerPositions[li];
      var toLayer = layerPositions[li + 1];
      var weights = layers[li].weights || null;

      fromLayer.forEach(function (fp, fi) {
        toLayer.forEach(function (tp, ti) {
          var opacity = 0.3;
          if (weights && weights[fi] && weights[fi][ti] !== undefined) {
            opacity = clamp(Math.abs(weights[fi][ti]), 0.05, 1);
          }
          var line = svgEl('line', {
            x1: fp.x,
            y1: fp.y,
            x2: tp.x,
            y2: tp.y,
            'class': 'network-connection',
            'stroke-opacity': opacity
          });
          svg.appendChild(line);
        });
      });
    }

    // Draw nodes
    layerPositions.forEach(function (positions) {
      positions.forEach(function (pos) {
        var circle = svgEl('circle', {
          cx: pos.x,
          cy: pos.y,
          r: 16,
          'class': 'network-node' + (pos.node.state ? ' ' + pos.node.state : '')
        });
        svg.appendChild(circle);

        if (pos.node.label !== undefined) {
          var label = svgEl('text', {
            x: pos.x,
            y: pos.y + 4,
            'class': 'network-label',
            'text-anchor': 'middle',
            textContent: String(pos.node.label)
          });
          svg.appendChild(label);
        }
      });
    });

    area.appendChild(svg);
  }

  // ── Renderer: Matrix ───────────────────────────────────────────────────

  function renderMatrix(step) {
    renderGrid(step);
  }

  // ── Renderer: Timeline ─────────────────────────────────────────────────

  function renderTimeline(step) {
    var area = state.vizArea;
    area.textContent = '';

    var intervals = step.intervals || [];
    if (!intervals.length) return;

    // Determine total range
    var globalStart = Infinity, globalEnd = -Infinity;
    intervals.forEach(function (iv) {
      if (iv.start < globalStart) globalStart = iv.start;
      if (iv.end > globalEnd) globalEnd = iv.end;
    });
    var range = globalEnd - globalStart || 1;

    var wrapper = el('div', { className: 'timeline-viz' });

    intervals.forEach(function (iv) {
      var row = el('div', { className: 'timeline-row' });

      var leftPct = ((iv.start - globalStart) / range) * 100;
      var widthPct = ((iv.end - iv.start) / range) * 100;

      var bar = el('div', {
        className: 'timeline-bar' + (iv.state ? ' ' + iv.state : '')
      });
      bar.style.left = leftPct + '%';
      bar.style.width = Math.max(widthPct, 1) + '%';
      if (iv.color) bar.style.backgroundColor = iv.color;

      var label = el('span', {
        className: 'timeline-label',
        textContent: (iv.label || '') + ' [' + iv.start + '-' + iv.end + ']'
      });
      bar.appendChild(label);

      row.appendChild(bar);
      wrapper.appendChild(row);
    });

    area.appendChild(wrapper);
  }

  // ── Playback ───────────────────────────────────────────────────────────

  function play() {
    if (!state.steps.length) return;
    state.playing = true;
    var btn = $('#vizPlayBtn', state.container);
    if (btn) setIconHTML(btn, ICON_PAUSE);
    tick();
  }

  function stop() {
    state.playing = false;
    var btn = $('#vizPlayBtn', state.container);
    if (btn) setIconHTML(btn, ICON_PLAY);
    if (state.timerId) {
      clearTimeout(state.timerId);
      state.timerId = null;
    }
  }

  function pause() {
    stop();
  }

  function tick() {
    if (!state.playing) return;

    if (state.currentStep < state.steps.length - 1) {
      state.currentStep++;
      renderStep();
      state.timerId = setTimeout(tick, state.speed);
    } else {
      stop();
    }
  }

  function stepForward() {
    stop();
    if (state.currentStep < state.steps.length - 1) {
      state.currentStep++;
      renderStep();
    }
  }

  function stepBack() {
    stop();
    if (state.currentStep > 0) {
      state.currentStep--;
      renderStep();
    }
  }

  function reset() {
    stop();
    state.data = state.originalData.slice();
    generateSteps(state.data);
    state.currentStep = 0;

    // Refresh data input field
    var field = $('#vizDataField', state.container);
    if (field) field.value = state.data.join(', ');

    renderStep();
  }

  // ── Public API ─────────────────────────────────────────────────────────

  function init(config) {
    if (!config) throw new Error('Visualizer.init: config is required');

    var containerEl = typeof config.container === 'string'
      ? document.querySelector(config.container)
      : config.container;

    if (!containerEl) throw new Error('Visualizer.init: container not found — ' + config.container);

    state.container = containerEl;
    state.data = Array.isArray(config.data) ? config.data.slice() : [];
    state.originalData = state.data.slice();
    state.stepGenerator = config.stepGenerator || null;
    state.type = config.type || 'bars';
    state.renderOptions = config.renderOptions || {};
    state.speed = 500;
    state.playing = false;
    state.currentStep = 0;
    state.steps = [];
    state.timerId = null;

    buildUI();
    generateSteps(state.data);
    if (state.steps.length) {
      renderStep();
    }
  }

  function setSpeed(ms) {
    state.speed = clamp(parseInt(ms, 10) || 500, 50, 2000);
    var slider = $('#vizSpeedSlider', state.container);
    if (slider) slider.value = String(state.speed);
    var label = $('#vizSpeedLabel', state.container);
    if (label) label.textContent = state.speed + 'ms';
  }

  function setData(newData) {
    if (!Array.isArray(newData)) return;
    stop();
    state.data = newData.slice();
    state.originalData = newData.slice();

    var field = $('#vizDataField', state.container);
    if (field) field.value = state.data.join(', ');

    generateSteps(state.data);
    state.currentStep = 0;
    renderStep();
  }

  return {
    init: init,
    play: play,
    pause: pause,
    stepForward: stepForward,
    stepBack: stepBack,
    reset: reset,
    setSpeed: setSpeed,
    setData: setData
  };

})();
