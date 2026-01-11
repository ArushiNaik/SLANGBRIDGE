export default function SearchBar({ value, onChange, onSearch, onRandom }) {
    return (
        <div className="search-box">
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
        </div>
    );
}
