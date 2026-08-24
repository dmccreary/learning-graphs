# References: Concept Impact Score and Predicting Content Length

1. [PageRank](https://en.wikipedia.org/wiki/PageRank) - Wikipedia - Describes the damped, iteratively-converged recursive importance algorithm this chapter's PageRank section introduces, and the graph-cycle problem CIS avoids by exploiting DAG acyclicity.

2. [Directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Wikipedia - Covers the acyclicity property this chapter's Single-Pass DAG Computation section relies on to compute CIS exactly without a damping factor.

3. [Topological sorting](https://en.wikipedia.org/wiki/Topological_sorting) - Wikipedia - Defines the ordering algorithm underlying both Single-Pass DAG Computation's exact CIS pass and Within-Chapter Concept Ordering's prerequisite-respecting sequencing.

4. [Eigenvector centrality](https://en.wikipedia.org/wiki/Eigenvector_centrality) - Wikipedia - Covers the broader family of recursive importance measures — a node's score depends on its neighbors' scores — that this chapter's Recursive Importance Measure section generalizes from.

5. [Katz centrality](https://en.wikipedia.org/wiki/Katz_centrality) - Wikipedia - A damped recursive centrality measure closely related to PageRank, useful for contrasting general-graph damped measures against CIS's damping-free DAG solution.

6. [Elaboration theory](https://en.wikipedia.org/wiki/Elaboration_theory) - Wikipedia - Reigeluth's simple-to-complex instructional sequencing principle this chapter's Within-Chapter Concept Ordering section and the Elaboration Score/Elaboration Tier naming both draw on directly.

7. [Power law](https://en.wikipedia.org/wiki/Power_law) - Wikipedia - Describes the heavy-tailed distribution shape behind this chapter's Global Normalization section, where roughly half of a graph's concepts tie at the CIS floor, motivating the log-scaled Elaboration Score over a linear or percentile-rank scale.

8. [Normalization (statistics)](https://en.wikipedia.org/wiki/Normalization_\(statistics\)) - Wikipedia - Covers the general rescaling techniques this chapter's Global Normalization and Elaboration Score sections apply specifically to CIS values across an entire book.

9. [Software versioning](https://en.wikipedia.org/wiki/Software_versioning) - Wikipedia - Explains the version-number conventions (v1.06, v1.0.0, v1.09, v1.04) this chapter's "How CIS Changed Four Real Agent Skills" section cites when tracing the breaking-change dependency order across the four updated skills.

10. Brin, S. and Page, L. (1998). "The Anatomy of a Large-Scale Hypertextual Web Search Engine." Computer Networks and ISDN Systems, 30(1-7), 107-117. - The original PageRank paper, the primary academic source underlying this chapter's PageRank section and its contrast between web-graph damping and CIS's exact DAG computation.
