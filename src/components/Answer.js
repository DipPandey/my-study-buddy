export default function Answer({ answer }) {
    return (
        <div className="mt-4">
            {answer && (
                <>
                    <h2 className="text-xl font-semibold">Answer:</h2>
                    <p>{answer}</p>
                </>
            )}
        </div>
    );
}
