const textInputElement = document.getElementById('text-input');
const checkBtnElemnet = document.getElementById('check-btn');
const resultContainer = document.getElementById('result');

let inputText = "";
let outputText = "";

const isPalindrome = (input) => {
    input = input.toLowerCase().replace(/[^a-z0-9]/gi, '');
    let inputArray1 = input.split('');
    let reversedInput = inputArray1.toReversed().join('');
    
    return input === reversedInput ? true : false;
}

const checkPalindrome = () => {
    inputText = textInputElement.value;
    if (inputText.trim() === "") {
        alert("Please input a value");
    } else {
        outputText = isPalindrome(inputText) ? `${inputText} is a palindrome` : `${inputText} is not a palindrome`;
        resultContainer.textContent = outputText;
        resultContainer.style.display = 'block';
    }
}

checkBtnElemnet.addEventListener("click", checkPalindrome);