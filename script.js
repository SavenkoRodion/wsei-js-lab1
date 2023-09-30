console.log("hello")

const mainButton = document.querySelector("#mainButton")


mainButton.addEventListener("click", () => {
    const minOutput = document.querySelector("#min")
    const maxOutput = document.querySelector("#max")
    const avgOutput = document.querySelector("#avg")
    
    console.log(minOutput);

    const input1 = parseInt(document.querySelector("#liczba1").value);
    const input2 = parseInt(document.querySelector("#liczba2").value);
    const input3 = parseInt(document.querySelector("#liczba3").value);
    const input4 = parseInt(document.querySelector("#liczba4").value);

    minOutput.innerHTML = Math.min(input1, input2, input3, input4);
    maxOutput.innerHTML = Math.max(input1, input2, input3, input4);
    avgOutput.innerHTML = (input1 + input2 + input3 + input4) / 4; 
})


