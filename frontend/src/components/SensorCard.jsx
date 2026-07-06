import { motion } from "framer-motion";

function SensorCard({ name, value, status, trend }) {
  const statusStyles = {
    Stable: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
    Optimal: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
    Healthy: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
    Watch: "text-amber-300 bg-amber-400/10 border-amber-400/20",
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{name}</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">{value}</h3>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status] || "border-white/10 bg-white/5 text-slate-300"}`}>
          {status}
        </span>
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-white/10 via-cyan-300/30 to-transparent" />

      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>Trend</span>
        <span className="font-semibold text-cyan-100">{trend}</span>
      </div>
    </motion.div>
  );
}

export default SensorCard;