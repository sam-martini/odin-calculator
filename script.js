// - - - - - Query Selectors - - - - - //

const displayValue = document.querySelector('.screen');
const numBtns = document.querySelectorAll('.num-btn');
const opBtns = document.querySelectorAll('.op-btn');
const equalsBtn = document.querySelector('.equals-btn');
const allClearBtn = document.querySelector('.ac-btn');


// - - - - - Global Variables - - - - - //

let firstNum = null;
let operation = null;




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

function handleOperatorClick(operator) {
    firstNum = parseInt(displayValue.innerText);
    operation = operator;
    clearDisplay();
}

function handleEqualsClick() {
    const secondNum = parseInt(displayValue.innerText);
    const result = operate(firstNum, secondNum, operation);
    updateDisplay(result);
}



// - - - - - Display Functions - - - - - //

function showValue(value) {
    displayValue.innerText += value;
}

function updateDisplay(value) {
    displayValue.innerText = value;
}

function clearDisplay() {
    displayValue.innerText = '';
}



// - - - - - Event Listeners - - - - - //

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showValue(btn.value);
    })
});

opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        handleOperatorClick(btn.value);
    })
})

allClearBtn.addEventListener('click', clearDisplay);

equalsBtn.addEventListener('click', handleEqualsClick);