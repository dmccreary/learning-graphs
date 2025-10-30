#!/usr/bin/env python3
"""
Convert CSV Learning Graph to JSON for vis.js

Converts the concept dependency CSV into the JSON format
used by the existing graph viewer (vis.js network format).
"""

import csv
import json
from typing import Dict, List


def csv_to_json(csv_path: str, json_path: str):
    """Convert CSV dependency graph to vis.js JSON format."""

    # Taxonomy group colors for visualization
    taxonomy_colors = {
        'MATH': '#ff6b6b',      # Red - foundations
        'SIG': '#4ecdc4',       # Cyan - signals
        'SYS': '#45b7d1',       # Blue - systems
        'SAMP': '#96ceb4',      # Green - sampling
        'FOUR': '#ffeaa7',      # Yellow - Fourier
        'TRANS': '#dfe6e9',     # Gray - other transforms
        'FILT': '#a29bfe',      # Purple - filtering
        'FDES': '#fd79a8',      # Pink - filter design
        'ADV': '#fdcb6e',       # Orange - advanced
        'APP': '#00b894',       # Teal - applications
        'AI': '#6c5ce7',        # Indigo - AI/ML
        'MISC': '#b2bec3'       # Light gray - misc
    }

    # Read CSV
    nodes = []
    edges = []
    foundational_ids = []

    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            concept_id = int(row['ConceptID'])
            label = row['ConceptLabel']
            taxonomy = row['TaxonomyID']
            dependencies_str = row['Dependencies']

            # Determine if foundational (no dependencies)
            is_foundational = (dependencies_str == '')
            if is_foundational:
                foundational_ids.append(concept_id)

            # Create node
            node = {
                'id': concept_id,
                'label': label,
                'group': taxonomy.lower(),
                'title': f"{label} ({taxonomy})"  # Tooltip
            }

            # Special styling for foundational concepts
            if is_foundational:
                node['shape'] = 'box'
                node['color'] = taxonomy_colors.get(taxonomy, '#b2bec3')
                node['font'] = {'color': 'white'}

            nodes.append(node)

            # Create edges (from concept to its prerequisites)
            if dependencies_str:
                prereq_ids = [int(pid) for pid in dependencies_str.split('|')]
                for prereq_id in prereq_ids:
                    edge = {
                        'from': concept_id,
                        'to': prereq_id
                    }
                    edges.append(edge)

    # Create final JSON structure
    graph_data = {
        'nodes': nodes,
        'edges': edges
    }

    # Write JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(graph_data, f, indent=2)

    print(f"✅ JSON graph created: {json_path}")
    print(f"   - {len(nodes)} nodes")
    print(f"   - {len(edges)} edges")
    print(f"   - {len(foundational_ids)} foundational concepts")
    print(f"\nFoundational concept IDs: {foundational_ids}")

    return graph_data


def create_taxonomy_legend():
    """Generate a legend of taxonomy colors for documentation."""

    taxonomy_info = [
        ('MATH', 'Mathematical Foundations', '#ff6b6b'),
        ('SIG', 'Signal Fundamentals', '#4ecdc4'),
        ('SYS', 'Systems Theory', '#45b7d1'),
        ('SAMP', 'Sampling and Quantization', '#96ceb4'),
        ('FOUR', 'Fourier Analysis', '#ffeaa7'),
        ('TRANS', 'Other Transforms', '#dfe6e9'),
        ('FILT', 'Filtering Fundamentals', '#a29bfe'),
        ('FDES', 'Filter Design', '#fd79a8'),
        ('ADV', 'Advanced DSP Topics', '#fdcb6e'),
        ('APP', 'Applications', '#00b894'),
        ('AI', 'AI and Machine Learning', '#6c5ce7'),
        ('MISC', 'Miscellaneous', '#b2bec3')
    ]

    print("\n## Taxonomy Color Legend\n")
    print("| TaxonomyID | Category | Color |")
    print("|------------|----------|-------|")
    for tax_id, name, color in taxonomy_info:
        print(f"| {tax_id} | {name} | {color} |")


if __name__ == "__main__":
    import sys

    csv_path = "/Users/danmccreary/Documents/ws/signal-processing/data/concept-dependencies.csv"
    json_path = "/Users/danmccreary/Documents/ws/signal-processing/data/learning-graph.json"

    if len(sys.argv) > 1:
        csv_path = sys.argv[1]
    if len(sys.argv) > 2:
        json_path = sys.argv[2]

    graph_data = csv_to_json(csv_path, json_path)
    create_taxonomy_legend()

    print("\n✅ Ready to use with graph viewer!")
    print(f"   Copy {json_path} to /docs/sims/graph-viewer/ to visualize")
