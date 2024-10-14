// Fetch data from the JSON file
fetch('lab-02.json')
    .then(response => response.json())
    .then(data => {
        // Parse the data from JSON
        const nodes = new vis.DataSet(data.nodes);
        const edges = new vis.DataSet(data.edges);

        // Create a network
        const container = document.getElementById('mynetwork');
        const networkData = {
            nodes: nodes,
            edges: edges
        };
        const options = {};

        // Initialize the network
        const network = new vis.Network(container, networkData, options);
    })
    .catch(error => console.error('Error loading the network data:', error));
// end