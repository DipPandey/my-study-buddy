import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { topic } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: `Provide recommended online resources (articles, websites, etc.) for studying the following topic: ${topic}` }],
            max_tokens: 150,
        });

        const rawResources = response.choices[0].message.content;
        console.log('Raw GPT-4 response:', rawResources); // Log the raw response for debugging

        const resources = rawResources.split('\n')
            .filter(line => line.includes('http'))
            .map((line, index) => {
                const parts = line.split('Website: ');
                if (parts.length === 2) {
                    return { title: parts[0].trim(), link: parts[1].trim() };
                } else {
                    return { title: `Resource ${index + 1}`, link: line.trim().match(/(https?:\/\/[^\s]+)/g)[0] };
                }
            });

        console.log('Parsed resources:', resources); // Log the parsed resources for debugging
        res.status(200).json({ resources });
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ error: 'Failed to fetch resources. Please try again later.' });
    }
}
