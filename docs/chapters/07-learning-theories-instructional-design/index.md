---
title: Learning Theories and Instructional Design
description: Surveys constructivism, cognitivism, behaviorism, connectivism, and andragogy, and shows how they inform instructional design practices — scaffolding, curriculum design, and mastery learning — plus rhizomatic and non-linear learning paths as an alternative to strictly linear sequencing.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 10:02:37
version: 0.09
---

# Learning Theories and Instructional Design

## Summary

Surveys the major learning theories — constructivism, cognitivism, behaviorism, connectivism, and andragogy — and how they inform instructional design practices like scaffolding, curriculum design, and mastery learning. Also introduces rhizomatic and non-linear learning paths as an alternative to strictly linear sequencing.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Constructivism
2. Zone of Proximal Development
3. Rhizombic Learning
4. Self-Directed Exploration
5. Emergent Knowledge Structure
6. Cognitivism
7. Behaviorism
8. Instructional Design
9. Scaffolding
10. Mastery Learning
11. Curriculum Design
12. Connectivism
13. Non-Linear Learning Path
14. Andragogy

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Bloom's Taxonomy and Learning Objectives](../06-blooms-taxonomy-learning-objectives/index.md)

---

!!! mascot-welcome "Welcome back!"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 6 gave you a vocabulary for *how deeply* a concept must be known — Bloom's six levels. This chapter asks a prior question: *why* does a dependency edge in your learning graph exist at all? The answer is not arbitrary. Every prerequisite relationship you have modeled since Chapter 1 rests on a claim from the learning sciences about how humans actually build knowledge — and different theories make different claims.

A concept dependency graph is, in a real sense, a frozen argument about learning. When you draw an edge from "Multiplication" to "Addition," you are asserting that the human mind needs the second before it can construct the first. That assertion did not come from nowhere — it comes from a family of learning theories developed over the past century, each of which explains, in a different way, how new knowledge attaches to old knowledge. This chapter surveys five of those theories, then shows how they translate directly into the practical craft of instructional design: the discipline of deciding what to teach, in what order, and with how much support.

## Constructivism: Knowledge Built, Not Delivered

**Constructivism** is a learning theory holding that learners build their own understanding and knowledge most effectively through active experience and reflection, rather than by passively absorbing information transmitted by a teacher. In the learning graph for this book, Constructivism has zero prerequisites — it is one of the foundational theories the rest of this chapter's concepts depend on, directly or indirectly.

The core claim is worth stating precisely because it shapes everything downstream: a learner does not receive a finished copy of a concept from a textbook or lecture. Instead, each learner constructs a personal, working model of that concept by connecting new information to what they already know, testing that model against experience, and revising it when it fails. Two learners who read the identical paragraph about depth-first search will walk away with two different mental models, shaped by whatever graph-traversal experience — or lack of it — each brought to the page.

Constructivism has direct, practical consequences for how an intelligent textbook should behave, not just what it should say:

- Prefer worked examples and interactive MicroSims over pure exposition, because manipulation and feedback are how construction happens
- Sequence prerequisite concepts deliberately, since new understanding is built by attaching to existing understanding — exactly what a concept dependency graph's edges encode
- Expect — and design for — variation in how different learners interpret the same material, rather than assuming one explanation suffices for everyone

Two concepts that appear later in this chapter, the Zone of Proximal Development and Rhizombic Learning, both depend directly on Constructivism in the learning graph. Before looking at either, it helps to sit with one more implication: if knowledge is built rather than delivered, then a course designer's real job is not "cover the material" but "create the conditions under which a learner can build a correct model of it."

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice how constructivism reframes the concept dependency graph itself. It is not a delivery schedule ("teach A, then B, then C"). It is closer to a scaffolding plan — a claim about which prior mental models a learner needs already in place before a new one can be successfully constructed on top of them.

## Zone of Proximal Development: The Sweet Spot for Learning

