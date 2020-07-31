import React, { useState } from "react";
import { axiosWithAuthSpotify } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { saveSongAPI } from "../APIs/saveSongAPI";
import { useHistory } from "react-router-dom";

const initialUrl = "";

const AddSong = (props) => {
  const [songUrl, setSongUrl] = useState(initialUrl);
  const [songData, setSongData] = useState();
  const [loading, toggleLoading] = useState(false);
  const ID = props.userData;
  const history = useHistory();

  const onChange = (event) => {
    setSongUrl(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let url = songUrl;
    console.log("URL:", url);
    let spotifyID = url.slice(31, 53);
    console.log("SPOTIFYID:", spotifyID);

    axiosWithAuthSpotify()
      .get(`${spotifyID}`)
      .then((res) => {
        console.log("SPOTIFY RESPONSE:", res);
        setSongData(res.data);
      })
      .catch((err) => {
        console.log("SPOTIFY ERROR:", err);
      });
  };

  const saveSong = (songData, userID) => {
    saveSongAPI(songData, userID);
    toggleLoading(true);
    setTimeout(() => history.push("/dashboard"), 2500);
  };

  if (loading === true) {
    return (
      <div className="fetching-suggestions">
        <div class="lds-heart">
          <div></div>
        </div>
        <h1>adding song...</h1>
        <div class="lds-heart">
          <div></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="add-song-body">
        <form onSubmit={onSubmit} className="add-song-form">
          <h3>Add a Song </h3>
          <p>
            Go to your favorite song on spotify, click the three dots on the
            right right, and then click Share and Copy Song Link
          </p>
          <input type="url" value={songUrl} onChange={onChange}></input>
          <button type="submit" className="add-song-button">
            Search for Song
          </button>

          {!songData ? null : (
            <div className="fav-songs-card">
              <div key={songData.spotifyid} className="song-cards">
                <img
                  src={songData.album.images[0].url}
                  alt={songData.album.name}
                  className="album-covers"
                />
                <div className="info-container">
                  <div className="info-box">
                    <div className="title">{songData.name}</div>
                    <div className="artist">{songData.artists[0].name}</div>
                  </div>
                  <div
                    className="action-box"
                    onClick={() => saveSong(songData, ID)}
                  >
                    Add Song To Favorites
                  </div>

                  <embed src={songData.preview_url} className="song-preview" />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
};

const mapsStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapsStateToProps, {})(AddSong);
