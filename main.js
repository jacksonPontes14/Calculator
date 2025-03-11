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
    percent: document.querySelector(".percent"),
    divide: document.querySelector(".divide"),
    multiply: document.querySelector(".multiply"),
    subtract: document.querySelector(".subtract"),
    adition: document.querySelector(".adition"),
    equal: document.querySelector(".equal"),
}

const functionsBtns = {
    clear: document.querySelector(".clear"),
    dot: document.querySelector(".dot"),
    parentheses: document.querySelector(".parentheses"),
    arithmeticSignal: document.querySelector(".arithmetic-signal"),
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
        numberValue.push(Number(button.textContent));
    })
}


//Math operators
for(let button of Object.values(mathOperators)) {
    button.addEventListener("click", () => {
        if (button !== mathOperators.equal ) {
            calculation.textContent += button.textContent;
            lastValue = numberValue.join("");
            numberValue = [];
            mathOperatorValue = button.textContent;
            return lastValue;
        }
    });
}


//Clear 
functionsBtns.clear.addEventListener("click", () => {
    numberValue = [];
    lastValue = "";
    currentValue = "";
    mathOperatorValue = "";
    result.textContent = "";
    calculation.textContent = "";
});



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
    } else if (mathOperatorValue === "%") {
        if (lastValue) {
            result.textContent = Number(lastValue) * Number(currentValue) / 100;
        } else {
            result.textContent = Number(lastValue) / 100;
        }
    } 
})