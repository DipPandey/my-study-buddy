import { useState } from 'react';

export default function Quiz({ quizQuestions }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswerSelect = (questionIndex, selectedOption) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: selectedOption,
        });
    };

    const handleSubmitQuiz = () => {
        setShowResults(true);
    };

    if (!quizQuestions || quizQuestions.length === 0) {
        return <div>No quiz available. Please generate a quiz first.</div>;
    }

    return (
        <div className="quiz-container">
            <h2 className="quiz-title">Your Quiz</h2>
            <ul className="quiz-questions">
                {quizQuestions.map((question, index) => (
                    <li key={index} className="quiz-question">
                        <p>{question.question}</p>
                        <ul className="quiz-options">
                            {question.options.map((option, idx) => (
                                <li key={idx}>
                                    <button
                                        className={`quiz-option ${selectedAnswers[index] === option ? 'selected' : ''
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
            <button onClick={handleSubmitQuiz} className="submit-button">
                Submit Quiz
            </button>
            {showResults && (
                <div className="quiz-results">
                    <h3>Results</h3>
                    {quizQuestions.map((question, index) => (
                        <div key={index}>
                            <p>{question.question}</p>
                            <p>Your Answer: {selectedAnswers[index]}</p>
                            <p>
                                Correct Answer: <strong>{question.correctAnswer}</strong>
                            </p>
                            {selectedAnswers[index] === question.correctAnswer ? (
                                <p className="correct">Correct!</p>
                            ) : (
                                <p className="incorrect">Incorrect</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
