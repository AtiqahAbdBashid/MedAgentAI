"use client";

import { useState, useEffect } from "react";

export default function RegionDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [animatedData, setAnimatedData] = useState<any[]>([]);

    const runSimulation = async () => {
        setLoading(true);
        setAnimatedData([]);

        const res = await fetch("http://127.0.0.1:8000/simulate-regions");
        const result = await res.json();

        setData(result);
        setLoading(false);
    };

    // 🔥 ANIMATION EFFECT
    useEffect(() => {
        if (!data) return;

        const updated = data.regions.map((r: any) => ({
            ...r,
            current: r.before
        }));

        setAnimatedData(updated);

        const interval = setInterval(() => {
            setAnimatedData(prev =>
                prev.map((r, i) => {
                    if (r.current <= data.regions[i].after) return r;

                    return {
                        ...r,
                        current: parseFloat(
                            (r.current - 0.5).toFixed(2)
                        )
                    };
                })
            );
        }, 40);

        setTimeout(() => clearInterval(interval), 2000);

        return () => clearInterval(interval);
    }, [data]);

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">
                    Regional Risk Analysis
                </h2>

                <button
                    onClick={runSimulation}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                    {loading ? "Analyzing..." : "Run Region Simulation"}
                </button>
            </div>

            {/* REGIONS */}
            {animatedData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {animatedData.map((r: any, index: number) => {
                        const isPriority =
                            r.region === data.decision.priority_region;

                        const final = data.regions[index];

                        return (
                            <div
                                key={r.region}
                                className={`
                                    p-5 rounded-xl border transition
                                    ${isPriority
                                        ? "bg-red-50 border-red-400 shadow-md"
                                        : "bg-white border-gray-200"}
                                `}
                            >
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-800">
                                        {r.region}
                                    </p>

                                    {isPriority && (
                                        <span className="text-xs px-2 py-1 bg-red-600 text-white rounded-full">
                                            PRIORITY
                                        </span>
                                    )}
                                </div>

                                {/* BEFORE */}
                                <div className="mt-4">
                                    <p className="text-gray-500 text-sm">Before</p>
                                    <p className="text-red-600 font-bold text-lg">
                                        {final.before}%
                                    </p>
                                </div>

                                {/* AFTER (ANIMATED) */}
                                <div className="mt-3">
                                    <p className="text-gray-500 text-sm">After</p>
                                    <p className="text-green-600 font-bold text-lg">
                                        {r.current.toFixed(2)}%
                                    </p>
                                </div>

                                {/* REDUCTION */}
                                {r.current <= final.after && (
                                    <div className="text-green-600 font-medium mt-2">
                                        ↓ {final.reduction}%
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* DECISION PANEL */}
            {data && (
                <div className="p-5 border rounded-xl bg-gray-50">
                    <p className="text-sm text-gray-500">AI Decision</p>

                    <p className="mt-2 font-semibold text-red-600">
                        Prioritize {data.decision.priority_region}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                        {data.decision.reason}
                    </p>

                    <p className="text-sm mt-2">
                        {data.decision.action}
                    </p>
                </div>
            )}
        </div>
    );
}