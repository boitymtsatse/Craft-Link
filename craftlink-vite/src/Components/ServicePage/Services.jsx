import React from "react";
import Button from "./addService-Form/Button";
import Calendar from "./Analytics/Calendar";
import LineChart from "./Analytics/LineChart";
import BarChart from "./Analytics/BarChart";

const Services = () => {
  const onClick = async (e) => {
    console.log("console");
  };

  return (
    <>
      <Button color="purple" text="Service 1" onClick={onClick}></Button>
      <Calendar/>
    <LineChart/>
    <BarChart/>
    </>
  );
};

export default Services;
