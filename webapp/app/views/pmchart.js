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
var btn4 = document.getElementById("btn4")
var start_date_field = document.getElementById("start_date_field")
var end_date_field = document.getElementById("end_date_field")
var custom_range_button = document.getElementById("custom_range_button")

var datepicker = new Datepickk();
var datePickerStartDate = null
var datePickerEndDate = null

datepicker.range = true;

datepicker.onClose = function() {
  datePickerStartDate = new Date(datepicker.selectedDates[0]).setHours(0, 0, 0, 0)
  datePickerEndDate = new Date(datepicker.selectedDates[1]).setHours(23, 59, 59, 0)
  start_date_field.value = new Date(datePickerStartDate).toDateString()
  end_date_field.value = new Date(datePickerEndDate).toDateString()
  console.log(datepicker.selectedDates);
};

function setButtonActive(button) {
  btn1.classList.remove("active")
  btn2.classList.remove("active")
  btn3.classList.remove("active")
  btn4.classList.remove("active")
  button.classList.add("active")
}

custom_range_button.onclick = function() {
  updateGraph("", datePickerStartDate, datePickerEndDate)
  setButtonActive(btn4)
};


var beginningOfToday = new Date().setHours(0, 0, 0, 0)
var endOfToday = new Date().setHours(23, 59, 59, 0)
var data = JSON.parse(httpGet('getAQIData/?start=' + parseInt(beginningOfToday / 1000) + '&end=' + parseInt(endOfToday / 1000)))
var [label_array, pm25_array, pm10_array] = extractAQIData(data)

function updateGraph(span, startDate = beginningOfToday, endDate = endOfToday) {
  removeData(myChart)

  function addDataToGraph(startDate, endDate) {
    data = JSON.parse(httpGet('getAQIData/?start=' + parseInt(startDate / 1000) + '&end=' + parseInt(endDate / 1000)))
    [label_array, pm25_array, pm10_array] = extractAQIData(data)
    addData(myChart, label_array, pm25_array, pm10_array)
  }

  switch (span) {
    case 'intraday':
      console.log("Updating to Intraday Data")
      setButtonActive(btn1)
      addDataToGraph(startDate, endDate)
      break
    case '5day':
      console.log("Updating to 5-day data")
      setButtonActive(btn2)
      startDate = new Date(beginningOfToday).setDate(new Date(beginningOfToday).getDate() - 5)
      addDataToGraph(startDate, endDate)
      break
    case 'month':
      console.log("Updating to monthly data")
      setButtonActive(btn3)
      startDate = new Date(beginningOfToday).setMonth(new Date(beginningOfToday).getMonth() - 1)
      addDataToGraph(startDate, endDate)
      break
    default:
      console.log("Updating to custom data")
      startDate = startDate
      endDate = endDate
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
