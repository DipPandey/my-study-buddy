export default function Sidebar() {
    return (
        <div className="bg-gray-900 text-white w-64 min-h-screen p-6">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold mb-2">AI Quiz Buddy</h2>
                <p className="text-gray-400">Your personal AI-powered Quiz buddy</p>
            </div>
            <nav>
                <ul>
                    <li className="mb-4">
                        <a href="#index" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18"></path>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-6M12 4v2m0 10v6m-6-6h6m0 0h6"></path>
                            </svg>
                            Ask a Question
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 10l-7 7-7-7"></path>
                            </svg>
                            Generate Quiz
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18m-6 5H6"></path>
                            </svg>
                            Resources
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
