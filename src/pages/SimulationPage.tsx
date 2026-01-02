import { useState } from "react";
import {runAdvancedSimulation } from "../api/simulationApi"
import { SimulationChart } from "../components/SimulationChart";
import { Link } from "react-router-dom";

export default function SimulationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleRun() {
    setLoading(true);
    try {
      const res = await runAdvancedSimulation(10);
      console.log(res.paths.yearly_timeline)
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Link to="/asset" className="btn">
      Go to assets
      </Link>
      <h1>WealthSim</h1>

      <button onClick={handleRun} disabled={loading}>
        Run Simulation
      </button>

      { result && (<><SimulationChart data={result.paths.yearly_timeline} />
       <pre>{JSON.stringify(result, null, 2)}</pre></>
      )} 
    </div>
  );
}
