import { motion } from "framer-motion";

const features = [
  {
    title: "AI Prediction",
    description: "Predict water quality before problems occur.",
    accent: "from-cyan-400/20 to-sky-500/10",
  },
  {
    title: "Smart Dashboard",
    description: "View live pond parameters in one place.",
    accent: "from-sky-400/20 to-cyan-500/10",
  },
  {
    title: "Instant Alerts",
    description: "Receive notifications whenever values become abnormal.",
    accent: "from-emerald-400/20 to-cyan-500/10",
  },
];

function Features() {
  return (
    <section id="features" className="px-6 py-20 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Platform features</p>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">Built for real aquaculture operations</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            A clean interface for high-signal monitoring, rapid decisions, and proactive farm management.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`rounded-[2rem] border border-white/10 bg-gradient-to-b ${feature.accent} p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl`}
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-200 shadow-lg shadow-cyan-950/20">
                0{index + 1}
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;