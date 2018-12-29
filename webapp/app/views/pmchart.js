var ctx = document.getElementById("myChart");

function httpGet(theUrl) { // synchronous, but doesn't matter for localhost
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // `false` means that this is a synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

var btn1 = document.getElementById("btn1")
var btn2 = document.getElementById("btn2")
var btn3 = document.getElementById("btn3")
var start_date_field = document.getElementById("start_date_field")
var end_date_field = document.getElementById("end_date_field")

var datepicker = new Datepickk();
datepicker.range = true;

datepicker.onClose = function() {
  start_date_field.value = datepicker.selectedDates[0].toDateString()
  end_date_field.value = datepicker.selectedDates[1].toDateString()
  console.log(datepicker.selectedDates);
};

function setButtonActive(button) {
  btn1.classList.remove("active")
  btn2.classList.remove("active")
  btn3.classList.remove("active")
  button.classList.add("active")
}

function updateGraph(span, startDate, endDate) {
  removeData(myChart)
  var today_morning = new Date().setHours(0, 0, 0, 0) / 1000.0
  var today_night = new Date().setHours(24, 0, 0, 0) / 1000.0

  function addDataToGraph(startDate, endDate) {
    var data = JSON.parse(httpGet('getAQIData/?start=' + startDate + '&end=' + endDate))
    var [label_array, pm25_array, pm10_array] = extractAQIData(data)
    addData(myChart, label_array, pm25_array, pm10_array)
  }

  switch (span) {
    case 'intraday':
      console.log("Updating to Intraday Data")
      setButtonActive(btn1)
      addDataToGraph(today_morning, today_night)
      break
    case '5day':
      console.log("Updating to 5-day data")
      setButtonActive(btn2)
      startDate = new Date(today_morning).setDate(new Date(today_morning).getDate() - 5)
      addDataToGraph(startDate, today_night)
      break
    case 'month':
      console.log("Updating to monthly data")
      setButtonActive(btn3)
      startDate = new Date(today_morning).setMonth(new Date(today_morning).getMonth() - 1)
      addDataToGraph(startDate, today_night)
      break
    default:
      console.log("Updating to custom data")
      startDate = new Date().setHours(0, 0, 0, 0) / 1000.0
      endDate = new Date().setHours(24, 0, 0, 0) / 1000.0
      addDataToGraph(startDate, endDate)
  }
}

function extractAQIData(jsonData) {
  let label_array = []
  let pm25_array = []
  let pm10_array = []
  for (ind in data) {
    label_array.push(data[ind]["readable_timestamp"])
    pm25_array.push(parseFloat(data[ind]["pm25"]))
    pm10_array.push(parseFloat(data[ind]["pm10"]))
  }
  return [label_array, pm25_array, pm10_array]
}

function addData(chart, labels, data0, data1) {
  chart.data.labels = labels
  chart.data.datasets[0].data = data0
  chart.data.datasets[1].data = data1
  chart.update();
}

function removeData(chart) {
  chart.data.labels = []
  chart.data.datasets.forEach((dataset) => {
    dataset.data = []
  });
  chart.update();
}

// Initial setup to 1 day
var startDate = new Date().setHours(0, 0, 0, 0) / 1000.0
var endDate = new Date().setHours(24, 0, 0, 0) / 1000.0
var data = JSON.parse(httpGet('getAQIData/?start=' + startDate + '&end=' + endDate))
var [label_array, pm25_array, pm10_array] = extractAQIData(data)

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
