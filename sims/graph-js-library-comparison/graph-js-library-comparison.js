// Graph JS Library Comparison MicroSim Table Renderer
// CANVAS_HEIGHT: 530

class LibraryComparisonTable {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.sortColumn = 'name'; // default sort column
        this.sortDirection = 'asc'; // 'asc' or 'desc'
        this.filterQuery = '';

        // Complete detailed library dataset
        this.libraries = [
            {
                id: 'vis',
                name: 'vis-network',
                target: 'Rapid interactive exploration',
                tech: 'Canvas',
                license: 'MIT / Apache 2.0',
                licenseType: 'MIT',
                size: '75 KB',
                sizeVal: 75,
                react: 'Third-party wrappers',
                physics: 'Yes',
                scale: '1,000',
                scaleVal: 1000,
                logoBg: '#ff9800',
                logoSvg: '<svg viewBox="0 0 100 100" width="16" height="16"><circle cx="25" cy="50" r="10" fill="#fff"/><circle cx="75" cy="25" r="10" fill="#fff"/><circle cx="75" cy="75" r="10" fill="#fff"/><line x1="25" y1="50" x2="75" y2="25" stroke="#fff" stroke-width="6"/><line x1="25" y1="50" x2="75" y2="75" stroke="#fff" stroke-width="6"/></svg>'
            },
            {
                id: 'd3',
                name: 'D3.js (d3-force)',
                target: 'Custom data storytelling',
                tech: 'SVG / Canvas',
                techType: 'SVG',
                license: 'ISC',
                licenseType: 'ISC',
                size: '75 KB',
                sizeVal: 75,
                react: 'Imperative integration',
                physics: 'Yes',
                scale: '2,000',
                scaleVal: 2000,
                logoBg: '#f57c00',
                logoSvg: '<svg viewBox="0 0 100 100" width="16" height="16"><path d="M10,20 L40,80 L90,20" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            },
            {
                id: 'reactflow',
                name: 'React Flow',
                target: 'Node-based workflow editors',
                tech: 'DOM (HTML/SVG)',
                techType: 'DOM',
                license: 'MIT',
                licenseType: 'MIT',
                size: '40 KB',
                sizeVal: 40,
                react: 'Native React',
                physics: 'No',
                scale: '500',
                scaleVal: 500,
                logoBg: '#00d8ff',
                logoSvg: '<svg viewBox="0 0 100 100" width="16" height="16"><rect x="15" y="15" width="25" height="25" rx="5" fill="#fff"/><rect x="60" y="60" width="25" height="25" rx="5" fill="#fff"/><path d="M40,27.5 L72.5,27.5 L72.5,60" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            },
            {
                id: 'cytoscape',
                name: 'Cytoscape.js',
                target: 'Formal graph analysis',
                tech: 'Canvas',
                license: 'MIT',
                licenseType: 'MIT',
                size: '90 KB',
                sizeVal: 90,
                react: 'Third-party wrappers',
                physics: 'Yes',
                scale: '5,000',
                scaleVal: 5000,
                logoBg: '#8bc34a',
                logoSvg: '<svg viewBox="0 0 100 100" width="16" height="16"><polygon points="50,15 85,80 15,80" fill="none" stroke="#fff" stroke-width="10" stroke-linejoin="round"/><circle cx="50" cy="15" r="10" fill="#fff"/><circle cx="15" cy="80" r="10" fill="#fff"/><circle cx="85" cy="80" r="10" fill="#fff"/></svg>'
            },
            {
                id: 'sigma',
                name: 'Sigma.js',
                target: 'Large-scale static networks',
                tech: 'WebGL',
                techType: 'WebGL',
                license: 'MIT',
                licenseType: 'MIT',
                size: '30 KB',
                sizeVal: 30,
                react: 'Native React component',
                physics: 'No',
                scale: '100,000+',
                scaleVal: 100000,
                logoBg: '#673ab7',
                logoSvg: '<svg viewBox="0 0 100 100" width="16" height="16"><circle cx="50" cy="50" r="35" fill="none" stroke="#fff" stroke-width="8"/><circle cx="50" cy="15" r="10" fill="#fff"/><circle cx="50" cy="85" r="10" fill="#fff"/><circle cx="15" cy="50" r="10" fill="#fff"/><circle cx="85" cy="50" r="10" fill="#fff"/></svg>'
            },
            {
                id: 'forcegraph',
                name: 'force-graph',
                target: 'Fast Canvas/3D networks',
                tech: 'Canvas / WebGL',
                techType: 'WebGL',
                license: 'MIT',
                licenseType: 'MIT',
                size: '60 KB',
                sizeVal: 60,
                react: 'React wrappers',
                physics: 'Yes',
                scale: '50,000 (3D)',
                scaleVal: 50000,
                logoBg: '#e91e63',
                logoSvg: '<svg viewBox="0 0 100 100" width="16" height="16"><path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" stroke="#fff" stroke-width="8" stroke-linecap="round"/><circle cx="50" cy="50" r="12" fill="#fff"/></svg>'
            },
            {
                id: 'g6',
                name: 'G6 (AntV)',
                target: 'Enterprise graph tooling',
                tech: 'Canvas / SVG',
                techType: 'SVG',
                license: 'MIT',
                licenseType: 'MIT',
                size: '150 KB',
                sizeVal: 150,
                react: 'React wrappers',
                physics: 'Yes',
                scale: '10,000',
                scaleVal: 10000,
                logoBg: '#3f51b5',
                logoSvg: '<svg viewBox="0 0 100 100" width="16" height="16"><path d="M20,25 L50,5 L80,25 L80,75 L50,95 L20,75 Z" fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round"/><circle cx="50" cy="50" r="12" fill="#fff"/></svg>'
            },
            {
                id: 'gojs',
                name: 'GoJS',
                target: 'Commercial diagramming',
                tech: 'Canvas',
                license: 'Proprietary',
                licenseType: 'Proprietary',
                size: '180 KB',
                sizeVal: 180,
                react: 'Official React component',
                physics: 'Yes',
                scale: '3,000',
                scaleVal: 3000,
                logoBg: '#607d8b',
                logoSvg: '<svg viewBox="0 0 100 100" width="16" height="16"><rect x="15" y="15" width="70" height="70" rx="10" fill="none" stroke="#fff" stroke-width="8"/><circle cx="50" cy="50" r="15" fill="#fff"/></svg>'
            }
        ];

        // Column meta-information
        this.columns = [
            { key: 'name', label: 'Library', sortable: true, type: 'string' },
            { key: 'target', label: 'Primary Target', sortable: true, type: 'string' },
            { key: 'tech', label: 'Rendering Tech', sortable: true, type: 'string' },
            { key: 'license', label: 'License', sortable: true, type: 'string' },
            { key: 'sizeVal', label: 'Size', sortable: true, type: 'number' },
            { key: 'react', label: 'React Native Integration', sortable: true, type: 'string' },
            { key: 'physics', label: 'Physics', sortable: true, type: 'string' },
            { key: 'scaleVal', label: 'Max Scale', sortable: true, type: 'number' }
        ];

        this.initDOM();
        this.render();
    }

    initDOM() {
        this.container.innerHTML = `
            <div class="comparison-container">
                <div class="table-header-controls">
                    <div class="table-title">
                        <h3>Interactive Library Directory</h3>
                    </div>
                    <div class="search-wrapper">
                        <svg class="search-icon" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                        <input type="text" id="table-search" class="search-input" placeholder="Filter libraries...">
                    </div>
                </div>
                <div class="table-wrapper">
                    <table class="comparison-table">
                        <thead>
                            <tr id="table-headers"></tr>
                        </thead>
                        <tbody id="table-rows"></tbody>
                    </table>
                </div>
            </div>
        `;

        // Bind search input
        const searchInput = document.getElementById('table-search');
        searchInput.addEventListener('input', (e) => {
            this.filterQuery = e.target.value.toLowerCase();
            this.render();
        });
    }

    handleSort(columnKey) {
        if (this.sortColumn === columnKey) {
            // toggle direction
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = columnKey;
            this.sortDirection = 'asc';
        }
        this.render();
    }

    getBadgeClass(tech) {
        const t = tech.toLowerCase();
        if (t.includes('webgl')) return 'badge-webgl';
        if (t.includes('svg')) return 'badge-svg';
        if (t.includes('dom') || t.includes('html')) return 'badge-dom';
        return 'badge-canvas';
    }

    getLicenseClass(license) {
        const l = license.toLowerCase();
        if (l.includes('proprietary')) return 'badge-proprietary';
        return 'badge-mit';
    }

    getPhysicsClass(physics) {
        return physics.toLowerCase() === 'yes' ? 'badge-yes' : 'badge-no';
    }

    render() {
        // Render headers
        const headersRow = document.getElementById('table-headers');
        headersRow.innerHTML = '';

        this.columns.forEach(col => {
            const th = document.createElement('th');
            th.innerHTML = `${col.label}<span class="sort-icon"></span>`;
            
            if (col.sortable) {
                th.addEventListener('click', () => this.handleSort(col.key));
                
                // Add active sort classes
                if (this.sortColumn === col.key) {
                    th.classList.add(this.sortDirection);
                }
            }
            headersRow.appendChild(th);
        });

        // Filter data
        let filteredLibs = this.libraries.filter(lib => {
            return (
                lib.name.toLowerCase().includes(this.filterQuery) ||
                lib.target.toLowerCase().includes(this.filterQuery) ||
                lib.tech.toLowerCase().includes(this.filterQuery) ||
                lib.license.toLowerCase().includes(this.filterQuery) ||
                lib.react.toLowerCase().includes(this.filterQuery)
            );
        });

        // Sort data
        const currentCol = this.columns.find(c => c.key === this.sortColumn);
        filteredLibs.sort((a, b) => {
            let valA = a[this.sortColumn];
            let valB = b[this.sortColumn];

            if (currentCol.type === 'number') {
                return this.sortDirection === 'asc' ? valA - valB : valB - valA;
            } else {
                valA = (valA || '').toString().toLowerCase();
                valB = (valB || '').toString().toLowerCase();
                if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
                if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            }
        });

        // Render rows
        const tbody = document.getElementById('table-rows');
        tbody.innerHTML = '';

        if (filteredLibs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="${this.columns.length}" style="text-align: center;" class="text-muted">No matching libraries found.</td></tr>`;
            return;
        }

        filteredLibs.forEach(lib => {
            const tr = document.createElement('tr');
            
            // Col 1: Library name + custom logo
            const nameCell = document.createElement('td');
            nameCell.className = 'library-cell';
            nameCell.innerHTML = `
                <div class="library-logo" style="background-color: ${lib.logoBg};">
                    ${lib.logoSvg}
                </div>
                <span>${lib.name}</span>
            `;
            tr.appendChild(nameCell);

            // Col 2: Primary Target
            const targetCell = document.createElement('td');
            targetCell.textContent = lib.target;
            tr.appendChild(targetCell);

            // Col 3: Tech (Badge)
            const techCell = document.createElement('td');
            techCell.innerHTML = `<span class="badge ${this.getBadgeClass(lib.tech)}">${lib.tech}</span>`;
            tr.appendChild(techCell);

            // Col 4: License (Badge)
            const licenseCell = document.createElement('td');
            licenseCell.innerHTML = `<span class="badge ${this.getLicenseClass(lib.licenseType)}">${lib.license}</span>`;
            tr.appendChild(licenseCell);

            // Col 5: Size
            const sizeCell = document.createElement('td');
            sizeCell.className = 'text-bold';
            sizeCell.textContent = lib.size;
            tr.appendChild(sizeCell);

            // Col 6: React
            const reactCell = document.createElement('td');
            reactCell.textContent = lib.react;
            tr.appendChild(reactCell);

            // Col 7: Physics (Badge)
            const physicsCell = document.createElement('td');
            physicsCell.innerHTML = `<span class="badge ${this.getPhysicsClass(lib.physics)}">${lib.physics}</span>`;
            tr.appendChild(physicsCell);

            // Col 8: Scale
            const scaleCell = document.createElement('td');
            scaleCell.className = 'text-bold';
            scaleCell.textContent = lib.scale;
            tr.appendChild(scaleCell);

            tbody.appendChild(tr);
        });
    }
}

// Instantiate the table once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LibraryComparisonTable('comparison-table-mount');
});
