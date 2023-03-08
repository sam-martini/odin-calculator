// - - - - - Query Selectors - - - - - //

const displayValue = document.querySelector('.screen');
const numBtns = document.querySelectorAll('.num-btn');
const allClearBtn = document.querySelector('.ac-btn');
const equalsBtn = document.querySelector('.equals-btn');
const opBtns = document.querySelectorAll('.op-btn');




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


console.log(operate(5, 20, 'add'));



// - - - - - Do Calculator Stuff - - - - - //

let firstNum = null;
let operation = null;

function handleOperatorClick(operator) {
    firstNum = parseInt(displayValue.innerText);
    console.log(firstNum);
    operation = operator;
    console.log(operation)
    clearDisplay();
}

function handleEqualsClick() {
    const secondNum = parseInt(displayValue.innerText);
    const result = operate(firstNum, secondNum, operation);
    updateDisplay(result);
    console.log(result);
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