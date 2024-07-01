import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const { question } = req.body;
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Answer the following question and provide resources for further reading: ${question}`,
        max_tokens: 150,
    });
    const answer = response.data.choices[0].text.trim();

    // Simulated resources
    const resources = [
        { title: 'Resource 1', link: 'https://example.com/resource1' },
        { title: 'Resource 2', link: 'https://example.com/resource2' },
    ];

    res.status(200).json({ answer, resources });
}
