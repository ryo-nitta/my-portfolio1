const canvas = document.getElementById('lightCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 400; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1,
    alpha: Math.random()
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  requestAnimationFrame(animate);
}

animate();

// ローディング非表示（3秒後）
setTimeout(() => {
  document.getElementById('loading').style.display = 'none';
  document.querySelector('.hero').classList.add('visible');
}, 3000);


// スライド
const track = document.querySelector('.album-track');
const slides = Array.from(track.children);

// スライドを2倍に複製してシームレスなループに
slides.forEach(slide => {
  const clone = slide.cloneNode(true);
  track.appendChild(clone);
});



  // --- [1] about セクションのふわっと出現 ---
  const about = document.querySelector('.about');
  if (about) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          about.classList.add('show'); // 表示トリガークラス追加
        }
      });
    });
    aboutObserver.observe(about);
  }

  // --- [2] メッセージのタイプライター表示 ---
  const text = `デザインは、ただ美しいだけでは不十分だと考えています。伝えたい想いを「どう届けるか」、相手の視点で考えることこそが本質だと信じています。

私は「伝える」ではなく「届く」デザインを目指し、日々、構成・配色・導線・余白…そのすべてに理由を持って制作しています。

UI/UX、Webサイト、グラフィック、ブランド設計──すべての仕事に共通するのは、使う人の気持ちに寄り添うこと。そのために、リサーチと対話を大切にし、常に「なぜそれを選ぶのか」を自問自答しています。`;

  const container = document.getElementById('message');
  if (container) {
    let i = 0;
    function typeText() {
      if (i < text.length) {
        container.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeText, 30); // 表示速度調整
      }
    }
    typeText();
  }


 // ---スライド　---
let slideIndex = 0;
const slide = document.getElementsByClassName("slide");
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

// --- サービス内画像をふわっと切り替える ---
const galleryImages = document.querySelectorAll('.gallery-img');
let current = 0;

function switchGalleryImage() {
  galleryImages[current].classList.remove('active');
  current = (current + 1) % galleryImages.length;
  galleryImages[current].classList.add('active');
}
setInterval(switchGalleryImage, 3000);