// slangApi.js
import axios from "axios";

const BASE = "http://localhost:8080/api/slangs";

// ---- Slang endpoints ----
export const getSlang = async (term) => {
    const response = await axios.get(`${BASE}/${term}`);
    return response.data;
};

export const getRandomSlang = async () => {
    const response = await axios.get(BASE);
    const all = response.data;
    return all[Math.floor(Math.random() * all.length)];
};

export async function getAutocomplete(prefix) {
    const res = await fetch(`${BASE}/autocomplete?prefix=${prefix}`);
    if (!res.ok) throw new Error("Failed to fetch autocomplete");
    return await res.json();
}

// ---- QUIZ endpoints: Option B ----
export async function getQuizSession(size = 10) {
    const res = await fetch(`${BASE}/quiz/session?size=${size}`);
    const json = await res.json();
    return json; // expected { questions: [...] }
}

export async function checkQuizAnswer(term, selectedOption) {
    const res = await fetch(`${BASE}/quiz/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term, selectedOption })
    });
    return await res.json(); // expected { correct: boolean }
}
