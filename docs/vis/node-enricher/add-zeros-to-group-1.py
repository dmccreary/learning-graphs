import json
import sys

def add_x_property(input_file, output_file):
    try:
        # Read the input JSON file
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Check if 'nodes' key exists
        if 'nodes' not in data:
            print(f"Error: The key 'nodes' was not found in {input_file}.")
            return
        
        # Iterate through each node and add "x": -300 if group is 1
        for node in data['nodes']:
            if node.get('group') == 1:
                node['x'] = -300
        
        # Write the modified data to the output JSON file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        
        print(f"Successfully wrote the modified JSON to {output_file}.")
    
    except FileNotFoundError:
        print(f"Error: The file {input_file} does not exist.")
    except json.JSONDecodeError:
        print(f"Error: The file {input_file} is not a valid JSON file.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

def main():
    # Default input and output file names
    input_file = 'graph-data.json'
    output_file = 'graph-data-enriched.json'
    
    # If command-line arguments are provided, use them
    if len(sys.argv) == 3:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
    elif len(sys.argv) != 1:
        print("Usage: python script.py [input_file output_file]")
        return
    
    add_x_property(input_file, output_file)

if __name__ == "__main__":
    main()
