export default function QuestionInput({ question, setQuestion, fetchAnswer }) {
    return (
        <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded shadow-md">
            <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded"
                placeholder="Type your question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={fetchAnswer}
            >
                Ask
            </button>
        </div>
    );
}
