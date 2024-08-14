import { useState } from 'react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Toggle Button for Mobile */}
            <button
                className="md:hidden p-2 bg-gray-800 text-white fixed top-4 left-4 z-50 rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Close Menu' : 'Open Menu'}
            </button>

            {/* Sidebar */}
            <div className={`bg-gray-900 text-white w-64 min-h-screen p-6 md:w-48 md:p-4 sm:w-40 sm:p-3 fixed md:relative z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold mb-2 sm:text-2xl">AI Quiz Buddy</h2>
                    <p className="text-gray-400 text-sm sm:text-xs">Developed using OpenAI API, React and customized generations</p>
                </div>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <a href="https://dip-portfolio-website.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
                                <svg className="w-5 h-5 mr-3 sm:w-4 sm:h-4 sm:mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.08 12.08 0 0 1 0 6.844L12 14zM12 14l-6.16 3.422a12.08 12.08 0 0 1 0-6.844L12 14z"></path>
                                </svg>
                                <span className="sm:text-sm">Dip Portfolio</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="mt-8">
                    <p className="text-gray-400 text-sm sm:text-xs">Developed by Dip Pandey</p>
                    <a href="https://dip-portfolio-website.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline sm:text-xs">
                        dip-portfolio-website.vercel.app
                    </a>
                </div>
            </div>
        </>
    );
}
