console.log("hello");

const calculateButton = document.querySelector("#calculate");
const addInputButton = document.querySelector("#add-input");
const minOutput = document.querySelector("#min");
const maxOutput = document.querySelector("#max");
const avgOutput = document.querySelector("#avg");
const errorOutput = document.querySelector("#error");
const inputContainer = document.querySelector("#inputContainer");

const getInputArray = () =>
  Array.from(inputContainer.querySelectorAll("span > input"));

let inputArray = getInputArray();

const setError = () => {
  minOutput.innerHTML = "";
  maxOutput.innerHTML = "";
  avgOutput.innerHTML = "";

  errorOutput.innerHTML = "Wypełnij poprawnie wszystkie pola";

  return;
};

const resetError = () => {
  errorOutput.innerHTML = "";

  return;
};

const calculations = () => {
  const inputValues = inputArray.map((input) => parseFloat(input.value));

  if (inputValues.includes(NaN)) {
    setError();

    return;
  }

  resetError();

  minOutput.innerHTML = Math.min(...inputValues);
  maxOutput.innerHTML = Math.max(...inputValues);
  avgOutput.innerHTML = inputValues.reduce((a, b) => a + b) / 4;
};

const getNewInput = () => {
  let newInput = document.createElement("input");
  newInput.type = "number";
  newInput.required = true;
  newInput.addEventListener("input", calculations);

  return newInput;
};

const getRemoveInputButton = () => {
  let newRemoveInputButton = document.createElement("button");
  newRemoveInputButton.id = `remove-${inputArray.length + 1}`;
  newRemoveInputButton.innerHTML = "-";

  return newRemoveInputButton;
};

const createNewRow = () => {
  const row = document.createElement("span");

  row.appendChild(getRemoveInputButton());
  row.appendChild(getNewInput());
  row.appendChild(document.createElement("br"));

  inputContainer.appendChild(row);
  inputArray = getInputArray();

  setError();
};

calculateButton.addEventListener("click", calculations);

inputArray.forEach((input) => input.addEventListener("input", calculations));

addInputButton.addEventListener("click", createNewRow);
