const play = document.getElementById('play');
const res = document.getElementById('result');
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a }
play.onclick = ()=>{
	const bet = Number(document.getElementById('bet').value);
	res.textContent = 'Очікуйте 1 с...';
	const n = rnd(-5,5);
	setTimeout(()=>{
		if (n <= 0) res.textContent = `Випало ${n}. Ви програли.`;
		else res.textContent = `Випало ${n}. Ви виграли ${bet * n} грн.`;
	},1000);

}
