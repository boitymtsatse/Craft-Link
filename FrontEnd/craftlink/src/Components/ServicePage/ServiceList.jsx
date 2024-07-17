// import React, { useEffect, useState } from 'react';
// import ServiceCard from './ServiceCard';

// const ServiceList = () => {
//     const [services, setServices] = useState([]);

//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//                 const response = await fetch('http://localhost/api/services');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setServices(data);
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         };

//         fetchServices();
//     }, []);

//     return (
//         <section id="services">
//             <h2>Services</h2>
//             <div id="service-list">
//                 {services.map(service => (
//                     <ServiceCard key={service.Service_ID} service={service} />
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default ServiceList;
/////////////////////////////////////////////////////
// // src/components/ServiceList.jsx
// import React, { useEffect } from 'react';
// import './ServiceList.css';
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import Chart from 'chart.js/auto';

// const ServiceList = () => {
//     useEffect(() => {
//         const serviceList = document.getElementById('service-list');

//         const fetchServices = async () => {
//             try {
//                 const response = await fetch('http://localhost/api/services');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const services = await response.json();
//                 services.forEach(service => {
//                     const serviceCard = document.createElement('div');
//                     serviceCard.className = 'service-card';
//                     serviceCard.innerHTML = `
//                         <h3>${service.Service_title}</h3>
//                         <p class="description">${service.Service_Description}</p>
//                         <div class="rating">Rating: ⭐${'⭐'.repeat(service.Rating)}</div>
//                         <p class="rate">Rate: Inquire for quotation</p>
//                         <p class="times">Operating Times: 9 AM - 5 PM</p>
//                         <p class="location">Location: 153 Jabulani Street, Orlando East Ext 5, Soweto</p>
//                         <div class="analytics">
//                             <h4>Analytics</h4>
//                             <canvas id="analyticsService${service.Service_ID}"></canvas>
//                         </div>
//                         <div class="calendar">
//                             <h4>Calendar Bookings</h4>
//                             <div id="calendarService${service.Service_ID}"></div>
//                         </div>
//                         <button class="booking-button" data-id="${service.Service_ID}">Check Bookings</button>
//                     `;
//                     serviceList.appendChild(serviceCard);

//                     // Initialize analytics chart
//                     const ctx = document.getElementById(`analyticsService${service.Service_ID}`).getContext('2d');
//                     new Chart(ctx, {
//                         type: 'bar',
//                         data: {
//                             labels: ['January', 'February', 'March', 'April', 'May'],
//                             datasets: [
//                                 {
//                                     label: 'Income',
//                                     data: [1200, 1500, 1100, 1700, 1300],
//                                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                                     borderColor: 'rgba(75, 192, 192, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Call Outs',
//                                     data: [5, 10, 3, 8, 7],
//                                     backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                                     borderColor: 'rgba(153, 102, 255, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Profile Views',
//                                     data: [50, 60, 55, 70, 65],
//                                     backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                                     borderColor: 'rgba(255, 159, 64, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Places Worked',
//                                     data: [3, 4, 2, 5, 3],
//                                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                                     borderColor: 'rgba(54, 162, 235, 1)',
//                                     borderWidth: 1
//                                 }
//                             ]
//                         },
//                         options: {
//                             scales: {
//                                 y: {
//                                     beginAtZero: true
//                                 }
//                             }
//                         }
//                     });

//                     // Initialize calendar
//                     const calendarEl = document.getElementById(`calendarService${service.Service_ID}`);
//                     const calendar = new Calendar(calendarEl, {
//                         plugins: [dayGridPlugin, timeGridPlugin],
//                         initialView: 'dayGridMonth',
//                         events: [
//                             {
//                                 title: 'Booking 1',
//                                 start: '2024-07-01',
//                                 end: '2024-07-03'
//                             },
//                             {
//                                 title: 'Booking 2',
//                                 start: '2024-07-07',
//                                 allDay: true
//                             }
//                         ]
//                     });

//                     // Show calendar when button is clicked
//                     document.querySelector(`.booking-button[data-id="${service.Service_ID}"]`).addEventListener('click', () => {
//                         calendarEl.style.display = 'block';
//                         calendar.render();
//                     });
//                 });
//             } catch (error) {
//                 console.error('Fetch error:', error); // Log the error
//                 serviceList.innerHTML = `<p class="error">Failed to load services: ${error.message}</p>`;
//             }
//         };

