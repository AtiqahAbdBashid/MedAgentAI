import { supabase } from "@/lib/supabase";

export async function runRiskAnalysisAgent() {

    /* =========================================
       FETCH POPULATION DATA
    ========================================= */

    const { data, error } = await supabase

        .from("population_records")

        .select("*");

    if (error) {

        throw new Error(error.message);
    }

    if (!data || data.length === 0) {

        return {

            total_population: 0,

            high_percentage: 0,
            medium_percentage: 0,
            low_percentage: 0,

            high_count: 0,
            medium_count: 0,
            low_count: 0,
        };
    }

    /* =========================================
       RISK CLASSIFICATION
    ========================================= */

    let high = 0;
    let medium = 0;
    let low = 0;

    for (const person of data) {

        let score = 0;

        /* BMI */

        if (person.bmi >= 30) {

            score += 3;

        } else if (person.bmi >= 25) {

            score += 2;
        }

        /* SMOKING */

        if (person.smoking === "yes") {

            score += 2;
        }

        /* DIABETES */

        if (person.diabetes === "yes") {

            score += 3;
        }

        /* BLOOD PRESSURE */

        if (person.blood_pressure >= 140) {

            score += 2;

        } else if (person.blood_pressure >= 120) {

            score += 1;
        }

        /* CHOLESTEROL */

        if (person.cholesterol >= 240) {

            score += 2;

        } else if (person.cholesterol >= 200) {

            score += 1;
        }

        /* EXERCISE */

        if (person.exercise === "low") {

            score += 2;

        } else if (person.exercise === "medium") {

            score += 1;
        }

        /* AGE */

        if (person.age >= 60) {

            score += 2;

        } else if (person.age >= 40) {

            score += 1;
        }

        /* FINAL CLASSIFICATION */

        if (score >= 8) {

            high++;

        } else if (score >= 4) {

            medium++;

        } else {

            low++;
        }
    }

    /* =========================================
       CALCULATE PERCENTAGES
    ========================================= */

    const total = data.length;

    return {

        total_population: total,

        high_count: high,
        medium_count: medium,
        low_count: low,

        high_percentage:
            (high / total) * 100,

        medium_percentage:
            (medium / total) * 100,

        low_percentage:
            (low / total) * 100,
    };
}