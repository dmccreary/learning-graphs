// Goal Horizon Timeline MicroSim
// Chapter 3: Concept Dependencies and Prerequisites
// Bloom: Understand (L2) - classify, distinguish
// CANVAS_HEIGHT: 600
//
// Learners drag a "You are here" marker along a 7-concept prerequisite chain.
// The timeline recolors and badges each remaining concept as an immediate,
// intermediate, or ultimate goal relative to the marker's position.

(function () {
  'use strict';

  // ---- Concept chain (left to right) ----------------------------------------
  // Each concept sits on its own evenly-spaced "day" so the axis reads as a
  // simple ordered sequence rather than real calendar dates.
  var CONCEPTS = [
    { name: 'Number Sense',    note: 'Counting, comparing, and place value — the earliest numeric foundation.' },
    { name: 'Arithmetic',      note: 'Addition, subtraction, multiplication, and division of numbers.' },
    { name: 'Algebra',         note: 'Working with variables, expressions, and equations. This is your current frontier.' },
    { name: 'Functions',       note: 'Mapping inputs to outputs and understanding function notation.' },
    { name: 'Derivatives',     note: 'Rates of change and the slope of a curve at a point.' },
    { name: 'Integrals',       note: 'Accumulated area under a curve; the inverse of differentiation.' },
    { name: 'Applied Calculus', note: 'Using calculus to model real-world problems — the capstone of this course.' }
  ];

  var ULTIMATE_INDEX = CONCEPTS.length - 1; // "Applied Calculus" is always the ultimate goal.
  var DEFAULT_MARKER_STEP = 2.5;            // Marker sits just after "Algebra" (index 2).

  // Map a concept index (0..n-1) to its date on the axis.
  function indexToDate(i) {
    return new Date(2020, 0, i + 1); // Jan 1..Jan 7, 2020
  }
  // Map a fractional "step" position (e.g. 2.5) to a date for the marker.
  function stepToDate(step) {
    var base = new Date(2020, 0, 1).getTime();
    var dayMs = 24 * 60 * 60 * 1000;
    return new Date(base + step * dayMs);
  }
  // Convert a marker date back to a fractional step position.
  function dateToStep(date) {
    var base = new Date(2020, 0, 1).getTime();
    var dayMs = 24 * 60 * 60 * 1000;
    return (date.getTime() - base) / dayMs;
  }

  // ---- Classification --------------------------------------------------------
  // Given the marker's fractional step, return the state for concept index i.
  // States: 'mastered' | 'immediate' | 'intermediate' | 'ultimate'
  function classify(i, markerStep) {
    // The rightmost concept is ALWAYS the ultimate goal, regardless of marker.
    if (i === ULTIMATE_INDEX) return 'ultimate';

    // The marker sits between concepts. Everything at or left of floor(step)
    // is mastered; the very next concept is the immediate goal; the rest to the
    // right are intermediate goals.
    var lastMastered = Math.floor(markerStep); // highest index already mastered
    if (i <= lastMastered) return 'mastered';
    if (i === lastMastered + 1) return 'immediate';
    return 'intermediate';
  }

  var BADGE_LABEL = {
    mastered: 'Mastered',
    immediate: 'Immediate Goal',
    intermediate: 'Intermediate Goal',
    ultimate: 'Ultimate Goal'
  };
  var BADGE_CLASS = {
    mastered: 'badge-mastered',
    immediate: 'badge-immediate',
    intermediate: 'badge-intermediate',
    ultimate: 'badge-ultimate'
  };

  var INFO_TEXT = {
    mastered: 'You have already mastered this concept — it is behind your current position.',
    immediate: 'This is your IMMEDIATE goal: the very next concept to learn from where you stand.',
    intermediate: 'This is an INTERMEDIATE goal: a stepping-stone you will reach after your immediate goal, on the way to the capstone.',
    ultimate: 'This is the ULTIMATE goal: the capstone concept of the whole course. It stays the ultimate goal no matter where your marker is.'
  };

  // ---- Timeline state --------------------------------------------------------
  var timeline;
  var dataset;
  var MARKER_ID = 'you-are-here';
  var currentStep = DEFAULT_MARKER_STEP;

  // Build the HTML content for one concept item, given its state.
  function itemContent(name, state) {
    return '<div class="concept-box">' +
      '<span class="badge-pill ' + BADGE_CLASS[state] + '">' + BADGE_LABEL[state] + '</span>' +
      '<span class="concept-name">' + name + '</span>' +
      '</div>';
  }

  // Build the full item objects for the current marker step.
  function buildItems(markerStep) {
    return CONCEPTS.map(function (c, i) {
      var state = classify(i, markerStep);
      return {
        id: i,
        content: itemContent(c.name, state),
        start: indexToDate(i),
        type: 'box',
        className: 'state-' + state,
        title: c.name + ' — ' + BADGE_LABEL[state]
      };
    });
  }

  // Re-color every item to reflect the current marker position.
  function refreshItems(markerStep) {
    currentStep = markerStep;
    dataset.update(buildItems(markerStep));
  }

  // Update the infobox for a specific concept index at the current marker.
  function showConcept(i) {
    var state = classify(i, currentStep);
    document.getElementById('ib-title').textContent = CONCEPTS[i].name;
    var classEl = document.getElementById('ib-class');
    classEl.textContent = BADGE_LABEL[state];
    // color the classification label to match the badge family
    var colors = {
      mastered: '#6b7280', immediate: '#b8860b',
      intermediate: '#2563eb', ultimate: '#7c3aed'
    };
    classEl.style.color = colors[state];
    document.getElementById('ib-text').textContent =
      CONCEPTS[i].note + ' ' + INFO_TEXT[state];
  }

  // Update the infobox to summarize the marker's current horizon.
  function showHorizonSummary() {
    // Find immediate goal index (first concept to the right).
    var immediateIdx = -1;
    for (var i = 0; i < CONCEPTS.length; i++) {
      if (classify(i, currentStep) === 'immediate') { immediateIdx = i; break; }
    }
    document.getElementById('ib-title').textContent = 'Your learning horizon';
    var classEl = document.getElementById('ib-class');
    if (immediateIdx >= 0) {
      classEl.textContent = 'Next up: ' + CONCEPTS[immediateIdx].name;
      classEl.style.color = '#b8860b';
      document.getElementById('ib-text').textContent =
        'From here, your immediate goal is "' + CONCEPTS[immediateIdx].name +
        '". The blue concepts are intermediate goals along the way, and "' +
        CONCEPTS[ULTIMATE_INDEX].name + '" is your ultimate goal. Click any concept box for details.';
    } else {
      // Marker is at or past the last learnable concept.
      classEl.textContent = 'Course complete';
      classEl.style.color = '#7c3aed';
      document.getElementById('ib-text').textContent =
        'Your marker is at the end of the chain. "' + CONCEPTS[ULTIMATE_INDEX].name +
        '" remains your ultimate goal. Drag the marker back to explore the earlier horizon.';
    }
  }

  // ---- Marker controls (exposed to buttons) ---------------------------------
  function setMarker(step) {
    // Clamp between just-before-first and just-after-last, snap to .5 boundaries
    // so the marker always sits cleanly between two concepts.
    step = Math.max(-0.5, Math.min(CONCEPTS.length - 0.5, step));
    step = Math.round(step * 2) / 2; // snap to nearest 0.5
    timeline.setCustomTime(stepToDate(step), MARKER_ID);
    refreshItems(step);
    showHorizonSummary();
  }
  window.stepMarker = function (dir) {
    setMarker(currentStep + dir); // move by one whole concept
  };
  window.resetMarker = function () {
    setMarker(DEFAULT_MARKER_STEP);
  };

  // ---- Init -----------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('timeline');

    dataset = new vis.DataSet(buildItems(DEFAULT_MARKER_STEP));

    var options = {
      width: '100%',
      height: '210px',
      orientation: 'top',
      margin: { item: { horizontal: 40, vertical: 12 }, axis: 24 },
      showMajorLabels: false,   // hide calendar labels; the sequence is what matters
      showMinorLabels: false,
      showCurrentTime: false,
      selectable: true,
      moveable: false,          // do not let the axis pan (avoids scroll hijack)
      zoomable: false,
      stack: false,
      min: stepToDate(-1.5),
      max: stepToDate(CONCEPTS.length + 0.5),
      align: 'center'
    };

    timeline = new vis.Timeline(container, dataset, options);

    // Fix the visible window so all 7 concepts are always shown with padding.
    timeline.setWindow(stepToDate(-1), stepToDate(CONCEPTS.length), { animation: false });

    // Draggable "You are here" marker.
    timeline.addCustomTime(stepToDate(DEFAULT_MARKER_STEP), MARKER_ID);
    timeline.setCustomTimeMarker('You are here', MARKER_ID, true);
    // Tag the custom-time bar element so our CSS ".here" styling applies.
    tagMarkerElement();

    // Live recolor while dragging the marker.
    timeline.on('timechange', function (props) {
      if (props.id !== MARKER_ID) return;
      var step = dateToStep(props.time);
      step = Math.max(-0.5, Math.min(CONCEPTS.length - 0.5, step));
      refreshItems(step);
      showHorizonSummary();
    });
    // On release, snap the marker to the nearest half-step boundary.
    timeline.on('timechanged', function (props) {
      if (props.id !== MARKER_ID) return;
      setMarker(dateToStep(props.time));
    });

    // Clicking a concept box explains its classification.
    timeline.on('select', function (props) {
      if (props.items && props.items.length > 0) {
        showConcept(props.items[0]);
      }
    });

    // Prevent the timeline from hijacking vertical page scroll inside the iframe.
    container.addEventListener('wheel', function (e) {
      var isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) {
        e.stopImmediatePropagation(); // block vis-timeline, let the page scroll
      }
    }, true);

    // Re-tag and re-fit on resize so the marker keeps its styling and the
    // window stays pinned to the full chain.
    window.addEventListener('resize', function () {
      timeline.setWindow(stepToDate(-1), stepToDate(CONCEPTS.length), { animation: false });
      tagMarkerElement();
    });

    // Initial infobox.
    showHorizonSummary();
  });

  // The custom-time bar element has class "vis-custom-time <id>". Add our
  // "here" class so the red marker styling applies (vis uses the id as a class).
  function tagMarkerElement() {
    // There is exactly one custom-time bar in this sim. Query the base class so
    // the red styling applies whether or not vis appends the id as a CSS class.
    var bars = document.querySelectorAll('.vis-custom-time');
    Array.prototype.forEach.call(bars, function (el) { el.classList.add('here'); });
  }
})();
