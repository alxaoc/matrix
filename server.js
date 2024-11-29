// Завантажуємо змінні середовища з файлу .env
require('dotenv').config();

// Імпортуємо необхідні модулі
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

// Створюємо сервер
const app = express();

// Налаштовуємо CORS для роботи з фронтендом
app.use(cors({
    origin: 'http://localhost:63342', // Замість цього вказуємо точний URL вашого фронтенду
    methods: ['GET', 'POST'], // Дозволяємо методи GET і POST
    allowedHeaders: ['Content-Type'], // Дозволяємо тільки Content-Type
    credentials: true, // Якщо ви використовуєте куки або інші credentials
}));

// Парсимо JSON з тіла запиту
app.use(express.json());

// Перевірка на наявність API ключа
if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY is missing!');
    process.exit(1);  // Завершуємо програму, якщо немає ключа
}

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

        // Перевірка на порожнє повідомлення
        if (!userMessage) {
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log('Received message:', userMessage);

        // Відправка запиту до OpenAI API
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Вибір моделі ChatGPT
            messages: [{ role: 'user', content: userMessage }],
        });

        console.log('Reply from OpenAI:', chatCompletion.choices[0].message.content); // Лог для діагностики

        // Відправка відповіді назад на клієнт
        res.json({ reply: chatCompletion.choices[0].message.content });

    } catch (error) {
        console.error('Error during OpenAI API call:', error.message); // Покажемо точну помилку
        res.status(500).json({ error: 'Something went wrong, please try again' });
    }
});

// Налаштовуємо сервер на прослуховування на порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});