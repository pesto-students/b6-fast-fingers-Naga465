import React, { useState } from "react";
import "./App.css";
import { GAME_SCREEN, HOME_SCREEN } from "./utils/constants";
import Home from "./components/Home/index";
import Game from "./components/Game/index";
import { userInfo ,UserContext} from "./components/UserContext";

function App() {
  const { username, gameLevel, theme } = userInfo;
  const [name, setUsername] = useState(username);
  const [level, setGameLevel] = useState(gameLevel);
  const [screen, updateScreen] = useState(HOME_SCREEN);

  const startGame = () => {
    updateScreen(GAME_SCREEN);
  };

  const stopGame = () => {
    updateScreen(HOME_SCREEN);
  };

  const getChildren = () => {
    switch (screen) {
      case HOME_SCREEN: {
        return (
          <Home
            _handleLevelChange={({ target: { value } }) => setGameLevel(value)}
            _handleUserChange={({ target: { value } }) => setUsername(value)}
            startGame={startGame}
            error={""}
          />
        );
      }
      case GAME_SCREEN: {
        return <Game quitGame={stopGame} />;
      }
      default:
        return <h1>Comming soon...</h1>;
    }
  };

  return (
    <UserContext.Provider value={{ username: name, gameLevel: level, theme }}>
      <div className="App">{getChildren()}</div>
    </UserContext.Provider>
  );
}
export default App;
