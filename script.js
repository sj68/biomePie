// Function to generate random colours
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Automatically load level 2, location 51 data when HTML is first opened
window.onload = function(){
  d3.csv("jslevel-2.csv").then(makeChart);
}


// Declare pie chart outside function so can destroy instance before a new one
// is created (causes "flickering" otherwise)
var pie_chart;

function newChart(){

  var csvFile = "jslevel-" + document.getElementById("levelSelect").value +".csv"
  d3.csv(csvFile).then(makeChart);
}

function makeChart(data){

  if(pie_chart){
    pie_chart.destroy();
  }

  // Location selected from drop down menu
  var location = document.getElementById("locationSelect").value
  // Extract quantities
  var quantity = data.map(function(d) {return d[location]});
  var population = data.map(function(d) {return d.index});

  pie_chart = new Chart('chart',{
    type: 'pie',
    data: {
      labels: population,
      datasets: [
        {
          data: quantity,
          // Assign random colours to segments
          backgroundColor: Array.from({length: population.length}, () => getRandomColor()),
          // Get rid of white lines bordering segments
          borderWidth: 0
        }
      ]
    },
    options: {
      title: {
            display: true,
            text: 'Biome Data'
      },
      // No legend
      legend: {
        display: false
      },
      // Ensure size is as specified in canvas
      responsive: true
    }
  })
}
