export default function SlangCard({slang}){
    if(!slang) return null;

    return (
        <div className="card">
            <h2>{slang.term}</h2>
            <p><strong>Definition: </strong>{slang.definition}</p>
            <p><strong>Example:</strong> {slang.example}</p>
        </div>
    );
}