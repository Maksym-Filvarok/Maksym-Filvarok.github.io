const pad = n => n < 10 ? '0' + n : n;
let ticks = 0;
const el = document.getElementById('clock');
setInterval(() => {
const d = new Date();
el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
ticks++;
if (ticks % 60 === 0) alert('пройшла ще одна хвилина!');
}, 1000);