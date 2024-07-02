import { useState } from 'react';
import QuestionInput from '../components/QuestionInput';
import Answer from '../components/Answer';
import Quiz from '../components/Quiz';
import Resources from '../components/Resources';
import Sidebar from '../components/sidebar';

export default function Home() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [resources, setResources] = useState([]);

    const fetchAnswer = async () => {
        const response = await fetch('/api/answer-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question }),
        });
        const data = await response.json();
        setAnswer(data.answer);
    };

    const fetchResources = async () => {
        const response = await fetch('/api/fetch-resources', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: question }),
        });
        const data = await response.json();
        setResources(data.resources ?? []);
    };

    const handleFetch = async () => {
        await fetchAnswer();
        await fetchResources();
    };

    const generateQuiz = async () => {
        const response = await fetch('/api/generate-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: question }),
        });
        const data = await response.json();
        console.log('Generated quiz questions:', data.questions);
        setQuizQuestions(data.questions ?? []);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4 flex flex-col h-screen">
                <h1 className="text-2xl font-bold mb-4">AI-Powered Quiz Buddy</h1>
                <div className="flex flex-col space-y-4 flex-grow overflow-y-auto">
                    <div className="flex flex-col space-y-2">
                        <QuestionInput question={question} setQuestion={setQuestion} fetchAnswer={handleFetch} />
                        <Answer answer={answer} />
                        <Resources resources={resources} />
                        <div className="flex space-x-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={fetchResources}>
                                Generate Resources
                            </button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={generateQuiz}>
                                Quiz ME
                            </button>
                        </div>
                    </div>
                    <Quiz quizQuestions={quizQuestions} />
                </div>
            </div>
        </div>
    );
}
