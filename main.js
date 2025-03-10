// Visor
let calculation = document.querySelector(".calc");
let result = document.querySelector(".result");
let backspace = document.querySelector(".bksp");

//Buttons
// Buttons obj
const numbers = {
    zero: document.querySelector(".zero"),
    oneButton: document.querySelector(".one"),
    twoButton: document.querySelector(".two"),
    threeButton: document.querySelector(".three"),
    fourButton: document.querySelector(".four"),
    fiveButton: document.querySelector(".five"),
    sixButton: document.querySelector(".six"),
    sevenButton: document.querySelector(".seven"),
    eightButton: document.querySelector(".eight"),
    nineButton: document.querySelector(".nine"),
};

const mathOperators = {
    clear: document.querySelector(".clear"),
    parentheses: document.querySelector(".parentheses"),
    percent: document.querySelector(".percent"),
    divide: document.querySelector(".divide"),
    multiply: document.querySelector(".multiply"),
    subtract: document.querySelector(".subtract"),
    adition: document.querySelector(".adition"),
    arithmeticSignal: document.querySelector(".arithmetic-signal"),
    dot: document.querySelector(".dot"),
    equal: document.querySelector(".equal"),
}


// For receive the number and the math operator
let numberValue = [];
let lastValue;
let currentValue;

let mathOperatorValue;
let showResult;


// Numbers
for(let button of Object.values(numbers)) {
    button.addEventListener("click", () => {
        calculation.textContent += button.textContent;
        return numberValue.push(Number(button.textContent));
    })
}


//Math operators
for(let button of Object.values(mathOperators)) {
    button.addEventListener("click", () => {
        if (button !== mathOperators.equal) {
            calculation.textContent += button.textContent;
            lastValue = numberValue.join("");
            numberValue = [];
            mathOperatorValue = button.textContent;
            return lastValue;
        }     
    });
}



// Result 
mathOperators.equal.addEventListener("click", () => {
    currentValue = numberValue.join("");
    if (mathOperatorValue === "÷") {
         result.textContent = Number(lastValue) / Number(currentValue);
    } else if (mathOperatorValue === "×") {
        result.textContent = Number(lastValue) * Number(currentValue);
    } else if (mathOperatorValue === "−") {
        result.textContent = Number(lastValue) - Number(currentValue);
    } else if (mathOperatorValue === "+") {
        result.textContent = Number(lastValue) + Number(currentValue);
    }
})