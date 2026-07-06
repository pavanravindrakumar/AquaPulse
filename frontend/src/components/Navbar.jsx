import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-lg font-bold text-cyan-200 shadow-lg shadow-cyan-950/30 transition duration-300 group-hover:scale-105 group-hover:bg-cyan-400/15">
            A
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-[0.18em] text-white">
              AquaPulse
            </h1>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
              Smart Aquaculture
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 text-sm text-slate-200 shadow-lg shadow-cyan-950/10 md:flex">
          <Link to="/" className="rounded-full px-4 py-2 transition duration-300 hover:bg-white/10 hover:text-white">
            Home
          </Link>
          <Link to="/#features" className="rounded-full px-4 py-2 transition duration-300 hover:bg-white/10 hover:text-white">
            Features
          </Link>
          <Link to="/dashboard" className="rounded-full px-4 py-2 transition duration-300 hover:bg-white/10 hover:text-white">
            Dashboard
          </Link>
          <Link to="/prediction" className="rounded-full px-4 py-2 transition duration-300 hover:bg-white/10 hover:text-white">
            Prediction
          </Link>
        </div>

        <Link
          to="/dashboard"
          className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400/20 hover:text-white"
        >
          Live Monitor
        </Link>
      </div>
    </motion.nav>
  );
}

export default Navbar;