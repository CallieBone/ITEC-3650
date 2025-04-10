// URL to fetch the river data
const apiUrl = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055646,070556680,07055680,07055780&period=P7D&siteStatus=active&parameterCd=00065';

// Function to fetch and display river data
function fetchRiverData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse JSON response
                const riverData = JSON.parse(xhr.responseText);
                console.log('River Data:', riverData);
                // Show river data in an alert message
                alert('River Data: ' + JSON.stringify(riverData, null, 2));
            } else {
                console.error('Error fetching river data. Status:', xhr.status);
            }
        }
    };
    xhr.send();
}

// Call the function to fetch data
fetchRiverData();