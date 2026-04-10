"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type EiaChartPoint = {
  period: string;
  value: number | string;
};

interface EiaChartProps {
  data: EiaChartPoint[];
}

export function EiaChart({ data }: EiaChartProps) {
  const chartData = [...data]
    .sort((a, b) => Date.parse(a.period) - Date.parse(b.period))
    .map((item) => ({
      ...item,
      value: Number(item.value),
      periodLabel: item.period.replaceAll("-", "."),
    }));

  return (
    <div className="w-full rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-lg text-black font-semibold">천연가스 저장량</h2>
        <p className="text-sm text-black/60">Recent weekly values</p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer
          minHeight={0}
          minWidth={0}
          width="100%"
          height="100%"
          initialDimension={{ width: 1, height: 1 }}
        >
          <LineChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -12, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="periodLabel"
              tick={{ fontSize: 12 }}
              minTickGap={24}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #1f2937",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.28)",
                color: "#f9fafb",
                padding: "10px 12px",
              }}
              itemStyle={{
                color: "#bfdbfe",
                fontSize: 13,
                fontWeight: 600,
              }}
              labelStyle={{
                color: "#f9fafb",
                fontSize: 12,
                fontWeight: 500,
                marginBottom: 6,
              }}
              cursor={{ stroke: "#94a3b8", strokeDasharray: "4 4" }}
              formatter={(value) => [Number(value).toLocaleString(), "Value"]}
              labelFormatter={(label, payload) =>
                payload?.[0]?.payload?.period ?? label
              }
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
