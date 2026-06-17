const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const PARTICLE_COUNT = isMobile ? 300 : 900;
const HEART_SCALE = isMobile ? 12 : 18;

let w, h;
let particles = [];

function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    w = rect.width;
    h = rect.height;
}

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

    for (let i = 0; i < PARTICLE_COUNT; i++) {

        const t = Math.random() * Math.PI * 2;
        const hp = heart(t);

        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,

            tx: w / 2 + hp.x * HEART_SCALE,
            ty: h / 2 + hp.y * HEART_SCALE,

            vx: 0,
            vy: 0,

            size: Math.random() * 2 + 1
        });
    }
}

function init() {
    resize();
    createHeart();
}

window.addEventListener("resize", () => {
    resize();
    createHeart();
});

init();

setInterval(createHeart, 3000);

let last = 0;

function animate(time) {

    requestAnimationFrame(animate);

    if (time - last < 16) return;
    last = time;

    ctx.fillStyle = "rgba(49,1,43,0.15)";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(255,120,180,0.85)";

    for (const p of particles) {

        const dx = p.tx - p.x;
        const dy = p.ty - p.y;

        p.vx += dx * 0.002;
        p.vy += dy * 0.002;

        p.vx *= 0.95;
        p.vy *= 0.95;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

requestAnimationFrame(animate);