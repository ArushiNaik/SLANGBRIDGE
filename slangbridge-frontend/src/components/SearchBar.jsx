import { useState, useEffect, useRef } from "react";
import { getAutocomplete } from "../api/slangApi";

export default function SearchBar({ value = "", onChange, onSearch, onRandom }) {
    const [suggestions, setSuggestions] = useState([]);
    const wrapperRef = useRef(null);

    // Close suggestions if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch autocomplete suggestions
    useEffect(() => {
        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const data = await getAutocomplete(value);
                if (Array.isArray(data)) setSuggestions(data);
                else setSuggestions([]);
            } catch (err) {
                console.error("Autocomplete error:", err);
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [value]);

    const handleSelect = (term) => {
        onChange(term);
        setSuggestions([]);
        onSearch();
    };

    return (
        <div className="search-box" ref={wrapperRef} style={{ position: "relative" }}>
            <input
                type="text"
                placeholder="Type a slang word (e.g. cooked, rizz)"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="off"
            />
            <button onClick={onSearch}>Search</button>
            <button className="secondary" onClick={onRandom}>
                Random
            </button>

            {suggestions.length > 0 && (
                <ul className="autocomplete-list">
                    {suggestions.map((term, index) => (
                        <li key={index} onClick={() => handleSelect(term)}>
                            {term}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