//         fetchServices();
//     }, []);

//     return (
//         <section id="services">
//             <h2>Services</h2>
//             <div id="service-list"></div>
//         </section>
//     );
// };

// export default ServiceList;

///////////////////////////////////////////////////////
// src/Components/ServicePage/ServiceList.jsx
// import React, { useEffect } from 'react';
// import './ServiceList.css';
// import '@fullcalendar/common/main.css'; // Ensure this is the correct path
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import Chart from 'chart.js/auto';

// const ServiceList = () => {
//     useEffect(() => {
//         const serviceList = document.getElementById('service-list');

//         const fetchServices = async () => {
//             try {
//                 const response = await fetch('http://localhost/api/services');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const services = await response.json();
//                 services.forEach(service => {
//                     const serviceCard = document.createElement('div');
//                     serviceCard.className = 'service-card';
//                     serviceCard.innerHTML = `
//                         <h3>${service.Service_title}</h3>
//                         <p class="description">${service.Service_Description}</p>
//                         <div class="rating">Rating: ⭐${'⭐'.repeat(service.Rating)}</div>
//                         <p class="rate">Rate: Inquire for quotation</p>
//                         <p class="times">Operating Times: 9 AM - 5 PM</p>
//                         <p class="location">Location: 153 Jabulani Street, Orlando East Ext 5, Soweto</p>
//                         <div class="analytics">
//                             <h4>Analytics</h4>
//                             <canvas id="analyticsService${service.Service_ID}"></canvas>
//                         </div>
//                         <div class="calendar">
//                             <h4>Calendar Bookings</h4>
//                             <div id="calendarService${service.Service_ID}"></div>
//                         </div>
//                         <button class="booking-button" data-id="${service.Service_ID}">Check Bookings</button>
//                     `;
//                     serviceList.appendChild(serviceCard);

//                     // Initialize analytics chart
//                     const ctx = document.getElementById(`analyticsService${service.Service_ID}`).getContext('2d');
//                     new Chart(ctx, {
//                         type: 'bar',
//                         data: {
//                             labels: ['January', 'February', 'March', 'April', 'May'],
//                             datasets: [
//                                 {
//                                     label: 'Income',
//                                     data: [1200, 1500, 1100, 1700, 1300],
//                                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                                     borderColor: 'rgba(75, 192, 192, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Call Outs',
//                                     data: [5, 10, 3, 8, 7],
//                                     backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                                     borderColor: 'rgba(153, 102, 255, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Profile Views',
//                                     data: [50, 60, 55, 70, 65],
//                                     backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                                     borderColor: 'rgba(255, 159, 64, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Places Worked',
//                                     data: [3, 4, 2, 5, 3],
//                                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                                     borderColor: 'rgba(54, 162, 235, 1)',
//                                     borderWidth: 1
//                                 }
//                             ]
//                         },
//                         options: {
//                             scales: {
//                                 y: {
//                                     beginAtZero: true
//                                 }
//                             }
//                         }
//                     });

//                     // Initialize calendar
//                     const calendarEl = document.getElementById(`calendarService${service.Service_ID}`);
//                     const calendar = new Calendar(calendarEl, {
//                         plugins: [dayGridPlugin, timeGridPlugin],
//                         initialView: 'dayGridMonth',
//                         events: [
//                             {
//                                 title: 'Booking 1',
//                                 start: '2024-07-01',
//                                 end: '2024-07-03'
//                             },
//                             {
//                                 title: 'Booking 2',
//                                 start: '2024-07-07',
//                                 allDay: true
//                             }
//                         ]
//                     });

//                     // Show calendar when button is clicked
//                     document.querySelector(`.booking-button[data-id="${service.Service_ID}"]`).addEventListener('click', () => {
//                         calendarEl.style.display = 'block';
//                         calendar.render();
//                     });
//                 });
//             } catch (error) {
//                 console.error('Fetch error:', error); // Log the error
//                 serviceList.innerHTML = `<p class="error">Failed to load services: ${error.message}</p>`;
//             }
//         };

