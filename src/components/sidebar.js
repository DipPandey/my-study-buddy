export default function Sidebar() {
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">AI Study Buddy</h2>
            <nav>
                <ul>
                    <li className="mb-2"><a href="#" className="hover:text-gray-300">Home</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-gray-300">Ask a Question</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-gray-300">Generate Quiz</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-gray-300">Resources</a></li>
                </ul>
            </nav>
        </div>
    );
}
