// --- スクロールで表示するIntersectionObserver ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// --- 背景斜線 Canvas アニメーション ---
const canvas = document.getElementById('lineCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

for (let i = 0; i < 30; i++) {
  lines.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 200 + 100,
    speed: Math.random() * 1 + 0.5,
    angle: Math.random() * Math.PI * 2,
    opacity: Math.random() * 0.4 + 0.1,
  });
}

function animateLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach(l => {
    const dx = Math.cos(l.angle) * l.length;
    const dy = Math.sin(l.angle) * l.length;

    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    ctx.lineTo(l.x + dx, l.y + dy);
    ctx.strokeStyle = `rgba(225,220,0,${l.opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    l.x += Math.cos(l.angle) * l.speed;
    l.y += Math.sin(l.angle) * l.speed;

    if (l.x > canvas.width || l.y > canvas.height || l.x < 0 || l.y < 0) {
      l.x = Math.random() * canvas.width;
      l.y = Math.random() * canvas.height;
    }
  });
  requestAnimationFrame(animateLines);
}
animateLines();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// --- サービス内画像をふわっと切り替える ---
const galleryImages = document.querySelectorAll('.gallery-img');
let current = 0;

function switchGalleryImage() {
  galleryImages[current].classList.remove('active');
  current = (current + 1) % galleryImages.length;
  galleryImages[current].classList.add('active');
}
setInterval(switchGalleryImage, 3000);

// --- 文字がバラバラに ---
const text = document.querySelector('.explode-text');
const spans = text.querySelectorAll('span');

text.addEventListener('mouseenter', () => {
  text.classList.add('hovered');
  spans.forEach(span => {
    const x = (Math.random() - 0.5) * 200; // -100〜100px
    const y = (Math.random() - 0.5) * 200;
    const rotate = (Math.random() - 0.5) * 360;
    span.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  });
});

text.addEventListener('mouseleave', () => {
  text.classList.remove('hovered');
  spans.forEach(span => {
    span.style.transform = `translate(0, 0) rotate(0)`;
    span.style.opacity = 1;
  });
});

// --- キューブ回転 ---
const cube = document.getElementById('cube');
let x = -20, y = 20;

let isDragging = false;
let startX, startY;

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  startX = e.clientX;
  startY = e.clientY;

  y += dx * 0.5;
  x -= dy * 0.5;

  cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
});
// 波
window.addEventListener("DOMContentLoaded", () => {
  const wave = document.querySelector('.wave');
  const loader = document.getElementById('loader');
  const main = document.getElementById('main');

  // 5秒後にトップページへ切り替え
  setTimeout(() => {
    wave.style.opacity = 1;

    // 波アニメーション完了後に切り替え（＋1秒余裕）
    setTimeout(() => {
      loader.style.display = 'none';
      main.classList.remove('hidden');
      main.classList.add('show');
    }, 2000); // 波アニメーション時間
  }, 3000); // 最初の3秒待ち
});
