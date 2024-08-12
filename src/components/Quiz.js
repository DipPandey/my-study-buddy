import { useState } from 'react';

export default function Quiz() {
    const [topic, setTopic] = useState('');
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState(null);

    const generateQuiz = async () => {
        setShowResults(false); // Reset the quiz results when generating a new quiz
        setSelectedAnswers({});
        setQuizQuestions([]);
        try {
            const response = await fetch('/api/generate-quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic }),
            });

            const data = await response.json();

            if (response.ok) {
                setQuizQuestions(data.questions);
                setError(null);
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Error fetching quiz:', error);
            setError('Failed to fetch quiz. Please try again later.');
        }
    };

    const handleAnswerSelect = (questionIndex, selectedOption) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedOption,
        }));
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Quiz Generator</h1>
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a quiz topic"
                className="p-2 border rounded mb-4 w-full max-w-md"
            />
            <button
                onClick={generateQuiz}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Generate Quiz
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {quizQuestions.length > 0 && (
                <div className="mt-6 w-full max-w-2xl">
                    <h2 className="text-xl font-semibold mb-4">Quiz on "{topic}"</h2>
                    <ul className="space-y-6">
                        {quizQuestions.map((question, index) => (
                            <li key={index} className="bg-white p-4 rounded shadow">
                                <p className="font-medium">{question.question}</p>
                                <ul className="mt-2 space-y-2">
                                    {question.options.map((option, idx) => (
                                        <li key={idx}>
                                            <button
                                                className={`w-full text-left p-2 border rounded hover:bg-gray-100 transition ${selectedAnswers[index] === option ? 'bg-blue-100 border-blue-500' : ''
                                                    }`}
                                                onClick={() => handleAnswerSelect(index, option)}
                                            >
                                                {option}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={handleSubmit}
                        className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Submit Quiz
                    </button>

                    {showResults && (
                        <div className="mt-6 bg-gray-50 p-6 rounded shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Results</h3>
                            {quizQuestions.map((question, index) => (
                                <div key={index} className="mb-6">
                                    <p className="font-medium text-lg">{question.question}</p>
                                    <div className="mt-2 p-4 border rounded bg-white">
                                        <p>
                                            <span className="font-semibold">Your Answer:</span> {selectedAnswers[index]}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Correct Answer:</span> <span className="text-green-600">{question.correctAnswer}</span>
                                        </p>
                                        {selectedAnswers[index] === question.correctAnswer ? (
                                            <p className="mt-2 text-green-600 font-semibold">Correct! ??</p>
                                        ) : (
                                            <p className="mt-2 text-red-600 font-semibold">Incorrect ??</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
