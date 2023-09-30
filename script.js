console.log("hello")

const mainButton = document.querySelector("#mainButton")

const validationRule = (inputValue) => isNaN(inputValue) || inputValue === ""
const minOutput = document.querySelector("#min")
const maxOutput = document.querySelector("#max")
const avgOutput = document.querySelector("#avg")
const errorOutput = document.querySelector("#error");

const input1 = document.querySelector("#liczba1").value;
const input2 = document.querySelector("#liczba2").value;
const input3 = document.querySelector("#liczba3").value;
const input4 = document.querySelector("#liczba4").value;

mainButton.addEventListener("click", () => {
    
    

    if(validationRule(input1) || validationRule(input2) || validationRule(input3) || validationRule(input4))
    {
        minOutput.innerHTML = "";
        maxOutput.innerHTML = "";
        avgOutput.innerHTML = ""; 

        errorOutput.innerHTML = "Wypełnij poprawnie wszystkie pola"

        return
    }

    errorOutput.innerHTML = ""

    input1 = Number(input1);
    input2 = Number(input2);
    input3 = Number(input3);
    input4 = Number(input4);
    minOutput.innerHTML = Math.min(input1, input2, input3, input4);
    maxOutput.innerHTML = Math.max(input1, input2, input3, input4);
    avgOutput.innerHTML = (input1 + input2 + input3 + input4) / 4;  
})