import React from "react";
import "./App.css";
import {GAME_SCREEN, HOME_SCREEN } from "./utils/constants";
import Home from "./components/Home/index";
import Game from "./components/Game/index";
import {UserContext,userInfo} from './components/UserContext'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: HOME_SCREEN,
      userInfo: {...userInfo}
    };
  }

  handleLevelChange = (event) => {
    this.setState({userInfo : {...this.state.userInfo, gameLevel: event.target.value }});
  };
  handleUserChange = (e) => {
    this.setState({ userInfo : {...this.state.userInfo , username: e.target.value }});
  };
  startGame = () => {
    this.setState({ currentScreen: GAME_SCREEN });
  };

  render() {
    const { currentScreen } = this.state;
    console.log(this.context,"--->context")
    return (
      <UserContext.Provider value={this.state.userInfo}>
        <div className="App">
          {currentScreen === HOME_SCREEN ? (
            <Home
              _handleLevelChange={this.handleLevelChange}
              _handleUserChange={this.handleUserChange}
              startGame={this.startGame}
            />
          ) : (
            <Game/>
          )}
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