//         fetchServices();
//     }, []);

//     return (
//         <section id="services">
//             <h2>Services</h2>
//             <div id="service-list"></div>
//         </section>
//     );
// };

// export default ServiceList;
////////////////////////////////////////
// // src/Components/ServicePage/ServiceList.jsx
// import React, { useEffect } from 'react';
// import './ServiceList.css';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import Chart from 'chart.js/auto';

// const ServiceList = () => {
//     useEffect(() => {
//         const serviceList = document.getElementById('service-list');

//         const fetchServices = async () => {
//             try {
//                 const response = await fetch('http://localhost/api/services');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const services = await response.json();
//                 services.forEach(service => {
//                     const serviceCard = document.createElement('div');
//                     serviceCard.className = 'service-card';
//                     serviceCard.innerHTML = `
//                         <h3>${service.Service_title}</h3>
//                         <p class="description">${service.Service_Description}</p>
//                         <div class="rating">Rating: ⭐${'⭐'.repeat(service.Rating)}</div>
//                         <p class="rate">Rate: Inquire for quotation</p>
//                         <p class="times">Operating Times: 9 AM - 5 PM</p>
//                         <p class="location">Location: 153 Jabulani Street, Orlando East Ext 5, Soweto</p>
//                         <div class="analytics">
//                             <h4>Analytics</h4>
//                             <canvas id="analyticsService${service.Service_ID}"></canvas>
//                         </div>
//                         <div class="calendar">
//                             <h4>Calendar Bookings</h4>
//                             <div id="calendarService${service.Service_ID}"></div>
//                         </div>
//                         <button class="booking-button" data-id="${service.Service_ID}">Check Bookings</button>
//                     `;
//                     serviceList.appendChild(serviceCard);

//                     // Initialize analytics chart
//                     const ctx = document.getElementById(`analyticsService${service.Service_ID}`).getContext('2d');
//                     new Chart(ctx, {
//                         type: 'bar',
//                         data: {
//                             labels: ['January', 'February', 'March', 'April', 'May'],
//                             datasets: [
//                                 {
//                                     label: 'Income',
//                                     data: [1200, 1500, 1100, 1700, 1300],
//                                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                                     borderColor: 'rgba(75, 192, 192, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Call Outs',
//                                     data: [5, 10, 3, 8, 7],
//                                     backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                                     borderColor: 'rgba(153, 102, 255, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Profile Views',
//                                     data: [50, 60, 55, 70, 65],
//                                     backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                                     borderColor: 'rgba(255, 159, 64, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Places Worked',
//                                     data: [3, 4, 2, 5, 3],
//                                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                                     borderColor: 'rgba(54, 162, 235, 1)',
//                                     borderWidth: 1
//                                 }
//                             ]
//                         },
//                         options: {
//                             scales: {
//                                 y: {
//                                     beginAtZero: true
//                                 }
//                             }
//                         }
//                     });

//                     // Initialize calendar
//                     const calendarEl = document.getElementById(`calendarService${service.Service_ID}`);
//                     const calendar = new Calendar(calendarEl, {
//                         plugins: [dayGridPlugin, timeGridPlugin],
//                         initialView: 'dayGridMonth',
//                         events: [
//                             {
//                                 title: 'Booking 1',
//                                 start: '2024-07-01',
//                                 end: '2024-07-03'
//                             },
//                             {
//                                 title: 'Booking 2',
//                                 start: '2024-07-07',
//                                 allDay: true
//                             }
//                         ]
//                     });

//                     // Show calendar when button is clicked
//                     document.querySelector(`.booking-button[data-id="${service.Service_ID}"]`).addEventListener('click', () => {
//                         calendarEl.style.display = 'block';
//                         calendar.render();
//                     });
//                 });
//             } catch (error) {
//                 console.error('Fetch error:', error); // Log the error
//                 serviceList.innerHTML = `<p class="error">Failed to load services: ${error.message}</p>`;
//             }
//         };

//         fetchServices();
//     }, []);

//     return (
//         <section id="services">
//             <h2>Services</h2>
//             <div id="service-list"></div>
//         </section>
//     );
// };

