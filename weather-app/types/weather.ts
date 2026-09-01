export interface WeatherData {
  location: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  current: {
    temperature: number;
    feelsLike: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
  };
  hourly: {
    time: string;
    temperature: number;
    precipitationProbability: number;
    condition: string;
  }[];
  daily: {
    date: string;
    high: number;
    low: number;
    precipitationProbability: number;
    condition: string;
  }[];
}
