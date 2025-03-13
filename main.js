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
let lastValue = 0;
let currentValue = 0;
let mathOperatorValue = "";
let showResult = 0;
let numberEx = [];
let openParenthesesCount = 0;




// Numbers
for(let button of Object.values(numbers)) {
    button.addEventListener("click", () => {
        calculation.textContent += button.textContent;
        numberValue.push(Number(button.textContent));
        numberEx.push(button.textContent);
    })
}


//Math operators
for(let button of Object.values(mathOperators)) {
    button.addEventListener("click", () => {
        if (button !== mathOperators.equal ) {
            calculation.textContent += button.textContent;
            numberEx.push(button.textContent);
            lastValue = Number(numberValue.join(""));
            numberValue = [];
            numberValue.push(Number(button.textContent));
            mathOperatorValue = button.textContent;
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
    numberEx = [];
    openParenthesesCount = 0;
});

//dot
functionsBtns.dot.addEventListener("click", () => {
    if (!numberValue.includes(".") && numberValue.length > 0)
    calculation.textContent += ".";
    numberValue.push(".");
    numberEx.push(".")
});

//parentheses
functionsBtns.parentheses.addEventListener("click", () => {
    const lastChar = calculation.textContent.slice(-1) || "";
    const operators = ["+", "−", "×", "÷", "%"];
    const lastIsNumber = !isNaN(parseInt(lastChar)) || lastChar === ".";

    if (openParenthesesCount === 0 || lastChar === "(") {
        numberEx.push("(");
        calculation.textContent += "(";
        openParenthesesCount++;
    } else if (openParenthesesCount > 0 && lastIsNumber && lastChar !== ")") {
        numberEx.push(")");
        calculation.textContent += ")";
        openParenthesesCount--;
    } else if (operators.includes(lastChar)) {
        numberEx.push("(");
        calculation.textContent += "(";
        openParenthesesCount++;
    }
});

//arithmetic-signal
functionsBtns.arithmeticSignal.addEventListener("click", () => {
    if (numberValue.length > 0) {
        let currentNumber = Number(numberValue.join(""));
        currentNumber = -currentNumber;
        numberValue = currentNumber.toString().split("");
        let expressionSoFar = calculation.textContent.slice(0, -numberValue.length);
        calculation.textContent = expressionSoFar + currentNumber;
        numberEx = numberEx.slice(0, -numberValue.length).concat(currentNumber.toString().split(""));
    } else if (lastValue !== 0) {
        lastValue = -lastValue;
        calculation.textContent = lastValue;
        numberEx = [lastValue.toString()];
    }
});


backspace.addEventListener("click", ()=> {
    const currentDisplay = calculation.textContent;

    if (currentDisplay === "Erro") {
        calculation.textContent = "0";
        result.textContent = "";
        lastValue = 0;
        numberValue = [];
        mathOperatorValue = "";
        numberEx = [];
        openParenthesesCount = 0;
        return;
    }

    if (numberValue.length > 0) {
        numberValue.pop();
        numberEx.pop();
        calculation.textContent = numberValue.join("");
    } else if (currentDisplay.length > 1) {
        const lastChar = currentDisplay.slice(-1);
        const operators = ["+", "−", "×", "÷", "%", "(", ")"];

        if (operators.includes(lastChar)) {
            if (lastChar === "(") openParenthesesCount--;
            if (lastChar === ")") openParenthesesCount++;
            numberEx.pop();
            calculation.textContent = currentDisplay.slice(0, -1);
            if (["+", "−", "×", "÷", "%"].includes(lastChar)) mathOperatorValue = "";
        } else {
            calculation.textContent = currentDisplay.slice(0, -1) || "0";
            lastValue = Number(calculation.textContent) || 0;
        }
    } else {
        calculation.textContent = "0";
        result.textContent = "";
        lastValue = "";
        numberValue = [];
        mathOperatorValue = "";
        numberEx = [];
        openParenthesesCount = 0;
    }
})




// Result 
mathOperators.equal.addEventListener("click", () => {
    try {
        // Unir os valores e substituir operadores simbólicos
        let expression = numberEx.join("")
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")
            .replace(/%/g, "/100");

        // Usar a função evaluate da math.js
        let showResult = math.evaluate(expression); 

        if (!Number.isFinite(showResult)) {
            result.textContent = "Erro";
        } else {
            result.textContent = showResult;
            calculation.textContent = showResult;
            numberEx = showResult.toString().split("");
        }
    } catch (error) {
        result.textContent = "Erro";
    }
});
