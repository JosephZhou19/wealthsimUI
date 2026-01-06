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
  const order = ["p5", "p25", "p50", "p75", "p95"];
  return (
    <div className="flex justify-center items-center mb-4">
      <ResponsiveContainer width="80%" aspect={1.6} >
        <LineChart responsive data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Line type="monotone" dataKey="p5" stroke="#ef4444" />
          <Line type="monotone" dataKey="p25" stroke="#f97316" />
          <Line type="monotone" dataKey="p50" stroke="#22c55e" strokeWidth={3} />
          <Line type="monotone" dataKey="p75" stroke="#3b82f6" />
          <Line type="monotone" dataKey="p95" stroke="#6366f1" />
          <Tooltip itemSorter={(item) => -order.indexOf(item.dataKey as string)}/>
          <Legend itemSorter={(item) => order.indexOf(item.dataKey as string)}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
