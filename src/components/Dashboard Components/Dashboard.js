import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//Components
import DashHeader from "./DashHeader";
import DashBody from "./DashBody";

const Dashboard = (props) => {
  return (
    <div className="app-wrapper">
      <DashHeader />
      <DashBody />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    recommendedSongs: state.recommendedSongs,
    username: state.username,
  };
};

export default connect(mapStateToProps, {})(Dashboard);
