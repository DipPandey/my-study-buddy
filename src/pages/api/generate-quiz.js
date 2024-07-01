import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { topic } = req.body;
    try {
        console.log(`Received topic: ${topic}`);

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `Generate a quiz with questions, options, and correct answers on the topic: ${topic}` }],
        });

        const rawResponse = chatCompletion.choices[0].message.content;
        console.log(`Raw response: ${rawResponse}`);

        // Check if rawResponse is undefined or empty
        if (!rawResponse) {
            return res.status(500).json({ error: 'Received an empty response from OpenAI.' });
        }

        

        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate quiz. Please try again later.' });
    }
}
