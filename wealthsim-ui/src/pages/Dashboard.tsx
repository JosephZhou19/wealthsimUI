import { useState } from "react";
import { getSimulationRuns, runBasicSimulation } from "../api/simulationApi"

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleRun() {
    setLoading(true);
    try {
      const res = await runBasicSimulation(10);
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>WealthSim</h1>

      <button onClick={handleRun} disabled={loading}>
        Run Simulation
      </button>

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
