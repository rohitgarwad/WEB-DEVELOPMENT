const form = document.getElementById("form");
const convertBtn = document.getElementById("convert-btn");
const outputEl = document.getElementById("output");

const numberToRoman = (input) => {
  const romanNumsArr = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  const outputResult = [];

  romanNumsArr.forEach((romanNum) => {
    while (input >= romanNum[1]) {
      outputResult.push(romanNum[0]);
      input = input - romanNum[1];
    }
  });

  return outputResult.join("");
};

const isValidInput = (input) => {
  let errorText = "";
  if (isNaN(input)) {
    errorText = "Please enter a valid number";
  } else if (input < 1) {
    errorText = "Please enter a number greater than or equal to 1";
  } else if (input > 3999) {
    errorText = "Please enter a number less than or equal to 3999";
  } else {
    return true;
  }

  outputEl.innerText = errorText;
  outputEl.classList.add("alert");
  return false;
};

const clearOutputEl = () => {
  outputEl.innerText = "";
  outputEl.classList.remove("alert");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  showOutput();
});

convertBtn.addEventListener("click", () => {
  showOutput();
});

const showOutput = () => {
  const numberInputEl = document.getElementById("number");
  const inputInt = parseInt(numberInputEl.value);

  outputEl.classList.remove("hidden");

  clearOutputEl();

  if (isValidInput(inputInt)) {
    outputEl.innerText = numberToRoman(inputInt);
  }
};
