// - - - - - Query Selectors - - - - - //

const numBtns = document.querySelectorAll('[data-number]');
const decimalBtn = document.querySelector('[data-decimal]');
const opBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const allClearBtn = document.querySelector('[data-all-clear]');
const display = document.querySelector('[data-screen-display]');




// - - - - - Calculator Object - - - - - //

// A calculator object that keeps track of everything to construct a valid expression.
const calculator = {
    screenValue: '',
    firstNum: null,
    waitingForSecondNum: false,
    holdingResult: false,
    operation: null,
};

// Reset calculator to its initial state
function allClear() {
    calculator.screenValue = '';
    calculator.firstNum = null;
    calculator.waitingForSecondNum = false;
    calculator.holdingResult = false;
    calculator.operation = null;
}



// - - - - - Handle Inputs - - - - - //

// Called when the user inputs a number.
// First, checks if there's a result of a previous equation and if so, resets the calculator.
function inputDigit(digit) {
    checkForResult();
    if (calculator.waitingForSecondNum) {
        calculator.screenValue = digit;
        calculator.waitingForSecondNum = false;
    } else if (calculator.screenValue.length < 9) {
        calculator.screenValue += digit;
    }
    console.log(calculator);
}

function inputDecimal(decimal) {
    if (calculator.waitingForSecondNum === true) {
        calculator.screenValue = '0.'
        calculator.waitingForSecondNum = false;
        return
    }
    if (!calculator.screenValue.includes(decimal)) {
        calculator.screenValue += decimal;
        console.log(calculator);
    }
}

function checkForResult() {
    if (calculator.holdingResult) {
        allClear();
    }
}



// - - - - - Math Functions - - - - - //

const mathFunctions = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '÷': (a, b) => a / b,
    'x': (a, b) => a * b
};

function operate(a, b, operator) {
    return mathFunctions[operator](a, b);
};



// - - - - - Do Calculator Stuff - - - - - //

function handleOperator(nextOperator) {
    const { firstNum, screenValue, operation, holdingResult } = calculator;
    const inputValue = parseFloat(screenValue);
    if (firstNum === null) {
        calculator.firstNum = inputValue;
    } else if (holdingResult) {
        calculator.holdingResult = false;
    } else if (operation) {
        const result = operate(firstNum, inputValue, operation);
        calculator.screenValue = `${parseFloat(result.toFixed(2))}`;
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
    calculator.screenValue = `${parseFloat(result.toFixed(2))}`;
    updateDisplay();

    calculator.firstNum = result;
    calculator.holdingResult = true;
    console.log(calculator)
}



// - - - - - Display Functions - - - - - //

function updateDisplay() {
    checkDisplayLength();
    display.innerText = calculator.screenValue;
}

function checkDisplayLength() {
    let currentValue = calculator.screenValue;
    if (currentValue.length > 9) {
        currentValue = currentValue.slice(0, 9);
    }
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

allClearBtn.addEventListener('click', () => {
    allClear();
    updateDisplay();
});