import React, { useState } from "react";

const initialMood = [
  {
    mood: "Danceability",
    value: "low",
  },
  {
    mood: "Energy",
    value: "low",
  },
  {
    mood: "Speechiness",
    value: "low",
  },
  {
    mood: "Acousticness",
    value: "low",
  },
  {
    mood: "Liveness",
    value: "low",
  },
  {
    mood: "Valence",
    value: "low",
  },
  {
    mood: "Tempo",
    value: "low",
  },
];

const moodCreated = [];

export default function Sliders() {
  const [moodValues, setMoodValues] = useState(moodCreated);

  const changeHandler = (event) => {
    console.log("Change Handler Reached", event.target.mood);
    // const newMood = initialMood.map((mood) =>
    //   event.target.name === mood.name
    //     ? { name: event.target.name, value: event.target.value }
    //     : { name: mood.name, value: mood.value }
    // );

    setMoodValues([
      ...moodValues,
      { mood: event.target.name, value: event.target.value },
    ]);

    // setMoodValues(newMood);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("MOOD VALUES:", moodValues);
  };

  return (
    <div className="add-mood-form">
      <form onSubmit={submitHandler}>
        {initialMood.map((mood) => (
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
}
