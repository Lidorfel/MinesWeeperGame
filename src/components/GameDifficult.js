import React from "react";

function gameDifficult({ handleDifficult }) {
  return (
    <div className="diff-selection-div">
      <select
        className="custom-select"
        onChange={(e) => handleDifficult(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}

export default gameDifficult;
