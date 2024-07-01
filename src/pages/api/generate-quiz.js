import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { topic } = req.body;
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `Generate a quiz with questions and options on the topic: ${topic}` }],
        });

        const rawResponse = chatCompletion.choices[0].message.content;

        // Ensure the response is valid JSON
        let questions;
        try {
            questions = JSON.parse(rawResponse);
        } catch (jsonError) {
            console.error('Failed to parse JSON:', jsonError);
            return res.status(500).json({ error: 'Failed to parse quiz data. Please try again later.' });
        }

        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate quiz. Please try again later.' });
    }
}
