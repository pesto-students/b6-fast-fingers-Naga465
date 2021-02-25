import React from "react";
import { EASY_LEVEL } from "../utils/constants";

export const userInfo = {
  username: "",
  gameLevel: EASY_LEVEL,
  theme: {
    theme1: {
      mainColor: "#ff5155",
      fontColor: "white",
    },
    theme2: {
      mainColor: "green",
      fontColor: "white",
    },
  },
};

export const UserContext = React.createContext(userInfo);
