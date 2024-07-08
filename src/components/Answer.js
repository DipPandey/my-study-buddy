import { useEffect, useState } from 'react';

export default function Answer({ answer }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (answer) {
            setIsVisible(true);
        }
    }, [answer]);

    return (
        <div className={`bg-gray-800 p-4 rounded shadow-md mt-4 transition-transform transform ${isVisible ? 'scale-100' : 'scale-95'}`}>
            {answer && (
                <div className="flex space-x-2 items-start">
                    <div className="bg-gray-600 p-3 rounded-l-md shadow">
                        <strong>AI:</strong>
                    </div>
                    <div className="bg-blue-300 p-3 rounded-r-md flex-grow shadow-md">
                        {answer}
                    </div>
                </div>
            )}
        </div>
    );
}