// export default ServiceList;
////////////////////////////////////////////
// src/Components/ServicePage/ServiceList.jsx
// /////////////////////////////////////////////////
// src/Components/ServicePage/ServiceList.jsx
// import React, { useEffect } from 'react';
// import './ServiceList.css';
// import '@fullcalendar/common/main.min.css';
// import '@fullcalendar/daygrid/main.min.css';
// import '@fullcalendar/timegrid/main.min.css';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import Chart from 'chart.js/auto';

// const ServiceList = () => {
//     useEffect(() => {
//         const serviceList = document.getElementById('service-list');

//         const fetchServices = async () => {
//             try {
//                 const response = await fetch('http://localhost/api/services');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const services = await response.json();
//                 services.forEach(service => {
//                     const serviceCard = document.createElement('div');
//                     serviceCard.className = 'service-card';
//                     serviceCard.innerHTML = `
//                         <h3>${service.Service_title}</h3>
//                         <p class="description">${service.Service_Description}</p>
//                         <div class="rating">Rating: ⭐${'⭐'.repeat(service.Rating)}</div>
//                         <p class="rate">Rate: Inquire for quotation</p>
//                         <p class="times">Operating Times: 9 AM - 5 PM</p>
//                         <p class="location">Location: 153 Jabulani Street, Orlando East Ext 5, Soweto</p>
//                         <div class="analytics">
//                             <h4>Analytics</h4>
//                             <canvas id="analyticsService${service.Service_ID}"></canvas>
//                         </div>
//                         <div class="calendar">
//                             <h4>Calendar Bookings</h4>
//                             <div id="calendarService${service.Service_ID}"></div>
//                         </div>
//                         <button class="booking-button" data-id="${service.Service_ID}">Check Bookings</button>
//                     `;
//                     serviceList.appendChild(serviceCard);

//                     // Initialize analytics chart
//                     const ctx = document.getElementById(`analyticsService${service.Service_ID}`).getContext('2d');
//                     new Chart(ctx, {
//                         type: 'bar',
//                         data: {
//                             labels: ['January', 'February', 'March', 'April', 'May'],
//                             datasets: [
//                                 {
//                                     label: 'Income',
//                                     data: [1200, 1500, 1100, 1700, 1300],
//                                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                                     borderColor: 'rgba(75, 192, 192, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Call Outs',
//                                     data: [5, 10, 3, 8, 7],
//                                     backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                                     borderColor: 'rgba(153, 102, 255, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Profile Views',
//                                     data: [50, 60, 55, 70, 65],
//                                     backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                                     borderColor: 'rgba(255, 159, 64, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Places Worked',
//                                     data: [3, 4, 2, 5, 3],
//                                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                                     borderColor: 'rgba(54, 162, 235, 1)',
//                                     borderWidth: 1
//                                 }
//                             ]
//                         },
//                         options: {
//                             scales: {
//                                 y: {
//                                     beginAtZero: true
//                                 }
//                             }
//                         }
//                     });

//                     // Initialize calendar
//                     const calendarEl = document.getElementById(`calendarService${service.Service_ID}`);
//                     const calendar = new Calendar(calendarEl, {
//                         plugins: [dayGridPlugin, timeGridPlugin],
//                         initialView: 'dayGridMonth',
//                         events: [
//                             {
//                                 title: 'Booking 1',
//                                 start: '2024-07-01',
//                                 end: '2024-07-03'
//                             },
//                             {
//                                 title: 'Booking 2',
//                                 start: '2024-07-07',
//                                 allDay: true
//                             }
//                         ]
//                     });

//                     // Show calendar when button is clicked
//                     document.querySelector(`.booking-button[data-id="${service.Service_ID}"]`).addEventListener('click', () => {
//                         calendarEl.style.display = 'block';
//                         calendar.render();
//                     });
//                 });
//             } catch (error) {
//                 console.error('Fetch error:', error); // Log the error
//                 serviceList.innerHTML = `<p class="error">Failed to load services: ${error.message}</p>`;
//             }
//         };

//         fetchServices();
//     }, []);

//     return (
//         <section id="services">
//             <h2>Services</h2>
//             <div id="service-list"></div>
//         </section>
//     );
// };

