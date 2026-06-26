const canvas = document.getElementById("kurumi-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];

for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.7 + 0.2
    });
}

let rotation = 0;

function drawClock() {
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);

    ctx.strokeStyle = "rgba(247,178,103,0.25)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(0, 0, 200, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(0, -180);
        ctx.lineTo(0, -210);
        ctx.stroke();
        ctx.rotate(Math.PI / 6);
    }

    ctx.restore();

    rotation += 0.002;
}

function drawGlow() {
    const glow = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        50,
        canvas.width / 2,
        canvas.height / 2,
        500
    );

    glow.addColorStop(0, "rgba(167,46,63,0.25)");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawParticles() {
    particles.forEach(particle => {
        particle.y -= particle.speed;

        if (particle.y < -10) {
            particle.y = canvas.height + 10;
            particle.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(167,46,63,${particle.opacity})`;
        ctx.fill();
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGlow();
    drawClock();
    drawParticles();

    requestAnimationFrame(animate);
}

animate();