import { motion } from "framer-motion";

function AlertCard({ level, title, time }) {
  const levelStyles = {
    Critical: "text-rose-300 bg-rose-400/10 border-rose-400/20",
    Warning: "text-amber-300 bg-amber-400/10 border-amber-400/20",
    Info: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
  };

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${levelStyles[level] || "border-white/10 bg-white/5 text-slate-300"}`}>
            {level}
          </span>
          <p className="mt-3 font-medium text-white">{title}</p>
        </div>
        <span className="text-xs text-slate-400">{time}</span>
      </div>
    </motion.div>
  );
}

export default AlertCard;