// export default ServiceList;
//////////////////////////////////////
// src/Components/ServicePage/ServiceList.jsx
// import React, { useEffect } from 'react';
// import './ServiceList.css';
// import '@fullcalendar/common/main.min.css'; // Corrected import path
// import '@fullcalendar/daygrid/main.min.css';
// import '@fullcalendar/timegrid/main.min.css';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import Chart from 'chart.js/auto';

// const ServiceList = () => {
//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//                 const response = await fetch('http://localhost/api/services');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const services = await response.json();
//                 services.forEach(service => {
//                     const serviceCard = document.createElement('div');
//                     serviceCard.className = 'service-card';
//                     serviceCard.innerHTML = `
//                         <h3>${service.Service_title}</h3>
//                         <p class="description">${service.Service_Description}</p>
//                         <div class="rating">Rating: ⭐${'⭐'.repeat(service.Rating)}</div>
//                         <p class="rate">Rate: Inquire for quotation</p>
//                         <p class="times">Operating Times: 9 AM - 5 PM</p>
//                         <p class="location">Location: 153 Jabulani Street, Orlando East Ext 5, Soweto</p>
//                         <div class="analytics">
//                             <h4>Analytics</h4>
//                             <canvas id="analyticsService${service.Service_ID}"></canvas>
//                         </div>
//                         <div class="calendar">
//                             <h4>Calendar Bookings</h4>
//                             <div id="calendarService${service.Service_ID}"></div>
//                         </div>
//                         <button class="booking-button" data-id="${service.Service_ID}">Check Bookings</button>
//                     `;
//                     document.getElementById('service-list').appendChild(serviceCard);

//                     // Initialize analytics chart
//                     const ctx = document.getElementById(`analyticsService${service.Service_ID}`).getContext('2d');
//                     new Chart(ctx, {
//                         type: 'bar',
//                         data: {
//                             labels: ['January', 'February', 'March', 'April', 'May'],
//                             datasets: [
//                                 {
//                                     label: 'Income',
//                                     data: [1200, 1500, 1100, 1700, 1300],
//                                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                                     borderColor: 'rgba(75, 192, 192, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Call Outs',
//                                     data: [5, 10, 3, 8, 7],
//                                     backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                                     borderColor: 'rgba(153, 102, 255, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Profile Views',
//                                     data: [50, 60, 55, 70, 65],
//                                     backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                                     borderColor: 'rgba(255, 159, 64, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Places Worked',
//                                     data: [3, 4, 2, 5, 3],
//                                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                                     borderColor: 'rgba(54, 162, 235, 1)',
//                                     borderWidth: 1
//                                 }
//                             ]
//                         },
//                         options: {
//                             scales: {
//                                 y: {
//                                     beginAtZero: true
//                                 }
//                             }
//                         }
//                     });

//                     // Initialize calendar
//                     const calendarEl = document.getElementById(`calendarService${service.Service_ID}`);
//                     const calendar = new Calendar(calendarEl, {
//                         plugins: [dayGridPlugin, timeGridPlugin],
//                         initialView: 'dayGridMonth',
//                         events: [
//                             {
//                                 title: 'Booking 1',
//                                 start: '2024-07-01',
//                                 end: '2024-07-03'
//                             },
//                             {
//                                 title: 'Booking 2',
//                                 start: '2024-07-07',
//                                 allDay: true
//                             }
//                         ]
//                     });

//                     // Show calendar when button is clicked
//                     document.querySelector(`.booking-button[data-id="${service.Service_ID}"]`).addEventListener('click', () => {
//                         calendarEl.style.display = 'block';
//                         calendar.render();
//                     });
//                 });
//             } catch (error) {
//                 console.error('Fetch error:', error); // Log the error
//                 document.getElementById('service-list').innerHTML = `<p class="error">Failed to load services: ${error.message}</p>`;
//             }
//         };

//         fetchServices();
//     }, []);

//     return (
//         <section id="services">
//             <h2>Services</h2>
//             <div id="service-list"></div>
//         </section>
//     );
// };

// export default ServiceList;
////////////////////////////////////
// import React, { useEffect } from 'react';
// import './ServiceList.css';
// import Chart from 'chart.js/auto';
// import CustomCalendar from './CustomCalendar';

