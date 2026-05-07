"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

export default function AddPatientForm() {

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({

        full_name: "",
        age: "",
        gender: "",

        height: "",
        weight: "",

        smoking: "",
        exercise: "",
        sugar: "",
        blood_pressure: "",

        region: "",
    });

    const handleSubmit = async () => {

        setLoading(true);
        setSuccess("");

        const { error } = await supabase
            .from("patients")
            .insert([form]);

        if (error) {

            console.log(error);

            alert(error.message);

            setLoading(false);

            return;
        }

        setSuccess("Patient added successfully.");

        setForm({

            full_name: "",
            age: "",
            gender: "",

            height: "",
            weight: "",

            smoking: "",
            exercise: "",
            sugar: "",
            blood_pressure: "",

            region: "",
        });

        setLoading(false);
    };
    const handleDownloadCSV = async () => {

        const { data, error } =
            await supabase
                .from("patients")
                .select("*");

        if (error) {

            alert(error.message);
            return;
        }

        if (!data || data.length === 0) {

            alert("No patient data found.");
            return;
        }

        /* =========================================
           CONVERT TO CSV
        ========================================= */

        const headers =
            Object.keys(data[0]);

        const csvRows = [

            headers.join(","),

            ...data.map((row) =>

                headers.map((field) =>

                    `"${row[field] ?? ""}"`

                ).join(",")
            ),
        ];

        const csvContent =
            csvRows.join("\n");

        /* =========================================
           DOWNLOAD FILE
        ========================================= */

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv",
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "patients.csv";

        link.click();

        URL.revokeObjectURL(url);
    };

    return (

        <div className="
            max-w-5xl mx-auto
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-700
            rounded-2xl shadow-lg
            p-8 mb-8
        ">

            {/* TITLE */}

            <div className="mb-6">

                <h2 className="
                    text-2xl font-bold
                    text-gray-900 dark:text-white
                ">
                    Add Patient Record
                </h2>

                <p className="
                    text-gray-700 dark:text-gray-300
                    mt-2
                ">
                    Enter patient health information for population analysis.
                </p>

            </div>

            {/* FORM */}

            <div className="grid md:grid-cols-2 gap-4">

                <Input
                    label="Full Name"
                    value={form.full_name}
                    onChange={(v: string) =>
                        setForm({ ...form, full_name: v })
                    }
                />

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
                    value={form.blood_pressure}
                    onChange={(v: string) =>
                        setForm({ ...form, blood_pressure: v })
                    }
                    options={["Low", "Normal", "High"]}
                />

                <Select
                    label="Region / State"
                    value={form.region}
                    onChange={(v: string) =>
                        setForm({ ...form, region: v })
                    }
                    options={[

                        "Johor",
                        "Kedah",
                        "Kelantan",
                        "Melaka",
                        "Negeri Sembilan",
                        "Pahang",
                        "Perak",
                        "Perlis",
                        "Pulau Pinang",
                        "Sabah",
                        "Sarawak",
                        "Selangor",
                        "Terengganu",
                        "Kuala Lumpur",
                        "Labuan",
                        "Putrajaya",
                    ]}
                />

            </div>

            {/* BUTTON */}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="
                    mt-6 w-full
                    bg-red-600 hover:bg-red-700
                    transition text-white
                    py-3 rounded-xl font-medium
                "
            >

                {loading
                    ? "Saving..."
                    : "Add Patient"
                }

            </button>

            <button
                onClick={handleDownloadCSV}
                className="
        mt-3 w-full

        bg-gray-800 hover:bg-gray-900
        dark:bg-gray-700 dark:hover:bg-gray-600

        transition text-white

        py-3 rounded-xl font-medium
    "
            >
                Download Patient CSV
            </button>

            {/* SUCCESS */}

            {success && (

                <p className="
                    mt-4 text-green-600
                    font-medium
                ">
                    {success}
                </p>
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
                type="text"
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