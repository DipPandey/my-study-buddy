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
    const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

    const fetchAnswer = async () => {
        setIsLoadingAnswer(true);
        try {
            const response = await fetch('/api/answer-question', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });
            const data = await response.json();
            setAnswer(data.answer);
        } catch (error) {
            console.error('Error fetching answer:', error);
        } finally {
            setIsLoadingAnswer(false);
        }
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
        } catch (error) {
            console.error('Error fetching resources:', error);
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
            if (data.error) {
                console.error('API error:', data.error);
            } else {
                setQuizQuestions(data.questions ?? []);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoadingQuiz(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-900 text-black-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6 flex flex-col h-full overflow-y-auto">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-400">AI-Powered Quiz Buddy</h1>

                {/* Side-by-Side Sections with Independent Scrolls */}
                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 flex-grow">

                    {/* Ask & Learn Section */}
                    <div className="flex flex-col space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex-1 overflow-y-auto max-h-screen">
                        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Ask & Learn</h2>
                        <QuestionInput
                            question={question}
                            setQuestion={setQuestion}
                            fetchAnswer={handleFetch}
                            isLoading={isLoadingAnswer}
                        />
                        {answer && (
                            <div className="mt-4">
                                <Answer answer={answer} />
                            </div>
                        )}
                        {resources.length > 0 && (
                            <div className="mt-4">
                                <Resources resources={resources} isLoadingResources={isLoadingResources} />
                            </div>
                        )}
                    </div>

                    {/* Generate Quiz Section */}
                    <div className="flex flex-col space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex-1 overflow-y-auto max-h-screen">
                        <h2 className="text-2xl font-semibold text-green-300 mb-4">Generate Quiz</h2>
                        <Quiz
                            quizQuestions={quizQuestions}
                            setQuizQuestions={setQuizQuestions}
                            topic={question}
                            generateQuiz={generateQuiz}
                            isLoadingQuiz={isLoadingQuiz}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
