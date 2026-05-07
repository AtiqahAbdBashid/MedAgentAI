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
    const handleLogout = async () => {

        await supabase.auth.signOut();

        router.push("/login");
    };

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

    /* LOADING */

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

    return (

        <main className="
            relative min-h-screen
            bg-medical overflow-hidden
            p-6
        ">

            {/* BACKGROUND */}

            <PulseBackground />

            {/* CONTENT */}

            <div className="relative z-10">

                {/* HEADER */}

                <div className="
                    max-w-5xl mx-auto
                    flex justify-between items-center
                    mb-8
                ">

                    <div>

                        <h1 className="
                            text-3xl font-bold
                            text-red-600
                        ">
                            MedAgent AI
                        </h1>

                        <p className="
                            text-sm mt-1
                            text-gray-700 dark:text-gray-300
                        ">
                            Admin Population Dashboard
                        </p>

                    </div>

                    <div className="flex items-center gap-3">

                        <ThemeToggle />

                        <button
                            onClick={handleLogout}
                            className="
            bg-red-600 hover:bg-red-700

            text-white

            px-4 py-2 rounded-xl

            transition
        "
                        >
                            Logout
                        </button>

                    </div>

                </div>

                <div className="
    max-w-5xl mx-auto
    flex gap-4 mb-6
">

                    <Link
                        href="/dashboard/patients"
                        className="
            bg-red-600 hover:bg-blue-700
            text-white px-5 py-3
            rounded-xl transition
        "
                    >
                        Manage Patients
                    </Link>

                </div>

                {/* DASHBOARD */}

                <PopulationDashboard />

            </div>

        </main>
    );
}