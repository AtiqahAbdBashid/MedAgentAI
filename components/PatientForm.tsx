"use client";

import { useState } from "react";

export default function PatientForm() {
    const [form, setForm] = useState({
        age: 30,
        height: 170,
        weight: 70,
        smoking: "no",
        exercise: "yes",
        sugar: "medium",
        bloodPressure: "normal"
    });

    const submit = async () => {
        const res = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        console.log(data);
    };

    return (
        <div className="space-y-2">
            <input placeholder="Age" onChange={e => setForm({ ...form, age: +e.target.value })} />
            <button onClick={submit}>Submit</button>
        </div>
    );
}