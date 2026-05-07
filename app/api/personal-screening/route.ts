import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {

    try {

        const body =
            await request.json();

        let score = 0;

        /* BMI */

        const bmi =
            Number(body.bmi);

        if (bmi >= 30) {

            score += 3;

        } else if (bmi >= 25) {

            score += 2;
        }

        /* SMOKING */

        if (body.smoking === "Yes") {

            score += 2;
        }

        /* EXERCISE */

        if (body.exercise === "No") {

            score += 2;
        }

        /* BLOOD PRESSURE */

        if (
            body.bloodPressure === "High"
        ) {

            score += 2;
        }

        /* BLOOD SUGAR */

        if (
            body.sugar === "High"
        ) {

            score += 2;
        }

        /* FINAL RISK */

        let risk = "Low";

        let reasoning = "";

        let recommendations: string[] = [];

        if (score >= 7) {

            risk = "High";

            reasoning =
                "The patient presents multiple major health risk indicators including obesity, smoking, hypertension, and elevated blood sugar levels.";

            recommendations = [

                "Seek immediate clinical consultation",

                "Begin structured lifestyle intervention",

                "Reduce smoking and sedentary behavior",

                "Monitor blood pressure regularly",

                "Improve dietary and physical activity habits",
            ];

        } else if (score >= 4) {

            risk = "Medium";

            reasoning =
                "The patient demonstrates moderate health risk factors that may develop into chronic disease if left unmanaged.";

            recommendations = [

                "Increase physical activity",

                "Monitor blood sugar and blood pressure",

                "Maintain balanced nutrition",

                "Schedule periodic health screening",
            ];

        } else {

            risk = "Low";

            reasoning =
                "The patient currently demonstrates relatively healthy lifestyle and clinical indicators with low immediate chronic disease risk.";

            recommendations = [

                "Maintain healthy lifestyle habits",

                "Continue regular exercise",

                "Perform routine preventive health checks",
            ];
        }

        return NextResponse.json({

            risk,

            reasoning,

            recommendations,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(

            {
                error: "AI screening failed"
            },

            {
                status: 500
            }
        );
    }
}