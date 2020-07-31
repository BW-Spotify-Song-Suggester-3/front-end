import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosWithAuthSpotify } from "../utils/axiosWithAuth";
import axios from "axios";
import SuggestionCards from "./SuggestionCards";
import { predictionsAction } from "../Actions/spotifyActions";

const Suggestions = (props) => {
  const { id } = useParams();
  const [loading, toggleLoading] = useState(true);
  const [suggestions, setSuggestions] = useState(null);

  const songObject = {
    songs: [id],
  };

  useEffect(() => {
    axios
      .post("https://spotify-data-api.herokuapp.com/predictfav", songObject)
      .then((res) => {
        console.log("Predictor response:", res);
        setSuggestions(res.data[0]);
        toggleLoading(false);
      })
      .catch((err) => console.log("Predictor response:", err));
  }, []);

  const getSuggestions = (event) => {
    event.preventDefault();
    props.predictionsAction(suggestions);
  };

  if (loading === true) {
    return (
      <div className="fetching-suggestions-2">
        <div className="lds-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>LOADING</h1>
      </div>
    );
  } else {
    return (
      <div>
        <SuggestionCards />
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
