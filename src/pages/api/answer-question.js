import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { question } = req.body;
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }],
        });
        const answer = chatCompletion.choices[0].message.content;
        res.status(200).json({ answer });
    } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 429) {
            res.status(429).json({ error: 'You have exceeded your usage quota. Please check your OpenAI plan and billing details.' });
        } else {
            res.status(500).json({ error: 'Failed to fetch the answer. Please try again later.' });
        }
    }
}
