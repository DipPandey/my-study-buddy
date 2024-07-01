import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { topic } = req.body;
    try {
        console.log(`Received topic: ${topic}`);

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `Generate a quiz with questions, options, and correct answers on the topic: ${topic}. Format the response as a JSON array of objects with 'question', 'options', and 'correctAnswer' keys.` }],
        });

        const rawResponse = chatCompletion.choices[0].message.content;
        console.log(`Raw response: ${rawResponse}`);

        // Check if rawResponse is undefined or empty
        if (!rawResponse) {
            return res.status(500).json({ error: 'Received an empty response from OpenAI.' });
        }

        // Try parsing the raw response to ensure it's valid JSON
        let formattedResponse;
        try {
            formattedResponse = JSON.parse(rawResponse);
        } catch (error) {
            console.error('Failed to parse response:', error);
            return res.status(500).json({ error: 'Failed to parse quiz data. Please try again later.' });
        }

        res.status(200).json({ questions: formattedResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate quiz. Please try again later.' });
    }
}
