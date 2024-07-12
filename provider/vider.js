document.addEventListener("DOMContentLoaded", () => {
    // Analytics for Service 1
    const ctx1 = document.getElementById('analyticsService1').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
                {
                    label: 'Income',
                    data: [1200, 1500, 1100, 1700, 1300],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Call Outs',
                    data: [5, 10, 3, 8, 7],
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Profile Views',
                    data: [50, 60, 55, 70, 65],
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Places Worked',
                    data: [3, 4, 2, 5, 3],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Calendar for Service 1
    const calendarEl1 = document.getElementById('calendarService1');
    const calendar1 = new FullCalendar.Calendar(calendarEl1, {
        initialView: 'dayGridMonth',
        events: [
            {
                title: 'Booking 1',
                start: '2024-07-01',
                end: '2024-07-03'
            },
            {
                title: 'Booking 2',
                start: '2024-07-07',
                allDay: true
            },
            // Additional bookings can be added here
        ]
    });

    // Show calendar when button is clicked
    document.querySelector('.booking-button').addEventListener('click', () => {
        calendarEl1.style.display = 'block';
        calendar1.render();
    });
});


