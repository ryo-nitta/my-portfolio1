const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');
// キャンバスクリックで波紋追加
canvas.addEventListener('click', (e) => {
  ripples.push(new Ripple(e.clientX, e.clientY));
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 波紋（クリック）エフェクト用配列
const ripples = [];

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.opacity = 1;
  }

  update() {
    this.radius += 2;
    this.opacity -= 0.015;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  isAlive() {
    return this.opacity > 0;
  }
}

// マウス座標とタイマー変数
let mouseX = 0;
let mouseY = 0;
let tick = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 波紋の更新と描画
  ripples.forEach((r, i) => {
    r.update();
    r.draw();
    if (!r.isAlive()) ripples.splice(i, 1);
  });

  // マウス追従波動の描画
  for (let i = 0; i < 3; i++) {
    const radius = 30 + Math.sin(tick / 10 + i) * 10;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 200, 255, ${0.2 - i * 0.05})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  tick++;
  requestAnimationFrame(animate);
}

// マウス移動イベントで座標更新
window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

animate();
// クリック波紋
canvas.addEventListener('click', (e) => {
  const header = document.querySelector('header');
  const headerRect = header.getBoundingClientRect();

  // header以外でクリックしたときのみ追加
  if (e.clientY > headerRect.bottom) {
    ripples.push(new Ripple(e.clientX, e.clientY));
  }
});

// マウス追従も header 上はスキップ
window.addEventListener('mousemove', e => {
  const header = document.querySelector('header');
  const headerRect = header.getBoundingClientRect();

  if (e.clientY > headerRect.bottom) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  } else {
    mouseX = -1000; // 画面外に飛ばして非表示に
    mouseY = -1000;
  }
});

let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const comments = document.getElementsByClassName("comment-slide");

function showSlides() {
  // 全スライドとコメントを非表示
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    comments[i].classList.remove("active");
  }

  // 次のインデックスへ
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  // 対応するスライドとコメントを表示
  slides[slideIndex - 1].classList.add("active");
  comments[slideIndex - 1].classList.add("active");

  // 次の切り替えを予約
  setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", showSlides);
