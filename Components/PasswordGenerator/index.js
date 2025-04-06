import "./styles.css";

const SYMBOLS = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;
const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";

const passwordDisplaySpan = document.querySelector(".password-value");
const passwordLengthInput = document.querySelector(".password-length-input");
const generatePasswordBtn = document.querySelector(".generate-btn");
const characterLength = document.querySelector(".character-length-count");
const lowercaseCheckbox = document.querySelector(".lowercase-checkbox");
const uppercaseCheckbox = document.querySelector(".uppercase-checkbox");
const numberCheckbox = document.querySelector(".number-checkbox");
const symbolCheckbox = document.querySelector(".symbol-checkbox");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const passwordStrength = document.querySelector(".password-strength-value");
const passwordCopyBtn = document.querySelector(".password-copy-btn");

passwordLengthInput.addEventListener("input", function () {
    const lengthValue = Number(this.value);
    characterLength.textContent = lengthValue;
});

generatePasswordBtn.addEventListener("click", function () {
    const passwordLength = Number(characterLength.textContent);
    passwordStrength.textContent = getPasswordStrengthValue(passwordLength);

    const isAnyChecked = Array.from(checkboxes).some(
        (checkbox) => checkbox.checked
    );

    if (!isAnyChecked) {
        alert(
            "Please select at least one option (lowercase, uppercase, numbers, or symbols)!"
        );
        return;
    }

    const password = generatePassword(
        passwordLength,
        lowercaseCheckbox.checked,
        uppercaseCheckbox.checked,
        numberCheckbox.checked,
        symbolCheckbox.checked
    );

    console.log("Password", password);
    passwordDisplaySpan.textContent = password;
});

passwordCopyBtn.addEventListener("click", function () {
    const password = passwordDisplaySpan.textContent;

    navigator.clipboard
        .writeText(password)
        .then(() => {
            alert("Password copied to clipboard!");
            console.log("Password copied to clipboard!");
        })
        .catch((err) => {
            console.error("Failed to copy: ", err);
        });
});

function generatePassword(
    passwordLength,
    isLowercase,
    isUppercase,
    isNumber,
    isSymbol
) {
    let passwordString = "";
    if (isLowercase) {
        passwordString += LOWERCASE_LETTERS;
    }
    if (isUppercase) {
        passwordString += UPPERCASE_LETTERS;
    }
    if (isNumber) {
        passwordString += NUMBERS;
    }
    if (isSymbol) {
        passwordString += SYMBOLS;
    }

    // console.log("passwordLength", passwordLength);
    // console.log("isLowercase", isLowercase);
    // console.log("isUppercase", isUppercase);
    // console.log("isNumber", isNumber);
    // console.log("isSymbol", isSymbol);
    // console.log("passwordString", passwordString);

    const passwordStringLength = passwordString.length;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * passwordStringLength);
        password += passwordString[randomIndex];
    }

    return password;
}

function getPasswordStrengthValue(passwordLength) {
    if (passwordLength <= 6) {
        return "Poor";
    }

    if (passwordLength <= 10) {
        return "Medium";
    }

    if (passwordLength <= 15) {
        return "Strong";
    }

    return "Very Strong";
}
