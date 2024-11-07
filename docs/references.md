# References for Learning Graphs

## Academic Papers

### Sample Prompt for Curriculum Design

```linenums="0"
What research papers discuss the use of graph representations
of course concepts and the impact of concept dependency on
curriculum design?
```
### ChatGPT Response

Several research papers explore the use of graph representations to model course concepts and examine how concept dependencies influence curriculum design:

#### KCUBE

**"KCUBE: A Knowledge Graph University Curriculum Framework for Student Advising and Career Planning"** by George Baciu et al. (2022): This paper introduces KCUBE, a framework that utilizes knowledge graphs to represent university curricula. The framework aids in managing, planning, and delivering course material by mapping relationships between course concepts, thereby assisting students and educators in curriculum planning and career advising.

   [SpringerLink](https://link.springer.com/chapter/10.1007/978-3-031-08939-8_31)

#### Concept Graph Learning from Educational Data

Yiming Yang et al. (2015)

This study addresses the challenge of detecting prerequisite relationships among courses by learning a directed universal concept graph. The approach supports curriculum design by identifying coherent sequences of courses based on concept dependencies.

[Carnegie Mellon CS](https://www.cs.cmu.edu/~hanxiaol/publications/yang-wsdm15.pdf)

#### Constructing an Educational Knowledge Graph with Concepts Linked to Wikipedia

Fu-Rong Dang et al. (2021)

The authors construct a knowledge graph for Massive Open Online Courses (MOOCs) by extracting concepts from course descriptions and linking them to Wikipedia entries. This graph representation enhances the understanding of relationships among course concepts, facilitating more effective curriculum design.

[SpringerLink](https://link.springer.com/article/10.1007/s11390-020-0328-2)

#### Supporting Curriculum Designers in Developing Balanced Outcome-based Curriculums Using Knowledge Graphs
Ghadah Aldhalaan et al. (2023)

This paper discusses how knowledge graphs can assist curriculum designers in mapping relationships between course concepts and student outcomes. By visualizing these dependencies, educators can create more balanced and cohesive curricula.

[Warse](https://www.warse.org/IJATCSE/static/pdf/file/ijatcse021252023.pdf)

These studies demonstrate the potential of graph-based representations in capturing concept dependencies, thereby informing and improving curriculum design processes.

Sources
![Favicon](https://www.google.com/s2/favicons?domain=https://www.warse.org&sz=32)
![Favicon](https://www.google.com/s2/favicons?domain=https://www.cs.cmu.edu&sz=32)
![Favicon](https://www.google.com/s2/favicons?domain=https://link.springer.com&sz=32)

### Chatbot Prompt

What research papers discuss the use of graph representations
of course concepts and the impact of concept dependency on
educational chatbots?

### ChatGPT said:

Several research studies have explored the integration of graph representations of course concepts and the impact of concept dependencies on the development and effectiveness of educational chatbots:

#### CourseKG: An Educational Knowledge Graph Based on Course Information for Precision Teaching

Ying Li et al. (2024): This study proposes CourseKG, an educational knowledge graph that structures course information to enhance personalized learning. By mapping relationships between course concepts, CourseKG enables educational chatbots to provide tailored guidance and support to learners, thereby improving the quality of teaching.

[MDPI](https://www.mdpi.com/2076-3417/14/7/2710)


#### Generate Knowledge Graphs for Complex Interactions
Sunil Ramlochan (2023)

This article discusses the use of knowledge graphs in AI conversational models, highlighting how structuring information about entities and their relationships can enhance the chatbot's ability to manage and utilize information in complex interactions. By maintaining context and providing personalized responses, knowledge graphs improve the chatbot's effectiveness in educational settings.

[Prompt Engineering](https://promptengineering.org/knowledge-graphs-in-ai-conversational-models/)

These studies demonstrate that incorporating graph representations of course concepts and understanding concept dependencies can significantly enhance the functionality and educational value of chatbots. By leveraging structured knowledge, educational chatbots can provide more personalized, context-aware, and effective support to learners.

Sources
![Favicon](https://www.google.com/s2/favicons?domain=https://promptengineering.org&sz=32)
![Favicon](https://www.google.com/s2/favicons?domain=https://link.springer.com&sz=32)
![Favicon](https://www.google.com/s2/favicons?domain=https://www.mdpi.com&sz=32)

### Other Papers

#### KnowEdu

Chen, Penghe et al. “KnowEdu: A System to Construct Knowledge Graph for Education.” IEEE Access 6 (2018): 31553-31563.

A system, called KnowEdu, to automatically construct knowledge graph for education, which adopts the neural sequence labeling algorithm on pedagogical data to extract instructional concepts and employs probabilistic association rule mining on learning assessment data to identify the educational relations between the concepts

#### Design and Implementation of Curriculum System Based on Knowledge Graph
Y., Xiaobing, S., Mike, C., Han, Y., Runming. **Design
and Implementation of Curriculum System Based on
Knowledge Graph**, in Proc IEEE International
Conference on Consumer Electronics and Computer
Engineering (ICCECE), pp. 767-770, 2021.

## Technology Resources

1. **vis.js** - [https://visjs.github.io/vis-network/docs/network/](https://visjs.github.io/vis-network/docs/network/)
1. **mkdocs** - [https://www.mkdocs.org/](https://www.mkdocs.org/) - this is our tool for building the website.  It converts Markdown into HTML in the ```site``` directory.
2. **mkdocs material theme** - [https://squidfunk.github.io/mkdocs-material/](https://squidfunk.github.io/mkdocs-material/) - this is the theme for our site.  The theme adds the user interface elements that give our site the look and feel.  It also has the features such as social cards.
3. **GitHub Pages** - [https://pages.github.com/](https://pages.github.com/) - this is the free tool for hosting public websites created by mkdocs
4. **Markdown** - [https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown](https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown) - this is the format we use for text.  It allows us to have headers, lists, tables, links and images without learning HTML.
5. **Deploy Mkdocs GitHub Action** - [https://github.com/marketplace/actions/deploy-mkdocs](https://github.com/marketplace/actions/deploy-mkdocs) - this is the tool we use to automatically build our site after edits are checked in with Git.
6. **Git Book** - [https://git-scm.com/book/en/v2](https://git-scm.com/book/en/v2) - a useful book on Git.  Just read the first two chapters to learn how to check in new code.
7. **Conda** - [https://conda.io/](https://conda.io/) - this is a command line tool that keeps our Python libraries organized for each project.
8. **VS Code** - [https://code.visualstudio.com/](https://code.visualstudio.com/) - this is the integrated development environment we use to mange the files on our website.
9. **Markdown Paste** - [https://marketplace.visualstudio.com/items?itemName=telesoho.vscode-markdown-paste-image](https://marketplace.visualstudio.com/items?itemName=telesoho.vscode-markdown-paste-image) - this is the VS code extension we use to make sure we keep the markdown format generated by ChatGPT.
