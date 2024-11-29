// Функція для відправки запиту до сервера
async function sendMessage() {
    const inputField = document.getElementById('userInput'); // Поле введення
    const message = inputField.value.trim(); // Отримання тексту
    const chatWindow = document.querySelector('.chat-window'); // Вікно чату

    if (!message) {
        return; // Не відправляти порожні повідомлення
    }

    // Додати повідомлення користувача до чату
    addMessageToChat('user', message);

    // Очистити поле вводу
    inputField.value = '';

    // Відобразити "думання" модератора
    addMessageToChat('moderator', 'Модератор думає...');

    try {
        // Відправка повідомлення на сервер
        const response = await fetch('http://localhost:3000/chat', { // Оновлено маршрут
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Помилка на сервері');
        }

        const data = await response.json();
        const reply = data.response || 'Модератор не зміг відповісти'; // Зміна на 'response'

        // Додати відповідь модератора до чату
        addMessageToChat('moderator', reply);
    } catch (error) {
        console.error('Помилка:', error);
        addMessageToChat('moderator', 'Виникла помилка. Спробуйте ще раз.');
    }
}

// Додавання повідомлення до чату
function addMessageToChat(sender, text) {
    const chatWindow = document.querySelector('.chat-window'); // Вікно чату
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = text;

    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Прокрутка до останнього повідомлення
}

// Додаємо перше повідомлення в чат при завантаженні сторінки
window.addEventListener('DOMContentLoaded', () => {
    addMessageToChat('moderator', "Ask your question, S.T.A.L.K.E.R., and I’ll be happy to help you.");
});

// Обробка події натискання кнопки "Відправити"
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Обробка події натискання Enter у полі вводу
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Запобігає стандартній поведінці
        sendMessage();
    }
});