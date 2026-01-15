import { useEffect, useState } from "react";
import { getQuizSession, checkQuizAnswer } from "../api/quizApi";

export default function QuizSession({ size = 5 }) {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [finished, setFinished] = useState(false);

    // 1️⃣ Move startSession above useEffect
    async function startSession() {
        try {
            const session = await getQuizSession(size);
            setQuestions(session.questions);
            setCurrent(0);
            setScore(0);
            setSelected(null);
            setFeedback("");
            setFinished(false);
        } catch (err) {
            console.error(err);
        }
    }

    // 2️⃣ Now safely call it in useEffect
    useEffect(() => {
        // defer execution to avoid synchronous setState
        const id = requestAnimationFrame(() => {
            startSession();
        });

        return () => cancelAnimationFrame(id); // cleanup
    }, []);

    async function handleAnswer(option) {
        setSelected(option);

        try {
            const q = questions[current];
            const res = await checkQuizAnswer(q.prompt, option);
            if (res.correct) setScore(s => s + 1);

            setFeedback(res.correct
                ? "✅ Correct!"
                : `❌ Wrong! Correct: ${res.correctAnswer}`);
        } catch (err) {
            console.error(err);
            setFeedback("❌ Error checking answer");
        }

        setTimeout(() => {
            if (current + 1 < questions.length) {
                setCurrent(c => c + 1);
                setSelected(null);
                setFeedback("");
            } else {
                setFinished(true);
            }
        }, 5000);
    }

    if (finished) {
        return (
            <div className="quiz-card">
                <h2>🎉 Quiz Finished!</h2>
                <p>Your Score: {score} / {questions.length}</p>
                <button onClick={startSession}>Restart</button>
            </div>
        );
    }

    if (!questions.length) return <p>Loading quiz...</p>;

    const q = questions[current];

    return (
        <div className="quiz-card">
            <h2>Question {current + 1} / {questions.length}</h2>
            <p>What does <strong>{q.prompt}</strong> mean?</p>
            <ul>
                {q.options.map((opt, idx) => (
                    <li key={idx}>
                        <button
                            disabled={!!selected}
                            onClick={() => handleAnswer(opt)}
                            style={{
                                backgroundColor: selected === opt
                                    ? opt === q.correctAnswer ? "green" : "red"
                                    : "",
                            }}
                        >
                            {opt}
                        </button>
                    </li>
                ))}
            </ul>
            {feedback && <p className="feedback">{feedback}</p>}
        </div>
    );
}
