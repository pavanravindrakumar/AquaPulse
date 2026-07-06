import { motion } from "framer-motion";

const steps = [
  {
    title: "1. Collect Data",
    description: "Sensors collect water parameters.",
  },
  {
    title: "2. AI Analysis",
    description: "Machine Learning predicts risks.",
  },
  {
    title: "3. Smart Decisions",
    description: "Farmers receive recommendations instantly.",
  },
];

function HowItWorks() {
  return (
    <section className="px-6 py-20 text-white lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/5 px-6 py-14 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl lg:px-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Process</p>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">How It Works</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.09 }}
              whileHover={{ y: -5 }}
              className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 text-left shadow-lg shadow-cyan-950/10"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-100">
                0{index + 1}
              </div>
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;