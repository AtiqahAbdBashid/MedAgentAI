"use client";

import { useState } from "react";

export default function PublicHealthForm() {

    const [form, setForm] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
        smoking: "",
        exercise: "",
        sugar: "",
        bloodPressure: "",
    });

    const [result, setResult] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    const calculateRisk = async () => {

        setLoading(true);

        const heightM =
            Number(form.height) / 100;

        const bmi =
            Number(form.weight) /
            (heightM * heightM);

        /* BMI CATEGORY */

        let bmiCategory = "";

        if (bmi < 18.5) {
            bmiCategory = "Underweight";
        }

        else if (bmi < 25) {
            bmiCategory = "Normal";
        }

        else if (bmi < 30) {
            bmiCategory = "Overweight";
        }

        else if (bmi < 35) {
            bmiCategory = "Obesity Class I";
        }

        else if (bmi < 40) {
            bmiCategory = "Obesity Class II";
        }

        else {
            bmiCategory = "Obesity Class III";
        }

        try {

            const res = await fetch(
                "/api/personal-screening",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({

                        age: form.age,

                        gender: form.gender,

                        bmi: bmi.toFixed(1),

                        smoking: form.smoking,

                        exercise: form.exercise,

                        sugar: form.sugar,

                        bloodPressure:
                            form.bloodPressure,
                    }),
                }
            );

            const aiResult = await res.json();

            setResult({

                bmi: bmi.toFixed(1),

                bmiCategory,

                risk: aiResult.risk,

                reasoning:
                    aiResult.reasoning,

                recommendations:
                    aiResult.recommendations,
            });

        } catch (error) {

            console.log(error);

            alert(
                "AI analysis failed."
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="
            bg-white dark:bg-gray-900

            border border-gray-200 dark:border-gray-700

            rounded-2xl p-8 shadow-lg
        ">

            {/* HEADER */}

            <div className="mb-6">

                <h2 className="
                    text-2xl font-bold
                    text-gray-900 dark:text-white
                ">
                    Personal Health Screening
                </h2>

                <p className="
                    text-gray-700 dark:text-gray-300
                    mt-2
                ">
                    Enter your health information to estimate your health risk level.
                </p>

            </div>

            {/* FORM */}

            <div className="grid md:grid-cols-2 gap-4">

                <Input
                    label="Age"
                    value={form.age}
                    onChange={(v: string) =>
                        setForm({ ...form, age: v })
                    }
                />

                <Select
                    label="Gender"
                    value={form.gender}
                    onChange={(v: string) =>
                        setForm({ ...form, gender: v })
                    }
                    options={["Male", "Female"]}
                />

                <Input
                    label="Height (cm)"
                    value={form.height}
                    onChange={(v: string) =>
                        setForm({ ...form, height: v })
                    }
                />

                <Input
                    label="Weight (kg)"
                    value={form.weight}
                    onChange={(v: string) =>
                        setForm({ ...form, weight: v })
                    }
                />

                <Select
                    label="Smoking"
                    value={form.smoking}
                    onChange={(v: string) =>
                        setForm({ ...form, smoking: v })
                    }
                    options={["Yes", "No"]}
                />

                <Select
                    label="Exercise"
                    value={form.exercise}
                    onChange={(v: string) =>
                        setForm({ ...form, exercise: v })
                    }
                    options={["Yes", "No"]}
                />

                <Select
                    label="Blood Sugar Level"
                    value={form.sugar}
                    onChange={(v: string) =>
                        setForm({ ...form, sugar: v })
                    }
                    options={["Low", "Normal", "High"]}
                />

                <Select
                    label="Blood Pressure"
                    value={form.bloodPressure}
                    onChange={(v: string) =>
                        setForm({ ...form, bloodPressure: v })
                    }
                    options={["Low", "Normal", "High"]}
                />

            </div>

            {/* BUTTON */}

            <button
                onClick={calculateRisk}
                disabled={loading}
                className="
                    mt-6 w-full

                    bg-red-600 hover:bg-red-700

                    transition text-white

                    py-3 rounded-xl font-medium
                "
            >

                {loading
                    ? "AI Analyzing..."
                    : "Generate AI Health Report"
                }

            </button>

            {/* RESULT */}

            {result && (

                <div className="
                    mt-6 p-6 rounded-xl border

                    bg-gray-50 dark:bg-gray-800

                    dark:border-gray-700
                ">

                    <h3 className="
                        text-xl font-semibold

                        text-gray-900 dark:text-white
                    ">
                        AI Health Screening Result
                    </h3>

                    <div className="
                        mt-5 space-y-4

                        text-gray-800 dark:text-gray-200
                    ">

                        {/* BMI */}

                        <div>

                            <p className="font-semibold">
                                BMI
                            </p>

                            <p className="mt-1">
                                {result.bmi}
                            </p>

                        </div>

                        {/* BMI CATEGORY */}

                        <div>

                            <p className="font-semibold">
                                BMI Category
                            </p>

                            <p
                                className={`
                                    mt-1 font-semibold

                                    ${result.bmiCategory.includes("Normal")
                                        ? "text-green-600"

                                        : result.bmiCategory.includes("Overweight")
                                            ? "text-yellow-600"

                                            : result.bmiCategory.includes("Obesity")
                                                ? "text-red-600"

                                                : "text-blue-600"
                                    }
                                `}
                            >
                                {result.bmiCategory}
                            </p>

                        </div>

                        {/* RISK */}

                        <div>

                            <p className="font-semibold">
                                AI Risk Level
                            </p>

                            <p
                                className={`
                                    mt-1 font-bold text-lg

                                    ${result.risk === "High"
                                        ? "text-red-600"

                                        : result.risk === "Medium"
                                            ? "text-yellow-600"

                                            : "text-green-600"
                                    }
                                `}
                            >
                                {result.risk}
                            </p>

                        </div>

                        {/* AI REASONING */}

                        <div>

                            <p className="font-semibold mb-2">
                                AI Medical Reasoning
                            </p>

                            <p className="
                                leading-relaxed

                                text-gray-700 dark:text-gray-300
                            ">
                                {result.reasoning}
                            </p>

                        </div>

                        {/* RECOMMENDATIONS */}

                        <div>

                            <p className="font-semibold mb-2">
                                AI Recommendations
                            </p>

                            <ul className="
                                list-disc ml-5 space-y-2
                            ">

                                {result.recommendations?.map(
                                    (
                                        r: string,
                                        i: number
                                    ) => (

                                        <li key={i}>
                                            {r}
                                        </li>
                                    )
                                )}

                            </ul>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

/* INPUT */

function Input({
    label,
    value,
    onChange,
}: any) {

    return (

        <div>

            <p className="
                text-sm mb-1

                text-gray-700 dark:text-gray-300
            ">
                {label}
            </p>

            <input
                type="number"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="
                    w-full border rounded-xl px-4 py-3

                    text-gray-900 dark:text-white

                    bg-white dark:bg-gray-800

                    border-gray-300 dark:border-gray-700
                "
            />

        </div>
    );
}

/* SELECT */

function Select({
    label,
    value,
    onChange,
    options,
}: any) {

    return (

        <div>

            <p className="
                text-sm mb-1

                text-gray-700 dark:text-gray-300
            ">
                {label}
            </p>

            <select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="
                    w-full border rounded-xl px-4 py-3

                    text-gray-900 dark:text-white

                    bg-white dark:bg-gray-800

                    border-gray-300 dark:border-gray-700
                "
            >

                <option value="">
                    Select option
                </option>

                {options.map((o: string) => (

                    <option
                        key={o}
                        value={o}
                    >
                        {o}
                    </option>
                ))}

            </select>

        </div>
    );
}