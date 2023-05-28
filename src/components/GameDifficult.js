import React from "react";

function gameDifficult({ handleDifficult }) {
  return (
    <div style={{ position: "absolute", left: 40 }}>
      <select onChange={(e) => handleDifficult(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}

export default gameDifficult;
