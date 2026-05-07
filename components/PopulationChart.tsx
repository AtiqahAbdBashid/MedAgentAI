"use client";

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,

} from "recharts";

export default function PopulationChart({
  data,
}: any) {

  const chartData = [

    {
      name: "High Risk",
      value: data.high_percentage,
    },

    {
      name: "Medium Risk",
      value: data.medium_percentage,
    },

    {
      name: "Low Risk",
      value: data.low_percentage,
    },
  ];

  const COLORS = [

    "#dc2626",

    "#facc15",

    "#16a34a",
  ];

  return (

    <div
      className="
                rounded-2xl

                border border-purple-200
                dark:border-purple-900

                bg-gradient-to-br
                from-white
                to-purple-50

                dark:from-gray-900
                dark:to-purple-950/20

                p-6 shadow-sm
            "
    >



      {/* CHART */}

      <div className="w-full h-80">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={chartData}

              dataKey="value"

              nameKey="name"

              outerRadius={100}

              innerRadius={55}

              paddingAngle={4}
            >

              {chartData.map((_, i) => (

                <Cell
                  key={i}
                  fill={COLORS[i]}
                />
              ))}

            </Pie>

            {/* TOOLTIP */}

            <Tooltip

              contentStyle={{
                backgroundColor: "#ffffff",

                border:
                  "1px solid #e5e7eb",

                borderRadius: "16px",

                color: "#111827",

                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.08)",
              }}

              labelStyle={{
                color: "#111827",
                fontWeight: 700,
              }}

              itemStyle={{
                color: "#111827",
                fontWeight: 700,
              }}
            />

            {/* LEGEND */}

            <Legend
              wrapperStyle={{
                paddingTop: "20px",

                fontWeight: 600,

                color: "#111827",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}