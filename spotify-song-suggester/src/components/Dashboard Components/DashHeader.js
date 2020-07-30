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
    <header>
      <Link to="/dashboard">
        <h1>Dashboard Header</h1>
      </Link>
      <Link to={`${url}/addsong`}>Add Song</Link>
      <Link to={`${url}/addmood`}>Add Mood</Link>
      <div onClick={logoutHandler}>Log Out</div>
    </header>
  );
};

export default DashHeader;
