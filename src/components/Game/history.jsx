import React, { useContext } from "react";
import { PUBLIC_IMAGE_PATH } from "../../utils/constants";

import { UserContext } from "../UserContext";

function History({ gameHistory = [], bestScore = {}, ...rest }) {
  const { username, gameLevel } = useContext(UserContext);
  return (
    <div style={{ minHeight: 100, minWidth: 100 }}>
      {[
        { label: username, img: `/person-icon.svg` },
        { label: gameLevel, img: `/gamepad-icon.svg` },
      ].map((ele) => (
        <div className="flex_row color-defalut padding_top_15">
          <img alt="user_logo" src={`${PUBLIC_IMAGE_PATH}${ele.img}`}></img>
          <label className="color-default text-style padding_left_15">
            {ele.label}
          </label>
        </div>
      ))}
    </div>
  );
}
export default History;
