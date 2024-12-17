const outputElement = document.querySelector('#output');
const btnCopy = document.querySelector('#btncopy');
const passwordLengthElement = document.querySelector('#length');
const numberElement = document.querySelector('#number');
const capitalElement = document.querySelector('#capital'); // Fixed typo
const smallElement = document.querySelector('#small');
const symbolElement = document.querySelector('#Symbol'); // Fixed casing
const frm = document.querySelector('#frm');

// Button Click to copy password
btnCopy.addEventListener('click', async () => {
  const pass = outputElement.value;
  if (pass) {
    await navigator.clipboard.writeText(pass);
    alert("Copied to clipboard");
  } else {
    alert("There is no password to copy");
  }
});

/*
ASCII - American Standard Code for Information Interchange
65-90  -  A-Z
97-122 -  a-z
48-57  -  0-9
*/

function generateRandomChar(min, max) {
  const limit = max - min + 1;
  return String.fromCharCode(Math.floor(Math.random() * limit) + min);
}

function capitalValue() { // Corrected function name
  return generateRandomChar(65, 90);
}

function smallValue() {
  return generateRandomChar(97, 122);
}

function numberValue() {
  return generateRandomChar(48, 57);
}

function symbolValue() {
  const symbols = "@#$%&";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const functionArray = [
  { element: numberElement, fun: numberValue },
  { element: capitalElement, fun: capitalValue },
  { element: smallElement, fun: smallValue },
  { element: symbolElement, fun: symbolValue }
];

frm.addEventListener('submit', (e) => {
  e.preventDefault();

  const limit = passwordLengthElement.value;

  let generatedPassword = "";

  const funArray = functionArray.filter(({ element }) => element.checked);

  if (funArray.length === 0) {
    alert("Please select at least one option!");
    return;
  }

  for (let i = 0; i < limit; i++) {
    const index = Math.floor(Math.random() * funArray.length);
    const letter = funArray[index].fun();
    generatedPassword += letter;
  }

  outputElement.value = generatedPassword;
});
