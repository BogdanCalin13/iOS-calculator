(function () {
    // let state = {
    //     number: undefined,
    //     operator: undefined,
    //     numberSaved: undefined
    // };
    const state = (function () {
        let number = undefined;
        let operator = undefined;
        let numberSaved = undefined;
        return {
            restart: function () {
                number = undefined;
                operator = undefined;
                numberSaved = undefined;
            },
            // state.getNumber() - este acum echivalentul lui state.number
            //                     dar nu mai exista acum state.number
            getNumber: function () {
                return number;
            },
            // state.getOperator() - este acum echivalentul lui state.operator
            //                       dar nu mai exista acum state.operator
            getOperator: function () {
                return operator;
            },
            // state.getNumberSaved() - este acum echivalentul lui state.numberSaved
            //                          dar nu mai exista acum state.numberSaved
            getNumberSaved: function () {
                return numberSaved;
            },
            // state.setNumber(178 | 63 | 1 | 9 | ...) - este acum echivalentul lui state.number = 178 | 63 | 1 | 9 | ...
            //                                           dar nu mai putem atribui direct state.number = 178 | 63 | 1 | 9 | ...
            setNumber: function (newNumber) {
                number = newNumber;
            },
            // state.setOperator("+" | "-" | "*" | "=" | "/") - este acum echivalentul lui state.operator = "+" | "-" | "*" | "=" | "/"
            //                                                  dar nu mai putem atribui direct state.operator = "+" | "-" | "*" | "=" | "/"
            setOperator: function (newOperator) {
                operator = newOperator;
            },
            // state.setNumberSaved(true|false) - este acum echivalentul lui state.numberSaved = true|false
            //                          dar nu mai putem atribui direct state.numberSaved = true|false
            setNumberSaved: function (newNumberSaved) {
                numberSaved = newNumberSaved;
            }
        }
    })();


    const calculatorOutput = document.querySelector(".calculator-output");

    const inputs = document.querySelectorAll(".input");
    const operators = document.querySelectorAll("button[data-operator]");
    const signChange = document.querySelector(".sign-change");
    const reset = document.querySelector(".reset");

    inputs.forEach((item) => {
        item.addEventListener("click", function () {
            if ((calculatorOutput.innerHTML === '0' && item.dataset.number !== ".") || state.getNumberSaved()) {
                calculatorOutput.innerHTML = item.dataset.number;
                state.setNumberSaved(false);
            } else {
                let fontSize = 64;
                for (let i = 10; i <= 17; i++) {
                    if (calculatorOutput.innerHTML.length >= i) {
                        fontSize = fontSize * 0.91;
                    }
                }

                calculatorOutput.style.fontSize = fontSize + "px";
                if (calculatorOutput.innerHTML.length < 17) {
                    calculatorOutput.innerHTML += item.dataset.number;
                }
            }
            reset.innerHTML = "C";
        });
    });

    operators.forEach((item) => {
        item.addEventListener("click", function () {
            operators.forEach(item => {
                item.classList.remove("active");
            });
            if (item.dataset.operator !== "=") {
                item.classList.add("active");
            }
            if (item.dataset.operator === "%") {
                calculatorOutput.innerHTML = parseFloat(calculatorOutput.innerHTML) / 100;
            } else if (state.getOperator() && state.getNumber()) {
                switch (state.getOperator()) {
                    case "/":
                        calculatorOutput.innerHTML = parseFloat(state.getNumber()) / parseFloat(calculatorOutput.innerHTML);
                        break;
                    case "*":
                        calculatorOutput.innerHTML = parseFloat(state.getNumber()) * parseFloat(calculatorOutput.innerHTML);
                        break;
                    case "-":
                        calculatorOutput.innerHTML = parseFloat(state.getNumber()) - parseFloat(calculatorOutput.innerHTML);
                        break;
                    case "+":
                        calculatorOutput.innerHTML = parseFloat(state.getNumber()) + parseFloat(calculatorOutput.innerHTML);
                        break;
                    default:
                        break;
                }
            }
            state.setNumberSaved(true);
            state.setNumber(parseFloat(calculatorOutput.innerHTML));
            state.setOperator(item.dataset.operator);
            console.log(state);
        })
    });

    signChange.addEventListener("click", function () {
        if (calculatorOutput.innerHTML !== "0") {
            calculatorOutput.innerHTML = -parseFloat(calculatorOutput.innerHTML);
        }
    });

    reset.addEventListener("click", function () {
        operators.forEach(item => {
            item.classList.remove("active");
        });
        switch (reset.innerHTML) {
            case "AC":
                // state = {
                //     number: undefined,
                //     operator: undefined,
                //     numberSaved: undefined
                // }
                // state.setNumber(undefined);
                // state.setOperator(undefined);
                // state.setNumberSaved(undefined);
                state.restart();
                calculatorOutput.innerHTML = "0";
                reset.innerHTML = "AC";
                break;
            case "C":
                calculatorOutput.innerHTML = "0";
                reset.innerHTML = "AC";
                break;
            default:
                break;
        }
    })

}());