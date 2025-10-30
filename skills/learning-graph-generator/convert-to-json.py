#!/usr/bin/env python3
"""
Convert CSV Learning Graph to JSON for vis.js

Converts the concept dependency CSV into the JSON format
used by the existing graph viewer (vis.js network format).
"""

import csv
import json
from typing import Dict, List


def csv_to_json(csv_path: str, json_path: str, color_config: dict = None):
    """
    Convert CSV dependency graph to vis.js JSON format.

    Args:
        csv_path: Path to input CSV file
        json_path: Path to output JSON file
        color_config: Optional dictionary mapping taxonomy IDs to colors.
                     If not provided, uses default color scheme.
    """
    # Default taxonomy group colors for visualization
    default_colors = {
        'MISC': '#b2bec3',      # Light gray - misc/default
        'FOUNDATION': '#ff6b6b', # Red
        'CORE': '#4ecdc4',      # Cyan
        'INTERMEDIATE': '#45b7d1', # Blue
        'ADVANCED': '#96ceb4',  # Green
        'APPLIED': '#00b894',   # Teal
        'SPECIALIZED': '#a29bfe' # Purple
    }

    taxonomy_colors = color_config if color_config is not None else default_colors

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


def create_taxonomy_legend(color_config: dict = None, taxonomy_names: dict = None):
    """
    Generate a legend of taxonomy colors for documentation.

    Args:
        color_config: Dictionary mapping taxonomy IDs to colors
        taxonomy_names: Dictionary mapping taxonomy IDs to full names
    """
    default_colors = {
        'MISC': '#b2bec3',
        'FOUNDATION': '#ff6b6b',
        'CORE': '#4ecdc4',
        'INTERMEDIATE': '#45b7d1',
        'ADVANCED': '#96ceb4',
        'APPLIED': '#00b894',
        'SPECIALIZED': '#a29bfe'
    }

    default_names = {
        'MISC': 'Miscellaneous',
        'FOUNDATION': 'Foundation Concepts',
        'CORE': 'Core Concepts',
        'INTERMEDIATE': 'Intermediate Topics',
        'ADVANCED': 'Advanced Topics',
        'APPLIED': 'Applied Concepts',
        'SPECIALIZED': 'Specialized Topics'
    }

    colors = color_config if color_config is not None else default_colors
    names = taxonomy_names if taxonomy_names is not None else default_names

    print("\n## Taxonomy Color Legend\n")
    print("| TaxonomyID | Category | Color |")
    print("|------------|----------|-------|")
    for tax_id in sorted(colors.keys()):
        name = names.get(tax_id, tax_id)
        color = colors[tax_id]
        print(f"| {tax_id} | {name} | {color} |")


if __name__ == "__main__":
    import sys

    # Parse command line arguments
    if len(sys.argv) < 3:
        print("Usage: python convert-to-json.py <input_csv> <output_json> [color_config.json]")
        print("\nExample:")
        print("  python convert-to-json.py data/concept-dependencies.csv output/learning-graph.json")
        print("\nOptional color_config.json format:")
        print(json.dumps({
            'FOUNDATION': '#ff6b6b',
            'CORE': '#4ecdc4',
            'ADVANCED': '#96ceb4'
        }, indent=2))
        sys.exit(1)

    csv_path = sys.argv[1]
    json_path = sys.argv[2]

    # Load color config if provided
    color_config = None
    if len(sys.argv) > 3:
        config_file = sys.argv[3]
        with open(config_file, 'r', encoding='utf-8') as f:
            color_config = json.load(f)
        print(f"📋 Loaded color config from: {config_file}")

    graph_data = csv_to_json(csv_path, json_path, color_config)
    create_taxonomy_legend(color_config)

    print("\n✅ Ready to use with graph viewer!")
