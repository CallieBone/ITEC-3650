// Function to fetch river gauge data
function fetchRiverGaugeData() {
    const apiUrl = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055646,070556680,07055680,07055780&period=P7D&siteStatus=active&parameterCd=00065';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            // This will Check if the response is ok (status in the range 200-299), the rror will come up if the response is not ok, like demonstrated in the code I made :DDDDDD
            return response.json(); // Parse the JSON data {Parse means to convert the data from one format to another, in this case, from JSON string to a JavaScript object}
        })
        .then(data => {
            // This is where you can handle the data returned from the API
            console.log("River Gauge Data:", data);
            alert("River Gauge Data Retrieved! Check the console for details.");
            processRiverData(data);
        })
        .catch(error => {
            // This handle any errors that may occur during the fetch
            console.error("There has been a problem with your fetch operation:", error);
            alert("Error fetching river gauge data. See console for details.");
            // This "alert" is to inform the user that there was an error fetching the data; Could possibly see it if we disconnect the wifi or if the API is down
        });
}

fetchRiverGaugeData();

/* Assuming msg is the response from the AJAX call */
function processRiverData(msg) {
    /* Site 1: Boxley (07055646) */
    var dates = [];
    var values = [];
    var fLen = msg.value.timeSeries[0].values[0].value.length;
    for (let i = 0; i < fLen; i++) {
        values[i] = msg.value.timeSeries[0].values[0].value[i].value;
        dates[i] = msg.value.timeSeries[0].values[0].value[i].dateTime;
    }
    var sitename = msg.value.timeSeries[0].sourceInfo.siteName;
    var sitecode = msg.value.timeSeries[0].sourceInfo.siteCode[0].value;
    var siteDescription = msg.value.timeSeries[0].variable.variableDescription;

    displayGraph(dates, values, sitename);

    /* Site 2 */
    dates = [];
    values = [];
    fLen = msg.value.timeSeries[1].values[0].value.length;
    for (let i = 0; i < fLen; i++) {
        values[i] = msg.value.timeSeries[1].values[0].value[i].value;
        dates[i] = msg.value.timeSeries[1].values[0].value[i].dateTime;
    }
    sitename = msg.value.timeSeries[1].sourceInfo.siteName;
    sitecode = msg.value.timeSeries[1].sourceInfo.siteCode[0].value;
    siteDescription = msg.value.timeSeries[1].variable.variableDescription;

    displayGraph(dates, values, sitename);

    /* Continue for Sites 3 and 4 if needed */
}

function displayGraph(dates, values, sitename) {
    var ctx = document.getElementById('chartjs-0').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: sitename,
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
