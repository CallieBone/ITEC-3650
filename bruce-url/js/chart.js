let riverChart; 

document.getElementById('fetchDataButton').addEventListener('click', () => {
  const selectedSite = document.getElementById('riverSelect').value;

  fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${selectedSite}&period=P7D&siteStatus=active&parameterCd=00065,00010`)
    .then(response => response.json())
    .then(data => {
      const timeSeries = data.value.timeSeries;
      const labels = timeSeries[0].values[0].value.map(entry => entry.dateTime); // Extract timestamps
      const temperatureData = timeSeries.find(series => series.variable.variableCode[0].value === "00010")
        ?.values[0].value.map(entry => parseFloat(entry.value)) || []; // Extract temperature data
      const heightData = timeSeries.find(series => series.variable.variableCode[0].value === "00065")
        ?.values[0].value.map(entry => parseFloat(entry.value)) || []; // Extract height data

      if (riverChart) {
        riverChart.destroy();
      }

      const ctx = document.getElementById('riverChart').getContext('2d');
      riverChart = new Chart(ctx, {
        type: 'line', 
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: temperatureData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              yAxisID: 'y1'
            },
            {
              label: 'Height (ft)',
              data: heightData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              yAxisID: 'y2'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y1: {
              type: 'linear',
              position: 'left',
              beginAtZero: true,
              title: {
                display: true,
                text: 'Temperature (°C)'
              }
            },
            y2: {
              type: 'linear',
              position: 'right',
              beginAtZero: true,
              title: {
                display: true,
                text: 'Height (ft)'
              },
              grid: {
                drawOnChartArea: false 
              }
            },
            x: {
              title: {
                display: true,
                text: 'Time'
              }
            }
          }
        }
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
