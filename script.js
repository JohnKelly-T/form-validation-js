let form = document.querySelector('form');
let email = document.querySelector('#email');
let emailError = document.querySelector('#email-error');

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

email.addEventListener("change", (e) => {
    validateEmail();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    validateEmail();
});