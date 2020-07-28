import React, { useState } from "react";
import { axiosWithAuthSpotify } from "../utils/axiosWithAuthSpotify";

const initialUrl = "";

const AddSong = () => {
  const [songUrl, setSongUrl] = useState(initialUrl);
  const [songData, setSongData] = useState();

  const onChange = (event) => {
    setSongUrl(event.target.value);
  };
  // https://open.spotify.com/track/1Hd2XLitkt1PYCWSbfF5qV?si=_kJzDZvrQ_ukzzXtwi7KKg

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

  return (
    <div className="add-song-body">
      <form onSubmit={onSubmit}>
        <h3>Paste Spotify URL to Add a Song </h3>
        <p>
          Go to your favorite song on spotify, click the three dots on the right
          right, and then click Share and Copy Song Link
        </p>
        <input type="url" value={songUrl} onChange={onChange}></input>
        <button type="submit">Add Song</button>

        {!songData ? null : (
          <div className="add-song-response-body">
            <img src={songData.album.images[1].url} alt={songData.album.name} />
            <h4>{songData.name}</h4>
            <h4>{songData.artists[0].name}</h4>
            <embed src={songData.preview_url} />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddSong;
