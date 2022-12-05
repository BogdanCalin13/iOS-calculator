(function () {
    let state = {
        number: undefined,
        operator: undefined,
        numberSaved: undefined
    };


    // alternativ cel mai probabil ati vazut cu document.getElementById("#calculator-output");
    // document.querySelectorAll(".input") <=> document.getElementsByClassName("input");
    const calculatorOutput = document.querySelector(".calculator-output");
    // console.log(calculatorOutput);

    // luam toate butoanele care schimba numerele
    const inputs = document.querySelectorAll(".input");
    // console.log(inputs);

    // pe toate butoanele care schimba numerele adaugam
    // functionalitate de adaugare de numere in calculator
    inputs.forEach((item) => {
        item.addEventListener("click", function () {
            // console.log("you have clicked: ", item.getAttribute("data-number"));
            // // acest .dataset, functioneaza doar pentru atribute care incep cu data-
            // console.log("you have clicked: ", item.dataset.number);
            // console.log("you have clicked: ", item.dataset);
            if ((calculatorOutput.innerHTML === '0' && item.dataset.number !== ".") || state.numberSaved) {
                calculatorOutput.innerHTML = item.dataset.number;
                state.numberSaved = false;
            } else {
                calculatorOutput.innerHTML += item.dataset.number;
            }
        });
    });

    // luam toate butoanele care sunt operatori
    const operators = document.querySelectorAll("button[data-operator]");
    // pe toate butoanele care sunt operatori adaugam
    // functionalitate de memorare de operatie viitoare
    operators.forEach((item) => {
        item.addEventListener("click", function () {
            if (state.operator && state.number) {
                switch (state.operator) {
                    case "%":
                        calculatorOutput.innerHTML = parseFloat(state.number) % parseFloat(calculatorOutput.innerHTML);
                        break;
                    case "/":
                        calculatorOutput.innerHTML = parseFloat(state.number) / parseFloat(calculatorOutput.innerHTML);
                        break;
                    case "*":
                        calculatorOutput.innerHTML = parseFloat(state.number) * parseFloat(calculatorOutput.innerHTML);
                        break;
                    case "-":
                        calculatorOutput.innerHTML = parseFloat(state.number) - parseFloat(calculatorOutput.innerHTML);
                        break;
                    case "+":
                        calculatorOutput.innerHTML = parseFloat(state.number) + parseFloat(calculatorOutput.innerHTML);
                        break;
                    default:
                        break;
                }

            }
            state.numberSaved = true;
            state.number = parseFloat(calculatorOutput.innerHTML);
            state.operator = item.dataset.operator;
            // console.log(state);
        })
    })


}());