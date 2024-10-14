# CSV to JSON Converter

This prompt generates a Python program that reads in a CSV file for
a graph and returns a JSON file in vis.js format.

## Prompt

```linenums="0"
I have a CSV file that has graph data in it.

The fields are:
ConceptID - the node id in a graph. Unique for all nodes. Required.
The ConceptName - a node label - Required
DependencyList - a pipe-delimited list of dependant ConceptIDs.  An edge goes from this concept to other concepts with a directed arrow.
CategoryID - a group ID for the concept.
CategoryLabel - the name of the category

There are about 11 Categories

ConceptID,ConceptName,DependencyList,CategoryID,CategoryLabel
1,Ohm's Law,2|3|4,1,Fundamental Concepts
2,Voltage,7,1,Fundamental Concepts
3,Current,7,1,Fundamental Concepts
4,Resistance,101,1,Fundamental Concepts
5,Power,2|3,1,Fundamental Concepts
6,Energy,5|102,1,Fundamental Concepts
7,Electric charge,120,1,Fundamental Concepts
8,Conductors,7,1,Fundamental Concepts
9,Insulators,7,1,Fundamental Concepts
10,Capacitance,2|7,1,Fundamental Concepts
11,Inductance,3|104,1,Fundamental Concepts

Please create a Python program that converts this CSV file into a JSON file that can be easily read by vis.js.  Assume that the category ID will become a group ID.
```

## ChatGPT Response

```python
import csv
import json

def csv_to_visjs_json(csv_filename, json_filename):
    nodes = []
    edges = []
    categories = {}

    # Read the CSV file
    with open(csv_filename, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Extract node information
            try:
                concept_id = int(row['ConceptID'])
            except ValueError:
                print(f"Invalid ConceptID '{row['ConceptID']}' skipped.")
                continue  # Skip rows with invalid ConceptID

            concept_name = row['ConceptName'].strip()
            if not concept_name:
                print(f"Empty ConceptName for ConceptID {concept_id} skipped.")
                continue  # Skip nodes without a name

            try:
                category_id = int(row['CategoryID'])
            except ValueError:
                print(f"Invalid CategoryID '{row['CategoryID']}' for ConceptID {concept_id} skipped.")
                continue  # Skip rows with invalid CategoryID

            category_label = row['CategoryLabel'].strip()

            # Create node object
            node = {
                'id': concept_id,
                'label': concept_name,
                'group': category_id
            }
            nodes.append(node)

            # Store category information (optional, for groups)
            if category_id not in categories:
                categories[category_id] = category_label

            # Process DependencyList to create edges
            dependency_list = row['DependencyList'].strip()
            if dependency_list:
                dependencies = dependency_list.split('|')
                for dep in dependencies:
                    dep = dep.strip()
                    if dep:
                        try:
                            dep_id = int(dep)
                            edge = {
                                'from': concept_id,
                                'to': dep_id
                            }
                            edges.append(edge)
                        except ValueError:
                            print(f"Invalid DependencyID '{dep}' for ConceptID {concept_id} skipped.")
                            continue  # Skip invalid DependencyIDs

    # Optionally, create a separate groups structure if needed
    # Uncomment the following lines if you want to include group labels
    """
    groups = []
    for cid, clabel in categories.items():
        group = {
            'id': cid,
            'label': clabel
            # You can add more styling options here if needed
        }
        groups.append(group)
    data = {
        'nodes': nodes,
        'edges': edges,
        'groups': groups
    }
    """
    
    # If not using separate groups, omit the 'groups' key
    data = {
        'nodes': nodes,
        'edges': edges
    }

    # Write the JSON output
    with open(json_filename, 'w', encoding='utf-8') as jsonfile:
        json.dump(data, jsonfile, indent=4)

    print(f"Successfully converted '{csv_filename}' to '{json_filename}'.")

if __name__ == "__main__":
    # Define input and output file names
    input_csv = 'graph-data.csv'
    output_json = 'graph-data.json'
    
    # Convert CSV to JSON
    csv_to_visjs_json(input_csv, output_json)
```

[Python Code](csv-to-json.py)