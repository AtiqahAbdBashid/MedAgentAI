"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleLogin = async () => {

        setLoading(true);
        setError("");

        const { error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        if (error) {

            setError(error.message);
            setLoading(false);

            return;
        }

        router.push("/dashboard");
    };

    return (

        <main className="
            min-h-screen bg-medical
            flex items-center justify-center
            px-6
        ">

            <div className="
                w-full max-w-md
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-700
                rounded-2xl shadow-lg
                p-8
            ">

                {/* TITLE */}

                <div className="text-center mb-8">

                    <h1 className="
                        text-3xl font-bold
                        text-red-600
                    ">
                        Admin Login
                    </h1>

                    <p className="
                        mt-2
                        text-gray-700 dark:text-gray-300
                    ">
                        Access MedAgent AI Dashboard
                    </p>


                </div>

                {/* FORM */}

                <div className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="
                            w-full border rounded-xl px-4 py-3
                            text-gray-900 dark:text-white
                            bg-white dark:bg-gray-800
                            border-gray-300 dark:border-gray-700
                        "
                    />
                    <p
                        className="
        text-xs mt-0 text-center

        text-gray-500 dark:text-gray-400
    "
                    >
                        Demo Email: medagentai.admin@gmail.com
                    </p>

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="
                            w-full border rounded-xl px-4 py-3
                            text-gray-900 dark:text-white
                            bg-white dark:bg-gray-800
                            border-gray-300 dark:border-gray-700
                        "
                    />
                    <p
                        className="
        text-xs mt-0 text-center

        text-gray-500 dark:text-gray-400
    "
                    >
                        Demo Password: admin123
                    </p>

                    {error && (

                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="
                            w-full bg-red-600 hover:bg-red-700
                            transition text-white
                            py-3 rounded-xl font-medium
                        "
                    >

                        {loading
                            ? "Signing in..."
                            : "Login"
                        }

                    </button>

                </div>
                <div className="mt-3 text-center">

                    <Link
                        href="/"
                        className="
            text-sm

            text-red-600 hover:text-red-700

            transition
        "
                    >
                        ← Back to Home
                    </Link>

                </div>
            </div>


        </main>
    );
}