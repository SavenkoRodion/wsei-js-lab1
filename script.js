console.log("hello")
const mainButton = document.querySelector("#mainButton")
const minOutput = document.querySelector("#min")
const maxOutput = document.querySelector("#max")
const avgOutput = document.querySelector("#avg")
const errorOutput = document.querySelector("#error");

let input1 = document.querySelector("#liczba1");
let input2 = document.querySelector("#liczba2");
let input3 = document.querySelector("#liczba3");
let input4 = document.querySelector("#liczba4");

const validationRule = (inputValue) => isNaN(inputValue) || inputValue === "";

const calculations = () => 
{
    let number1 = input1.value;
    let number2 = input2.value;
    let number3 = input3.value;
    let number4 = input4.value;

    if(validationRule(number1) || validationRule(number2) || validationRule(number3) || validationRule(number4))
    {
        minOutput.innerHTML = "";
        maxOutput.innerHTML = "";
        avgOutput.innerHTML = ""; 

        errorOutput.innerHTML = "Wypełnij poprawnie wszystkie pola"

        return;
    }

    errorOutput.innerHTML = ""

    number1 = Number(number1);
    number2 = Number(number2);
    number3 = Number(number3);
    number4 = Number(number4);
    minOutput.innerHTML = Math.min(number1, number2, number3, number4);
    maxOutput.innerHTML = Math.max(number1, number2, number3, number4);
    avgOutput.innerHTML = (number1 + number2 + number3 + number4) / 4;
}

mainButton.addEventListener("click", () => calculations())

