const btn = document.getElementById('btn');
const overlay = document.getElementById('overlay');

btn.addEventListener('click',()=>{
    overlay.style.display="grid";
    overlay.classList.add('animate-overlay');
    setTimeout(()=>{
        overlay.classList.remove('animate-overlay');
    },3000)
    
})