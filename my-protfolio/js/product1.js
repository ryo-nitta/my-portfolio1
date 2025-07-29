const canvas = document.getElementById('ribbon-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let mouseX = width / 2;
let time = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
});

function drawRibbon() {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';

  const segmentCount = 60;
  const segmentLength = height / segmentCount;
  const waveAmplitude = 60;
  const waveFrequency = 0.15;
  const colorList = ['#FF69B4', '#1E90FF', '#32CD32', '#FFD700', '#8A2BE2'];

  for (let i = 0; i < 3; i++) {
    let offset = i * 20;
    ctx.beginPath();
    for (let j = 0; j <= segmentCount; j++) {
      const y = j * segmentLength;
      const phase = time * 0.02 + j * waveFrequency + i;
      const x = mouseX + Math.sin(phase) * (waveAmplitude + i * 10);

      if (j === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = colorList[i % colorList.length];
    ctx.stroke();
  }

  time++;
  requestAnimationFrame(drawRibbon);
}

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

drawRibbon();
