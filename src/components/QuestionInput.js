export default function QuestionInput({ question, setQuestion, fetchAnswer }) {
    return (
        <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Ask a Question</label>
            <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
                onClick={fetchAnswer}
            >
                Get Answer
            </button>
        </div>
    );
}
