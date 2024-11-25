// Завантажуємо змінні середовища з файлу .env
require('dotenv').config();

// Імпортуємо необхідні модулі
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

// Створюємо сервер
const app = express();

// Налаштовуємо CORS
app.use(cors());

// Парсимо JSON з тіла запиту
app.use(express.json());

// Ініціалізація OpenAI клієнта за допомогою API ключа
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Отримуємо ключ з змінних середовища
});

// Створення простого маршруту для тесту
app.get('/', (req, res) => {
    res.send('Welcome to the Cyber Stalker Moderator API');
});

// Маршрут для отримання відповіді від ChatGPT
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        // Відправка запиту до OpenAI API
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Вибір моделі ChatGPT
            messages: [{ role: 'user', content: userMessage }],
        });

        // Відправка відповіді назад на клієнт
        const message = chatCompletion.choices[0].message.content;
        res.json({ response: message });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong, please try again' });
    }
});

// Налаштовуємо сервер на прослуховування на порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});