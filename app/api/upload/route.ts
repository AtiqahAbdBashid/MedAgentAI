import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

import csv from "csv-parser";

import { Readable } from "stream";

export async function POST(req: Request) {

    try {

        const formData = await req.formData();

        const file = formData.get("file") as File;

        if (!file) {

            return NextResponse.json(
                {
                    error: "No file uploaded"
                },
                {
                    status: 400
                }
            );
        }

        const buffer = Buffer.from(
            await file.arrayBuffer()
        );

        const records: any[] = [];

        await new Promise((resolve, reject) => {

            const stream = Readable.from(buffer);

            stream
                .pipe(csv())

                .on("data", (data) => {

                    records.push({

                        age: Number(data.age),

                        gender: data.gender,

                        bmi: Number(data.bmi),

                        smoking: data.smoking,

                        alcohol: data.alcohol,

                        exercise: data.exercise,

                        diabetes: data.diabetes,

                        blood_pressure: Number(
                            data.blood_pressure
                        ),

                        cholesterol: Number(
                            data.cholesterol
                        ),

                        region: data.region,
                    });
                })

                .on("end", resolve)

                .on("error", reject);
        });

        /* =========================================
           CLEAR OLD DATASET
        ========================================= */

        await supabase
            .from("population_records")
            .delete()
            .neq("id", 0);

        /* =========================================
           INSERT NEW DATASET
        ========================================= */

        const { error } = await supabase
            .from("population_records")
            .insert(records);

        if (error) {

            console.error(error);

            return NextResponse.json(
                {
                    error: error.message
                },
                {
                    status: 500
                }
            );
        }

        return NextResponse.json({

            success: true,

            inserted_records: records.length,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                error: "Upload failed"
            },
            {
                status: 500
            }
        );
    }
}