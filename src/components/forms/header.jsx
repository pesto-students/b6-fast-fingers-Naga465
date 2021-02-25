import React from "react";
import { PUBLIC_IMAGE_PATH } from "../../utils/constants";

const Header = ({ title = "", tagLine = "" }) => {
  return (
    <div className="flex_column">
      <img alt="keyboard-logo" src={`${PUBLIC_IMAGE_PATH}/keyboard-icon.svg`} />
      <label className="header_label">{title}</label>
      <div
        style={{ alignItems: "center", justifyContent: "space-between" }}
        className="flex_row"
      >
        <div className="header_line"></div>
        <p
          className="color-default"
          style={{ paddingRight: 8, paddingLeft: 8 }}
        >
          {tagLine}
        </p>
        <div className="header_line"></div>
      </div>
    </div>
  );
};

export default Header;
