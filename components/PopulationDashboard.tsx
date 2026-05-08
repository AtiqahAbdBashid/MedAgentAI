"use client";

import { useState } from "react";

import PopulationChart from "./PopulationChart";
import BeforeAfterChart from "./BeforeAfterChart";
import TimelineChart from "./TimelineChart";

export default function PopulationDashboard() {

    const [data, setData] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    const [showAfter, setShowAfter] = useState(false);

    const [stage, setStage] = useState<
        "idle" | "analyzing" | "decision" | "impact"
    >("idle");

    const [agentStep, setAgentStep] =
        useState(0);

    const runSimulation = async () => {

        try {

            setLoading(true);

            setShowAfter(false);

            setStage("analyzing");

            setAgentStep(0);

            setData(null);

            const response = await fetch("/api/analyze");

            if (!response.ok) {
                throw new Error("Simulation request failed");
            }

            const result = await response.json();

            setData(result);

            setTimeout(() => {
                setAgentStep(1);
            }, 500);

            setTimeout(() => {
                setAgentStep(2);
            }, 1200);

            setTimeout(() => {
                setAgentStep(3);
            }, 2000);

            setTimeout(() => {
                setAgentStep(4);
            }, 2800);

            setTimeout(() => {
                setStage("decision");
            }, 1200);

            setTimeout(() => {
                setStage("impact");
                setShowAfter(true);
            }, 2500);

        } catch (error) {

            console.error(
                "Simulation Error:",
                error
            );

        } finally {

            setTimeout(() => {
                setLoading(false);
            }, 3200);
        }
    };

    const runScenarioSimulation = async (
        mode: string
    ) => {

        setLoading(true);

        setShowAfter(false);

        setAgentStep(0);

        setData(null);

        const res = await fetch("/api/analyze");

        const result = await res.json();

        const enriched = await fetch(
            "/api/scenario",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify(result),
            }
        );

        const finalData =
            await enriched.json();

        setData(finalData);

        setTimeout(() => {
            setAgentStep(1);
        }, 500);

        setTimeout(() => {
            setAgentStep(2);
        }, 1200);

        setTimeout(() => {
            setAgentStep(3);
        }, 2000);

        setTimeout(() => {
            setAgentStep(4);
        }, 2800);

        setTimeout(() => {
            setStage("decision");
        }, 1200);

        setTimeout(() => {

            setStage("impact");

            setShowAfter(true);

        }, 2500);

        setLoading(false);
    };

    return (

        <div className="max-w-4xl mx-auto space-y-8">

            {/* SYSTEM OVERVIEW */}

            <div
                className="
        rounded-2xl

        border border-indigo-200
        dark:border-indigo-900

        bg-gradient-to-br
        from-white
        to-indigo-50

        dark:from-gray-900
        dark:to-indigo-950/20

        p-6 shadow-sm
    "
            >

                {/* HEADER */}

                <div className="
        flex items-center gap-3
        mb-4
    ">


                    <div>

                        <h3 className="
                text-xl font-bold

                text-gray-900 dark:text-white
            ">
                            AI Healthcare Intelligence System
                        </h3>

                        <p className="
                text-sm

                text-gray-600 dark:text-gray-400
            ">
                            Population-level healthcare risk monitoring and intervention planning platform.
                        </p>

                    </div>

                </div>

                {/* DESCRIPTION */}

                <div className="
        rounded-xl p-4

        bg-white/70 dark:bg-gray-800/60

        border border-gray-200 dark:border-gray-700
    ">

                    <p className="
            text-sm leading-relaxed

            text-gray-700 dark:text-gray-300
        ">

                        This AI-driven healthcare intelligence platform analyzes population health risk patterns, recommends preventive healthcare interventions, and simulates projected outcomes to support data-driven public health decision-making.

                    </p>

                </div>

            </div>

            {/* AI CONTROL CENTER */}

            <div
                className="
        rounded-2xl

        border border-slate-200
        dark:border-slate-800

        bg-gradient-to-br
        from-white
        to-slate-50

        dark:from-gray-900
        dark:to-slate-950/20

        p-6 shadow-sm
    "
            >

                <div className="
        flex flex-col lg:flex-row
        lg:items-center
        lg:justify-between

        gap-6
    ">

                    {/* LEFT */}

                    <div>

                        <div className="
                flex items-center gap-3
                mb-4
            ">

                            <div>

                                <h3 className="
                        text-xl font-bold

                        text-gray-900 dark:text-white
                    ">
                                    AI Simulation Control Center
                                </h3>

                                <p className="
                        text-sm

                        text-gray-600 dark:text-gray-400
                    ">
                                    Upload healthcare datasets or execute simulation scenarios for AI-driven population risk analysis.
                                </p>

                            </div>

                        </div>

                        {/* STATUS CARD */}

                        <div className="
                rounded-xl p-4

                bg-white/70 dark:bg-gray-800/60

                border border-gray-200
                dark:border-gray-700
            ">

                            <p className="
                    text-xs uppercase tracking-wide

                    text-gray-500 dark:text-gray-400
                ">
                                System Status
                            </p>

                            <p className="
                    mt-2 text-2xl font-bold

                    text-green-600
                ">
                                {loading
                                    ? "Processing..."
                                    : "Ready"
                                }
                            </p>

                            <p className="
                    mt-2 text-sm

                    text-gray-700 dark:text-gray-300
                ">
                                Multi-agent healthcare intelligence engine operational.
                            </p>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="
            flex flex-col gap-3
        ">

                        {/* MAIN BUTTON */}

                        <button
                            onClick={runSimulation}

                            disabled={loading}

                            className="
                    bg-red-600 hover:bg-red-700

                    text-white

                    px-6 py-4 rounded-xl

                    transition

                    disabled:opacity-50

                    shadow-sm

                    font-semibold
                "
                        >

                            {loading
                                ? "Processing..."
                                : data
                                    ? "Analyze Dataset Again"
                                    : "Analyze Uploaded Dataset"
                            }

                        </button>

                        {/* SCENARIO BUTTONS */}

                        <div className="
                grid grid-cols-1 gap-2
            ">

                            {/* HIGH */}

                            <button
                                onClick={() => runScenarioSimulation("high")}

                                disabled={loading}

                                className="
                        h-11 rounded-xl

                        bg-red-600 hover:bg-red-700

                        text-white

                        transition

                        disabled:opacity-50

                        text-sm font-medium
                    "
                            >
                                Simulate High Risk
                            </button>

                            {/* MEDIUM */}

                            <button
                                onClick={() => runScenarioSimulation("medium")}

                                disabled={loading}

                                className="
                        h-11 rounded-xl

                        bg-yellow-500 hover:bg-yellow-600

                        text-white

                        transition

                        disabled:opacity-50

                        text-sm font-medium
                    "
                            >
                                Simulate Medium Risk
                            </button>

                            {/* LOW */}

                            <button
                                onClick={() => runScenarioSimulation("low")}

                                disabled={loading}

                                className="
                        h-11 rounded-xl

                        bg-green-600 hover:bg-green-700

                        text-white

                        transition

                        disabled:opacity-50

                        text-sm font-medium
                    "
                            >
                                Simulate Low Risk
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* AI AGENT WORKFLOW */}

            {(loading || data) && (

                <div
                    className="
            rounded-2xl

            border border-cyan-200
            dark:border-cyan-900

            bg-gradient-to-br
            from-white
            to-cyan-50

            dark:from-gray-900
            dark:to-cyan-950/20

            p-6 shadow-sm
        "
                >

                    {/* HEADER */}

                    <div className="mb-6">

                        <h3 className="
                text-xl font-bold

                text-gray-900 dark:text-white
            ">
                            AI Agent Workflow
                        </h3>

                        <p className="
                text-sm mt-1

                text-gray-600 dark:text-gray-400
            ">
                            Multi-agent healthcare intelligence pipeline executing population analysis and intervention planning.
                        </p>

                    </div>

                    {/* AGENTS */}

                    <div className="space-y-4">

                        <WorkflowStep
                            active={agentStep >= 1}

                            title="Data Agent"

                            description={
                                data

                                    ? `${data.summary.total_population} healthcare records processed from uploaded dataset.`

                                    : "Processing uploaded healthcare dataset..."
                            }
                        />

                        <WorkflowStep
                            active={agentStep >= 2}

                            title="Risk Analysis Agent"

                            description={
                                data

                                    ? `Population vulnerability classified with ${data.summary.high_percentage.toFixed(1)}% high-risk exposure detected.`

                                    : "Analyzing healthcare vulnerability indicators..."
                            }
                        />

                        <WorkflowStep
                            active={agentStep >= 3}

                            title="Intervention Planning Agent"

                            description={
                                data

                                    ? `${data.decision.action}.`

                                    : "Allocating preventive healthcare interventions..."
                            }
                        />

                        <WorkflowStep
                            active={agentStep >= 4}

                            title="Outcome Prediction Agent"

                            description={
                                data

                                    ? `Projected ${data.intervention.reduction.toFixed(1)}% reduction in high-risk population exposure.`

                                    : "Simulating projected healthcare outcomes..."
                            }
                        />

                    </div>

                </div>
            )}
            {/* EMPTY STATE */}

            {!data && stage === "idle" && (

                <div
                    className="
            rounded-2xl

            border border-slate-200
            dark:border-slate-800

            bg-gradient-to-br
            from-white
            to-slate-50

            dark:from-gray-900
            dark:to-slate-950/20

            p-10 shadow-sm

            text-center
        "
                >


                    <h3 className="
            text-2xl font-bold

            text-gray-900 dark:text-white
        ">
                        AI Simulation Ready
                    </h3>

                    <p className="
            mt-3 text-sm leading-relaxed

            text-gray-600 dark:text-gray-400

            max-w-xl mx-auto
        ">

                        Execute a healthcare population simulation to generate AI-driven risk analysis, intervention planning, and projected healthcare outcome insights.

                    </p>

                </div>
            )}

            {/* ANALYZING */}
            {stage === "analyzing" && (
                <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200 animate-pulse shadow-sm">
                    <p className="text-sm text-yellow-800 font-medium">
                        Analyzing population health patterns...
                    </p>
                </div>
            )}

            {/* POPULATION RISK OVERVIEW */}

            {data && (stage === "decision" || stage === "impact") && (

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

                    {/* HEADER */}

                    <div className="
            flex items-center gap-3
            mb-6
        ">

                        <div>

                            <h3 className="
                    text-xl font-bold

                    text-gray-900 dark:text-white
                ">
                                Current Population Risk Overview
                            </h3>

                            <p className="
                    text-sm

                    text-gray-600 dark:text-gray-400
                ">
                                AI-classified regional health risk distribution before healthcare intervention.
                            </p>

                        </div>

                    </div>

                    {/* CHART */}

                    <PopulationChart data={data.summary} />

                    {/* POPULATION SIZE */}

                    <div
                        className="
        mt-6

        rounded-2xl

        border border-blue-200
        dark:border-blue-900

        bg-gradient-to-br
        from-blue-50
        to-white

        dark:from-blue-950/20
        dark:to-gray-900

        p-5
    "
                    >

                        <p className="
        text-sm font-medium

        text-blue-700 dark:text-blue-400
    ">
                            Uploaded Population Dataset
                        </p>

                        <div className="
        mt-3

        flex items-end gap-3
    ">

                            <p className="
            text-5xl font-bold

            text-gray-900 dark:text-white
        ">
                                {data.summary.total_population}
                            </p>

                            <p className="
            text-sm mb-1

            text-gray-600 dark:text-gray-400
        ">
                                healthcare records analyzed
                            </p>

                        </div>

                        <p className="
        mt-3 text-sm leading-relaxed

        text-gray-700 dark:text-gray-300
    ">

                            AI agents processed uploaded healthcare records to generate population-level risk analysis and intervention planning insights.

                        </p>

                    </div>

                    {/* STATS */}

                    <div className="
            grid grid-cols-1 md:grid-cols-3
            gap-4 mt-6
        ">

                        <Stat
                            label="High Risk"
                            value={data.summary.high_percentage}
                            color="red"
                        />

                        <Stat
                            label="Medium Risk"
                            value={data.summary.medium_percentage}
                        />

                        <Stat
                            label="Low Risk"
                            value={data.summary.low_percentage}
                        />

                    </div>

                    {/* AI SUMMARY */}

                    <div className="
            mt-5 rounded-xl p-4

            bg-white/70 dark:bg-gray-800/60

            border border-gray-200 dark:border-gray-700
        ">

                        <p className="
    text-sm leading-relaxed

    text-gray-700 dark:text-gray-300
">

                            AI intervention modeling predicts a reduction in high-risk population exposure from{" "}

                            <span className="font-bold text-red-600">
                                {data.summary.high_percentage.toFixed(1)}%
                            </span>

                            {" "}to{" "}

                            <span className="font-bold text-green-600">
                                {data.intervention.after_high.toFixed(1)}%
                            </span>

                            , representing an estimated overall improvement of{" "}

                            <span className="font-bold text-emerald-600">
                                {data.intervention.reduction.toFixed(1)}%
                            </span>

                            {" "}following targeted healthcare intervention and sustained monitoring initiatives.

                        </p>

                    </div>

                </div>
            )}


            {/* DECISION */}

            {data && stage === "impact" && (() => {

                const level = data.decision.level;

                const config = {

                    High: {
                        title: "Emergency Response Activated",
                        badge: "CRITICAL",
                        bg: "bg-red-50 border-red-300",
                        text: "text-red-700",
                        cardBg: "bg-red-100",

                    },

                    Medium: {
                        title: "Prevention Mode Activated",
                        badge: "EARLY INTERVENTION",
                        bg: "bg-yellow-50 border-yellow-300",
                        text: "text-yellow-700",
                        cardBg: "bg-yellow-100",

                    },

                    Low: {
                        title: "System Stable",
                        badge: "MONITORING",
                        bg: "bg-green-50 border-green-300",
                        text: "text-green-700",
                        cardBg: "bg-green-100",

                    }
                };

                const current =
                    config[level as keyof typeof config];

                return (


                    <div
                        className={`
            rounded-2xl

            border shadow-sm

            animate-fadeIn

            overflow-hidden

            ${level === "High"
                                ? "border-red-300 dark:border-red-900 bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-gray-900"

                                : level === "Medium"
                                    ? "border-yellow-300 dark:border-yellow-900 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-950/30 dark:to-gray-900"

                                    : "border-green-300 dark:border-green-900 bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-gray-900"
                            }
        `}
                    >
                        {/* SECTION HEADER */}

                        <div className="p-6 pb-0">

                            <div className="flex items-center gap-3">



                                <div>

                                    <h2 className="
                text-2xl font-bold

                text-gray-900 dark:text-white
            ">
                                        Autonomous Healthcare Intervention Coordination
                                    </h2>

                                    <p className="
                text-sm mt-1

                text-gray-600 dark:text-gray-400
            ">
                                        AI agents autonomously evaluate healthcare risk conditions and coordinate preventive intervention strategies.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* TOP HEADER */}

                        <div className="
            flex flex-col lg:flex-row
            lg:items-center
            lg:justify-between

            gap-4

            p-6
        ">

                            {/* LEFT */}

                            <div className="flex items-center gap-4">

                                <div
                                    className={`
                        h-14 w-14 rounded-2xl

                        flex items-center justify-center

                        text-3xl

                        ${level === "High"
                                            ? "bg-red-100 dark:bg-red-900/40"

                                            : level === "Medium"
                                                ? "bg-yellow-100 dark:bg-yellow-900/40"

                                                : "bg-green-100 dark:bg-green-900/40"
                                        }
                    `}
                                >

                                    {level === "High"
                                        ? "🚨"

                                        : level === "Medium"
                                            ? "⚠️"

                                            : "✅"
                                    }

                                </div>

                                <div>

                                    <h3 className="
                        text-2xl font-bold

                        text-gray-900 dark:text-white
                    ">
                                        {current.title}
                                    </h3>

                                    <p className="
                        text-sm mt-1

                        text-gray-600 dark:text-gray-400
                    ">
                                        AI healthcare decision engine generated an intervention strategy based on current population risk indicators.
                                    </p>

                                </div>

                            </div>

                            {/* BADGES */}

                            <div className="flex gap-2 flex-wrap">

                                <span
                                    className={`
                        px-3 py-1 rounded-full

                        text-xs font-semibold

                        ${level === "High"
                                            ? "bg-red-600 text-white"

                                            : level === "Medium"
                                                ? "bg-yellow-500 text-white"

                                                : "bg-green-600 text-white"
                                        }
                    `}
                                >
                                    {current.badge}
                                </span>

                                {data.decision.confidence && (

                                    <span className="
                        px-3 py-1 rounded-full

                        text-xs font-semibold

                        bg-white dark:bg-gray-800

                        border border-gray-200
                        dark:border-gray-700

                        text-gray-700 dark:text-gray-300
                    ">
                                        Confidence {(data.decision.confidence * 100).toFixed(0)}%
                                    </span>
                                )}

                            </div>

                        </div>

                        {/* BODY */}

                        <div className="px-6 pb-6 space-y-6">

                            {/* METRICS */}

                            <div className="
                grid md:grid-cols-2 gap-4
            ">

                                {/* OBSERVATION */}

                                <div className="
                    rounded-xl p-5

                    bg-white/70 dark:bg-gray-800/60

                    border border-gray-200
                    dark:border-gray-700
                ">

                                    <p className="
                        text-sm font-semibold mb-2

                        text-gray-900 dark:text-white
                    ">
                                        Observation
                                    </p>

                                    <p className="
                        text-sm leading-relaxed

                        text-gray-700 dark:text-gray-300
                    ">
                                        High-risk population currently stands at{" "}

                                        <span className="font-bold text-red-600">
                                            {data.summary.high_percentage.toFixed(1)}%
                                        </span>

                                        , indicating potential healthcare resource strain and elevated chronic disease exposure risk.
                                    </p>

                                </div>

                                <div className="
    rounded-xl p-5

    bg-white/70 dark:bg-gray-800/60

    border border-gray-200
    dark:border-gray-700
">

                                    <p className="
        text-sm font-semibold mb-2

        text-gray-900 dark:text-white
    ">
                                        AI Reasoning
                                    </p>

                                    <p className="
        text-sm leading-relaxed

        text-gray-700 dark:text-gray-300
    ">
                                        {data.intervention.reasoning}
                                    </p>

                                </div>

                            </div>

                            {/* DECISION */}

                            <div className="
                rounded-xl p-5

                bg-white/70 dark:bg-gray-800/60

                border border-gray-200
                dark:border-gray-700
            ">

                                <p className="
                    text-sm font-semibold

                    text-gray-700 dark:text-gray-400
                ">
                                    AI Decision
                                </p>

                                <p className="
                    mt-2 text-xl font-bold

                    text-gray-900 dark:text-white
                ">
                                    {data.intervention.recommendation}
                                </p>

                            </div>

                            {/* ACTION PLAN */}

                            <div>

                                <p className="
                    text-sm font-semibold mb-3

                    text-gray-900 dark:text-white
                ">
                                    Planned Actions
                                </p>

                                <div className="
                    grid md:grid-cols-2 gap-3
                ">

                                    {data.decision.planned_actions.map((a: string, i: number) => (

                                        <div
                                            key={i}

                                            className={`
                                rounded-xl p-4

                                border

                                text-sm

                                shadow-sm

                                ${level === "High"
                                                    ? "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900"

                                                    : level === "Medium"
                                                        ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900"

                                                        : "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900"
                                                }
                            `}
                                        >

                                            <p className="
                                text-gray-800 dark:text-gray-200
                            ">
                                                {a}
                                            </p>

                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* EXPECTED OUTCOME */}

                            <div
                                className={`
                    rounded-xl p-5

                    border

                    ${level === "High"
                                        ? "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900"

                                        : level === "Medium"
                                            ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900"

                                            : "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900"
                                    }
                `}
                            >

                                <p className="
                    text-sm font-semibold

                    text-gray-900 dark:text-white
                ">
                                    Expected Outcome
                                </p>

                                <p className="
                    mt-2 text-sm leading-relaxed

                    text-gray-700 dark:text-gray-300
                ">

                                    AI projection estimates a reduction of{" "}

                                    <span className="font-bold text-green-600">
                                        {data.intervention.reduction.toFixed(1)}%
                                    </span>

                                    {" "}in high-risk population exposure following successful intervention deployment.

                                </p>

                            </div>

                        </div>

                    </div>
                );

            })()}

            {/* EXECUTIVE OUTCOME SUMMARY */}
            {data && showAfter && (

                <div
                    className="
            rounded-2xl

            border border-emerald-200
            dark:border-emerald-900

            bg-gradient-to-br
            from-white
            to-emerald-50

            dark:from-gray-900
            dark:to-emerald-950/20

            p-6 shadow-sm

            animate-fadeIn
        "
                >

                    {/* HEADER */}

                    <div className="
            flex items-center gap-3
            mb-6
        ">

                        <div>

                            <h3 className="
                    text-xl font-bold

                    text-gray-900 dark:text-white
                ">
                                Executive Outcome Summary
                            </h3>

                            <p className="
                    text-sm

                    text-gray-600 dark:text-gray-400
                ">
                                High-level AI summary of projected healthcare improvement after intervention execution.
                            </p>

                        </div>

                    </div>

                    {/* METRICS */}

                    <div className="
            grid md:grid-cols-2 gap-4
        ">

                        {/* REMAINING RISK */}

                        <div className="
                rounded-xl p-5

                bg-red-50 dark:bg-red-950/20

                border border-red-200
                dark:border-red-900
            ">

                            <p className="
                    text-sm font-medium

                    text-red-700 dark:text-red-400
                ">
                                Remaining High Risk
                            </p>

                            <p className="
                    mt-2 text-4xl font-bold

                    text-red-600
                ">
                                {data.intervention.after_high.toFixed(1)}%
                            </p>

                            <p className="
                    mt-2 text-sm

                    text-gray-600 dark:text-gray-400
                ">
                                Population still classified as high risk after intervention.
                            </p>

                        </div>

                        {/* REDUCTION */}

                        <div className="
                rounded-xl p-5

                bg-green-50 dark:bg-green-950/20

                border border-green-200
                dark:border-green-900
            ">

                            <p className="
                    text-sm font-medium

                    text-green-700 dark:text-green-400
                ">
                                Overall Risk Reduction
                            </p>

                            <p className="
                    mt-2 text-4xl font-bold

                    text-green-600
                ">
                                -{data.intervention.reduction.toFixed(1)}%
                            </p>

                            <p className="
                    mt-2 text-sm

                    text-gray-600 dark:text-gray-400
                ">
                                Estimated decrease in high-risk population exposure.
                            </p>

                        </div>

                    </div>


                </div>
            )}

            {/* INTERVENTION IMPACT COMPARISON */}

            {data && showAfter && (

                <div
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

                    {/* HEADER */}

                    <div className="
            flex items-center gap-3
            mb-6
        ">

                        <div>

                            <h3 className="
                    text-xl font-bold

                    text-gray-900 dark:text-white
                ">
                                Intervention Impact Comparison
                            </h3>

                            <p className="
                    text-sm

                    text-gray-600 dark:text-gray-400
                ">
                                AI comparison of healthcare risk distribution before and after intervention deployment.
                            </p>

                        </div>

                    </div>

                    {/* CHART */}

                    <BeforeAfterChart data={data} />

                    {/* AI SUMMARY */}

                    <div className="
            mt-5 rounded-xl p-4

            bg-white/70 dark:bg-gray-800/60

            border border-gray-200 dark:border-gray-700
        ">

                        <p className="
                text-sm leading-relaxed

                text-gray-700 dark:text-gray-300
            ">

                            AI intervention analysis predicts measurable reduction in high-risk population exposure alongside improved lower-risk population distribution after preventive healthcare implementation.

                        </p>

                    </div>

                </div>
            )}

            {/* RISK REDUCTION TIMELINE */}

            {data && showAfter && (

                <div
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

                    {/* HEADER */}

                    <div className="
            flex items-center gap-3
            mb-6
        ">


                        <div>

                            <h3 className="
                    text-xl font-bold

                    text-gray-900 dark:text-white
                ">
                                Risk Reduction Over Time
                            </h3>

                            <p className="
                    text-sm

                    text-gray-600 dark:text-gray-400
                ">
                                AI projection of healthcare risk reduction across the intervention timeline.
                            </p>

                        </div>

                    </div>

                    {/* CHART */}

                    <TimelineChart data={data} />

                    {/* AI SUMMARY */}

                    <div className="
            mt-5 rounded-xl p-4

            bg-white/70 dark:bg-gray-800/60

            border border-gray-200 dark:border-gray-700
        ">

                        <p className="
                text-sm leading-relaxed

                text-gray-700 dark:text-gray-300
            ">

                            AI timeline projection estimates reduction in high-risk population exposure from{" "}

                            <span className="font-bold text-red-600">
                                {data.summary.high_percentage.toFixed(1)}%
                            </span>

                            {" "}to{" "}

                            <span className="font-bold text-green-600">
                                {data.intervention.after_high.toFixed(1)}%
                            </span>

                            {" "}over the projected intervention timeline.

                        </p>

                    </div>

                </div>
            )}


        </div>
    );
}

