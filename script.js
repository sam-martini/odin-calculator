// - - - - - Query Selectors - - - - - //

const numBtns = document.querySelectorAll('[data-number]');
const decimalBtn = document.querySelector('[data-decimal]');
const opBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const plusMinusBtn = document.querySelector('[data-plus-minus]');
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
// Checks whether the calculator is waiting for a second number or not,
// if it is, set the screen value to the input digit, and
// if it isn't, it appends the input digit to the current screen value and makes sure 
// it doesn't exceed 9 digits.
function inputDigit(digit) {
    checkForResult();
    if (calculator.waitingForSecondNum) {
        calculator.screenValue = digit;
        calculator.waitingForSecondNum = false;
    } else if (calculator.screenValue.length < 9) {
        calculator.screenValue += digit;
    }
}

// Called when the user inputs a decimal.
// First checks if the calculator is waiting for a second number, if so
// it adds a 0 to the screen value to prevent it from adding a decimal to the previous number.
// Only allows the user to add 1 decimal point.
function inputDecimal(decimal) {
    if (calculator.waitingForSecondNum === true) {
        calculator.screenValue = '0.'
        calculator.waitingForSecondNum = false;
        return
    }
    if (!calculator.screenValue.includes(decimal)) {
        calculator.screenValue += decimal;
    }
}

function plusMinusNumber() {
    // Bugs are here.
    let currentValue = parseFloat(calculator.screenValue);
    calculator.screenValue = `${-1 * currentValue}`;
    console.log(calculator);
}

// Checks whether a result is being held or not, if so, 
// it calls the allClear function to reset the calculator to its initial state.
// Used when the user inputs a number after a previous equation to start fresh.
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

// Called when the user inputs an operator.
// First checks if there's a first number or not. If there isn't, 
// it sets the screen value as the first number. If there is,
// it checks whether or not the calculator is holding a previous result and sets the
// holding result flag to false. It there is already an operator chosen, it 
// performs the operation on the first number and the screen value using the operator and sets 
// the display and first number to the result.
// This function sets the input operation and sets the waiting for second number flag to true.
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
}

// Called when the user inputs equals. 
// It performs the operation on the first number and the screen value and calls the function to
// update the display.
// It sets the first number to the result and sets the holding result flag to true.
function handleEquals() {
    const { firstNum, screenValue, operation } = calculator;
    
    const inputValue = parseFloat(screenValue);
    const result = operate(firstNum, inputValue, operation);
    calculator.screenValue = `${parseFloat(result.toFixed(2))}`;
    updateDisplay();

    calculator.firstNum = result;
    calculator.holdingResult = true;
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

function clearLastDigit() {
    let currentValue = calculator.screenValue;
    if (currentValue.length > 0) {
        calculator.screenValue = currentValue.slice(0, -1);
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

plusMinusBtn.addEventListener('click', () => {
    plusMinusNumber();
    updateDisplay();
})

clearBtn.addEventListener('click', () => {
    clearLastDigit();
    updateDisplay();
})

allClearBtn.addEventListener('click', () => {
    allClear();
    updateDisplay();
});