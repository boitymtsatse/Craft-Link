import React, { useState } from 'react';


const UserHistory = () => {
  const [roleFilter, setRoleFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [historyItems, setHistoryItems] = useState([
    // Sample data, replace with actual data or fetch from an API
    { date: '2023-07-14', type: 'job', description: 'Completed a web development project.' },
    { date: '2023-07-15', type: 'payment', description: 'Received payment for services.' },
    { date: '2023-07-16', type: 'review', description: 'Received a review from a client.' },
  ]);

  const filteredHistoryItems = historyItems.filter((item) => {
    return (roleFilter === 'all' || item.role === roleFilter) &&
           (typeFilter === 'all' || item.type === typeFilter);
  });

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleApplyFilter = () => {
    // You can add additional logic here if needed
  };

  return (
    <div>
      <h1>User History</h1>

      <section>
        <label>Role:</label>
        <select id="role-filter" value={roleFilter} onChange={handleRoleFilterChange}>
          <option value="all">All</option>
          <option value="client">Client</option>
          <option value="service-provider">Service Provider</option>
        </select>
        <label>Type:</label>
        <select id="type-filter" value={typeFilter} onChange={handleTypeFilterChange}>
          <option value="all">All</option>
          <option value="job">Job</option>
          <option value="payment">Payment</option>
          <option value="review">Review</option>
        </select>
        <button className="button" id="apply-filter" onClick={handleApplyFilter}>Apply Filter</button>
      </section>

      <section>
        <table className="table" id="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody id="history-table-body">
            {filteredHistoryItems.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserHistory;
