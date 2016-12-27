var observationsMatrix = new Matrix({
  target: document.querySelector('observationsMatrix'),
  data: {
    headings: ['x', 'y'],
    matrix: math.matrix([[-0.1, 1], [1, 3], [2.5, 2]]),
    editable: true,
    tmp: [{value:null, validity:false}, {value:null, validity:false}]
  },
});

var smoothnessInput = new Input({
  target: document.querySelector('smoothnessInput'),
  data: {
    description: 'Smoothness: ',
    minimum: 0,
    step: 0.01,
    value: 0.01
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

var extimatedVector = new Matrix({
  target: document.querySelector('extimatedVector'),
  data: {
    headings: ['Spline', 'Coefficient'],
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
    if (item > xMin) {
      a.set([index, math.ceil(item)-xMin-1], math.ceil(item)-item);
    }
    a.set([index, math.ceil(item)-xMin], 1-(math.ceil(item)-item));
  });
  designMatrix.set({
    headings: aIndex.toArray(),
    matrix: a,
    editable: false,
  });
  var yVector = math.multiply(matrix, [0, 1]);
  var aTranspose = math.transpose(a);
  var smoothness = smoothnessInput.get('value');
  var nMatrix = math.multiply(aTranspose, a);
  if ((math.det(nMatrix) < 0.01) && (smoothness < 0.01)) {
    smoothnessInput.set({'minimum':0.01, 'value':0.01});
    return;
  } else if (smoothnessInput.get('minimum') > 0) {
    smoothnessInput.set({'minimum':0});
  }
  var whiteNoise = math.dotMultiply(smoothness, math.eye(aIndex.size()[0]));
  var aExtimated = math.multiply(math.multiply(math.inv(math.add(nMatrix, whiteNoise)), aTranspose), yVector);
  extimatedVector.set({
    matrix:math.matrix(math.transpose([aIndex.toArray(), aExtimated.toArray()]))
  });
}

observationsMatrix.observe('matrix', interpolation);
smoothnessInput.observe('value', interpolation);

var chart = new Chart('graph', {
  type: 'line',
  data: {
    datasets: [{
      label: 'Input',
      fill: false,
      showLine: false,
      borderColor: 'red',
      lineTension: 0
    }, {
      label: 'Interpolation',
      fill: false,
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
  chart.data.datasets[0].data = array.map(arrayToMap);
  array = extimatedVector.get('matrix').toArray();
  array.sort(function (a, b) {return a[0]-b[0]});
  array.splice(0, 0, [array[0][0]-1, 0]);
  array.push([array[array.length-1][0]+1, 0]);
  chart.data.datasets[1].data = array.map(arrayToMap);
  chart.update();
}

extimatedVector.observe('matrix', draw);

