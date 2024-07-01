import { useState } from 'react';
import QuestionInput from '../components/QuestionInput';
import Answer from '../components/Answer';
import Quiz from '../components/Quiz';
import Resources from '../components/Resources';

export default function Home() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [resources, setResources] = useState([]);

    const fetchAnswer = async () => {
        const response = await fetch('/api/answer-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });
        const data = await response.json();
        setAnswer(data.answer);
        setResources(data.resources);
    };

    const generateQuiz = async () => {
        const response = await fetch('/api/generate-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: question }),
        });
        const data = await response.json();
        setQuizQuestions(data.questions);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">AI-Powered Study Buddy</h1>
            <QuestionInput question={question} setQuestion={setQuestion} fetchAnswer={fetchAnswer} />
            <Answer answer={answer} />
            <Resources resources={resources} />
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={generateQuiz}>
                Generate Practice Quiz
            </button>
            <Quiz quizQuestions={quizQuestions} />
        </div>
    );
}
