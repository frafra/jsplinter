var observationsMatrix = new Matrix({
  target: document.querySelector('observationsMatrix'),
  data: {
    headings: ['x', 'y'],
    matrix: math.matrix([[-0.1, 1], [1, 3], [2.5, 2]]),
    editable: true,
    tmp: [{value:null, validity:false}, {value:null, validity:false}]
  },
});


var designMatrix = new Matrix({
  target: document.querySelector('designMatrix'),
  data: {
    headings: [],
    matrix: math.matrix([]),
    editable: false
  },
});

function interpolation() {
  var matrix = observationsMatrix.get('matrix');
  var xVector = math.multiply(matrix, [1, 0]);
  var xMin = math.floor(math.min(xVector));
  var xMax = math.ceil(math.max(xVector));
  var aIndex = math.range(xMin, xMax, 1, true);
  var a = math.zeros(matrix.size()[0], aIndex.size()[0]);
  xVector.toArray().forEach((item, index) => {
    a.set([index, math.floor(item)-xMin], 1-math.abs(item%1));
    if (item%1) {
      a.set([index, math.floor(item)+1-xMin], math.abs(item%1));
    }
  });
  designMatrix.set({
    headings: aIndex.toArray(),
    matrix: a,
    editable: false,
  });
  /* To be continued... */
}

observationsMatrix.observe('matrix', interpolation);

var chart = new Chart('graph', {
  type: 'line',
  data: {
    datasets: [{
      label: 'Input',
      lineTension: 0
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  }
});

function arrayToMap(item) {
  return {x:item[0], y:item[1]};
}

function draw() {
  var array = observationsMatrix.get('matrix').toArray();
  array.sort(function (a, b) {return a[0]-b[0]});
  chart.data.datasets[0].data = array.map(arrayToMap);
  chart.update();
}

observationsMatrix.observe('matrix', draw);

