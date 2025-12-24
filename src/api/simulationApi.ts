import { apiFetch } from "./client";
import type { SimulationRequest, SimulationResponse } from "../types/simulation";

export function runSimulation(req: SimulationRequest) {
  return apiFetch<SimulationResponse>("/simulate/basic/1", {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export function getSimulationRuns() {
    return apiFetch<SimulationResponse[]>("/simulate/simulationRuns", {
        method: "GET"
    })
}
export function runBasicSimulation(years: number) {
    const url = `/simulate/basic/${years}`
    return apiFetch<SimulationResponse>(url, {
        method: "GET",
    })
}