import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const { topic } = req.body;
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Generate a quiz with questions and options on the topic: ${topic}`,
        max_tokens: 200,
    });
    const questions = JSON.parse(response.data.choices[0].text.trim());

    res.status(200).json({ questions });
}
