export interface SimulationRequest {
  years: number;
  num_paths: number;
  seed?: string;
  assets: {
    asset_id: string;
    contribution: number;
  }[];
}

export interface SimulationSummary {
  p10: number;
  p50: number;
  p90: number;
  mean: number;
}
export interface SimulationYear {
  year: number;
  p5: number;
  p25: number;
  p50: number;
  p75: number;
  p95: number;
}
export interface SimulationResponse {
  years: number;
  run_id: string;
  seed: string;
  final_result: {
    p5: number;
    p25: number;
    p50: number;
    p75: number;
    p95: number;
    probability_of_loss: number;
    max_drawdown: number;
  }
  yearly_timeline: SimulationYear[],
}
