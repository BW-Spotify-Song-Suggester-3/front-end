import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithAuthSpotify } from "../utils/axiosWithAuth";

const Suggestions = () => {
  const { id } = useParams();
  const [song, setSong] = useState(id);
  const [loading, toggleLoading] = useState(true);

  useEffect(() => {
    axiosWithAuthSpotify()
      .get(song)
      .then((res) => {
        console.log("SPOTIFY RESPONSE:", res);
        setSong(res.data);
        toggleLoading(false);
      })
      .catch((err) => {
        console.log("SPOTIFY ERROR:", err);
      });
  }, []);

  if (loading === true) {
    return <h1>loading...</h1>;
  } else {
    return (
      <div>
        <h1>
          Suggestions based on {song.name} by {song.artists[0].name}
        </h1>
        <div className="fav-songs-card">
          <div key={song.spotifyid} className="song-cards">
            <img
              src={song.album.images[0].url}
              alt={song.album.name}
              className="album-covers"
            />
            <div className="info-container">
              <div className="info-box">
                <div className="title">{song.name}</div>
                <div className="artist">{song.artists[0].name}</div>
              </div>

              <embed src={song.preview_url} className="song-preview" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Suggestions;
