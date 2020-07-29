import React from "react";

//Components
import Sliders from "./Sliders";

const AddMood = () => {
  return (
    <div className="add-mood-container">
      <h4>Adjust sliders to create a new mood</h4>
      <Sliders />
    </div>
  );
};

export default AddMood;
