import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

//Components
import AddSong from "./AddSong";
import AddMood from "./AddMood";
import Moods from "./Moods";
import FavSongs from "./FavSongs";

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
        <Route path={`${path}/addsong`} component={AddSong} />
        <Route path={`${path}/addmood`} component={AddMood} />
      </Switch>
    </div>
  );
};

export default DashBody;
