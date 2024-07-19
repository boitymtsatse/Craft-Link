document.addEventListener("DOMContentLoaded", async () => {
    const serviceList = document.getElementById('service-list');

    try {
        const response = await fetch('http://localhost/api/services');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const services = await response.json();
        console.log(services); // Log the services data
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <h3>${service.Service_title}</h3>
                <p class="description">${service.Service_Description}</p>
                <div class="rating">Rating: ⭐${'⭐'.repeat(service.Rating)}</div>
                <p class="rate">Rate: Inquire for quotation</p>
                <p class="times">Operating Times: 9 AM - 5 PM</p>
                <p class="location">Location: 153 Jabulani Street, Orlando East Ext 5, Soweto</p>
                <div class="analytics">
                    <h4>Analytics</h4>
                    <canvas id="analyticsService${service.Service_ID}"></canvas>
                </div>
                <div class="calendar">
                    <h4>Calendar Bookings</h4>
                    <div id="calendarService${service.Service_ID}"></div>
                </div>
                <button class="booking-button" data-id="${service.Service_ID}">Check Bookings</button>
            `;
            serviceList.appendChild(serviceCard);

            // Initialize analytics chart
            const ctx = document.getElementById(`analyticsService${service.Service_ID}`).getContext('2d');
            new Chart(ctx, {
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

            // Initialize calendar
            const calendarEl = document.getElementById(`calendarService${service.Service_ID}`);
            const calendar = new FullCalendar.Calendar(calendarEl, {
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
                    }
                ]
            });

            // Show calendar when button is clicked
            document.querySelector(`.booking-button[data-id="${service.Service_ID}"]`).addEventListener('click', () => {
                calendarEl.style.display = 'block';
                calendar.render();
            });
        });
    } catch (error) {
        console.error('Fetch error:', error); // Log the error
        serviceList.innerHTML = `<p class="error">Failed to load services: ${error.message}</p>`;
    }
});

