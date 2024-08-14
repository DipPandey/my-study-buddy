export default function QuestionInput({ question, setQuestion, fetchAnswer, isLoading }) {
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
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
                onClick={fetchAnswer}
                disabled={isLoading}
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                ) : (
                    'Ask'
                )}
            </button>
        </div>
    );
}
