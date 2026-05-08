"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function TimelineChart({ data }: any) {

    const [timelineData, setTimelineData] = useState<any[]>([]);

    const { ref, inView } = useInView({
        threshold: 0.4,
    });

    useEffect(() => {

        // RESET when not visible
        if (!data || !inView) {
            setTimelineData([]);
            return;
        }

        const before = data.summary.high_percentage;
        const after = data.intervention.after_high;

        const generated = [
            { day: "Day 0", value: before },
            { day: "Day 7", value: before - (before - after) * 0.3 },
            { day: "Day 14", value: before - (before - after) * 0.6 },
            { day: "Day 30", value: after },
        ];

        setTimelineData([]);

        let step = 1;

        setTimelineData([generated[0]]);

        const interval = setInterval(() => {

            setTimelineData(generated.slice(0, step + 1));

            step++;

            if (step >= generated.length) {
                clearInterval(interval);
            }

        }, 600);

        return () => clearInterval(interval);

    }, [data, inView]);

    if (!data) return null;

    return (

        <div
            ref={ref}

            className="
            rounded-2xl

            border border-red-200
            dark:border-red-900

            bg-gradient-to-br
            from-white
            to-red-50

            dark:from-gray-900
            dark:to-red-950/20

            p-6 shadow-sm
        "
        >

            {/* CHART */}

            <div className="h-80 w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={timelineData}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 0,
                            bottom: 10,
                        }}
                    >

                        {/* GRID */}

                        <CartesianGrid
                            strokeDasharray="4 4"
                            stroke="#e5e7eb"
                        />

                        {/* X AXIS */}

                        <XAxis
                            dataKey="day"

                            tick={{
                                fill: "#111827",
                                fontSize: 13,
                                fontWeight: 600,
                            }}

                            tickLine={false}

                            axisLine={{
                                stroke: "#d1d5db"
                            }}
                        />

                        {/* Y AXIS */}

                        <YAxis
                            tick={{
                                fill: "#111827",
                                fontSize: 13,
                                fontWeight: 600,
                            }}

                            tickLine={false}

                            axisLine={{
                                stroke: "#d1d5db"
                            }}
                        />

                        {/* TOOLTIP */}

                        <Tooltip

                            contentStyle={{
                                backgroundColor: "#ffffff",

                                border: "1px solid #e5e7eb",

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
                                color: "#dc2626",
                                fontWeight: 700,
                            }}
                        />

                        {/* LINE */}

                        <Line
                            type="monotone"

                            dataKey="value"

                            stroke="#dc2626"

                            strokeWidth={4}

                            dot={{
                                r: 7,

                                fill: "#dc2626",

                                strokeWidth: 3,

                                stroke: "#ffffff",
                            }}

                            activeDot={{
                                r: 9,

                                fill: "#991b1b",
                            }}

                            isAnimationActive

                            animationDuration={700}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>


        </div>
    );
}