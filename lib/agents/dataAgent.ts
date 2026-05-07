import fs from "fs";
import path from "path";
import csv from "csv-parser";

export async function runDataAgent() {

    return new Promise((resolve, reject) => {

        const results: any[] = [];

        const filePath = path.join(
            process.cwd(),
            "data",
            "population.csv"
        );

        fs.createReadStream(filePath)

            .pipe(csv())

            .on("data", (data) => {

                results.push({

                    age: Number(data.age),

                    bmi: Number(data.bmi),

                    smoking: data.smoking,

                    exercise: data.exercise,

                    diabetes: data.diabetes,

                    blood_pressure: Number(data.blood_pressure),

                    cholesterol: Number(data.cholesterol),

                    region: data.region,
                });

            })

            .on("end", () => {
                const averageBMI =

                    results.reduce(
                        (sum, person) => sum + person.bmi,
                        0
                    ) / results.length;

                const smokingCount = results.filter(
                    (person) => person.smoking === "yes"
                ).length;

                const diabetesCount = results.filter(
                    (person) => person.diabetes === "yes"
                ).length;

                resolve({

                    records: results,

                    summary: {

                        total_population: results.length,

                        average_bmi: averageBMI,

                        smoking_percentage:
                            (smokingCount / results.length) * 100,

                        diabetes_percentage:
                            (diabetesCount / results.length) * 100,
                    },
                });

            })

            .on("error", (error) => {

                reject(error);

            });

    });
}