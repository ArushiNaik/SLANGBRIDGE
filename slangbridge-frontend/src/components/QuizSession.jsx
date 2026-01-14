import { useState, useEffect } from "react";
import { getQuizSession, checkQuizAnswer } from "../api/slangApi";

export default function QuizSession() {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        start();
    }, []);

    async function start() {
        const session = await getQuizSession(10);
        setQuestions(session.questions);
        setCurrent(0);
        setScore(0);
        setFinished(false);
    }

    async function answer(option) {
        const q = questions[current];
        const res = await checkQuizAnswer(q.term, option);
        if (res.correct) setScore(s => s + 1);

        if (current + 1 === questions.length) {
            setFinished(true);
        } else {
            setCurrent(c => c + 1);
        }
    }

    if (finished) {
        return (
            <div>
                <h2>Finished!</h2>
                <p>Score: {score}/{questions.length}</p>
                <button onClick={start}>Restart</button>
            </div>
        );
    }

    if (!questions.length) return <p>Loading...</p>;

    const q = questions[current];

    return (
        <div>
            <h2>{q.term}</h2>
            {q.options.map((opt, i) => (
                <button key={i} onClick={() => answer(opt)}>
                    {opt}
                </button>
            ))}
            <p>{current + 1}/{questions.length}</p>
        </div>
    );
}
