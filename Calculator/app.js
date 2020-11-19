// autor Konrad Lubera
const shift = document.querySelector("input[value='⇧']");
const option1 = document.querySelector("input[value='√']");
const option2 = document.querySelector("input[value='x^y']");
const option3 = document.querySelector("input[value='sin']");


shift.addEventListener('click', ()=>{
    i++
    if(i%2!=0)
    {
        option1.value='cos';
        option2.value='tan';
        option3.value='asin';
        shift.style.backgroundColor = '#00adb5';
    }
    else if (i%2==0)
    {
        option1.value='√';
        option2.value='x^y';
        option3.value='sin';
        shift.style.backgroundColor = '#3a4750';
    }
});



