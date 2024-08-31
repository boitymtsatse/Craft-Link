// import React, { useState } from 'react';
// // import SideBar from "./SideBar";
// import './history.css';


// const UserHistory = () => {
//   const [roleFilter, setRoleFilter] = useState('all');
//   const [typeFilter, setTypeFilter] = useState('all');
//   const [historyItems, setHistoryItems] = useState([
//     // Sample data, replace with actual data or fetch from an API
//     { date: '2023-07-14', type: 'Electrician', description: 'Completed an electrical job .' },
//     { date: '2023-07-15', type: 'payment', description: 'Received payment for services.' },
//     { date: '2023-07-16', type: 'review', description: 'Received a review from a client.' },
//   ]);

//   const filteredHistoryItems = historyItems.filter((item) => {
//     return (roleFilter === 'all' || item.role === roleFilter) &&
//            (typeFilter === 'all' || item.type === typeFilter);
//   });

//   const handleRoleFilterChange = (e) => {
//     setRoleFilter(e.target.value);
//   };

//   const handleTypeFilterChange = (e) => {
//     setTypeFilter(e.target.value);
//   };

//   const handleApplyFilter = () => {
//     // You can add additional logic here if needed
//   };

//   return (
//     <div>
//       <h1>User History</h1>

//       <section>
//         <label>Role:</label>
//         <select id="role-filter" value={roleFilter} onChange={handleRoleFilterChange}>
//           <option value="all">All</option>
//           <option value="client">Client</option>
//           <option value="service-provider">Service Provider</option>
//         </select>
//         <label>Type:</label>
//         <select id="type-filter" value={typeFilter} onChange={handleTypeFilterChange}>
//           <option value="all">All</option>
//           <option value="job">Job</option>
//           <option value="payment">Payment</option>
//           <option value="review">Review</option>
//         </select>
//         <button className="button" id="apply-filter" onClick={handleApplyFilter}>Apply Filter</button>
//       </section>

//       <section>
//         <table className="table" id="history-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody id="history-table-body">
//             {filteredHistoryItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.date}</td>
//                 <td>{item.type}</td>
//                 <td>{item.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//       {/* <SideBar/> */}
//     </div>
//   );
// };

// export default UserHistory;

import React, { useState, useEffect } from 'react';
import './history.css';
import SideBar from "./SideBar";

const UserHistory = () => {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'history',
          }),
        });
        const data = await response.json();
        if (data.status === 'success') {
          setHistoryItems(data.data);
        }
        console.log(historyItems);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <SideBar />
      <div className="content">
        <h1>User History</h1>
        <section>
          <table className="table" id="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Service</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody id="history-table-body">
              {historyItems.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.Billing_Date).toLocaleDateString()}</td>
                  <td>{item.Service_title}</td>
                  <td>R {item.Amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default UserHistory;
/* look */
