document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const errorDiv = document.getElementById("error-message");
  
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        errorDiv.innerHTML = ""; 
  
        const lname = document.getElementById("user_lname").value.trim();
        const fname = document.getElementById("user_fname").value.trim();
        const email = document.getElementById("user_email").value.trim();
        const phone = document.getElementById("user_phone").value.trim();
        const message = document.getElementById("user_message").value.trim();
  
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  
        if (lname === "" || fname === "" || message === "") {
            showError("Please fill in all required fields.");
            return;
        }
  
        else if (!emailRegex.test(email)) {
            showError("Please enter a valid email address.");
            return;
        }
  
        else if (!phoneRegex.test(phone)) {
            showError("Please enter a valid phone number (e.g., 123-456-7890).");
            return;
        }
        else{
            emailjs.init("5BiCDNRS3pOWRkn3f");
  
            const emailParams = {
                user_lname: lname,
                user_fname: fname,
                user_email: email,
                user_phone: phone,
                user_message: message
            };
  
            emailjs.send("SuperSix", "Super_Template", emailParams)
                .then(function (response) {
                    showError("Form submitted successfully!", "blue");
                    form.reset();
                })
                .catch(function (error) {
                    console.error("Email could not be sent:", error);
                   
                });
            };
  
    });
  
    function showError(message, color = "red") {
        errorDiv.style.color = color;
        errorDiv.textContent = message;
    }
  
  })
  