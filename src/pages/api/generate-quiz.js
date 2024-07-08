import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { topic } = req.body;

    try {
        console.log(`Received topic: ${topic}`);

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: `Generate a quiz with questions, options, and correct answers on the topic: ${topic}. Format the response as a JSON array of objects with 'question', 'options', and 'correctAnswer' keys.` }],
        });

        const rawResponse = chatCompletion.choices[0].message.content;
        console.log(`Raw response: ${rawResponse}`);

        // Check if rawResponse is undefined or empty
        if (!rawResponse) {
            console.error('Error: Received an empty response from OpenAI.');
            return res.status(500).json({ error: 'Received an empty response from OpenAI.' });
        }

        // Ensure the response is valid JSON
        let formattedResponse;
        try {
            // Attempt to fix common JSON issues
            const formattedString = rawResponse.trim().replace(/```json|```/g, '');
            formattedResponse = JSON.parse(formattedString);
        } catch (error) {
            console.error('Failed to parse response:', error);
            return res.status(500).json({ error: 'Failed to parse quiz data. Please try again later.' });
        }

        res.status(200).json({ questions: formattedResponse });
    } catch (error) {
        console.error('Error generating quiz:', error.message);
        res.status(500).json({ error: 'Failed to generate quiz. Please try again later.' });
    }
}
