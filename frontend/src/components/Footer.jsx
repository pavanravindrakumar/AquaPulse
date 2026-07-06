import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="px-6 pb-10 pt-4 text-center text-slate-400 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 shadow-2xl shadow-cyan-950/15 backdrop-blur-xl"
      >
        <h2 className="text-xl font-semibold tracking-[0.2em] text-white">
          AquaPulse
        </h2>

        <p className="mt-3 text-sm text-slate-300 md:text-base">
          AI Powered Smart Aquaculture Monitoring System
        </p>

        <p className="mt-6 text-xs uppercase tracking-[0.28em] text-slate-500">
          © 2026 AquaPulse. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;