import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

//Components
import AddSong from "./AddSong";
import AddMood from "./AddMood";
import Moods from "./Moods";
import FavSongs from "./FavSongs";
import Suggestions from "./Suggestions";
import Edit from "./Edit";

const DashBody = () => {
  const { path } = useRouteMatch();

  return (
    <div className="dashboard-body">
      <Switch>
        <Route exact path={`${path}`}>
          <h1>Dashboard Body</h1>
          <FavSongs />
          <Moods />
        </Route>
        <Route exact path={`${path}/addsong`} component={AddSong} />
        <Route exact path={`${path}/addmood`} component={AddMood} />
        <Route path={`${path}/suggestions/:id`} component={Suggestions} />
        <Route path={`${path}/edit/:id`} component={Edit} />
      </Switch>
    </div>
  );
};

export default DashBody;
