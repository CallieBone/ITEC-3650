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
        })
        .catch(error => {
            // This handle any errors that may occur during the fetch
            console.error("There has been a problem with your fetch operation:", error);
            alert("Error fetching river gauge data. See console for details.");
            // This "alert" is to inform the user that there was an error fetching the data; Could possibly see it if we disconnect the wifi or if the API is down
        });
}

fetchRiverGaugeData();
