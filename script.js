const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const toast = document.getElementById("toast");

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

function generatePassword() {

    const length = lengthSlider.value;

    const hasUpper = document.getElementById("uppercase").checked;
    const hasLower = document.getElementById("lowercase").checked;
    const hasNumber = document.getElementById("numbers").checked;
    const hasSymbol = document.getElementById("symbols").checked;

    if(!hasUpper && !hasLower && !hasNumber && !hasSymbol){
        showToast("Select at least one option!");
        return;
    }

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}<>?/";

    let chars = "";

    if(hasUpper) chars += upper;
    if(hasLower) chars += lower;
    if(hasNumber) chars += numbers;
    if(hasSymbol) chars += symbols;

    let password = "";

    for(let i=0; i<length; i++){
        password += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    document.getElementById("password").value = password;

    checkStrength(password);
}

function copyPassword(){

    const passwordField = document.getElementById("password");

    if(passwordField.value === ""){
        showToast("Generate password first!");
        return;
    }

    navigator.clipboard.writeText(passwordField.value);

    showToast("Password copied!");
}

function checkStrength(password){

    let strength = 0;

    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;

    switch(strength){

        case 1:
            strengthBar.style.width = "25%";
            strengthBar.style.background = "red";
            strengthText.innerText = "Strength: Weak";
            break;

        case 2:
            strengthBar.style.width = "50%";
            strengthBar.style.background = "orange";
            strengthText.innerText = "Strength: Medium";
            break;

        case 3:
            strengthBar.style.width = "75%";
            strengthBar.style.background = "yellow";
            strengthText.innerText = "Strength: Strong";
            break;

        case 4:
            strengthBar.style.width = "100%";
            strengthBar.style.background = "limegreen";
            strengthText.innerText = "Strength: Very Strong";
            break;
    }
}

function showToast(message){

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

document.querySelector(".theme-toggle").addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = document.querySelector(".theme-toggle i");

    if(document.body.classList.contains("light")){
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
    }
});

generatePassword();