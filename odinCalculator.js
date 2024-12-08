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
    let btnVal = target.getAttribute('data-btnVal');

    if (target.classList.contains('digit')) {
        if (display.textContent === '0') {
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
                console.log('num1 found');
            }
        }else {
            display.textContent += btnVal;
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
})