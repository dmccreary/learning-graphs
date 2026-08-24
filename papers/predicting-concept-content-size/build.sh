#!/bin/bash
# Build script for "Predicting Concept Content Size" ArXiv paper.
# Uses Tectonic for modern LaTeX compilation.

set -e

cd "$(dirname "$0")"

echo "Building paper..."
echo "=================="
echo ""

if ! command -v tectonic &> /dev/null; then
    echo "Error: Tectonic is not installed."
    echo "Install with: brew install tectonic"
    exit 1
fi

if [ "$1" == "clean" ]; then
    echo "Cleaning build artifacts..."
    rm -f main.pdf main.aux main.log main.out main.bbl main.blg
    echo "Clean complete."
    exit 0
fi

echo "Running tectonic..."
tectonic main.tex

if [ -f "main.pdf" ]; then
    echo ""
    echo "Success! PDF generated: main.pdf"
    echo "File size: $(du -h main.pdf | cut -f1)"
    echo "Page count: $(pdfinfo main.pdf 2>/dev/null | grep Pages | awk '{print $2}')"
else
    echo ""
    echo "Error: PDF generation failed!"
    exit 1
fi
