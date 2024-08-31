import React from "react";
import Calendar from "./Analytics/Calendar";
import LineChart from "./Analytics/LineChart";
import BarChart from "./Analytics/BarChart";
const AnaService = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Analytics Dashboard
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div style={{ flex: 1, marginRight: "10px" }}>
          <Calendar />
        </div>
        <div style={{ flex: 1, marginRight: "10px" }}>
          <LineChart />
        </div>
        <div style={{ flex: 1 }}>
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default AnaService;
