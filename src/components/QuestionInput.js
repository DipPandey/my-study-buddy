export default function QuestionInput({ question, setQuestion, fetchAnswer }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium">Ask a Question</label>
            <input
                type="text"
                className="mt-1 block w-full"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={fetchAnswer}>
                Get Answer
            </button>
        </div>
    );
}
