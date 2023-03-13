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
    operator: null,
};



function inputDigit(digit) {
    calculator.screenValue += digit;
    console.log(calculator);
}

function inputDecimal(decimal) {
    if (!calculator.screenValue.includes(decimal)) {
        calculator.screenValue += decimal;
        console.log(calculator);
    }
}


// - - - - - Math / Operator Functions - - - - - //

const mathFunctions = {
    'add': (a, b) => a + b,
    'subtract': (a, b) => a - b,
    'divide': (a, b) => a / b,
    'multiply': (a, b) => a * b
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