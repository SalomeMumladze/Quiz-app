import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { useState } from "react";

export const difficulties = [
  { id: "total_easy_question_count", name: "Easy" },
  { id: "total_medium_question_count", name: "Medium" },
  { id: "total_hard_question_count", name: "Hard" },
];

const Choose = () => {
  const [difficulty, setDifficulty] = useState({});

  const handleDifficultyChange = (e) => {
    e.preventDefault();
    const selectedDifficulty = difficulties.find(
      (diff) => diff.id === e.target.value
    );
    setDifficulty(selectedDifficulty);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="difficulty-select-label">Select Difficulty:</InputLabel>
      <Select
        required
        name="difficulty"
        value={difficulty.id || ""}
        id="difficulty-select"
        label="Select Difficulty"
        labelId="difficulty-select-label"
        onChange={handleDifficultyChange}
      >
        {difficulties.map((difficulty) => (
          <MenuItem key={difficulty.id} value={difficulty.id}>
            {difficulty.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Choose;
