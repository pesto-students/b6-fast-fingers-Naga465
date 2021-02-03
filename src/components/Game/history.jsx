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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "#ff5155",
            margin: "auto",
            paddingTop: 5,
          }}
        >
          <img alt="user_logo" src={`${PUBLIC_IMAGE_PATH}${ele.img}`}></img>
          <h1 style={{ paddingRight: 10, paddingLeft: 10 }}>{ele.label}</h1>
        </div>
      ))}
    </div>
  );
}
export default History;
