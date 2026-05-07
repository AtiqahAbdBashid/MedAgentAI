import {
    runRiskAnalysisAgent
} from "./riskAgent";

import {
    runInterventionPlanningAgent
} from "./interventionAgent";

import {
    runOutcomePredictionAgent
} from "./predictionAgent";

export async function runHealthcareOrchestrator() {

    /* =========================================
       STEP 1 — RISK ANALYSIS
    ========================================= */

    const analysis =
        await runRiskAnalysisAgent();

    /* =========================================
       STEP 2 — INTERVENTION PLANNING
    ========================================= */

    const intervention =
        await runInterventionPlanningAgent(
            analysis
        );

    /* =========================================
       STEP 3 — OUTCOME PREDICTION
    ========================================= */

    const prediction =
        await runOutcomePredictionAgent(
            analysis,
            intervention
        );

    /* =========================================
       AGENT WORKFLOW LOG
    ========================================= */

    const workflow = [

        {
            agent: "Data Agent",

            status: "completed",

            description:
                `${analysis.total_population} healthcare records processed`,
        },

        {
            agent: "Risk Analysis Agent",

            status: "completed",

            description:
                `${analysis.high_percentage.toFixed(1)}% high-risk population exposure detected`,
        },

        {
            agent: "Intervention Planning Agent",

            status: "completed",

            description:
                intervention.action,
        },

        {
            agent: "Outcome Prediction Agent",

            status: "completed",

            description:
                `${prediction.reduction.toFixed(1)}% projected population risk reduction`,
        },
    ];

    /* =========================================
       FINAL RESULT
    ========================================= */

    return {

        summary: analysis,

        intervention: {

            ...intervention,

            reduction:
                prediction.reduction,

            after_high:
                prediction.after_high,
        },

        decision: {

            level:
                intervention.level,

            confidence:
                intervention.confidence,

            action:
                intervention.action,

            planned_actions:
                intervention.actions,
        },

        prediction,

        workflow,
    };
}