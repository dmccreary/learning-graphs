// Book Build Workflow - Interactive Features

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
    }
});

// Tooltip definitions for each node
const tooltips = {
    'Course Description': 'Run the course-description-analyzer skill to get a quality score',
    'Learning Graph': 'Run the learning-graph-generator skill to generate the learning graph',
    'Chapter Structure': 'Run the book-chapter-generator skill to partition the graph into chapters',
    'Chapter 1': 'Run the chapter-content-generator skill to generate content for chapter 1',
    'Chapter 2': 'Run the chapter-content-generator skill to generate content for chapter 2',
    'Content Complete': 'This is the state when all chapters have been generated',
    'Glossary': 'Run the glossary-generator skill',
    'FAQ': 'Run the faq-generator skill',
    'Quizzes': 'Run the quiz-generator skill',
    'References': 'Run the reference-generator skill',
    'Diagrams': 'Run microsim-matcher on each diagram details description and try the best match',
    'Book Metrics': 'Run the book-metrics-generator shell scripts'
};

// Add tooltips to nodes after Mermaid renders
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Mermaid to render
    setTimeout(() => {
        const nodes = document.querySelectorAll('.node');

        nodes.forEach(node => {
            // Get the node's label text
            const labelElement = node.querySelector('text');
            if (labelElement) {
                const label = labelElement.textContent.trim();

                // Add tooltip if it exists for this label
                if (tooltips[label]) {
                    // Add title attribute for native browser tooltip
                    node.setAttribute('title', tooltips[label]);

                    // Add aria-label for accessibility
                    node.setAttribute('aria-label', `${label}: ${tooltips[label]}`);

                    // Visual indicator that tooltip exists (add pointer cursor)
                    node.style.cursor = 'help';
                }
            }

            // Add keyboard navigation support
            node.setAttribute('tabindex', '0');
            node.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const label = node.querySelector('text')?.textContent;
                    console.log(`Node selected: ${label}`);
                }
            });
        });
    }, 1000);
});
