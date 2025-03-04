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
  } else {
    // Prevent submission to show the confirmation message
    event.preventDefault();
    showConfirmationMessage(() => {
      event.target.submit();
    });
  }
});

function validate(event) {
  let isValid = true;

  // DOM Elements
  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.querySelector('input[name="location"]:checked');
  const termsChecked = document.getElementById("checkbox1").checked;
  const birthdate = document.getElementById("birthdate").value;

  // Function to display an error message
  function showErrorMessage(id, message) {
    const field = document.getElementById(id);

    //Search for the existing error element
    let errorElement = field.parentNode.querySelector(".error-message");

    //If the error element doesn't exist, create it.
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      field.parentNode.appendChild(errorElement);
    }

    //Updating the error message.
    errorElement.textContent = message;
  }

  // Function to delete an error message
  function clearErrorMessage(id) {
    const field = document.getElementById(id);
    let errorElement = field.parentNode.querySelector(".error-message");

    if (errorElement) {
      errorElement.parentNode.removeChild(errorElement);
    }
  }

  // First name verification
  if (firstName.length < 2 || firstName.trim() === "") {
    showErrorMessage("first", "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.");
    isValid = false;
  } else {
    clearErrorMessage("first");
  }

  // Name verification
  if (lastName.length < 2 || lastName.trim() === "") {
    showErrorMessage("last", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    isValid = false;
  } else {
    clearErrorMessage("last");
  }

  // Email verification
  const regexMail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/; 
  if (!regexMail.test(email)) {
    showErrorMessage("email", "Veuillez entrer une adresse e-mail valide.");
    isValid = false;
  } else {
    clearErrorMessage("email");
  }

  // birthdate verification
  const regexBirthdate = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!regexBirthdate.test(birthdate)) {
    showErrorMessage("birthdate", "Vous devez entrer votre date de naissance.");
    isValid = false;
  } else {
    clearErrorMessage("birthdate");
  }

  // Quantity verification
  const regexQuantity = /^[0-9]+/;
  if (!regexQuantity.test(quantity)) {
    showErrorMessage("quantity", "Veuillez entrer un nombre valide.");
    isValid = false;
  } else {
    clearErrorMessage("quantity");
  }

  // radio button verification
  if (!location) {
    showErrorMessage("location1", "Vous devez choisir une option.");
    isValid = false;
  } else {
    clearErrorMessage("location1");
  }

  // Terms of use verification
  if (!termsChecked) {
    showErrorMessage("checkbox1", "Vous devez vérifier que vous acceptez les termes et conditions.");
    isValid = false; 
  } else {
    clearErrorMessage("checkbox1");
  }

  return isValid; 
}

// Create a confirmation message
function showConfirmationMessage(callback) {
  const confirmationMessage = document.createElement("div");
  confirmationMessage.classList.add("confirmation-message")
  confirmationMessage.textContent = "Merci pour votre inscription";

  // DOM Elements
  const modalBody = document.querySelector(".modal-body");
  const targetFormData = document.getElementById("targetFormData");
  const submitButton = document.querySelector(".btn-submit");
  const formDataElements = document.querySelectorAll(".formData");


  // Update submitButton
  submitButton.value = "Fermer";
  submitButton.style.position = "absolute";
  submitButton.style.bottom = "20px";
  submitButton.style.left = "50%";
  submitButton.style.transform = "translateX(-50%)";
  submitButton.style.width = "30%";
  submitButton.style.textAlign = "center";
  submitButton.style.padding = "12px 0";

  // Update formData
  formData.forEach((element) => {
    element.style.display = "none";
  });

  // Update modalBody
  modalBody.style.height = "850px"


  // Add the message to DOM
  modalBody.appendChild(confirmationMessage);

  // Close the popup when submitButton is clicked
  submitButton.addEventListener("click", () => {
    confirmationMessage.remove();
    if (callback) {
      callback();
    }
  });

  // Close the popup when closeSpan is clicked
  closeSpan.addEventListener("click", () => {
    confirmationMessage.remove();
    if (callback) {
      callback();
    }
  });
}
