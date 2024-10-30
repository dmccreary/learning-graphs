# Network Properties

We sometimes run into bugs with different versions of the vis.js network library.
When we do have this problem, we have a challenge in that there is
no function to tell us what version of vis.js we are running when
the library is loaded.

We also can't get the version from the JavaScript src string if
we always use the latest version:

```html
<script type="text/javascript" 
  src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
```

To get around this problem, we have to visit the unpkg.com site
and find the package JSON file.  Here is the current location of
this file:

[https://unpkg.com/vis-network/package.json](https://unpkg.com/vis-network/package.json)

Here is an excerpt of that file:

```json
{
  "name": "vis-network",
  "version": "9.1.9",
  "description": "A dynamic, browser-based visualization library.",
  "homepage": "https://visjs.github.io/vis-network/",
  "license": "(Apache-2.0 OR MIT)",
  "repository": {
    "type": "git",
    "url": "https://github.com/visjs/vis-network.git"
  },
  "bugs": {
    "url": "https://github.com/visjs/vis-network/issues"
  },
  "keywords": [
    "vis",
    "visualization",
    "web based",
    "browser based",
    "typescript",
    "javascript",
    "chart",
    "graph",
    "network",
    "browser"
  ],
}
```

We can then use the following code to extract the version property

```json
"version": "9.1.9",
```

```javascript
async function getVisVersion() {
            try {
                const response = await fetch('https://unpkg.com/vis-network/package.json');
                if (response.ok) {
                    const packageInfo = await response.json();
                    return packageInfo.version;
                } else {
                    return 'Unknown (Failed to fetch version)';
                }
            } catch (error) {
                console.error('Error fetching vis-network version:', error);
                return 'Unknown (Error occurred)';
            }
        }

        (async () => {
            const version = await getVisVersion();
            document.getElementById('vis-version').textContent = `vis.js version: ${version}`;
        })();

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar-container');
            sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
        }
```

[Run The Get Vis Network Latest Version](network-properties-v3.html)