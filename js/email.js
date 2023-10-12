window.onload = function() {
  emailjs.init("5BiCDNRS3pOWRkn3f");

  document.getElementById('contact-form').addEventListener('submit', function(event) {
      let userEmail = document.getElementById('userEmail');
      let userPhone = document.getElementById('userPhone');
      let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      event.preventDefault();
      let errorMessage = "Please enter a valid:\n";

      if(!emailRegex.test(userEmail.value)){
          errorMessage += " email address.\n";
          console.log("Please enter a valid email address.");
      }
      if(!phoneRegex.test(userPhone.value)){
          errorMessage += " phone number.\n";
          console.log("Please enter a valid phone number.");
      }
      if(document.getElementById('userMessage').value.trim() == ""){
          errorMessage += " message.\n";
          console.log("Please enter a message.");
      }
      if(document.getElementById('userFirstName').value.trim() == ""){
          errorMessage += " first name.\n";
          console.log("Please enter a first name.");
      }
      if(document.getElementById('userLastName').value.trim() == ""){
          errorMessage += " last name.\n";
          console.log("Please enter a last name.");
      }
      if(!errorMessage == "Please enter a valid:\n"){
          document.getElementById('error').innerHTML = errorMessage;
      }
      else{
          emailjs.send("SuperSix","template_8njfjtu",this);
          console.log("Email sent!");
      }
  });
};

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }