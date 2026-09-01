import {
  Bell,
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Search,
  Sun,
  Wind,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const forecast = [
  { day: "Today", icon: Sun, high: "29°", low: "22°" },
  { day: "Tomorrow", icon: CloudSun, high: "28°", low: "21°" },
  { day: "Wed", icon: CloudRain, high: "26°", low: "20°" },
  { day: "Thu", icon: Cloud, high: "27°", low: "20°" },
  { day: "Fri", icon: Sun, high: "30°", low: "22°" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#26342b]">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              WeatherGPT
            </h1>
            <p className="mt-1 text-sm text-[#6f7d72]">
              Your intelligent weather companion
            </p>
          </div>

          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
        </header>

        {/* Search */}
        <section className="mt-8">
          <Card className="rounded-2xl border-[#d8ddd4] bg-[#fffdf8] p-3 shadow-sm">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f7d72]" />
                <Input
                  className="border-0 bg-transparent pl-10 shadow-none focus-visible:ring-0"
                  placeholder="Search a city or ask about the weather..."
                />
              </div>

              <Button className="rounded-xl bg-[#315c43] hover:bg-[#274b36]">
                Search
              </Button>
            </div>
          </Card>
        </section>

        {/* Current Weather */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="overflow-hidden rounded-3xl border-[#d8ddd4] bg-[#dce8dc] p-7 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-[#52645a]">
                  <MapPin className="h-4 w-4" />
                  Your location
                </div>

                <p className="mt-6 text-sm text-[#52645a]">Current weather</p>

                <div className="mt-1 flex items-center gap-4">
                  <h2 className="text-6xl font-semibold tracking-tight">--°</h2>
                  <div>
                    <p className="text-lg font-medium">Waiting for weather</p>
                    <p className="text-sm text-[#52645a]">
                      Connect a weather provider
                    </p>
                  </div>
                </div>
              </div>

              <CloudSun className="h-16 w-16 text-[#315c43]" />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <WeatherMetric
                icon={<Droplets className="h-4 w-4" />}
                label="Humidity"
                value="--%"
              />
              <WeatherMetric
                icon={<Wind className="h-4 w-4" />}
                label="Wind"
                value="-- km/h"
              />
              <WeatherMetric
                icon={<Sun className="h-4 w-4" />}
                label="UV Index"
                value="--"
              />
            </div>
          </Card>

          {/* AI Assistant */}
          <Card className="rounded-3xl border-[#d8ddd4] bg-[#fffdf8] p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dce8dc]">
                <CloudSun className="h-5 w-5 text-[#315c43]" />
              </div>

              <div>
                <h2 className="font-semibold">Ask WeatherGPT</h2>
                <p className="text-xs text-[#6f7d72]">
                  Conversational weather intelligence
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#f7f5ef] p-4">
              <p className="text-sm leading-6 text-[#52645a]">
                Ask me things like “Will it rain today?” or “What should I wear
                tomorrow?”
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <Input className="rounded-xl" placeholder="Ask anything..." />
              <Button className="rounded-xl bg-[#315c43] hover:bg-[#274b36]">
                Ask
              </Button>
            </div>
          </Card>
        </section>

        {/* Forecast */}
        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">5-day forecast</h2>
              <p className="text-sm text-[#6f7d72]">
                A quick look at the days ahead
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {forecast.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.day}
                  className="rounded-2xl border-[#d8ddd4] bg-[#fffdf8] p-5 shadow-sm"
                >
                  <p className="text-sm font-medium">{item.day}</p>
                  <Icon className="my-5 h-8 w-8 text-[#315c43]" />

                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-semibold">{item.high}</span>
                    <span className="text-sm text-[#6f7d72]">{item.low}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Alerts */}
        <section className="mt-6">
          <Card className="rounded-3xl border-[#d8ddd4] bg-[#fffdf8] p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-[#315c43]" />
              <div>
                <h2 className="font-semibold">Weather alerts</h2>
                <p className="text-sm text-[#6f7d72]">
                  Important weather information will appear here.
                </p>
              </div>
            </div>
          </Card>
        </section>
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
    <div className="rounded-2xl bg-[#fffdf8]/70 p-4">
      <div className="flex items-center gap-2 text-[#52645a]">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}
