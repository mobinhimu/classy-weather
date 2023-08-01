import React, { useEffect, useRef, useState } from "react";
import Weather from "./components/Weather";
import { getFlagEmoji } from "./components/converter";
import Footer from "./components/Footer";
import UserInput from "./components/UserInput";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Country from "./components/Country";

function App() {
  const [userInput, setUserInput] = useState(() => {
    const storageData = localStorage.getItem("userInput");
    return storageData ? storageData : "";
  });
  const [country, setCountry] = useState("");
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const input = useRef("Hello");

  useEffect(() => {
    const controller = new AbortController();
    async function getLatLon() {
      try {
        if (userInput.length < 2) return;

        setLoading(true);
        setError("");
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${userInput}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        if (!data.results) throw new Error("Location Not Found");

        const { latitude, longitude, timezone, name, country_code } =
          data.results.at(0);

        setCountry(`${name} ${getFlagEmoji(country_code)}`);

        setLoading(true);
        const weatherData = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );

        const weather = await weatherData.json();
        setValue(weather);
        setLoading(false);
        setError("");
      } catch (error) {
        if (error.message === "AbortError") return;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getLatLon();

    return () => {
      controller.abort();
    };
  }, [userInput]);

  useEffect(() => {
    localStorage.setItem("userInput", userInput);
  }, [userInput]);

  useEffect(() => {
    document.addEventListener("keydown", (eve) => {
      if (eve.code === "Enter") {
        if (document.activeElement === input.current) return;

        input.current.focus();
        setUserInput("");
      }
    });
  }, [userInput]);

  return (
    <>
      <main>
        <div className="container">
          <Header />
          <UserInput
            ref={input}
            userInput={userInput}
            onUserInput={setUserInput}
          />
          {loading && <Loading />}
          {!loading && <Country country={country} />}
          {value.daily && <Weather value={value} />}
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
