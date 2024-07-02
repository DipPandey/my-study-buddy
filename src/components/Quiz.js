import { useState, useEffect } from 'react';

export default function Quiz({ quizQuestions }) {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [feedback, setFeedback] = useState({});

    const handleOptionSelect = (questionIndex, option) => {
        setSelectedOptions(prev => ({
            ...prev,
            [questionIndex]: option,
        }));

        const isCorrect = quizQuestions[questionIndex].correctAnswer === option;
        setFeedback(prev => ({
            ...prev,
            [questionIndex]: isCorrect ? 'Correct!' : 'Incorrect, try again!',
        }));
    };

    if (!quizQuestions || quizQuestions.length === 0) {
        return <div className="mt-4">No quiz questions generated.</div>;
    }

    return (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Generated Quiz:</h2>
            <ul className="list-decimal ml-4">
                {quizQuestions.map((question, index) => (
                    <li key={index} className="mb-4">
                        <p className="font-semibold">{question.question}</p>
                        <ul className="list-disc ml-6">
                            {question.options.map((option, idx) => (
                                <li key={idx}>
                                    <button
                                        className={`text-gray-800 px-2 py-1 rounded ${selectedOptions[index] === option ? 'bg-blue-300' : 'bg-white'}`}
                                        onClick={() => handleOptionSelect(index, option)}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {feedback[index] && <p className="mt-2 text-green-500">{feedback[index]}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
