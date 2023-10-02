console.log("hello");

const mainButton = document.querySelector("#mainButton");
const minOutput = document.querySelector("#min");
const maxOutput = document.querySelector("#max");
const avgOutput = document.querySelector("#avg");
const errorOutput = document.querySelector("#error");

const inputContainer = Array.from(
  document.querySelectorAll("#inputContainer > input")
);

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
  const inputValues = inputContainer.map((input) => parseFloat(input.value));

  if (inputValues.includes(NaN)) setError();

  resetError();

  minOutput.innerHTML = Math.min(...inputValues);
  maxOutput.innerHTML = Math.max(...inputValues);
  avgOutput.innerHTML = inputValues.reduce((a, b) => a + b) / 4;
};

mainButton.addEventListener("click", () => calculations());

inputContainer.forEach((input) =>
  input.addEventListener("input", () => calculations())
);
