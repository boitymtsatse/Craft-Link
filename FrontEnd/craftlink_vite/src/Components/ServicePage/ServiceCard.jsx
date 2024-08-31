// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';

// const ServiceCard = ({ service }) => {
//     const chartRef = useRef(null);
//     const calendarRef = useRef(null);

//     useEffect(() => {
//         const ctx = chartRef.current.getContext('2d');
//         new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels: ['January', 'February', 'March', 'April', 'May'],
//                 datasets: [
//                     {
//                         label: 'Income',
//                         data: [1200, 1500, 1100, 1700, 1300],
//                         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                         borderColor: 'rgba(75, 192, 192, 1)',
//                         borderWidth: 1
//                     },
//                     {
//                         label: 'Call Outs',
//                         data: [5, 10, 3, 8, 7],
//                         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                         borderColor: 'rgba(153, 102, 255, 1)',
//                         borderWidth: 1
//                     },
//                     {
//                         label: 'Profile Views',
//                         data: [50, 60, 55, 70, 65],
//                         backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                         borderColor: 'rgba(255, 159, 64, 1)',
//                         borderWidth: 1
//                     },
//                     {
//                         label: 'Places Worked',
//                         data: [3, 4, 2, 5, 3],
//                         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                         borderColor: 'rgba(54, 162, 235, 1)',
//                         borderWidth: 1
//                     }
//                 ]
//             },
//             options: {
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         });

//         const calendarEl = calendarRef.current;
//         new FullCalendar.Calendar(calendarEl, {
//             plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
//             initialView: 'dayGridMonth',
//             events: [
//                 { title: 'Booking 1', start: '2024-07-01', end: '2024-07-03' },
//                 { title: 'Booking 2', start: '2024-07-07', allDay: true }
//             ]
//         }).render();
//     }, []);

//     return (
//         <div className="service-card">
//             <h3>{service.Service_title}</h3>
//             <p className="description">{service.Service_Description}</p>
//             <div className="rating">Rating: ⭐{service.Rating}</div>
//             <p className="rate">Rate: Inquire for quotation</p>
//             <p className="times">Operating Times: 9 AM - 5 PM</p>
//             <p className="location">Location: 153 Jabulani Street, Orlando East Ext 5, Soweto</p>
//             <div className="analytics">
//                 <h4>Analytics</h4>
//                 <canvas ref={chartRef}></canvas>
//             </div>
//             <div className="calendar">
//                 <h4>Calendar Bookings</h4>
//                 <div ref={calendarRef}></div>
//             </div>
//         </div>
//     );
// };

// export default ServiceCard;

// src/Components/ServicePage/ServiceCard.jsx
import React, { useEffect } from 'react';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { Calendar } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const ServiceCard = ({ service }) => {
    useEffect(() => {
        const calendarEl = document.getElementById(`calendarService${service.Service_ID}`);
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, timeGridPlugin],
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

        calendar.render();
    }, [service.Service_ID]);

    return (
        <div className="service-card">
            <h3>{service.Service_title}</h3>
            <p className="description">{service.Service_Description}</p>
            <div className="rating">Rating: ⭐{service.Rating}</div>
            <p className="rate">Rate: Inquire for quotation</p>
            <p className="times">Operating Times: 9 AM - 5 PM</p>
            <p className="location">Location: 153 Jabulani Street, Orlando East Ext 5, Soweto</p>
            <div className="analytics">
                <h4>Analytics</h4>
                <canvas id={`analyticsService${service.Service_ID}`}></canvas>
            </div>
            <div className="calendar">
                <h4>Calendar Bookings</h4>
                <div id={`calendarService${service.Service_ID}`}></div>
            </div>
            <button className="booking-button" data-id={service.Service_ID}>Check Bookings</button>
        </div>
    );
};

export default ServiceCard;

