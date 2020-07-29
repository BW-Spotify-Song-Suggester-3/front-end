import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";

const FavSongs = (props) => {
  const [favSongs, setFavSongs] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`songs/user/${props.userData}`)
      .then((res) => {
        console.log("Get Songs Request:", res);
        setFavSongs(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.userData]);

  if (favSongs.length === 0) {
    return null;
  } else {
    return (
      <div>
        {favSongs.map((song) => (
          <p key={song.spotifyid}>
            {song.name} and {song.artist}
          </p>
        ))}
      </div>
    );
  }
};

const mapsStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapsStateToProps, {})(FavSongs);
