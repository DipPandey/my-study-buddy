import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { question } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: `Provide an answer and recommend resources for the following question: ${question}` }],
        });

        const rawAnswer = response.choices[0].message.content;
        const [answer, ...resourceLines] = rawAnswer.split('\n');

        const resources = resourceLines
            .filter(line => line.includes('http'))
            .map((line, index) => ({ title: `Resource ${index + 1}`, link: line.trim() }));

        res.status(200).json({ answer, resources });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get answer and resources. Please try again later.' });
    }
}
