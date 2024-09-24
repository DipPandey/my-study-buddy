import { useEffect, useState } from 'react';

export default function Answer({ answer }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (answer) {
            setIsVisible(true);
        }
    }, [answer]);

    // Function to format the answer into bullet points if needed
    const formatAnswer = (text) => {
        // Split answer by newlines to create bullet points
        const lines = text.split('\n').filter(line => line.trim() !== '');
        return lines.map((line, index) => (
            <li key={index} className="mb-2">
                {line}
            </li>
        ));
    };

    return (
        <div className={`bg-gray-800 p-6 rounded-lg shadow-md mt-4 transition-all duration-300 transform ${isVisible ? 'scale-100' : 'scale-95'}`}>
            {answer && (
                <div className="flex space-x-4 items-start">
                    <div className="bg-indigo-500 p-3 rounded-l-lg shadow text-white font-bold">
                        Study Buddy:
                    </div>
                    <div className="bg-white text-gray-800 p-4 rounded-r-lg shadow-md flex-grow">
                        <ul className="list-disc pl-6">
                            {formatAnswer(answer)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
