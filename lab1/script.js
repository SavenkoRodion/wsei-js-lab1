console.log("hello");

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
  sumOutput.innerHTML = "";
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

  sumOutput.innerHTML = inputValues.reduce((a, b) => a + b);
  minOutput.innerHTML = Math.min(...inputValues);
  maxOutput.innerHTML = Math.max(...inputValues);
  avgOutput.innerHTML = inputValues.reduce((a, b) => a + b) / inputArray.length;
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
  newRemoveInputButton.innerHTML = "-";
  newRemoveInputButton.addEventListener("click", () =>
    removeRow(newRemoveInputButton)
  );

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

const removeRow = (element) => {
  console.log(element.parentElement);
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
