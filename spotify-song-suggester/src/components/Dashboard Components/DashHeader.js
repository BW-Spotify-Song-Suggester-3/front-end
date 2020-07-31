import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

const DashHeader = () => {
  const { url } = useRouteMatch();
  const history = useHistory();

  const logoutHandler = () => {
    window.localStorage.removeItem("access_token");
    history.push("/dashboard");
  };

  return (
    <header className="dashboard-header">
      <Link to="/dashboard">
        <h1>Songestions</h1>
      </Link>
      <div>
        <Link to={`${url}/addsong`}>Add Song</Link>
        <Link to={`${url}/addmood`}>Add Mood</Link>
        <Link to="/dashboard" onClick={logoutHandler}>
          Log Out
        </Link>
      </div>
    </header>
  );
};

export default DashHeader;
