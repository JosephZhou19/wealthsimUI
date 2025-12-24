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

export interface SimulationResponse {
  seed: string;
}
