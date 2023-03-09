// - - - - - Query Selectors - - - - - //

const screenValue = document.querySelector('.screen');
const numBtns = document.querySelectorAll('.num-btn');
const opBtns = document.querySelectorAll('.op-btn');
const equalsBtn = document.querySelector('.equals-btn');
const allClearBtn = document.querySelector('.ac-btn');


// - - - - - Global Variables - - - - - //

let hasResult = false;




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
    firstNum = parseInt(screenValue.innerText);
    operation = operator;
    clearDisplay();
}

function handleEqualsClick() {
    const secondNum = parseInt(screenValue.innerText);
    const result = operate(firstNum, secondNum, operation);
    updateDisplay(result);
    hasResult = true;
}



// - - - - - Display Functions - - - - - //

function showValue(value) {
    checkResult();
    screenValue.innerText += value;
}

function updateDisplay(value) {
    screenValue.innerText = value;
}

function clearDisplay() {
    screenValue.innerText = '';
}





function checkResult() {
    if (hasResult) {
        hasResult = false;
        clearDisplay();
    }
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