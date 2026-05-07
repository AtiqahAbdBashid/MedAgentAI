import { openai } from "@/lib/openai";

type RiskAnalysis = {

    total_population: number;

    high_percentage: number;
    medium_percentage: number;
    low_percentage: number;

    high_count: number;
    medium_count: number;
    low_count: number;
};

export async function runInterventionPlanningAgent(

    analysis: RiskAnalysis
) {

    const high = analysis.high_percentage;

    const medium =
        analysis.medium_percentage;

    let level = "Low";

    let confidence = 0.82;

    let action =
        "Continue long-term healthcare monitoring";

    let actions: string[] = [];

    /* =========================================
       HIGH RISK
    ========================================= */

    if (high >= 35) {

        level = "High";

        confidence = 0.96;

        action =
            "Deploy emergency healthcare intervention";

        actions = [

            "🚑 Deploy emergency medical teams",

            "🏥 Increase hospital capacity",

            "📊 Immediate mass screening",

            "📢 Public health alerts",

            "💊 Prioritize chronic disease treatment",

            "🧬 Expand healthcare surveillance",
        ];
    }

    /* =========================================
       MEDIUM RISK
    ========================================= */

    else if (

        high >= 20 ||

        medium >= 45

    ) {

        level = "Medium";

        confidence = 0.91;

        action =
            "Initiate preventive healthcare campaign";

        actions = [

            "🩺 Deploy screening units",

            "📢 Launch awareness campaigns",

            "🥗 Promote lifestyle changes",

            "📊 Monitor population trends",

            "🏃 Encourage preventive healthcare programs",

            "💉 Expand early intervention services",
        ];
    }

    /* =========================================
       LOW RISK
    ========================================= */

    else {

        level = "Low";

        confidence = 0.87;

        action =
            "Continue long-term healthcare monitoring";

        actions = [

            "📊 Continue monitoring",

            "🧍 Maintain current resources",

            "📈 Track long-term trends",

            "✅ No immediate action required",

            "🩺 Maintain preventive screening",

            "📚 Continue public health education",
        ];
    }
    /* =========================================
       OPENAI HEALTHCARE REASONING
    ========================================= */

    const prompt = `

You are a healthcare intervention planning AI.

Analyze this healthcare population risk summary and generate:

1. A professional healthcare reasoning paragraph
2. A concise intervention recommendation

Population Summary:
- High Risk: ${analysis.high_percentage.toFixed(1)}%
- Medium Risk: ${analysis.medium_percentage.toFixed(1)}%
- Low Risk: ${analysis.low_percentage.toFixed(1)}%

Intervention Level:
${level}

Primary Action:
${action}

Respond in JSON format:

{
  "reasoning": "...",
  "recommendation": "..."
}
`;

    let reasoning =
        "AI reasoning unavailable.";

    let recommendation =
        action;

    try {

        const completion =
            await openai.chat.completions.create({

                model: "gpt-4.1-mini",

                response_format: {
                    type: "json_object",
                },

                messages: [

                    {
                        role: "system",

                        content:
                            "You are an AI healthcare strategist.",
                    },

                    {
                        role: "user",

                        content: prompt,
                    },
                ],

                temperature: 0.7,
            });

        const parsed = JSON.parse(

            completion.choices[0]
                .message.content || "{}"
        );

        reasoning =
            parsed.reasoning || reasoning;

        recommendation =
            parsed.recommendation
            || recommendation;

    } catch (e) {

        console.error(
            "OpenAI reasoning failed:",
            e
        );
    }
    /* =========================================
       RETURN PLAN
    ========================================= */

    return {

        level,

        confidence,

        action,

        actions,

        reasoning,

        recommendation,
    };
}