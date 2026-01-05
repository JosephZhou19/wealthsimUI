import { useState } from "react";
import {runAdvancedSimulation } from "../api/simulationApi"
import { SimulationChart } from "../components/SimulationChart";
import { Link } from "react-router-dom";
import type { SimulationResponse } from "../types/simulation";

export default function SimulationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResponse|null>(null);

  async function handleRun() {
    setLoading(true);
    try {
      const res = await runAdvancedSimulation(10);
      console.log(res.yearly_timeline)
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

      { result && (<><SimulationChart data={result.yearly_timeline} />
        <h2> Final Results</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">P5</div>
            <div className="stat-value text-sm">
              ${result.final_result.p5.toLocaleString()}
            </div>
          </div>

          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">P25</div>
            <div className="stat-value text-sm">
              ${result.final_result.p25.toLocaleString()}
            </div>
          </div>

          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Median (P50)</div>
            <div className="stat-value text-sm">
              ${result.final_result.p50.toLocaleString()}
            </div>
          </div>

          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">P75</div>
            <div className="stat-value text-sm">
              ${result.final_result.p75.toLocaleString()}
            </div>
          </div>

          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">P95</div>
            <div className="stat-value text-sm">
              ${result.final_result.p95.toLocaleString()}
            </div>
          </div>

          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Probability of Loss</div>
            <div className="stat-value text-sm">
              {(result.final_result.probability_of_loss * 100).toFixed(1)}%
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Maxiumum Possible Drawdown</div>
            <div className="stat-value text-sm">
              {(result.final_result.max_drawdown * 100).toFixed(1)}%
            </div>
          </div>
        </div>
        <div className="prose max-w-none bg-base-200 p-4 rounded">
          <h2 className="What this means">
            AI Interpretation
          </h2>
          <p className="whitespace-pre-line">
            {result.AI_response}
          </p>
        </div>
        </>
      )} 
    </div>
  );
}
