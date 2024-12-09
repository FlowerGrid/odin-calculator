const display = document.querySelector("#display");
const operators = ['+', '-', 'x', 'divide', 'equals']

let lastButtonPress = null;
let num1 = 0;
let num2 = 0;
let result = 0;
let operator = null;


function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function operate(operator, n1, n2) {
    let solution = 0;
    if (operator) {
        switch(operator) {
            case '+':
                solution = add(n1, n2);
                break;
            case '-':
                solution = subtract(n1, n2);
                break;
            case 'x':
                solution = multiply(n1, n2);
                break;
            case 'divide':
                solution = divide(n1, n2);
                break;
        }
        return roundSolution(solution)
    } else {
        alert('Must choose a number, and operator, and another number to calculate');
    }

}

function roundSolution(solution) {
    console.log('in rounding function');
    let strSolution = solution.toString();
    if (strSolution.length > 14) {
        // round decimals
        if (strSolution.includes('.')) {
            console.log('decimal detected')
            return Number.parseFloat(solution).toExponential(2);
        } else {
            console.log('attempting to round');
            alert('Character limit reached. Rounded to nearest integer');
            return Number.parseFloat(solution).toExponential(2);
        }
    } else {
        console.log('not rounded')
        return solution;
    }
}

function clear() {
    num1 = 0;
    num2 = 0;
    result = 0;
    display.textContent = '0';
    operator = null;
}

function limitDigits(num) {
    if (num.length > 14) {
        alert('Character limit reached. Maximum is 14')
    } else {
        display.textContent = num;
    }
}

// Button click event handler
const calculator = document.querySelector(".calculator");

// Change button color to indicate a click
calculator.addEventListener('mousedown', (event) => {
    let target = event.target;
    if (target.classList.contains('button')) {
        target.style.backgroundColor = '#ababa9';
    }
})

calculator.addEventListener('mouseup', (event) => {
    let target = event.target;
    let btnVal = target.getAttribute('data-btnVal');

    // Change button color back to original
    if (target.classList.contains('button')) {
        target.style.backgroundColor = '#c9c9c6';
    }
    

    if (target.classList.contains('digit')) {
        if (btnVal === '.' && display.textContent.includes('.')) {
            ;
        } else if (display.textContent === '0') {
            if (btnVal === '.') {
                display.textContent += btnVal;
            } else {
                display.textContent = btnVal;
            }
        } else if (num1 && operators.includes(lastButtonPress)) {
            if (btnVal === '.') {
                display.textContent = `0${btnVal}`;
            } else {
                display.textContent = btnVal;
            }
        } else {
            limitDigits(display.textContent + btnVal)
            // display.textContent += btnVal;
        }
    } else if (target.classList.contains('operator')) {
        operator = btnVal;
        // I'm on to something. Last button press is gonna be the way to go
        // It cleared the display value to 0. I want it to do nothing
        // so maybe it'll just be it's own if block. need to see if javascript has pass

        if (operators.includes(lastButtonPress)) {
            ; // Haha, the solution was a semicolon by itself. Basically a pass statement
        } else if (num1) {
            num2 = +display.textContent;
            num1 = operate(operator, num1, num2);
            display.textContent = num1.toString();

        } else {
        num1 = +display.textContent;
        display.textContent = '0';
        }
    } else if (target.classList.contains('equals')) {
        num2 = +display.textContent;
        num1 = operate(operator, num1, num2);
        display.textContent = num1.toString();
        operator = null;
    } else if (target.classList.contains('clear')) {
        clear()
    }

    lastButtonPress = target.getAttribute('data-btnVal');

    // Limit the number of digits that can be displayed
    // if (display.textContent.length < 14) {
    //     let displayedNum = +display.textContent;

    // }
})