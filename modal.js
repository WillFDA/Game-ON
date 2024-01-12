function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const successModalbg = document.querySelector('.container-success')
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// new close btn constant
const closeBtn = document.querySelector(".close-modal");
const successCloseBtn = document.querySelectorAll(".close-success")
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// closeModal Event
closeBtn.addEventListener("click", closeModal);
// close sucessModal
successCloseBtn.forEach((btn) => btn.addEventListener('click', closeSucessModal))
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// Close modal form
function closeModal() {
  modalbg.style.display = "none";
  clearModal();
}

function closeSucessModal() {
  successModalbg.style.display = "none"
}
// Declaring all modals input

const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const checkboxInputLocation = document.querySelectorAll('input[type="radio"][name="location"]')
const checkboxTerms = document.getElementById('checkbox1')
// clearing all modal forms
function clearModal() {
  // on clear tout les message d'erreur vue qu'on enlève tout
  document.querySelectorAll(".error-message").forEach((element) => {
    element.textContent = "";
  });

  // on clear tout les input
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  birthdateInput.value = "";
  quantityInput.value = "";
}

// Creation du message d'erreur
function setError(element, message) {
  let errorMessage = element.parentElement.querySelector(".error-message");
  console.log('ceci est l"elempent : ' + element);
  console.log("ceci est le errorMessage : " + errorMessage);
  if (errorMessage) {
    errorMessage.textContent = message;
  } else {
    console.log("Aucun élément .error-message trouvé dans le parent");
  }
}

// creation du message de success
function setSuccess() {
  closeModal()
  successModal()
}

// on verifie que au moins 1 radio est selectionner 

function isAnyCheckboxChecked() {
  for (let input of checkboxInputLocation) {
    if (input.checked) {
      return true;
    }
  }
  return false;
}


// test pour validé si bon mail

function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// validation des input via JS
function validateInputs() {
  let isValid = true;

  // Validation de firstName
  if (firstNameInput.value.trim() === "" || firstNameInput.value.trim().length < 2) {
    setError(firstNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.");
    isValid = false;
  } else {
    firstNameInput.textContent = ""
  }

  // Validation de lastName
  if (lastNameInput.value.trim() === "" || lastNameInput.value.trim().length < 2) {
    setError(lastNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    isValid = false;
  } else {
    lastNameInput.textContent = ""
  }

  // Validation de l'email
  if (!isValidEmail(emailInput.value)) {
    setError(emailInput, "Email invalide");
    isValid = false;
  } else {
    emailInput.textContent = ""
  }

  // Validation de la date de naissance
  if (birthdateInput.value.trim() === "") {
    setError(birthdateInput, "Vous devez entrer votre date de naissance.");
    isValid = false;
  } else {
    birthdateInput.textContent = ""
  }

  // Validation de quantity
  if (quantityInput.value.trim() === "") {
    setError(quantityInput, "Vous devez entrer un chiffre");
    isValid = false;
  } else {
    quantityInput.textContent = ""
  }

  if(!isAnyCheckboxChecked()) {
    setError(document.getElementById('location-error'), "veuillez selectionner au moins un endroit")
    isValid = false
  } else {
    document.getElementById('location-error').textContent = ""
  }

  if(!checkboxTerms.checked) {
    setError(checkboxTerms, 'Vous devez accepter les termes et conditions')
    isValid = false
  } else {
    checkboxTerms.textContent = ""
  }

  return isValid;
}

function successModal() {
  const successModal = document.querySelector('.success-modal');
  if (successModal) {
    successModalbg.style.display = 'flex';
  } else {
    console.log("La modale de succès n'a pas été trouvée dans le DOM.");
  }
}

function validate(event) {
  event.preventDefault();
  const isValid = validateInputs();
  if (isValid) {
    setSuccess();
  }
}

