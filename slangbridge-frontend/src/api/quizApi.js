const BASE_URL = "http://localhost:8080/api/quiz"; // adjust if your backend runs elsewhere

// Fetch a single multiple-choice question
export async function getQuizQuestion() {
    const res = await fetch(`${BASE_URL}/multiple-choice`);
    if (!res.ok) throw new Error("Failed to fetch quiz question");
    return res.json(); // returns { prompt, correctAnswer, options }
}

// Fetch a quiz session with multiple questions
export async function getQuizSession(size = 5) {
    const res = await fetch(`${BASE_URL}/session?size=${size}`);
    if (!res.ok) throw new Error("Failed to fetch quiz session");
    return res.json(); // returns { questions: [...], size }
}

// Check a quiz answer (if you implement a POST endpoint)
export async function checkQuizAnswer(term, selectedOption) {
    const res = await fetch(`${BASE_URL}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term, selectedOption }),
    });

    if (!res.ok) throw new Error("Failed to check answer");
    return res.json(); // returns { correct: true/false, correctAnswer: "..." }
}
