<!DOCTYPE html>
<html>
<head>
    <title>Data Storytelling Knowledge Graph</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css" />
    <style>
        #mynetwork {
            width: 100%;
            height: 800px;
            border: 1px solid lightgray;
        }
    </style>
</head>
<body>
<h1>Data Storytelling Knowledge Graph</h1>
<div id="mynetwork"></div>
<script>
    // Define nodes with main groups, subgroups, and sub-nodes
    var nodes = new vis.DataSet([
        // Main Group
        { id: 1, label: "Data Collection and Preparation", group: "Main" },
        
        // Sub-Groups
        { id: 2, label: "Data Sources", group: "Sub" },
        { id: 3, label: "Data Types", group: "Sub" },
        { id: 4, label: "Data Quality", group: "Sub" },
        { id: 5, label: "Data Cleaning", group: "Sub" },
        { id: 6, label: "Data Transformation", group: "Sub" },

        // Sub-Nodes under Data Sources
        { id: 7, label: "APIs", group: "Leaf" },
        { id: 8, label: "Databases", group: "Leaf" },
        { id: 9, label: "Spreadsheets", group: "Leaf" },
        { id: 10, label: "Sensors", group: "Leaf" },

        // Sub-Nodes under Data Types
        { id: 11, label: "Structured", group: "Leaf" },
        { id: 12, label: "Unstructured", group: "Leaf" },
        { id: 13, label: "Semi-structured", group: "Leaf" },

        // Sub-Nodes under Data Quality
        { id: 14, label: "Accuracy", group: "Leaf" },
        { id: 15, label: "Completeness", group: "Leaf" },
        { id: 16, label: "Consistency", group: "Leaf" },

        // Sub-Nodes under Data Cleaning
        { id: 17, label: "Removing Duplicates", group: "Leaf" },
        { id: 18, label: "Handling Missing Values", group: "Leaf" },
        { id: 19, label: "Outlier Detection", group: "Leaf" },

        // Sub-Nodes under Data Transformation
        { id: 20, label: "Normalization", group: "Leaf" },
        { id: 21, label: "Aggregation", group: "Leaf" },
        { id: 22, label: "Encoding", group: "Leaf" },

        { id: 23, label: "Data Analysis", group: "Main" },
        { id: 24, label: "Statistical Analysis", group: "Sub" },
        { id: 25, label: "Exploratory Data Analysis (EDA)", group: "Sub" },
        { id: 26, label: "Techniques", group: "Sub" },
        { id: 27, label: "Tools", group: "Sub" },

        {id: 28, label: "Modeling", group: "Sub" },

        // Nodes under Statistical Analysis
        { id: 29, label: "Mean", group: "Statistical Analysis" },
        { id: 30, label: "Median", group: "Statistical Analysis" },
        { id: 31, label: "Standard Deviation", group: "Statistical Analysis" },
        { id: 32, label: "Correlation", group: "Statistical Analysis" },

            // Nodes under EDA
        { id: 33, label: "Histograms", group: "EDA" },
        { id: 34, label: "Box Plots", group: "EDA" },
        { id: 35, label: "Scatter Plots", group: "EDA" },

            // Nodes under Techniques
        { id: 36, label: "Clustering", group: "Techniques" },
        { id: 37, label: "Regression", group: "Techniques" },
        { id: 38, label: "Classification", group: "Techniques" },

            // Nodes under Tools
        { id: 39, label: "Excel", group: "Tools" },
        { id: 40, label: "R", group: "Tools" },
        { id: 41, label: "Python (Scikit-learn)", group: "Tools" },
        { id: 42, label: "SAS", group: "Tools" },

        //Nodes under Modelling

        { id: 43, label: "Regression", group: "modeling"},
        { id: 44, label: "Classification", group: "modeling" },
        { id: 45, label: "Clustering", group: "modeling" },

        { id: 46, label: "Visualization Techniques", group: "Main" },
        { id: 47, label: "Chart Types", group: "Sub" },
        { id: 48, label: "Advanced Visuals", group: "Sub" },
        { id: 49, label: "Dashboards", group: "Sub" },
        { id: 50, label: "Tools", group: "Sub" },
        { id: 51, label: "Model Interpretability", group: "Sub" },
        { id: 52, label: "Feature Importance Plots", group: "Sub" },
        { id: 53, label: "Confusion Matrix Visualization", group: "Sub" },
        { id: 54, label: "Clustering Visualization", group: "Sub" },

        // Chart Types Leaf Nodes
        { id: 55, label: "Bar Chart", group: "Leaf" },
        { id: 56, label: "Line Chart", group: "Leaf" },
        { id: 57, label: "Pie Chart", group: "Leaf" },
        { id: 58, label: "Scatter Plot", group: "Leaf" },
        { id: 59, label: "Heatmap", group: "Leaf" },
        { id: 60, label: "Bubble Chart", group: "Leaf" },

        // Advanced Visuals Leaf Nodes
        { id: 61, label: "Tree Maps", group: "Leaf" },
        { id: 62, label: "Chord Diagrams", group: "Leaf" },
        { id: 63, label: "Network Graphs", group: "Leaf" },

        // Dashboards Leaf Nodes
        { id: 64, label: "Real-time Dashboards", group: "Leaf" },
        { id: 65, label: "KPI Dashboards", group: "Leaf" },

        // Tools Leaf Nodes
        { id: 66, label: "Tableau", group: "Leaf" },
        { id: 67, label: "Power BI", group: "Leaf" },
        { id: 68, label: "D3.js", group: "Leaf" },
        { id: 69, label: "Matplotlib", group: "Leaf" },
        { id: 70, label: "Seaborn", group: "Leaf" },

        // Model Interpretability Leaf Nodes
        { id: 71, label: "SHAP", group: "Leaf" },
        { id: 72, label: "LIME", group: "Leaf" },

        // Feature Importance Plots Leaf Nodes
        { id: 73, label: "Gain Charts", group: "Leaf" },
        { id: 74, label: "Permutation Importance", group: "Leaf" },

        // Confusion Matrix Visualization Leaf Nodes
        { id: 75, label: "ROC Curve", group: "Leaf" },
        { id: 76, label: "Precision-Recall Curve", group: "Leaf" },

        // Clustering Visualization Leaf Nodes
        { id: 77, label: "Dendrograms", group: "Leaf" },
        { id: 78, label: "Silhouette Analysis", group: "Leaf" },

        // Narrative Structure
        { id: 79, label: "Narrative Structure", group: "Main" },
        { id: 80, label: "Story Components", group: "Sub" },
        { id: 81, label: "Hooks", group: "Sub"},
        { id: 82, label: "Context", group: "Sub"},
        { id: 83, label: "Techniques", group: "Sub"},
        { id: 84, label: "Setup", group: "Leaf" },
        { id: 85, label: "Conflict", group: "Leaf" },
        { id: 86, label: "Resolution", group: "Leaf" },
        { id: 87, label: "Surprising Stats", group: "Leaf" },
        { id: 88, label: "Questions", group: "Leaf" },
        { id: 89, label: "Visual Anomalies", group: "Leaf" },
        { id: 90, label: "Historical Trends", group: "Leaf" },
        { id: 91, label: "Industry Benchmarks", group: "Leaf" },
        { id: 92, label: "Chronological Storytelling", group: "Leaf" },
        { id: 93, label: "Cause-Effect", group: "Leaf" },
        { id: 94, label: "Contrast", group: "Leaf" },

        { id: 95, label: "Audience Engagement", group: "Main" },
        { id: 96, label: "Audience Types", group: "Sub" },
        { id: 97, label: "Personalization", group: "Sub" },
        { id: 98, label: "Feedback Loops", group: "Sub" },
        { id: 99, label: "Executives", group: "Leaf" },
        { id: 100, label: "Analysts", group: "Leaf" },
        { id: 101, label: "General Public", group: "Leaf" },
        { id: 102, label: "Localization", group: "Leaf" },
        { id: 103, label: "Relevance", group: "Leaf" },
        { id: 104, label: "Accessibility", group: "Leaf" },
        { id: 105, label: "Polls", group: "Leaf" },
        { id: 106, label: "Comments", group: "Leaf" },
        { id: 107, label: "Live Q&A", group: "Leaf" },

        { id: 108, label: "Technologies and Tools", group: "Main" },
        { id: 109, label: "AI and Automation", group: "Sub" },
        { id: 110, label: "GPT for Narrative Generation", group: "Leaf" },
        { id: 111, label: "LLMs for Summarization", group: "Leaf" },
        { id: 112, label: "Tools", group: "Sub" },
        { id: 113, label: "Canva", group: "Leaf" },
        { id: 114, label: "Infogram", group: "Leaf" },
        { id: 115, label: "Flourish", group: "Leaf" },
        { id: 116, label: "Streamlit for Dynamic Visualizations", group: "Leaf" },

        { id: 117, label: "Ethics and Bias", group: "Main" },
        { id: 118, label: "Bias Types", group: "Sub" },
        { id: 119, label: "Sampling Bias", group: "Leaf" },
        { id: 120, label: "Algorithmic Bias", group: "Leaf" },
        { id: 121, label: "Ethics", group: "Sub" },
        { id: 122, label: "Data Privacy", group: "Leaf" },
        { id: 123, label: "Transparency", group: "Leaf" },
        { id: 124, label: "Misleading Visuals", group: "Leaf" },
        { id: 125, label: "Frameworks", group: "Sub" },
        { id: 126, label: "FAIR Principles", group: "Leaf" },

        { id: 127, label: "Interactivity and Advanced Features", group: "Main" },
        { id: 128, label: "Interactive Charts", group: "Sub" },
        { id: 129, label: "Zoom", group: "Leaf" },
        { id: 130, label: "Hover Effects", group: "Leaf" },
        { id: 131, label: "Drill-Down Features", group: "Sub" },
        { id: 132, label: "Hierarchical Data Exploration", group: "Leaf" },
        { id: 133, label: "User Inputs", group: "Sub" },
        { id: 134, label: "Filters", group: "Leaf" },
        { id: 135, label: "Dynamic Parameters", group: "Leaf" },
        
        //Data Source Extended
        { id: 136, label: "Feature Engineering", group: "Sub" },
        { id: 137, label: "Feature Selection", group: "Leaf" },
        { id: 138, label: "Feature Scaling", group: "Leaf" },
        { id: 139, label: "Feature Extraction", group: "Leaf" },

        // Synthetic Data
        { id: 140, label: "Synthetic Data", group: "Sub" },
        { id: 141, label: "GANs", group: "Leaf" },
        { id: 142, label: "Data Augmentation", group: "Leaf" },

        // Data Labeling
        { id: 143, label: "Data Labeling", group: "Sub" },
        { id: 144, label: "Manual Labeling", group: "Leaf" },
        { id: 145, label: "Automated Labeling", group: "Leaf" },
        { id: 146, label: "Crowdsourced Labeling", group: "Leaf" },

        // Data Imbalance Solutions
        { id: 147, label: "Data Imbalance Solutions", group: "Sub" },
        { id: 148, label: "SMOTE", group: "Leaf" },
        { id: 149, label: "Oversampling", group: "Leaf" },
        { id: 150, label: "Undersampling", group: "Leaf" },

          // Add nodes for Modeling
        { id: 151, label: "Supervised Learning", group: "Sub" },
        { id: 152, label: "Regression", group: "Leaf" },
        { id: 153, label: "Classification", group: "Leaf" },

        { id: 154, label: "Unsupervised Learning", group: "Sub" },
        { id: 155, label: "K-Means", group: "Leaf" },
        { id: 156, label: "DBSCAN", group: "Leaf" },
        { id: 157, label: "Hierarchical Clustering", group: "Leaf" },

        { id: 158, label: "Deep Learning", group: "Sub" },
        { id: 159, label: "Neural Networks", group: "Leaf" },
        { id: 160, label: "CNNs", group: "Leaf" },
        { id: 161, label: "RNNs", group: "Leaf" },
        { id: 162, label: "Transformers", group: "Leaf" },

        { id: 163, label: "Dimensionality Reduction", group: "Sub" },
        { id: 164, label: "PCA", group: "Leaf" },
        { id: 165, label: "t-SNE", group: "Leaf" },
        { id: 166, label: "UMAP", group: "Leaf" },

        { id: 167, label: "Time-Series Analysis", group: "Sub" },
        { id: 168, label: "ARIMA", group: "Leaf" },
        { id: 169, label: "LSTMs for Forecasting", group: "Leaf" },

        { id: 170, label: "Model Evaluation Metrics", group: "Sub" },
        { id: 171, label: "Accuracy", group: "Leaf" },
        { id: 172, label: "Precision", group: "Leaf" },
        { id: 173, label: "Recall", group: "Leaf" },
        { id: 174, label: "F1-Score", group: "Leaf" },
        { id: 175, label: "RMSE", group: "Leaf" }
    ]);


    // Define edges to connect nodes logically
    var edges = new vis.DataSet([
        // Connect Main Group to Sub-Groups
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 1, to: 4 },
        { from: 1, to: 5 },
        { from: 1, to: 6 },
        { from: 1, to: 136 },
        { from: 1, to: 140 },
        { from: 1, to: 143 },
        { from: 1, to: 147 },

        { from: 28, to: 29 },
        { from: 28, to: 30 },
        { from: 28, to: 31 },
        { from: 28, to: 32 },

        // Connect Sub-Groups to Sub-Nodes
        { from: 2, to: 7 },
        { from: 2, to: 8 },
        { from: 2, to: 9 },
        { from: 2, to: 10 },

        { from: 3, to: 11 },
        { from: 3, to: 12 },
        { from: 3, to: 13 },

        { from: 4, to: 14 },
        { from: 4, to: 15 },
        { from: 4, to: 16 },

        { from: 5, to: 17 },
        { from: 5, to: 18 },
        { from: 5, to: 19 },

        { from: 6, to: 20 },
        { from: 6, to: 21 },
        { from: 6, to: 22 },

        { from: 23, to: 24 },
        { from: 23, to: 25 },
        { from: 23, to: 26 },
        { from: 23, to: 27 },

        { from: 24, to: 29 },
        { from: 24, to: 30 },
        { from: 24, to: 31 },
        { from: 24, to: 32 },

        { from: 25, to: 33 },
        { from: 25, to: 34 },
        { from: 25, to: 35 },

        { from: 26, to: 36 },
        { from: 26, to: 37 },
        { from: 26, to: 38 },

        { from: 27, to: 39 },
        { from: 27, to: 40 },
        { from: 27, to: 41 },
        { from: 27, to: 42 },

        { from: 28, to: 43 },
        { from: 28, to: 44 },
        { from: 28, to: 45 },

        { from: 46, to: 47 },
        { from: 46, to: 48 },
        { from: 46, to: 49 },
        { from: 46, to: 50 },
        { from: 46, to: 51 },
        { from: 46, to: 52 },
        { from: 46, to: 53 },
        { from: 46, to: 54 },

            // Connections for Chart Types
        { from: 47, to: 55 },
        { from: 47, to: 56 },
        { from: 47, to: 57 },
        { from: 47, to: 58 },
        { from: 47, to: 59 },
        { from: 47, to: 60 },

            // Connections for Advanced Visuals
        { from: 48, to: 61 },
        { from: 48, to: 62 },
        { from: 48, to: 63 },

            // Connections for Dashboards
        { from: 49, to: 64 },
        { from: 49, to: 65 },

            // Connections for Tools
        { from: 50, to: 66 },
        { from: 50, to: 67 },
        { from: 50, to: 68 },
        { from: 50, to: 69 },
        { from: 50, to: 70 },

            // Connections for Model Interpretability
        { from: 51, to: 71 },
        { from: 51, to: 72 },

            // Connections for Feature Importance Plots
        { from: 52, to: 73 },
        { from: 52, to: 74 },

            // Connections for Confusion Matrix Visualization
        { from: 53, to: 75 },
        { from: 53, to: 76 },

            // Connections for Clustering Visualization
        { from: 54, to: 77 },
        { from: 54, to: 78 },

        { from: 79, to: 80 },
        { from: 79, to: 81 },
        { from: 79, to: 82 },
        { from: 79, to: 83 },
        { from: 80, to: 84 },
        { from: 80, to: 85 },
        { from: 80, to: 86 },
        { from: 81, to: 87 },
        { from: 81, to: 88 },
        { from: 81, to: 89 },
        { from: 82, to: 90 },
        { from: 82, to: 91 },
        { from: 83, to: 92 },
        { from: 83, to: 93 },
        { from: 83, to: 94 },

        { from: 95, to: 96 },
        { from: 95, to: 97 },
        { from: 95, to: 98 },
        { from: 96, to: 99 },
        { from: 96, to: 100 },
        { from: 96, to: 101 },
        { from: 97, to: 102 },
        { from: 97, to: 103 },
        { from: 97, to: 104 },
        { from: 98, to: 105 },
        { from: 98, to: 106 },
        { from: 98, to: 107 },

        { from: 108, to: 109 },
        { from: 109, to: 110 },
        { from: 109, to: 111 },
        { from: 108, to: 112 },
        { from: 112, to: 113 },
        { from: 112, to: 114 },
        { from: 112, to: 115 },
        { from: 112, to: 116 },

        { from: 117, to: 118 },
        { from: 118, to: 119 },
        { from: 118, to: 120 },
        { from: 117, to: 121 },
        { from: 121, to: 122 },
        { from: 121, to: 123 },
        { from: 121, to: 124 },
        { from: 117, to: 125 },
        { from: 125, to: 126 },

        { from: 127, to: 128 },
        { from: 128, to: 129 },
        { from: 128, to: 130 },
        { from: 127, to: 131 },
        { from: 131, to: 132 },
        { from: 127, to: 133 },
        { from: 133, to: 134 },
        { from: 133, to: 135 },

        // Feature Engineering Edges
        { from: 136, to: 137 },
        { from: 136, to: 138 },
        { from: 136, to: 139 },

        // Synthetic Data Edges
        { from: 140, to: 141 },
        { from: 140, to: 142 },

        // Data Labeling Edges
        { from: 143, to: 144 },
        { from: 143, to: 145 },
        { from: 143, to: 146 },

        // Data Imbalance Solutions Edges
        { from: 147, to: 148 },
        { from: 147, to: 149 },
        { from: 147, to: 150 },

        { from: 28, to: 151 }, // Modeling -> Supervised Learning
        { from: 151, to: 152 }, // Supervised Learning -> Regression
        { from: 151, to: 153 }, // Supervised Learning -> Classification

        { from: 28, to: 154 }, // Modeling -> Unsupervised Learning
        { from: 154, to: 155 }, // Unsupervised Learning -> K-Means
        { from: 154, to: 156 }, // Unsupervised Learning -> DBSCAN
        { from: 154, to: 157 }, // Unsupervised Learning -> Hierarchical Clustering

        { from: 28, to: 158 }, // Modeling -> Deep Learning
        { from: 158, to: 159 }, // Deep Learning -> Neural Networks
        { from: 158, to: 160 }, // Deep Learning -> CNNs
        { from: 158, to: 161 }, // Deep Learning -> RNNs
        { from: 158, to: 162 }, // Deep Learning -> Transformers

        { from: 28, to: 163 }, // Modeling -> Dimensionality Reduction
        { from: 163, to: 164 }, // Dimensionality Reduction -> PCA
        { from: 163, to: 165 }, // Dimensionality Reduction -> t-SNE
        { from: 163, to: 166 }, // Dimensionality Reduction -> UMAP

        { from: 28, to: 167 }, // Modeling -> Time-Series Analysis
        { from: 167, to: 168 }, // Time-Series Analysis -> ARIMA
        { from: 167, to: 169 }, // Time-Series Analysis -> LSTMs for Forecasting

        { from: 28, to: 170 }, // Modeling -> Model Evaluation Metrics
        { from: 170, to: 171 }, // Model Evaluation Metrics -> Accuracy
        { from: 170, to: 172 }, // Model Evaluation Metrics -> Precision
        { from: 170, to: 173 }, // Model Evaluation Metrics -> Recall
        { from: 170, to: 174 }, // Model Evaluation Metrics -> F1-Score
        { from: 170, to: 175 }  // Model Evaluation Metrics -> RMSE
    ]);

    // Create a network
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        groups: {
            Main: { color: { background: "#FF6F61" }, font: { color: "#fff" } },
            Sub: { color: { background: "#6BAED6" }, font: { color: "#fff" } },
            Leaf: { color: { background: "#FDD835" }, font: { color: "#000" } }
        },
        physics: {
            enabled: true,
            solver: "forceAtlas2Based"
        },
        interaction: {
            hover: true
        }
    };
    var network = new vis.Network(container, data, options);
</script>
</body>
</html>
