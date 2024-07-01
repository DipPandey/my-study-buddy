export default function Resources({ resources }) {
    return (
        <div className="mt-4">
            {resources.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold">Recommended Resources:</h2>
                    <ul>
                        {resources.map((resource, index) => (
                            <li key={index}>
                                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                    {resource.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
