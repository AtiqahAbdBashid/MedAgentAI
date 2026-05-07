"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AddPatientForm from "@/components/AddPatientForm";
import { supabase } from "@/lib/supabase";
import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,

} from "recharts";

export default function PatientsPage() {

    const [patients, setPatients] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [sortBy, setSortBy] =
        useState("name");

    const [selectedPatient, setSelectedPatient] =
        useState<any | null>(null);

    const [history, setHistory] =
        useState<any[]>([]);

    const [showHistory, setShowHistory] =
        useState(false);

    const [editForm, setEditForm] =
        useState<any>(null);

    const [currentPage, setCurrentPage] =
        useState(1);

    const patientsPerPage = 20;
    /* =========================================
       FETCH PATIENTS
    ========================================= */

    const fetchPatients = async () => {

        const { data, error } =
            await supabase

                .from("patients")

                .select("*")

                .order("created_at", {
                    ascending: false,
                });

        if (error) {

            console.log(error);
            return;
        }

        setPatients(data || []);

        setLoading(false);
    };

    useEffect(() => {

        fetchPatients();

    }, []);

    /* =========================================
       FILTER + SORT
    ========================================= */

    const filteredPatients =

        [...patients]

            .filter((p) =>

                p.full_name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            )

            .sort((a, b) => {

                if (sortBy === "age") {

                    return a.age - b.age;
                }

                if (sortBy === "weight") {

                    return a.weight - b.weight;
                }


                return a.full_name.localeCompare(
                    b.full_name
                );
            });

    const totalPages = Math.ceil(
        filteredPatients.length /
        patientsPerPage
    );

    const paginatedPatients =

        filteredPatients.slice(

            (currentPage - 1)
            * patientsPerPage,

            currentPage
            * patientsPerPage
        );
    /* =========================================
       UPDATE PATIENT
    ========================================= */

    const savePatientUpdate = async () => {

        if (!selectedPatient) return;

        /* =========================================
           SAVE OLD VERSION INTO HISTORY
        ========================================= */

        const { error: historyError } =
            await supabase

                .from("patient_history")

                .insert([{

                    patient_id:
                        selectedPatient.id,

                    full_name:
                        selectedPatient.full_name,

                    age:
                        selectedPatient.age,

                    gender:
                        selectedPatient.gender,

                    height:
                        selectedPatient.height,

                    weight:
                        selectedPatient.weight,

                    smoking:
                        selectedPatient.smoking,

                    exercise:
                        selectedPatient.exercise,

                    sugar:
                        selectedPatient.sugar,

                    blood_pressure:
                        selectedPatient
                            .blood_pressure,

                    region:
                        selectedPatient.region,
                }]);

        if (historyError) {

            alert(historyError.message);
            return;
        }

        /* =========================================
           UPDATE CURRENT RECORD
        ========================================= */

        const { error } = await supabase

            .from("patients")

            .update({

                ...editForm,

                updated_at:
                    new Date()
                        .toISOString(),
            })

            .eq("id", selectedPatient.id);

        if (error) {

            alert(error.message);
            return;
        }

        alert(
            "Patient updated successfully."
        );

        setSelectedPatient(null);

        fetchPatients();
    };

    const openHistory = async (
        patient: any
    ) => {

        const { data, error } =
            await supabase

                .from("patient_history")

                .select("*")

                .eq(
                    "patient_id",
                    patient.id
                )

                .order(
                    "created_at",
                    {
                        ascending: true
                    }
                );

        if (error) {

            alert(error.message);
            return;
        }

        setHistory(data || []);

        setSelectedPatient(patient);

        setShowHistory(true);
    };

    const getPatientTrend = (
        patient: any
    ) => {

        const patientHistory =

            history.filter(

                (h) =>
                    h.patient_id === patient.id
            );

        if (
            patientHistory.length === 0
        ) {

            return {

                label: "Stable",

                color:
                    "text-gray-600",
            };
        }

        const latest =
            patientHistory[
            patientHistory.length - 1
            ];

        let score = 0;

        /* WEIGHT */

        if (
            patient.weight <
            latest.weight
        ) {

            score += 1;

        } else if (
            patient.weight >
            latest.weight
        ) {

            score -= 1;
        }

        /* SMOKING */

        if (
            latest.smoking === "Yes"
            &&
            patient.smoking === "No"
        ) {

            score += 1;

        } else if (
            latest.smoking === "No"
            &&
            patient.smoking === "Yes"
        ) {

            score -= 1;
        }

        /* EXERCISE */

        if (
            latest.exercise === "No"
            &&
            patient.exercise === "Yes"
        ) {

            score += 1;

        } else if (
            latest.exercise === "Yes"
            &&
            patient.exercise === "No"
        ) {

            score -= 1;
        }

        /* BLOOD PRESSURE */

        if (
            latest.blood_pressure === "High"
            &&
            patient.blood_pressure ===
            "Normal"
        ) {

            score += 1;

        } else if (
            latest.blood_pressure ===
            "Normal"
            &&
            patient.blood_pressure ===
            "High"
        ) {

            score -= 1;
        }

        /* FINAL RESULT */

        if (score >= 2) {

            return {

                label:
                    "Improving ↓",

                color:
                    "text-green-600",
            };
        }

        if (score <= -2) {

            return {

                label:
                    "Deteriorating ↑",

                color:
                    "text-red-600",
            };
        }

        return {

            label:
                "Stable →",

            color:
                "text-gray-600",
        };
    };

    return (

        <main className="
            min-h-screen bg-medical
            p-6
        ">

            {/* BACK BUTTON */}

            <div className="
                max-w-6xl mx-auto
                mb-6
            ">

                <Link
                    href="/dashboard"
                    className="
                        inline-flex items-center gap-2

                        text-red-600 hover:text-red-700

                        font-medium
                    "
                >
                    ← Back to Dashboard
                </Link>

            </div>

            {/* ADD FORM */}

            <AddPatientForm />

            {/* =========================================
               MONITORING
            ========================================= */}

            <div className="
                max-w-6xl mx-auto
            ">

                {/* TITLE */}

                <div className="mb-6">

                    <h2 className="
                        text-2xl font-bold

                        text-gray-900
                        dark:text-white
                    ">
                        Patient Monitoring
                    </h2>

                    <p className="
                        mt-2

                        text-gray-700
                        dark:text-gray-300
                    ">
                        Search, monitor, and update
                        longitudinal patient records.
                    </p>

                </div>

                {/* SEARCH + SORT */}

                <div className="
                    mb-6

                    flex flex-col md:flex-row
                    gap-4
                ">

                    <input
                        type="text"

                        placeholder="
                            Search patient name...
                        "

                        value={search}

                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }

                        className="
                            flex-1

                            border rounded-xl

                            px-4 py-3

                            bg-white
                            dark:bg-gray-900

                            text-gray-900
                            dark:text-white

                            border-gray-300
                            dark:border-gray-700
                        "
                    />

                    <select

                        value={sortBy}

                        onChange={(e) =>
                            setSortBy(
                                e.target.value
                            )
                        }

                        className="
                            border rounded-xl

                            px-4 py-3

                            bg-white
                            dark:bg-gray-900

                            text-gray-900
                            dark:text-white

                            border-gray-300
                            dark:border-gray-700
                        "
                    >

                        <option value="name">
                            Sort by Name
                        </option>

                        <option value="age">
                            Sort by Age
                        </option>

                        <option value="region">
                            Sort by Region
                        </option>

                    </select>

                </div>

                {/* TABLE */}

                {loading ? (

                    <p className="
                        text-gray-700
                        dark:text-gray-300
                    ">
                        Loading patients...
                    </p>

                ) : (

                    <div className="
    overflow-x-auto

    border border-gray-300

    bg-white

    shadow-sm
">

                        <table className="
    min-w-full

    text-xs

    border-collapse

    text-black
">

                            <thead className="
    bg-gray-200
    dark:bg-gray-800

    sticky top-0

    text-black
    dark:text-white
">

                                <tr>

                                    <th className="
                                        px-2 py-1
                                        text-left
                                    ">
                                        Patient
                                    </th>

                                    <th className="
                                        px-2 py-1
                                        text-left
                                    ">
                                        Age
                                    </th>

                                    <th className="
                                        px-2 py-1
                                        text-left
                                    ">
                                        Weight
                                    </th>

                                    <th className="
                                        px-2 py-1
                                        text-left
                                    ">
                                        BP
                                    </th>

                                    <th className="
                                        px-2 py-1
                                        text-left
                                    ">
                                        Smoking
                                    </th>

                                    <th className="
                                        px-2 py-1
                                        text-left
                                    ">
                                        Region
                                    </th>

                                    <th className="
    px-2 py-1
    text-left
">
                                        Trend
                                    </th>

                                    <th className="
                                        px-2 py-1
                                        text-left
                                    ">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {paginatedPatients.map((p) => (

                                    <tr
                                        key={p.id}

                                        className="
                                            border-t

                                            border-gray-200
                                            dark:border-gray-700
                                        "
                                    >

                                        <td className="
                                            px-2 py-1
                                        ">
                                            {p.full_name}
                                        </td>

                                        <td className="
                                            px-2 py-1
                                        ">
                                            {p.age}
                                        </td>

                                        <td className="
                                            px-2 py-1
                                        ">
                                            {p.weight}kg
                                        </td>

                                        <td className="
                                            px-2 py-1
                                        ">
                                            {p.blood_pressure}
                                        </td>

                                        <td className="
                                            px-2 py-1
                                        ">
                                            {p.smoking}
                                        </td>

                                        <td className="
                                            px-2 py-1
                                        ">
                                            {p.region}
                                        </td>

                                        <td className="
    px-2 py-1
">

                                            <span className={
                                                getPatientTrend(p).color
                                            }>

                                                {
                                                    getPatientTrend(p).label
                                                }

                                            </span>

                                        </td>

                                        <td className="
    px-2 py-1
">

                                            <div className="
        flex gap-2
    ">

                                                <button

                                                    onClick={() => {

                                                        setSelectedPatient(p);

                                                        setEditForm({

                                                            full_name:
                                                                p.full_name,

                                                            age:
                                                                p.age,

                                                            gender:
                                                                p.gender,

                                                            height:
                                                                p.height,

                                                            weight:
                                                                p.weight,

                                                            smoking:
                                                                p.smoking,

                                                            exercise:
                                                                p.exercise,

                                                            sugar:
                                                                p.sugar,

                                                            blood_pressure:
                                                                p.blood_pressure,

                                                            region:
                                                                p.region,
                                                        });
                                                    }}

                                                    className="
                bg-red-600
                hover:bg-red-700

                transition

                text-white

                px-2 py-1

                rounded-lg

                text-xs
            "
                                                >
                                                    Update
                                                </button>

                                                <button

                                                    onClick={() =>
                                                        openHistory(p)
                                                    }

                                                    className="
                text-xs

                px-2 py-1

                border

                bg-blue-50
                hover:bg-blue-100

                text-blue-700

                rounded-lg
            "
                                                >

                                                    View History

                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>
            {/* =========================================
   EDIT PATIENT MODAL
========================================= */}

            {selectedPatient && editForm && (

                <div className="
        fixed inset-0

        bg-black/50

        flex items-center
        justify-center

        z-50

        p-4
    ">

                    <div className="
            bg-white

            w-full
            max-w-3xl

            rounded-2xl

            p-6

            max-h-[90vh]
            overflow-y-auto
        ">

                        {/* TITLE */}

                        <h2 className="
                text-2xl font-bold

                text-black

                mb-2
            ">
                            Edit Patient Record
                        </h2>

                        <p className="
                text-sm text-gray-600

                mb-6
            ">

                            Updating this patient will
                            archive the previous health
                            record into longitudinal
                            healthcare history tracking.

                        </p>

                        {/* FORM */}

                        <div className="
                grid md:grid-cols-2
                gap-5
            ">

                            {/* FULL NAME */}

                            <div>

                                <label className="
                        block text-sm font-medium

                        text-black

                        mb-1
                    ">
                                    Full Name
                                </label>

                                <input
                                    type="text"

                                    value={editForm.full_name}

                                    onChange={(e) =>
                                        setEditForm({

                                            ...editForm,

                                            full_name:
                                                e.target.value,
                                        })
                                    }

                                    className="
                            w-full

                            border

                            px-3 py-2

                            text-black
                        "
                                />

                            </div>

                            {/* AGE */}

                            <div>

                                <label className="
                        block text-sm font-medium

                        text-black

                        mb-1
                    ">
                                    Age
                                </label>

                                <input
                                    type="number"

                                    value={editForm.age}

                                    onChange={(e) =>
                                        setEditForm({

                                            ...editForm,

                                            age:
                                                e.target.value,
                                        })
                                    }

                                    className="
                            w-full

                            border

                            px-3 py-2

                            text-black
                        "
                                />

                            </div>

                            {/* HEIGHT */}

                            <div>

                                <label className="
                        block text-sm font-medium

                        text-black

                        mb-1
                    ">
                                    Height (cm)
                                </label>

                                <input
                                    type="number"

                                    value={editForm.height}

                                    onChange={(e) =>
                                        setEditForm({

                                            ...editForm,

                                            height:
                                                e.target.value,
                                        })
                                    }

                                    className="
                            w-full

                            border

                            px-3 py-2

                            text-black
                        "
                                />

                            </div>

                            {/* WEIGHT */}

                            <div>

                                <label className="
                        block text-sm font-medium

                        text-black

                        mb-1
                    ">
                                    Weight (kg)
                                </label>

                                <input
                                    type="number"

                                    value={editForm.weight}

                                    onChange={(e) =>
                                        setEditForm({

                                            ...editForm,

                                            weight:
                                                e.target.value,
                                        })
                                    }

                                    className="
                            w-full

                            border

                            px-3 py-2

                            text-black
                        "
                                />

                            </div>

                            {/* SMOKING */}

                            <div>

                                <label className="
                        block text-sm font-medium

                        text-black

                        mb-1
                    ">
                                    Smoking Status
                                </label>

                                <select

                                    value={editForm.smoking}

                                    onChange={(e) =>
                                        setEditForm({

                                            ...editForm,

                                            smoking:
                                                e.target.value,
                                        })
                                    }

                                    className="
                            w-full

                            border

                            px-3 py-2

                            text-black
                        "
                                >

                                    <option>
                                        Yes
                                    </option>

                                    <option>
                                        No
                                    </option>

                                </select>

                            </div>

                            {/* EXERCISE */}

                            <div>

                                <label className="
                        block text-sm font-medium

                        text-black

                        mb-1
                    ">
                                    Exercise Level
                                </label>

                                <select

                                    value={editForm.exercise}

                                    onChange={(e) =>
                                        setEditForm({

                                            ...editForm,

                                            exercise:
                                                e.target.value,
                                        })
                                    }

                                    className="
                            w-full

                            border

                            px-3 py-2

                            text-black
                        "
                                >

                                    <option>
                                        Yes
                                    </option>

                                    <option>
                                        No
                                    </option>

                                </select>

                            </div>

                            {/* BLOOD PRESSURE */}

                            <div>

                                <label className="
                        block text-sm font-medium

                        text-black

                        mb-1
                    ">
                                    Blood Pressure
                                </label>

                                <select

                                    value={
                                        editForm.blood_pressure
                                    }

                                    onChange={(e) =>
                                        setEditForm({

                                            ...editForm,

                                            blood_pressure:
                                                e.target.value,
                                        })
                                    }

                                    className="
                            w-full

                            border

                            px-3 py-2

                            text-black
                        "
                                >

                                    <option>
                                        Low
                                    </option>

                                    <option>
                                        Normal
                                    </option>

                                    <option>
                                        High
                                    </option>

                                </select>

                            </div>
                            {/* SUGAR */}

                            <div>

                                <label className="
        block text-sm font-medium

        text-black

        mb-1
    ">
                                    Blood Sugar Level
                                </label>

                                <select

                                    value={editForm.sugar}

                                    onChange={(e) =>
                                        setEditForm({

                                            ...editForm,

                                            sugar:
                                                e.target.value,
                                        })
                                    }

                                    className="
            w-full

            border

            px-3 py-2

            text-black
        "
                                >

                                    <option>
                                        Low
                                    </option>

                                    <option>
                                        Normal
                                    </option>

                                    <option>
                                        High
                                    </option>

                                </select>

                            </div>
                            {/* REGION */}

                            <div>

                                <label className="
                        block text-sm font-medium

                        text-black

                        mb-1
                    ">
                                    Region
                                </label>

                                <input
                                    type="text"

                                    value={editForm.region}

                                    onChange={(e) =>
                                        setEditForm({

                                            ...editForm,

                                            region:
                                                e.target.value,
                                        })
                                    }

                                    className="
                            w-full

                            border

                            px-3 py-2

                            text-black
                        "
                                />

                            </div>

                        </div>

                        {/* BUTTONS */}

                        <div className="
                flex justify-end
                gap-3

                mt-8
            ">

                            <button

                                onClick={() =>
                                    setSelectedPatient(null)
                                }

                                className="
                        px-4 py-2

                        border

                        text-black
                    "
                            >
                                Cancel
                            </button>

                            <button

                                onClick={savePatientUpdate}

                                className="
                        bg-red-600
                        hover:bg-red-700

                        text-white

                        px-5 py-2

                        rounded-lg
                    "
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* =========================================
   HISTORY MODAL
========================================= */}

            {showHistory && (

                <div className="
        fixed inset-0

        bg-black/50

        z-50

        flex items-center
        justify-center

        p-4
    ">

                    <div className="
            bg-white

            w-full
            max-w-5xl

            rounded-2xl

            p-6

            max-h-[90vh]
            overflow-y-auto
        ">

                        {/* HEADER */}

                        <div className="
                flex justify-between
                items-center

                mb-6
            ">

                            <div>

                                <h2 className="
                        text-2xl font-bold
                        text-black
                    ">
                                    Patient History Timeline
                                </h2>

                                <p className="
                        text-sm text-gray-600
                        mt-1
                    ">

                                    Longitudinal healthcare
                                    progression tracking.

                                </p>

                            </div>

                            <button

                                onClick={() =>
                                    setShowHistory(false)
                                }

                                className="
                        border

                        px-3 py-2
                    "
                            >
                                Close
                            </button>

                        </div>

                        {/* WEIGHT TREND */}

                        <div className="
                border rounded-xl

                p-4 mb-6
            ">

                            <h3 className="
                    font-semibold

                    text-black

                    mb-4
                ">
                                Weight Progression
                            </h3>

                            <div className="h-64">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <LineChart data={history}>

                                        <XAxis
                                            dataKey="created_at"
                                        />

                                        <YAxis />

                                        <Tooltip />

                                        <Line
                                            type="monotone"

                                            dataKey="weight"
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                        {/* HISTORY TABLE */}

                        <div className="
                overflow-x-auto

                border
            ">

                            <table className="
                    min-w-full

                    text-xs

                    border-collapse

                    text-black
                ">

                                <thead className="
                        bg-gray-200
                    ">

                                    <tr>

                                        <th className="
                                px-2 py-1
                                text-left
                            ">
                                            Date
                                        </th>

                                        <th className="
                                px-2 py-1
                                text-left
                            ">
                                            Weight
                                        </th>

                                        <th className="
                                px-2 py-1
                                text-left
                            ">
                                            Smoking
                                        </th>

                                        <th className="
                                px-2 py-1
                                text-left
                            ">
                                            Exercise
                                        </th>

                                        <th className="
                                px-2 py-1
                                text-left
                            ">
                                            BP
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {history.map((h, i) => (

                                        <tr
                                            key={i}

                                            className="
                                    border-t
                                "
                                        >

                                            <td className="
                                    px-2 py-1
                                ">

                                                {
                                                    new Date(
                                                        h.created_at
                                                    ).toLocaleString()
                                                }

                                            </td>

                                            <td className="
                                    px-2 py-1
                                ">
                                                {h.weight}
                                            </td>

                                            <td className="
                                    px-2 py-1
                                ">
                                                {h.smoking}
                                            </td>

                                            <td className="
                                    px-2 py-1
                                ">
                                                {h.exercise}
                                            </td>

                                            <td className="
                                    px-2 py-1
                                ">
                                                {h.blood_pressure}
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>
            )}
        </main>
    );
}