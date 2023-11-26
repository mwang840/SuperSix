//grabs the form via the form idea in both register and login files
let responseForm = document.getElementById("nameform");

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("form").addEventListener("submit", function(e){
        e.preventDefault();
        let email = document.querySelector("#user").value;
        let password = document.querySelector("#password").value;
        let id = document.querySelector("#id").value;
        //^^Grabs the form elements
        const content = {
            email: email,
            password: password,
            id: id
        }
        //Regex for valid emails
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //Regex for passwords which constin at least 2 special characters and are at LEAST 8 characters long
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        //Condition if the email isn't valid!
        if(!emailRegex.test(email)){
            console.log("Invalid Email");
            window.alert("Error invalid email");
            // return false;
        }
        else if(!passwordRegex.test(password)){
            console.log("Invalid Password");
            window.alert("Error invalid email");
        }
        else if(content.email === null || content.password === null || content.id === null){
            console.log("Cant leave any of those fields empty, try again!");
            window.alert("Error invalid email");
        }
        else if(emailRegex.test(email) && passwordRegex.test(password) && content.email === null && content.password === null && content.id === null){
            loadGame();
        }
    })
});

function loadGame(){
    console.log("Game is about to be loaded!");
    window.location.href = "../boardgame.html"
}