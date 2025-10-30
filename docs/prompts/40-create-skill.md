# Generating a Claude Skill for Learning Graph Generation

Please use the Claude Skill Creator skill here: 
https://github.com/anthropics/skills/tree/main/skill-creator  

Create a new skill for generating a learning graph from a course description.  First do  quality checks to make sure there is enough good content in a course 
description to generate 200 high-quality concepts.  

Give the user feedback on this process and if you have enough content then ask the user if you should proceed.  
The next step is to generate the preferred labels for the 
200 concepts in the course.  
The labels should be in title case and the 
length of the concept label should be under 32 characters.
List the enumerated concepts in the /data/course-concepts-v1.md as a 
numbered list.
Tell the user you have created the file and ask them to review the 
concepts.  Tell the user you can add or remove concepts from this list.

The next step is to generate a dependency list for these concepts.  The 
format of this list is a CSV file with columns for ConceptID (an integer), 
the ConceptLabel, and Dependencies.  Dependancies is pipe delimited list of 
the ConceptIDs that this concept depends on.  Save the file into a CSV file 
at /data/concept-dependencies.csv.
  Then do some quality checks.  Make sure that every concept except the 
foundational prerequsites have at least one dependancies.
  Foundational prerequsite concepts and no dependencies.  Concept should 
never depend on themselves.  
The graph should not have cycles.  Learning graphs are directed acyclic 
graphs.  
After you have a dependency graph check for orphaned nodes and disconneted 
subgraphs.  Create a report on the key quality metrics. A graph where every 
concept dendon only the prior concept is not a high quality learning graph.
Note that some concepts have a high indegree (the number of other concepts 
that depend in that concept.  Generate a report for the user of the 10 nodes
 that have the highest indegree.

The next step is to create a 12 category taxonomy for all the concepts.  Try
 to pick categories that evenly divide the concepts.  You can use a few more
 or less categories if you find natural groupings.  Place the taxonomy in 
/data/concept-taxonomy.md  Now add one more column to the CSV file called 
TaxonomyID.  Try to use 3-5 letter abbreviation for the taxonomy ID. For 
each concept, add the best match to a TaxonomyID.  If there are no close 
matches use the TaxonomyID "MISC".

The create a report for the user showing distribution of the count of 
concepts in each category.  Suggest other categories if one category has too
 many concepts (over 30% of the total).  Place the report in 
/data/taxonomy-distribution.md as a markdown table.  Tell the usr you are 
done!  Congratualte them and which them success on the textbook. 

⏺ I'll help you create a skill for generating learning graphs from course
  descriptions. Let me first fetch information about the Claude Skill
  Creator to understand how to create this skill.

⏺ Fetch(https://github.com/anthropics/skills/tree/main/skill-creator)
  ⎿  Fetching…

## Response

I'll help you create a skill for generating learning graphs from course
  descriptions. Let me first fetch information about the Claude Skill
  Creator to understand how to create this skill.

⏺ Fetch(https://github.com/anthropics/skills/tree/main/skill-creator)
  ⎿  Received 181.4KB (200 OK)

⏺ Bash(ls -la .claude 2>/dev/null || echo "No .claude directory found")
  ⎿  No .claude directory found

⏺ Fetch(https://raw.githubusercontent.com/anthropics/skills/main/skill-creator/S
       KILL.md)
  ⎿  Received 11.3KB (200 OK)

⏺ Fetch(https://raw.githubusercontent.com/anthropics/skills/main/template-skill/
       SKILL.md)
  ⎿  Received 140 bytes (200 OK)

⏺ Perfect! I now understand how to create a skill. Let me create a
  "learning-graph-generator" skill in your project. First, I'll set up the
  directory structure and then create the skill file.

⏺ Bash(mkdir -p .claude/skills/learning-graph-generator)
  ⎿  (No content)

⏺ Write(.claude/skills/learning-graph-generator/SKILL.md)
  ⎿  Wrote 149 lines to .claude/skills/learning-graph-generator/SKILL.md   
     ---
     name: learning-graph-generator
     description: Generates a comprehensive learning graph from a course
     description, including 200 concepts with dependencies, taxonomy
     categorization, and quality validation reports. Use this when the user
     wants to create a structured knowledge graph for educational content.
     ---
     # Learning Graph Generator
     You are tasked with generating a comprehensive learning graph from a
     course description. Follow these steps carefully:
     ## Step 1: Quality Assessment
     … +139 lines (ctrl+o to expand)

⏺ Perfect! I've successfully created the learning-graph-generator skill for
  you. Here's what I've set up:

  Skill Created: learning-graph-generator

  Location: .claude/skills/learning-graph-generator/SKILL.md

  What This Skill Does

  The skill implements a comprehensive 8-step workflow for generating
  learning graphs:

  1. Quality Assessment - Analyzes course descriptions for sufficient
  content
  2. Concept Generation - Creates 200 labeled concepts (Title Case, <32
  chars)
  3. Dependency Mapping - Builds CSV with prerequisite relationships
  4. Quality Validation - Checks for cycles, orphans, disconnected subgraphs
  5. Taxonomy Creation - Organizes concepts into ~12 categories
  6. Taxonomy Integration - Adds category IDs to the dependency graph
  7. Distribution Analysis - Reports on category balance
  8. Completion - Delivers final congratulations

  Output Files

  The skill will generate:
  - /data/course-concepts-v1.md - Numbered list of concepts
  - /data/concept-dependencies.csv - Full graph with dependencies & taxonomy
  - /data/concept-taxonomy.md - Category definitions
  - /data/quality-metrics.md - Quality validation report
  - /data/taxonomy-distribution.md - Category distribution table

  How to Use It

  To invoke this skill, simply type:

  /learning-graph-generator

  Then provide your course description, and the skill will guide you through
   each step, asking for your approval before proceeding and allowing you to
   review/modify the concepts list.

  The skill is now ready to use! Would you like to test it with a course
  description, or would you like me to make any adjustments to the skill
  workflow?

> /statusline is setting up statusLine… 
  ⎿  Allowed 3 tools for this command

⏺ statusline-setup(Configure statusLine from shell PS1)
  ⎿  Error reading file
     Error reading file
     +4 more tool uses (ctrl+o to expand)

────────────────────────────────────────────────────────────────────────────────
 Read file

  Read(~/.zshrc)

 Do you want to proceed?
 ❯ 1. Yes
   2. Yes, allow reading from danmccreary/ during this session
   3. No, and tell Claude what to do differently (esc)


