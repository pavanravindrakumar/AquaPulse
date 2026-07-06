import { motion } from "framer-motion";

const stats = [
  { value: "95%", label: "Prediction Accuracy" },
  { value: "24/7", label: "Monitoring" },
  { value: "AI", label: "Powered Decisions" },
  { value: "100+", label: "Farm Support" },
];

function Stats() {
  return (
    <section className="px-6 py-20 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-2xl shadow-cyan-950/15 backdrop-blur-xl"
          >
            <h2 className="bg-gradient-to-r from-cyan-200 to-sky-300 bg-clip-text text-5xl font-semibold text-transparent">
              {stat.value}
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.22em] text-slate-300">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Stats;