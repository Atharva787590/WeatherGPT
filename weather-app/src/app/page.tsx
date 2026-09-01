"use client";

import React from "react";
import { motion } from "framer-motion";
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
  ArrowUpRight,
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
    <main className="min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        {/* Floating background shapes */}
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

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center justify-between"
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
            className="glass rounded-full shadow-sm"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </motion.header>

        {/* Search */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="relative z-10 mt-8"
        >
          <Card className="glass rounded-3xl p-2.5 weather-glow">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#738078]" />
                <Input
                  className="h-12 border-0 bg-transparent pl-11 shadow-none focus-visible:ring-0"
                  placeholder="Ask about any place or weather..."
                />
              </div>

              <Button className="h-12 rounded-2xl bg-[#315c43] px-6 hover:bg-[#234532]">
                Ask
              </Button>
            </div>
          </Card>
        </motion.section>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="relative z-10 mt-6"
        >
          <Card className="relative overflow-hidden rounded-[2rem] border-0 bg-[#dce7dc] p-7 shadow-none sm:p-10">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/30 blur-2xl" />

            <div className="relative flex flex-col justify-between gap-10 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 text-sm text-[#52645a]">
                  <MapPin className="h-4 w-4" />
                  Your location
                </div>

                <p className="mt-8 text-sm text-[#52645a]">Current weather</p>

                <div className="mt-1 flex items-center gap-5">
                  <motion.div className="float-slow">
                    <CloudSun className="h-20 w-20 text-[#315c43]" />
                  </motion.div>

                  <div>
                    <h2 className="text-6xl font-semibold tracking-tighter">
                      --°
                    </h2>
                    <p className="mt-1 text-lg font-medium">
                      Waiting for weather
                    </p>
                    <p className="text-sm text-[#52645a]">
                      Connect a weather provider
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:w-[390px]">
                <WeatherMetric
                  icon={<Droplets />}
                  label="Humidity"
                  value="--%"
                />
                <WeatherMetric icon={<Wind />} label="Wind" value="-- km/h" />
                <WeatherMetric icon={<Sun />} label="UV Index" value="--" />
              </div>
            </div>
          </Card>
        </motion.section>

        {/* AI */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="relative z-10 mt-6"
        >
          <Card className="glass rounded-[2rem] p-7 weather-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#315c43]">
                  WEATHERGPT AI
                </p>
                <h2 className="mt-1 text-2xl font-semibold">Ask naturally.</h2>
              </div>

              <ArrowUpRight className="h-5 w-5 text-[#738078]" />
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#738078]">
              Ask questions about rain, temperature, travel, clothing,
              forecasts, alerts, or anything weather-related.
            </p>

            <div className="mt-6 flex gap-2">
              <Input
                className="h-12 rounded-2xl bg-white/60"
                placeholder="Will it rain tomorrow?"
              />
              <Button className="h-12 rounded-2xl bg-[#315c43] hover:bg-[#234532]">
                Ask
              </Button>
            </div>
          </Card>
        </motion.section>

        {/* Forecast */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="relative z-10 mt-8"
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Forecast</h2>
            <p className="text-sm text-[#738078]">
              The next few days at a glance
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {forecast.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.08 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="glass rounded-3xl p-5 transition-shadow hover:shadow-lg">
                    <p className="text-sm font-medium">{item.day}</p>

                    <Icon className="my-7 h-8 w-8 text-[#315c43]" />

                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-semibold">
                        {item.high}
                      </span>
                      <span className="text-sm text-[#738078]">{item.low}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Alerts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="relative z-10 mt-6 pb-10"
        >
          <Card className="glass rounded-3xl p-6">
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
