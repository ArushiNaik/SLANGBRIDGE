import axios from "axios";

const API_URL = "http://localhost:8080/api/slangs";

export const getSlang = async (term) => {
    const response = await axios.get(`${API_URL}/${term}`);
    return response.data;
};

export const getRandomSlang = async () => {
    const response = await axios.get(API_URL);
    const all = response.data;
    return all[Math.floor(Math.random() * all.length)];
};

export async function getAutocomplete(prefix) {
    const res = await fetch(`http://localhost:8080/api/slangs/autocomplete?prefix=${prefix}`);
    if (!res.ok) throw new Error("Failed to fetch autocomplete");
    return await res.json();
}

// slangApi.js
export async function checkQuizAnswer(term, selectedOption) {
    const res = await fetch(`/api/slangs/quiz/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term, selectedOption })
    });
    return await res.json();
}
export async function getQuizSession(size = 10) {
    const res = await fetch(`/api/slangs/quiz/session?size=${size}`);
    return await res.json();
}
const BASE_URL = "http://localhost:8080/api/quiz"; // update if your backend runs elsewhere

export async function getQuizQuestion() {
    const res = await fetch(`${BASE_URL}/multiple-choice`);
    if (!res.ok) throw new Error("Failed to fetch quiz question");
    return res.json();
}



