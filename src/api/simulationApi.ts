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
export function runAdvancedSimulation(years: number, useAI: boolean) {
  var url;
  if (useAI) {
    url = `/simulate/advanced/${years}?AI_analysis=true` 
  } else {
    url = `/simulate/advanced/${years}` 
  }
  return apiFetch<SimulationResponse>(url, {
    method: "GET"
  })
}