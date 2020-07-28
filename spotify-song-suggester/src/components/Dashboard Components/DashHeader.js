import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const DashHeader = () => {
  const { url } = useRouteMatch();

  return (
    <header>
      <h1>Dashboard Header</h1>

      <Link to={`${url}/addsong`}>Add Song</Link>
      <Link to={`${url}/addmood`}>Add Mood</Link>
    </header>
  );
};

export default DashHeader;
