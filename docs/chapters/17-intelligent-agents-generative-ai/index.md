---
title: Intelligent Agents and Generative AI
description: Covers how generative AI and intelligent agents use a learning graph — prompt engineering, tool use, multi-agent collaboration, retrieval-augmented generation, and GraphRAG — to enumerate concepts, infer dependencies, and act as learning agents.
generated_by: claude skill chapter-content-generator
date: 2026-07-03 10:38:45
version: 0.09
---

# Intelligent Agents and Generative AI

## Summary

Covers how generative AI and intelligent agents use a learning graph — prompt engineering, tool use, multi-agent collaboration, retrieval-augmented generation, and GraphRAG — to enumerate concepts, infer dependencies, and act as learning agents.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Generative AI
2. Intelligent Agent
3. Agent Autonomy
4. Multi-Agent Collaboration
5. Tool Use (Agent)
6. Iterative Workflow
7. LLM-Generated Dependency Graph
8. Prompt Engineering
9. Chatbot
10. Retrieval-Augmented Generation
11. GraphRAG
12. Learning Agent

## Prerequisites

This chapter builds on concepts from:

- [Chapter 16: Personalization and Adaptive Learning Paths](../16-personalization-adaptive-learning-paths/index.md)

---

!!! mascot-welcome "The Graph Meets the Agent"
    ![Axiom waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the concepts! Chapter 16 closed with a promise: the personalization pipeline you just learned — similarity metrics, recommendation engines, hyper-customized lesson plans — is machinery that something has to *run*. This chapter introduces the thing that runs it. We are moving from static definitions to a system that reads your learning graph, reasons about it, and acts.

Every chapter so far has treated the learning graph as an artifact a human — or a script — reads and writes. This chapter changes that relationship. Generative AI systems can now enumerate concepts, propose dependency edges, and hold a conversation about a learning graph's structure. Intelligent agents can go further: they can decide, on their own, which action to take next, call external tools, and revise a lesson plan across an extended session. Understanding both — what generative AI is good at, and what an intelligent agent adds on top of it — is the last piece needed before Chapter 18 shows agents driving MicroSim generation directly.

## Generative AI: Producing New Content From Learned Patterns

Chapter 1 through 16 assumed a human, or a deterministic script, authored every learning graph, glossary entry, and chapter. **Generative AI** is a type of artificial intelligence capable of producing new content — such as text, images, or other data — by learning patterns from existing data and generating outputs that follow those patterns. Generative AI has no prerequisites within this chapter's concept set; it is the foundational capability everything else in this chapter builds on.

The glossary example already used elsewhere in this book is worth restating precisely, because it anchors every later section: a generative AI model can create personalized learning materials by analyzing a student's previous responses and generating explanations, questions, or study guides tailored to their learning progress. Two properties of generative AI matter for how a learning graph project actually uses it:

- **Pattern-based, not rule-based.** A generative AI model does not follow an explicit set of authored rules the way the cycle-detection algorithm from Chapter 5 does. It produces output statistically consistent with patterns learned from training data.
- **Prompt-driven, not autonomous.** On its own, a generative AI model responds to a single input and produces a single output. It does not decide to take a second action, check its own work, or call an external tool unless something else is built around it to do so.

That second property is the hinge this entire chapter turns on. Everything from here forward is about what happens when you build a system *around* generative AI that lets it act rather than just respond.

## Prompt Engineering: Directing What Generative AI Produces

Because a generative AI model's output is shaped entirely by its input, the wording, structure, and context of that input becomes a skill in its own right. **Prompt Engineering** is the practice of designing and refining input text (prompts) to elicit accurate, relevant, or creative responses from a generative AI model. Prompt Engineering depends directly on Generative AI in the learning graph — it is the applied discipline of controlling generative AI's output, not a separate capability.

This book has used prompt engineering implicitly since Chapter 2, whenever a skill generated a concept list or a dependency CSV from a course description. A well-engineered prompt for learning-graph work typically specifies four things explicitly, rather than leaving them for the model to guess:

1. **Role and context** — e.g., "You are building a concept dependency graph for a professional-level course on X"
2. **Output format** — e.g., "Return a JSON array of nodes with id, label, and taxonomy fields"
3. **Constraints** — e.g., "Generate exactly 200 distinct concepts, no duplicates, ISO/IEC 11179-style labels"
4. **Evaluation criteria** — e.g., "Each concept must have at least one valid prerequisite unless it is foundational"

!!! mascot-tip "A Prompt Is Not a Wish"
    ![Axiom with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    The single biggest improvement in prompt quality for learning-graph work comes from specifying output format explicitly. "List some concepts" produces inconsistent results. "Return a JSON array of objects with `id`, `label`, and `dependencies` fields, one object per concept" produces something a script can actually parse.

## LLM-Generated Dependency Graph: Prompt Engineering Applied to This Book's Core Structure

Prompt engineering, as just defined, is a general-purpose skill applicable to any generative AI task. Applying it specifically to the structure this entire book is organized around — the dependency edges between concepts — produces the chapter's next idea. An **LLM-Generated Dependency Graph** is a concept dependency graph whose nodes, edges, or both were proposed by a large language model in response to an engineered prompt, typically followed by human or automated validation before use. LLM-Generated Dependency Graph depends on both Generative AI and Concept Dependency in the learning graph — it combines generative AI's pattern-based content production with Chapter 1's dependency relationship, applying the former to generate instances of the latter at scale.

This is precisely the workflow the `learning-graph-generator` skill used to produce this book's own 300-plus-node graph, and it is worth being explicit about the two-stage pattern, since every LLM-generated dependency graph in this book followed it:

| Stage | What Happens | Chapter Reference |
|---|---|---|
| Generation | A prompt-engineered request asks the model to propose concept labels and "depends on" edges | This chapter |
| Validation | Cycle detection, orphan detection, and connectivity analysis check the proposal before it is trusted | Chapter 5 |

An LLM-generated dependency graph is a *proposal*, not a finished artifact. Chapter 5's validation checks exist precisely because a generative AI model can produce a dependency claim that sounds plausible in a sentence — "Backward Design depends on Bloom's Taxonomy" — without the model ever formally verifying that the claim is acyclic or that both concepts already exist in the graph. Treating LLM output as a first draft awaiting validation, rather than ground truth, is the discipline this book has modeled since Chapter 2.

Before comparing this workflow to how a chatbot handles a single question, it helps to see the proposal step as one node in a larger, clickable picture — a preview of every mechanism this chapter still has to define.

#### Diagram: Generative AI to Learning Graph Pipeline

<iframe src="../../sims/genai-learning-graph-pipeline/main.html" width="100%" height="522px" scrolling="no"></iframe>

[View Generative AI to Learning Graph Pipeline Fullscreen](../../sims/genai-learning-graph-pipeline/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Generative AI to Learning Graph Pipeline</summary>
Type: workflow
**sim-id:** genai-learning-graph-pipeline<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let learners click through the pipeline that turns a course description into a validated learning graph using generative AI, reinforcing that an LLM-generated dependency graph is a proposal that passes through validation before use, not a finished artifact.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize, sequence

Learning objective: Given the five-stage pipeline rendered as a flowchart, the learner can explain what happens at each stage and identify which stage is responsible for catching an invalid (cyclic or orphaned) LLM proposal.

Visual style: Mermaid left-to-right flowchart, five rectangular nodes connected by arrows, with the validation node styled as a decision diamond

Steps (each is one Mermaid node with a click directive):
1. "Course Description" — click reveals: "A human-authored document stating audience, topics, and learning outcomes (Chapter 2)."
2. "Prompt-Engineered Request" — click reveals: "A structured prompt asks the model for a fixed number of distinct concept labels and candidate dependency edges."
3. "LLM-Generated Proposal" — click reveals: "The model returns a concept list and edges, formatted as JSON, but unverified."
4. "Validation" — click reveals: "Cycle detection, orphan detection, and connectivity analysis (Chapter 5) check the proposal before anything downstream trusts it."
5. "Validated Learning Graph JSON" — click reveals: "The artifact every later chapter — visualization, personalization, chapter generation — is built on."

Interactive features: every node has a click directive that opens an infobox below the diagram with the step's description; the Validation node is colored gold to flag it as the quality gate; a "Reject" label on a dashed arrow loops from Validation back to Prompt-Engineered Request, clickable to reveal "If validation fails, the prompt is refined and the model is asked again — this is Iterative Workflow, covered later in this chapter."

Color scheme: indigo fill for content nodes, gold fill for the Validation decision node, dashed gray for the reject loop

Responsive behavior: flowchart scales to container width and reflows to a vertical layout on viewports narrower than 600px; infobox appears below the diagram

Canvas size: responsive, 100% width, 480px height

Implementation: Mermaid.js flowchart with click bindings wired to a JavaScript showInfo() function populating a div below the diagram with the selected step's stored description text
</details>

## Intelligent Agent: From Responding to Acting

Every concept covered so far in this chapter describes generative AI producing output in response to a single, well-crafted prompt. A different category of system decides *on its own* what to do next, potentially across many steps, without a human writing a new prompt for each one. An **Intelligent Agent** is an autonomous entity capable of perceiving its environment, processing inputs, and taking actions to achieve specific goals or objectives, often with the ability to adapt or learn from experience. Intelligent Agent depends directly on Generative AI in the learning graph — it uses generative AI's content-production capability as one component inside a larger system that also perceives, decides, and acts.

This book's own glossary example makes the distinction concrete: an intelligent agent in an educational platform uses a learning graph to create a customized lesson plan for students, identifying key concepts where students struggled after the prior week's quiz and selecting activities that reinforce those concepts — adapting to each student's individual needs. Notice what that example requires beyond a single generated paragraph of text: the agent must read a quiz result, consult the learning graph, and select activities — a sequence of decisions, not one text-completion step.

The distinction between generative AI and an intelligent agent is easy to blur in casual conversation, so it is worth stating the contrast directly, expanding on the four characteristics this book's own glossary already lists under "Agent Characteristics":

- **Autonomy and decision-making** — an intelligent agent can operate independently, making decisions to achieve a goal, unlike generative AI alone, which only responds to a prompt
- **Iterative workflows** — an intelligent agent refines its output through repeated cycles, while generative AI alone does not improve iteratively without something external driving it
- **Tool use and environmental interaction** — an intelligent agent interacts with external tools and environments (including a learning graph), which generative AI alone cannot do on its own
- **Modular design and multi-agent collaboration** — an intelligent agent can work as part of a multi-agent system, solving complex problems together, unlike an isolated generative AI call

Each of those four bullets names a concept this chapter still needs to define precisely. The next four sections take them one at a time.

!!! mascot-thinking "Key Distinction"
    ![Axiom thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Generative AI is the engine. An intelligent agent is the car — it has a destination, a steering wheel, sensors, and a plan for using the engine repeatedly to get there. This chapter's remaining sections describe the steering wheel, the sensors, and the plan.

## Agent Autonomy: Deciding Without a New Prompt Each Time

The first characteristic distinguishing an intelligent agent from a single generative AI call is the ability to make decisions independently. **Agent Autonomy** is the capacity of an intelligent agent to make decisions and take actions to achieve its goals without requiring step-by-step human instruction for each individual action. Agent Autonomy depends directly on Intelligent Agent in the learning graph — it is one defining capability of an intelligent agent, not a separate kind of system.

Autonomy exists on a spectrum rather than as an on/off switch, and it is useful to place a few familiar learning-graph tools on that spectrum before defining the more advanced concepts still ahead:

| System | Human Involvement | Autonomy Level |
|---|---|---|
| A single generative AI prompt (e.g., "generate 10 concept labels") | Human writes every prompt, reviews every output | Low — no autonomy |
| The `learning-graph-generator` skill run once | Human triggers the skill, reviews the final validated graph | Medium — the skill chains several internal steps without a new prompt for each |
| A fully autonomous learning agent (defined later in this chapter) monitoring a live classroom | Human sets goals and constraints up front; agent acts continuously | High — sustained autonomy |

Higher autonomy is not automatically better. An agent with unchecked autonomy over a student-facing lesson plan could, in principle, make a pedagogically unsound decision with no human catching it before a learner encounters it — which is exactly why Chapter 5's validation habit and this chapter's tool-use constraints matter even more once a system starts acting autonomously rather than just generating a single response for human review.

## Iterative Workflow: Autonomy Applied Across Repeated Cycles

Agent autonomy, as just defined, describes the capacity to decide. Applying that capacity repeatedly, so that each decision's outcome informs the next one, produces a distinct pattern already familiar from Chapter 16's adaptive learning loop. An **Iterative Workflow** is a process in which an intelligent agent repeatedly executes a cycle of action, evaluation, and refinement, using the outcome of each cycle to improve the next, rather than producing a single output and stopping. Iterative Workflow depends directly on Intelligent Agent in the learning graph — it is autonomy exercised across multiple cycles rather than a single decision.

The parallel to Chapter 16 is worth making explicit, because the underlying pattern is the same loop applied to a different subject. Chapter 16's adaptive learning loop cycled through present, observe, adjust, repeat for a single learner's content. An agent's iterative workflow cycles through a comparable pattern for its own output:

1. **Act** — the agent takes an action, such as generating a candidate dependency edge or drafting a chapter section
2. **Evaluate** — the agent (or an external validation step, such as Chapter 5's cycle detector) checks the result against a standard
3. **Refine** — if the result fails the check, the agent revises its approach and tries again
4. **Repeat** — the cycle continues until the result passes, or until a maximum number of attempts is reached

This is exactly the "Reject" loop shown in the pipeline diagram earlier in this chapter: when validation fails an LLM-generated dependency graph proposal, an iterative workflow is what sends the process back to a refined prompt rather than simply failing outright. Generative AI alone, without an iterative workflow wrapped around it, would stop at the first (possibly invalid) output.

## Tool Use (Agent): Reaching Outside the Model

The third characteristic distinguishing an intelligent agent from generative AI alone concerns what the agent can act on, not just how many times it acts. **Tool Use (Agent)** is the capability of an intelligent agent to invoke external functions, APIs, databases, or systems — beyond its own generated text — in order to gather information or take action in its environment. Tool Use (Agent) depends directly on Intelligent Agent in the learning graph — it is the specific capability that lets an intelligent agent's decisions reach outside the model itself.

This book's glossary already names the specific tool that matters most for this course: in this course, agents must be able to access a learning graph and generate learning paths for lesson plan customization. A learning graph functions as one such external tool — an agent with tool use can query it (e.g., "which concepts are ready-to-learn for student 42, given their mastery record?"), rather than trying to recall or hallucinate the graph's structure from its own training data. Other tools an intelligent agent in this domain might invoke include:

- A learning management system's gradebook API, to read a student's recent quiz scores
- Chapter 5's validation scripts, to check a proposed dependency edge before accepting it
- A content library search index, to retrieve candidate resources for Chapter 16's content recommendation engine
- A text-to-speech or MicroSim-generation service, to produce new instructional material on demand

!!! mascot-warning "A Common Mistake"
    ![Axiom warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A generative AI model with no tool use can only work from what it already learned during training, plus whatever text is in its current prompt. Asking it to "check the learning graph for cycles" without giving it actual access to the graph produces a plausible-sounding but unverified answer — the exact failure mode Chapter 5's validation habit exists to catch. Tool use is what closes that gap.

## Multi-Agent Collaboration: Several Agents, One Problem

The fourth and final characteristic distinguishing an intelligent agent from a single generative AI call concerns how many agents are involved. **Multi-Agent Collaboration** is an architecture in which multiple intelligent agents, each often specialized for a distinct subtask, coordinate and share information to solve a problem too complex or too broad for a single agent to handle efficiently alone. Multi-Agent Collaboration depends directly on Intelligent Agent in the learning graph — it is a modular composition of multiple instances of the same underlying concept, not a fundamentally different kind of system.

This book's own production process is itself an example. The `book-chapter-generator` skill and the `chapter-content-generator` skill you are reading the output of right now are two functionally distinct agents: one determines chapter structure and concept ordering from the learning graph, the other generates prose, diagrams, and MicroSim specifications for a single chapter. Neither skill needs to know how to perform the other's job — each is specialized, and the overall book emerges from their coordination, run in sequence rather than by one monolithic agent trying to do everything at once.

Multi-agent architectures for learning-graph work typically split responsibility along one of a few common lines:

- **By pipeline stage** — one agent generates concepts, a second infers dependencies, a third validates the result (mirroring the pipeline diagram earlier in this chapter)
- **By domain** — one agent specializes in mathematics concepts, another in humanities concepts, each contributing to a shared graph
- **By role** — one agent proposes content, a second critiques or reviews it before it reaches a human, an emerging pattern sometimes called a "generator-critic" pair

Before the interactive comparison below, it is worth being explicit about why these four capabilities — autonomy, iterative workflow, tool use, and multi-agent collaboration — are being presented together: an intelligent agent does not need all four to qualify as an agent, but a system with none of them is simply generative AI responding to a single prompt. The MicroSim below lets you toggle each capability independently and observe how a simulated agent's behavior description changes.

#### Diagram: Agent Capability Explorer

<iframe src="../../sims/agent-capability-explorer/main.html" width="100%" height="542px" scrolling="no"></iframe>

[View Agent Capability Explorer Fullscreen](../../sims/agent-capability-explorer/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Agent Capability Explorer</summary>
Type: microsim
**sim-id:** agent-capability-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners toggle the four defining capabilities (agent autonomy, iterative workflow, tool use, multi-agent collaboration) on and off and read a simulated behavior description that updates live, making concrete that each capability contributes independently to what distinguishes an intelligent agent from a single generative AI call.

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, examine, distinguish

Learning objective: Given four togglable agent capabilities, the learner can differentiate which behaviors each capability enables and explain why a system with all four toggles off is equivalent to generative AI responding to a single prompt.

Canvas layout:
- Left (300px): four toggle switches, one per capability, each with a one-line label
- Right (400px): a "Simulated Agent Behavior" text panel that updates as toggles change

Visual elements:
- Toggle 1: "Agent Autonomy" — when on, the behavior panel adds: "Decides its next action without waiting for a new human prompt."
- Toggle 2: "Iterative Workflow" — when on, the behavior panel adds: "Evaluates its own output and refines it across repeated cycles."
- Toggle 3: "Tool Use" — when on, the behavior panel adds: "Queries the learning graph and other external systems for real data instead of relying on memory."
- Toggle 4: "Multi-Agent Collaboration" — when on, the behavior panel adds: "Coordinates with other specialized agents on subtasks."
- With all four off, the panel shows: "Generates one response to one prompt, then stops."

Interactive controls:
- Four independent toggle switches (all default off)
- Button: "Reset All Toggles"

Default parameters:
- All four toggles off; behavior panel shows the baseline generative-AI-only description

Data Visibility Requirements:
Stage 1: With all toggles off, show the baseline description and a caption: "This is generative AI without agent capabilities"
Stage 2: As each toggle is switched on, append its corresponding behavior sentence to the panel with a brief highlight animation
Stage 3: With all four toggles on, show all four behavior sentences together with a caption: "This is a fully capable intelligent agent"
Final: Clicking any toggle off again removes its sentence immediately, reinforcing that each capability is independent and additive

Instructional Rationale: An Analyze-level objective requires the learner to isolate the contribution of each capability, which is best served by direct toggling that adds or removes one behavior sentence at a time, rather than a static paragraph describing all four capabilities at once.

Responsive behavior: toggle panel and behavior panel stack vertically on viewports narrower than 640px

Canvas size: responsive, 100% width, 540px height

Implementation: p5.js; four boolean toggle states drive a lookup table of behavior sentences, concatenated into the display panel; no live AI model involved, clearly labeled as an illustrative simulation
</details>

## Chatbot: Intelligent Agent With a Conversational Interface

With all four defining capabilities of an intelligent agent now established, one especially common and familiar interface for interacting with such a system deserves its own definition. A **Chatbot** is an intelligent agent, typically powered by generative AI and guided by prompt engineering, that interacts with users through natural-language conversation to answer questions, provide guidance, or complete tasks. Chatbot depends on both Intelligent Agent and Prompt Engineering in the learning graph — it is a specific interface pattern for an intelligent agent, one whose inputs and outputs are engineered natural-language prompts and responses rather than, say, a structured API call.

Not every chatbot exercises all four agent capabilities from the previous sections. A simple question-answering chatbot might have no tool use, no multi-agent collaboration, and only limited autonomy — it primarily performs prompt engineering behind a conversational front end. A chatbot designed to tutor a student through this book's own material, by contrast, might combine several capabilities at once:

- **Tool use** to query the learning graph for the student's current ready-to-learn concepts
- **Iterative workflow** to refine an explanation if the student says "I still don't understand"
- **Autonomy** to decide, without a new human prompt, whether to offer a hint or a full worked example
- Conversational, natural-language input and output — the property that makes it a chatbot specifically, rather than some other kind of agent

The chatbot pattern is worth distinguishing clearly from the retrieval and graph-aware patterns covered next, because those patterns are frequently combined with a chatbot's conversational interface without being the same thing as the interface itself.

## Retrieval-Augmented Generation: Grounding Output in Real Content

Generative AI, as defined at the start of this chapter, produces output based on patterns learned during training — which means its knowledge is frozen at whatever point its training data ended, and it has no built-in way to cite a specific, current source for a claim. **Retrieval-Augmented Generation** (RAG) is a technique that improves generative AI output by first retrieving relevant documents or data from an external knowledge source, then including that retrieved content in the prompt so the model's response is grounded in current, verifiable information rather than relying solely on patterns memorized during training. Retrieval-Augmented Generation depends directly on Generative AI in the learning graph — it is a technique for improving generative AI's output quality and factual grounding, applied on top of the base generative capability.

RAG matters directly for learning-graph work because a generative AI model asked to "explain Universal Design for Learning the way this book defines it" has no guarantee, without retrieval, that its answer matches this book's own Chapter 16 definition rather than some other, possibly conflicting, definition it encountered during training. A RAG-based system instead performs a specific sequence before generating its answer:

1. **Retrieve** — search a chosen knowledge source (this book's own glossary and chapter text, for instance) for passages relevant to the query
2. **Augment** — insert the retrieved passages into the prompt alongside the original question
3. **Generate** — ask the generative AI model to answer using the retrieved passages as grounding context

Before the interactive tool below, it is useful to be explicit about the trade-off RAG makes: retrieval adds a lookup step, but that step is what lets a chatbot answer questions about this specific, evolving learning graph — including chapters written after the underlying model's training cutoff — rather than only about whatever the model happened to learn during training.

#### Diagram: Retrieval-Augmented Generation Step-Through

<iframe src="../../sims/rag-step-through/main.html" width="100%" height="562px" scrolling="no"></iframe>

[View Retrieval-Augmented Generation Step-Through Fullscreen](../../sims/rag-step-through/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Retrieval-Augmented Generation Step-Through</summary>
Type: microsim
**sim-id:** rag-step-through<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners step through the retrieve-augment-generate sequence with a concrete worked example (a question about a glossary term), seeing the actual retrieved text and augmented prompt at each stage, to make the abstract RAG technique concrete before GraphRAG extends it in the next section.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize, sequence

Learning objective: Given a worked example question ("What is Universal Design for Learning?"), the learner can explain what happens at each of the three RAG stages and identify why the retrieved passage changes the final generated answer compared to an ungrounded response.

Canvas layout:
- Top: a fixed example query displayed as text: "What is Universal Design for Learning?"
- Middle (350px): a three-stage horizontal step panel (Retrieve / Augment / Generate), with Next and Previous buttons
- Bottom (150px): a comparison box showing "Without RAG" (a generic, possibly imprecise answer) side by side with "With RAG" (the grounded answer citing the retrieved passage)

Visual elements:
- Stage 1 "Retrieve" panel: shows a simulated search over a small three-document knowledge source, highlighting the one passage that matches (Chapter 16's actual UDL definition, three sentences)
- Stage 2 "Augment" panel: shows the original query and the retrieved passage combined into one augmented prompt block, visually distinguishing the original question (blue) from the inserted context (gold)
- Stage 3 "Generate" panel: shows the model's final answer, with the phrase drawn directly from the retrieved passage underlined

Interactive controls:
- "Next" and "Previous" buttons to move between the three stages
- Toggle: "Show Without-RAG Comparison" — reveals the bottom comparison box

Default parameters:
- Starts at Stage 1 (Retrieve); comparison box hidden until toggled on

Data Visibility Requirements:
Stage 1: Show the three-document mini knowledge source and highlight which document/passage the retrieval step selects, with a caption explaining why it was selected (keyword and topic match)
Stage 2: Show the exact augmented prompt text, with original query and retrieved passage visually distinguished
Stage 3: Show the generated answer with the grounded phrase underlined, and a caption: "This phrase came directly from the retrieved passage, not from the model's memory"
Final: With the comparison toggle on, show both answers side by side with a caption naming the specific difference (e.g., the without-RAG answer omits the three-principles structure Chapter 16 defines)

Instructional Rationale: An Understand-level objective requires the learner to trace a process with concrete data at each stage; a step-through with a fixed worked example and Next/Previous controls makes the transformation from query to grounded answer visible, which continuous animation would obscure.

Responsive behavior: three-stage panel and comparison box stack vertically on viewports narrower than 700px

Canvas size: responsive, 100% width, 560px height

Implementation: p5.js; three pre-scripted stages with fixed example text (no live model call); Next/Previous buttons advance a stage index that swaps which panel is visible
</details>

## GraphRAG: Retrieval Augmented by Graph Structure

Retrieval-augmented generation, as just defined, retrieves relevant *documents* or *passages* — flat pieces of text ranked mainly by keyword or semantic similarity to the query. A variant designed specifically for graph-structured knowledge, such as this book's own learning graph, retrieves along the graph's edges instead of, or in addition to, ranking loose text passages. **GraphRAG** is a retrieval-augmented generation technique that retrieves and reasons over a knowledge graph's nodes and relationships — rather than only flat text passages — so that a generative AI model's response can reflect structural context such as prerequisite chains, taxonomy categories, or multi-hop connections between concepts. GraphRAG depends on both Retrieval-Augmented Generation and Concept Taxonomy in the learning graph — it extends standard RAG's retrieve-then-generate pattern by retrieving structured graph context, using Chapter 4's taxonomy categories as one of its key organizing signals.

The advantage GraphRAG offers over plain RAG becomes concrete with a specific query this book's own learning graph makes easy to pose: "What do I need to know before I can understand GraphRAG?" A plain RAG system would search for text passages containing words like "GraphRAG" or "prerequisite" and return whatever passages rank highest by similarity — potentially missing a concept that never uses the word "prerequisite" explicitly but is nonetheless a direct dependency. A GraphRAG system, by contrast, can walk the actual dependency edges from the GraphRAG node backward — exactly the traversal Chapter 5's connectivity analysis already performs — and return the precise prerequisite chain: Retrieval-Augmented Generation, Concept Taxonomy, and everything those two in turn depend on.

The following table summarizes the distinction now that both techniques have been defined precisely.

| Property | Retrieval-Augmented Generation | GraphRAG |
|---|---|---|
| What is retrieved | Text passages or documents | Nodes, edges, and structural context from a knowledge graph |
| Ranking signal | Keyword or semantic similarity | Graph relationships (e.g., dependency edges, taxonomy categories) plus similarity |
| Well suited for | "What does this term mean?" | "What must I understand before this term?" or "How are these two concepts related?" |
| Learning graph analogy | Searching this book's glossary text | Traversing this book's own dependency edges (Chapter 5) |

!!! mascot-explain "Why This Matters for This Book"
    ![Axiom explaining](../../img/mascot/explain.png){ class="mascot-admonition-img" }
    A GraphRAG system built on top of this book's own learning graph JSON could answer "what should I read before Chapter 17?" by traversing dependency edges directly, rather than guessing from chapter text alone. That is precisely the kind of reasoning a learning agent, defined next, needs in order to build a lesson plan a human would find defensible.

## Learning Agent: Every Capability Applied to One Learner

Every concept this chapter has defined — generative AI, prompt engineering, autonomy, iterative workflow, tool use, multi-agent collaboration, retrieval, and graph-aware retrieval — converges on a single, education-specific application that closes the chapter and fulfills the promise Chapter 16 made at its own close. A **Learning Agent** is an intelligent agent that uses a learning graph together with a student's demonstrated mastery to autonomously assemble hyper-personalized lesson plans, recommend next concepts, or generate instructional content. Learning Agent depends on both Intelligent Agent and Adaptive Learning in the learning graph — it combines this chapter's general agent capabilities with Chapter 16's adaptive, performance-responsive personalization machinery, aimed specifically at one learner's ongoing education.

A learning agent is best understood as the point where every concept in this chapter and the previous one stops being separate machinery and starts operating as a single system. Tracing one plausible session makes the composition concrete:

- The agent uses **tool use** to query the learning graph and a student's mastery record (this chapter)
- It applies **GraphRAG** to retrieve the prerequisite structure around the student's weakest concept, rather than a loose text search (this chapter)
- It uses **prompt engineering** internally to ask a generative AI model to draft an explanation grounded in the retrieved context (this chapter)
- It runs an **iterative workflow**, checking the draft against Chapter 5's validation standards and refining it if a claim does not hold up (this chapter)
- It applies Chapter 16's **content sequencing algorithm** and **similarity metrics** to select the next concept and matching content format
- It assembles the result into a **hyper-customized lesson plan** (Chapter 16), acting with **agent autonomy** rather than waiting for a human to approve each step

This is exactly the capstone-level outcome the course description for this book names explicitly: using a validated learning graph to drive an intelligent agent that generates a personalized lesson plan. Every concept from Chapters 1 through 17 exists, in one sense, to make this single capability possible.

Before the chapter closes, it is worth mapping every concept covered here back to the four-characteristic framework introduced early in the chapter, since that framework is what makes "intelligent agent" a precise term rather than a vague label for "anything involving AI."

| Characteristic | Concepts in This Chapter |
|---|---|
| Foundation | Generative AI, Prompt Engineering |
| Autonomy and iteration | Agent Autonomy, Iterative Workflow |
| Reaching outside the model | Tool Use (Agent), Retrieval-Augmented Generation, GraphRAG |
| Working with others | Multi-Agent Collaboration |
| Applied interfaces and outcomes | Chatbot, LLM-Generated Dependency Graph, Learning Agent |

!!! mascot-encourage "If This Feels Abstract"
    ![Axiom encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Twelve concepts, and several of them sound close enough to blur together — agent, chatbot, learning agent. Notice that each one was defined by naming exactly one thing it adds on top of a concept you had already learned, going all the way back to generative AI at the top of this chapter. That is the dependency structure of this book applied to its own hardest chapter yet.

## Chapter Summary

This chapter introduced the systems that read and act on a learning graph autonomously, rather than the human-driven workflows covered in earlier chapters.

1. **Generative AI** and **Prompt Engineering** established the foundational content-production capability and the discipline of directing it precisely
2. **LLM-Generated Dependency Graph** showed prompt engineering applied to this book's own core structure, always paired with Chapter 5's validation habit
3. **Intelligent Agent** introduced the shift from responding to a single prompt to acting toward a goal, defined by four characteristics: **Agent Autonomy**, **Iterative Workflow**, **Tool Use (Agent)**, and **Multi-Agent Collaboration**
4. **Chatbot** named the conversational interface pattern that often combines several agent capabilities behind natural-language interaction
5. **Retrieval-Augmented Generation** and **GraphRAG** showed how an agent grounds its output in real content — first flat text passages, then graph-structured relationships like this book's own dependency edges
6. **Learning Agent** closed the chapter by combining every prior concept — this chapter's and Chapter 16's — into a single system capable of assembling a hyper-personalized lesson plan autonomously

The next chapter turns from the agents themselves to what they produce: MicroSims, generated on demand by exactly this kind of agent, using the learning graph to decide what a learner needs to see next.

!!! mascot-celebration "Well done!"
    ![Axiom celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pause and appreciate your progress — you have now connected generative AI's raw content-production capability all the way through to a fully autonomous learning agent capable of building a personalized lesson plan on its own. Let's connect the concepts — this is the chapter where the learning graph stopped being something you read about and became something a machine can act on.

[See Annotated References](./references.md)
