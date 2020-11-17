// autor Konrad Lubera
const option1 = document.querySelector("input[value='√']");
const option2 = document.querySelector("input[value='x^2']");
const option3 = document.querySelector("input[value='sin']");
const buttons = document.querySelectorAll("input[type='button']");
const text = document.querySelector("input[type='text']")
var eq = document.getElementById("eq")
var i = 0;
var number = "";
var equation = "";
var operators = ['+','-','/','*']

buttons.forEach(element => {
    element.addEventListener('click', ()=>{
        if(element.value=='⇧')
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
        
        if(!Number.isNaN(parseInt(element.value)) || element.value=='.')
        {
            if(element.value == '.' && text.value=='0')
            {
                number+= "0."
            }
            else
            {
                number+=element.value;
            }

            text.value= number;
        }

        if(operators.includes(element.value))
        {
            if (number!='' ){
                if(eq.innerHTML=='0')
                {
                    eq.innerHTML=''
                }
                eq.innerHTML+=number + element.value;
                number = '';
                text.value='';
            }
        }

        if (element.value == "=")
        {
            eq.innerHTML+=text.value 
            text.value = eval(eq.innerHTML);
        }

        if(element.value=="⌫" && text.value!='')
        {
            number = number.slice(0,-1)
            text.value = number
        }

        if (element.value=="CE")
        {
            equation= "";
            number = "";
            eq.innerHTML = "0";
            text.value = "0";
        }

        if (element.value == "C" && text.value!='0')
        {
            number="";
            text.value="0";
        }





    });
});