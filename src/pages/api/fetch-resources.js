import openai from '../../utils/openai';
import fetch from 'node-fetch'; // Node.js fetch to validate links

// Helper function to check if a URL is working
async function validateURL(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok; // Returns true if the link is valid
    } catch (error) {
        return false; // If fetch fails, the URL is invalid
    }
}

export default async function handler(req, res) {
    const { topic } = req.body;

    try {
        // Step 1: Generate resources using OpenAI
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'user',
                    content: `Provide 5 recommended online resources (real, working websites) for studying the following topic: "${topic}". These should include well-known, reliable sources like .edu, .gov, .org, or reputable .com websites. Format the response as a list of titles and links, like this:
                    1. Resource title: <Title>, Link: <URL>`
                }
            ],
            max_tokens: 700,
        });

        const rawResources = response.choices[0].message.content;
        console.log('Raw GPT-4 response:', rawResources); // Log the raw response for debugging

        // Step 2: Parse the resources
        const resources = rawResources.split('\n')
            .filter(line => line.includes('http'))
            .map((line, index) => {
                const parts = line.split('Link: ');
                if (parts.length === 2) {
                    return { title: parts[0].trim(), link: parts[1].trim() };
                } else {
                    return { title: `Resource ${index + 1}`, link: line.trim().match(/(https?:\/\/[^\s]+)/g)[0] };
                }
            });

        // Step 3: Validate the links
        const validatedResources = [];
        for (const resource of resources) {
            const isValid = await validateURL(resource.link);
            if (isValid) {
                validatedResources.push(resource); // Only include if the link is valid
            }
        }

        // Step 4: Return the validated resources
        console.log('Validated resources:', validatedResources); // Log the validated resources
        res.status(200).json({ resources: validatedResources });
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ error: 'Failed to fetch resources. Please try again later.' });
    }
}
