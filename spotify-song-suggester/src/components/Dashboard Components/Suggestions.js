import React from "react";
import { useParams } from "react-router-dom";

const Suggestions = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Suggestions {id}</h1>
    </div>
  );
};

export default Suggestions;
