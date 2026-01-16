import React, { useEffect, useState } from "react";
import { getAllSlang } from "../api/slangApi.js";
import "./matching-game.css";

export default function MatchingGame() {
    const [slangList, setSlangList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [terms, setTerms] = useState([]);
    const [defs, setDefs] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [score, setScore] = useState(0);

    function initializeRound(data) {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const chunk = shuffled.slice(0, 8);

        const t = chunk.map(s => ({ id: s.id, term: s.term, example: s.example }));
        const d = chunk
            .map(s => ({ id: s.id, definition: s.definition }))
            .sort(() => Math.random() - 0.5);

        setTerms(t);
        setDefs(d);
        setSelectedTerm(null);
        setScore(0);
    }

    useEffect(() => {
        let isMounted = true;

        async function load() {
            try {
                const data = await getAllSlang();
                if (!isMounted) return;

                setSlangList(data);
                initializeRound(data);
                setLoading(false);
            } catch {
                if (isMounted) {
                    setError("Failed to load slang terms.");
                    setLoading(false);
                }
            }
        }

        load();
        return () => { isMounted = false; };
    }, []);

    function handleTermClick(id) {
        setSelectedTerm(id);
    }

    function handleDefClick(defId) {
        if (!selectedTerm) return;

        if (defId === selectedTerm) {
            setScore(prev => prev + 1);
        } else {
            const termObj = terms.find(t => t.id === selectedTerm);
            alert(`Try again.\nHint: ${termObj.example || "No hint available."}`);
        }

        setSelectedTerm(null);
    }

    if (loading) return <div>Loading game...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="matching-game-container">
            <h2>Matching Terms Game</h2>
            <p>Loaded {slangList.length} total slang terms</p>
            <div className="score">Score: {score}</div>

            <div className="matching-grid">
                <div className="terms-column">
                    {terms.map(t => (
                        <div
                            key={t.id}
                            className={`item term-item ${selectedTerm === t.id ? "selected" : ""}`}
                            onClick={() => handleTermClick(t.id)}
                        >
                            {t.term}
                        </div>
                    ))}
                </div>

                <div className="defs-column">
                    {defs.map(d => (
                        <div
                            key={d.id}
                            className="item def-item"
                            onClick={() => handleDefClick(d.id)}
                        >
                            {d.definition}
                        </div>
                    ))}
                </div>
            </div>


            <button onClick={() => initializeRound(slangList)}>
                New Round
            </button>
        </div>
    );
}
