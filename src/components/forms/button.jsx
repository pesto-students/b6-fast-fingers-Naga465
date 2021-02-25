import React from "react";
import { PUBLIC_IMAGE_PATH } from "../../utils/constants";

const Button = ({ name = "Start Game", icon = "", onClick, ...rest }) => {
  return (
    <div
      style={{ marginTop: 20, cursor: "pointer" }}
      onClick={onClick}
      className="flex_row"
    >
      <img src={`${PUBLIC_IMAGE_PATH}/${icon}`} alt="start game"></img>
      <label className="start-game padding_left_15">{name}</label>
    </div>
  );
};

export default Button;
