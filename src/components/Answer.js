export default function Answer({ answer }) {
    return (
        <div className="mt-6 flex justify-center">
            {answer && (
                <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-900">Answer</h2>
                    <p className="text-lg text-gray-700">{answer}</p>
                </div>
            )}
        </div>
    );
}
