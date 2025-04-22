const ctx = document.getElementById('chartjs-0').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar', 
    data: {
        labels: ['Boxley (07055646)', 'Ponca (07055660)', 'Pruitt (07055680)', 'Caruer (07055780)'], // Updated labels
        datasets: [{
            label: 'River Codes',
            data: [7055646, 7055660, 7055680, 7055780], 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
