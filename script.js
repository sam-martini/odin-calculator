// - - - - - Query Selectors - - - - - //

const displayValue = document.querySelector('.screen');
const numBtns = document.querySelectorAll('.num-btn');
const allClearBtn = document.querySelector('.ac-btn');



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



// - - - - - Display Functions - - - - - //

function showValue(value) {
    displayValue.innerText += value;
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


allClearBtn.addEventListener('click', clearDisplay);