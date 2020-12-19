//autro Konra Lubera
const page1 = document.getElementById("page1")
const page2 = document.getElementById("page2")
const page3 = document.getElementById("page3")
const page4 = document.getElementById("page4")
const backButton = document.getElementById("back");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");
let activePage = page1;
let previousPage = NaN;

init();

function init(){

    disableEnterSubmit();

    nextButton.addEventListener("click", () =>{
        if (activePage === page1){
            activePage = page2;
            previousPage = page1;
            backButton.classList.remove("hidden")
        }
        else if (activePage === page2){
            activePage = page3;
            previousPage = page2;
        }
        else if (activePage === page3){
            activePage = page4;
            previousPage = page3;
            nextButton.classList.add("hidden")
            submitButton.classList.remove("hidden")
        }
        activePage.classList.remove("hidden");
        previousPage.classList.add("hidden");
    })
    backButton.addEventListener("click", ()=>{
        if (activePage === page2){
            activePage = page1;
            previousPage = page2;
            backButton.classList.add("hidden")
        }
        else if (activePage === page3){
            activePage = page2;
            previousPage = page3;
        }
        else if (activePage === page4){
            activePage = page3;
            previousPage = page4;
            nextButton.classList.remove("hidden")
            submitButton.classList.add("hidden")
        }
        activePage.classList.remove("hidden");
        previousPage.classList.add("hidden");
    })
}


function vailidate(){
    const loginField = document.getElementById("login");
    const passwordField = document.getElementById("passwd");
    const rpasswordField = document.getElementById("rpasswd");
    const mailField = document.getElementById("mail");
    const accept = document.getElementById("accept");
    if ((loginField.value == "") || (passwordField.value == "") || (rpasswordField.value == "") || (mailField.value == "")){
        activePage = page2;
        previousPage = page4;
        activePage.classList.remove("hidden");
        previousPage.classList.add("hidden");
        backButton.classList.add("hidden");
        loginField.focus();
        return false;
    }
    else if (!accept.checked) {
        if (activePage == page4)
            previousPage = page3;
        else
            previousPage = activePage;
        activePage = page4;
        activePage.classList.remove("hidden");
        previousPage.classList.add("hidden");
        backButton.classList.add("hidden");
        accept.focus();
        return false;
    }
    else{
        submit();
    }

}

function submit(){
    let array = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        login: document.getElementById("login").value,
        password: document.getElementById("passwd").value,
        mail: document.getElementById("mail").value,
        phoneNumber: document.getElementById("phone").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        birthDate: document.getElementById("birthday").value,
        color: document.getElementById("color").value,
        GHLink: document.getElementById("link").value,
        nice: document.getElementById("nice").value
    }
    const JSonArray = JSON.stringify(array);
    console.log(JSonArray);
}


function disableEnterSubmit() {
    $(document).keypress(
        function(event) {
            if (event.which == '13') {
                event.preventDefault();
            }
        });
}

