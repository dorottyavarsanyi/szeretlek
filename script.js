const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let w, h;
let particles = [];

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function heart(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t))
    };
}

function createHeart() {
    particles = [];

    for (let i = 0; i < 900; i++) {
        const t = Math.random() * Math.PI * 2;
        const p = heart(t);

        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,

            tx: w / 2 + p.x * 18,
            ty: h / 2 + p.y * 18,

            vx: 0,
            vy: 0,
            size: Math.random() * 2 + 1
        });
    }
}

createHeart();

setInterval(createHeart, 3000);

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
        let dx = p.tx - p.x;
        let dy = p.ty - p.y;

        p.vx += dx * 0.002;
        p.vy += dy * 0.002;

        p.vx *= 0.95;
        p.vy *= 0.95;

        p.x += p.vx;
        p.y += p.vy;

        const glow = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, 8
        );

        glow.addColorStop(0, "rgba(255,60,60,1)");
        glow.addColorStop(1, "rgba(255,0,0,0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

animate();