import React, { useEffect, useState } from "react";
import { axiosWithAuth, axiosWithAuthSpotify } from "../utils/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [song, setSong] = useState();
  const [loading, toggleLoading] = useState(true);
  const [deleting, toggleDeleting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get(`https://tjs-songsuggest.herokuapp.com/songs/song/${id}`)
      .then((res) => {
        console.log("edit api:", res.data);
        setSong(res.data);
        toggleLoading(false);
      });
  }, []);

  const deleteSong = () => {
    axiosWithAuth()
      .delete(`songs/delete/song/${id}`)
      .then((res) => {
        console.log(res);
        toggleDeleting(true);
        setTimeout(() => history.push("/dashboard"), 2000);
      })
      .catch((err) => console.log(err));
  };

  if (loading === true) {
    return <h1>loading...</h1>;
  } else if (deleting === true) {
    return <h1>deleting...</h1>;
  } else
    return (
      <div className="fav-songs-card">
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
              <div onClick={() => deleteSong(song.songid)}>Delete</div>
              <div onClick={() => deleteSong(song.songid)}>Edit</div>
            </div>
            <embed src={song.previewurl} className="song-preview" />
          </div>
        </div>
      </div>
    );
};

export default Edit;
