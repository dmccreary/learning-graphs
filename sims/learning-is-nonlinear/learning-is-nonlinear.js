// Global variables
let network;
let nodesData;
let edgesData;
let originalEdgesData; // Store original edges for nonlinear mode
let currentMode = 'linear';

// Color scheme for different topic groups
const colorScheme = {
    foundations: '#e74c3c',      // Red
    derivatives: '#3498db',      // Blue
    applications: '#2ecc71',     // Green
    theorems: '#9b59b6',         // Purple
    integrals: '#e67e22',        // Orange
    transcendental: '#1abc9c',   // Turquoise
    advanced: '#f39c12',         // Yellow
    sequences: '#34495e'         // Dark gray
};

// Load data and initialize
async function init() {
    try {
        console.log('Loading data...');
        const response = await fetch('./learning-is-nonlinear.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data loaded:', data.nodes.length, 'nodes,', data.edges.length, 'edges');

        nodesData = new vis.DataSet(data.nodes.map(node => ({
            ...node,
            shape: 'ellipse',
            color: {
                background: colorScheme[node.group] || '#95a5a6',
                border: '#2c3e50',
                highlight: {
                    background: '#f1c40f',
                    border: '#f39c12'
                }
            },
            font: {
                color: '#000000',
                size: 16,
                face: 'Arial'
            },
            borderWidth: 2,
            size: 25
        })));

        // Store original edges for later use
        originalEdgesData = data.edges.map(edge => ({
            ...edge,
            arrows: 'from',
            font: {
                size: 8,
                align: 'middle'
            },
            color: {
                color: '#95a5a6',
                highlight: '#2c3e50'
            },
            smooth: {
                type: 'continuous'
            }
        }));

        edgesData = new vis.DataSet(originalEdgesData);

        createNetwork();
        setupEventListeners();

    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('mynetwork').innerHTML =
            '<p style="padding: 20px; color: red;">Error loading data. Please check the console.</p>';
    }
}

// Create the vis-network
function createNetwork() {
    const container = document.getElementById('mynetwork');
    console.log('Creating network, container:', container, 'dimensions:', container.offsetWidth, 'x', container.offsetHeight);

    const data = {
        nodes: nodesData,
        edges: edgesData
    };

    const options = getNetworkOptions();

    network = new vis.Network(container, data, options);
    console.log('Network created successfully');

    // Apply initial layout
    applyLayout(currentMode);
}

// Get network options based on current mode
function getNetworkOptions() {
    const baseOptions = {
        interaction: {
            navigationButtons: true,
            keyboard: true,
            zoomView: true,
            dragView: true
        }
    };

    if (currentMode === 'linear') {
        return {
            ...baseOptions,
            physics: {
                enabled: false
            },
            layout: {
                hierarchical: false
            },
            interaction: {
                ...baseOptions.interaction,
                dragNodes: false
            },
            edges: {
                smooth: {
                    type: 'continuous',
                    roundness: 0.5
                }
            }
        };
    } else {
        return {
            ...baseOptions,
            physics: {
                enabled: true,
                barnesHut: {
                    gravitationalConstant: -2000,
                    centralGravity: 0.3,
                    springLength: 95,
                    springConstant: 0.04,
                    damping: 0.09,
                    avoidOverlap: 0.5
                },
                stabilization: {
                    enabled: true,
                    iterations: 1000,
                    updateInterval: 25
                }
            },
            layout: {
                improvedLayout: true
            },
            interaction: {
                ...baseOptions.interaction,
                dragNodes: true
            },
            edges: {
                smooth: {
                    type: 'dynamic'
                }
            }
        };
    }
}

// Apply layout based on mode
function applyLayout(mode) {
    if (mode === 'linear') {
        applyLinearLayout();
    } else {
        applyNonlinearLayout();
    }
}

// Linear serpentine layout
function applyLinearLayout() {
    console.log('Applying linear layout');
    const nodes = nodesData.get();
    const containerWidth = document.getElementById('mynetwork').offsetWidth;
    const containerHeight = document.getElementById('mynetwork').offsetHeight;
    console.log('Container dimensions:', containerWidth, 'x', containerHeight);

    const cols = 8; // Number of columns in serpentine pattern
    const xSpacing = containerWidth / (cols + 1);
    const ySpacing = containerHeight / (Math.ceil(nodes.length / cols) + 1);

    // Create linear edges (sequential only)
    const linearEdges = [];
    for (let i = 1; i < 40; i++) {
        linearEdges.push({
            from: i,
            to: i + 1,
            label: 'DEPENDS_ON',
            arrows: 'from',
            font: { size: 8, align: 'middle' },
            color: { color: '#95a5a6', highlight: '#2c3e50' },
            smooth: { type: 'continuous', roundness: 0.5 }
        });
    }
    edgesData.clear();
    edgesData.add(linearEdges);

    // Position nodes in serpentine pattern
    nodes.forEach((node, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;

        // Alternate direction for serpentine effect
        const xPos = (row % 2 === 0)
            ? (col + 1) * xSpacing
            : (cols - col) * xSpacing;

        const yPos = (row + 1) * ySpacing;

        nodesData.update({
            id: node.id,
            x: xPos,
            y: yPos,
            fixed: { x: true, y: true }
        });
    });

    network.setOptions(getNetworkOptions());

    // Center the view on the network
    setTimeout(() => {
        network.fit({
            animation: {
                duration: 500,
                easingFunction: 'easeInOutQuad'
            }
        });
    }, 100);

    console.log('Linear layout applied');
}

// Nonlinear force-directed layout
function applyNonlinearLayout() {
    console.log('Applying nonlinear layout');

    // Restore original edges
    edgesData.clear();
    edgesData.add(originalEdgesData.map(edge => ({
        ...edge,
        smooth: { type: 'dynamic' }
    })));

    // Unfix all nodes except node 1 (Limits)
    const nodes = nodesData.get();
    nodes.forEach(node => {
        if (node.id === 1) {
            // Pin "Limits" to the left
            nodesData.update({
                id: node.id,
                x: -400,
                y: 0,
                fixed: { x: true, y: false }
            });
        } else {
            nodesData.update({
                id: node.id,
                fixed: { x: false, y: false }
            });
        }
    });

    network.setOptions(getNetworkOptions());

    // Fit the view after stabilization
    network.once('stabilizationIterationsDone', function() {
        network.fit({
            animation: {
                duration: 500,
                easingFunction: 'easeInOutQuad'
            }
        });
    });

    network.stabilize();
    console.log('Nonlinear layout applied');
}

// Setup event listeners for radio buttons
function setupEventListeners() {
    document.getElementById('linear').addEventListener('change', function() {
        if (this.checked) {
            currentMode = 'linear';
            applyLayout('linear');
        }
    });

    document.getElementById('nonlinear').addEventListener('change', function() {
        if (this.checked) {
            currentMode = 'nonlinear';
            applyLayout('nonlinear');
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