// const ServiceList = () => {
//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//                 const response = await fetch('http://localhost/api/services');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const services = await response.json();
//                 services.forEach(service => {
//                     const serviceCard = document.createElement('div');
//                     serviceCard.className = 'service-card';
//                     serviceCard.innerHTML = `
//                         <h3>${service.Service_title}</h3>
//                         <p class="description">${service.Service_Description}</p>
//                         <div class="rating">Rating: ⭐${'⭐'.repeat(service.Rating)}</div>
//                         <p class ="rate">Rate: Inquire for quotation</p>
//                         <p class="times">Operating Times: 9 AM - 5 PM</p>
//                         <p class="location">Location: 153 Jabulani Street, Orlando East Ext 5, Soweto</p>
//                         <div class="analytics">
//                             <h4>Analytics</h4>
//                             <canvas id="analyticsService${service.Service_ID}"></canvas>
//                         </div>
//                         <div class="calendar">
//                             <h4>Calendar Bookings</h4>
//                             <div id="calendarService${service.Service_ID}"></div>
//                         </div>
//                         <button class="booking-button" data-id="${service.Service_ID}">Check Bookings</button>
//                     `;
//                     document.getElementById('service-list').appendChild(serviceCard);

//                     // Initialize analytics chart
//                     const ctx = document.getElementById(`analyticsService${service.Service_ID}`).getContext('2d');
//                     new Chart(ctx, {
//                         type: 'bar',
//                         data: {
//                             labels: ['January', 'February', 'March', 'April', 'May'],
//                             datasets: [
//                                 {
//                                     label: 'Income',
//                                     data: [1200, 1500, 1100, 1700, 1300],
//                                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                                     borderColor: 'rgba(75, 192, 192, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Call Outs',
//                                     data: [5, 10, 3, 8, 7],
//                                     backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                                     borderColor: 'rgba(153, 102, 255, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Profile Views',
//                                     data: [50, 60, 55, 70, 65],
//                                     backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                                     borderColor: 'rgba(255, 159, 64, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Places Worked',
//                                     data: [3, 4, 2, 5, 3],
//                                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                                     borderColor: 'rgba(54, 162, 235, 1)',
//                                     borderWidth: 1
//                                 }
//                             ]
//                         },
//                         options: {
//                             scales: {
//                                 y: {
//                                     beginAtZero: true
//                                 }
//                             }
//                         }
//                     });

//                     // Events for the custom calendar
//                     const events = [
//                         { title: 'Booking 1', start: '2024-07-01' },
//                         { title: 'Booking 2', start: '2024-07-07' }
//                     ];

//                     // Render custom calendar
//                     const calendarContainer = document.getElementById(`calendarService${service.Service_ID}`);
//                     const calendarRoot = document.createElement('div');
//                     calendarContainer.appendChild(calendarRoot);
//                     ReactDOM.render(<CustomCalendar events={events} />, calendarRoot);

//                     // Show calendar when button is clicked
//                     document.querySelector(`.booking-button[data-id="${service.Service_ID}"]`).addEventListener('click', () => {
//                         calendarContainer.style.display = 'block';
//                     });
//                 });
//             } catch (error) {
//                 console.error('Fetch error:', error); // Log the error
//                 document.getElementById('service-list').innerHTML = `<p class="error">Failed to load services: ${error.message}</p>`;
//             }
//         };

//         fetchServices();
//     }, []);

//     return (
//         <section id="services">
//             <h2>Services</h2>
//             <div id="service-list"></div>
//         </section>
//     );
// };

// export default ServiceList;

/////////////////////////////////////////
// import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import './ServiceList.css';
// import Chart from 'chart.js/auto';
// import CustomCalendar from './CustomCalendar';

