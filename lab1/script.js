const calculateButton = document.querySelector("#calculate");
const addInputButton = document.querySelector("#add-input");
const sumOutput = document.querySelector("#sum");
const minOutput = document.querySelector("#min");
const maxOutput = document.querySelector("#max");
const avgOutput = document.querySelector("#avg");
const errorOutput = document.querySelector("#error");
const inputContainer = document.querySelector("#inputContainer");

const getInputArray = () =>
  Array.from(inputContainer.querySelectorAll("input"));

let inputArray = getInputArray();

const setError = () => {
  sumOutput.textContent = "";
  minOutput.textContent = "";
  maxOutput.textContent = "";
  avgOutput.textContent = "";

  errorOutput.textContent = "Wypełnij poprawnie wszystkie pola";

  return;
};

const resetError = () => {
  errorOutput.textContent = "";

  return;
};

const calculations = () => {
  const inputValues = inputArray.map((input) => parseFloat(input.value));

  if (inputValues.includes(NaN) || !inputValues.length) {
    setError();

    return;
  }

  resetError();

  sumOutput.textContent = inputValues.reduce((a, b) => a + b);
  minOutput.textContent = Math.min(...inputValues);
  maxOutput.textContent = Math.max(...inputValues);
  avgOutput.textContent = inputValues.reduce((a, b) => a + b) / inputArray.length;
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
  newRemoveInputButton.textContent = "-";
  newRemoveInputButton.addEventListener("click", () =>
    removeRow(newRemoveInputButton)
  );

  return newRemoveInputButton;
};

const createNewRow = () => {
  const row = document.createElement("span");

  row.appendChild(getRemoveInputButton());
  row.appendChild(getNewInput());

  inputContainer.appendChild(row);
  inputArray = getInputArray();

  setError();
};

const removeRow = (element) => {
  inputContainer.removeChild(element.parentElement);

  inputArray = getInputArray();
  calculations();
};

document
  .querySelectorAll(".removeRowButton")
  .forEach((el) => el.addEventListener("click", () => removeRow(el)));

calculateButton.addEventListener("click", calculations);
inputArray.forEach((input) => input.addEventListener("input", calculations));
addInputButton.addEventListener("click", createNewRow);
