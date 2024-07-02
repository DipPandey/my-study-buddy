export default function Answer({ answer }) {
    return (
        <div className="bg-white p-4 rounded shadow-md mt-4">
            {answer && (
                <div className="flex space-x-2">
                    <div className="bg-gray-200 p-3 rounded-l-md">
                        <strong>AI:</strong>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-r-md flex-grow">
                        {answer}
                    </div>
                </div>
            )}
        </div>
    );
}