// const ServiceList = () => {
//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//                 const response = await fetch('http://localhost/api/services');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const services = await response.json();
//                 services.forEach(service => {
//                     const serviceCard = document.createElement('div');
//                     serviceCard.className = 'service-card';
//                     serviceCard.innerHTML = `
//                         <h3>${service.Service_title}</h3>
//                         <p class="description">${service.Service_Description}</p>
//                         <div class="rating">Rating: ⭐${'⭐'.repeat(service.Rating)}</div>
//                         <p class="rate">Rate: Inquire for quotation</p>
//                         <p class="times">Operating Times: 9 AM - 5 PM</p>
//                         <p class="location">Location: 153 Jabulani Street, Orlando East Ext 5, Soweto</p>
//                         <div class="analytics">
//                             <h4>Analytics</h4>
//                             <canvas id="analyticsService${service.Service_ID}"></canvas>
//                         </div>
//                         <div class="calendar">
//                             <h4>Calendar Bookings</h4>
//                             <div id="calendarService${service.Service_ID}"></div>
//                         </div>
//                         <button class="booking-button" data-id="${service.Service_ID}">Check Bookings</button>
//                     `;
//                     document.getElementById('service-list').appendChild(serviceCard);

//                     // Initialize analytics chart
//                     const ctx = document.getElementById(`analyticsService${service.Service_ID}`).getContext('2d');
//                     new Chart(ctx, {
//                         type: 'bar',
//                         data: {
//                             labels: ['January', 'February', 'March', 'April', 'May'],
//                             datasets: [
//                                 {
//                                     label: 'Income',
//                                     data: [1200, 1500, 1100, 1700, 1300],
//                                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                                     borderColor: 'rgba(75, 192, 192, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Call Outs',
//                                     data: [5, 10, 3, 8, 7],
//                                     backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                                     borderColor: 'rgba(153, 102, 255, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Profile Views',
//                                     data: [50, 60, 55, 70, 65],
//                                     backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                                     borderColor: 'rgba(255, 159, 64, 1)',
//                                     borderWidth: 1
//                                 },
//                                 {
//                                     label: 'Places Worked',
//                                     data: [3, 4, 2, 5, 3],
//                                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                                     borderColor: 'rgba(54, 162, 235, 1)',
//                                     borderWidth: 1
//                                 }
//                             ]
//                         },
//                         options: {
//                             scales: {
//                                 y: {
//                                     beginAtZero: true
//                                 }
//                             }
//                         }
//                     });

//                     // Events for the custom calendar
//                     const events = [
//                         { title: 'Booking 1', start: '2024-07-01' },
//                         { title: 'Booking 2', start: '2024-07-07' }
//                     ];

//                     // Render custom calendar
//                     const calendarContainer = document.getElementById(`calendarService${service.Service_ID}`);
//                     const calendarRoot = document.createElement('div');
//                     calendarContainer.appendChild(calendarRoot);
//                     ReactDOM.render(<CustomCalendar events={events} />, calendarRoot);

//                     // Show calendar when button is clicked
//                     document.querySelector(`.booking-button[data-id="${service.Service_ID}"]`).addEventListener('click', () => {
//                         calendarContainer.style.display = 'block';
//                     });
//                 });
//             } catch (error) {
//                 console.error('Fetch error:', error); // Log the error
//                 document.getElementById('service-list').innerHTML = `<p class="error">Failed to load services: ${error.message}</p>`;
//             }
//         };

//         fetchServices();
//     }, []);

//     return (
//         <section id="services">
//             <h2>Services</h2>
//             <div id="service-list"></div>
//         </section>
//     );
// };

// export default ServiceList;
////////////////////////////////////////////
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ServiceList.css';
import Chart from 'chart.js/auto';
import CustomCalendar from './CustomCalendar';

const ServiceList = () => {
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const services = await response.json();
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
          document.getElementById('service-list').appendChild(serviceCard);

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

          // Events for the custom calendar
          const events = [
            { title: 'Booking 1', start: '2024-07-01' },
            { title: 'Booking 2', start: '2024-07-07' }
          ];

          // Render custom calendar
          const calendarContainer = document.getElementById(`calendarService${service.Service_ID}`);
          const calendarRoot = document.createElement('div');
          calendarContainer.appendChild(calendarRoot);
          ReactDOM.render(<CustomCalendar events={events} />, calendarRoot);

          // Show calendar when button is clicked
          document.querySelector(`.booking-button[data-id="${service.Service_ID}"]`).addEventListener('click', () => {
            calendarContainer.style.display = 'block';
          });
        });
      } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('service-list').innerHTML = `<p class="error">Failed to load services: ${error.message}</p>`;
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services">
      <h2>Services</h2>
      <div id="service-list"></div>
    </section>
  );
};

export default ServiceList;
