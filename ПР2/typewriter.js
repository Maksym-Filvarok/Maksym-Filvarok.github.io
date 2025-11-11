const typed = document.getElementById('typed');
const input = document.getElementById('typeInput');
let iv, running=false;
function clearType(){ running=false; if(iv){clearInterval(iv); iv=null;} typed.textContent=''; }
function typeInterval(text,speed=80){ clearType(); let i=0; iv=setInterval(()=>{ if(i>=text.length){clearInterval(iv);iv=null}else typed.textContent+=text[i++]; },speed); }
function typeTimeout(text,speed=80){ clearType(); let i=0; running=true; (function step(){ if(!running||i>=text.length) return; typed.textContent+=text[i++]; setTimeout(step,speed); })(); }


document.getElementById('startTypeInterval').onclick = ()=>typeInterval(input.value);
document.getElementById('startTypeTimeout').onclick = ()=>typeTimeout(input.value);
document.getElementById('stopType').onclick = clearType;