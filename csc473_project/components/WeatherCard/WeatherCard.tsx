import Image from "next/image";
import React from "react";
interface WeatherCardProps {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  // weatherMain: string; // e.g., "Clouds"
  weatherDescription: string; // e.g., "broken clouds"
  windSpeed: number;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  location,
  temperature,
  feelsLike,
  humidity,
  // weatherMain,
  weatherDescription,
  windSpeed,
  icon,
}) => {
  return (
    <div className="bg-blue-50 shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
      {/* Weather Icon and Title */}
      <div className="flex items-center mb-6">
        <Image
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={`${weatherDescription} image`}
          width={80}
          height={80}
        />

        <h2 className="text-xl font-semibold text-gray-800 ml-4">
          Weather in {location}
        </h2>
      </div>

      {/* Weather Details */}
      <div className="space-y-4">
        <p className="text-lg text-gray-600">
          <strong>Temperature:</strong> {temperature}°F
        </p>
        <p className="text-lg text-gray-600">
          <strong>Feels Like:</strong> {feelsLike}°F
        </p>
        <p className="text-gray-600 capitalize">
          <strong>Condition:</strong> {weatherDescription}
        </p>
        <p className="text-gray-600">
          <strong>Humidity:</strong> {humidity}%
        </p>
        <p className="text-gray-600">
          <strong>Wind Speed:</strong> {windSpeed} mph
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
