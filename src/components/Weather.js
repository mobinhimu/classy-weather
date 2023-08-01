import React from "react";
import Day from "./Day";

export default function Weather({ value }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time,
    weathercode,
  } = value?.daily;

  return (
    <div className="weather-container">
      <ul className="weather">
        {max.map((m, i) => (
          <Day
            max={m}
            min={min.at(i)}
            time={time.at(i)}
            weathercode={weathercode.at(i)}
            key={time.at(i)}
            today={time.at(0)}
          />
        ))}
      </ul>
    </div>
  );
}
