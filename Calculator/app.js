// autor Konrad Lubera
const option1 = document.querySelector("input[value='√']");
const option2 = document.querySelector("input[value='x^2']");
const option3 = document.querySelector("input[value='sin']");
const buttons = document.querySelectorAll("input[type='button']");
const text = document.querySelector("input[type='text']")
var eq = document.getElementById("eq")
var i = 0;
var element = "";
var equation = "";
var operators = ['+','-','/','*'];
var wasEqualsClicked = false;

function doCE(){
    equation= "";
    element = "";
    eq.innerHTML = "0";
    text.value = "0";
}


buttons.forEach(item => {
    item.addEventListener('click', ()=>{
        if(item.value=='⇧')
        {
            i++
            if(i%2!=0)
            {
                option1.value='cos';
                option2.value='tan';
                option3.value='arcsin';
                // shift.style.backgroundColor = '#00adb5';
            }
            else if (i%2==0)
            {
                option1.value='√';
                option2.value='x^2';
                option3.value='sin';
                // shift.style.backgroundColor = '#3a4750';
            }
        }
        
        if((!Number.isNaN(parseInt(item.value)) || item.value=='.'))
        {
           if(wasEqualsClicked)
           {
               doCE();
               wasEqualsClicked = false;
           }
           
            if(item.value == '.' && text.value=='0')
            {
                element+= text.value + "."
            }
            else 
            {
                element+=item.value;
            }

            text.value= element;
        }

        if(operators.includes(item.value))
        {
            if (element!='' ){
                if(eq.innerHTML=='0')
                {
                    eq.innerHTML=''
                }
                equation+=element + item.value;
                eq.innerHTML = equation;
                element = '';
                text.value='';
                if(wasEqualsClicked)
                {
                    wasEqualsClicked = false;
                }
            }
        }

        if (item.value == "=")
        {
            if(eq.innerHTML=='0')
            {
                eq.innerHTML=''
            }
            eq.innerHTML+=text.value 
            var result = eval(eq.innerHTML);
            text.value = result;
            element = result;
            equation = "";
            wasEqualsClicked = true;
        }

        if(item.value=="⌫" && text.value!='')
        {
            element = element.slice(0,-1)
            text.value = element
        }

        if (item.value=="CE")
        {
            doCE();
        }

        if (item.value == "C" && text.value!='0')
        {
            element="";
            text.value="0";
        }





    });
});