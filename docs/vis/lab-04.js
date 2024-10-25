// Fetch data from the JSON file
fetch('lab-04.json')
    .then(response => response.json())
    .then(data => {
        // Parse the data from JSON
        const nodes = new vis.DataSet(data.nodes);
        
        // Define edges with additional properties
        const edges = new vis.DataSet([
            { from: 1, to: 3, label: 'Edge 1-3', color: { color: 'red' }, 
            width: 2, arrows: 'to' },

            { from: 1, to: 2, label: 'Edge 1-2', color: { color: 'blue', 
                highlight: 'purple' }, width: 3, 
                arrows: { to: { enabled: true, type: 'arrow' }, 
                from: { enabled: true, type: 'circle' } } },

            { from: 2, to: 4, label: 'Edge 2-4', color: { color: 'green' }, 
            width: 3, dashes: true, arrows: 'to'},

            { from: 2, to: 5, label: 'Edge 2-5', color: { color: 'orange', 
                hover: 'yellow' }, width: 4, arrows: 'middle' },

            { from: 3, to: 6, label: 'Edge 3-6', 
                color: { color: 'purple', opacity: 0.7 }, width: 2, arrows: 'to' }
        ]);

        // Create a network
        const container = document.getElementById('mynetwork');
        const networkData = {
            nodes: nodes,
            edges: edges
        };
        
        const options = {
            edges: {
                font: {
                    size: 14,
                    color: 'black',
                    align: 'horizontal'
                },
                smooth: {
                    type: 'cubicBezier',
                    forceDirection: 'horizontal',
                    roundness: 0.4
                }
            }
        };

        // Initialize the network
        const network = new vis.Network(container, networkData, options);
    })
    .catch(error => console.error('Error loading the network data:', error));
