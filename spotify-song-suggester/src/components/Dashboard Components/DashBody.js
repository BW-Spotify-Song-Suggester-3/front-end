import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

//Components
import AddSong from "./AddSong";
import AddMood from "./AddMood";

const DashBody = () => {
  const { path } = useRouteMatch();

  return (
    <div className="dashboard-body">
      <h1>Dashboard Body</h1>
      <Switch>
        <Route path={`${path}/addsong`} component={AddSong} />
        <Route path={`${path}/addmood`} component={AddMood}></Route>
      </Switch>
    </div>
  );
};

export default DashBody;
