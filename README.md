<div align="center">

# React Weather Telemetry Application
### Dynamic Autocomplete Search, Real-Time OpenWeatherMap Ingestion & Responsive UI Cards

[![React](https://img.shields.io/badge/React-17.x%20Hooks-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+%20Async%2FAwait-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![OpenWeatherMap](https://img.shields.io/badge/API-OpenWeatherMap%20v2.5-EC6E4C.svg?style=for-the-badge&logo=openweathermap&logoColor=white)](https://openweathermap.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern%20Glassmorphism-1572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>A responsive single-page React weather dashboard delivering real-time atmospheric telemetry and interactive city discovery.</b><br>
  Built with React state management (`useState`, `useEffect`), dynamic debounced search autocomplete, asynchronous RESTful API consumption, and animated metric panels.
</p>

---

</div>

## Executive Summary

Modern front-end applications require non-blocking asynchronous data fetching coupled with immediate client-side UI reconciliation.

The **React Weather Telemetry Application** delivers a streamlined atmospheric monitoring dashboard. Utilizing React hooks and standalone Babel transpilation, the application features an instant city autocomplete search mechanism that filters global municipalities in real time. Validated queries trigger asynchronous RESTful calls to the **OpenWeatherMap API**, cleanly unmarshaling JSON payloads into ambient temperatures, apparent heat indices ("feels like"), wind velocities, and relative humidity percentages.

---

## Component Architecture & Reactive Hook Lifecycle

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              REACT COMPONENT LIFECYCLE (WEATHERAPP)                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │  Search Input (query)   │
                       └─────────────────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │   useEffect Hook        │ ──► Real-Time Filter (CITY_LIST)
                       │   (Autocomplete Filter) │     Updates `suggestions` State
                       └─────────────────────────┘
                                    │
                       User Selection / Submit
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │ async fetchWeather(city)│
                       │ (OpenWeatherMap API)    │
                       └─────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
       ┌────────────────────────┐      ┌────────────────────────┐
       │ 200 OK: State Mutation │      │ Error Catch (404/Net)  │
       │ setWeather({temp, wind,│      │ setError("City not     │
       │ humidity, condition})  │      │ found")                │
       └────────────────────────┘      └────────────────────────┘
                    │                               │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │ Responsive HUD Display  │
                       │ (Glassmorphic Cards)    │
                       └─────────────────────────┘
```

---

## Core Technical Features

| Feature Module | Technical Implementation | Practical Engineering Value |
|:---|:---|:---|
| **Autocomplete Filtering** | Reactive `useEffect` listening to query input, pruning candidate cities to top 6 matches. | Eliminates typographical submission errors and speeds up discovery. |
| **Asynchronous API Bridge** | `async/await` fetch invocation parsing OpenWeatherMap metric endpoints. | Non-blocking telemetry ingestion with explicit error catching. |
| **Comprehensive HUD** | Multi-metric display tracking temperature (°C), feels-like index, humidity (%), and wind speed (m/s). | Provides rich atmospheric context beyond simple temperatures. |
| **Lightweight CDN Architecture**| Built with React and Babel standalone CDN scripts. | Zero build-step requirement; instant local and serverless execution. |
| **Defensive State Guards** | String sanitization removing special punctuation before generating HTTP query URLs. | Prevents API 400 Bad Request rejections on multi-word city names. |

---

## Repository Structure

```
weather-app/
├── WEATHER API/
│   ├── index.html        # Single-page HTML5 host container
│   ├── style.css         # Modern glassmorphism CSS layout
│   └── weatherapp.jsx    # React 17 component source code
└── README.md             # Executive Engineering Documentation
```

---

## Quickstart & Local Execution

```bash
# Clone the repository
git clone https://github.com/vsbeginner/weather-app.git
cd weather-app

# Navigate to the application folder
cd "WEATHER API"

# Option 1: Open directly in your default browser
start index.html

# Option 2: Serve via local Python HTTP daemon
python -m http.server 3000
# Navigate to: http://localhost:3000
```

---

## Candidate Profile & Institutional Details

- **Candidate Name**: Vinayak Sharma
- **Enrollment / Roll No**: 2501940012
- **GitHub Profile**: [@vsbeginner](https://github.com/vsbeginner)
- **LinkedIn Profile**: [Vinayak Sharma](https://www.linkedin.com/in/vinayak-sharma-24a8aa384/)
- **Email Contact**: vsbeginner14@gmail.com
- **Degree Program**: Master of Computer Applications (MCA)
- **Institution**: Department of Computer Science & Engineering, K.R. Mangalam University

---

<div align="center">
  <sub>Developed for academic excellence and technical portfolio showcase. Licensed under the <a href="LICENSE">MIT License</a>.</sub>
</div>
