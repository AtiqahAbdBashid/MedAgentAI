"use client";

import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import PulseBackground from "@/components/PulseBackground";
import PublicHealthForm from "@/components/PublicHealthForm";

export default function Home() {

  return (

    <main className="relative min-h-screen bg-medical overflow-hidden">

      {/* Background */}
      <PulseBackground />

      {/* Content */}
      <div className="relative z-10">

        {/* HEADER */}
        <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">

          {/* LEFT */}
          <div>

            <h1 className="text-7xl font-bold text-red-600">
              MedAgent AI
            </h1>

            <p className="text-xl mt-1 text-gray-800 dark:text-gray-300">
              AI-powered Public Health Intelligence System
            </p>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <ThemeToggle />

            <Link
              href="/login"
              className="
                bg-red-600 hover:bg-red-700
                transition text-white
                px-5 py-2 rounded-xl shadow-sm
              "
            >
              Admin Login
            </Link>

          </div>

        </header>

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 py-12">

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* LEFT SIDE */}
            <div>

              {/* TAG */}
              <p
                className="
                  text-sm uppercase tracking-[0.2em]
                  text-red-600 font-semibold mb-4
                "
              >
                Population Health Intelligence
              </p>

              {/* TITLE */}
              <h2
                style={{ color: "black" }}
                className="
    text-3xl lg:text-4xl
    font-bold leading-tight
    dark:!text-white
  "
              >
                AI-driven healthcare risk analysis and intervention planning.
              </h2>

              {/* DESCRIPTION */}
              <p
                style={{ color: "#111827" }}
                className="
    mt-6 text-base leading-relaxed
    dark:!text-gray-300
  "
              >

                MedAgent AI helps analyze population health risks,
                simulate healthcare interventions,
                and support data-driven public health decisions.

              </p>

              {/* FEATURES */}
              <div className="grid sm:grid-cols-2 gap-4 mt-10">

                <FeatureCard
                  title="Risk Prediction"
                  desc="Analyze health risk trends across populations."
                />

                <FeatureCard
                  title="Intervention Planning"
                  desc="Simulate prevention strategies and healthcare response."
                />

                <FeatureCard
                  title="Regional Analytics"
                  desc="Identify priority regions requiring healthcare attention."
                />

                <FeatureCard
                  title="Health Screening"
                  desc="Generate personalized health risk reports instantly."
                />

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div>

              <PublicHealthForm />

            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer
          className="
            max-w-6xl mx-auto
            px-6 py-8
            text-center text-sm
            text-gray-700 dark:text-gray-400
          "
        >

          MedAgent AI • Healthcare Intelligence Prototype by Technity

        </footer>

      </div>

    </main>
  );
}

/* FEATURE CARD */

function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {

  return (

    <div
      className="
        p-5 rounded-2xl
        border shadow-sm backdrop-blur

        bg-white/90 dark:bg-gray-900/70

        border-gray-200 dark:border-gray-700
      "
    >

      {/* TITLE */}
      <h3
        className="
          font-semibold
          text-gray-950 dark:text-white
        "
      >
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p
        className="
          text-sm mt-2 leading-relaxed
          text-gray-900 dark:text-gray-300
        "
      >
        {desc}
      </p>

    </div>
  );
}