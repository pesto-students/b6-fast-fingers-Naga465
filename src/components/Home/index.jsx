import React, { useContext } from "react";
import { GAME_LEVELS } from "../../utils/constants";
import Button from "../forms/button";
import Header from "../forms/header";
import Select from "../forms/select";
import TextInput from "../forms/textInput";
import { UserContext } from "../UserContext";

function Home({ _handleLevelChange, _handleUserChange, startGame, ...props }) {
  const { username, gameLevel } = useContext(UserContext);
  return (
    <div style={{ marginTop: 30 }} className="main_container">
      <div style={{ alignItems: "center" }} className="flex_column">
        <Header tagLine="the ultimate typing game" title="fast fingers" />
        <TextInput placeholder ='Type your name' onChange={_handleUserChange} value={username} />
        <Select
          onChange={_handleLevelChange}
          options={GAME_LEVELS}
          value={gameLevel}
        />
        <Button icon="play-icon.svg" onClick={startGame} name="Start Game" />
      </div>
    </div>
  );
}

export default Home;
