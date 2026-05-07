"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import PopulationDashboard from "@/components/PopulationDashboard";
import ThemeToggle from "@/components/ThemeToggle";
import PulseBackground from "@/components/PulseBackground";

import Link from "next/link";

export default function DashboardPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [datasetFile, setDatasetFile] =
        useState<File | null>(null);

    const [uploading, setUploading] =
        useState(false);

    const [uploadSuccess, setUploadSuccess] =
        useState(false);

    /* =========================================
       DATASET UPLOAD
    ========================================= */

    const handleDatasetUpload = async (
        file: File
    ) => {

        try {

            setUploading(true);

            const formData = new FormData();

            formData.append("file", file);

            const response = await fetch(
                "/api/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            console.log(result);

            setUploadSuccess(true);

        } catch (error) {

            console.error(error);

        } finally {

            setUploading(false);
        }
    };

    /* =========================================
       LOGOUT
    ========================================= */

    const handleLogout = async () => {

        await supabase.auth.signOut();

        router.push("/login");
    };

    /* =========================================
       AUTH CHECK
    ========================================= */

    useEffect(() => {

        const checkUser = async () => {

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {

                router.push("/login");
                return;
            }

            setLoading(false);
        };

        checkUser();

    }, [router]);

    /* =========================================
       LOADING
    ========================================= */

    if (loading) {

        return (

            <div className="
                min-h-screen bg-medical
                flex items-center justify-center
            ">

                <p className="
                    text-gray-700 dark:text-gray-300
                ">
                    Loading dashboard...
                </p>

            </div>
        );
    }

    /* =========================================
       PAGE
    ========================================= */

    return (

        <main
            className="
                relative min-h-screen

                bg-medical overflow-hidden

                p-6
            "
        >

            {/* BACKGROUND */}

            <PulseBackground />

            {/* CONTENT */}

            <div className="relative z-10">

                {/* HEADER */}

                <div
                    className="
                        max-w-5xl mx-auto

                        flex flex-col lg:flex-row
                        lg:items-center
                        lg:justify-between

                        gap-6 mb-8
                    "
                >

                    {/* LEFT */}

                    <div>

                        <h1
                            className="
                                text-3xl font-bold

                                text-red-600
                            "
                        >
                            MedAgent AI
                        </h1>

                        <p
                            className="
                                text-sm mt-1

                                text-gray-700
                                dark:text-gray-300
                            "
                        >
                            Admin Population Dashboard
                        </p>

                    </div>

                    {/* RIGHT */}

                    <div className="
                        flex items-center gap-3
                    ">

                        <ThemeToggle />

                        <button
                            onClick={handleLogout}

                            className="
                                bg-red-600
                                hover:bg-red-700

                                text-white

                                px-4 py-2

                                rounded-xl

                                transition
                            "
                        >
                            Logout
                        </button>

                    </div>

                </div>

                {/* ACTION PANEL */}

                <div
                    className="
                        max-w-5xl mx-auto

                        grid lg:grid-cols-2

                        gap-6 mb-8
                    "
                >

                    {/* MANAGE PATIENTS */}

                    <div
                        className="
                            rounded-2xl

                            border border-gray-200
                            dark:border-gray-700

                            bg-white/80
                            dark:bg-gray-900/70

                            backdrop-blur

                            p-5 shadow-sm
                        "
                    >

                        <h3
                            className="
                                font-semibold

                                text-gray-900
                                dark:text-white
                            "
                        >
                            Patient Management
                        </h3>

                        <p
                            className="
                                text-sm mt-1 mb-4

                                text-gray-600
                                dark:text-gray-400
                            "
                        >
                            Access patient healthcare records and screening information.
                        </p>

                        <Link
                            href="/dashboard/patients"

                            className="
                                inline-block

                                bg-gray-700
                                hover:bg-gray-800

                                text-white

                                px-5 py-3

                                rounded-xl

                                transition
                            "
                        >
                            Manage Patients
                        </Link>

                    </div>

                    {/* DATASET UPLOAD */}

                    <div
                        className="
                            rounded-2xl

                            border border-gray-200
                            dark:border-gray-700

                            bg-white/80
                            dark:bg-gray-900/70

                            backdrop-blur

                            p-5 shadow-sm
                        "
                    >

                        <h3
                            className="
                                font-semibold

                                text-gray-900
                                dark:text-white
                            "
                        >
                            Upload Healthcare Dataset
                        </h3>

                        <p
                            className="
                                text-sm mt-1 mb-4

                                text-gray-600
                                dark:text-gray-400
                            "
                        >
                            Upload CSV population records for AI agent analysis and healthcare simulation.
                        </p>

                        {/* FILE INPUT */}

                        <label
                            className="
                                cursor-pointer

                                inline-block

                                bg-red-600
                                hover:bg-red-700

                                text-white text-sm

                                px-4 py-2

                                rounded-xl

                                transition
                            "
                        >

                            Choose CSV File

                            <input
                                type="file"

                                accept=".csv"

                                className="hidden"

                                onChange={async (e) => {

                                    const file =
                                        e.target.files?.[0];

                                    if (file) {

                                        setDatasetFile(file);

                                        await handleDatasetUpload(file);
                                    }
                                }}
                            />

                        </label>

                        {/* STATUS */}

                        <div className="mt-4 space-y-2">

                            {uploading && (

                                <p className="
                                    text-sm text-blue-600
                                ">
                                    Uploading dataset...
                                </p>
                            )}

                            {uploadSuccess && (

                                <p className="
                                    text-sm text-green-600
                                ">
                                    ✓ Dataset successfully processed
                                </p>
                            )}

                            {datasetFile && (

                                <div
                                    className="
                                        rounded-xl

                                        bg-green-50
                                        dark:bg-green-900/20

                                        border border-green-200
                                        dark:border-green-800

                                        p-3
                                    "
                                >

                                    <p className="
                                        text-sm font-medium

                                        text-green-700
                                        dark:text-green-400
                                    ">
                                        ✓ Dataset Loaded
                                    </p>

                                    <p className="
                                        text-xs mt-1

                                        text-gray-700
                                        dark:text-gray-300
                                    ">
                                        {datasetFile.name}
                                    </p>

                                </div>
                            )}

                        </div>

                    </div>

                </div>

                {/* DASHBOARD */}

                <PopulationDashboard />

            </div>

        </main>
    );
}