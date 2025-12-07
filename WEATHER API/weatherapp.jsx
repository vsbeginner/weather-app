function WeatherApp() {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [weather, setWeather] = React.useState(null);
  const [showPanel, setShowPanel] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const CITY_LIST = [
    "Delhi, India", "Mumbai, India", "Kolkata, India",
    "Bengaluru, India", "Chennai, India",
    "London, UK", "New York, USA", "Sydney, AU"
  ];

  // Suggestion Filter
  React.useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = CITY_LIST.filter((c) => c.toLowerCase().includes(q)).slice(0, 6);
    setSuggestions(filtered);
    setSelectedIndex(-1);
  }, [query]);

  // Fetch Weather by City
async function fetchWeather(city) {
  try {
    setLoading(true);
    setError("");

    const processedCity = city.replace(/,/g, "").trim();  // FIXED

    const apiKey = "030115f4bc8f9d57b15d613a1e66fd03";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${processedCity}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      setError("❌ City not found");
      setWeather(null);
      setShowPanel(false);
      return;
    }

    setWeather({
      cityName: data.name,
      tempC: data.main.temp,
      feelsLike: data.main.feels_like,
      wind: data.wind.speed,
      humidity: data.main.humidity,
      condition: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      localTime: new Date().toLocaleString()
    });

    setShowPanel(true);
  } catch (err) {
    setError("⚠ Something went wrong");
  } finally {
    setLoading(false);
  }
}


  // Use My Location (Fixed)
  function useLocationWeather() {
    if (!navigator.geolocation) {
      setError("❌ Your device does not support location.");
      return;
    }

    setLoading(true);
    setError("⏳ Fetching your location...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (err) => {
        setLoading(false);
        setError("⚠ Location access denied. Allow permission & try again.");
        console.error("Geo Error:", err);
      }
    );
  }

  // Fetch weather using coordinates
  async function fetchWeatherByCoords(lat, lon) {
    try {
      const apiKey = "d248c69eda26f9811f27e23e295917bb";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) {
        setError("❌ Unable to fetch location weather");
        return;
      }

      setWeather({
        cityName: data.name || "My Location",
        tempC: data.main.temp,
        feelsLike: data.main.feels_like,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        condition: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        localTime: new Date().toLocaleString()
      });

      setShowPanel(true);
      setError("");
    } catch (err) {
      setError("❌ Failed to load weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Keyboard Controls (Up / Down / Enter)
  function handleKeyDown(e) {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const val = selectedIndex >= 0 ? suggestions[selectedIndex] : query;
      fetchWeather(val);
      setSuggestions([]);
      setQuery(val);
    }
  }

  return (
    <main className="page">
      <div className="glass-card">
        <header className="card-head">
          <h1>🌤 Weather Forecast</h1>
          <p className="subtitle">Get real-time weather updates</p>
        </header>

        {/* Search */}
        <div className="search-block">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search any city (e.g. Delhi)"
            autoComplete="off"
          />

          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((s, idx) => (
                <li
                  key={s}
                  className={selectedIndex === idx ? "active" : ""}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => { setQuery(s); fetchWeather(s); setSuggestions([]); }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading && <p className="loading">⏳ Loading weather...</p>}
        {error && <p className="error">{error}</p>}

        {showPanel && weather && (
          <section className="weather-panel">
            <div className="weather-left">
              <img src={weather.icon} className="weather-icon" />
              <h2>{weather.tempC}°C</h2>
              <p className="condition">{weather.condition}</p>
            </div>

            <div className="weather-right">
              <p><strong>City:</strong> {weather.cityName}</p>
              <p><strong>Feels Like:</strong> {weather.feelsLike}°C</p>
              <p><strong>Wind:</strong> {weather.wind} kph</p>
              <p><strong>Humidity:</strong> {weather.humidity}%</p>
              <p><strong>Local Time:</strong> {weather.localTime}</p>
            </div>
          </section>
        )}

        <footer className="card-foot">
          <button className="btn" onClick={useLocationWeather}>📍 Use My Location</button>
          <small>Made with ❤️ by Vinayak Sharma</small>
        </footer>
      </div>
    </main>
  );
}

ReactDOM.render(<WeatherApp />, document.getElementById("root"));