**Zone of Proximal Development (ZPD)**, a concept introduced by psychologist Lev Vygotsky, is the range of tasks a learner can accomplish with guidance or collaboration but cannot yet accomplish independently. In the learning graph, ZPD depends directly on Constructivism — it is a specific, actionable refinement of the broader claim that learners build knowledge actively, describing exactly *where* that construction is most productive.

Picture three concentric regions around any learner at a given moment. The innermost region holds tasks the learner can already do alone — practicing them wastes time. The outermost region holds tasks so far beyond current understanding that even significant help will not produce genuine learning; the learner lacks the prerequisite concepts to make sense of the support offered. Between these two sits the ZPD: tasks just out of independent reach, but achievable with the right kind of assistance.

For a course built on a concept dependency graph, the ZPD gives precise language for a design decision every chapter in this book makes implicitly: a chapter should introduce concepts a reader cannot yet do alone, but can do with the explanations, worked examples, and MicroSims a textbook provides — never concepts so far ahead of the reader's current graph position that no amount of scaffolding would help.

The following table compares the three regions directly, reinforcing the definitions above rather than introducing new ones.

| Region | Learner Can... | Instructional Value |
|---|---|---|
| Comfort zone | Perform independently, without support | Low — the learner already has this concept mastered |
| Zone of Proximal Development | Perform with guidance, scaffolding, or collaboration | High — this is where real learning happens |
| Frustration zone | Not perform, even with substantial support | Low — required prerequisite concepts are missing entirely |

An intelligent textbook has an advantage a printed one never had: it can estimate, from a learner's demonstrated mastery of prior nodes in the graph, roughly where that learner's ZPD currently sits, and can route them toward concepts positioned there rather than concepts too easy or too far ahead.

## Rhizombic Learning: Growth Without a Single Root

**Rhizombic Learning** is an educational model, inspired by the way biological rhizomes grow and spread underground in every direction rather than from one central root, that allows for non-linear, interconnected, and expansive pathways of knowledge acquisition. Rhizombic Learning also depends directly on Constructivism in this book's learning graph, but it takes the theory in a different direction than the ZPD does: where the ZPD is about pacing a single learner along a mostly ordered path, Rhizombic Learning questions whether a single ordered path should exist at all.

A traditional curriculum resembles a tree: one trunk, branching in a fixed hierarchy, with a clear "correct" route from root to any given leaf. A rhizome has no such single trunk — any point can connect to any other point, new shoots can emerge unpredictably, and there is no one privileged starting node. Applied to learning, this model suggests that knowledge acquisition can be productive even when it does not follow the strict, linear prerequisite chains that dominate most formal course design.

!!! note
    The Wikipedia article on this topic uses the spelling "Rhizomatic Learning." This book uses "Rhizombic Learning" throughout, matching this project's glossary and learning graph.

Rhizombic Learning depends on two ideas the learner needs defined before the diagram below makes sense. First, **Self-Directed Exploration** is the practice of a learner choosing their own path through available material based on curiosity, prior interest, or an emerging question, rather than following a path assigned by an instructor. Second, **Emergent Knowledge Structure** is the pattern of understanding that arises organically from a learner's own connections between concepts, rather than a structure imposed in advance by a curriculum designer. Both concepts depend directly on Rhizombic Learning in the learning graph — they describe, respectively, the *behavior* a rhizomatic learner exhibits and the *outcome* that behavior tends to produce.

With those three terms defined, the diagram below contrasts a traditional linear path through a small set of concepts against a rhizomatic exploration of the same concepts, letting you click any node to see how a learner might reach it.

#### Diagram: Linear Path vs. Rhizombic Exploration

<iframe src="../../sims/rhizombic-path-explorer/main.html" width="100%" height="562px" scrolling="no"></iframe>

