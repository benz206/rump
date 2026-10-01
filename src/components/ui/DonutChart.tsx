"use client";
import { PieChart, Pie, Cell } from "recharts";
import { theme } from "@/config/theme";
import { ui } from "@/config/content";
export function DonutChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <figure aria-label={ui.chart} className="flex items-center gap-4">
      <PieChart width={180} height={180}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={58}
          outerRadius={82}
          isAnimationActive={false}
          stroke={theme.surface}
        >
          {data.map((item, i) => (
            <Cell key={item.name} fill={i % 2 ? theme.line : theme.ink} />
          ))}
        </Pie>
      </PieChart>
      <figcaption className="space-y-2 text-xs text-muted">
        {data.map((item) => (
          <p key={item.name}>
            {item.name}: {item.value}
          </p>
        ))}
      </figcaption>
    </figure>
  );
}
