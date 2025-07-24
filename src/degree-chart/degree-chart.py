import json
import matplotlib.pyplot as plt
import networkx as nx
import argparse

# Function to load vis.js JSON and create a degree histogram
def draw_degree_histogram_from_file(json_file):
    # Load the JSON data
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    # Create a NetworkX graph
    G = nx.Graph()
    for node in data['nodes']:
        G.add_node(node['id'])
    for edge in data['edges']:
        G.add_edge(edge['from'], edge['to'])
    
    # Calculate the degree of each node
    degrees = [degree for _, degree in G.degree()]
    
    # Create the histogram
    plt.figure(figsize=(8, 6))
    plt.hist(degrees, bins=range(min(degrees), max(degrees) + 2), edgecolor='black', align='left')
    plt.title('Degree Histogram')
    plt.xlabel('Degree')
    plt.ylabel('Count')
    plt.xticks(range(min(degrees), max(degrees) + 1))
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.show()

# Command-line interface
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Draw a degree histogram from a vis.js JSON file.")
    parser.add_argument("json_file", help="Path to the vis.js JSON file containing the graph data")
    args = parser.parse_args()

    # Call the function with the specified file
    draw_degree_histogram_from_file(args.json_file)

