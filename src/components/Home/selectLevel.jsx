import React, { useState } from "react";
import { GAME_LEVELS } from "../../utils/constants";
import Button from "../forms/button";
import Header from "../forms/header";
import Select from "../forms/select";

function LevelSelect(props) {
  const [gameLevel, updateGameLevel] = useState("easy_level");

  const startGame = () => {
    props.updateStorage((state) => ({ ...state, gameLevel }));
  };

  return (
    <div style={{ alignItems: "center" }} className="main_container">
      <div className="flex_column">
        <Header tagLine="the ultimate typing game" title="fast fingers" />
        <Select
          onChange={({ target: { value } }) => updateGameLevel(value)}
          options={GAME_LEVELS}
          value={gameLevel}
        />
        <Button icon="play-icon.svg" onClick={startGame} name="Start Game" />
      </div>
    </div>
  );
}

export default LevelSelect;
