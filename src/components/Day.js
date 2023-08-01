import React from "react";
import { formatDate, getWeatherIcon } from "./converter";

export default function Day({ max, min, time, weathercode, today }) {
  return (
    <li>
      <span>{getWeatherIcon(weathercode)}</span>
      <p>{today === time ? "Today" : formatDate(time)}</p>
      <p>
        {min}&deg; &ndash; <strong>{max}&deg;s</strong>{" "}
      </p>
    </li>
  );
}
