// Autor Konrad Lubera
const buttons = document.querySelectorAll("input[type='button']");
const text = document.getElementById("text")
var eq = document.getElementById("eq")
var i = 0;
var element = "";
var equation = "";
var operators = ['+','-','/','*','x^y'];
var fun = ['√','sin','cos','tan','asin'];
var wasEqualsClicked = false;
var wasPowClicked= false;

function doC(){
    equation= "";
    element = "";
    eq.innerHTML = "0";
    text.innerHTML = "0";
}

function indexes(source, find) {
    if (!source) {
      return [];
    }
    if (!find) {
      return source.split('').map(function(_, i) { return i; });
    }
    var result = [];
    for (i = 0; i < source.length; ++i) {
      if (source.substring(i, i + find.length) == find) {
        result.push(i);
      }
    }
    return result;
  }


buttons.forEach(item => {
    item.addEventListener('click', ()=>{
        
        if(text.innerHTML == "Error")
        {
            doC();
        }

        if((!Number.isNaN(parseInt(item.value)) || item.value=='.'))
        {
           if(wasEqualsClicked)
           {
               doC();
               wasEqualsClicked = false;
           }
           
            if(item.value == '.' && text.innerHTML=='0')
            {
                element+= text.innerHTML + "."
            }
            else 
            {
                element+=item.value;
            }

            text.innerHTML= element;
        }

        if(operators.includes(item.value))
        {
            if (element!='' ){
                if(eq.innerHTML=='0')
                {
                    eq.innerHTML=''
                }
                if (item.value == "x^y")
                {
                    equation+=element + ' ^ ';
 
                }
                else
                {
                    equation+=element + ' ' + item.value + ' ';

                }
                eq.innerHTML = equation;
                element = '';
                text.innerHTML='';
                i=0;
                if(wasEqualsClicked)
                {
                    wasEqualsClicked = false;
                }
            }
        }

        if (item.value == "=")
        {
           if(wasEqualsClicked == false){
            if(eq.innerHTML=='0')
            {
                eq.innerHTML='';
            }
            var str_to_eval = eq.innerHTML+=text.innerHTML; 
            var result;
            if(str_to_eval.includes('^'))
            {
                var strings = str_to_eval.split('^')
                var n = 0;
                var a = "";
                var b = "";
                strings.forEach(s => {
                    n++;
                    if (n%2 != 0)
                    {
                        a = s;
                    }
                    else{
                        b = s;
                    }
                    a = eval(a);
                    b = eval(b);
                    result = Math.pow(a,b);
                })
            }
            else{
                result = eval(str_to_eval);
            }
            text.innerHTML = result;
            element = result;
            equation = "";
            wasEqualsClicked = true;
            i=0;
        }
        }

        if (fun.includes(item.value))
        {
            if(text.innerHTML!='')
            {
                if(eq.innerHTML=='0')
                {
                    eq.innerHTML='';
                }
                //var str_to_eval = ((eq.innerHTML != '') ? eq.innerHTML + text.innerHTML : text.innerHTML);
                var str_to_eval = text.innerHTML;
                equation = "Math." + ((item.value=='√') ? 'sqrt' : item.value)+"("+ str_to_eval +")"
                eq.innerHTML =  ((item.value=='√') ? '√(' + str_to_eval + ')' : item.value + '(' + str_to_eval + ')'); 
                var result = eval(equation); //tu moga byc bugi
                if (!isNaN(result)){

                    text.innerHTML = result;
                    element = result;
                }
                else{
                    text.innerHTML = "Error";
                }
                equation = ''
                wasEqualsClicked = true;
            }
        }

        if(item.value == "±" && wasEqualsClicked==false)
        {
            i++
            if(i%2==0)
            {
                if (text.innerHTML[0]=="-")
                {
                    text.innerHTML =text.innerHTML.replace('-','');
                    element = text.innerHTML;
                }
            }
            else if (i%2!=0)
            {
                text.innerHTML = '-' + text.innerHTML;
                element = text.innerHTML;

            }
        }

        if(item.value=="⌫" && text.innerHTML!='' && wasEqualsClicked==false)
        {
            element = element.slice(0,-1)
            text.innerHTML = element
        }

        if (item.value=="CE")
        {
            element="";
            text.innerHTML="0";            
        }

        if (item.value == "C")
        {
            doC();
        }

    });
});