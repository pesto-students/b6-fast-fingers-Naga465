import React from "react";
import { EASY_LEVEL } from "../utils/constants";
export const userInfo = {
  username: "",
  gameLevel: EASY_LEVEL,
};
export const UserContext = React.createContext(userInfo);
