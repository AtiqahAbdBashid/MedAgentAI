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
            className={`
                px-4 py-2 rounded-xl border transition-all duration-300 shadow-sm
                ${dark
                    ? "bg-white text-black border-white hover:bg-gray-200"
                    : "bg-gray-900 text-white border-gray-900 hover:bg-black"
                }
            `}
        >
            {dark ? "Light Mode" : "Dark Mode"}
        </button>
    );
}