[View Linear Path vs. Rhizombic Exploration Fullscreen](../../sims/rhizombic-path-explorer/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Linear Path vs. Rhizombic Exploration</summary>
Type: graph-model
**sim-id:** rhizombic-path-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Contrast a strictly linear prerequisite chain with a rhizomatic, self-directed exploration of the same underlying concept set, so learners can see structurally what "non-linear" means rather than only reading a definition.

Bloom Level: Analyze (L4)
Bloom Verb: compare, contrast, examine, distinguish

Learning objective: Given the same eight concept nodes rendered in two side-by-side network views, the learner can compare the fixed, single-order traversal of a linear path against the many valid entry points and connection patterns of a rhizomatic exploration, and articulate at least one advantage and one risk of each.

Node types (shared between both views):
- Eight sample concept nodes drawn from a hypothetical "Photography Basics" domain: Aperture, Shutter Speed, ISO, Exposure Triangle, Composition, Rule of Thirds, Depth of Field, Portrait Lighting

Left panel — "Linear Path":
- Nodes arranged in a single fixed vertical chain with one entry point (Aperture) and one exit point (Portrait Lighting)
- Solid black directed edges showing the one permitted order
- Layout: vis-network hierarchical layout, direction top-to-bottom

Right panel — "Rhizombic Exploration":
- Same eight nodes arranged with force-directed (non-hierarchical) layout
- Multiple undirected edges showing several valid connection routes between concepts (e.g., a learner curious about Portrait Lighting can reach Depth of Field directly without passing through ISO)
- No single required entry point; any node can be a starting point, shown by a subtle pulsing highlight that cycles among all eight nodes on load

Interactive features:
- Hover any node in either panel: tooltip shows the concept's one-sentence definition
- Click any node in the Rhizombic panel: highlights every alternate path from that node to "Portrait Lighting," demonstrating there are multiple valid routes
- Click any node in the Linear panel: highlights only the single fixed path, demonstrating there is exactly one route
- Zoom: mouse wheel on either panel independently
- Pan: click and drag background of either panel independently
- Button: "Simulate a Curious Learner" — animates a token jumping between 3-4 loosely related nodes in the Rhizombic panel in a plausible but non-sequential order, then displays the caption "This learner built a working understanding of Depth of Field without ever visiting ISO directly."

Color scheme: Linear panel nodes in solid blue; Rhizombic panel nodes in gold with varying node size proportional to degree (more-connected nodes appear larger)

Responsive behavior: panels stack vertically on viewports narrower than 700px; both networks resize proportionally to container width using vis-network's `fit()` method on window resize

Canvas size: responsive, 100% width, 560px height, panels split 50/50 on wide viewports

Implementation: vis-network for both graph panels; a shared JavaScript array of the eight nodes and two edge sets (linear, rhizomatic) driving both renders
</details>

The diagram makes a subtle point concrete: rhizomatic exploration does not abandon structure entirely — the concepts and their relationships still exist — but it removes the requirement that every learner traverse them in the same fixed order. Non-linear paths trade a guarantee (every learner covers every prerequisite before it is needed) for a benefit (learners can follow genuine curiosity, which constructivism predicts produces stronger, more durable knowledge construction).

A learning graph itself, being a Directed Acyclic Graph rather than a strict linear sequence, is already structurally compatible with rhizomatic exploration — a single DAG can support many valid topological orderings, and Chapters 1 through 6 of this book have used only one of many orders that would respect every dependency edge.

## Non-Linear Learning Path: Structure Without a Single Sequence

**Non-Linear Learning Path** is a route through a body of content that does not follow one fixed sequence of concepts, instead allowing multiple valid orderings or branch points based on a learner's interests, prior knowledge, or goals. In the learning graph, Non-Linear Learning Path depends on both Connectivism (introduced shortly) and Rhizombic Learning — it is, in a sense, the concrete instructional-design artifact that rhizomatic thinking produces when it meets the practical need to still organize course material into something a learner can navigate.

It is worth being precise about what "non-linear" does and does not mean here, since the term is easy to over-read.

- A non-linear path is **not** the absence of prerequisites — dependency edges in the underlying graph still constrain what order concepts can safely be learned in
- A non-linear path **is** the presence of multiple valid topological orderings through that same dependency graph, any of which a learner may follow depending on their goals
- A non-linear path typically supports multiple entry points, rather than forcing every learner through an identical Chapter 1

Contrast this with the six chapters preceding this one, each of which was written assuming a single linear reading order — appropriate for a first-edition print-style textbook, but only one of many valid orders the underlying learning graph would actually support. A more advanced intelligent textbook platform could offer a reader who already understands Bloom's Taxonomy a different entry point than a reader who has never encountered it, provided both eventually satisfy every prerequisite edge before reaching a given concept.

## Emergent Knowledge Structure Revisited: What the Learner Ends Up With

Having defined Self-Directed Exploration and Emergent Knowledge Structure above as prerequisites for understanding Rhizombic Learning, it is worth returning to the second term now that Non-Linear Learning Path has been defined, since the three ideas fit together as cause, mechanism, and result.

- **Self-Directed Exploration** is the *behavior*: a learner choosing their own path
- **Non-Linear Learning Path** is the *structure* that makes that behavior possible without violating prerequisite constraints
- **Emergent Knowledge Structure** is the *outcome*: the personal mental model a learner ends up with, which may connect concepts in an order or configuration the original course designer never explicitly planned

This progression matters for anyone designing an intelligent textbook, because it reframes what "coverage" means. A traditionally designed course measures success by whether every learner passed through every node in the same order. A course designed with rhizomatic and non-linear principles in mind measures success by whether every learner's emergent knowledge structure ultimately satisfies the graph's dependency constraints — even if no two learners took the identical route to get there.

## Cognitivism: The Mind as an Information Processor

Constructivism is not the only learning theory that shapes how a concept dependency graph should be built. **Cognitivism** is a learning theory that treats the mind as an information-processing system, focusing on how learners perceive, encode, store, and retrieve knowledge through internal mental structures such as schemas. Cognitivism has zero prerequisites in this book's learning graph, standing alongside Constructivism as a second foundational theory — related, but distinct in its central claim.

Where constructivism emphasizes the active, personal, experience-driven building of knowledge, cognitivism emphasizes the internal architecture that makes any building possible in the first place: working memory, long-term memory, and the schemas — organized mental structures — that let a learner recognize a new problem as an instance of a familiar pattern. Cognitivism is the theoretical ancestor of ideas like cognitive load — the limited capacity of working memory that a well-designed chapter must respect by not introducing too many new, unconnected concepts at once, a principle this book's course description names explicitly among its learning-science foundations.

## Behaviorism: Learning as Observable Response

**Behaviorism** is a learning theory that focuses on observable behavior as the primary evidence of learning, explaining behavior change through stimulus-response conditioning and reinforcement rather than appeals to internal mental states. Like Cognitivism, Behaviorism has zero prerequisites in the learning graph — it is the third of this chapter's foundational theories.

Behaviorism predates both cognitivism and constructivism historically, and it is easy to dismiss as outdated, but its instructional-design legacy is still visible everywhere: immediate feedback after a quiz question, points or badges that reinforce correct answers, spaced-repetition flash cards, and the very idea of breaking a skill into small, testable steps all trace back to behaviorist principles. A MicroSim that gives a learner instant visual feedback the moment they click the wrong node in a graph traversal exercise is applying a behaviorist mechanism — reinforcement — even in a chapter whose overall design philosophy leans constructivist.

Before comparing all three foundational theories, a brief bridge: each theory answers a different question about learning, and a mature instructional designer draws on more than one depending on the task at hand, rather than treating them as mutually exclusive doctrines.

| Theory | Core Focus | What It Explains Well | Typical Classroom Artifact |
|---|---|---|---|
| Constructivism | Active building of personal knowledge | Why worked examples and MicroSims outperform pure lecture | Hands-on projects, interactive simulations |
| Cognitivism | Internal mental processing and memory | Why cognitive overload hurts learning | Chunked content, worked-example fading |
| Behaviorism | Observable, reinforced behavior | Why immediate feedback and repetition work | Quizzes, flash cards, points and badges |

## Connectivism: Learning as Network Navigation

**Connectivism** is a learning theory, developed for the digital age, holding that learning increasingly consists of forming and navigating connections across networks of people, information sources, and technologies, rather than accumulating knowledge solely inside an individual mind. Connectivism has zero prerequisites in the learning graph, joining Constructivism, Cognitivism, and Behaviorism as this chapter's fourth foundational theory — and, notably, the one that introduces the concept of a network directly into the theory itself.

Connectivism's central claim fits unusually well with the subject matter of this entire book: if learning is fundamentally about forming connections across a network, then a literal concept dependency graph — nodes and edges representing exactly those connections — is not merely a convenient organizing tool for a course designer. It is a direct, structural representation of the theory's own claim about how learning actually works. This is why Non-Linear Learning Path, defined earlier, depends on Connectivism in addition to Rhizombic Learning: navigating a network of connections, by definition, does not require a single fixed entry point or route.

!!! mascot-tip "Try This"
    ![Axiom with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    The next time you look at this book's own learning graph JSON file, notice that connectivism gives you a second, equally valid way to read it — not just as "concept A must precede concept B," but as "concept A and concept B are connected, and a learner's job is to build and strengthen that connection." Both readings are correct; they simply emphasize different things.

## Andragogy: How Adults Learn Differently

**Andragogy** is the theory and practice of teaching adult learners, distinguished from pedagogy (the teaching of children) by its emphasis on self-direction, prior experience as a learning resource, problem-centered relevance, and internal rather than external motivation. Andragogy has zero prerequisites in the learning graph — the fifth and final foundational theory this chapter covers — and it is the theory most directly relevant to this book's own stated audience.

Malcolm Knowles, the researcher most associated with andragogy, identified assumptions that distinguish adult learners from children in a classroom setting:

1. Adults need to know *why* they are learning something before investing effort in learning it
2. Adults bring a large reservoir of prior experience that should be treated as a resource, not overridden
3. Adults are most ready to learn material tied to real tasks or problems they currently face
4. Adults are primarily motivated internally — by relevance and competence — rather than by external rewards like grades
5. Adults prefer learning oriented around solving problems, not around abstract subject matter for its own sake

This is not an abstract detour. This book's own course description explicitly targets "instructional designers, curriculum developers, educational technologists, edtech product managers, and software engineers," and states plainly that readers should be treated "as working professionals rather than beginning students." That is andragogy applied to this very textbook: explaining *why* a concept dependency graph matters before asking you to build one, assuming professional-level prior experience with data structures rather than re-teaching what a graph is, and favoring problem-centered examples — a CMDB, a quiz generator, a learning graph pipeline — over abstract exercises disconnected from real instructional-design work.

!!! mascot-encourage "You are the audience andragogy describes"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If earlier chapters occasionally moved faster than a typical introductory textbook, that was not an oversight — it was andragogy in action. This book assumes you bring real prior experience, and it trusts you to connect that experience to new material rather than starting from zero. That trust is itself a design choice grounded in the theory you just read about.

## From Theory to Practice: Instructional Design

The five theories covered so far — Constructivism, Cognitivism, Behaviorism, Connectivism, and Andragogy — each make a claim about *how* learning happens. **Instructional Design** is the systematic practice of applying learning theory and evidence-based principles to plan, sequence, and structure educational content and experiences so that learners reliably reach defined learning objectives. In the learning graph, Instructional Design depends on Constructivism, Behaviorism, Cognitivism, and Learning Objective (from Chapter 6) — it is the discipline that translates competing theoretical claims into a single, coherent, buildable course.

Instructional design does not require choosing exactly one theory and discarding the rest. In practice, a well-designed chapter of an intelligent textbook typically draws on all of them at once: constructivist worked examples and MicroSims, cognitivist attention to how many new concepts appear per section, behaviorist immediate feedback on quiz questions, connectivist links between concepts and chapters, and andragogical framing that states why a concept matters before asking a professional reader to learn it. A learning graph is, in this light, the shared data structure that lets all four theories operate on the same underlying map of concepts and dependencies.

Two practices that instructional designers use constantly — scaffolding and curriculum design — both depend directly on Instructional Design in this book's learning graph, and both deserve a closer look.

## Scaffolding: Structured, Fading Support

**Scaffolding** is an instructional-design technique that provides structured, temporary support to help a learner accomplish a task or master a concept that lies within their Zone of Proximal Development, with that support gradually withdrawn as the learner gains independent competence. The name is a deliberate metaphor: construction scaffolding supports a building under construction and is removed once the structure can stand on its own — instructional scaffolding works the same way with a learner's developing understanding.

Scaffolding depends directly on Instructional Design in the learning graph, and it is also the concept that operationalizes the Zone of Proximal Development defined earlier in this chapter — the ZPD identifies *where* support is most valuable, and scaffolding is the *technique* for delivering that support in a way that fades over time. Common scaffolding techniques include worked examples that gradually remove steps, hint systems that reveal progressively smaller clues, sentence starters for open-ended questions, and step-by-step MicroSims that a learner can eventually complete without the guided walkthrough.

The diagram below makes the fading pattern concrete: it shows how the *amount* of instructional support a learner receives typically decreases across a single lesson as demonstrated mastery increases, and lets you explore the trade-off between removing support too quickly and removing it too slowly.

#### Diagram: Scaffolding Fade Simulator

<iframe src="../../sims/scaffolding-fade-simulator/main.html" width="100%" height="522px" scrolling="no"></iframe>

[View Scaffolding Fade Simulator Fullscreen](../../sims/scaffolding-fade-simulator/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Scaffolding Fade Simulator</summary>
Type: microsim
**sim-id:** scaffolding-fade-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners experiment with how quickly instructional support should fade as demonstrated mastery increases, connecting the abstract idea of "scaffolding" to a concrete, adjustable curve.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, apply, practice

Learning objective: Given a slider controlling "fade rate" and a simulated learner whose mastery grows in response to practice attempts, the learner can adjust the fade rate to keep the simulated learner's task difficulty within their Zone of Proximal Development, avoiding both frustration (support removed too fast) and stagnation (support never removed).

Canvas layout:
- Left (400px): line chart showing two curves over 20 simulated practice attempts — "Support Level" (starts high, decreases) and "Simulated Mastery" (starts low, increases)
- Right (200px): controls and status readout

Visual elements:
- X-axis: Practice Attempt (1-20)
- Y-axis: Level (0-100%)
- Support Level curve in blue, starting near 90% and decreasing according to the fade-rate slider
- Simulated Mastery curve in gold, increasing at a rate that depends on whether support stayed within the learner's current ZPD
- A shaded green band representing the "ZPD zone" — the range of task difficulty appropriate at each attempt

Interactive controls:
- Slider: "Fade Rate" (Slow, Medium, Fast) — controls how quickly Support Level decreases per attempt
- Button: "Run Simulation" — animates both curves attempt by attempt
- Button: "Reset"
- Display: status message updating each attempt, e.g., "Attempt 7: Support (62%) is within the learner's ZPD — mastery growing steadily" or "Attempt 7: Support removed too fast — learner frustration detected, mastery growth stalling"

Default parameters:
- Fade Rate: Medium
- Practice attempts: 20
- Initial Support Level: 90%
- Initial Simulated Mastery: 10%

Data Visibility Requirements:
  Stage 1: Show starting values (Support 90%, Mastery 10%) before any attempts run
  Stage 2: Show, attempt by attempt, the updated Support Level and Mastery values as plain numbers next to the chart, not just as curve positions
  Stage 3: Show the status message explaining whether the current gap between Support and Mastery falls inside or outside the shaded ZPD band
  Final: Show a summary comparing total mastery gained under Slow, Medium, and Fast fade rates side by side

Instructional Rationale: A parameter-exploration pattern is appropriate for this Apply-level objective because scaffolding is fundamentally a design decision about a rate of change, and a learner internalizes the trade-off best by directly manipulating that rate and observing the concrete numeric consequence, rather than by reading a static description of "fade support gradually."

Responsive behavior: chart and control panel stack vertically on viewports narrower than 600px

Canvas size: responsive, 100% width, 520px height

Implementation: p5.js for chart rendering and animation loop; mastery-growth formula implemented as a simple function of the gap between current Support Level and the ZPD band, exposed as commented, adjustable constants
</details>

## Curriculum Design: Structuring an Entire Course

Where scaffolding operates at the scale of a single concept or lesson, **Curriculum Design** is the practice of structuring an entire course or program of study — selecting concepts, sequencing them, and organizing them into units or chapters — so that learners progress systematically toward a set of learning objectives. Curriculum Design depends on Instructional Design and Learning Objective in the learning graph, placing it at the same level as Scaffolding but operating at a much larger scale: an individual lesson versus an entire book.

Everything this textbook has done since Chapter 1 is itself an act of curriculum design, and the learning graph is the artifact that made it possible. A curriculum designer working without a learning graph must sequence concepts by intuition or by copying an existing table of contents. A curriculum designer working with a validated concept dependency graph can instead derive a defensible chapter order directly from the graph's topological structure — precisely the process the `book-chapter-generator` step in this project's own pipeline performs, grouping concepts into chapters such that no chapter requires a concept that has not yet been introduced in an earlier one.

Curriculum design decisions that a learning graph makes tractable include:

- Which concepts belong in the same chapter (concepts with dense mutual dependencies)
- What order chapters should appear in (a topological sort of the chapter-level dependency graph)
- Where prerequisite gaps exist that the current concept list does not yet cover
- Which concepts are foundational (referenced by many later concepts) and therefore deserve the most careful, well-scaffolded treatment

## Mastery Learning: Advancing Only When Ready

The final concept in this chapter draws together the Zone of Proximal Development and Scaffolding into a formal instructional-design model. **Mastery Learning** is an instructional approach in which learners must demonstrate a defined level of competence in a concept before advancing to the next one, with additional time, practice, or alternative instruction provided to any learner who has not yet reached that competence threshold. Mastery Learning depends on both Scaffolding and Zone of Proximal Development in the learning graph — it combines the fading-support technique of scaffolding with the ZPD's insight that a learner should only be advanced into material appropriate to their current readiness.

Mastery learning stands in direct contrast to the far more common time-based model of instruction, where every learner advances to the next unit on a fixed schedule regardless of whether they have actually mastered the previous one. The comparison below reinforces a distinction the paragraph above already established, rather than introducing a new one.

| Model | Advancement Trigger | Risk |
|---|---|---|
| Time-based instruction | A fixed calendar date arrives | Learners advance with gaps in foundational concepts |
| Mastery learning | Demonstrated competence against a defined threshold | Requires flexible pacing and continual assessment |

A concept dependency graph is close to a natural fit for mastery learning, because the graph already encodes exactly the prerequisite structure a mastery-based system needs to enforce: an intelligent textbook platform can, in principle, refuse to present a concept node to a learner until every prerequisite node in the graph has been marked as mastered — the same edge-direction rule from Chapter 5 (`prereqs[edge['from']].add(edge['to'])`) that builds a valid chapter order can also gate an individual learner's real-time progress through that same graph.

!!! mascot-thinking "Key Insight"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Mastery learning is where every theory in this chapter converges on one practical mechanism. Constructivism explains why gaps in understanding compound. Cognitivism explains why overloading a learner who lacks prerequisites fails. The ZPD names the sweet spot mastery gating protects. And the learning graph you have been building since Chapter 1 is the data structure that makes enforcing all of it computationally possible.

The infographic below lets you explore how the five learning theories from this chapter connect to the four instructional-design practices they inform, reinforcing the dependency structure described in prose above through direct interaction.

#### Diagram: Theory-to-Practice Concept Map

<iframe src="../../sims/theory-to-practice-map/main.html" width="100%" height="562px" scrolling="no"></iframe>

[View Theory-to-Practice Concept Map Fullscreen](../../sims/theory-to-practice-map/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Theory-to-Practice Concept Map</summary>
Type: infographic
**sim-id:** theory-to-practice-map<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Give learners a single, persistent, clickable map of how this chapter's five learning theories connect to Instructional Design and its four dependent practices, reinforcing the dependency relationships already explained in prose.

Bloom Level: Understand (L2)
Bloom Verb: summarize, classify, interpret

Learning objective: Given a two-tier network of theories and practices, the learner can correctly classify each of the nine chapter concepts as either a "theory" or a "practice," and correctly trace which theories inform which practices via the graph's edges.

Node types:
- Top tier (five theory nodes, blue circles): Constructivism, Cognitivism, Behaviorism, Connectivism, Andragogy
- Bottom tier (four practice nodes, gold squares): Instructional Design, Scaffolding, Curriculum Design, Mastery Learning

Edges (directed, dependent-to-prerequisite, matching this book's learning graph convention):
- Instructional Design to Constructivism, Behaviorism, Cognitivism
- Scaffolding to Instructional Design
- Curriculum Design to Instructional Design
- Mastery Learning to Scaffolding
- Non-Linear Learning Path (small extra node, shown lower-right) to Connectivism

Layout: vis-network hierarchical layout, theories on top row, Instructional Design in a middle row, Scaffolding/Curriculum Design/Mastery Learning cascading below it

Interactive features:
- Hover any node: tooltip shows the node's one-sentence definition, pulled from this chapter's own definitions
- Click any node: highlights every edge and neighboring node directly connected to it, dimming the rest of the graph, and opens a side panel with the full paragraph-length explanation from this chapter
- Click background: clears the highlight and returns to the full map
- Zoom: mouse wheel
- Pan: click and drag background

Color scheme: theory nodes in blue, practice nodes in gold, with the Non-Linear Learning Path node in a lighter gray to visually mark it as a secondary/illustrative addition rather than a core practice

Legend: circle = learning theory, square = instructional-design practice, arrow direction = "depends on" (matching every other graph diagram in this book)

Responsive behavior: network resizes to container width on window resize using vis-network's `fit()` method; side panel stacks below the network on viewports narrower than 640px

Canvas size: responsive, 100% width, 560px height

Implementation: vis-network with a fixed nodes/edges dataset matching this chapter's concept list and dependency structure; side-panel definitions stored as a JavaScript lookup object keyed by node id
</details>

## Chapter Summary

This chapter connected the concept dependency graphs built in Chapters 1 through 6 to the learning-science theories that justify why prerequisite edges exist in the first place, then showed how those theories translate into instructional-design practice.

1. **Constructivism** claims learners build knowledge actively; the **Zone of Proximal Development** names the sweet spot between too-easy and too-hard where that building happens best
2. **Rhizombic Learning** challenges strictly linear sequencing, built from **Self-Directed Exploration** (the learner behavior) producing an **Emergent Knowledge Structure** (the resulting mental model), formalized as a **Non-Linear Learning Path** through the same underlying dependency graph
3. **Cognitivism**, **Behaviorism**, and **Connectivism** each add a distinct lens — internal information processing, observable reinforced behavior, and networked connection-forming — alongside constructivism as foundational learning theories
4. **Andragogy** explains why this book itself is written the way it is: for professionals who need to know *why* before *what*, and who bring prior experience worth building on
5. **Instructional Design** is the discipline that applies all five theories to build real courses, expressed concretely through **Scaffolding** (fading support within a single concept), **Curriculum Design** (sequencing an entire course), and **Mastery Learning** (gating advancement on demonstrated competence)

!!! mascot-celebration "Well done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — you now know *why* a concept dependency graph is more than a convenient data structure. Every edge you draw is a small, testable claim grounded in real learning science, and every chapter you sequence is an act of instructional design. Let's connect the concepts — next, we return to graph theory itself: the traversal, search, and clustering algorithms that let an intelligent agent actually navigate the structures this chapter just explained the *why* behind.

[See Annotated References](./references.md)
