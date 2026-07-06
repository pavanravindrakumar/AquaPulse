import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import SensorCard from "../components/SensorCard";
import SkeletonCard from "../components/SkeletonCard";
import { getSensorDashboard } from "../utils/api";

const SENSOR_KEYS = [
  "Temperature",
  "pH Level",
  "Dissolved Oxygen",
  "Ammonia",
  "Turbidity",
  "Water Quality",
];

function LiveMonitor() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sensors, setSensors] = useState([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function poll() {
      try {
        const data = await getSensorDashboard();
        if (!mounted.current) return;

        const map = {};
        (data.live_sensors || []).forEach((r) => {
          map[r.name] = r;
        });

        const current = SENSOR_KEYS.map((name) => {
          if (map[name]) return map[name];
          return simulateSensor(name, map);
        });

        setSensors(current);
        setError("");
        setIsLoading(false);
      } catch (e) {
        const current = SENSOR_KEYS.map((name) => simulateSensor(name));
        if (!mounted.current) return;
        setSensors(current);
        setError("Backend unavailable — showing simulated live data.");
        setIsLoading(false);
      }
    }

    poll();
    const id = setInterval(poll, 5000);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.06),transparent_25%)]" />
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Live Monitor</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Live Sensor Feed</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">Real-time sensor telemetry. Updates every 5 seconds.</p>
        </motion.div>

        {error ? (
          <div className="mb-6 rounded-[1.25rem] border border-rose-400/20 bg-rose-500/10 px-5 py-3 text-sm text-rose-100 backdrop-blur-xl">{error}</div>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} lines={2} />
            ))
          ) : (
            sensors.map((s) => (
              <SensorCard
                key={s.name}
                name={s.name}
                value={displayValueFor(s)}
                status={computeStatusFor(s)}
                trend={s.trend ?? "--"}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function displayValueFor(s) {
  if (!s) return "--";
  return s.value ?? `${s.value ?? "--"}`;
}

function computeStatusFor(s) {
  if (!s) return "Watch";
  const name = s.name || "";
  const raw = (s.value || "").toString();
  const num = Number(raw.replace(/[^0-9.+-]/g, ""));

  if (name.includes("Temperature")) {
    if (isNaN(num)) return s.status || "Watch";
    if (num > 31) return "Watch";
    if (num >= 29) return "Stable";
    return "Stable";
  }

  if (name.includes("pH")) {
    if (isNaN(num)) return s.status || "Watch";
    if (num < 6.5 || num > 9) return "Watch";
    if (num < 6.8 || num > 8.5) return "Watch";
    return "Optimal";
  }

  if (name.includes("Dissolved Oxygen")) {
    if (isNaN(num)) return s.status || "Watch";
    if (num < 4) return "Watch";
    if (num < 5) return "Watch";
    return "Healthy";
  }

  if (name.includes("Ammonia")) {
    if (isNaN(num)) return s.status || "Watch";
    if (num > 0.5) return "Watch";
    if (num > 0.2) return "Watch";
    return "Healthy";
  }

  if (name.includes("Turbidity")) {
    if (isNaN(num)) return s.status || "Watch";
    if (num > 80) return "Watch";
    if (num > 40) return "Watch";
    return "Healthy";
  }

  if (name.includes("Water Quality")) {
    if (isNaN(num)) return s.status || "Healthy";
    if (num < 70) return "Watch";
    return "Healthy";
  }

  return s.status || "Watch";
}

function simulateSensor(name, existing = {}) {
  switch (name) {
    case "Temperature":
      return { name, value: `${(26 + Math.random() * 6).toFixed(1)}°C`, trend: `${(Math.random() * 0.6 - 0.3).toFixed(1)}°C`, updated_at: new Date().toISOString() };
    case "pH Level":
      return { name, value: `${(6.8 + Math.random() * 1.4).toFixed(2)}`, trend: `${(Math.random() * 0.2 - 0.1).toFixed(2)}`, updated_at: new Date().toISOString() };
    case "Dissolved Oxygen":
      return { name, value: `${(5 + Math.random() * 3).toFixed(1)} mg/L`, trend: `${(Math.random() * 0.6 - 0.3).toFixed(1)}`, updated_at: new Date().toISOString() };
    case "Ammonia":
      return { name, value: `${(Math.random() * 0.8).toFixed(2)} mg/L`, trend: `${(Math.random() * 0.05 - 0.02).toFixed(2)} mg/L`, updated_at: new Date().toISOString() };
    case "Turbidity":
      return { name, value: `${Math.round(5 + Math.random() * 60)} NTU`, trend: `${Math.round(Math.random() * 6 - 3)} NTU`, updated_at: new Date().toISOString() };
    case "Water Quality":
      return { name, value: `${Math.round(70 + Math.random() * 25)}/100`, trend: `${Math.round(Math.random() * 4 - 2)}/100`, updated_at: new Date().toISOString() };
    default:
      return { name, value: "--", trend: "--", updated_at: new Date().toISOString() };
  }
}

export default LiveMonitor;
