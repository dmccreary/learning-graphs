# Quiz: Learner Modeling and Advanced Assessment

Test your understanding of learner modeling and advanced assessment with these review questions.

---

#### 1. Which term names "a data structure representing what a specific student currently knows, is working on, and has yet to encounter, tracked against a learning graph's concepts"?

<div class="upper-alpha" markdown>
1. Competency Model
2. Learner Model
3. Knowledge Component
4. Learning Path Constraint
</div>

??? question "Show Answer"
    The correct answer is **B**. A Learner Model is exactly this per-student data structure. Competency Model instead describes the full set of expected skills for a role or credential, Knowledge Component is one trackable unit inside a learner model, and Learning Path Constraint is an external limitation on sequencing, not the model itself.

    **Concept Tested:** Learner Model

    **See:** [Learner Modeling and Advanced Assessment](index.md)

---

#### 2. Which concept is "the specific subset of concepts in a learning graph that a learner is considered to currently know, at a given point in time"?

<div class="upper-alpha" markdown>
1. Mastery State
2. Knowledge State
3. Diagnostic Assessment
4. Readiness Estimation
</div>

??? question "Show Answer"
    The correct answer is **B**. Knowledge State is a learner's specific point within Chapter 8's knowledge-space model — the subset of concepts currently known. Mastery State grades *how well* one component is known rather than which concepts are known overall, and Diagnostic Assessment and Readiness Estimation are processes that use or produce knowledge-state information rather than being the state itself.

    **Concept Tested:** Knowledge State

    **See:** [Learner Modeling and Advanced Assessment](index.md)

---

#### 3. Which term names "the smallest unit of knowledge or skill that a learner model tracks mastery of individually"?

<div class="upper-alpha" markdown>
1. Knowledge Component
2. Learner Model
3. Competency Model
4. Learning Evidence
</div>

??? question "Show Answer"
    The correct answer is **A**. A Knowledge Component is the smallest individually-tracked unit, often but not always corresponding one-to-one with a concept. Learner Model is the whole data structure a knowledge component lives inside, Competency Model aggregates many knowledge components into role-level requirements, and Learning Evidence is the input used to update a component's mastery, not the component itself.

    **Concept Tested:** Knowledge Component

    **See:** [Learner Modeling and Advanced Assessment](index.md)

---

#### 4. A learner model records that a student is at a "developing" level, not yet "proficient," on a specific knowledge component. Which concept does this graded record represent?

<div class="upper-alpha" markdown>
1. Mastery Threshold
2. Mastery State
3. Knowledge State
4. Summative Assessment
</div>

??? question "Show Answer"
    The correct answer is **B**. Mastery State is a graded record of how well a learner demonstrates one specific knowledge component, not a binary flag. Mastery Threshold is the cutoff level that state must reach to count as satisfied, Knowledge State describes which concepts are known overall rather than grading one component, and Summative Assessment is an evidence source, not the graded record itself.

    **Concept Tested:** Mastery State

    **See:** [Learner Modeling and Advanced Assessment](index.md)

---

#### 5. Which concept is the minimum mastery-state level a learner must reach on a knowledge component before it counts as satisfied for unlocking dependent concepts?

<div class="upper-alpha" markdown>
1. Mastery Threshold
2. Readiness Estimation
3. Learning Path Constraint
4. Competency Model
</div>

??? question "Show Answer"
    The correct answer is **A**. A Mastery Threshold is exactly this stated cutoff — the formal, data-driven version of Chapter 23's Mastery Prerequisite. Readiness Estimation uses thresholds to compute what's learnable next rather than defining the cutoff itself, and Learning Path Constraint and Competency Model describe unrelated sequencing limits and role-level skill maps.

    **Concept Tested:** Mastery Threshold

    **See:** [Learner Modeling and Advanced Assessment](index.md)

---

#### 6. Which assessment type is given before or during instruction specifically to determine a learner's current knowledge state, rather than to grade past performance?

