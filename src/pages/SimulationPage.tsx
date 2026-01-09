import { useState } from "react";
import {runAdvancedSimulation } from "../api/simulationApi"
import { SimulationChart } from "../components/SimulationChart";
import type { SimulationResponse } from "../types/simulation";
import SideBar from "../components/SideBar";
import AiChat from "../components/AiChat";

export default function SimulationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResponse|null>(null);
  const [useAI, setUseAi] = useState(false)
  const [years, setYears] = useState(10)

  async function handleRun() {
    setLoading(true);
    try {
      const res = await runAdvancedSimulation(years, useAI);
      console.log(res.yearly_timeline)
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-base-200 flex">
        <SideBar/>
        <main className="flex-1 p-6">
           <div className="mb-8">
              <h1 className="text-3xl font-bold">Simulator</h1>
              <p className="text-sm opacity-70 mt-1">
                Probabilistic projection of portfolio value over time using Monte Carlo
              </p>
            </div>
            <div className="max-w-6xl mx-auto p-6 space-y-8">
              <div className="card bg-base-100 shadow">
                <h2 className="card-title">
                  Simulation Controls
                  <p className="text-sm opacity-70">
                    Configure and run portfolio simulations
                  </p>
                </h2>
                <div className="card-body flex flex-col md:flex-row items-center justify-between gap-4">
                    <label className="label">
                      Control the number of years in the simulation
                      <input type="number" defaultValue={years} onChange={(e) => setYears(Number(e.target.value))} className="input validator" />
                    </label>
                    <button onClick={handleRun} disabled={loading}>
                      Run Simulation
                    </button>
                </div>
              </div>
              {loading && (
              <div>Loading...</div>
              )}
              { result && (
                <>
                  <div className="card bg-base-100 shadow">
                      <h2 className="card-title"> Final Results after {years} years
                        <p className="text-sm opacity-70">
                          The numbers for the simulation results
                        </p>
                      </h2>
                      <div className="card-body">
                      <div className="mt-2 grid grid-cols-4 md:grid-cols-2 gap-2">
                        <div className="stat bg-base-200 rounded-box">
                          <div className="stat-title">P5</div>
                          <div className="stat-value">
                            ${result.final_result.p5.toLocaleString()}
                          </div>
                          <div className="stat-desc"> Final result of the bottom 5th percentile of the simulations</div>
                        </div>

                        <div className="stat bg-base-200 rounded-box">
                          <div className="stat-title">P25</div>
                          <div className="stat-value">
                            ${result.final_result.p25.toLocaleString()}
                          </div>
                          <div className="stat-desc"> Final result of the bottom 25th percentile of the simulations</div>
                        </div>

                        <div className="stat bg-base-200 rounded-box">
                          <div className="stat-title">Median (P50)</div>
                          <div className="stat-value">
                            ${result.final_result.p50.toLocaleString()}
                          </div>
                          <div className="stat-desc"> Final result of the average of the simulations</div>
                        </div>

                        <div className="stat bg-base-200 rounded-box">
                          <div className="stat-title">P75</div>
                          <div className="stat-value">
                            ${result.final_result.p75.toLocaleString()}
                          </div>
                          <div className="stat-desc"> Final result of the top 25th percentile of the simulations</div>
                        </div>

                        <div className="stat bg-base-200 rounded-box">
                          <div className="stat-title">P95</div>
                          <div className="stat-value">
                            ${result.final_result.p95.toLocaleString()}
                          </div>
                          <div className="stat-desc"> Final result of the top 5th percentile of the simulations</div>
                        </div>
                        <div className="stat bg-base-200 rounded-box">
                          <div className="stat-title">Probability of Loss</div>
                          <div className="stat-value">
                            {(result.final_result.probability_of_loss * 100).toFixed(1)}%
                          </div>
                          <div className="stat-desc"> The probability of losing money in the long run</div>
                        </div>
                        <div className="stat bg-base-200 rounded-box">
                          <div className="stat-title">Max Drawdown</div>
                          <div className="stat-value">
                            {(result.final_result.max_drawdown * 100).toFixed(1)}%
                          </div>
                          <div className="stat-desc"> The highest realistic portfolio loss by percent</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card bg-base-100 shadow">
                    <h2 className="card-title">
                      Simulation Graph
                      <p className="text-sm opacity-70">
                        The visual view of the simulation results
                      </p>
                    </h2>
                    <div className="card-body">
                      <SimulationChart data={result.yearly_timeline} />
                    </div>
                  </div>
                  {useAI && (
                    <div className="card bg-base-100 shadow">
                      <h2 className="card-title">
                        Get some advice
                        <p className="text-sm opacity-70">
                          Talk with an AI about the results
                        </p>
                      </h2>
                      <div className="card-body bg-base-200">
                        <AiChat simulationId={result.run_id} />
                        <div className="text-sm opacity-70">
                          Example: "Do you think the simulation results match my user profile?"
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )} 
            </div>
        </main>
      </div>
    </>
  );
}
