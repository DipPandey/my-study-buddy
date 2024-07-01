export default function Quiz({ quizQuestions }) {
    return (
        <div className="mt-4">
            {quizQuestions.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold">Practice Quiz:</h2>
                    <ul>
                        {quizQuestions.map((quizQuestion, index) => (
                            <li key={index}>
                                <p>{quizQuestion.question}</p>
                                {quizQuestion.options.map((option, i) => (
                                    <label key={i}>
                                        <input type="radio" name={`question-${index}`} value={option} />
                                        {option}
                                    </label>
                                ))}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
