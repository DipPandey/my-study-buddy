import { useEffect, useState } from 'react';

export default function Resources({ resources, isLoadingResources }) {
    return (
        <div className="bg-white p-4 rounded shadow-md mt-4">
            {isLoadingResources ? (
                <div className="flex justify-center items-center">
                    <div className="loader">Loading...</div>
                </div>
            ) : (
                resources?.length > 0 && (
                    <>
                        <h2 className="text-xl font-semibold mb-2">Recommended Resources:</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map((resource, index) => (
                                <a
                                    key={index}
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border p-4 rounded hover:shadow-lg transition-shadow duration-300 block"
                                >
                                    <li className="flex flex-col text-blue-500 hover:underline">
                                        <h3 className="font-bold">{resource.title}</h3>
                                        <p>{resource.link}</p>
                                    </li>
                                </a>
                            ))}
                        </ul>
                    </>
                )
            )}
        </div>
    );
}
