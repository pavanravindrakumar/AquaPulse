import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import SensorCard from "../components/SensorCard";
import AlertCard from "../components/AlertCard";
import SkeletonCard from "../components/SkeletonCard";
import { getAlerts, getSensorDashboard } from "../utils/api";

const pondOverview = [
    { label: "Active Ponds", value: "12", detail: "3 under watch" },
    { label: "Healthy Readings", value: "91%", detail: "Last 24 hours" },
    { label: "Open Alerts", value: "4", detail: "2 critical" },
];

const liveSensors = [
    { name: "Temperature", value: "28.4°C", status: "Stable", trend: "+0.3°C" },
    { name: "pH Level", value: "7.6", status: "Optimal", trend: "+0.1" },
    { name: "Dissolved Oxygen", value: "6.8 mg/L", status: "Healthy", trend: "+0.2" },
    { name: "Turbidity", value: "18 NTU", status: "Watch", trend: "+3 NTU" },
];

const waterQualityMetrics = [
    { label: "Temperature Index", value: "88/100", detail: "Within target range" },
    { label: "Water Clarity", value: "74/100", detail: "Minor sediment increase" },
    { label: "Oxygen Balance", value: "92/100", detail: "Strong overnight recovery" },
];

const alertSummary = [
    { level: "Critical", title: "Oxygen drop in Pond 4", time: "5 min ago" },
    { level: "Warning", title: "pH drift detected in Pond 2", time: "18 min ago" },
    { level: "Info", title: "Feeding cycle completed for Pond 7", time: "42 min ago" },
];

const recentActivity = [
    "Sensor hub synced successfully",
    "Auto-aeration activated for Pond 4",
    "Daily health report generated",
    "Operator acknowledged warning alert",
];

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [dashboardData, setDashboardData] = useState({
        overview: pondOverview,
        liveSensors,
        waterQualityMetrics,
        recentActivity,
        alerts: alertSummary,
    });

    useEffect(() => {
        let isMounted = true;

        async function loadDashboard() {
            setIsLoading(true);
            setError("");

            try {
                const [sensorResponse, alertResponse] = await Promise.all([
                    getSensorDashboard(),
                    getAlerts(),
                ]);

                if (!isMounted) {
                    return;
                }

                setDashboardData({
                    overview: sensorResponse.overview,
                    liveSensors: sensorResponse.live_sensors,
                    waterQualityMetrics: sensorResponse.water_quality_metrics,
                    recentActivity: sensorResponse.recent_activity,
                    alerts: alertResponse.alerts,
                });
            } catch (requestError) {
                if (!isMounted) {
                    return;
                }

                setError(requestError instanceof Error ? requestError.message : "Unable to load dashboard data.");
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadDashboard();

        return () => {
            isMounted = false;
        };
    }, []);

    const overviewCards = dashboardData.overview ?? pondOverview;
    const sensorCards = dashboardData.liveSensors ?? liveSensors;
    const metricsCards = dashboardData.waterQualityMetrics ?? waterQualityMetrics;
    const alertCards = dashboardData.alerts ?? alertSummary;
    const activityList = dashboardData.recentActivity ?? recentActivity;

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_24%)]" />
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">
                            Operations overview
                        </p>
                        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
                            Dashboard Page
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
                            Monitor pond health, sensor telemetry, alerts, and daily activity from a single command view.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4 backdrop-blur-sm">
                        <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">System status</p>
                        <p className="mt-1 text-lg font-semibold text-cyan-100">Connected and updating live</p>
                    </div>
                </motion.div>

                {error ? (
                    <div className="mb-8 rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 backdrop-blur-xl">
                        Unable to load live dashboard data. Showing the fallback demo content. {error}
                    </div>
                ) : null}

                {isLoading ? (
                    <section className="grid gap-4 md:grid-cols-3">
                        {overviewCards.map((item) => (
                            <SkeletonCard key={item.label} />
                        ))}
                    </section>
                ) : (
                    <section className="grid gap-4 md:grid-cols-3">
                        {overviewCards.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: index * 0.06 }}
                            >
                                <DashboardCard {...item} />
                            </motion.div>
                        ))}
                    </section>
                )}

                <section className="mt-10">
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-white">Live Sensor Cards</h2>
                        <span className="text-sm text-slate-400">Updated every 30 seconds</span>
                    </div>
                    {isLoading ? (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {sensorCards.map((sensor) => (
                                <SkeletonCard key={sensor.name} lines={1} compact />
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {sensorCards.map((sensor, index) => (
                                <motion.div
                                    key={sensor.name}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <SensorCard {...sensor} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold">Water Quality Metrics</h2>
                                <p className="mt-1 text-sm text-slate-400">Health scoring across the core environmental indicators.</p>
                            </div>
                            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                Green zone
                            </span>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {metricsCards.map((metric, index) => (
                                <motion.div
                                    key={metric.label}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <DashboardCard compact {...metric} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
                    >
                        <h2 className="text-2xl font-semibold">Alert Summary</h2>
                        <div className="mt-5 space-y-3">
                            {alertCards.map((alert, index) => (
                                <motion.div
                                    key={alert.title}
                                    initial={{ opacity: 0, x: 14 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <AlertCard {...alert} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                <motion.section
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4 }}
                    className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
                >
                    <h2 className="text-2xl font-semibold">Recent Activity</h2>
                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {activityList.map((activity, index) => (
                            <motion.div
                                key={activity}
                                whileHover={{ x: 4, scale: 1.01 }}
                                className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 transition duration-300 hover:border-cyan-400/20 hover:bg-slate-900/80"
                            >
                                <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-semibold text-cyan-200">
                                    0{index + 1}
                                </span>
                                {activity}
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
}

export default Dashboard;