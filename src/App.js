import React from "react";
import "./App.css";
import { GAME_SCREEN, HOME_SCREEN } from "./utils/constants";
import Home from "./components/Home/index";
import Game from "./components/Game/index";
import { UserContext, userInfo } from "./components/UserContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: HOME_SCREEN,
      userInfo: { ...userInfo },
      error: {
        isError: false,
        message: "",
      },
    };
  }

  handleLevelChange = (event) => {
    this.setState({
      userInfo: { ...this.state.userInfo, gameLevel: event.target.value },
    });
  };

  handleUserChange = (e) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        username: e.target.value,
      },
      error: { isError: false, message: "" },
    });
  };
  
  startGame = () => {
    if (!this.state.userInfo.username) {
      this.setState({
        error: { isError: true, message: "Please type your name" },
      });
      return;
    }
    this.setState({ currentScreen: GAME_SCREEN });
  };

  quitGame = () => {
     this.setState({currentScreen:HOME_SCREEN})
  }

  render() {
    const { currentScreen } = this.state;
    console.log(this.context, "--->context");
    return (
      <UserContext.Provider value={this.state.userInfo}>
        <div className="App">
          {currentScreen === HOME_SCREEN ? (
            <Home
              _handleLevelChange={this.handleLevelChange}
              _handleUserChange={this.handleUserChange}
              startGame={this.startGame}
              error={this.state.error}
            />
          ) : (
            <Game quitGame = {this.quitGame} />
          )}
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
