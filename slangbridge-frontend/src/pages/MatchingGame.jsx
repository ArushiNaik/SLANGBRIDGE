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

    const [matched, setMatched] = useState(new Set());
    const [wrong, setWrong] = useState(null);

    const [roundComplete, setRoundComplete] = useState(false);
    const [score, setScore] = useState(0); // <-- restored

    function initializeRound(data) {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const chunk = shuffled.slice(0, 8);

        const t = chunk.map(s => ({
            id: s.id,
            term: s.term,
            example: s.example,
            matchId: s.id
        }));

        const d = chunk
            .map(s => ({
                id: s.id,
                definition: s.definition,
                matchTermId: s.id
            }))
            .sort(() => Math.random() - 0.5);

        setTerms(t);
        setDefs(d);
        setSelectedTerm(null);
        setMatched(new Set());
        setWrong(null);
        setRoundComplete(false);
        setScore(0); // reset score for new round
    }

    useEffect(() => {
        let active = true;

        async function load() {
            try {
                const data = await getAllSlang();
                if (!active) return;

                setSlangList(data);
                initializeRound(data);
                setLoading(false);
            } catch {
                if (active) {
                    setError("Failed to load slang terms.");
                    setLoading(false);
                }
            }
        }

        load();
        return () => { active = false };
    }, []);

    function handleTermClick(id) {
        if (matched.has(id) || roundComplete) return;
        setSelectedTerm(id);
    }

    function handleDefClick(defId) {
        if (!selectedTerm || roundComplete) return;

        const term = terms.find(t => t.id === selectedTerm);

        if (term.matchId === defId) {
            setMatched(prev => {
                const newSet = new Set([...prev, term.id]);

                setScore(prevScore => prevScore + 1);

                if (newSet.size === terms.length) {
                    setRoundComplete(true);
                }
                return newSet;
            });

            setSelectedTerm(null);
            setWrong(null);

        } else {
            setWrong({ termId: term.id, defId });
            setTimeout(() => setWrong(null), 900);
        }
    }

    if (loading) return <div>Loading game...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="matching-game-container">
            <h2>Matching Terms Game</h2>
            <p>Loaded {slangList.length} total slang terms</p>
            <div className="score">Score: {score} / {terms.length}</div>

            {roundComplete && (
                <div className="round-complete-banner">
                    <h3>Round Complete! 🎉</h3>
                    <button onClick={() => initializeRound(slangList)}>
                        Next Round
                    </button>
                </div>
            )}

            <div className={`matching-grid ${roundComplete ? "disabled" : ""}`}>
                <div className="terms-column">
                    <h3>Terms</h3>
                    {terms.map(t => (
                        <div
                            key={t.id}
                            className={[
                                "item",
                                "term-item",
                                matched.has(t.id) && "correct",
                                wrong?.termId === t.id && "wrong",
                                selectedTerm === t.id && !matched.has(t.id) && "selected"
                            ].filter(Boolean).join(" ")}
                            onClick={() => handleTermClick(t.id)}
                        >
                            {t.term}
                        </div>
                    ))}
                </div>

                <div className="defs-column">
                    <h3>Definitions</h3>
                    {defs.map(d => (
                        <div
                            key={d.id}
                            className={[
                                "item",
                                "def-item",
                                matched.has(d.matchTermId) && "correct",
                                wrong?.defId === d.id && "wrong"
                            ].filter(Boolean).join(" ")}
                            onClick={() => handleDefClick(d.id)}
                        >
                            {d.definition}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
