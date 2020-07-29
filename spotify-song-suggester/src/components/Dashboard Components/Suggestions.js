import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosWithAuthSpotify } from "../utils/axiosWithAuth";
import axios from "axios";
import SuggestionCards from "./SuggestionCards";
import { predictionsAction } from "../Actions/spotifyActions";

const Suggestions = (props) => {
  const { id } = useParams();
  const [song, setSong] = useState(id);
  const [loading, toggleLoading] = useState(true);
  const [suggestions, setSuggestions] = useState(null);
  const [suggestionsData, setSuggestionsData] = useState([]);

  const songObject = {
    songs: [id],
  };

  useEffect(() => {
    axios
      .post("https://spotify-data-api.herokuapp.com/predictfav", songObject)
      .then((res) => {
        console.log("Predictor response:", res);
        setSuggestions(res.data);
        toggleLoading(false);
      })
      .catch((err) => console.log("Predictor response:", err));
  }, []);

  //   useEffect(() => {
  //     axiosWithAuthSpotify()
  //       .get(song)
  //       .then((res) => {
  //         console.log("SPOTIFY RESPONSE:", res);
  //         setSong(res.data);
  //         toggleLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log("SPOTIFY ERROR:", err);
  //       });
  //   }, [song]);

  //   const callPredictor = () => {
  //     axios
  //       .post("https://spotify-data-api.herokuapp.com/predictfav", songObject)
  //       .then((res) => {
  //         console.log("Predictor response:", res);
  //         setSuggestions(res.data);
  //       })
  //       .catch((err) => console.log("Predictor response:", err))
  //       .finally(() => {
  //         console.log("suggestions:", suggestions);
  //       });
  //   };

  const getSuggestions = (event) => {
    event.preventDefault();
    props.predictionsAction(suggestions);
  };

  if (loading === true) {
    return <h1>loading...</h1>;
  } else {
    return (
      <div>
        Hello Suggestions: {JSON.stringify(suggestions)}
        {/* <h1>
          Suggestions based on {song.name} by {song.artists[0].name}
        </h1> */}
        {/* <div className="fav-songs-card">
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
        </div> */}
        <SuggestionCards />
        {/* <button onClick={callPredictor}>Call Predictor</button> */}
        <button onClick={getSuggestions}>Render Suggestions</button>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    recommendedSongs: state.recommendedSongs,
  };
};

export default connect(mapStateToProps, { predictionsAction })(Suggestions);
