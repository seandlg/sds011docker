var ctx = document.getElementById("myChart");

function httpGet(theUrl) { // synchronous, but doesn't matter for localhost
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

data = httpGet('AQIData.csv')
data_array = data.split("\n").slice(0, -1)
console.log(data_array)
label_array = []
pm25_array = []
pm10_array = []

for (ind in data_array) {
  elem = data_array[ind]
  columns = elem.split(",")
  timestamp = columns[0]
  pm25value = parseFloat(columns[1])
  pm10value = parseFloat(columns[2])
  label_array.push(timestamp)
  pm25_array.push(pm25value)
  pm10_array.push(pm10value)
}

var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: label_array,
    datasets: [{
        label: 'PM 2.5',
        data: pm25_array,
        fill: false,
        borderWidth: 1,
        borderColor: 'rgba(217, 83, 79, 1)'
      },
      {
        label: 'PM 10',
        data: pm10_array,
        fill: false,
        borderWidth: 1,
        borderColor: 'rgba(66, 139, 202, 1)'
      }
    ],


  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'AQI-Data'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Timestamp'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'PM-Value'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
