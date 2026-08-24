// KaTeX auto-render configuration
// Single $ is NOT used for math to allow currency notation like $20
// Use \(...\) for inline math and $$...$$ or \[...\] for display math
document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "\\[", right: "\\]", display: true},
            {left: "\\(", right: "\\)", display: false}
        ],
        throwOnError: false
    });
});
