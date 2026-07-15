# References: Using a Skill to Generate a Learning Graph

1. [Directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Wikipedia - Covers topological ordering, cycle-free structure, and algorithms for detecting cycles, the exact mathematical property Automated Quality Validation checks in this chapter's dependency CSV before a graph is trusted.

2. [Human-in-the-loop](https://en.wikipedia.org/wiki/Human-in-the-loop) - Wikipedia - Explains systems where a human reviews or corrects an automated process's output, the pattern this chapter formalizes as Human-in-the-Loop Review at checkpoints like Course Description Scoring and Concept List Review.

3. [Software agent](https://en.wikipedia.org/wiki/Software_agent) - Wikipedia - Defines programs that act autonomously on a user's behalf with persistence and reactivity, the general category this chapter's Agent Skill and Claude Code sections narrow down to a filesystem-executing, skill-following coding agent.

4. Building Intelligent Interactive Tutors - Beverly Park Woolf - Morgan Kaufmann - Surveys automated authoring pipelines and quality control for AI-generated educational content, paralleling this chapter's Concept List Generation, Taxonomy Generation Step, and Automated Quality Validation as a repeatable production pipeline.

5. Introduction to Algorithms (4th Edition) - Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein - MIT Press - The standard reference on graph algorithms, including cycle detection and topological sort, underlying the Automated Quality Validation step's checks for cycles, orphans, and disconnected components.

6. [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) - Anthropic - Official documentation defining a Skill as a reusable, filesystem-based instruction set an agent loads on demand, the precise architecture this chapter's Agent Skill section describes for the `learning-graph-generator` skill.

7. [Claude Code overview](https://code.claude.com/docs/en/overview) - Anthropic - Introduces Claude Code as an agentic tool that reads files, runs commands, and follows multi-step instructions inside a project, the host runtime this chapter names as required to execute any agent skill file.

8. [Extend Claude with skills](https://code.claude.com/docs/en/skills) - Anthropic - Explains how Claude Code discovers and triggers a `SKILL.md` file automatically or by direct invocation, illustrating this chapter's Skill Invocation section and its two triggering methods.

9. [Detect Cycle in a Directed Graph](https://www.geeksforgeeks.org/dsa/detect-cycle-in-a-graph/) - GeeksforGeeks - Walks through DFS-based and topological-sort-based cycle detection with working code, the algorithmic technique underlying Automated Quality Validation's check that a dependency CSV forms a valid DAG.

10. [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) - Anthropic - Describes giving an agent a verifiable check, course-correcting early, and using a fresh subagent for adversarial review, patterns that mirror this chapter's Iterative Graph Regeneration and Human-in-the-Loop Review.
