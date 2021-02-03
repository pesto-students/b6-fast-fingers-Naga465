import React from "react";
import { GAME_LEVELS, PUBLIC_IMAGE_PATH } from "../../utils/constants";
import { APP_HEADER } from "../forms";
import { UserContext } from "../UserContext";

class Home extends React.Component {
  static contextType = UserContext

  render() {
    let { username, gameLevel } =  this.context || {}; 
    const {isError,message} =  this.props.error;
    return (
      <div style ={{marginTop:30}} className="main_container">
        <div style ={{alignItems:"center"}} className="flex_column">
          <APP_HEADER />
          <div className = 'flex_column' style ={{marginBottom:20,alignItems:'flex-start'}}>
          <input
            className = 'input-name'
            value={username}
            onChange={this.props._handleUserChange}
            placeholder="Type your name"
          />
          {isError && <label className = 'input_error'>{message}</label> } 
          </div>
          <select
            className = 'select-level'
            value={gameLevel}
            onChange={this.props._handleLevelChange}
          >
            {GAME_LEVELS.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
          <div style ={{marginTop:20}} onClick={this.props.startGame} className="flex_row">
            <img
              src={`${PUBLIC_IMAGE_PATH}/play-icon.svg`}
              alt="start_game"
            ></img>
            <label className = 'start-game'> START GAME </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
