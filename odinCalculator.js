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
    if (operator) {
        switch(operator) {
            case '+':
                return add(n1, n2);
            case '-':
                return subtract(n1, n2);
            case 'x':
                return multiply(n1, n2);
            case 'divide':
                return divide(n1, n2);
        }
    } else {
        alert('Must choose a number, and operator, and another number to calculate');
    }

}

function clear() {
    num1 = 0;
    num2 = 0;
    result = 0;
    display.textContent = '0';
    operator = null;
}

// Button click event handler
const calculator = document.querySelector(".calculator");
calculator.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('digit')) {
        if (num1 || display.textContent === '0') {
            display.textContent = target.getAttribute('data-btnVal');
        } else {
            display.textContent += target.getAttribute('data-btnVal');
        }
    } else if (target.classList.contains('operator')) {
        operator = target.getAttribute('data-btnVal');
        
        if (num1) {
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
        display.textContent = result.toString();
        operator = null;
    } else if (target.classList.contains('clear')) {
        clear()
    }
})