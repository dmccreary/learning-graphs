# References: Intelligent Agents and Generative AI

1. [Generative artificial intelligence](https://en.wikipedia.org/wiki/Generative_artificial_intelligence) - Wikipedia - Overview of how generative models produce text, images, and other data by learning patterns from training data, covering transformers and GANs, the foundational capability this chapter builds every agent concept on top of.

2. [Intelligent agent](https://en.wikipedia.org/wiki/Intelligent_agent) - Wikipedia - Explains agents that perceive an environment and act autonomously toward goals, including Russell and Norvig's five-type classification, directly grounding this chapter's definitions of Intelligent Agent, Agent Autonomy, and Learning Agent.

3. [Retrieval-augmented generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) - Wikipedia - Describes how retrieving external documents before generation grounds an LLM's output in verifiable content, the exact technique this chapter extends into GraphRAG for reasoning over a learning graph's structure.

4. Artificial Intelligence: A Modern Approach (4th Edition) - Stuart Russell & Peter Norvig - Pearson - The standard reference on intelligent agent architectures, autonomy, and multi-agent systems, providing the formal foundation behind this chapter's Agent Autonomy, Tool Use, and Multi-Agent Collaboration sections.

5. Speech and Language Processing (3rd Edition, draft) - Daniel Jurafsky & James H. Martin - Pearson - Covers dialogue systems, chatbots, and retrieval-based grounding of language model output, closely matching this chapter's treatment of Chatbot and Retrieval-Augmented Generation as applied conversational patterns.

6. [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) - Anthropic - Official guidance on directing a generative AI model's output through clear role, format, and constraint specification, illustrating this chapter's four-part framework for engineering prompts that produce parseable concept and dependency data.

7. [Tool use with Claude](https://platform.claude.com/docs/en/build-with-claude/tool-use/overview) - Anthropic - Documents how an agent calls external functions and APIs to reach beyond its own generated text, the exact Tool Use (Agent) capability this chapter shows querying a learning graph for ready-to-learn concepts.

8. [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) - Anthropic - Distinguishes predefined workflows from autonomous agents and describes composable patterns like evaluator-optimizer loops, directly informing this chapter's Iterative Workflow section and its act-evaluate-refine cycle.

9. [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) - Anthropic - A production account of a lead agent coordinating specialized subagents on parallel subtasks, illustrating this chapter's Multi-Agent Collaboration patterns split by pipeline stage, domain, or generator-critic role.

10. [GraphRAG](https://microsoft.github.io/graphrag/) - Microsoft - Documentation for a retrieval technique that reasons over knowledge graph nodes and relationships rather than flat text, the structural, prerequisite-aware retrieval this chapter's GraphRAG section contrasts against plain RAG.