<div class="upper-alpha" markdown>
1. Summative Assessment
2. Diagnostic Assessment
3. Learning Evidence
4. Competency Model
</div>

??? question "Show Answer"
    The correct answer is **B**. Diagnostic Assessment is given before or during instruction to determine current knowledge state and plan what's next. Summative Assessment instead is given after instruction to evaluate mastery of material already taught, Learning Evidence is the general input category both assessment types produce, and Competency Model is an unrelated skill-mapping structure.

    **Concept Tested:** Diagnostic Assessment

    **See:** [Learner Modeling and Advanced Assessment](index.md)

---

#### 7. Using a Chapter 10-style end-of-chapter quiz to guess a brand-new learner's starting knowledge state produces misleading results. Why?

<div class="upper-alpha" markdown>
1. Because the quiz is written as a summative assessment, testing recall of material the learner has not yet studied rather than prerequisite readiness.
2. Because Mastery Threshold values cannot be computed from any quiz.
3. Because Learning Evidence can only come from MicroSim interactions, never quizzes.
4. Because Knowledge Component tracking requires a Competency Model to function.
</div>

??? question "Show Answer"
    The correct answer is **A**. A summative quiz assumes the reader just finished the chapter's material, so using it diagnostically on someone who has not yet studied that content tests recall of unseen material rather than genuine prerequisite readiness. Options B, C, and D each misstate this chapter's actual claims about thresholds, evidence sources, and component tracking.

    **Concept Tested:** Summative Assessment

    **See:** [Learner Modeling and Advanced Assessment](index.md)

---

#### 8. Which concept maps each competency required for a role or credential to one or more knowledge components in the learning graph?

<div class="upper-alpha" markdown>
1. Competency Model
2. Learner Model
3. Learning Path Constraint
4. Personalized Sequencing
</div>

??? question "Show Answer"
    The correct answer is **A**. A Competency Model structures the full set of expected skills for a role or credential and maps each to knowledge components — turning Chapter 9's Competency-Based Education into a checkable data structure. Learner Model tracks one individual's actual state rather than role requirements, and Learning Path Constraint and Personalized Sequencing describe sequencing limits and the final recommendation process, not a skill-to-component map.

    **Concept Tested:** Competency Model

    **See:** [Learner Modeling and Advanced Assessment](index.md)

---

#### 9. Which process uses a learner's current knowledge state together with the graph's dependency structure to predict which not-yet-mastered concepts the learner is now prepared to attempt?

<div class="upper-alpha" markdown>
1. Diagnostic Assessment
2. Readiness Estimation
3. Mastery Threshold
4. Learning Evidence
</div>

??? question "Show Answer"
    The correct answer is **B**. Readiness Estimation combines knowledge state with the dependency graph to predict newly-attemptable concepts — Chapter 23's Prerequisite Frontier computed against real learner data. Diagnostic Assessment supplies evidence used to build the knowledge state rather than performing the prediction itself, and Mastery Threshold and Learning Evidence are inputs to, not the estimation process itself.

    **Concept Tested:** Readiness Estimation

    **See:** [Learner Modeling and Advanced Assessment](index.md)

---

#### 10. A learner is ready, by pure prerequisite logic, for three different next concepts, but a certification deadline rules out two of them. Which concept explains this override?

<div class="upper-alpha" markdown>
1. Learning Path Constraint
2. Knowledge Component
3. Mastery State
4. Diagnostic Assessment
</div>

??? question "Show Answer"
    The correct answer is **A**. A Learning Path Constraint is exactly this kind of additional requirement — a deadline, fixed course length, or policy — that limits which otherwise-valid sequences a personalization engine may recommend, regardless of pure readiness. Knowledge Component, Mastery State, and Diagnostic Assessment describe learner-model tracking and evidence-gathering concepts, none of which represent an external sequencing limitation.

    **Concept Tested:** Learning Path Constraint

    **See:** [Learner Modeling and Advanced Assessment](index.md)

---
