//grabs the form via the form idea in both register and login files
// let responseForm = document.getElementById("nameform");

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("submit").addEventListener("click", function(e){
        let email = document.getElementById("user").value;
        let password = document.getElementById("password").value;
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
        if(!emailRegex.test(email)){
            console.log("Invalid Email");
            window.alert("Error invalid email");
            window.stop();
            //Prevents the window from being loaded
            e.preventDefault();
            // return false;
        }
        else if(!passwordRegex.test(password)){
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
        else{
            fetch("api/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(content).then((response)=>{
                    if(!response.ok){
                        throw new Error("Bad network response");
                    }
                    return response.json();
                }).then((data)=>{
                    console.log("Loading the user pfp");
                    e.preventDefault();
                    sendData(data)
                }).catch((error)=>{
                    console.log("Oops, there was an error processing the request. Here is the error", error)
                })
            })
        }
    })
});

// function loadGame(){
//     console.log("Game is about to be loaded!");
//     window.location.href = "../boardgame.html"
// }

function sendData(content){
    const xhr = new XMLHttpRequest();
    const endpointUrl = "api/sign-up"
    xhr.open("POST", endpointUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var email = document.getElementById("user").value;
                sessionStorage.setItem("email", email);
                window.location.href = "../user-account/user_profile.html";
                var displayName = sessionStorage.getItem("email");
                document.getElementById('emailName').innerText = displayName;
            }
            else{
                console.error("Oops, data cannot send", xhr.statusText);
            }
        }
    }
    xhr.send(JSON.stringify(content));
}