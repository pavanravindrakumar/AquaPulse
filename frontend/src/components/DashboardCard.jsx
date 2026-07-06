import { motion } from "framer-motion";

function DashboardCard({ label, value, detail, compact = false }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl ${compact ? "bg-slate-900/60" : ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_40%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <p className="relative text-sm uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <div className="relative mt-3 flex items-end justify-between gap-4">
        <h3 className="text-3xl font-semibold text-white">{value}</h3>
      </div>
      <p className="relative mt-2 text-sm leading-6 text-slate-300">{detail}</p>
    </motion.div>
  );
}

export default DashboardCard;