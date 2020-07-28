import React from "react";

//Components
import DashHeader from "./DashHeader";
import DashBody from "./DashBody";

const Dashboard = () => {
  return (
    <div className="app-wrapper">
      <DashHeader />
      <DashBody />
    </div>
  );
};

export default Dashboard;
