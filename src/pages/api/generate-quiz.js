import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { topic } = req.body;
    try {
        console.log(`Received topic: ${topic}`);

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{
                role: 'user',
                content: `Generate a quiz with questions, options, and correct answers on the topic: ${topic}. Format the response as a list of questions and options, and provide the correct answer for each question. Example format:
                Q1: What is the capital of France?
                Options: Paris, London, Berlin, Madrid
                Answer: Paris

                Q2: What is 2 + 2?
                Options: 3, 4, 5, 6
                Answer: 4`
            }],
            max_tokens: 1000,
            temperature: 0.7,
            n: 1
        });

        const rawResponse = chatCompletion.data.choices[0].message.content;
        console.log(`Raw response: ${rawResponse}`);

        if (!rawResponse) {
            return res.status(500).json({ error: 'Received an empty response from OpenAI.' });
        }

        const questions = rawResponse.split('\n\n').map((block) => {
            const [questionPart, optionsPart, answerPart] = block.split('\n');
            const question = questionPart.replace(/^Q\d+: /, '').trim();
            const options = optionsPart.replace(/^Options: /, '').split(',').map(opt => opt.trim());
            const correctAnswer = answerPart.replace(/^Answer: /, '').trim();
            return { question, options, correctAnswer };
        });

        console.log('Parsed questions:', questions);
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to generate quiz. Please try again later.' });
    }
}
