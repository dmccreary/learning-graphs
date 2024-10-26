// Icon Legend
// https://jsfiddle.net/adgd87/szt7h6kv/19/
var iconSize = 20;
var legendIconSize = 40;

var nodeSet = [{
  id: 1,
  shape: 'icon',
  icon: {
    face: 'FontAwesome',
    code: '\uf286',
    size: iconSize,
    color: '#57169a'
  },
  label: 'Node 1',
  group: 'castle'
}, {
  id: 2,
  shape: 'icon',
  icon: {
    face: 'FontAwesome',
    code: '\uf1d1',
    size: iconSize,
    color: '#f0a30a'
  },
  label: 'Node 2',
  group: 'star'
}, {
  id: 3,
  shape: 'icon',
  icon: {
    face: 'FontAwesome',
    code: '\uf286',
    size: iconSize,
    color: '#57169a'
  },
  label: 'Node 3',
  group: 'castle'
}, {
  id: 4,
  shape: 'icon',
  icon: {
    face: 'FontAwesome',
    code: '\uf1d1',
    size: iconSize,
    color: '#f0a30a'
  },
  label: 'Node 4',
  group: 'star'
}];

// legend
var container = document.getElementById('mynetwork');
var x = container.clientWidth - (container.clientWidth / 2);
var y = -container.clientHeight + 150;
var step = 60;

nodeSet.push({
  id: 1000,
  x: x,
  y: y,
  label: 'Castle',
  group: 'castle',
  value: 1,
  fixed: true,
  physics: false
});

nodeSet.push({
  id: 1001,
  x: x,
  y: y + step,
  label: 'Star',
  group: 'star',
  value: 1,
  fixed: true,
  physics: false
});
nodeSet.push({
  id: 1002,
  x: x,
  y: y + step * 2,
  label: 'Star',
  group: 'star',
  value: 1,
  fixed: true,
  physics: false
});
nodeSet.push({
  id: 1003,
  x: x,
  y: y + step * 3,
  label: 'Star',
  group: 'star',
  value: 1,
  fixed: true,
  physics: false
});

// create an array with nodes
var nodes = new vis.DataSet(nodeSet);

// create an array with edges
var edges = new vis.DataSet([{
  from: 1,
  to: 2
}, {
  from: 2,
  to: 3
}, {
  from: 3,
  to: 4
}, {
  from: 4,
  to: 1
}]);

var data = {
  nodes: nodes,
  edges: edges
};
var options = {
  layout: {
    randomSeed: 2
  },
  groups: {
    useDefaultGroups: false,
    'castle': {
      shape: 'icon',
      icon: {
        face: 'FontAwesome',
        code: '\uf286',
        size: legendIconSize,
        color: '#57169a'
      },
    },
    'star': {
      shape: 'icon',
      icon: {
        face: 'FontAwesome',
        code: '\uf1d1',
        size: legendIconSize,
        color: '#f0a30a'
      },
    },
  }
};

// create a network
var network = new vis.Network(container, data, options);
network.on("selectNode", function(params) {
  console.log('selectNode Event on Node id:', params.nodes[0]);
});

//var iconRemoved = false;
network.on("doubleClick", function(params) {
  console.log('doubleClick Event on Node id:', params.nodes[0]);
  if (params && params.nodes.length > 0) {
    //iconRemoved = true;
    debugger;
    var selectedGroup = '';
    $.each(nodes._data, function(index, value) {
      if (value.id == params.nodes[0])
        selectedGroup = value.group ? value.group : '';
    });

    $.each(nodes._data, function(index, value) {
      if (value.group && value.group == selectedGroup)
        nodes.remove(value.id);
    });

    //nodes.add(1);   
  }
});
