import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import type { SimulationYear } from "../types/simulation";

type Props = {
  data: SimulationYear[];
};

export function SimulationChart({ data }: Props) {
  return (
    <ResponsiveContainer width={900} height={650}>
      <LineChart data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="p5" stroke="#ef4444" />
        <Line type="monotone" dataKey="p25" stroke="#f97316" />
        <Line type="monotone" dataKey="p50" stroke="#22c55e" strokeWidth={3} />
        <Line type="monotone" dataKey="p75" stroke="#3b82f6" />
        <Line type="monotone" dataKey="p95" stroke="#6366f1" />
      </LineChart>
    </ResponsiveContainer>
  );
}
