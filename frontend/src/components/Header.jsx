export default function Header({ darkMode, toggleDarkMode }) {
    return (
        <header className="header">
            <div className="header-row">
                <h1>SlangBridge</h1>
                <button className="toggle" onClick={toggleDarkMode}>
                    {darkMode ? "🌙 Dark": " ☀ Light"}
                </button>
            </div>
            <p>Helping you understand modern slang — simply.</p>
        </header>
    );
}
