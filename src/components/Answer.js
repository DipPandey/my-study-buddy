import { useEffect, useState } from 'react';

export default function Answer({ answer }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (answer) {
            setIsVisible(true);
        }
    }, [answer]);

    // Function to format the answer into bullet points
    const formatAnswer = (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        return lines.map((line, index) => (
            <li key={index} className="mb-2 p-2 text-gray-800">
                {line}
            </li>
        ));
    };

    return (
        <div className={`bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-lg mt-4 transition-all duration-300 transform ${isVisible ? 'scale-100' : 'scale-95'}`}>
            {answer && (
                <div className="flex items-start">
                    <div className="bg-indigo-600 p-3 rounded-l-lg shadow-lg text-white font-bold text-lg">
                        Study Buddy:
                    </div>
                    <div className="bg-gray-100 text-gray-800 p-5 rounded-r-lg shadow-md flex-grow">
                        <ul className="list-disc pl-6 space-y-3 text-base">
                            {formatAnswer(answer)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
