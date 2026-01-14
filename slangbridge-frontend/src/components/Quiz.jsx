import { useEffect, useState } from "react";
import { getQuizQuestion } from "../api/quizApi";

export default function Quiz() {
    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState("");
    const [feedback, setFeedback] = useState("");

    const fetchQuestion = async () => {
        try {
            const data = await getQuizQuestion();
            setQuestion(data);
            setSelected("");
            setFeedback("");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, []);

    const handleAnswer = (option) => {
        setSelected(option);
        if (option === question.correctAnswer) {
            setFeedback("✅ Correct!");
        } else {
            setFeedback(`❌ Wrong! Correct: ${question.correctAnswer}`);
        }
    };

    if (!question) return <p>Loading quiz...</p>;

    return (
        <div className="quiz-card">
            <h2>What is the meaning of: <strong>{question.prompt}</strong>?</h2>
            <ul>
                {question.options.map((opt, idx) => (
                    <li key={idx}>
                        <button
                            onClick={() => handleAnswer(opt)}
                            disabled={!!selected}
                        >
                            {opt}
                        </button>
                    </li>
                ))}
            </ul>
            {feedback && <p className="feedback">{feedback}</p>}
            <button onClick={fetchQuestion} style={{ marginTop: "10px" }}>
                Next Question
            </button>
        </div>
    );
}
