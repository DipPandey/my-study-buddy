import openai from '../../utils/openai';

export default async function handler(req, res) {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required.' });
    }

    try {
        // Generate the quiz using OpenAI
        const response = await openai.chat.completions.create({
            model: 'gpt-4', // You can use 'gpt-3.5-turbo' if 'gpt-4' is not available
            messages: [
                {
                    role: 'user',
                    content: `Create a quiz with 5 multiple-choice questions on the topic: "${topic}". Format the response in JSON format with the following structure:
                    [
                        {
                            "question": "What is the capital of France?",
                            "options": ["Paris", "London", "Berlin", "Madrid"],
                            "correctAnswer": "Paris"
                        },
                        {
                            "question": "What is 2 + 2?",
                            "options": ["3", "4", "5", "6"],
                            "correctAnswer": "4"
                        }
                    ]`
                },
            ],
            max_tokens: 600,
            temperature: 0.8,
        });

        const rawQuiz = response.choices[0].message.content.trim();
        console.log('Raw GPT-4 response:', rawQuiz); // Log the raw response for debugging

        // Parse the JSON response
        const questions = JSON.parse(rawQuiz);
        console.log('Parsed quiz questions:', questions); // Log the parsed quiz questions for debugging

        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error generating quiz:', error);
        res.status(500).json({ error: 'Failed to generate quiz. Please try again later.' });
    }
}
