import { useState } from "react";
import {runAdvancedSimulation } from "../api/simulationApi"
import { SimulationChart } from "../components/SimulationChart";
import { Link, NavLink, Outlet } from "react-router-dom";
import type { SimulationResponse } from "../types/simulation";
import SideBar from "../components/SideBar";

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
        {/* Main content */}
        <main className="flex-1 p-6">
           <div className="mb-8">
              <h1 className="text-3xl font-bold">Simulator</h1>
              <p className="text-sm opacity-70 mt-1">
                Probabilistic projection of portfolio value over time using Monte Carlo
              </p>
            </div>
            <div className="max-w-6xl mx-auto p-6 space-y-8">
              <div className="card bg-base-100 shadow">
                <div className="card-body flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h2 className="card-title">Simulation Controls</h2>
                    <p className="text-sm opacity-70">
                      Configure and run portfolio simulations
                    </p>
                  </div>
                    <button onClick={handleRun} disabled={loading}>
                      Run Simulation
                    </button>
                    <label className="label">
                      Use AI Analysis on Simulation
                      <input  type="checkbox" checked={useAI} onChange={() => setUseAi(!useAI) } className="checkbox checkbox-sm"/>
                    </label>
                    <label className="label">
                      Set Number of Years for Simulation
                      <input type="number" defaultValue={years} onChange={(e) => setYears(Number(e.target.value))} className="input validator" />
                    </label>
                </div>
              </div>
              {loading && (
              <div>Loading...</div>
              )}
              { result && (
                <div className="card bg-base-100 shadow">
                  <div className="card-body">
                    <SimulationChart data={result.yearly_timeline} />
                    <h2> Final Results</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
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
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="stat bg-base-200 rounded-box md:col-start-2">
                        <div className="stat-title">Probability of Loss</div>
                        <div className="stat-value text-sm">
                          {(result.final_result.probability_of_loss * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="stat bg-base-200 rounded-box md:col-start-4">
                        <div className="stat-title">Maxiumum Possible Drawdown</div>
                        <div className="stat-value text-sm">
                          {(result.final_result.max_drawdown * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    {useAI && (<div className="prose max-w-none bg-base-200 p-4 rounded margin-2">
                      What this means
                      <h2 className="">
                        AI Interpretation
                      </h2>
                      <p className="whitespace-pre-line">
                        {result.AI_response}
                      </p>
                    </div>)}
                  </div>
                </div>
              )} 
            </div>
        </main>
      </div>
     
      </>
  );
}
