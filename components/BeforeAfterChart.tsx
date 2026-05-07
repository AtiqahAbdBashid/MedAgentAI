"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
} from "recharts";

export default function BeforeAfterChart({ data }: any) {

    const [showAfter, setShowAfter] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0.4,
    });

    useEffect(() => {

        // RESET when section leaves screen
        if (!data || !inView) {
            setShowAfter(false);
            return;
        }

        // PLAY animation when visible
        const timer = setTimeout(() => {
            setShowAfter(true);
        }, 1200);

        return () => clearTimeout(timer);

    }, [data, inView]);

    if (!data) return null;

    const mediumAfter = Math.max(
        data.summary.medium_percentage -
        data.intervention.reduction / 2,
        0
    );

    const lowAfter =
        100 -
        data.intervention.after_high -
        mediumAfter;

    const chartData = [
        {
            name: "High",
            Before: data.summary.high_percentage,
            After: showAfter ? data.intervention.after_high : 0,
        },
        {
            name: "Medium",
            Before: data.summary.medium_percentage,
            After: showAfter ? mediumAfter : 0,
        },
        {
            name: "Low",
            Before: data.summary.low_percentage,
            After: showAfter ? lowAfter : 0,
        },
    ];

    return (

        <div
            ref={ref}

            className="
            rounded-2xl

            border border-blue-200
            dark:border-blue-900

            bg-gradient-to-br
            from-white
            to-blue-50

            dark:from-gray-900
            dark:to-blue-950/20

            p-6 shadow-sm
        "
        >


            {/* CHART */}

            <div className="h-80 w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={chartData}

                        margin={{
                            top: 20,
                            right: 20,
                            left: 0,
                            bottom: 10,
                        }}
                    >

                        {/* GRID */}

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                        />

                        {/* X AXIS */}

                        <XAxis
                            dataKey="name"

                            tick={{
                                fill: "#111827",
                                fontSize: 14,
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
                                fontSize: 14,
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
                                color: "#111827",
                                fontWeight: 700,
                            }}
                        />

                        {/* LEGEND */}

                        <Legend
                            wrapperStyle={{
                                color: "#111827",
                                paddingTop: "10px",
                                fontWeight: 600,
                            }}
                        />

                        {/* BEFORE */}

                        <Bar
                            dataKey="Before"

                            fill="#dc2626"

                            radius={[10, 10, 0, 0]}

                            isAnimationActive

                            animationDuration={800}
                        />

                        {/* AFTER */}

                        <Bar
                            dataKey="After"

                            fill="#16a34a"

                            radius={[10, 10, 0, 0]}

                            isAnimationActive

                            animationDuration={1200}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>



        </div>
    );
}