import { motion } from "framer-motion";

function PredictionCard({ title, value, detail, highlight = false }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.22 }}
      className={`rounded-[2rem] border p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl ${highlight ? "border-cyan-400/30 bg-cyan-500/10" : "border-white/10 bg-white/5"}`}
    >
      <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/70">{title}</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{value}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{detail}</p>
    </motion.div>
  );
}

export default PredictionCard;