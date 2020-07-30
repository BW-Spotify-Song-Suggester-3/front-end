import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { predictionsAction } from "../Actions/spotifyActions";
import SuggestionCards from "./SuggestionCards";

const initialMood = {
  moods: [
    {
      mood: "danceability",
      value: "low",
    },
    {
      mood: "energy",
      value: "low",
    },
    {
      mood: "speechiness",
      value: "low",
    },
    {
      mood: "acousticness",
      value: "low",
    },
    {
      mood: "liveness",
      value: "low",
    },
    {
      mood: "valence",
      value: "low",
    },
    {
      mood: "tempo",
      value: "low",
    },
  ],
};

const moodCreated = [];

const Sliders = (props) => {
  const [moodValues, setMoodValues] = useState(initialMood);
  const [loaded, setLoaded] = useState(false);

  const changeHandler = (event) => {
    console.log("Change Handler Reached", event.target.mood);
    // const newMood = initialMood.map((mood) =>
    //   event.target.name === mood.name
    //     ? { name: event.target.name, value: event.target.value }
    //     : { name: mood.name, value: mood.value }
    // );

    setMoodValues({
      ...moodValues,
      moods: [{ mood: event.target.name, value: event.target.value }],
    });

    // setMoodValues(newMood);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("MOOD VALUES:", moodValues);

    axios
      .post(`https://spotify-data-api.herokuapp.com/predictmood`, moodValues)
      .then((res) => props.predictionsAction(res.data))
      .catch((err) => console.log(err));
    setLoaded(true);
  };

  if (loaded === true) {
    return <SuggestionCards />;
  } else
    return (
      <div className="add-mood-form">
        <form onSubmit={submitHandler}>
          {initialMood.moods.map((mood) => (
            <div key={mood.mood}>
              <h3>{mood.mood}</h3>
              <select name={mood.mood} onChange={changeHandler}>
                <option value=""></option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          ))}
          <button type="submit">Add Mood</button>
        </form>
      </div>
    );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    recommendedSongs: state.recommendedSongs,
  };
};

export default connect(mapStateToProps, { predictionsAction })(Sliders);
