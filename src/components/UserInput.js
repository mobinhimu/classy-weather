import React from "react";
import { forwardRef } from "react";

function UserInput({ userInput, onUserInput }, ref) {
  return (
    <input
      ref={ref}
      value={userInput}
      type="text"
      placeholder="Enter Your location"
      onChange={(eve) => onUserInput(eve.target.value)}
    />
  );
}

export default forwardRef(UserInput);
