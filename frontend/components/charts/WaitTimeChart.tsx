"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { avgWaitTimePerQueueMock } from "./MockData";
import ChartWrapper from "./ChartWrapper";

export default function WaitTimeChart() {
  return (
    <ChartWrapper
      title="Average Waiting Time per Queue"
      description="Shows the average time users wait in different queues."
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={avgWaitTimePerQueueMock}
          layout="vertical"
          margin={{ left: 40 }}
        >
          <XAxis type="number" />
          <YAxis dataKey="queue" type="category" width={110} />
          <Tooltip
            formatter={(value) =>
              value !== undefined ? `${value} min` : ""
            }
          />
          <Bar
            dataKey="avgWaitMinutes"
            fill="#16a34a"
            radius={[0, 6, 6, 0]}
            animationDuration={700}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
