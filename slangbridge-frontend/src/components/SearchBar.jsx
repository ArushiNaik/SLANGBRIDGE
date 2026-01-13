import { useState, useEffect } from "react";
import { debounce } from "lodash";

export default function SearchBar({ value, onChange, onSearch, onRandom }) {
    const [suggestions, setSuggestions] = useState([]);

    // Debounced fetch for autocomplete
    const fetchSuggestions = debounce(async (prefix) => {
        if (!prefix.trim()) return setSuggestions([]);
        try {
            const res = await fetch(`/api/slang/autocomplete?prefix=${prefix}`);
            const data = await res.json();
            setSuggestions(data);
        } catch (err) {
            console.error(err);
            setSuggestions([]);
        }
    }, 300);

    // Trigger suggestions fetch on input change
    useEffect(() => {
        fetchSuggestions(value);
    }, [value]);

    const handleSelect = (term) => {
        onChange(term);
        setSuggestions([]);
    };

    return (
        <div className="search-box" style={{ position: "relative" }}>
            <input
                type="text"
                placeholder="Type a slang word (e.g. cooked, rizz)"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button onClick={onSearch}>Search</button>
            <button className="secondary" onClick={onRandom}>
                Random
            </button>

            {suggestions.length > 0 && (
                <ul
                    className="suggestions"
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "white",
                        border: "1px solid #ccc",
                        zIndex: 10,
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    {suggestions.map((s) => (
                        <li
                            key={s}
                            onClick={() => handleSelect(s)}
                            style={{ padding: "5px 10px", cursor: "pointer" }}
                        >
                            {s}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
