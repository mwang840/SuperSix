//grabs the form via the form idea in both register and login files
let responseForm = document.getElementById("nameform");

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("form").addEventListener("submit", function(e){
        e.preventDefault();
        let email = document.querySelector("#user").value;
        let password = document.querySelector("#password").value;
        //^^Grabs the form elements
        const content = {
            email: email,
            password: password,
        }
        //Regex for valid emails
        const emailRegex = /^[A-Za-z0-9._]+@{1}[A-Za-z0-9]+.{1}(com|net|dev|org|edu|gov){1}$/;
        //Regex for passwords which contains at least a special character and are at LEAST 8 characters long
        const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
        //Condition if the email isn't valid! Exhaustive conditional checks
        if(emailRegex.test(email) === false){
            console.log("Invalid Email");
            window.alert("Error invalid email");
            window.stop();
            //Prevents the window from being loaded
            e.preventDefault();
            // return false;
        }
        else if(passwordRegex.test(password)===false){
            console.log("Invalid Password");
            window.alert("Error invalid password, it must contains at least 1 special character, a digit, an uppercase character, and are at LEAST 8 characters long");
            window.stop()
            e.preventDefault();
        }
        else if((content.email === null || content.password === null)){
            console.log("Cant leave any of those fields empty, try again!");
            window.alert("Error invalid email");
            window.stop();
            e.preventDefault();
        }
        else if(emailRegex.test(email) && passwordRegex.test(password) && content.email === null && content.password === null){
            
            loadGame();
        }
    })
});

function loadGame(){
    console.log("Game is about to be loaded!");
    window.location.href = "../boardgame.html"
}