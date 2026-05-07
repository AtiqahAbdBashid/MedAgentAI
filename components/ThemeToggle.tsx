"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {

    const [dark, setDark] = useState(false);

    // INITIAL LOAD
    useEffect(() => {

        const savedTheme =
            localStorage.getItem("theme");

        if (savedTheme === "dark") {

            document.documentElement.classList.add("dark");
            setDark(true);

        } else {

            document.documentElement.classList.remove("dark");
            setDark(false);

        }

    }, []);

    // TOGGLE
    const toggleTheme = () => {

        if (dark) {

            document.documentElement.classList.remove("dark");

            localStorage.setItem("theme", "light");

            setDark(false);

        } else {

            document.documentElement.classList.add("dark");

            localStorage.setItem("theme", "dark");

            setDark(true);
        }
    };

    return (

        <button
            onClick={toggleTheme}
            className="
    h-9 w-9

    rounded-lg

    flex items-center justify-center

    transition

    bg-white/80 dark:bg-gray-900/70

    border border-gray-200
    dark:border-gray-700

    hover:scale-105
"
        >
            {dark ? "☀️" : "🌙"}
        </button>
    );
}