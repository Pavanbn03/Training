let link= document.querySelectorAll('.navigation__link');
let checkbox=document.querySelector('.navigation__checkbox')
for(let i=0;i<link.length;i++){
    link[i].addEventListener('click',(e)=>{
        checkbox.checked=false;
    })
}