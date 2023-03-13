// - - - - - Query Selectors - - - - - //
const numBtns = document.querySelectorAll('[data-number]');
const decimalBtn = document.querySelector('[data-decimal]');
const opBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const allClearBtn = document.querySelector('[data-all-clear]');
const display = document.querySelector('[data-screen-display]');

// - - - - - Global Variables - - - - - //


// - - - - - Calculator Object - - - - - //
// Create a calculator object that keeps track of everything to construct a valid expression.
const calculator = {
    screenValue: '',
    firstNum: null,
    waitingForSecondNum: false,
    holdingResult: false,
    operation: null,
};

function allClear() {
    calculator.screenValue = '';
    calculator.firstNum = null;
    calculator.waitingForSecondNum = false;
    calculator.holdingResult = false;
    calculator.operation = null;
}

function checkForResult() {
    if (calculator.holdingResult) {
        allClear();
    }
}



function inputDigit(digit) {
    checkForResult();
    if (calculator.waitingForSecondNum) {
        calculator.screenValue = digit;
        calculator.waitingForSecondNum = false;
    } else {
        calculator.screenValue += digit;
    }
    console.log(calculator);
}

function inputDecimal(decimal) {
    if (!calculator.screenValue.includes(decimal)) {
        calculator.screenValue += decimal;
        console.log(calculator);
    }
}

function handleOperator(nextOperator) {
    const { firstNum, screenValue, operation, holdingResult } = calculator;
    const inputValue = parseFloat(screenValue);
    if (firstNum === null) {
        calculator.firstNum = inputValue;
    } else if (holdingResult) {
        calculator.holdingResult = false;
    } else if (operation) {
        const result = operate(firstNum, inputValue, operation);
        calculator.screenValue = String(result);
        updateDisplay();
        calculator.firstNum = result;
    }
    calculator.waitingForSecondNum = true;
    calculator.operation = nextOperator;
    console.log(calculator);
}

function handleEquals() {

    const { firstNum, screenValue, operation } = calculator;
    const inputValue = parseFloat(screenValue);
    const result = operate(firstNum, inputValue, operation);
    calculator.screenValue = String(result);
    updateDisplay();

    
    calculator.firstNum = result;
    calculator.holdingResult = true;
    console.log(calculator)
}


// - - - - - Math / Operator Functions - - - - - //

const mathFunctions = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'divide': (a, b) => a / b,
    'x': (a, b) => a * b
};

function operate(a, b, operator) {
    return mathFunctions[operator](a, b);
};


// - - - - - Do Calculator Stuff - - - - - //



// - - - - - Display Functions - - - - - //

function updateDisplay() {
    display.textContent = calculator.screenValue;
}





// - - - - - Event Listeners - - - - - //

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        inputDigit(btn.value);
        updateDisplay();
    })
});

decimalBtn.addEventListener('click', (e) => {
    inputDecimal(e.target.value);
    updateDisplay();
})

opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        handleOperator(btn.value);
    })
})

equalsBtn.addEventListener('click', handleEquals);