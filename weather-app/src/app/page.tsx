"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Search,
  Sun,
  Wind,
  ArrowUpRight,
  Gauge,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type WeatherData = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    surface_pressure: number;
    visibility: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

function weatherInfo(code: number) {
  if (code === 0) return { text: "Clear sky", icon: Sun };
  if ([1, 2].includes(code)) return { text: "Partly cloudy", icon: CloudSun };
  if (code === 3) return { text: "Overcast", icon: Cloud };
  if ([45, 48].includes(code)) return { text: "Foggy", icon: Cloud };
  if ([51, 53, 55].includes(code))
    return { text: "Drizzle", icon: CloudDrizzle };
  if ([61, 63, 65, 80, 81, 82].includes(code))
    return { text: "Rain", icon: CloudRain };
  if ([95, 96, 99].includes(code))
    return { text: "Thunderstorm", icon: CloudRain };

  return { text: "Current conditions", icon: CloudSun };
}

function formatDay(date: string, index: number) {
  if (index === 0) return "Today";

  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("Your location");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadWeather() {
      try {
        let latitude = 21.15;
        let longitude = 79.09;

        if (navigator.geolocation) {
          await new Promise<void>((resolve) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                resolve();
              },
              () => resolve(),
              { enableHighAccuracy: false, timeout: 5000 }
            );
          });
        }

        const response = await fetch(
          `/api/weather?latitude=${latitude}&longitude=${longitude}`
        );

        if (!response.ok) throw new Error("Weather request failed");

        const data = await response.json();
        setWeather(data);

        setLocation(
          `${data.latitude.toFixed(2)}°, ${data.longitude.toFixed(2)}°`
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  async function searchLocation() {
    const name = query.trim();
    if (!name) return;

    setLoading(true);

    try {
      const geoResponse = await fetch(
        `/api/geocode?name=${encodeURIComponent(name)}`
      );

      if (!geoResponse.ok) {
        throw new Error("Location search failed");
      }

      const geoData = await geoResponse.json();
      const result = geoData.results?.[0];

      if (!result) {
        throw new Error("Location not found");
      }

      const weatherResponse = await fetch(
        `/api/weather?latitude=${result.latitude}&longitude=${result.longitude}`
      );

      if (!weatherResponse.ok) {
        throw new Error("Weather request failed");
      }

      const weatherData = await weatherResponse.json();

      setWeather(weatherData);
      setLocation(
        `${result.name}${result.admin1 ? `, ${result.admin1}` : ""}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const current = weather?.current;
  const currentInfo = current
    ? weatherInfo(current.weather_code)
    : { text: "Loading weather", icon: CloudSun };

  const CurrentIcon = currentInfo.icon;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7f3] text-[#17231c]">
      <motion.div
        className="pointer-events-none fixed -right-32 top-20 h-80 w-80 rounded-full bg-[#dce7dc]/60 blur-3xl"
        animate={{ y: [0, -25, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none fixed -left-32 bottom-10 h-72 w-72 rounded-full bg-white/70 blur-3xl"
        animate={{ y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              WeatherGPT
            </h1>
            <p className="mt-1 text-sm text-[#738078]">
              Weather, understood naturally.
            </p>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/60 bg-white/60 shadow-sm backdrop-blur-xl"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8"
        >
          <Card className="rounded-3xl border-white/60 bg-white/65 p-2.5 shadow-xl shadow-[#315c43]/5 backdrop-blur-xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#738078]" />

                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchLocation();
                    }
                  }}
                  className="h-12 border-0 bg-transparent pl-11 shadow-none focus-visible:ring-0"
                  placeholder="Ask about any place or weather..."
                />
              </div>

              <Button
                onClick={searchLocation}
                className="h-12 rounded-2xl bg-[#315c43] px-6 hover:bg-[#234532]"
              >
                Ask
              </Button>
            </div>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6"
        >
          <Card className="relative overflow-hidden rounded-[2rem] border-0 bg-[#dce7dc] p-7 shadow-none sm:p-10">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/30 blur-2xl" />

            <div className="relative flex flex-col justify-between gap-10 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 text-sm text-[#52645a]">
                  <MapPin className="h-4 w-4" />
                  {loading ? "Updating weather..." : location}
                </div>

                <p className="mt-8 text-sm text-[#52645a]">
                  Current weather
                </p>

                <div className="mt-1 flex items-center gap-5">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <CurrentIcon className="h-20 w-20 text-[#315c43]" />
                  </motion.div>

                  <div>
                    <h2 className="text-6xl font-semibold tracking-tighter">
                      {loading ? "--" : `${Math.round(current?.temperature_2m ?? 0)}°`}
                    </h2>

                    <p className="mt-1 text-lg font-medium">
                      {loading ? "Loading..." : currentInfo.text}
                    </p>

                    <p className="text-sm text-[#52645a]">
                      Feels like{" "}
                      {loading
                        ? "--"
                        : `${Math.round(current?.apparent_temperature ?? 0)}°`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:w-[390px]">
                <WeatherMetric
                  icon={<Droplets />}
                  label="Humidity"
                  value={
                    loading
                      ? "--"
                      : `${Math.round(current?.relative_humidity_2m ?? 0)}%`
                  }
                />

                <WeatherMetric
                  icon={<Wind />}
                  label="Wind"
                  value={
                    loading
                      ? "--"
                      : `${Math.round(current?.wind_speed_10m ?? 0)} km/h`
                  }
                />

                <WeatherMetric
                  icon={<Gauge />}
                  label="Pressure"
                  value={
                    loading
                      ? "--"
                      : `${Math.round(current?.surface_pressure ?? 0)} hPa`
                  }
                />

                <WeatherMetric
                  icon={<Eye />}
                  label="Visibility"
                  value={
                    loading
                      ? "--"
                      : `${((current?.visibility ?? 0) / 1000).toFixed(1)} km`
                  }
                />
              </div>
            </div>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6"
        >
          <Card className="rounded-[2rem] border-white/60 bg-white/65 p-7 shadow-xl shadow-[#315c43]/5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#315c43]">
                  WEATHERGPT AI
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Ask naturally.
                </h2>
              </div>

              <ArrowUpRight className="h-5 w-5 text-[#738078]" />
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#738078]">
              Ask questions about rain, temperature, travel, clothing,
              forecasts, alerts, or anything weather-related.
            </p>

            <div className="mt-6 flex gap-2">
              <Input
                className="h-12 rounded-2xl border-white/60 bg-white/60"
                placeholder="Will it rain tomorrow?"
              />

              <Button className="h-12 rounded-2xl bg-[#315c43] hover:bg-[#234532]">
                Ask
              </Button>
            </div>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-8"
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Forecast</h2>
            <p className="text-sm text-[#738078]">
              The next few days at a glance
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {weather?.daily.time.slice(0, 5).map((date, index) => {
              const info = weatherInfo(weather.daily.weather_code[index]);
              const Icon = info.icon;

              return (
                <motion.div
                  key={date}
                  whileHover={{ y: -5 }}
                >
                  <Card className="rounded-3xl border-white/60 bg-white/65 p-5 shadow-lg shadow-[#315c43]/5 backdrop-blur-xl">
                    <p className="text-sm font-medium">
                      {formatDay(date, index)}
                    </p>

                    <Icon className="my-7 h-8 w-8 text-[#315c43]" />

                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-semibold">
                        {Math.round(
                          weather.daily.temperature_2m_max[index]
                        )}
                        °
                      </span>

                      <span className="text-sm text-[#738078]">
                        {Math.round(
                          weather.daily.temperature_2m_min[index]
                        )}
                        °
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-[#738078]">
                      {weather.daily.precipitation_probability_max[index]}%
                      rain
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-6 pb-10"
        >
          <Card className="rounded-3xl border-white/60 bg-white/65 p-6 shadow-lg shadow-[#315c43]/5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dce7dc]">
                <Bell className="h-5 w-5 text-[#315c43]" />
              </div>

              <div>
                <h2 className="font-semibold">Weather alerts</h2>
                <p className="text-sm text-[#738078]">
                  Important weather information will appear here.
                </p>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </main>
  );
}

function WeatherMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl bg-white/45 p-4 backdrop-blur-sm"
    >
      <div className="text-[#52645a]">
        {React.cloneElement(icon as React.ReactElement, {
          className: "h-4 w-4",
        })}
      </div>

      <p className="mt-3 text-xs text-[#738078]">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </motion.div>
  );
}
