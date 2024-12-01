"use client";

import React, { useEffect, useState } from "react";

const WeatherCard = ({ location }: { location: string }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location, API_KEY]);

  if (loading) return <div className="text-gray-700">Loading weather data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!weather) return <div className="text-gray-700">No weather data available.</div>;

  const { main, weather: weatherInfo, wind, name } = weather;

  return (
    <div className="bg-blue-50 shadow-lg rounded-lg p-6 flex items-center space-x-6">
      {/* Weather Icon */}
      <div className="flex-none">
        {weatherInfo[0]?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`}
            alt={weatherInfo[0]?.description}
            className="w-20 h-20"
          />
        )}
      </div>

      {/* Weather Info */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Weather in {name || location}
        </h2>
        <p className="text-lg text-gray-600">
          <strong>Temperature:</strong> {main.temp}°F
        </p>
        <p className="text-gray-600 capitalize">
          <strong>Condition:</strong> {weatherInfo[0]?.description}
        </p>
        <p className="text-gray-600">
          <strong>Humidity:</strong> {main.humidity}%
        </p>
        <p className="text-gray-600">
          <strong>Wind:</strong> {wind.speed} mph
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
