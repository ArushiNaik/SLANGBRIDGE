import { useState, useEffect, useCallback } from "react";
import { getQuizQuestion } from "../api/quizApi";

export default function Quiz() {
    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState("");
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [finished, setFinished] = useState(false);
    const totalQuestions = 5;

    const loadQuestion = useCallback(async () => {
        try {
            const q = await getQuizQuestion();
            setQuestion(q);
            setSelected("");
            setFeedback("");
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        if (questionNumber <= totalQuestions) {
            // safely load next question
            requestAnimationFrame(loadQuestion);
        } else {
            // defer setFinished to avoid ESLint warning
            requestAnimationFrame(() => setFinished(true));
        }
    }, [questionNumber, totalQuestions, loadQuestion]);


    const handleAnswer = (option) => {
        setSelected(option);

        if (option === question.correctAnswer) {
            setFeedback("✅ Correct!");
            setScore(s => s + 1);
        } else {
            setFeedback(`❌ Wrong! Correct: ${question.correctAnswer}`);
        }

        setTimeout(() => {
            setQuestionNumber(n => n + 1);
        }, 900); // small delay for feedback
    };

    if (finished) {
        return (
            <div className="quiz-card">
                <h2>Quiz Finished!</h2>
                <p>Your Score: {score}/{totalQuestions}</p>
                <button onClick={() => {
                    setScore(0);
                    setQuestionNumber(1);
                    setFinished(false);
                }}>
                    Restart
                </button>
            </div>
        );
    }

    if (!question) return <p>Loading question...</p>;

    return (
        <div className="quiz-card">
            <h2>Question {questionNumber}/{totalQuestions}</h2>
            <p>What is the meaning of: <strong>{question.prompt}</strong>?</p>
            <ul>
                {question.options.map((opt, idx) => (
                    <li key={idx}>
                        <button onClick={() => handleAnswer(opt)} disabled={!!selected}>
                            {opt}
                        </button>
                    </li>
                ))}
            </ul>
            {feedback && <p className="feedback">{feedback}</p>}
        </div>
    );
}
