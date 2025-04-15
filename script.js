let form = document.querySelector('form');
let email = document.querySelector('#email');
let emailError = document.querySelector('#email-error');
let country = document.querySelector('#country');
let countryError = document.querySelector('#country-error');
let postalCode = document.querySelector('#postal-code');
let postalCodeError = document.querySelector('#postal-code-error');
let password = document.querySelector('#password');
let passwordError = document.querySelector('#password-error');

let validateEmail = () => {
    // regex for validations
    const hasAtSymbol = /.*@.*/;
    const hasPartAfterAt = /^\w+((\.|-)?\w+)+?@.+/;
    const hasDomain = /^\w+((\.|-)?\w+)+?@\w+(-?\w+)?\.\w{2,}(\.\w{2,})?$/;

    if (email.value === "") {
        emailError.textContent = "Please enter your email";
        email.classList.add("invalid");
    } else if (!hasAtSymbol.test(email.value)) {
        emailError.textContent = "Please include an '@' symbol in the email address";    
        email.classList.add("invalid");
    } else if(!hasPartAfterAt.test(email.value)) {
        emailError.textContent = "Please enter a part after the '@' symbol";
        email.classList.add("invalid");
    } else if(!hasDomain.test(email.value)){
        emailError.textContent = "Please enter a valid domain (ex. '.com')";  
        email.classList.add("invalid");
    } else {
        emailError.textContent = "";
        email.classList.remove("invalid");
    }

    console.log(hasPartAfterAt.test(email.value));
};

let validateCountry = () => {
    if (country.value === "") {
        country.classList.add("invalid");
        countryError.textContent = "Please select a country";
    } else {
        country.classList.remove("invalid");
        countryError.textContent = "";
    }
};

let validatePostalCode = () => {
    const constraints = {
        ph: [
            "^\d{4}$",
            "Philippine postal codes must have exactly 4 digits: e.g. 4114"
        ],
        ch: [
          "^(CH-)?\\d{4}$",
          "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
        ],
        fr: [
          "^(F-)?\\d{5}$",
          "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
        ],
        de: [
          "^(D-)?\\d{5}$",
          "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
        ],
        nl: [
          "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
          "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
        ],
    };

    if (postalCode.value === "") {
        postalCodeError.textContent = "Please enter a postal code";
        postalCode.classList.add("invalid");
    } else {
        if (country.value) {
            const constraint = new RegExp(constraints[country.value][0]);

            if (!constraint.test(postalCode.value)) {
                postalCodeError.textContent = constraints[country.value][1];
                postalCode.classList.add("invalid");
            }
        }
    }
};

let validatePassword = () => {
    // regex for password
    const hasMoreThan8Chars = /^.{8,}$/;
    const hasUppercase = /^.*[A-Z].*$/;
    const hasLowercase = /^.*[a-z].*$/;
    const hasSpecialChar = /^.*[^\w\d].*$/; 

    if (!hasMoreThan8Chars.test(password.value)) {
        passwordError.textContent = "The password must have at least 8 characters";
        password.classList.add("invalid");
    } else if (!hasUppercase.test(password.value)) {
        passwordError.textContent = "The password must have at least 1 uppercase character";
    } else if (!hasLowercase.test(password.value)) {
        passwordError.textContent = "The password must have at least 1 lowercase character";
    } else if (!hasSpecialChar.test(password.value)) {
        passwordError.textContent = "The password must have at least 1 specialcharacter";
    } else {
        passwordError.textContent = "";
        password.classList.remove("invalid");
    }
}

email.addEventListener("change", validateEmail);
country.addEventListener("change", validateCountry);
postalCode.addEventListener("change", validatePostalCode);
password.addEventListener("change", validatePassword);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    validateEmail();
    validateCountry();
    validatePostalCode();
    validatePassword();
});