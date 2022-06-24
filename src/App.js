import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d03770c2108048348f3945341249b75a`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(URL)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          alert("City name entered incorrectly. Enter location name :)");
        });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder="Enter Location..."
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>

          <div className="discription">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} °C</p>
              ) : null}
              <p>Fells Like</p>
            </div>

            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>

            <div className="wind">
              {data.wind ? (
                <p className="bold">
                  {(data.wind.speed * 0.44704).toFixed()} m/s
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
