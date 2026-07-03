# Content Generation Guide

**This file MUST be read before generating any user-facing content** — chapters, lesson
plans, quizzes, FAQ entries, glossary definitions, MicroSim copy, or any other text a
student will read — for the **Learning Graphs: The Key to Intelligent Textbooks** project.
It is the single consolidated source of truth for content rules; do not rely on rules
scattered across individual skill files when generating content for this project.

Instructor-facing content (teacher's guide / instructor's guide) is exempt from the
mascot rules below but should still follow the reading level and audience guidance.

## Contents

1. [Target Audience & Voice](#target-audience--voice)
2. [Reading Level](#reading-level)
3. [Learning Mascot: Axiom the Owl](#learning-mascot-axiom-the-owl)

## Target Audience & Voice

Source of truth: [`docs/course-description.md`](docs/course-description.md).

- **Audience:** Professionals — instructional designers, curriculum developers, educational
  technologists, edtech product managers, and software engineers. Treat readers as working
  professionals, not beginning students. No prior textbook/curriculum-building experience is
  assumed, but the material should move at a professional pace, not a remedial one.
- **Tone:** Direct and respectful of the reader's time. Avoid over-explaining concepts a
  working professional already has context for (e.g., what a directed graph is); do explain
  domain-specific terms unique to learning graphs and intelligent textbooks.
- **Bloom's Taxonomy alignment:** Chapter content should let a reader eventually demonstrate
  every outcome listed in `docs/course-description.md`'s Learning Outcomes section (Remember
  through Create) — don't stop at definitions when the course description promises Apply/
  Analyze/Evaluate/Create-level outcomes.

## Reading Level

No `docs/learning-graph/chapter-reading-levels.md` report exists yet for this project (no
chapters have been generated). Once chapters exist, run the `book-installer` reading-level
guide to generate one:

```bash
python analyze-reading-levels.py . --output docs/learning-graph/chapter-reading-levels.md
```

**Target:** Flesch-Kincaid Grade 12–14 (college-graduate / professional level), consistent
with the professional target audience above. This is higher than a typical K-12 textbook
because the audience already has professional reading fluency — simplifying prose to a
lower grade level would read as condescending, not accessible.

**Consistency thresholds** (per the reading-level-analysis guide):

| Metric | Healthy Range | Concern Threshold |
|--------|---------------|--------------------|
| Standard deviation across chapters | < 1.0 grade levels | > 1.5 grade levels |
| Range (max − min) | < 2.0 grade levels | > 3.0 grade levels |
| Any single chapter vs. the Grade 12–14 target | Within 2 grades | > 3 grades above/below target |

Re-run the analysis whenever new chapters are added or existing chapters are substantially
rewritten, and fix outliers before publishing.

## Learning Mascot: Axiom the Owl

### Mascot File Index

The canonical files for this mascot. When editing any of these, update the
others in the same turn so they stay in sync.

| File | Purpose |
|------|---------|
| [`docs/img/mascot/character-sheet.md`](docs/img/mascot/character-sheet.md) | Canonical identity document (name, species, colors, voice). Source of truth. |
| [`docs/img/mascot/image-prompts.md`](docs/img/mascot/image-prompts.md) | Self-contained AI prompts for regenerating each pose. |
| [`docs/img/mascot/neutral.png`](docs/img/mascot/neutral.png) | Default / general-purpose pose. |
| [`docs/img/mascot/welcome.png`](docs/img/mascot/welcome.png) | Chapter-opening pose. |
| [`docs/img/mascot/explain.png`](docs/img/mascot/explain.png) | Concept-clarification pose (extra pose beyond the base 7). |
| [`docs/img/mascot/thinking.png`](docs/img/mascot/thinking.png) | Key-concept / reflective pose. |
| [`docs/img/mascot/tip.png`](docs/img/mascot/tip.png) | Hint / helpful-guidance pose. |
| [`docs/img/mascot/warning.png`](docs/img/mascot/warning.png) | Common-mistake / pitfall pose. |
| [`docs/img/mascot/encouraging.png`](docs/img/mascot/encouraging.png) | Difficult-content / struggle pose. |
| [`docs/img/mascot/celebration.png`](docs/img/mascot/celebration.png) | End-of-chapter / achievement pose. |
| [`docs/css/mascot.css`](docs/css/mascot.css) | Custom admonition styles for the eight pose contexts. |
| [`docs/learning-graph/mascot-test.md`](docs/learning-graph/mascot-test.md) | Rendering test page that exercises every admonition style. |

Axiom is shared with the broader Intelligent Textbooks ecosystem
([dmccreary/intelligent-textbooks](https://github.com/dmccreary/intelligent-textbooks/tree/main/docs/img/mascot));
this project reuses the existing character rather than defining a new one.

### Character Overview

- **Name**: Axiom
- **Species**: Owl
- **Personality**: Cheerful, wise, patient, supportive — "The Wise Mentor + Encouraging Coach"
- **Catchphrase**: "Let's connect the concepts!"
- **Visual**: Compact blue-feathered owl with cream face/chest, golden-yellow eyes, amber-orange beak and talons, gold collar with a red tie

### Voice Characteristics

- Uses simple, encouraging language and normalizes struggle ("Most learners stumble on this step.")
- Connects concepts across chapters — reflects the learning graph's own interconnected structure
- Prompts reflection rather than handing over answers ("What pattern do you notice?")
- Signature phrases: "Let's connect the concepts!", "Pause and appreciate your progress.", "What pattern do you notice?"

### Mascot Admonition Format

Always place mascot images in the admonition body, never in the title bar:

    !!! mascot-welcome "Title Here"
        ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
        Admonition text goes here after the image.

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Concept clarification | mascot-explain | As needed (extra pose) |
| Key concept | mascot-thinking | 2-3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Difficult content | mascot-encourage | Where students may struggle |
| Section completion | mascot-celebration | End of major sections |

### Do's and Don'ts

**Do:**

- Use Axiom to introduce new topics warmly
- Include the catchphrase in welcome admonitions
- Keep dialogue brief (1-3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Axiom more than 5-6 times per chapter
- Put mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Axiom's personality or speech patterns