function WorkflowStep({

    active,

    title,

    description,

}: any) {

    return (

        <div
            className={`
                rounded-xl p-4

                border transition-all duration-500

                ${active

                    ? `
                        border-cyan-300
                        dark:border-cyan-800

                        bg-cyan-50
                        dark:bg-cyan-950/20

                        opacity-100
                    `

                    : `
                        border-gray-200
                        dark:border-gray-700

                        bg-white/60
                        dark:bg-gray-900/40

                        opacity-50
                    `
                }
            `}
        >

            <div className="
                flex items-start gap-4
            ">

                {/* STATUS */}

                <div
                    className={`
                        h-10 w-10 rounded-xl

                        flex items-center justify-center

                        text-lg font-bold

                        ${active

                            ? `
                                bg-cyan-600
                                text-white
                            `

                            : `
                                bg-gray-300
                                dark:bg-gray-700

                                text-gray-600
                                dark:text-gray-400
                            `
                        }
                    `}
                >

                    {active ? "✓" : "•"}

                </div>

                {/* CONTENT */}

                <div>

                    <h4 className="
                        font-semibold

                        text-gray-900 dark:text-white
                    ">
                        {title}
                    </h4>

                    <p className="
                        text-sm mt-1 leading-relaxed

                        text-gray-600 dark:text-gray-400
                    ">
                        {description}
                    </p>

                </div>

            </div>

        </div>
    );
}

function Stat({ label, value, color }: any) {

    const getColor = () => {

        if (color === "red") return "text-red-600";

        if (label.toLowerCase().includes("medium"))
            return "text-yellow-600";

        if (label.toLowerCase().includes("low"))
            return "text-green-600";

        return "text-gray-800";
    };

    return (

        <div className="p-4 rounded-lg text-center bg-white border shadow-sm">

            <p className="text-xs text-gray-700 uppercase">
                {label}
            </p>

            <p className={`text-xl font-semibold mt-1 ${getColor()}`}>
                {value.toFixed(1)}%
            </p>

        </div>
    );
}