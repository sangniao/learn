import { useState, useEffect } from "react";

const History = ({}) => {
  const [weatherHistory, setweatherHistory] = useState([]);

  useEffect(() => {
    setweatherHistory(
      localStorage.weatherHistory !== undefined
        ? JSON.parse(localStorage.weatherHistory)
        : []
    );
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center p-3"
      style={{ minHeight: "100vh" }}
    >
      <div>
        {" "}
        <h2>My Weather History</h2>
        <div className="mt-5">
          {weatherHistory.length > 0 ? (
            weatherHistory.map((weather, index) => {
              return (
                <div
                  key={index}
                  className="card mb-3"
                  style={{ width: "450px" }}
                >
                  <div className="card-body text-dark">
                    <h5 className="card-title ">
                      {weather.city} - {weather.date}
                    </h5>
                    <small>{weather.time}</small>
                    <hr />
                    <p className="card-text">
                      <span className="font-weight-bold">Temperature: </span>
                      {weather.temperature}
                      <sup>°C</sup>
                    </p>
                    <p className="card-text">
                      <span className="font-weight-bold">Condition: </span>
                      {weather.description}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Nothing to see here - yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
