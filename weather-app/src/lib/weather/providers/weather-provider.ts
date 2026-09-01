import type { WeatherData } from "@/types/weather";

export interface WeatherProvider {
  getWeather(latitude: number, longitude: number): Promise<WeatherData>;
}
