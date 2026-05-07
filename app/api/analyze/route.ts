import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

    try {

        const body = await req.json();

        const prompt = `
You are a healthcare AI assistant.

Analyze this patient data:

Age: ${body.age}
Gender: ${body.gender}
BMI: ${body.bmi}
Smoking: ${body.smoking}
Exercise: ${body.exercise}
Sugar Intake: ${body.sugar}
Blood Pressure: ${body.bloodPressure}

Provide:

1. Risk Level (Low, Medium, High)
2. Brief medical reasoning
3. Recommended actions

Respond ONLY in JSON format like:

{
  "risk": "",
  "reasoning": "",
  "recommendations": []
}
`;

        const response =
            await openai.chat.completions.create({

                model: "gpt-4.1-mini",

                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],

                response_format: {
                    type: "json_object",
                },
            });

        const content =
            response.choices[0].message.content;

        return Response.json(
            JSON.parse(content || "{}")
        );

    } catch (error) {

        console.log(error);

        return Response.json(
            {
                error: "AI analysis failed",
            },
            {
                status: 500,
            }
        );
    }
}