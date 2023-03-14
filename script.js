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
    removeActiveBtnClass();
}



// - - - - - Handle Number Inputs - - - - - //

// Called when the user inputs a number.
function inputDigit(digit) {
    // If user inputs number after equals, start fresh.
    checkForResult();
    
    if (calculator.waitingForSecondNum) {
        // If the calculator is waiting for a second number, set the screen value to the
        // input digit and set the waiting for second number flag to false.
        calculator.screenValue = digit;
        calculator.waitingForSecondNum = false;
    } else if (calculator.screenValue.length < 9) {
        // Append the input digit to the current screen value as long as the screen 
        // value length is 9 or less.
        calculator.screenValue += digit;
    }
}

// Called when the user inputs a decimal.
// Only allows the user to add 1 decimal point.
function inputDecimal(decimal) {
    if (calculator.waitingForSecondNum === true) {
        // If the calculator is waiting for a second number, add 0 to the screen value to prevent
        // it from adding to the previous number.
        calculator.screenValue = '0.'
        calculator.waitingForSecondNum = false;
        return
    }
    // Prevent adding more than one decimal.
    if (!calculator.screenValue.includes(decimal)) {
        calculator.screenValue += decimal;
    }
}

function plusMinusNumber() {
    // Bugs here :(
    let currentValue = parseFloat(calculator.screenValue);
    calculator.screenValue = `${-1 * currentValue}`;
    console.log(calculator);
}


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
function handleOperator(nextOperator) {
    const { firstNum, screenValue, operation, waitingForSecondNum ,holdingResult } = calculator;
    // Get the current screen value as a float number.
    const inputValue = parseFloat(screenValue);
    
    if (waitingForSecondNum && operation) {
        // Update the operator and return without any calculations.
        calculator.operation = nextOperator;
        return;
    }
    
    if (isNaN(inputValue)) {
        // If the current screen value is not a valid number, return without any calculations.
        return;
    }

    if (firstNum === null) {
        // If there isn't already a first number, update it with the current screen value.
        calculator.firstNum = inputValue;
    } else if (holdingResult) {
        // If there's a previous result, set the holding result flag to false.
        calculator.holdingResult = false;
    } else if (operation) {
        // If there is an operation already set, perform the calculation based on the
        // current screen value and operation and update the display.
        const result = operate(firstNum, inputValue, operation);
        calculator.screenValue = `${parseFloat(result.toFixed(2))}`;
        updateDisplay();
        // Update the first number to the result.
        calculator.firstNum = result;
    }
    // Update the operator and set the waiting for second number flag to false.
    calculator.operation = nextOperator;
    calculator.waitingForSecondNum = true;
}



// Called when the user inputs equals. 
function handleEquals() {
    const { firstNum, screenValue, operation, waitingForSecondNum, holdingResult } = calculator;
    // Get the current screen value as a float number.
    const inputValue = parseFloat(screenValue);
    
    if (!firstNum || waitingForSecondNum || holdingResult) {
        // Return without any calculations.
        return;
    }

    // Perform the calculation based on the current screen value and update the display.
    const result = operate(firstNum, inputValue, operation);
    calculator.screenValue = `${parseFloat(result.toFixed(2))}`;
    updateDisplay();
    // Update the first number to the result.
    calculator.firstNum = result;
    // Set the holding result flag to true.
    calculator.holdingResult = true;
}



// - - - - - Display Functions - - - - - //

function updateDisplay() {
    checkDisplayLength();
    display.innerText = calculator.screenValue;
}

// Prevent the screen value to be more than 9 digits.
function checkDisplayLength() {
    let currentValue = calculator.screenValue;
    if (currentValue.length > 9) {
        currentValue = currentValue.slice(0, 9);
    }
}

function clearLastDigit() {
    // Get the current screen value.
    let currentValue = calculator.screenValue;

    // Preventing bugs :(
    if (calculator.holdingResult || calculator.waitingForSecondNum) {
        return;
    }
 
    if (currentValue.length > 0) {
        // If it's more than 0, remove the last digit and update the screen value.
        calculator.screenValue = currentValue.slice(0, -1);
    }
}

// Handle buttons style class.
function animateOpbutton(btn) {
    if (!calculator.firstNum) {
        return;
    }
    removeActiveBtnClass();
    btn.classList.add('active-btn');
}

function removeActiveBtnClass() {
    opBtns.forEach(btn => {
        btn.classList.remove('active-btn');
    })
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
        animateOpbutton(btn);
    })
})

equalsBtn.addEventListener('click', () => {
    handleEquals();
    removeActiveBtnClass();
})
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

// - - - - - Keyboard Input - - - - - //

document.addEventListener('keydown', (e) => {
    let key = e.key;
    // Check if key is a number or decimal point
    if (!isNaN(key) || key === '.') {
      inputDigit(key);
      updateDisplay();
    }
    // Check if key is an operator
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
      handleOperator(key);
    }
    // Check if key is the equals sign
    else if (key === '=' || key === 'Enter') {
      handleEquals();
    }
    // Check if key is the clear button
    else if (key === 'Backspace') {
      clearLastDigit();
      updateDisplay();
    }
  });