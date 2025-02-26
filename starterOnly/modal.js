function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += "responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeSpan = document.querySelector(".close"); 

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal
closeSpan.addEventListener("click", function() {        
modalbg.style.display = "none";                    
})


// Prevents submission if validation fails
document.querySelector("form").addEventListener("submit", (event) => {
  if (!validate(event)) {
    event.preventDefault(); 
  }
});

function validate(event) {

  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.querySelector('input[name="location"]:checked');
  const termsChecked = document.getElementById("checkbox1").checked;
  const birthdate = document.getElementById("birthdate").value;

  // First name verification
  if (firstName.length < 2 || firstName.trim() === "") {
    return false; 
  }

  // Name verification
  if (lastName.length < 2 || lastName.trim() === "") {
    return false;
  }

  // Email verification
  const regexMail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/; 
  if (!regexMail.test(email)) {
    return false;
  }

  // birthdate verification
  const regexBirthdate = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!regexBirthdate.test(birthdate)) {
    return false;
  }

  // Quantity verification
  const regexQuantity = /^[0-9]+/;
  if (!regexQuantity.test(quantity)) {
    return false;
  }

  // radio button verification
  if (!location) {
    return false;
  }

  // Terms of use verification
  if (!termsChecked) {
    return false;
  }

  return true; 
}

