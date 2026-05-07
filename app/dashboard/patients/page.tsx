"use client";

import Link from "next/link";

import AddPatientForm from "@/components/AddPatientForm";

export default function PatientsPage() {

    return (

        <main className="
            min-h-screen bg-medical
            p-6
        ">

            <div className="max-w-5xl mx-auto mb-6">

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

            <AddPatientForm />

        </main>
    );
}