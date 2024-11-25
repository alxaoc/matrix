// Get the canvas and context
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Adjust canvas to full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Set initial size
resizeCanvas();

// Matrix characters
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()-_=+';
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

// Draw the matrix effect
function drawMatrix() {
    // Dark background with a slight opacity for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green text
    ctx.fillStyle = '#024a02';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, x) => {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, x * fontSize, y * fontSize);

        // Reset drop to top randomly
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[x] = 0;
        }

        drops[x]++;
    });
}

// Animate
function animate() {
    drawMatrix();
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 90); // Затримка у мілісекундах (чим більше число, тим повільніше)
}

// Listen to resize events
window.addEventListener('resize', () => {
    resizeCanvas();
    drops.length = Math.floor(canvas.width / fontSize);
    drops.fill(1);
});

// Start animation
animate();