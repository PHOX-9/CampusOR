"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { tokensServedPerHourMock } from "./MockData";
import ChartWrapper from "./ChartWrapper";

export default function TokensServedChart() {
  return (
    <ChartWrapper
      title="Tokens Served Per Hour"
      description="Shows how many tokens were successfully served during each hourly interval."
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={tokensServedPerHourMock}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="served"
            fill="#6366f1"
            radius={[6, 6, 0, 0]}
            animationDuration={700}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
