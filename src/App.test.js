import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import fireEvent from "@testing-library/user-event";

test("start player button should in the document ", () => {
  const { getByText } = render(<App />);
  const node = getByText("START GAME");
  expect(node).toBeInTheDocument();
});

test("showing error when user not enters name ", () => {
  const { getByTitle, getByText } = render(<App />);
  const node = getByTitle("start_game");
  fireEvent.click(node);
  const errorNode = getByText("Please type your name");
  expect(errorNode).toBeInTheDocument();
});
