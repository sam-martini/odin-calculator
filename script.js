// 1) Add basic math functions.
// 2) Add 'operate' function that takes in an operator and two numbers and
// then calls one of the above functions on the numbers.


// I've used an an object to map the operator string to its corresponding
// math function because it seems cooler.

// In the 'operate' function, we call the math function using the operator
// string as the key to look up the corresponding function in the mathFunctions object.

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