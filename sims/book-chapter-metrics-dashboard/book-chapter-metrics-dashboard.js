// CANVAS_HEIGHT: 600
// Book and Chapter Metrics Dashboard - Chart.js bar chart with a Book/Chapter view toggle.
// Two pre-loaded single-series datasets are swapped by the toggle control. The Chapter
// view highlights this chapter (18) in gold and draws a dashed "Book Average" reference
// line so learners can compare each chapter against the aggregate (Bloom L4: Analyze).

(function () {
  'use strict';

  // ----- Color palette -----
  const INDIGO = 'rgba(63, 81, 181, 0.85)';   // standard bars
  const INDIGO_BORDER = 'rgba(63, 81, 181, 1)';
  const GOLD = 'rgba(255, 193, 7, 0.90)';      // highlighted chapter (18)
  const GOLD_BORDER = 'rgba(214, 158, 0, 1)';
  const AVG_LINE = 'rgba(108, 117, 125, 0.95)'; // gray dashed average reference

  // ----- Book view data (from this project's book-metrics.json snapshot) -----
  // Values are scaled per metric so a single Y axis can show them together.
  const bookData = {
    labels: ['MicroSims', 'Glossary Terms', 'Equations', 'Words (thousands)', 'Links (tens)'],
    values: [8, 47, 1, 32.7, 27.5],
    // Raw (unscaled) values shown in the tooltip so learners see true magnitudes.
    raw: ['8 MicroSims', '47 glossary terms', '1 equation', '32,700 words', '275 links']
  };

  // ----- Chapter view data: representative per-chapter word counts (chapters 1-19) -----
  const HIGHLIGHT_CHAPTER = 18; // "this" chapter, highlighted in gold
  const chapterTitles = {
    1: 'What is a Learning Graph?',
    2: 'Concepts and Dependencies',
    3: 'Course Descriptions',
    4: 'Bloom’s Taxonomy',
    5: 'Generating a Concept List',
    6: 'Concept Enumeration Quality',
    7: 'Concept Dependencies',
    8: 'Building the Dependency Graph',
    9: 'Graph Data Structures',
    10: 'Taxonomies and Classification',
    11: 'Visualizing Learning Graphs',
    12: 'Graph Layout Algorithms',
    13: 'Interactive Graph Viewers',
    14: 'Quality Metrics and Validation',
    15: 'Graph Clustering and Editing Tools',
    16: 'Personalization and Adaptive Learning Paths',
    17: 'Intelligent Agents and Generative AI',
    18: 'Intelligent Textbooks, MicroSims, and Deployment',
    19: 'Using a Skill to Generate a Learning Graph'
  };
  const chapterWords = [
    2100, 2450, 1800, 2600, 3100, 2200, 2900, 3400, 2700, 2500,
    3200, 2800, 2400, 3600, 3000, 2650, 3300, 4100, 2350
  ];
  const chapterLabels = chapterWords.map(function (_, i) { return String(i + 1); });
  const bookAverage = Math.round(
    chapterWords.reduce(function (a, b) { return a + b; }, 0) / chapterWords.length
  );

  // Per-bar colors: gold for the highlighted chapter, indigo otherwise.
  function chapterBarColors(border) {
    return chapterWords.map(function (_, i) {
      const isHighlight = (i + 1) === HIGHLIGHT_CHAPTER;
      if (border) { return isHighlight ? GOLD_BORDER : INDIGO_BORDER; }
      return isHighlight ? GOLD : INDIGO;
    });
  }

  // Track the active view so the average-line plugin knows when to draw. A
  // module-level flag is reliable; arbitrary properties stashed on Chart's
  // config object are not preserved by Chart.js internals.
  let currentMode = 'book';

  // ----- Custom plugin: dashed "Book Average" horizontal reference line (Chapter view only) -----
  // Uses afterDatasetsDraw so it paints before tooltips (tooltips stay on top).
  const averageLinePlugin = {
    id: 'bookAverageLine',
    afterDatasetsDraw: function (chart) {
      if (currentMode !== 'chapter') { return; }
      const yScale = chart.scales.y;
      const xAxis = chart.scales.x;
      if (!yScale || !xAxis) { return; }
      const y = yScale.getPixelForValue(bookAverage);
      const ctx = chart.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([8, 6]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = AVG_LINE;
      ctx.moveTo(xAxis.left, y);
      ctx.lineTo(xAxis.right, y);
      ctx.stroke();
      // Label chip
      const text = 'Book Average: ' + bookAverage.toLocaleString() + ' words';
      ctx.setLineDash([]);
      ctx.font = 'bold 12px Helvetica, Arial, sans-serif';
      const padX = 6, padY = 3;
      const textW = ctx.measureText(text).width;
      const boxW = textW + padX * 2;
      const boxH = 20;
      const boxX = xAxis.right - boxW - 4;
      const boxY = y - boxH - 4;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.strokeStyle = AVG_LINE;
      ctx.lineWidth = 1;
      ctx.fillRect(boxX, boxY, boxW, boxH);
      ctx.strokeRect(boxX, boxY, boxW, boxH);
      ctx.fillStyle = '#495057';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, boxX + padX, boxY + boxH / 2 + padY - 2);
      ctx.restore();
    }
  };

  let chart = null;
  const infobox = document.getElementById('infobox');

  function showInfobox(html) {
    if (!infobox) { return; }
    infobox.innerHTML = html;
    infobox.style.display = 'block';
  }
  function hideInfobox() {
    if (!infobox) { return; }
    infobox.style.display = 'none';
  }

  // ----- Build config for a given view mode -----
  function buildConfig(mode) {
    const isChapter = mode === 'chapter';

    const data = {
      labels: isChapter ? chapterLabels : bookData.labels,
      datasets: [{
        label: isChapter ? 'Words per Chapter' : 'Book Metric Value (scaled)',
        data: isChapter ? chapterWords : bookData.values,
        backgroundColor: isChapter ? chapterBarColors(false) : INDIGO,
        borderColor: isChapter ? chapterBarColors(true) : INDIGO_BORDER,
        borderWidth: 1.5,
        borderRadius: 4,
        maxBarThickness: 90
      }]
    };

    const config = {
      type: 'bar',
      data: data,
      plugins: [averageLinePlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        layout: { padding: { top: 8, right: 12, bottom: 4, left: 4 } },
        onClick: function (event, elements) {
          if (!isChapter) { return; }
          if (elements.length === 0) { hideInfobox(); return; }
          const idx = elements[0].index;
          const chNum = idx + 1;
          const title = chapterTitles[chNum] || 'Untitled';
          const words = chapterWords[idx];
          const diff = words - bookAverage;
          const rel = diff >= 0
            ? ('<span class="above">+' + diff.toLocaleString() + ' above average</span>')
            : ('<span class="below">' + diff.toLocaleString() + ' below average</span>');
          showInfobox(
            '<strong>Chapter ' + chNum + ':</strong> ' + title +
            '<br><span class="ib-metric">' + words.toLocaleString() + ' words &middot; ' + rel + '</span>'
          );
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: isChapter ? 'Word Count' : 'Count (scaled: Words ÷ 1000, Links ÷ 10)',
              font: { size: 13, weight: 'bold' }
            },
            ticks: {
              callback: function (value) { return Number(value).toLocaleString(); }
            }
          },
          x: {
            title: {
              display: true,
              text: isChapter ? 'Chapter Number' : 'Metric',
              font: { size: 13, weight: 'bold' }
            },
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 0
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { font: { size: 13 }, usePointStyle: true }
          },
          tooltip: {
            callbacks: {
              title: function (items) {
                if (!items.length) { return ''; }
                const idx = items[0].dataIndex;
                if (isChapter) {
                  return 'Chapter ' + (idx + 1) + ': ' + (chapterTitles[idx + 1] || '');
                }
                return bookData.labels[idx];
              },
              label: function (context) {
                const idx = context.dataIndex;
                if (isChapter) {
                  const words = chapterWords[idx];
                  const diff = words - bookAverage;
                  const sign = diff >= 0 ? '+' : '';
                  return [
                    words.toLocaleString() + ' words',
                    'Book average: ' + bookAverage.toLocaleString() +
                    ' (' + sign + diff.toLocaleString() + ')'
                  ];
                }
                return bookData.raw[idx];
              }
            }
          }
        }
      }
    };
    return config;
  }

  // ----- Render / switch views -----
  function render(mode) {
    currentMode = mode;
    if (chart) { chart.destroy(); }
    hideInfobox();
    const ctx = document.getElementById('metricsChart').getContext('2d');
    chart = new Chart(ctx, buildConfig(mode));

    // Update the helper hint under the toggle.
    const hint = document.getElementById('view-hint');
    if (hint) {
      hint.textContent = mode === 'chapter'
        ? 'Chapter view: chapter 18 is highlighted in gold. The dashed line marks the book average — click any bar for its title.'
        : 'Book view: aggregate totals across the whole book. Values are scaled so they share one axis — hover a bar for the true count.';
    }
  }

  // ----- Wire up the toggle buttons -----
  const toggleButtons = document.querySelectorAll('.view-button');
  toggleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      toggleButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      render(btn.dataset.view);
    });
  });

  // Initial render: Book view.
  render('book');
})();
