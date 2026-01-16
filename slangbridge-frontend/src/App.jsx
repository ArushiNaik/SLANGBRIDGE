import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import MatchingGame from "./pages/MatchingGame";
import { getSlang, getRandomSlang } from "./api/slangApi";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SlangCard from "./components/SlangCard";
import Footer from "./components/Footer";
import QuizSession from "./components/QuizSession";

function App() {
    const [term, setTerm] = useState("");
    const [slang, setSlang] = useState(null);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {
        document.body.className = darkMode ? "dark" : "";
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const search = async () => {
        if (!term.trim()) return;
        try {
            const data = await getSlang(term);
            setSlang(data);
            setError("");
        } catch {
            setError("Sorry, that slang word was not found.");
            setSlang(null);
        }
    };

    const random = async () => {
        const data = await getRandomSlang();
        setSlang(data);
        setTerm(data.term);
        setError("");
    };

    return (
        <div className="app">
            <Header
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode(!darkMode)}
            />

            <nav className="nav-header">
                <Link to="/" className="btn-header">Search</Link>
                <Link to="/matching" className="btn-header">
                    Matching Terms Game
                </Link>
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <SearchBar
                                value={term}
                                onChange={setTerm}
                                onSearch={search}
                                onRandom={random}
                            />

                            {error && <p className="error">{error}</p>}
                            <SlangCard slang={slang} />

                            <QuizSession />
                        </>
                    }
                />

                <Route path="/matching" element={<MatchingGame />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
