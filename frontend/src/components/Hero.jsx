import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getHealth } from "../utils/api";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

function Hero() {
  const [healthStatus, setHealthStatus] = useState({
    status: "connected",
    version: "0.1.0",
    uptime: "--",
    services: {},
  });

  useEffect(() => {
    let isMounted = true;

    async function loadHealth() {
      try {
        const response = await getHealth();

        if (!isMounted) {
          return;
        }

        setHealthStatus(response);
      } catch {
        if (!isMounted) {
          return;
        }

        setHealthStatus((current) => ({
          ...current,
          status: "degraded",
        }));
      }
    }

    loadHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  const serviceEntries = Object.entries(healthStatus.services ?? {});

  return (
    <section className="relative overflow-hidden px-6 py-20 text-white lg:px-8 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_24%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm text-cyan-100 shadow-lg shadow-cyan-950/20 backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.75)]" />
            Backend {healthStatus.status} · v{healthStatus.version}
          </motion.div>

          <motion.h1 variants={itemVariants} className="max-w-3xl text-5xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
            Monitor ponds with clarity, act with confidence.
          </motion.h1>

          <motion.p variants={itemVariants} className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            AquaPulse combines sensor telemetry, intelligent predictions, and actionable recommendations for smarter aquaculture operations.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row">
            <Link to="/dashboard" className="group inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-4 text-base font-semibold text-slate-950 shadow-[0_20px_60px_rgba(34,211,238,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300">
              <span>Get Started</span>
              <span className="ml-3 transition duration-300 group-hover:translate-x-1">→</span>
            </Link>

            <Link to="/prediction" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-cyan-400/30">
              Explore Dashboard
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3">
            {[
              [healthStatus.status === "ok" ? "Healthy" : healthStatus.status, "API status"],
              [healthStatus.uptime || "--", "Backend uptime"],
              [healthStatus.version || "0.1.0", "Backend version"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">{value}</p>
                <p className="mt-1 text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-cyan-400/10 blur-3xl" />
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Live pond snapshot</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Pond 4</h2>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                {healthStatus.status === "ok" ? "Stable" : "Check backend"}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Temperature", "28.4°C", "+0.3 today"],
                ["Dissolved Oxygen", "6.8 mg/L", "Ideal range"],
                ["pH Level", "7.6", "Balanced"],
                ["Turbidity", "18 NTU", "Watch closely"],
              ].map(([label, value, note]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/55 p-4">
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
                  <p className="mt-2 text-sm text-cyan-200/80">{note}</p>
                </div>
              ))}
            </div>

            {serviceEntries.length > 0 ? (
              <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/55 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Service health</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {serviceEntries.map(([service, status]) => (
                    <div key={service} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
                      <span className="text-slate-300">{service.replaceAll("_", " ")}</span>
                      <span className="text-cyan-200">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;