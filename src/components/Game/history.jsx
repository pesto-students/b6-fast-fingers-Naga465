import React from "react";
import { GAME_LEVELS, PUBLIC_IMAGE_PATH } from "../../utils/constants";

function PlayerInfo(props) {
  const { name: username, gameLevel } = props;
  return (
    <div style={{ minHeight: 100, minWidth: 100 }}>
      {[
        { label: username, img: `/person-icon.svg` },
        {
          label: GAME_LEVELS.find((item) => item.key === gameLevel).label,
          img: `/gamepad-icon.svg`,
        },
      ].map((ele) => (
        <div key={ele.label} className="flex_row color-defalut padding_top_15">
          <img alt="user_logo" src={`${PUBLIC_IMAGE_PATH}${ele.img}`}></img>
          <label className="color-default text-style padding_left_15">
            {ele.label}
          </label>
        </div>
      ))}
    </div>
  );
}
export default PlayerInfo