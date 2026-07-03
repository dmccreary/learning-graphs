# Character Sheet: Axiom the Owl

The canonical identity document for Axiom, the pedagogical mascot for the
**Learning Graphs: The Key to Intelligent Textbooks** textbook. Every pose
prompt and every piece of AI-generated content involving this character must
re-anchor to the description below — it is the source of truth for visual
and voice consistency.

Axiom is shared across the broader Intelligent Textbooks ecosystem (see
[dmccreary/intelligent-textbooks](https://github.com/dmccreary/intelligent-textbooks/tree/main/docs/img/mascot)),
so this project reuses the existing character design rather than defining a
new one. The images in this directory were copied from that source and
renamed to match this project's pose-filename convention (the `axiom-`
prefix was dropped).

## Identity

- **Name:** Axiom
- **Species:** Owl
- **Subject:** Learning graphs, concept dependency graphs, and intelligent-textbook generation
- **Role:** Narrative guide and pedagogical support asset — "The Wise Mentor + Encouraging Coach"
- **Catchphrase:** "Let's connect the concepts!"

## Visual Description

- **Body color:** Deep academic blue feathers — hex `#1976d2` (dark accent `#0d47a1`)
- **Face/chest:** Soft warm cream/ivory
- **Eyes:** Large, golden-yellow, framed by dark brow markings resembling scholarly glasses
- **Beak & talons:** Warm amber-orange
- **Accessories:** Small gold collar (hex `#f9a825`) with a bright red tie (hex `#e53935`)
- **Expression:** Alert and perceptive without feeling stern; slight upward beak curve when neutral
- **Size proportion:** Compact, rounded body; one wing often slightly raised as if mid-explanation
- **Art style:** Clean vector-style illustration, soft shading, flat colors, transparent background, professional educational tone

## Personality

- Cheerful, optimistic, and positive — frames challenges as opportunities for growth
- Wise — connects concepts across chapters and sees the learning graph as a whole
- Patient and supportive — normalizes confusion ("It's natural to hesitate here")
- Celebratory — genuinely marks student progress and mastery

## Voice

- Encouraging without being saccharine: "You're closer than you think."
- Normalizes struggle: "Most learners stumble on this step. Let's unpack it together."
- Prompts reflection rather than handing over answers: "Before moving on, try explaining this concept in your own words."
- Signature phrases: "Let's connect the concepts!", "Pause and appreciate your progress.", "What pattern do you notice?"
- Never sarcastic, dismissive, anxious, or overly comedic; never says "You should already know this."

## Pose Set

This project uses the standard seven-pose set plus one extra pose (`explain`)
carried over from the source Axiom design, since the source project
distinguishes "explaining a concept" from "reflective thinking."

| Pose | Filename | Use |
|------|----------|-----|
| Neutral | `neutral.png` | General-purpose / sidebars, standard instructional guidance |
| Welcome | `welcome.png` | Chapter openings, start of book/module |
| Explain | `explain.png` | Concept clarification, walkthrough steps (extra pose, not in the base 7) |
| Thinking | `thinking.png` | Key concepts, analytical/reflective sections |
| Tip | `tip.png` | Hints, best practices, MicroSim exploration guidance |
| Warning | `warning.png` | Common mistakes / pitfalls (gentle, never alarming) |
| Encouraging | `encouraging.png` | Difficult content / struggle |
| Celebration | `celebration.png` | End of chapter / achievements, mastery |

See [`image-prompts.md`](image-prompts.md) for the full text of each pose
prompt (adapted from the source Axiom prompt library) — use these only if a
pose ever needs to be regenerated. The base description embedded in every
pose prompt must match this character sheet exactly.

## Placement Rules

- 3–6 appearances per chapter (never every paragraph)
- Welcome pose only at chapter/section starts, never mid-chapter
- Celebration pose only after a mastery checkpoint, never before
- Tip pose used sparingly — overuse reads as preachy

## Why This Mascot

Axiom the Owl was originally designed for the broader Intelligent Textbooks
ecosystem as a "Wise Mentor + Encouraging Coach" archetype — an owl
symbolizes wisdom and pattern-connection, which maps directly onto this
book's subject matter (concept dependency graphs and how ideas interconnect
across a learning graph). Reusing the existing character instead of
designing a new one keeps mascot branding consistent across the
`dmccreary/intelligent-textbooks` family of books.
