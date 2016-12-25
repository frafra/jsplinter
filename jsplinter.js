var input = new Matrix({
  target: document.querySelector('main'),
  data: {
    headings: ['x', 'y'],
    matrix: math.matrix([[0, 1], [1, 3], [2, 2]]),
    editable: true,
    tmp: [{value:null, validity:false}, {value:null, validity:false}]
  },
});

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
  var array = input.get('matrix').toArray();
  array.sort(function (a, b) {return a[0]-b[0]});
  chart.data.datasets[0].data = array.map(arrayToMap);
  chart.update();
}

input.observe('matrix', draw);

