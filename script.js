// - - - - - Query Selectors - - - - - //



// - - - - - Global Variables - - - - - //


// - - - - - Calculator Object - - - - - //
// Create a calculator object that keeps track of everything to construct a valid expression.
const calculator = {
    screenValue: '0',
    firstNum: null,
    waitingForSecondNum: false,
    operator: null,
};



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




// - - - - - Event Listeners - - - - - //

