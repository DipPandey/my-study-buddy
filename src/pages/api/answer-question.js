import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { question } = req.body;

    try {
        // Fetch only the detailed answer
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'user',
                    content: `Provide a detailed and comprehensive answer in bullet points easily readable to user for the following question: "${question}". Include important facts, explanations, and examples in bullets.`
                }
            ],
            max_tokens: 700, // Adjusted for a detailed answer
            temperature: 0.7
        });

        const answer = response.choices[0].message.content.trim();
        console.log('Generated Answer:', answer); // Debugging output

        // Return just the answer
        res.status(200).json({ answer });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get the answer. Please try again later.' });
    }
}
