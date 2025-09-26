// Set focus to the first field when the form loads
window.onload = function () {
    document.forms["validationForm"].elements[0].focus();
}


// Trigger Bootstrap 'toast' when the first input field loses focus
document.getElementById("nameInput").addEventListener("blur", function () {
    const toastLiveExample1 = document.getElementById('liveToast1');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample1);
    toastBootstrap.show();
})


// Display the selected contact method from the dropdown 
document.getElementById("contactMethods").addEventListener("change", function () {
    let contactMethodIndex = document.getElementById("contactMethods").selectedIndex;
    let contactMethod = document.getElementById("contactMethods")[contactMethodIndex].value;
    if (contactMethod) {
        document.getElementById("selectedContactMethod").value = contactMethod;
    }
})


// Display the selected option from the radio buttons
document.querySelectorAll('input[name="contactTime"]').forEach(element => {
    element.addEventListener("change", function () {
        let contactTime = document.querySelector('input[name="contactTime"]:checked');
        let contactTimeLabel = contactTime.labels[0].textContent;
        if (contactTime) {
            document.getElementById("selectedTime").value = contactTimeLabel;
        }
    })
})




/*---------Override native browser validation messages---------*/

document.getElementById("submitButton").addEventListener("click", function () {
    let phoneInput = document.getElementById("phone-number-input");
    if (phoneInput.validity.patternMismatch) {
        phoneInput.setCustomValidity("Format must be XXX-XXX-XXXX, starting with 2-9");
        phoneInput.reportValidity();
    } else {
        phoneInput.setCustomValidity("");
        phoneInput.reportValidity();
    }

    let nameInput = document.getElementById("nameInput");
    if (nameInput.validity.valueMissing) {
        nameInput.setCustomValidity("Please provide your full name");
        nameInput.reportValidity();
    } else {
        nameInput.setCustomValidity("");
        nameInput.reportValidity();
    }
})

// Display input validity state to the console when clicking 'submit'
document.getElementById("submitButton").addEventListener("click", function () {
    console.clear();
    document.querySelectorAll("#validationForm input:enabled, #validationForm select").forEach(field => {        
        console.log(`Field '${field.id}' input: valid? ---> ${field.checkValidity()}`);
        console.log(field.validity);
        console.log("\n");
    });
})




/* -----------------------------------------Custom validation--------------------------------------- */

// Color fields for validation feedback
function setFieldColorToNoValid(field) {
    field.classList.remove("my-valid");
    field.classList.add("my-invalid");
}

function setFieldColorToValid(field) {
    field.classList.remove("my-invalid");
    field.classList.add("my-valid");
}


// Validate name 
function validateName() {
    let fullName = document.getElementById("nameInput");
    let isFullNameValid = /^[a-z ,.'-]+$/i.test(fullName.value);
    if (!isFullNameValid) {
        document.getElementById("nameFeedback").innerHTML = "Only letters, spaces, and ,.'- allowed."
        setFieldColorToNoValid(fullName);
        return false;
    } else {
        document.getElementById("nameFeedback").innerHTML = "";
        setFieldColorToValid(fullName);
        return true;
    }
}


//Validate email
function validateEmail() {
    let email = document.getElementById("emailInput");
    let isEmailValid = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(email.value);
    if (!isEmailValid) {
        setFieldColorToNoValid(email);
        document.getElementById("emailFeedback").innerHTML = "Enter a valid email (e.g., name@example.com)";
        return false;
    } else {
        setFieldColorToValid(email);
        document.getElementById("emailFeedback").innerHTML = "";
        return true;
    }
}


// Validate password
function validatePassword() {
    let password = document.getElementById("password-input");
    let isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password.value);
    if (!isPasswordValid) {
        setFieldColorToNoValid(password);
        document.getElementById("passwordFeedback").innerHTML = "Use 8+ chars, incl. letter, digit, and @$!%*#?&.";
        return false;
    } else {
        setFieldColorToValid(password);
        document.getElementById("passwordFeedback").innerHTML = "";
        return true;
    }
}


// Validate phone number
function validatePhoneNumber() {
    let phoneNumber = document.getElementById("phone-number-input");
    let isPhoneValid = /^\s*(\d\s*){10}\s*$/.test(phoneNumber.value);
    if (!isPhoneValid) {
        setFieldColorToNoValid(phoneNumber);
        document.getElementById("phoneFeedback").innerHTML = "Must be 10 digits. Spaces are optional";
        return false;
    } else {
        setFieldColorToValid(phoneNumber);
        document.getElementById("phoneFeedback").innerHTML = "";
        return true;
    }
}


// Validate selection box
function validateSelectionBox() {
    let selectionBox = document.getElementById("contactMethods");
    if (selectionBox.selectedIndex === 0) {
        document.getElementById("contactMethodFeedback").innerHTML = "Please select an option";
        setFieldColorToNoValid(selectionBox);
        return false;
    } else {
        document.getElementById("contactMethodFeedback").innerHTML = "";
        setFieldColorToValid(selectionBox);
        return true;
    }
}


// Validate radio buttons
function validateRadioButtons() {
    let radioButtons = document.forms["validationForm"].elements.contactTime;
    let radioButtonsContainer = document.getElementById("contact-time");
    let isButtonSelected = false;
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            isButtonSelected = true;
            break
        }
    }

    if (!isButtonSelected) {
        radioButtonsContainer.classList.add("my-invalid");
        radioButtonsContainer.classList.remove("my-valid");
        document.getElementById("contactTimeFeedback").innerHTML = "Please select an option";
        return false;
    } else {
        radioButtonsContainer.classList.add("my-valid");
        radioButtonsContainer.classList.remove("my-invalid");
        document.getElementById("contactTimeFeedback").innerHTML = "";
        return true;
    }
}


// Event listener for the 'Submit' button
document.getElementById("validateButton").addEventListener("click", function (e) {
    e.preventDefault();

    const nameValid = validateName();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const phoneValid = validatePhoneNumber();
    const selectValid = validateSelectionBox();
    const radioValid = validateRadioButtons();

    const allValid = nameValid && emailValid && passwordValid && phoneValid && selectValid && radioValid;

    if (allValid) {

        setTimeout(function () {
            window.alert("Your form has been submited");
            document.forms["validationForm"].submit();
        }, 1500);
    }
});

// Event listener for the 'Clear' button (it clears all text from custom validations)
document.getElementById("clearButton").addEventListener("click", function () {

    let markedFields = document.querySelectorAll("input");
    markedFields.forEach(input => {
        input.classList.remove("my-valid"),
            input.classList.remove("my-invalid")
    });

    document.getElementById("contactMethods").classList.remove("my-valid");
    document.getElementById("contactMethods").classList.remove("my-invalid");

    const contactTimeContainer = document.getElementById("contact-time");
    contactTimeContainer.classList.remove("my-valid");
    contactTimeContainer.classList.remove("my-invalid");

    document.querySelectorAll(".validation-display").forEach(tag => {
        tag.innerHTML = "";
    });
})

document.forms["validationForm"].checkValidity