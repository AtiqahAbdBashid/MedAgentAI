import { NextRequest, NextResponse } from "next/server";

import {
    runInterventionPlanningAgent
} from "@/lib/agents/interventionAgent";

import {
    runOutcomePredictionAgent
} from "@/lib/agents/predictionAgent";

export async function POST(
    req: NextRequest
) {

    try {

        const body = await req.json();

        const summary = body.summary;

        /* =========================================
           INTERVENTION AGENT
        ========================================= */

        const intervention =
            await runInterventionPlanningAgent(
                summary
            );

        /* =========================================
           PREDICTION AGENT
        ========================================= */

        const prediction =
            await runOutcomePredictionAgent(
                summary,
                intervention
            );

        return NextResponse.json({

            summary,

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
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                error:
                    "Scenario processing failed",
            },
            {
                status: 500,
            }
        );
    }
}