import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [clockRunning, setClockRunning] = useState(true);

  useEffect(() => {
    // Fetch the list of countries
    fetch("http://worldtimeapi.org/api/timezone")
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    // Fetching current time based on the selected country
    if (selectedCountry) {
      fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
        .then(response => response.json())
        .then(data => setCurrentTime(data.utc_datetime))
        .catch(error => console.error("Error fetching current time:", error));
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Update the clock every second
    let interval;
    if (clockRunning) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          const currentTime = new Date(prevTime);
          currentTime.setSeconds(currentTime.getSeconds() + 1);
          return currentTime.toISOString();
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clockRunning]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleClockToggle = () => {
    setClockRunning(prevState => !prevState);
  };

  return (
    <div className="clock-container">
      <div className="clock">
        <select className="select-btn" onChange={handleCountryChange} value={selectedCountry || ''}>
          <option value="" disabled>Select a Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country.split('/').pop().replace(/_/g, ' ')}
            </option>
            
          ))}
        </select>
        <div className="time">
          {currentTime && (
            <p>{new Date(currentTime).toLocaleTimeString()}</p>
          )}
          <button onClick={handleClockToggle}>
            {clockRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clock;