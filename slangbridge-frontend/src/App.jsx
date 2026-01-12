import { useEffect, useState } from "react";
import { getSlang, getRandomSlang } from "./api/slangApi";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SlangCard from "./components/SlangCard";
import Footer from "./components/Footer";

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
            setError("---------------------------------------------------------------------------Sorry, that slang word was not found.-----------------------------------------------------------------------------------");
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

            <SearchBar
                value={term}
                onChange={setTerm}
                onSearch={search}
                onRandom={random}
            />

            {error && <p className="error">{error}</p>}
            <SlangCard slang={slang} />

            <Footer />
        </div>
    );
}

export default App;
