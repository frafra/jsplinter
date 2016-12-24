var input = new Matrix({
  target: document.querySelector('main'),
  data: {
    headings: ['x', 'y'],
    matrix: math.matrix([[0, 1], [1, 3], [2, 2]]),
    editable: true,
    tmp: [null, null]
  },
});

var graph = new Graph({
  target: document.querySelector('graph'),
  data: {
    xMax: 0,
    yMax: 0,
    points: ''
  }
});
function draw() {
  data = {
    xMax: Math.max.apply(null, input.get('matrix').toArray().map(item => item[0])),
    yMax: Math.max.apply(null, input.get('matrix').toArray().map(item => item[1])),
    points: input.get('matrix').toArray().sort().join(' ')
  }
  graph.set(data);
}
input.observe('matrix', draw);

