import { useEffect, useState } from 'react';

export default function Resources({ resources, isLoadingResources }) {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4">
            {isLoadingResources ? (
                <div className="flex justify-center items-center">
                    <div className="loader">Loading...</div>
                </div>
            ) : (
                <>
                    {resources?.length > 0 ? (
                        <>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommended Resources:</h2>
                            <ul className="space-y-4">
                                {resources.map((resource, index) => (
                                    <li key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <a
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                                        >
                                            <h3 className="font-bold text-lg">{resource.title}</h3>
                                            <p className="text-sm break-all">{resource.link}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="text-gray-600">No resources found. Please enter a topic to see recommendations.</p>
                    )}
                </>
            )}
        </div>
    );
}
