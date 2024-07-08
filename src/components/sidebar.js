export default function Sidebar() {
    return (
        <div className="bg-gray-900 text-white w-64 min-h-screen p-6">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold mb-2">AI Quiz Buddy</h2>
                <p className="text-gray-400">Developed using OpenAI API, React and customized generations</p>
            </div>
            <nav>
                <ul>
                    <li className="mb-4">
                        <a href="dip-portfolio-website.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.08 12.08 0 0 1 0 6.844L12 14zM12 14l-6.16 3.422a12.08 12.08 0 0 1 0-6.844L12 14z"></path>
                            </svg>
                            Dip's Portfolio
                        </a>
                    </li>
                    
                    
               
                </ul>
            </nav>
            <div className="mt-8">
                <p className="text-gray-400">Developed by Dip Pandey</p>
                <a href="dip-portfolio-website.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    dip-portfolio-website.vercel.app
                </a>
            </div>
        </div>
    );
}
