import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import LiveMonitor from "./pages/LiveMonitor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/live-monitor" element={<LiveMonitor />} />
      <Route path="/prediction" element={<Prediction />} />
    </Routes>
  );
}

export default App;
