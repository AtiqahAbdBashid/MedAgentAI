import { NextResponse } from "next/server";

import {
    runHealthcareOrchestrator
} from "@/lib/agents/orchestrator";

export async function GET() {

    try {

        const result =
            await runHealthcareOrchestrator();

        return NextResponse.json(result);

    } catch (error) {

        console.error(error);

        return NextResponse.json(

            {
                error: "Analysis failed"
            },

            {
                status: 500
            }
        );
    }
}