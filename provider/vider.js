document.addEventListener("DOMContentLoaded", () => {
    // Analytics for Service 1
    const ctx1 = document.getElementById('analyticsService1').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'Income',
                data: [1200, 1500, 1100, 1700, 1300],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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

    // Additional charts for other services can be added similarly
});
