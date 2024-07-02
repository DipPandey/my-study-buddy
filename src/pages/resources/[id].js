import { useRouter } from 'next/router';

// Sample resources. In practice, you should fetch these dynamically.
const resources = [
    { title: 'Example Resource 1', link: 'https://example.com/1' },
    { title: 'Example Resource 2', link: 'https://example.com/2' },
    // Add more resources here
];

export default function ResourcePage() {
    const router = useRouter();
    const { id } = router.query;
    const resource = resources[id];

    if (!resource) {
        return <p>Resource not found</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {resource.link}
            </a>
        </div>
    );
}
