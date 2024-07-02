import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { topic } = req.body;

    try {
        console.log(`Received topic: ${topic}`);

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: `Generate a quiz with questions and options on the topic: ${topic}` }],
        });

        const rawResponse = chatCompletion.choices[0].message.content;
        console.log('Raw GPT-4 response:', rawResponse); // Log the raw response for debugging

        // Ensure the response is valid JSON
        let questions;
        try {
            // Attempt to fix common JSON issues
            const fixedResponse = rawResponse.replace(/(\d+)\.(\d+)\.(\d+)/g, '$1.$2$3');
            questions = JSON.parse(fixedResponse);
        } catch (jsonError) {
            console.error('Failed to parse JSON:', jsonError);
            return res.status(500).json({ error: 'Failed to parse quiz data. Please try again later.' });
        }

        console.log('Parsed questions:', questions); // Log the parsed questions for debugging
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate quiz. Please try again later.' });
    }
}
