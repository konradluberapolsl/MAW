// autor Konrad Lubera
const shift = document.querySelector("input[value='SHIFT']");
const option1 = document.querySelector("input[value='sqrt']");
const option2 = document.querySelector("input[value='x^2']");
const option3 = document.querySelector("input[value='sin']");
var i = 0;


shift.addEventListener('click', ()=>{
    i++
    if(i%2!=0)
    {
        option1.value='cos';
        option2.value='tan';
        option3.value='arcsin';
        shift.style.backgroundColor = '#065c06';
    }
    else if (i%2==0)
    {
        option1.value='sqrt';
        option2.value='x^2';
        option3.value='sin';
        shift.style.backgroundColor = '#1c1c1c';
    }
});