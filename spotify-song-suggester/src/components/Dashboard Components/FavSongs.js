import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

const FavSongs = (props) => {
  const [favSongs, setFavSongs] = useState([]);
  const { url } = useRouteMatch();

  useEffect(() => {
    axiosWithAuth()
      .get(`songs/user/${props.userData}`)
      .then((res) => {
        console.log("Get Songs Request:", res);
        setFavSongs(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.userData]);

  const deleteSong = (songId) => {
    axiosWithAuth()
      .delete(`songs/delete/song/${songId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (favSongs.length < 1) {
    return null;
  } else {
    return (
      <div className="fav-songs-card">
        {favSongs.map((song) => (
          <div key={song.spotifyid} className="song-cards">
            <img
              src={song.albumcover}
              alt={song.album}
              className="album-covers"
            />
            <div className="info-container">
              <div className="info-box">
                <div className="title">{song.name}</div>
                <div className="artist">{song.artist}</div>
              </div>
              <div className="action-box">
                <div onClick={() => deleteSong(song.songid)}>
                  Remove from Favs
                </div>
                <Link to={`${url}/suggestions/${song.spotifyid}`}>
                  See Suggestions
                </Link>
              </div>

              <embed src={song.previewurl} className="song-preview" />
            </div>
          </div>
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
