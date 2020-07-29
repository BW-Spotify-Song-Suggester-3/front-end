import React, { useState } from "react";
import { axiosWithAuthSpotify, axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { saveSongAPI } from "../APIs/saveSongAPI";

const initialUrl = "";

const AddSong = (props) => {
  const [songUrl, setSongUrl] = useState(initialUrl);
  const [songData, setSongData] = useState();
  const ID = props.userData;

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
  };

  return (
    <div className="add-song-body">
      <form onSubmit={onSubmit}>
        <h3>Paste Spotify URL to Add a Song </h3>
        <p>
          Go to your favorite song on spotify, click the three dots on the right
          right, and then click Share and Copy Song Link
        </p>
        <input type="url" value={songUrl} onChange={onChange}></input>
        <button type="submit">Search for Song</button>

        {!songData ? null : (
          <div className="add-song-response-body">
            <img src={songData.album.images[1].url} alt={songData.album.name} />
            <h4>{songData.name}</h4>
            <h4>{songData.artists[0].name}</h4>
            <embed src={songData.preview_url} />
            <div onClick={() => saveSong(songData, ID)}>
              Add Song To Favorites
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

const mapsStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapsStateToProps, {})(AddSong);
