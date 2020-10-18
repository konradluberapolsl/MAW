const menu_item = document.querySelectorAll('.nav ul li a');

menu_item.forEach((item) => {
    
	item.addEventListener('click', () => {
        menu_item.forEach((i) =>{ if(i!==item){i.classList.remove('active-nav')}});
        item.classList.toggle('active-nav');
    });
});

// Do dopracowania - refresh/scroll bug 


var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
coll[i].addEventListener("click", function() {
    this.classList.toggle("active-col");
    var content = this.nextElementSibling;

    if (content.style.maxHeight){
    content.style.maxHeight = null;
    } else {
    content.style.maxHeight = content.scrollHeight + "px";
    tmp = content.scrollHeight * -1;
    }});}

