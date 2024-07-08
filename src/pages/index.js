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
    const [isLoadingResources, setIsLoadingResources] = useState(false);
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

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
        setIsLoadingResources(true);
        try {
            const response = await fetch('/api/fetch-resources', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: question }),
            });
            const data = await response.json();
            setResources(data.resources ?? []);
        } finally {
            setIsLoadingResources(false);
        }
    };

    const handleFetch = async () => {
        await fetchAnswer();
        await fetchResources();
    };

    const generateQuiz = async () => {
        setIsLoadingQuiz(true);
        try {
            const response = await fetch('/api/generate-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: question }),
            });

            const data = await response.json();
            console.log('API response:', data);
            if (data.error) {
                console.error('API error:', data.error);
            } else {
                console.log('Generated quiz questions:', data.questions);
                setQuizQuestions(data.questions ?? []);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoadingQuiz(false);
        }
    };

    return (
        <div className="flex bg-gray-900 text-blue min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6 flex flex-col h-screen">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">AI-Powered Quiz Buddy</h1>
                <div className="flex flex-col space-y-6 flex-grow overflow-y-auto">
                    <div className="flex flex-col space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
                        <QuestionInput question={question} setQuestion={setQuestion} fetchAnswer={handleFetch} />
                        <Answer answer={answer} />
                        <Resources resources={resources} isLoadingResources={isLoadingResources} />
                        <div className="flex space-x-4">
                            <button
                                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transform hover:scale-105 transition duration-300"
                                onClick={fetchResources}
                                disabled={isLoadingResources}
                            >
                                {isLoadingResources ? 'Generating Resources...' : 'Generate Resources'}
                            </button>
                            <button
                                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transform hover:scale-105 transition duration-300"
                                onClick={generateQuiz}
                                disabled={isLoadingQuiz}
                            >
                                {isLoadingQuiz ? 'Generating Quiz...' : 'Generate Practice Quiz'}
                            </button>
                        </div>
                    </div>
                    {isLoadingQuiz ? (
                        <div className="flex justify-center items-center">
                            <div className="loader">Loading...</div>
                        </div>
                    ) : (
                        <Quiz quizQuestions={quizQuestions} />
                    )}
                </div>
            </div>
        </div>
    );
}
