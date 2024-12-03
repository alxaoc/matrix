// terminal.js

// Вибір елементів
const terminalOutput = document.getElementById('output');
const terminalInput = document.getElementById('input');

// Історія команд
let history = [];
let historyIndex = -1;

// Симуляція затримки
function simulateDelay(callback, delay = 500) {
    setTimeout(callback, delay);
}

// Команди
const commands = {
    help: {
        description: "Show this help message",
        action: () => {
            const availableCommands = Object.keys(commands)
                .map(cmd => `- ${cmd}: ${commands[cmd].description}`)
                .join('\n');
            return `
Available commands:
${availableCommands}
            `;
        }
    },
    echo: {
        description: "Print the text",
        action: (args) => args.join(' ')
    },
    clear: {
        description: "Clear the terminal",
        action: () => {
            terminalOutput.innerHTML = '';
            return ''; // Повертаємо пустий рядок, щоб уникнути undefined
        }
    },
    time: {
        description: "Show current time",
        action: () => new Date().toLocaleTimeString()
    },
    date: {
        description: "Show current date",
        action: () => new Date().toLocaleDateString()
    },
    about: {
        description: "Learn about this terminal",
        action: () => `
This is a simple terminal simulator built with HTML, CSS, and JavaScript.
Author: Alex MoToR
Version: 1.0
        `
    },
    man: {
        description: "Show manual for a command",
        action: (args) => {
            const command = args[0];
            if (command && commands[command]) {
                return `Manual for "${command}":\n${commands[command].description}`;
            }
            return "Please specify a valid command to view its manual.";
        }
    },
    joke: {
        description: "Tell a random joke",
        action: () => {
            const jokes = [
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "Why don’t skeletons fight each other? They don’t have the guts.",
                "I told my computer I needed a break, and now it won't stop sending me Kit-Kats!",
                "Why was the math book sad? It had too many problems.",
                "What do you call fake spaghetti? An impasta!",
                "Why can’t your nose be 12 inches long? Because then it would be a foot.",
                "What did the grape do when it got stepped on? Nothing but let out a little wine.",
                "Why don’t eggs tell jokes? They’d crack each other up.",
                "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
                "What do you call cheese that isn't yours? Nacho cheese.",
                "Why did the coffee file a police report? It got mugged.",
                "I told my wife she was drawing her eyebrows too high. She looked surprised!"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
    },
    roll: {
        description: "Roll a random number between 1 and max",
        action: (args) => {
            const max = parseInt(args[0], 10) || 6;
            return `Rolled: ${Math.floor(Math.random() * max) + 1}`;
        }
    },
    math: {
        description: "Calculate a math expression",
        action: (args) => {
            try {
                const expression = args.join(' ');
                const result = eval(expression); // Використовується eval, будьте обережні.
                return `Result: ${result}`;
            } catch (err) {
                return "Invalid math expression.";
            }
        }
    },
    uname: {
        description: "Display system information",
        action: () => "Terminal Simulator v1.0 (Browser-based)"
    },
    whoami: {
        description: "Show the current user",
        action: () => "guest"
    },
    ls: {
        description: "List available commands",
        action: () => Object.keys(commands).join('  ')
    }
};

// Обробка введення
function executeCommand(input) {
    const [command, ...args] = input.trim().split(' ');

    if (commands[command]) {
        const cmd = commands[command];
        const result = cmd.action(args);
        if (result !== undefined) {
            simulateDelay(() => addLine(result), 500);
        }
    } else {
        simulateDelay(() => addLine(`Unknown command: ${command}`), 500);
    }
}

// Додавання рядка до терміналу
function addLine(text) {
    const line = document.createElement('div');
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Прокрутка вниз
}

// Початкове повідомлення
addLine("Type 'help' to see the list of available commands.\n");

// Обробка подій
terminalInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const inputText = terminalInput.value.trim();

        if (inputText) {
            history.push(inputText); // Збереження в історію
            historyIndex = history.length;
            addLine(`> ${inputText}`);
            executeCommand(inputText);
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