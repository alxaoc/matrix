document.addEventListener('DOMContentLoaded', function() {
    // Перевірка на наявність елементів
    const terminalOutput = document.getElementById('output');
    const terminalInput = document.getElementById('input');

    // Якщо елементи не знайдені, зупиняємо виконання скрипта
    if (!terminalOutput || !terminalInput) {
        console.error('Required elements (output, input) not found!');
        return;
    }

    // Функція для додавання тексту до терміналу
    function addLine(text) {
        const line = document.createElement('div');
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Прокрутка вниз
    }

    // Додаємо порожній рядок, щоб опустити текст
    addLine("");  // Порожній рядок для відступу
    // Додаємо повідомлення про доступні команди
    addLine("Type the command 'help' to see a list of available commands.");

    // Симуляція затримки
    function simulateDelay(callback, delay = 500) {
        setTimeout(callback, delay);
    }

    // Команди
    const commands = {
        help: () => `
Available commands:
- help: Show this help message
- echo [text]: Print the text
- clear: Clear the terminal
- time: Show current time
- date: Show current date
- about: Learn about this terminal
- man [command]: Show manual for a command
- joke: Tell a random joke
- roll [max]: Roll a random number between 1 and max
- math [expression]: Calculate a math expression
- uname: Display system information
- whoami: Show the current user
- ls: List available commands
        `,
        echo: (args) => args.join(' '),
        clear: () => { terminalOutput.innerHTML = ''; },
        time: () => new Date().toLocaleTimeString(),
        date: () => new Date().toLocaleDateString(),
        about: () => `
This is a simple terminal simulator built with HTML, CSS, and JavaScript.
Author: Your Name
Version: 1.0
        `,
        man: (args) => {
            const command = args[0];
            if (command && commands[command]) {
                return `Manual for "${command}":\n${commands[command].description || "No description available."}`;
            }
            return "Please specify a valid command to view its manual.";
        },
        joke: () => {
            const jokes = [
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "Why don’t skeletons fight each other? They don’t have the guts.",
                "I told my computer I needed a break, and now it won't stop sending me Kit-Kats!"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        },
        roll: (args) => {
            const max = parseInt(args[0], 10) || 6;
            return `Rolled: ${Math.floor(Math.random() * max) + 1}`;
        },
        math: (args) => {
            try {
                const expression = args.join(' ');
                const result = eval(expression); // Використовується eval, будьте обережні.
                return `Result: ${result}`;
            } catch (err) {
                return "Invalid math expression.";
            }
        },
        uname: () => "Terminal Simulator v1.0 (Browser-based)",
        whoami: () => "guest",
        ls: () => Object.keys(commands).join('  '),
    };

    // Обробка введення
    function executeCommand(input) {
        const [command, ...args] = input.trim().split(' ');

        if (commands[command]) {
            const result = commands[command](args); // Викликаємо функцію, що відповідає команді
            simulateDelay(() => addLine(result), 500);
        } else {
            simulateDelay(() => addLine(`Unknown command: ${command}`), 500);
        }
    }

    // Обробка подій
    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const inputText = terminalInput.value.trim();

            if (inputText) {
                addLine(`> ${inputText}`);
                executeCommand(inputText); // Виконання команди
                terminalInput.value = ''; // Очищення поля вводу
            }
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = history[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                terminalInput.value = history[historyIndex];
            } else {
                terminalInput.value = '';
            }
        }
    });
});